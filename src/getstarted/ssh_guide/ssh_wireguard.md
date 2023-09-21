<h1> WireGuard Access </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deploy a Full VM with WireGuard Access](#deploy-a-full-vm-with-wireguard-access)
- [Install WireGuard](#install-wireguard)
- [Set the WireGuard Configurations](#set-the-wireguard-configurations)
  - [Linux and MAC](#linux-and-mac)
  - [Windows](#windows)
- [Test the WireGuard Connection](#test-the-wireguard-connection)
- [SSH into the 3Node with Wireguard](#ssh-into-the-3node-with-wireguard)
- [Questions and Feedback](#questions-and-feedback)

***

# Introduction

In this Threefold Guide, we show how to set up [WireGuard](https://www.wireguard.com/) to access a 3Node with an SSH connection.

Note that WireGuard provides the connection to the 3Node. It is up to you to decide which SSH client you want to use. This means that the steps to SSH into a 3Node will be similar to the steps proposed in the guides for [Open-SSH](./ssh_openssh.md), [PuTTy](ssh_putty.md) and [WSL](./ssh_wsl.md). Please refer to [these guides](./ssh_guide.md) if you have any questions concerning the SSH client in specific. The main difference will be that we will connect to the 3Node using a WireGuard connection instead of an IPv4 or a Planetary Network connection.

***

# Prerequisites

* Activated and funded account set up in the [TF Playground](https://playground.grid.tf/)
  * [Create a Threefold Connect Wallet](../TF_Connect/TF_Connect.md)
  * [Buy TFT](../../threefold_token/buy_sell_tft/buy_sell_tft.md)
  * [Create a Threefold Dashboard Account and Transfer TFT](../TF_Dashboard/TF_Dashboard.md)
* SSH Client of your choice
  * [Open-SSH](./ssh_openssh.md)
  * [PuTTy](ssh_putty.md)
  * [WSL](./ssh_wsl.md)

***

# Deploy a Full VM with WireGuard Access

We show here how to deploy a Full VM with WireGuard access. Note that this process is similar with other types of ThreeFold weblets on the Playground.

* Go to the [ThreeFold Playground](https://playground.grid.tf/)
* Select the weblet **Full Virtual Machine**
* Click on **Network**
* Check **Add WireGuard Access**
* Select a node to deploy on
* Click **Deploy**

Once the Full VM is deployed, a window named **Details** will appear. You will need the content of the section **WireGuard Config** to set the WireGuard configurations. Refer to [this section](#set-the-wireguard-configurations) for more information on how to set the WireGuard configurations. Note that the content of **WireGuard IP** will also be needed to [SSH into the Full VM with WireGuard](#ssh-into-the-3node-with-wireguard).

> Note: At anytime, you can open the **Details** window by clicking on the button **Open Details** under **Actions** on the Playground weblet page.

***

# Install WireGuard

To install WireGuard, please refer to the official [WireGuard installation documentation](https://www.wireguard.com/install/).

***

# Set the WireGuard Configurations

When it comes to setting the WireGuard configurations, the steps are the same for Linux and MAC, but differ slightly for Windows.

## Linux and MAC

To set the WireGuard connection on Linux or MAC, you will need to paste the content **WireGuard Config** from the Playground **Details** window to the file `/usr/local/etc/wireguard/wg.conf`.

To do so, simply create a file named `wg.conf` in the directory: `/usr/local/etc/wireguard` and paste the WireGuard configurations:

```
nano /usr/local/etc/wireguard/wg.conf
```

Note that you might need superuser ([sudo](https://www.sudo.ws/)) permissions to do so.

Then, to start WireGuard, write the following in the terminal:

```
wg-quick up wg
```

If you want to stop the WireGuard service, you can write the following in the terminal:

```
wg-quick down wg
```

> Note: If it doesn't work and you already did a WireGuard connection with the same file, write on the terminal `wg-quick down wg`, then `wg-quick up wg`.

## Windows

To set the WireGuard connection on Windows, open the WireGuard GUI app, click on **Add Tunnel** and then **Add empty tunnel**, choose a name for the tunnel and, in the main window, erase the content of the main window and paste the content **WireGuard Config** from the Playground **Details** window. Click **Save** and then click on **Activate**.

***
  

# Test the WireGuard Connection

As a test, you can ping the virtual IP address of the VM to make sure the WireGuard connection is properly established. Make sure to replace `VM_WireGuard_IP` with the proper WireGuard IP address:

```
ping -c 2 VM_WireGuard_IP
```

***

# SSH into the 3Node with Wireguard

To SSH into the 3Node with Wireguard, simply write the following in the terminal with the proper WireGuard IP address (named **WireGuard IP** in the Playground **Details** window):

```
ssh root@VM_WireGuard_IP
```

You now have access to the VM over a WireGuard SSH connection.

***

# Questions and Feedback

If you have any questions, let us know by writing a post on the [Threefold Forum](http://forum.threefold.io/) or by reaching out to the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.