<h1> WireGuard Access </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deploy a Weblet with WireGuard Access](#deploy-a-weblet-with-wireguard-access)
- [Install WireGuard](#install-wireguard)
- [Set the WireGuard Configurations](#set-the-wireguard-configurations)
  - [Linux and MAC](#linux-and-mac)
  - [Windows](#windows)
- [Test the WireGuard Connection](#test-the-wireguard-connection)
- [SSH into the Deployment with Wireguard](#ssh-into-the-deployment-with-wireguard)
- [Questions and Feedback](#questions-and-feedback)

***

# Introduction

In this Threefold Guide, we show how to set up [WireGuard](https://www.wireguard.com/) to access a 3Node deployment with an SSH connection. 

Note that WireGuard provides the connection to the 3Node deployment. It is up to you to decide which SSH client you want to use. This means that the steps to SSH into a 3Node deployment will be similar to the steps proposed in the guides for [Open-SSH](./ssh_openssh.md), [PuTTy](ssh_putty.md) and [WSL](./ssh_wsl.md). Please refer to [this documentation](./ssh_guide.md) if you have any questions concerning SSH clients. The main difference will be that we connect to the 3Node deployment using a WireGuard connection instead of an IPv4 or a Planetary Network connection.



# Prerequisites

Make sure to [read the introduction](../tfgrid3_getstarted.md#get-started---your-first-deployment) before going further.

* SSH client of your choice
  * [Open-SSH](./ssh_openssh.md)
  * [PuTTy](ssh_putty.md)
  * [WSL](./ssh_wsl.md)



# Deploy a Weblet with WireGuard Access

For this guide on WireGuard access, we deploy a [Full VM](../../../dashboard/solutions/fullVm.md). Note that the whole process is similar with other types of ThreeFold weblets on the Dashboard.

* On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
* Choose the parameters you want
  * Minimum CPU: 1 vCore
  * Minimum Memory: 512 Mb
  * Minimum Disk Size: 15 Gb
* Select `Add WireGuard Access` in `Network`
* In `Node Selection`, click on `Load Nodes`
* Click `Deploy`

Once the Full VM is deployed, a window named **Details** will appear. You will need to take note of the **WireGuard Config** to set the WireGuard configurations and the **WireGuard IP** to SSH into the deployment.

> Note: At anytime, you can open the **Details** window by clicking on the button **Show Details** under **Actions** on the Dashboard weblet page.



# Install WireGuard

To install WireGuard, please refer to the official [WireGuard installation documentation](https://www.wireguard.com/install/).



# Set the WireGuard Configurations

When it comes to setting the WireGuard configurations, the steps are similar for Linux and MAC, but differ slightly for Windows. For Linux and MAC, we will be using the CLI. For Windows, we will be using the WireGuard GUI app.

## Linux and MAC

To set the WireGuard connection on Linux or MAC, create a WireGuard configuration file and run WireGuard via the command line:

* Copy the content **WireGuard Config** from the Dashboard **Details** window
* Paste the content to a file with the extension `.conf` (e.g. **wg.conf**) in the directory `/etc/wireguard`
  * ```
    sudo nano /etc/wireguard/wg.conf
    ```
* Start WireGuard with the command **wg-quick** and, as a parameter, pass the configuration file without the extension (e.g. *wg.conf -> wg*)
  * ```
    wg-quick up wg
    ```
  * Note that you can also specify a config file by path, stored in any location
    * ```
      wg-quick up /etc/wireguard/wg.conf
      ```
* If you want to stop the WireGuard service, you can write the following in the terminal
  * ```
    wg-quick down wg
    ```

> Note: If it doesn't work and you already did a WireGuard connection with the same file, write on the terminal `wg-quick down wg`, then `wg-quick up wg` to reset the connection with new configurations.

## Windows

To set the WireGuard connection on Windows, add and activate a tunnel with the WireGuard app:

* Open the WireGuard GUI app
* Click on **Add Tunnel** and then **Add empty tunnel**
* Choose a name for the tunnel
* Erase the content of the main window and paste the content **WireGuard Config** from the Dashboard **Details** window
* Click **Save** and then click on **Activate**.


  

# Test the WireGuard Connection

As a test, you can [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping) the virtual IP address of the VM to make sure the WireGuard connection is properly established. Make sure to replace `VM_WireGuard_IP` with the proper WireGuard IP address:

* Ping the deployment
  * ```
    ping VM_WireGuard_IP
    ```



# SSH into the Deployment with Wireguard

To SSH into the deployment with Wireguard, use the **WireGuard IP** shown in the Dashboard **Details** window.

* SSH into the deployment
  * ```
    ssh root@VM_WireGuard_IP
    ```

You now have access to the deployment over a WireGuard SSH connection.



# Questions and Feedback

If you have any questions, let us know by writing a post on the [Threefold Forum](http://forum.threefold.io/) or by reaching out to the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.