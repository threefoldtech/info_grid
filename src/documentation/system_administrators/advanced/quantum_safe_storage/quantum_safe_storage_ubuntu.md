<h1> Quantum Safe Storage: Deploy Manually with Ubuntu </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Deployment Prerequisites](#deployment-prerequisites)
- [Deploy a Full VM](#deploy-a-full-vm)
- [VM Prerequisistes](#vm-prerequisistes)
- [Prepare the Grid Client](#prepare-the-grid-client)
- [Set ZDB](#set-zdb)
- [Directories](#directories)
- [Install the individual components](#install-the-individual-components)
- [0-stor](#0-stor)
  - [Zstor](#zstor)
- [Local 0-db](#local-0-db)
- [0-db-fs](#0-db-fs)
- [It does not work](#it-does-not-work)

---

## Introduction

We explain how to manually set up QSFS on Ubuntu. 

Note that when using another linux distribution, some steps can be slightly different.

## Deployment Prerequisites

- [A TFChain account](../../../dashboard/wallet_connector.md)
- TFT in your TFChain account
  - [Buy TFT](../../../threefold_token/buy_sell_tft/buy_sell_tft.md)
  - [Send TFT to TFChain](../../../threefold_token/tft_bridges/tfchain_stellar_bridge.md)

## Deploy a Full VM

We start by deploying a full VM on the ThreeFold Dashboard.

* On the [Threefold Dashboard](https://dashboard.grid.tf/#/), go to the [full virtual machine deployment page](https://dashboard.grid.tf/#/deploy/virtual-machines/full-virtual-machine/)
* Deploy a full VM (Ubuntu 22.04)
  * IPv4 Address
  * Minimum vcores: 1vcore
  * Minimum MB of RAM: 4096GB
  * Minimum storage: 15GB
  * Network
    * Use either IPv6 or Yggdrasil
* After deployment, note the VM IPv4 address
* Connect to the VM via SSH
  * ``` 
    ssh root@VM_IP_Address
    ```

## VM Prerequisistes

We start by installing the prerequisites on the VM:

- Update the VM

```
apt-get update
```

- Install npm and node

```
apt-get install libtool
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
nvm install 18
```

- Install yarn
```
apt install cmdtest
```

- Install the ThreeFold Grid dependencies
```
npm install @threefold/types
npm install @threefold/tfchain_client
```

- [Install the grid client](../../../developers/javascript/grid3_javascript_installation.md)

```
git clone https://github.com/threefoldtech/tfgrid-sdk-ts
cd tfgrid-sdk-ts
npm install
```

- Go to the grid client subdirectory
```
cd packages/grid_client

```

- Test the grid client by generating the docs
```
npm run serve-docs
```

## Prepare the Grid Client

- Go to the grid client subdirectory
```
cd grid_client
```
- Set the `config.json` file with the network, mnemonics, storeSecret and your computer public SSH key.
```
nano ./scripts/config.json
```

## Set ZDB

In order to store the data in remote locations, you need to have 0-db's.
4 0-db's are needed for the metadata and m+n for the data, n being the number of 0-db's that can be lost without data loss ( m 0-db's are required to restore the data ).

How to deploy 0-db's for qsfs on the Threefold grid is explained in the [manual](https://www2.manual.grid.tf/javascript/grid3_javascript_qsfs_zdbs.html).

If the 0-db's are deployed on the grid, make sure you can connect to the Theefold Planetary network.
This is already working if you are setting up QSFS on a VM on the grid, if not this needs to be configured.

## Directories

A QSFS mount point is required and a directory for qsfs to store the temporary data.
This guide assumes `/mnt/qsfs` for the mount point and `/data` for the qsfs temporary data. Create them if they do not exist yet.

## Install the individual components

`wget` the latest released binaries from the following components:

- 0-db-fs: <https://github.com/threefoldtech/0-db-fs/releases>: take the `amd64-linux-static` binary and save at `/bin/0-db-fs`
- 0-db: <https://github.com/threefoldtech/0-db/releases>: take the static binary and sace at `/bin/0-db`
- 0-stor: <https://github.com/threefoldtech/0-stor_v2/releases>: take `linux-musl` binary and save at `/bin/zstor`

Make sure all binaries are executable:`chmod a+x /bin/0-db-fs /bin/0-db /bin/zstor`

## 0-stor

Adapt the [example zstor configuration](./example_zstor_config.toml) to use the previously created 0-db's, set an [encryption key](./encryption.md) and save it at `/etc/zstor_default/toml`.

Now `zstor` can be started: `/usr/local/bin/zstor -c /etc/zstor_default.toml monitor`. If you don't want the process to block your terminal, you can start it in the background: `nohup /tmp/zstor -c /etc/zstor_default.toml monitor &`.

### Zstor

end section of zstor_config.toml

```
[[meta.config.backends]]
address = "[2a02:1802:5e:0:c11:7dff:fe8e:83bb]:9900"
namespace = "18-532404-node1meta0"
password = "Choose a password and write it here"

[[meta.config.backends]]
address = "[2a02:1802:5e:0:a89b:bfff:fec4:5205]:9900"
namespace = "18-532405-node8meta0"
password = "Choose a password and write it here"

[[meta.config.backends]]
address = "[2a02:1802:5e:0:8c0e:bfff:fe33:fa8b]:9900"
namespace = "18-532406-node11meta0"
password = "Choose a password and write it here"

[[meta.config.backends]]
address = "[2a02:1802:5e:0:107d:6dff:fe38:c095]:9900"
namespace = "18-532407-node13meta0"
password = "Choose a password and write it here"

[[groups]]
# Node 1
[[groups.backends]]
address = "[2a02:1802:5e:0:c11:7dff:fe8e:83bb]:9900"
namespace = "18-532410-node1backend0"
password = "Choose a password and write it here"
```

## Local 0-db

First we will get the [hook script](../lib/zdb-hook.sh).  Download it to `/bin/zdb-hook.sh` and make sure it is executable (`chmod +x /bin/zdb-hook.sh`).

The local 0-db which is used by 0-db-fs can now be started:

```sh
/bin/0-db \
    --index /data/index \
    --data /data/data \
    --datasize 67108864 \
    --mode seq \
    --hook /bin/zdb-hook.sh \
    --background
```

## 0-db-fs

Finally, we will start 0-db-fs. This guides opts to mount the fuse filesystem in `/mnt/qsfs`.

```sh
/bin/0-db-fs /mnt/qsfs -o autons -o background
```

You should now have the qsfs filesystem mounted at `/mnt/qsfs`. As you write data, it will save it in the local 0-db, and it's data containers will be periodically encoded and uploaded to the backend data storage 0-db's.

## It does not work

Check the [troubleshooting guide](./troubleshooting.md).