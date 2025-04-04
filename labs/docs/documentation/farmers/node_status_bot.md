---
title: "Node Status Bot"
sidebar_position: 202
---

<h1> Node Status Bot </h1>



## Introduction

We present the [Node Status Bot](https://t.me/tfnodestatusbot) and how to use it. 

The Node Status Bot is a very helpful tool for farmers of the ThreeFold Grid. It can give you relevant information on your node status, notify you if the node status changes and also provide information on minting violations.

You can find the bot source code on GitHub [here](https://github.com/threefoldfoundation/node-status-bot).

## Disclaimer

Note that the bot is developed and operated on a best effort basis. You are responsible for your nodes' uptime and your farming rewards.

## Getting Started with the Bot

To get started with the bot, simply go to the [bot link on Telegram](https://t.me/tfnodestatusbot) and hit the start button to begin interacting with the bot.

You can get the real time status of a node with the status command. For example, this gives the status of node 42

```
/status 42
```

The bot can also send you a message when the status of a node changes. Use the subscribe command (or sub for short) to begin alerts for one or more nodes. Here we are subscribing to nodes 1, 2, and 3:

```
/sub 1 2 3
```

Once you have subscribed you can issue the status command with no input to get the current status of the nodes you are subscribed to:

```
/status
```

By default, the bot is on main network. To change the network to the dev or test networks, use the network (net) command. Changing the network does not affect any existing subscriptions, and the bot does not specify which network the nodes belong to in its messages. Here's an example to change the network to devnet:

```
/net dev
```

You can also check if there are any violations in the current minting period. Like status, this command takes a node id as input or works on the currently subscribed nodes if no input is given:

```
/violations
```

The next section covers in-depth the different commands available.

## Commands

Here is a reference for all supported commands and their different forms:

- `/help`
  - Print the start message with all the available commands
- `/status`
  - Check the current status of one or all nodes.
  - This uses a similar method as the Dashboard for determining node status, and update may be delayed by an hour
  - With no input, a status report will be generated for all subscribed nodes, if any
  - Examples
    - Check status of node ID 1
      - `/status 1`
    - Check status of all currently subscribed nodes
      - `/status`
- `/violations`
  - Scan for farmerbot related violations during the current and previous minting periods
  - Like status, this works on all subscribed nodes when no input is given
  - Examples
    - Check violations of node ID 1
      - `/violations 1`
    - Check status of all currently subscribed nodes
      - `/violations`
- `/subscribe`
  - Subscribe to updates about one or more nodes
  - You can use the shortcut `/sub`
  - If you don't provide an input, the nodes you are currently subscribed to will be shown
  - Examples
    - Subscribe to node ID 1
      - `/sub 1`
    - Subscribe to node ID 1, 2, 3
      - `/sub 1 2 3`
    - Check all subscribed nodes
      - `/sub`
- `/unsubscribe`
  - Unsubscribe to updates about one or more nodes
  - You can use the shortcut `/unsub`
  - Examples
    - Unsubscribe to node ID 1
      - `/unsubscribe 1`
    - Unsubscribe to node ID 1, 2, 3
      - `/unsubscribe 1 2 3`
    - Unsubscribe to all currently subscribed nodes
      - `/unsub all`
- `/network`
  - Change the network to `dev`, `test`, or `main`
    - Default is `main`
  - You can use the shortcut `/net`
  - If you don't provide an input, the currently selected network is shown 
  - Examples
    - Check current network
      - `/network`
    - Change to another network, e.g. to `dev`
      - `/net dev`

## Bugs and Features

To report bugs and request features, please open an issue on the [GitHub repo](https://github.com/threefoldfoundation/node-status-bot) or contact [Scott Yeager on Telegram](https://t.me/scottyeager). 

## Node Status Bot News

If you use the bot, please also subscribe to the [Node Status Bot News channel](https://t.me/node_bot_updates) on Telegram to receive occasional updates and news concerning the bot.
