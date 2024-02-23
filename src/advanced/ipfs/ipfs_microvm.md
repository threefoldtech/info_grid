<h1> IPFS on a Micro VM</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Deploy a Micro VM](#deploy-a-micro-vm)
- [Install the Prerequisites](#install-the-prerequisites)
- [Set a Firewall](#set-a-firewall)
  - [Additional Ports](#additional-ports)
- [Install IPFS](#install-ipfs)
- [Set IPFS](#set-ipfs)
- [Set IPFS with zinit](#set-ipfs-with-zinit)
- [Final Verification](#final-verification)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this ThreeFold guide, we explore how to set an IPFS node on a micro VM using the ThreeFold Playground.

## Deploy a Micro VM

We start by deploying a micro VM on the ThreeFold Playground.

* Go to the [Threefold Playground](https://playground.grid.tf/#/)
* Deploy a micro VM (Ubuntu 22.04) with an IPv4 address
  * IPv4 Address
  * Minimum vcores: 1vcore
  * Minimum MB of RAM: 1024MB
  * Minimum storage: 50GB
* After deployment, note the VM IPv4 address
* Connect to the VM via SSH
  * ``` 
    ssh root@VM_IPv4_address
    ```

## Install the Prerequisites

We install the prerequisites before installing and setting IPFS.

* Update Ubuntu
  * ```
    apt update
    ```
* Install nano and ufw
  * ```
    apt install nano && apt install ufw -y
    ```

## Set a Firewall

We set a firewall to monitor and control incoming and outgoing network traffic. To do so, we will define predetermined security rules. As a firewall, we will be using [Uncomplicated Firewall](https://wiki.ubuntu.com/UncomplicatedFirewall) (ufw).

For our security rules, we want to allow SSH, HTTP and HTTPS (443 and 8443).

We thus add the following rules:

* Allow SSH (port 22)
  * ```
    ufw allow ssh
    ```
* Allow port 4001
  * ```
    ufw allow 4001
    ```
* To enable the firewall, write the following:
  * ```
    ufw enable
    ```

* To see the current security rules, write the following:
  * ```
    ufw status verbose
    ```

You have enabled the firewall with proper security rules for your IPFS deployment.

### Additional Ports

We provided the basic firewall ports for your IPFS instance. There are other more advanced configurations possible.

If you want to access your IPFS node remotely, you can allow **port 5001**. This will allow anyone to access your IPFS node. Make sure that you know what you are doing if you go this route. You should, for example, restrict which external IP address can access port 5001.

If you want to run your deployment as a gateway node, you should allow **port 8080**. Read the IPFS documentation for more information on this.

If you want to run pubsub capabilities, you need to allow **port 8081**. For more information, read the [IPFS documentation](https://blog.ipfs.tech/25-pubsub/).

## Install IPFS

We install the [IPFS Kubo binary](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions).

* Download the binary
  * ```
    wget https://dist.ipfs.tech/kubo/v0.24.0/kubo_v0.24.0_linux-amd64.tar.gz
    ```
* Unzip the file
  * ```
    tar -xvzf kubo_v0.24.0_linux-amd64.tar.gz
    ```
* Change directory
  * ```
    cd kubo
    ```
* Run the install script
  * ```
    bash install.sh
    ```
* Verify that IPFS Kubo is properly installed
  * ```
    ipfs --version
    ```

## Set IPFS

We initialize IPFS and run the IPFS daemon.

* Initialize IPFS
  * ```
    ipfs init --profile server
    ```
* Increase the storage capacity (optional)
  * ```
    ipfs config Datastore.StorageMax 30GB
    ```
* Run the IPFS daemon
  * ```
    ipfs daemon
    ```

## Set IPFS with zinit

We set the IPFS daemon with zinit. This will make sure that the IPFS daemon starts at each VM reboot or if it stops functioning momentarily.

* Create the yaml file
  * ```
    nano /etc/zinit/ipfs.yaml
    ```
* Set the execution command
  * ```
    exec: /usr/local/bin/ipfs daemon
    ```
* Run the IPFS daemon with the zinit monitor command
  * ```
    zinit monitor ipfs
    ```
* Verify that the IPFS daemon is running
  * ```
    ipfs swarm peers
    ```

## Final Verification

We reboot and reconnect to the VM and verify that IPFS is properly running as a final verification.

* Reboot the VM
  * ```
    reboot -f
    ```
* Reconnect to the VM and verify that the IPFS daemon is running
  * ```
    ipfs swarm peers
    ```

## Questions and Feedback

If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.