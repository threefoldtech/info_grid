<h1> SSH Remote Connection with OpenSSH </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Main Steps and Prerequisites](#main-steps-and-prerequisites)
- [Step-by-Step Process with OpenSSH](#step-by-step-process-with-openssh)
  - [Linux](#linux)
    - [SSH into a 3Node with IPv4 on Linux](#ssh-into-a-3node-with-ipv4-on-linux)
    - [SSH into a 3Node with the Planetary Network on Linux](#ssh-into-a-3node-with-the-planetary-network-on-linux)
  - [MAC](#mac)
    - [SSH into a 3Node with IPv4 on MAC](#ssh-into-a-3node-with-ipv4-on-mac)
    - [SSH into a 3Node with the Planetary Network on MAC](#ssh-into-a-3node-with-the-planetary-network-on-mac)
  - [Windows](#windows)
    - [SSH into a 3Node with IPv4 on Windows](#ssh-into-a-3node-with-ipv4-on-windows)
    - [SSH into a 3Node with the Planetary Network on Windows](#ssh-into-a-3node-with-the-planetary-network-on-windows)
- [Questions and Feedback](#questions-and-feedback)

***

# Introduction

In this Threefold Guide, we show how easy it is to deploy a full virtual machine (VM) and SSH into a 3Node with [OpenSSH](https://www.openssh.com/) on Linux, MAC and Windows with both an IPv4 and a Planetary Network connection. To connect to the 3Node with WireGuard, read [this documentation](./ssh_wireguard.md).

To deploy different workloads, the SSH connection process should be very similar.

If you have any questions, feel free to write a post on the [Threefold Forum](http://forum.threefold.io/).


# Main Steps and Prerequisites

Make sure to [read the introduction](../tfgrid3_getstarted.md#get-started---your-first-deployment) before going further.

The main steps for the whole process are the following:

* Create an SSH Key pair
* Deploy a 3Node
  * Choose IPv4 or the Planetary Network
* SSH into the 3Node
  * For the Planetary Network, download the Planetary Network Connector



# Step-by-Step Process with OpenSSH

## Linux

### SSH into a 3Node with IPv4 on Linux

Here are the steps to SSH into a 3Node with IPv4 on Linux.

* To create the SSH key pair, write in the terminal 
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in the terminal
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy a full VM
  * On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select IPv4 in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the IPv4 address
  * Open the terminal, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@IPv4_address
      ```

You now have an SSH connection on Linux with IPv4.



### SSH into a 3Node with the Planetary Network on Linux

Here are the steps to SSH into a 3Node with the Planetary Network on Linux.

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.deb file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-Linux)
  * Right-click and select `Open with other application`
    * Select `Software Install`
  * Search the `Threefold Planetary Connector` and open it
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* To create the SSH key pair, write in the terminal
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in the terminal
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy a full VM
  * On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select Planetary Network in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the Planetary Network address
  * Open the terminal, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@planetary_network_address
      ```

You now have an SSH connection on Linux with the Planetary Network.



## MAC

### SSH into a 3Node with IPv4 on MAC

Here are the steps to SSH into a 3Node with IPv4 on MAC.

* To create the SSH key pair, in the terminal write
    * ```
      ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To see the public key, write in the terminal
    * ```
      cat ~/.ssh/id_rsa.pub
      ```
    * Select and copy the public key when needed
* To deploy a full VM
  * On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select IPv4 in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the IPv4 address
  * Open the terminal, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@IPv4_address
      ```

You now have an SSH connection on MAC with IPv4.



### SSH into a 3Node with the Planetary Network on MAC

Here are the steps to SSH into a 3Node with the Planetary Network on MAC.

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.dmg file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-MacOS)
  * Run the dmg installer
  * Search the Threefold Planetary Connector in `Applications` and open it
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* To create the SSH key pair, write in the terminal 
    * ```
      ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To see the public key, write in the terminal
    * ```
      cat ~/.ssh/id_rsa.pub
      ```
    * Select and copy the public key when needed
* To deploy a full VM
  * On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select Planetary Network in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the Planetary Network address
  * Open the terminal, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@planetary_network_address
      ```

You now have an SSH connection on MAC with the Planetary Network.



## Windows

### SSH into a 3Node with IPv4 on Windows

* To download OpenSSH client and OpenSSH server
  * Open the `Settings` and select `Apps`
  * Click `Apps & Features`
  * Click `Optional Features`
  * Verifiy if OpenSSH Client and OpenSSH Server are there
    * If not
      * Click `Add a feature`
        * Search OpenSSH
        * Install OpenSSH Client and OpenSSH Server
* To create the SSH key pair, open `PowerShell` and write
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in `PowerShell`
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy a full VM
  * On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select IPv4 in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the IPv4 address
  * Open `PowerShell`, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@IPv4_address
      ```

You now have an SSH connection on Window with IPv4.



### SSH into a 3Node with the Planetary Network on Windows

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.msi file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-Windows10)
  * Search the `Threefold Planetary Connector`
    * Right-click and select `Install`
  * Disconnect your VPN if you have one
  * Open the TF connector and click `Connect`
* To download OpenSSH client and OpenSSH server
  * Open the `Settings` and select `Apps`
  * Click `Apps & Features`
  * Click `Optional Features`
  * Verifiy if OpenSSH Client and OpenSSH Server are there
    * If not
      * Click `Add a feature`
        * Search OpenSSH
        * Install OpenSSH Client and OpenSSH Server
* To create the SSH key pair, open `PowerShell` and write
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in `PowerShell`
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy a full VM
  * On the [Threefold Dashboard](https://dashboard.grid.tf/), go to: Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select Planetary Network address in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the Planetary Network address
  * Open `PowerShell`, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@planetary_network_address
      ```

You now have an SSH connection on Window with the Planetary Network.



# Questions and Feedback

If you have any questions, let us know by writing a post on the [Threefold Forum](http://forum.threefold.io/).