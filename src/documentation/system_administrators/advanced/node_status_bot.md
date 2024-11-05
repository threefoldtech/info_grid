<h1> Node Status Bot </h1>



## Introduction

We show how to deploy the [Telegram Node Status bot](https://github.com/threefoldfoundation/node-status-bot) on a micro VM running on the ThreeFold Grid.

The Node Status bot provides realtime status updates and alerts on status changes for nodes on the ThreeFold Grid. You can find an [instance live on Telegram](https://t.me/tfnodestatusbot).

## Prerequisites

To run the bot, you need to have a TFChain account activated with a twin. For this, you can simply create an account on the ThreeFold Dashboard.

- [A TFChain account](../../dashboard/wallet_connector.md)
- TFT in your TFChain account
  - [Buy TFT](../../threefold_token/buy_sell_tft/buy_sell_tft.md)
  - [Send TFT to TFChain](../../threefold_token/tft_bridges/tft_bridges.md)

## Deploy a Micro VM

We start by deploying a micro VM on the ThreeFold Dashboard.

* On the [Threefold Dashboard](https://dashboard.grid.tf/#/), go to the [micro virtual machine deployment page](https://dashboard.test.grid.tf/#/deploy/virtual-machines/micro-virtual-machine/)
* Deploy a micro VM (Ubuntu 22.04) with the network connection of your choice
  * Minimum vcores: 1vcore
  * Minimum MB of RAM: 2048GB
  * Minimum storage: 25GB
* After deployment, note the VM IP address
* Connect to the VM via SSH
  * ``` 
    ssh root@VM_IP_Address
    ```

### Network Choice

Since the bot works via an outbound connection to the Telegram servers, you do not need any public IP for it. It's thus cheaper to use either WireGuard, Planetary Network or Mycelium.

## Create a Telegram Bot

We create a Telegram bot using the [BotFather](https://t.me/BotFather). 

Simply go to this link and follow the steps (`/newbot` ...). Make sure to take note of the bot token for the next steps.

## Prepare the VM

We prepare the micro VM to run the Node Status bot.

* Update the VM and install redis-server, git, nano, pip and python3-venv
  ```
  apt update && apt install redis-server && apt install git && apt install nano && apt install pip && apt install python3.10-venv 
  ```

## Set the Bot

Now that the VM is prepared, you can quickly set the bot.

```
git clone https://github.com/threefoldfoundation/node-status-bot.git
cd node-status-bot
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
wget https://github.com/threefoldtech/rmb-rs/releases/download/v1.0.7/rmb-peer
chmod u+x rmb-peer
```

## Start the Bot

Once the bot is set, you can start it with the following line.

```
python3 node-status-bot.py <bot_token> -s "<mnemonic>"
```

You can now go on Telegram and test the bot!

## Set Zinit

We can make sure the bot will start at any VM reboot by setting a zinit process. We set this using a simple script.

- Create a .yaml file in the zinit folder
  ```
  nano /etc/zinit/node-status-bot.yaml
  ```
- The content should be the following
  ```
  exec: /root/node-status-bot/start.sh
  ```
- Create a script to run the bot
  ```
  nano start.sh
  ```
- The script should contain the following
  ```
  #!/bin/bash

  cd /root/node-status-bot
  source venv/bin/activate
  python3 node-status-bot.py <bot_token> -s "<mnemonic>" &>> /root/node-status-bot-logs
  ```
- Set permissions to the script
  ```
  chmod +x start.sh
  ```
- Start the bot with the zinit command
  ```
  zinit monitor node-status-bot
  ```
- Check if the bot is running
  ```
  zinit status node-status-bot
  ```

You can then use the bot on Telegram and the Python program will restart every time the VM starts.

## Questions and Feedback

If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.