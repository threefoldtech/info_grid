<h1>Snapshots for Grid Backend Services</h1>
<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [ThreeFold Public Snapshots](#threefold-public-snapshots)
- [Services](#services)
- [Deploy Services](#deploy-services)
- [Script](#script)
- [Rsync](#rsync)

***

## Introduction

To facilitate deploying grid backend services, we provide snapshots to significantly reduce sync time. This can be setup anywhere from scratch. Once all services are synced, one can use the scripts to create snapshots automatically.

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

## Services

There are 3 grid backend services that collect enough data to justify creating snapshots:

- Threefold blockchain - TFchain
- Graphql - Indexer
- Graphql - Processor


## Deploy Services

You can deploy the 3 individual services using known methods such as [Docker](https://manual.grid.tf/computer_it_basics/docker_basics.html).

## Script

You can [set a cron job to execute a script running rsync](../computer_it_basics/file_transfer.md#automate-backup-with-rsync) to create the snapshots and generate logs at a given interval.

- Create a script to run rsync ([see commands above](#public-rsync-provided-by-threefold))
- Set a cron job
    ```
    crontab -e
    ```
- Example of cron job
    ```sh
    0 1 * * * sh /opt/snapshots/create-snapshot.sh > /var/log/snapshots/snapshots-cron.log 2>&1
    ```

This example will execute the script every day at 1 AM and send the logs to `/var/log/snapshots/snapshots-cron.log`.


## Rsync

We use rsync to expose the snapshots to the community. To setup a public rsync server, create and edit the following file:

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

Start and enable via systemd:

```sh
systemctl start rsync
systemctl enable rsync
systemctl status rsync
```
