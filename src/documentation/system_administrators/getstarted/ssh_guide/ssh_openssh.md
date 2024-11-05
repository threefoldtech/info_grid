<h1> SSH Remote Connection with OpenSSH </h1>



## Introduction

In this Threefold Guide, we show how easy it is to deploy a full virtual machine (VM) and SSH into a 3Node with [OpenSSH](https://www.openssh.com/) on Linux, MacOS and Windows with either an IPv4 or a Mycelium connection. 

To deploy different workloads, the SSH connection process should be very similar.

## Overview

Make sure to [read the introduction](../tfgrid3_getstarted.md#get-started---your-first-deployment) before going further.

The main steps for the whole process are the following:

* Create an SSH key pair
* Deploy a VM on a 3Node
* SSH into the 3Node

## Linux

Here are the steps to SSH into a 3Node with either IPv4 or Mycelium on Linux.

If you are using Mycelium, make sure to [read this section](../../mycelium/mycelium_toc.md).

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
  * Select `IPv4` or `Mycelium` in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the IP address
  * Open the terminal, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@IP_address
      ```

You now have an SSH connection on Linux.

## MacOS

Here are the steps to SSH into a 3Node with either IPv4 or Mycelium on MacOS.

If you are using Mycelium, make sure to [read this section](../../mycelium/mycelium_toc.md).

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
  * Select `IPv4` or `Mycelium` in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the IP address
  * Open the terminal, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@IP_address
      ```

You now have an SSH connection on MacOS.

## Windows

Here are the steps to SSH into a 3Node with either IPv4 or Mycelium on Windows.

If you are using Mycelium, make sure to [read this section](../../mycelium/mycelium_toc.md).

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
  * Select `IPv4` or `Mycelium` in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Copy the IP address
  * Open `PowerShell`, write the following with the deployment address and write **yes** to confirm
    * ```
      ssh root@IP_address
      ```

You now have an SSH connection on Window.