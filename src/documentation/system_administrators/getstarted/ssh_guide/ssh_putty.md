<h1> SSH Remote Connection with PuTTY </h1>



## Introduction

In this Threefold Guide, we show how easy it is to deploy a full virtual machine (VM) and SSH into a 3Node on Windows with [PuTTY](https://www.putty.org/).

To deploy different workloads, the SSH connection process should be very similar. 

Make sure to read the [Mycelium section](../../mycelium/mycelium_toc.md) if you use Mycelium for the network connection.



## Main Steps and Prerequisites

Make sure to [read the introduction](../tfgrid3_getstarted.md#get-started---your-first-deployment) before going further.

The main steps for the whole process are the following:

* Create an SSH Key pair
* Deploy a 3Node
  * Choose IPv4 or Mycelium
* SSH into the 3Node


## SSH with PuTTY on Windows

Here are the main steps to SSH into a full VM using PuTTY on a Windows machine.

* Download [PuTTY](https://www.putty.org/)
  * You can download the Windows Installer in .msi format [here](https://www.chiark.greenend.org.uk/~sgtatham/putty/latest.html)
  * This will add both PuTTY and PuTTYgen to your computer
  * Make sure that you have the latest version of PuTTY to avoid potential issues
* Generate an SSH key pair
  * Open PuTTYgen
  * In `Parameters`, you can set the type of key to `RSA` or to `EdDSA`
  * Click on `Generate`
  * Add a passphrase for your private key (optional)
  * Take note of the generated SSH public key
    * You will need to paste it to the Dashboard later
  * Click `Save private key`
* To deploy a full VM
  * Go to the following section of the [Threefold Dashboard](https://dashboard.grid.tf/): Deploy -> Virtual Machines -> Full Virtual Machine
  * Choose the parameters you want
    * Minimum CPU: 1 vCore
    * Minimum Memory: 512 Mb
    * Minimum Disk Size: 15 Gb
  * Select IPv4 or Mycelium in `Network`
  * In `Node Selection`, click on `Load Nodes`
  * Click `Deploy`
* To SSH into the VM once the 3Node is deployed
  * Take note of the IP address
* Connect to the full VM with PuTTY
  * Open PuTTY
  * Go to the section `Session`
    * Add the VM address under `Host Name (or IP address)`
    * Make sure `Connection type` is set to `SSH`
  * Go to the section `Connection` -> `SSH` -> `Auth` -> `Credentials`
    * Under `Private key file for authentication`, click on `Browse...`
      * Look for the generated SSH private key in .ppk format and click `Open`
  * In the main `PuTTY` window, click `Open`
  * In the PuTTY terminal window, enter `root` as the login parameter
  * Enter the passphrase for the private key if you set one

You now have an SSH connection on Windows using PuTTY.