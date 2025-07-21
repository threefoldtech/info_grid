---
title: WireGuard
sidebar_position: 9
---

In this Threefold Guide, we show how to set up [WireGuard](https://www.wireguard.com/) to access a 3Node deployment with an SSH connection.  Note that WireGuard provides the connection to the 3Node deployment.


## Prerequisites

SSH client of your choice. 

For the basic information on Open SSH, [read this](../ssh).


## Deploy a Weblet with WireGuard Access

For this guide on WireGuard access, we deploy a [full VM](../deploy-a-vm). Note that the whole process is similar with other types of ThreeFold weblets on the Dashboard.

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



## Install WireGuard

To install WireGuard, please refer to the official [WireGuard installation documentation](https://www.wireguard.com/install/).



## Set the WireGuard Configurations

When it comes to setting the WireGuard configurations, the steps are similar for Linux and MAC, but differ slightly for Windows. For Linux and MAC, we will be using the CLI. For Windows, we will be using the WireGuard GUI app.

### Linux and MAC

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

### Windows

To set the WireGuard connection on Windows, add and activate a tunnel with the WireGuard app:

* Open the WireGuard GUI app
* Click on **Add Tunnel** and then **Add empty tunnel**
* Choose a name for the tunnel
* Erase the content of the main window and paste the content **WireGuard Config** from the Dashboard **Details** window
* Click **Save** and then click on **Activate**.


  

## Test the WireGuard Connection

As a test, you can ping the virtual IP address of the VM to make sure the WireGuard connection is properly established. Make sure to replace `VM_WireGuard_IP` with the proper WireGuard IP address:

* Ping the deployment
  * ```
    ping VM_WireGuard_IP
    ```



## SSH into the Deployment with Wireguard

To SSH into the deployment with Wireguard, use the **WireGuard IP** shown in the Dashboard **Details** window.

* SSH into the deployment
  * ```
    ssh root@VM_WireGuard_IP
    ```

You now have access to the deployment over a WireGuard SSH connection.
