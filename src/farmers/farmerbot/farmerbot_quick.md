<h1> Farmerbot Quick Guide </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Enable Wake-On-Lan](#enable-wake-on-lan)
- [Deploy a Full VM](#deploy-a-full-vm)
- [Farmerbot Costs on the TFGrid](#farmerbot-costs-on-the-tfgrid)
- [Install Docker](#install-docker)
- [Create the Configuration Files](#create-the-configuration-files)
- [Run the Farmerbot](#run-the-farmerbot)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

We present a quick way to deploy the Farmerbot by deploying a Full VM on the TFGrid and using the file creator to quickly generate the `.env` and `config.md` files.

Note that you need at least two 3Nodes on the same farm to make use of the Farmerbot.

***

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

***

## Deploy a Full VM

For this guide, we run the Farmerbot on a Full VM running on the TFGrid. Note that you do not need to run the Farmerbot on the TFGrid, but the whole process is very simple as presented here.

* Deploy a full VM on the TFGrid with minimum specs (512 MB of memory, 1 vcore, 15 GB of storage)
  * Read [this guide](../../getstarted/ssh_guide/ssh_guide.md) for more information on deploying a Full VM with the TF Playground

***

## Farmerbot Costs on the TFGrid

If you run the Farmerbot on a 3Node on the TFGrid, you will have to pay TFT to deploy on that 3Node. You can run a full VM at minimum specs for the Farmerbot, that is 1vcore, 15GB of SSD storage and 512MB of RAM. Note that you can use the Planetary Network. You do not need to deploy a 3Node with IPv4. The cost on main net for this kind of workload is around 0.175TFT/hour (as of the date 11-07-23).

Next to that, you will have to pay the transaction fees every time the Farmerbot has to wake up or shut down a node. This means that you need some TFT on the account tied to the twin of your farm. 

On average each node in the farm will be shut down and powered on at least once a day (periodic wakeup). In that case the average cost per month to power on nodes and shut them back down equals:

> cost per month = 0.001 TFT (extrinsic fee) * amount of nodes * 30 * 2 (1 for powering down, one for powering up)

***

## Install Docker

An quick way to install Docker can be found in [this Docker documentation](https://docs.docker.com/engine/install/ubuntu/#install-using-the-repository).

Simply follow the steps given in the sections `Set up the repository` and `Install Docker Engine`.


***

## Create the Configuration Files

* Create the parent folder
  * ```
    mkdir -p farmerbot_docker && cd $_
    ```
    * Note: you can choose a different name for your parent folder
* Pull the file creator image from the GitHub Container Registry
  * ```
    docker pull ghcr.io/threefoldtech/farmerbot_config:0.2.0
    ```
* Run the file creator image and answer the questions to generate the files
  * ```
    docker run --name fbot_config_container -v ./:/farmerbot -ti ghcr.io/threefoldtech/farmerbot_config:0.2.0
    ```
    * The `config/config.md` and `.env` files are saved in the parent folder

> Note: It is can be a good idea to set only one node with `yes` for `never_shutdown`. A node with low power consumption is obviously a wise choice.

***

## Run the Farmerbot

* Download the Farmerbot `.yaml` file with this command:
  * ```
    wget https://raw.githubusercontent.com/threefoldtech/farmerbot/development/docker-compose.yaml
    ```
* Run the Farmerbot with this command
  * ```
    docker compose up -d
    ```

***

## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Farmers Channel](https://t.me/threefoldfarmers) on Telegram.