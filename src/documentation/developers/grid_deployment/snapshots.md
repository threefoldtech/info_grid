<h1>Snapshots for Grid Backend Services</h1>
<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Services](#services)
- [ThreeFold Public Snapshots](#threefold-public-snapshots)
- [Deploy the Services with Scripts](#deploy-the-services-with-scripts)
  - [Create the Snapshots](#create-the-snapshots)
  - [Start All the Services](#start-all-the-services)
  - [Stop All the Services](#stop-all-the-services)
- [Expose the Snapshots with Rsync](#expose-the-snapshots-with-rsync)
  - [Create the Service Configuration File](#create-the-service-configuration-file)
  - [Start the Service](#start-the-service)

***

## Introduction

To facilitate deploying grid backend services, we provide snapshots to significantly reduce sync time. This can be setup anywhere from scratch. Once all services are synced, one can use the scripts to create snapshots automatically.

To learn how to deploy your own grid stack, read [this section](./grid_deployment_full_vm.md).

## Services

There are 3 grid backend services that collect enough data to justify creating snapshots:

- ThreeFold blockchain - TFChain
- Graphql - Indexer
- Graphql - Processor

## ThreeFold Public Snapshots

ThreeFold hosts all available snapshots at: [https://bknd.snapshot.grid.tf/](https://bknd.snapshot.grid.tf/). Those snapshots can be downloaded with rsync:

- Mainnet:
    ```
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshots/tfchain-mainnet-latest.tar.gz .  
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshots/indexer-mainnet-latest.tar.gz .  
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshots/processor-mainnet-latest.tar.gz .  
    ```
- Testnet:
    ```
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshotstest/tfchain-testnet-latest.tar.gz .  
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshotstest/indexer-testnet-latest.tar.gz .  
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshotstest/processor-testnet-latest.tar.gz .  
    ```
- Devnet:
    ```
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshotsdev/tfchain-devnet-latest.tar.gz .  
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshotsdev/indexer-devnet-latest.tar.gz .  
    rsync -Lv --progress --partial rsync://bknd.snapshot.grid.tf:34873/gridsnapshotsdev/processor-devnet-latest.tar.gz .   
    ```

## Deploy the Services with Scripts

You can deploy the 3 individual services using known methods such as [Docker](../../system_administrators/computer_it_basics/docker_basics.md). To facilitate the process, scripts are provided that run the necessary docker commands. 

The first script creates the snapshots, while the second and third scripts serve to start and stop all services.

You can use the start script to start all services and then set a cron job to execute periodically the snapshot creation script. This will ensure that you always have the latest version available on your server.

### Create the Snapshots

You can set a cron job to execute a script running rsync to create the snapshots and generate logs at a given interval.

- First download the script.
  - Main net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/mainnet/create_snapshot.sh
    ```
  - Test net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/testnet/create_snapshot.sh
    ```
  - Dev net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/devnet/create_snapshot.sh
    ```
- Set the permissions of the script
    ```
    chmod +x create_snapshot.sh
    ```
- Make sure to a adjust the snapshot creation script for your specific deployment
- Set a cron job
    ```
    crontab -e
    ```
  - Here is an example of a cron job where we execute the script every day at 1 AM and send the logs to `/var/log/snapshots/snapshots-cron.log`.
      ```sh
      0 1 * * * sh /opt/snapshots/create-snapshot.sh > /var/log/snapshots/snapshots-cron.log 2>&1
      ```

### Start All the Services

You can start all services by running the provided scripts.

- Download the script.
  - Main net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/mainnet/startall.sh
    ```
  - Test net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/testnet/startall.sh
    ```
  - Dev net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/devnet/startall.sh
    ```
- Set the permissions of the script
    ```
    chmod +x startall.sh
    ```
- Run the script to start all services via docker engine.
    ```
    ./startall.sh
    ```

### Stop All the Services

You can stop all services by running the provided scripts.

- Download the script.
  - Main net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/mainnet/stopall.sh
    ```
  - Test net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/testnet/stopall.sh
    ```
  - Dev net
    ```
    wget https://github.com/threefoldtech/grid_deployment/blob/development/grid-snapshots/devnet/stopall.sh
    ```
- Set the permissions of the script
    ```
    chmod +x stopall.sh
    ```
- Run the script to stop all services via docker engine.
    ```
    ./stopall.sh
    ```

## Expose the Snapshots with Rsync

We use rsync with a systemd service to expose the snapshots to the community.

### Create the Service Configuration File

To setup a public rsync server, create and edit the following file:

`/etc/rsyncd.conf`

```sh
pid file = /var/run/rsyncd.pid
lock file = /var/run/rsync.lock
log file = /var/log/rsync.log
port = 34873
max connections = 20
exclude = lost+found/
transfer logging = yes
use chroot = yes
reverse lookup = no

[gridsnapshots]
path = /storage/rsync-public/mainnet
comment = THREEFOLD GRID MAINNET SNAPSHOTS
read only = true
timeout = 300
list = false

[gridsnapshotstest]
path = /storage/rsync-public/testnet
comment = THREEFOLD GRID TESTNET SNAPSHOTS
read only = true
timeout = 300
list = false

[gridsnapshotsdev]
path = /storage/rsync-public/devnet
comment = THREEFOLD GRID DEVNET SNAPSHOTS
read only = true
timeout = 300
list = false
```

### Start the Service

Start and enable via systemd:

```sh
systemctl start rsync
systemctl enable rsync
systemctl status rsync
```
