<h1>Snapshots for Grid Backend Services</h1>
<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Services](#services)
- [ThreeFold Public Snapshots](#threefold-public-snapshots)
- [Requirements](#requirements)
  - [Files for Each Net](#files-for-each-net)
  - [Deploy All 3 Network Instances](#deploy-all-3-network-instances)
- [Deploy a Snapshot Backend](#deploy-a-snapshot-backend)
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

## Requirements

To run your own snapshot backend, you need the following:

- Configuration
  - A working docker environment 
  - 'node key' for the TFchain public RPC node, generated with `subkey generate-node-key`

   Hardware
  - min of 8 modern CPU cores
  - min of 32GB RAM
  - min of 1TB SSD storage (high preference for NVMe based storage), preferably more (as the chain keeps growing in size)
  - min of 2TB HDD storage (to store and share the snapshots)

Dev, QA and Testnet can do with a Sata SSD setup. Mainnet requires NVMe based SSDs due to the data size.

**Note**: If a deployment does not have enough disk input/output operations per second (iops) available, you might see the processor container restarting regulary and grid_proxy errors regarding processor database timeouts.

### Files for Each Net

Each folder contains the required deployment files for its net. Make sure to work in the folder that has the name of the network you want to create snapshots for.

What does each file do:
- `.env` - contains environment files maintaned by Threefold Tech
- `.gitignore` - has a list of files to ignore once the repo has been cloned. This has the purpose to not have uncommited changes to files when working in this repo
- `.secrets.env-examples` - is where you have to add all your unique environment variables
- `create_snapshot.sh` - script to create a snapshot (used by cron)
- `docker-compose.yml` - has all the required docker-compose configuration to deploy a working Grid stack
- `open_logs_tmux.sh` - opens all the docker logs in tmux sessions
- `typesBundle.json` - contains data for the Graphql indexer and is not to be touched
- `startall.sh` - starts all the (already deployed) containers
- `stopall.sh` - stops all the (already deployed) containers

### Deploy All 3 Network Instances

To deploy the 3 network instances, mainnet, testnet and mainnet, you need to follow the same process for each network on a separate machine or at least on a different VM. 

This means that you can either deploy each network instance on 3 different machines, or you can also deploy 3 different VMs on the same machine, e.g. a dedicated node. Then, each VM will run a different network instance. In this case, you will certainly need a machine with NVME storage disk and modern hardware.

## Deploy a Snapshot Backend

Here's how to deploy a snapshot backend of a given network. 

- Go to the corresponding network folder (e.g. `mainnet`).
  ```sh
  cd mainnet
  cp .secrets.env-example .secrets.env
  ```
- Open `.secrets.env` and add your generated subkey node-key.
- Check that all environment variables are correct.
  ```
  docker compose --env-file .secrets.env --env-file .env config
  ```
- Deploy the snapshot backend. Depending on the disk iops available, it can take up until a week to sync from block 0.

  ```sh
  docker compose --env-file .secrets.env --env-file .env up -d
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
      0 1 * * * sh /root/code/grid_deployment/grid-snapshots/mainnet/create_snapshot.sh > /var/log/snapshots/snapshots-cron.log 2>&1
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
