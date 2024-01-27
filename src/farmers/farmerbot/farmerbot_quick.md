<h1> Farmerbot Quick Guide </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Farmerbot Costs on the TFGrid](#farmerbot-costs-on-the-tfgrid)
- [Enable Wake-On-Lan](#enable-wake-on-lan)
- [Deploy a Full VM](#deploy-a-full-vm)
- [Method 1: Binaries and Zinit](#method-1-binaries-and-zinit)
  - [Download the Farmerbot Binaries](#download-the-farmerbot-binaries)
  - [Create the Farmerbot Files](#create-the-farmerbot-files)
  - [Run the Farmerbot](#run-the-farmerbot)
- [Method 2: Docker](#method-2-docker)
  - [Build the Farmerbot Docker Image](#build-the-farmerbot-docker-image)
  - [Create the Farmerbot Files](#create-the-farmerbot-files-1)
  - [Run the Farmerbot](#run-the-farmerbot-1)
- [Farmerbot Files](#farmerbot-files)
  - [Configuration File Template (config.yml)](#configuration-file-template-configyml)
  - [Environment Variables File Template (.env)](#environment-variables-file-template-env)
- [Running Multiple Farmerbots on the Same VM](#running-multiple-farmerbots-on-the-same-vm)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this guide, we show how to deploy the [Farmerbot](https://github.com/threefoldtech/tfgrid-sdk-go/tree/development/farmerbot) on a full VM running on the TFGrid.

We show two distinct methods to run the Farmerbot. The first method is by running the Farmerbot binaries and the second method is by running the Farmerbot with Docker. Both methods can be done on bare metal or on a full VM running on the TFGrid.

This version of the Farmerbot also works with ARM64. This means that if you have a Pi 3, 4, or Zero 2 with a 64 bit OS, you can just grab the appropriate release archive and it will work properly.

Note that you need at least two 3Nodes on the same farm to make use of the Farmerbot.

Read the [Additional Information](farmerbot_information.md) section for further details concerning the Farmerbot.

## Prerequisites

- The TFChain account associated with the farm should have at least 5 TFT (recommended is 50 TFT)

## Farmerbot Costs on the TFGrid

If you run the Farmerbot on a 3Node on the TFGrid, you will have to pay TFT to deploy on that 3Node. You can run a full VM at minimum specs for the Farmerbot, that is 1vcore, 15GB of SSD storage and 512MB of RAM. Note that you can use the Planetary Network. You do not need to deploy a 3Node with IPv4. The cost on main net for this kind of workload is around 0.175TFT/hour (as of the date 11-07-23).

Next to that, you will have to pay the transaction fees every time the Farmerbot has to wake up or shut down a node. This means that you need some TFT on the account tied to the twin of your farm. 

For the periodic wakeups, each node in the farm is shut down and powered on once a day, i.e. 30 times per month. Also, there is 10 random wakeups per month for each node. This means that each node is turned off and on 40 times per month in average. In that case, the average cost per month to power on nodes and shut them back down equals:

> average transaction fees cost per month = 0.001 TFT (extrinsic fee) * amount of nodes * 40 * 2 (1 for powering down, one for powering up)

## Enable Wake-On-Lan

For a 3Node to work properly with the Farmerbot, the parameter wake-on-lan must be enabled. Enabling wake-on-lan on your 3Node may differ depending on your computer model. Please refer to the documentation of your computer if needed. 

Usually the feature will be called Wake-on-Lan and you need to set it as "enabled" in the BIOS/UEFI settings.

Here are some examples to guide you:

* Racker Server, Dell R720
  * Go into `System Setup -> Device Settings -> NIC Port -> NIC Configuration`
    * Set Wake-on-Lan to `Enable`
* Desktop Computer, HP EliteDesk G1
  * Go to Power -> Hardware Power Management
    * Disable `S5 Maximum Power Saving`
  * Go to `Advanced -> Power-On Options`
    * Set `Remote Wake up Boot source` to `Remote Server`

> Hint: Check the Z-OS monitor screen and make sure that all the 3Nodes are within the same lan (e.g. all 3Nodes addresses are between 192.168.15.00 and 192.168.15.255).

## Deploy a Full VM

For this guide, we run the Farmerbot on a Full VM running on the TFGrid. Note that you do not need to run the Farmerbot on the TFGrid, but the whole process is very simple as presented here.

- [Deploy full vm on the Playground with WireGuard network](../../getstarted/ssh_guide/ssh_guide.md)
- Update and upgrade the VM
    ```
    apt update && apt upgrade
    ```
- Reboot and reconnect to the VM
    ```
    reboot
    ```

## Method 1: Binaries and Zinit

We present how to run the Farmerbot using the binaries.

### Download the Farmerbot Binaries

- Download and Extract the [ThreeFold tfgrid-sdk-go release](https://github.com/threefoldtech/tfgrid-sdk-go/releases) for your specific setup (here we use `x86_64`)
    ```
    mkdir tfgrid-sdk-go
    cd tfgrid-sdk-go
    wget https://github.com/threefoldtech/tfgrid-sdk-go/releases/download/v0.13.16/tfgrid-sdk-go_Linux_x86_64.tar.gz
    tar -xvf tfgrid-sdk-go_Linux_x86_64.tar.gz
    ```
- Move the Farmerbot
    ```
    mv farmerbot /usr/local/bin
    ```

### Create the Farmerbot Files

- Create Farmerbot files directory
    ```
    cd ~
    mkdir farmerbotfiles
    ```
- Create the Farmerbot `config.yml` file (see template below)
    ```
    nano ~/farmerbotfiles/config.yml
    ```
- Create the environment variables file and set the variables (see template below)
    ```
    nano ~/farmerbotfiles/.env
    ```

### Run the Farmerbot

We run the Farmerbot with the following command:

```
farmerbot run -e ~/farmerbotfiles/.env -c ~/farmerbotfiles/config.yml -d
```

We can set an Ubuntu systemd service to keep the Farmerbot running after exiting the VM.

* Create the service file
  * ```
    nano /etc/systemd/system/farmerbot.service
    ```
* Set the Farmerbot systemd service
    
    ```
    [Unit]
    Description=ThreeFold Farmerbot

    [Service]
    Restart=always
    StandardOutput=append:/home/root/farmerbotfiles/farmerbot.log
    StandardError=append:/home/root/farmerbotfiles/farmerbot.log
    ExecStart=/usr/local/bin/farmerbot run -e /home/root/farmerbotfiles/.env -c /home/root/farmerbotfiles/config.yml -d

    [Install]
    WantedBy=multi-user.target     
    ```
* Enable the Farmerbot service
    ```
    systemctl daemon-reload
    systemctl enable farmerbot
    systemctl start farmerbot
    ```
* Verify that the Farmerbot service is properly running
    ```
    systemctl status farmerbot
    ```

## Method 2: Docker

We present how to run the Farmerbot using Docker.

### Build the Farmerbot Docker Image

- [Install Docker on the VM](../../computer_it_basics/docker_basics.md#install-docker-desktop-and-docker-engine)
    ```
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    ```
- Clone the the ThreeFold Tech `tfgrid-sdk-go` repository and switch to the latest release tag
    ```
    git clone https://github.com/threefoldtech/tfgrid-sdk-go
    git checkout tags/v0.13.16
    ```
- Build the Farmerbot Docker image
    ```
    cd tfgrid-sdk-go/farmerbot  
    docker build -t farmerbot -f Dockerfile ../
    ```

### Create the Farmerbot Files

- Create the Farmerbot directory
    ```
    cd ..
    mkdir farmerbotgo
    cd farmerbotgo
    ```
- Create the Farmerbot `config.yml` file (see template below)
    ```
    nano config.yml
    ```
- Create the environment variables file and set the variables (see template below)
    ```
    nano .env
    ```

### Run the Farmerbot

- Run the Farmerbot docker image in the background
    ```
    docker run -d --restart unless-stopped -v $(pwd)/config.yml:/config.yml -v $(pwd)/.env:/.env farmerbot run -e /.env -c /config.yml
    ```

## Farmerbot Files

### Configuration File Template (config.yml)

In this example, the farm ID is 1, we are setting the Farmerbot with 4 nodes and the node 1 never shuts down, we set a periodic wakeup at 1:00PM.

Note that the timezone of the farmerbot will be the same as the time zone of the machine the farmerbot running inside. By default, a full VM on the TFGrid will be set in UTC.

```
farm_id: 1
included_nodes:
  - 1
  - 2 
  - 3 
  - 4  
never_shutdown_nodes:
  - 1
power:
  periodic_wake_up_start: 01:00PM
```

### Environment Variables File Template (.env)

The network can be either `main`, `tets`, `dev` or `qa`. The following example is with the main network.

```
MNEMONIC_OR_SEED="word1 word2 word3 ... word12"
NETWORK="main"
```

## Running Multiple Farmerbots on the Same VM

You can run multiple instances of the Farmerbot on the same VM.

To do so, you need to create a directory for each instance of the Farmerbot. Each directory should contain the configuration and variables files as shown above. Once you've set the files, you can simply execute the Farmerbot `run` command to start each bot in each directory.

If you are using Docker, it is a good idea to name each container differently so they're easier to distinguish later.

## Questions and Feedback

This guide is meant to get you started quickly with the Farmerbot. That being said, there is a lot more that can be done with the Farmerbot.

For more information on the Farmerbot, please refer to the [official Farmerbot Go repository](https://github.com/threefoldtech/tfgrid-sdk-go/tree/development/farmerbot).

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](https://forum.threefold.io/) or on the [ThreeFold Farmers Chat](https://t.me/threefoldfarmers) on Telegram.

> This is the new version of the Farmerbot written in Go. If you have any feedback and issues, please let us know!