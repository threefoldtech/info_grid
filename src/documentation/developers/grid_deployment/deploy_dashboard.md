<h1>Deploy the Dashboard Locally</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Create an SSH Tunnel](#create-an-ssh-tunnel)
- [VSCode SSH Remote Connection](#vscode-ssh-remote-connection)
- [Set the VM](#set-the-vm)
- [Build the Dashboard](#build-the-dashboard)

***

## Introduction

We show how to deploy the Dashboard (devnet) on a full VM. To do so, we set an SSH tunnel and use the VSCodium Remote Explorer function. We will then be able to use a source-code editor to explore the code and see changes on a local browser.

## Prerequisites

- TFChain account with TFT
- [Deploy full VM with WireGuard connection](../../system_administrators/getstarted/ssh_guide/ssh_wireguard.md)
- [Make sure you can connect via SSH on the terminal](../../system_administrators/getstarted/ssh_guide/ssh_openssh.md)
  
## Create an SSH Tunnel

- Open a terminal and create an SSH tunnel
    ```
    ssh -4 -L 5173:127.0.0.1:5173 root@10.20.4.2
    ```

Simply leave this window open and follow the next steps.

## VSCode SSH Remote Connection

You can connect via SSH through the source-code editor to a VM on the grid. In this example, WireGuard is set.

- Add the SSH Remote extension to VSCodium
- Add a new SSH remote connection
- Set the following (adjust with your own username and host)
  ``` 
  Host 10.20.4.2
      HostName 10.20.4.2
      User root
  ```
- Click on `Connect to host`

## Set the VM

We set the VM to be able to build the Dashboard.

```

apt update && apt install build-essential python3 -y

wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

export NVM_DIR="$HOME/.nvm"

[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm

[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion" # This loads nvm bash_completion

nvm install 18

apt install wget

npm install -g yarn

```

## Build the Dashboard

We now build the Dashboard.

Clone the repository, then install, build and run the Dashboard. Note that here it is called `playground`:

```

git clone https://github.com/threefoldtech/tfgrid-sdk-ts

cd tfgrid-sdk-ts/

yarn install

make build

make run project=playground

```

You can then access the dev net Dashboard on your local browser.