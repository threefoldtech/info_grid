<h1> Quantum Safe Storage: Manual Deployment</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Deployment Prerequisites](#deployment-prerequisites)
- [Deploy front end VM](#deploy-front-end-vm)
- [Deploy Back End Zdbs](#deploy-back-end-zdbs)
  - [Prerequisites](#prerequisites)
  - [Install Tfcmd](#install-tfcmd)
  - [Create Stub Zstor Config](#create-stub-zstor-config)
  - [Prepare for Zdb Deployment](#prepare-for-zdb-deployment)
  - [Deploy Metadata Zdbs](#deploy-metadata-zdbs)
  - [Cancel Metadata Zdbs](#cancel-metadata-zdbs)
  - [Write Metadata Zdbs Config](#write-metadata-zdbs-config)
  - [Deploy Data Zdbs](#deploy-data-zdbs)
  - [Cancel Metadata Zdbs](#cancel-metadata-zdbs-1)
  - [Write Data Zdbs Config](#write-data-zdbs-config)
  - [Storing Zstor Config](#storing-zstor-config)
- [Front End Deployment](#front-end-deployment)
  - [Install Binaries](#install-binaries)
  - [Directories](#directories)
  - [Zstor Config](#zstor-config)
  - [Start Zstor](#start-zstor)
  - [Local Zdb](#local-zdb)
  - [Zdbfs](#zdbfs)
- [System Services Setup](#system-services-setup)
  - [Systemd Unit Files](#systemd-unit-files)
  - [Systemd Enable Services](#systemd-enable-services)
  - [Zinit Config Files](#zinit-config-files)
- [Conclusion](#conclusion)

---

## Introduction

This section covers the manual deployment steps for QSFS, including both the back end zdbs and an Ubuntu VM to host the front end. It is also possible to host the front end on pretty much any other Linux machine as long as FUSE is available. At this point you should already have node IDs selected for your back end zdbs. If not, please see the [previous section](./quantum_safe_storage_planning.md) for more details.

While there are several ways to deploy zdbs on the ThreeFold Grid, including using Terraform and custom code using one of the SDKs, this guide shows how to to do this with our simple command line tool, tfcmd. This tool is available both for Linux and MacOS. For best security of the seed phrase used to create the deployments, it is recommended to run tfcmd on your local machine. However, it is also possible to use it inside the VM deployed for the QSFS front end.

## Deployment Prerequisites

Before proceeding, we assume that you have an activated TFChain account funded with TFT.

- [TFChain accounts](../../../dashboard/wallet_connector.md)
- [Buy TFT](../../../threefold_token/buy_sell_tft/buy_sell_tft.md)
- [Send TFT to TFChain](../../../threefold_token/tft_bridges/tfchain_stellar_bridge.md)

## Deploy front end VM

Both full and micro VMs work fine for the QSFS front end.

There are a few considerations to keep in mind for this VM:

- QSFS will consume more CPU and RAM as load increases.
- 1 vCPU and 2 GB of RAM can work for light loads, but at least an additional vCPU will be helpful for heavier loads.
- The SSD capacity of the VM is the maximum available front end cache size for QSFS.
- You should enable Mycelium networking, as this will be required to connect to the zdbs.

You can deploy this VM using the [Dashboard](https://dashboard.grid.tf/#/deploy/virtual-machines/) or via the various other methods described in the ThreeFold Manual.

If you plan to use the front end VM to run tfcmd and deploy the zdbs, then connect to the VM via SSH now and run all the following commands on the VM.

## Deploy Back End Zdbs

Now we will deploy the back end zdbs using tfcmd. To assist with creating multiple deployments efficiently, some short scripts will be shown below. These scripts have been tested in bash and might not work in other shells. At the same time, we will also create our zstor config file, which must contain information about the back ends.

### Prerequisites

We will use `wget`, `jq`, and `openssl`. Make sure that they are properly installed on the system you will be using. On Ubuntu, for example, you can use this command:

```sh
apt update && apt install -y wget jq openssl
```

### Install Tfcmd

Here we will fetch the `tfcmd` binary and install it locally. It is released as part of `tfgrid-sdk-go`. You can find the latest releases [here](https://github.com/threefoldtech/tfgrid-sdk-go/releases). Choose the correct download link for your platform.

For example, to install version 15.10 on a x64 Linux machine, you would run the following:

```
wget -O tfgrid-sdk-go.tar.gz https://github.com/threefoldtech/tfgrid-sdk-go/releases/download/v0.15.10/tfgrid-sdk-go_Linux_x86_64.tar.gz
tar -C /usr/local/bin -xf tfgrid-sdk-go.tar.gz tfcmd
chmod +x /usr/local/bin/tfcmd
rm tfgrid-sdk-go.tar.gz
```

To test that it worked, you can use the following command:

```sh
tfcmd version
```

### Create Stub Zstor Config

Next we will create a stub of the zstor config file. This will contain all of the information that needs to be filled manually. The final sections with the back end info will be filled automatically using scripts.

Open a file `zstor-default.toml` in a text editor and paste in the template below. For example:

```sh
nano zstor-default.toml
```

Initial contents of the file:

```
minimal_shards = 16
expected_shards = 20
redundant_groups = 0
redundant_nodes = 0
zdbfs_mountpoint = "/mnt/qsfs"
socket = "/var/run/zstor.sock"
prometheus_port = 9100
zdb_data_dir_path = "/data/data/zdbfs-data"
max_zdb_data_dir_size = 25600

[encryption]
algorithm = "AES"
key = "Write your key here"

[compression]
algorithm = "snappy"

[meta]
type = "zdb"

[meta.config]
prefix = "qsfs-meta"

[meta.config.encryption]
algorithm = "AES"
key = "write your key here"
```

Make sure to edit the file as needed. You can change the minimal and expected shards according to your own plan. Another important value is `max_zdb_data_dir_size`, which is how large the cache is allowed to grow before data blocks are removed. This value is given in MiB. Therefore, the example shown is 25GiB.

It is also necessary to fill in the encryption keys with your own. You can use the same or different keys for data and metadata, at your own preference. The key must be 32 bytes in hex format. Here's an example of how to generate a key in this format:

```sh
openssl rand -hex 32
```

Once this is done, take the output and insert it into the file in the indicated locations.

### Prepare for Zdb Deployment

Now we will deploy the zdbs and write their details into the config file in the proper format. Before proceeding, we'll set a few shell variables that will be used in the deployment scripts:

```sh
CONFIG=zstor-default.toml
PASSWORD=$(openssl rand -base64 18)
METADATA_NODES="1 2 3 4"
back end_NODES="1 2 3 4 5 6 7 8"
back end_SIZE=1
```

This will generate a strong random password that will be used to secure each zdb. You can replace the code that generates the password with your own password if you wish. For now, don't worry about having to save the randomly generated password. It will get written to the config file and you can take note of it later.

For the metadata and back end nodes, replace the example values with the node IDs you selected before. Set your desired back end size too, which is specified in gigabtyes.


### Deploy Metadata Zdbs

Here is an example script to deploy the metadata zdbs based on the variables set above. This uses a fixed size of 1 GB, which should be plenty:

```sh
for node in $METADATA_NODES; do
  name=node${node}meta
  tfcmd deploy zdb --mode user --node $node -n $name --size 1 --password $PASSWORD
done
```

It's possible that some of your chosen nodes don't respond properly at deployment time and need to be replaced with other nodes. In that case, just replace the variable with the new node IDs like this:

```sh
# Example: Node 3 wasn't working, replace it with node 5
METADATA_NODES="1 2 4 5"
```

Then you can just run the original deployment script loop again. Any zdb deployments that would be duplicated will be detected by `tfcmd` and skipped over.

### Cancel Metadata Zdbs

If you need to cancel the metadata zdb deployments, use this script:

```sh
for node in $METADATA_NODES; do
  name=node${node}meta
  tfcmd cancel $name
done
```

### Write Metadata Zdbs Config

Next we will write the configuration data from the deployed zdbs into the config file. The script as shown is for IPv6 connections. If you are using Yggdrasil, replace `.Zdbs[0].ips[0]` with `.Zdbs[0].ips[1]`

```sh
# Wait about five seconds before doing the next step to make sure data is available. Only needed if running immediately after the deployment step in a single script
sleep 5

# Write out the config sections for the metadata zdbs
for node in $METADATA_NODES; do
  name=node${node}meta
  echo Fetching and writing config for $name
  json=$(tfcmd get zdb $name 2>&1 | tail -n +3 | sed $'s/\e\[0m//')
  ip=$(echo $json | jq .Zdbs[0].ips[-1] | tr -d \")
  port=$(echo $json | jq .Zdbs[0].port)
  namespace=$(echo $json | jq .Zdbs[0].namespace)
  password=$(echo $json | jq .Zdbs[0].password)

  echo \# Node $node >> $CONFIG
  echo [[meta.config.back ends]] >> $CONFIG
  echo address = \"\[$ip\]:$port\" >> $CONFIG
  echo namespace = $namespace >> $CONFIG
  echo password = $password >> $CONFIG
  echo >> $CONFIG
done
```

Once that has completed, you can check inside your `zstor-default.toml` file to see the result. There should be four sections that look like this:

```
# Node 1
[[meta.config.back ends]]
address = "[2a02:1802:5e:0:c11:7dff:fe8e:83bb]:9900"
namespace = "18-532404-node1meta0"
password = "Your password"
```

Sometimes `tfcmd` fails to fetch deployment information from one or more nodes. In that case, you might see one block with blank fields. You can try generating those sections again by changing the script to only target those node IDs.

Here's an example to retry nodes 2 and 3:

```sh
# Example with nodes 2 and 3. Write out the config sections for the metadata zdbs
for node in 2 3; do
  # The rest of the script is the same
  # ...
```

Then check the file again. Make sure that all the metadata nodes you specified have a populated config section and that result of any failed attempts are deleted.

### Deploy Data Zdbs

This process is very similar to the deployment of the metadata back ends, with a few small changes to the scripts.

To deploy:

```sh
for node in $back end_NODES; do
  name=node${node}back end
  tfcmd deploy zdb --mode seq --node $node -n $name --size $back end_SIZE --password $PASSWORD
done
```

As before, you might need to replace some node IDs and try again:

```sh
# Example: Node 3 wasn't working, replace it with node 9
back end_NODES="1 2 4 5 6 7 8 9"
```

Then run the deployment loop again.

### Cancel Metadata Zdbs

Likewise, if you need to cancel the data zdb deployments, use this script:

```sh
for node in $back end_NODES; do
  name=node${node}back end
  tfcmd cancel $name
done
```

### Write Data Zdbs Config

To write the config for the data zdbs, use the following script:

```sh
# Ditto, need to wait
sleep 5

echo [[groups]] >> $CONFIG
for node in $back end_NODES; do
  name=node${node}back end
  echo Fetching and writing config for $name
  json=$(tfcmd get zdb $name 2>&1 | tail -n +3 | sed $'s/\e\[0m//')
  ip=$(echo $json | jq .Zdbs[0].ips[-1] | tr -d \")
  port=$(echo $json | jq .Zdbs[0].port)
  namespace=$(echo $json | jq .Zdbs[0].namespace)
  password=$(echo $json | jq .Zdbs[0].password)

  echo \# Node $node >> $CONFIG
  echo [[groups.back ends]] >> $CONFIG
  echo address = \"\[$ip\]:$port\" >> $CONFIG
  echo namespace = $namespace >> $CONFIG
  echo password = $password >> $CONFIG
  echo >> $CONFIG
done
```

Notice this time that the data back ends have an extra line `[[groups]]` separating them from the top of the file. This script just creates a single group. If you want to use more groups, add more groups lines to separate the back ends in each group.

As before, check the output for any failures to retrieve data. You can retry them in the same way:

```sh
# Note that we skipped the line with [[groups]]
for node in $back end_NODES; do
  # The rest of the script is the same
  # ...
```

Once every data back end has a valid entry in the config file, we are done with this section of the deployment.

### Storing Zstor Config

The `zstor-default.toml` file contains sensitive information that is sufficient to recover and decrypt all of the data stored in your QSFS. Needless to say, you should keep the contents of this file secure.

If your front end machine is lost for any reason, the zstor config file can be used to recover the data. On the other hand, if the contents of this file are lost, the data in the back ends can never be recovered.

*Consider storing the entire contents of your `zstor-default.toml` file in a durable and secure data store like a password manager.*

## Front End Deployment

At this point, we are ready to complete the setup of the front end. We'll demonstrate all necessary commands to do this in any Linux system that already has `wget` installed, FUSE enabled in the kernel, and a Mycelium connectivity. If you deployed a VM on the ThreeFold Grid according to the instructions above, then these requirements are already met. 

### Install Binaries

The three binary executables needed to operate QSFS are provided in statically compiled form with no dependencies. You can download them from GitHub according to the links on each project's release page:

- 0-db-fs: [https://github.com/threefoldtech/0-db-fs/releases](https://github.com/threefoldtech/0-db-fs/releases)
- 0-db: [https://github.com/threefoldtech/0-db/releases](https://github.com/threefoldtech/0-db/releases)
- 0-stor: [https://github.com/threefoldtech/0-stor_v2/releases](https://github.com/threefoldtech/0-stor_v2/releases)


Here is an example with the latest versions of each component at the time of publishing this guide. We will also download a hook script that is the final needed component:

```
wget -O /usr/local/bin/zdbfs https://github.com/threefoldtech/0-db-fs/releases/download/v0.1.11/zdbfs-0.1.11-amd64-linux-static
wget -O /usr/local/bin/zdb https://github.com/threefoldtech/0-db/releases/download/v2.0.8/zdb-2.0.8-linux-amd64-static
wget -O /bin/zstor https://github.com/threefoldtech/0-stor_v2/releases/download/v0.4.0/zstor_v2-x86_64-linux-musl
wget -O /usr/local/bin/zdb-hook.sh https://raw.githubusercontent.com/threefoldtech/quantum-storage/master/lib/zdb-hook.sh

# Make them all executable
chmod +x /usr/local/bin/* /bin/zstor
```

One note here is that the name and location of the `zstor` executable must match what is shown here for the hook script to work properly.

### Directories

Two directories will be needed for QSFS operation. You can create them as follows:

```sh
mkdir -p /mnt/qsfs
mkdir -p /data
```

### Zstor Config

Now copy your `zstor-default.toml` to the `/etc` folder inside the VM. For example, you can open the file in nano and paste in the contents:

```sh
nano /etc/zstor-default.toml
```

### Start Zstor

Start up the zstor daemon by running the following command. You can replace the log file location with another if you like:

```
zstor --log_file ~/zstor.log -c /etc/zstor-default.toml monitor &
```

Check that zstor is working properly and that it can connect to all the back ends with the following status command:

```
zstor --log_file ~/zstor.log -c /etc/zstor-default.toml status
```

You can use this command later to check space consumption and system health.

### Local Zdb

Now we start the local zdb inside the VM that will be used by zdbfs. There are two arguments here that might be of interest for tuning. 

The first is `--datasize`, which is the maximum size of data blocks, in bytes. Here use 64MiB.

The other argument to consider is `--rotate`, which is the time at which incomplete data blocks are closed and backed up. This value is in seconds, so the example is 15 minutes. Reducing this time can help reduce the chance of data loss if the front end is lost, but it will also result in more data fragmentation.

Again, there's a log file option that can be changed if desired.

```sh
zdb \
  --index /data/index \
  --data /data/data \
  --logfile ~/zdb.log \
  --datasize 67108864 \
  --mode seq \
  --hook /usr/local/bin/zdb-hook.sh \
  --rotate 900 \
  --background
```

### Zdbfs

Finally, we will start zdbfs. This guides shows mounting the FUSE filesystem in `/mnt/qsfs`. If you want to change this, also change the mount point option in `zstor-default.toml`.

```sh
zdbfs /mnt/qsfs -o logfile ~/zdbfs.log -o autons -o background
```

You should now have the QSFS filesystem mounted at `/mnt/qsfs`. As you write data, it will save it in the local zdb, and its data blocks will be periodically encoded and uploaded to the back end zdbs.

If you need to start up zdbfs again, you will see an error regarding namespace creation if the `autons` option is presented again. This error is harmless and operation will continue normally. You can also remove the option after the first run to avoid this error.

## System Services Setup

At this point we have successfully deployed a QSFS instance. However, if any of the component programs exits for any reason or if the machine they are running on is rebooted, the services won't start up again automatically. To address that, we'll show examples of how to use process managers to start each program on boot and keep them alive while the machine runs.

Two versions are presented below. The first is for systemd based systems, such as our full VMs on the ThreeFold network. The second shows how to accomplish the same using zinit, which is the process manager inside our micro VMs. Choose the one that fits your use case and skip the other.

### Systemd Unit Files

We will create three systemd unit files, one for each service. Simply copy and paste each into a new file at the specified path.

There are a couple of important values to note in the examples below and potentially tune to your needs. By default, systemd limits restarts to five within ten seconds before giving up. Along with a default 100ms restart wait, this means that services entering a crash loop quickly become defunct with no further retries until some intervention occurs.

By setting StartLimitIntervalSec to zero, we have disabled the restart limit entirely. Thus systemd will continue trying to restart the services forever, no matter how many consecutive exits occur. The examples here are also retaining the 100ms default, but presenting it explicitly for ease of tuning.

Taken together, this means that any unexpected exits of the three services will result in a speedy restart but in the event of a crash loop this will put a fair amount of strain on the CPU. While crash loops are by no means expected, you may wish to increase `RestartSec` if this is a concern to you.

Let's start then with the zstor unit file:


```sh
nano /etc/systemd/system/zstor.service
```

Another important value to make note of here is `TimeoutStopSec`, which is how long systemd will wait before terminating zstor when stopping the service (such as when the system is shutting down gracefully). In this case, this represents how much time zstor will have to upload its final data block to the backends before the process is killed. Here we provide a fairly generous five minute window, which on the other hand is how long the system might wait to shutdown if zstor fails to exit for some other reason. A longer timeout might be safer, especially under bad network conditions.

```
[Unit]
Wants=network.target
After=network.target
StartLimitIntervalSec=0

[Service]
ProtectHome=true
ProtectSystem=true
ReadWritePaths=/data /var/log
ExecStart=/bin/zstor \
  --log_file /var/log/zstor.log \
  -c /etc/zstor-default.toml \
  monitor
Restart=always
RestartSec=100ms
TimeoutStopSec=5m

[Install]
WantedBy=multi-user.target
```

Next we'll set up a unit file for zdb:

```sh
nano /etc/systemd/system/zdb.service
```

In this case, we use a shorter `TimeoutStopSec`, to give some time for zdb to flush remaining data to disk, but with the assumption that this happens much more quickly than zstor's network based operations.

```
[Unit]
Wants=network.target zstor.service
After=network.target zstor.service

[Service]
ProtectHome=true
ProtectSystem=true
ReadWritePaths=/data /var/log
ExecStart=/usr/local/bin/zdb \
    --index /data/index \
    --data /data/data \
    --logfile /var/log/zdb.log \
    --datasize 67108864 \
    --hook /usr/local/bin/zdb-hook.sh \
    --rotate 900
Restart=always
RestartSec=5
TimeoutStopSec=60

[Install]
WantedBy=multi-user.target
```

Finally, here's the unit file for zdbfs:

```
nano /etc/systemd/system/zdb.service
```

In the case of zdbfs, `TimeoutStopSec` is less relevant. When zdbfs receives `TERM` it will exit regardless of any ongoing writes, and those writes operations will encounter an error. There is a final flush to the zdb, but this happens very quickly when the zdb is running on the same machine so five seconds should be more than enough.

```
[Unit]
Wants=network.target zdb.service
After=network.target zdb.service

[Service]
ProtectHome=true
ProtectSystem=true
ExecStart=/usr/local/bin/zdbfs /mnt/qsfs -o autons
Restart=always
RestartSec=5
TimeoutStopSec=5

[Install]
WantedBy=multi-user.target
```

### Systemd Enable Services

With the unit files written, the last step is to enable the units and start them up. First, we'll stop all of the manually started processes from before:

```
pkill zdbfs
pkill zdb
pkill zstor
```

Next we'll instruct systemd to reload the unit files and enable the services with an immediate start:

```
systemctl daemon-reload
systemctl enable --now zstor
systemctl enable --now zstor
systemctl enable --now zdbfs
```

Check that zstor is working well:

```sh
zstor --log_file ~/zstor.log -c /etc/zstor-default.toml status
```

And check that zdbfs is mounted:

```sh
df
```

All of the services should start up in the correct order anytime the machine is rebooted. You can now skip ahead of the next two sections on zinit, to the conclusion section.

### Zinit Config Files

```sh
nano /etc/zinit/zstor.yaml
```

The shutdown timeout is the maximum time that zstor will have to write any pending data to the backends before it is killed by zinit. Here we specify five minutes, which is fairly generous, but can also mean a long wait to stop the service if it hangs for some reason. A longer timeout might be safer, especially under bad network conditions.

```yaml
exec: /bin/zstor \
  --log_file /var/log/zstor.log \
  -c /etc/zstor-default.toml \
  monitor
shutdown_timeout: 300
```

Next the zinit config for zdb:

```sh
nano /etc/zinit/zdb.yaml
```

In this case, we use a shorter shutdown timeout, to give some time for zdb to flush remaining data to disk, but with the assumption that this happens much more quickly than zstor's network based operations.

```yaml
exec: /usr/local/bin/zdb \
    --index /data/index \
    --data /data/data \
    --logfile /var/log/zdb.log \
    --datasize 67108864 \
    --hook /usr/local/bin/zdb-hook.sh \
    --rotate 900
shutdown_timeout: 60
after: zstor
```

Finally for zdbfs:

```sh
nano /etc/zinit/zdbfs.yaml
```

In the case of zdbfs, the shutdown timeout is less relevant. When zdbfs receives `TERM` it will exit regardless of any ongoing writes, and those writes operations will encounter an error. There is a final flush to the zdb, but this happens very quickly when the zdb is running on the same machine so five seconds should be more than enough.

```yaml
exec: /usr/local/bin/zdbfs /mnt/qsfs -o autons
after: zdb
```

With the config files written, the last step is to enable the units and start them up. First, we'll stop all of the manually started processes from before:

```
pkill zdbfs
pkill zdb
pkill zstor
```

Next we'll instruct zinit to load the config files and start the services:

```
zinit monitor zdbfs
zinit monitor zdb
zinit monitor zstor
```

Check that zstor is working well:

```sh
zstor --log_file ~/zstor.log -c /etc/zstor-default.toml status
```

And check that zdbfs is mounted:

```sh
df
```

All of the services should start up in the correct order anytime the machine is rebooted.

## Conclusion

Deployment of QSFS is now complete. In the next section, we'll cover concerns regarding the ongoing operation of a QSFS system, including how to recover from back end failures.