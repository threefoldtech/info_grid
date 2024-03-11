<h1>Building a DIY 3Node: Desktop Computer</h1>

In the following 3Node DIY guide, you will learn how to turn a Dell Optiplex 7020 into a 3Node farming on the ThreeFold Grid. 

Note that the process is similar for other desktop computers.

<div style="break-after:page"></div>



<h2>Table of Contents</h2>



- [Prerequisite](#prerequisite)
  - [DIY 3Node Computer Requirements](#diy-3node-computer-requirements)
  - [DIY 3Node Material List](#diy-3node-material-list)
- [1. Create a Farm](#1-create-a-farm)
  - [Using Dashboard](#using-dashboard)
  - [Using TF Connect App](#using-tf-connect-app)
- [2. Create a Zero-OS Bootstrap Image](#2-create-a-zero-os-bootstrap-image)
  - [Download the Zero-OS Boostrap Image](#download-the-zero-os-boostrap-image)
  - [Burn the Zero-OS Bootstrap Image](#burn-the-zero-os-bootstrap-image)
- [3. Set the Hardware](#3-set-the-hardware)
- [4. Wipe All the Disks](#4-wipe-all-the-disks)
  - [1. Create a Linux Boostrap Image](#1-create-a-linux-boostrap-image)
  - [2. Boot Linux in Try Mode](#2-boot-linux-in-try-mode)
  - [3. Use wipefs to Wipe All Disks](#3-use-wipefs-to-wipe-all-disks)
- [5. Set the BIOS/UEFI](#5-set-the-biosuefi)
  - [The Essential Features of BIOS/UEFI for a 3Node](#the-essential-features-of-biosuefi-for-a-3node)
  - [Set the BIOS/UEFI on a Dell Optiplex 7020](#set-the-biosuefi-on-a-dell-optiplex-7020)
- [6. Boot the 3Node](#6-boot-the-3node)
  - [Check the Node Status](#check-the-node-status)
  - [Farming Rewards Distribution](#farming-rewards-distribution)
- [Additional Information](#additional-information)

***

<div style="break-after:page"></div>



# Prerequisite

## DIY 3Node Computer Requirements



Any computer with the following specifications can be used as a DIY 3Node.

- Any 64-bit hardware with an Intel or AMD processor chip.
- Servers, desktops and mini computers type hardware are compatible.
- A minimum of 500 GB of SSD and a bare minimum of 2 GB of RAM is required.
- A ratio of 100GB of SSD and 8GB of RAM per thread is recommended.
- A wired ethernet connection is highly recommended to maximize reliability and the ability to farm TFT.
- A [passmark](https://www.passmark.com/) of 1000 per core is recommended and will be a minimum requirement in the future.

In this guide, we are using a Dell Optiplex 7020. It constitutes a perfect affordable entry DIY 3Node as it can be bought refurbished with the proper ratio of 100GB of SSD and 8GB of RAM per thread, and this, without any need of upgrades or updates.



## DIY 3Node Material List



* Any computer respecting the DIY 3Node Computer Requirements stated above
* Ethernet cable
* Router + Modem
* Surge Protector
* 2x USB key 4 Go
* Android/iOS Phone
* Computer monitor and cable, keyboard and mouse
* MAC/Linux/Windows Computer



<div style="break-after:page"></div>

# 1. Create a Farm

You can create a farm with either the ThreeFold Dashboard or the ThreeFold Connect app.

## Using Dashboard

The Dashboard section contains all the information required to [create a farm](../../../dashboard/farms/your_farms.md).

## Using TF Connect App

You can [create a ThreeFold farm](../../../threefold_token/storing_tft/tf_connect_app.md) with the ThreeFold Connect App.


# 2. Create a Zero-OS Bootstrap Image

## Download the Zero-OS Boostrap Image

We will now learn how to create a Zero-OS Bootstrap Image in order to boot a DIY 3Node.

Go on the [ThreeFold Zero-OS Bootstrap Link](https://v3.bootstrap.grid.tf) as shown above.

![Farming_Create_Farm_21](./img/farming_createfarm_21.png) 

This is the Zero-OS v3 Bootstrapping page.

![Farming_Create_Farm_22](./img/farming_createfarm_22.png)  

Write your farm ID and choose production mode.

![Farming_Create_Farm_23](./img/farming_createfarm_23.png)  

Download the bootstrap image. Next, we will burn the bootstrap image.



<div style="break-after:page"></div>

## Burn the Zero-OS Bootstrap Image



For **MAC**, **Linux** and **Windows**, you can use [BalenaEtcher](https://www.balena.io/etcher/) to load/flash the image on a USB stick. This program also formats the USB in the process. This will work for the option **EFI IMG** for UEFI boot, and with the option **USB** for BIOS boot. Simply follow the steps presented to you and make sure you select the correct bootstrap image file you downloaded previously.

General Steps:

1. Download BalenaEtcher at [https://balena.io/etcher](https://balena.io/etcher)

![3node_diy_desktop_42.png](img/3node_diy_desktop_42.png)

![3node_diy_desktop_43.png](img/3node_diy_desktop_43.png)

![3node_diy_desktop_44.png](img/3node_diy_desktop_44.png)

![3node_diy_desktop_45.png](img/3node_diy_desktop_45.png)

![3node_diy_desktop_48.png](img/3node_diy_desktop_48.png)

![3node_diy_desktop_49.png](img/3node_diy_desktop_49.png)

2. Open BalenaEtcher

![3node_diy_desktop_50.png](img/3node_diy_desktop_50.png)

3. Select **Flash from file**

![3node_diy_desktop_52.png](img/3node_diy_desktop_52.png)

1. Find and select the bootstrap image in your computer

2. Select **Target** (your USB key)

![3node_diy_desktop_53.png](img/3node_diy_desktop_53.png)

![3node_diy_desktop_54.png](img/3node_diy_desktop_54.png)

6. Select **Flash**

![3node_diy_desktop_55.png](img/3node_diy_desktop_55.png)

![3node_diy_desktop_56.png](img/3node_diy_desktop_56.png)


That's it. Now you have a bootstrap image on Zero-OS as a bootable removable media device.



<div style="break-after:page"></div>

# 3. Set the Hardware

Setting the hardware of this DIY 3node is very easy as there are no updates or upgrades needed. Simply unbox the computer and plug everything.

![3node_diy_desktop_40.png](img/3node_diy_desktop_40.jpeg)

![3node_diy_desktop_38.png](img/3node_diy_desktop_38.jpeg)

![3node_diy_desktop_30.png](img/3node_diy_desktop_30.jpeg)

![3node_diy_desktop_29.png](img/3node_diy_desktop_29.jpeg)

Plug the computer cable in the surge protector

![3node_diy_desktop_6.png](img/3node_diy_desktop_6.png)

Connect the computer cable, the ethernet cable, the mouse and keyboard cable and the monitor cable.

![3node_diy_desktop_13.png](img/3node_diy_desktop_13.jpeg)

Plug the ethernet cable in the router (or the switch)

![3node_diy_desktop_6.png](img/3node_diy_desktop_3.png)



<div style="break-after:page"></div>

# 4. Wipe All the Disks

In this section, we will learn how to create a Linux bootstrap image, boot it in Try mode and then wipe all the disks in your 3Node. To create a Linux boostrap image, follow the same process as when we burnt the Zero-OS Boostrap Image.



## 1. Create a Linux Boostrap Image



1. Download the Ubuntu 20.04 ISO file [here](https://releases.ubuntu.com/20.04/)
2. Burn the ISO image on a USB key with Balena Etcher



## 2. Boot Linux in Try Mode



1. Insert your Linux boostrap image USB key in your computer and boot it
2. During boot, press F12 to enter into Settings
3. Select your booting device, here it is: *UEFI: USB DISK 2.0*
 
![3node_diy_desktop_107.png](img/3node_diy_desktop_107.jpeg)

4. Select Try or install Ubuntu

![3node_diy_desktop_106.png](img/3node_diy_desktop_106.jpeg)

5. Select Try Ubuntu

![3node_diy_desktop_105.png](img/3node_diy_desktop_105.jpeg)



## 3. Use wipefs to Wipe All Disks



Once Ubuntu is booted, you will land on the main page.

![3node_diy_desktop_67.png](img/3node_diy_desktop_67.png)

At the bottom left of the screen, click on Applications.

![3node_diy_desktop_68.png](img/3node_diy_desktop_68.png)

In Applications, select Terminal. 

![3node_diy_desktop_69.png](img/3node_diy_desktop_69.png)

If you don't see it, write terminal in the search box.

![3node_diy_desktop_70.png](img/3node_diy_desktop_70.png)

You will land in the Ubuntu Terminal.

![3node_diy_desktop_71.png](img/3node_diy_desktop_71.png)

Write the command line *lsblk* as shown below. You will then see the disks in your computer. You want to wipe the main disk, but not the USB key we are using, named *sdb* here. We can see here that the SSD disk, *sda*, has 3 partitions: *sda1*, *sda2*, *sda3*. Note that when wiping the disks, we want no partition.

In this case, the disk we want to wipe is *sda*.

![3node_diy_desktop_72.png](img/3node_diy_desktop_72.png)

Write the command line *sudo wipefs -a /dev/sda*. This will wipe the disk *sda*. 

![3node_diy_desktop_73.png](img/3node_diy_desktop_73.png)

If you write the command line *lsblk* once more, you should see that your SSD disk has no more partition. The disk has been properly wiped. 

![3node_diy_desktop_74.png](img/3node_diy_desktop_74.png)

Power off the computer by selecting *Power Off* after having clicked on the button at the top right of the screen as shown below. 

![3node_diy_desktop_75.png](img/3node_diy_desktop_75.png)

That's it! The disks are all wiped. All that is left now is to set the BIOS/UEFI settings and then boot the 3Node!



<div style="break-after:page"></div>

# 5. Set the BIOS/UEFI

Before booting the main operating system, in our case Zero-OS, a computer will boot in either BIOS or UEFI mode. Older systems use BIOS and newer systems uses UEFI. Both BIOS and UEFI are low-lewel softwares needed to interact between the hardware and the main OS of the computer. Note that BIOS is also called Legacy BIOS.

## The Essential Features of BIOS/UEFI for a 3Node



There are certain things that you should make sure are set properly on your 3Node.

As a general advice, you can Load Defaults (Settings) on your BIOS, then make sure the options below are set properly.

* Choose the correct combination of BIOS/UEFI and bootstrap image on [https://bootstrap.grid.tf/](https://bootstrap.grid.tf/)
  * Newer system will use UEFI --> the Dell Optiplex 7020 uses UEFI
    * Bootstrap image: *EFI IMG* and *EFI FILE*
  * Older system will use Legacy BIOS
    * Bootstrap image: *ISO* and *USB*
* Set *Multi-Processor* and *Hyperthreading* at Enabled
  * Sometimes, it will be written *Virtual Cores*, or *Logical Cores*. 
* Set *Virtualization* at Enabled
  * On Intel, it is denoted as *CPU virtualization* and on ASUS, it is denoted as *SVM*. 
  * Make sure virtualization is enabled and look for the precise terms in your specific BIOS/UEFI.
* Enable *Network Stack* (sometimes called *Network Boot*)
* Set *AC Recovery* at *Last Power State*
  * This will make sure your 3Node restarts after losing power momentarily.
* Select the proper *Boot Sequence* for the 3Node to boot Zero-OS from your bootstrap image
  * e.g., if you have a USB key as a bootstrap image, select it in *Boot Sequence*
* Set *Server Lookup Method* (or the equivalent) at *DNS*.
  * Only use Static IP if you know what you are doing.
  * Your router will automatically assign a dynamic IP address to your 3Node when it connects to Internet.
* Set *Client Address Method* (or the equivalent) at *DHCP*. Only use Static IP if you know what you are doing.
  * Your router will automatically assign a dynamic IP address to your 3Node when it connects to Internet.
* *Secure Boot* should be left at disabled
  * Enable it if you know what you are doing. Otherwise, it can be set at disabled.



<div style="break-after:page"></div>

## Set the BIOS/UEFI on a Dell Optiplex 7020



1. Insert your Zero-OS boostrap image USB key in your computer and boot it.
2. During boot, press F12 to enter into *Settings* then choose *BIOS Setup*.

![3node_diy_desktop_104.jpeg](img/3node_diy_desktop_109.png)

3. In BIOS Setup, click on Load Default and confirm by clicking on *OK*

![3node_diy_desktop_115.png](img/3node_diy_desktop_115.png)

4. Leave the BIOS Setup (Exit) and re-enter. This will set the default settings.
  
5. Go through each page and make sure you are following the guidelines set in the section Essential Features as shown in the following pictures.

![3node_diy_desktop_.png](img/3node_diy_desktop_116.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_117.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_118.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_114.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_127.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_120.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_128.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_122.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_123.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_129.png)

![3node_diy_desktop_.png](img/3node_diy_desktop_125.png)


6. Once you are done, click on *Exit* and then click *Yes* to save your changes. The 3node will now boot Zero-OS.

![3node_diy_desktop_126.png](img/3node_diy_desktop_126.png)
  


<div style="break-after:page"></div>

# 6. Boot the 3Node

If your BIOS/UEFI settings are set properly and you have the Zero-OS bootstrap image USB key plugged in, your 3node should automatically boot Zero-OS every time that it is turned on.

1. Power on the 3Node with the Zero-OS boostrap image USB key
2. Let the 3Node load Zero-OS
   * The first time it boots, the 3node will register to the TF Grid
3. Verify the 3Node's status on ThreeFold Explorer

The first time you boot a 3Node, it will be written: “This node is not registered (farmer : NameOfFarm). This is normal. The Grid will create a node ID and you will be able to see it on screen. This can take a couple of minutes.

This is the final screen you should see when your 3Node is connected to the ThreeFold Grid. Note that it is normal if it is written *no public config* next to *PUB* as we did not set any public IP address.

Naturally, your node ID as well as your farm ID and name will be shown.

![3node_diy_desktop_76.png](img/3node_diy_desktop_130.png)

Once you have your node ID, you can also go on the ThreeFold Dashboard to see your 3Node and verify that your 3Node is online.



<div style="break-after:page"></div>

## Check the Node Status

You can use the [Node Finder](../../../dashboard/deploy/node_finder.md) on the [TF Dashboard](https://dashboard.grid.tf/) to verify that the node is online.

Enter your node ID and click **Apply**.

## Farming Rewards Distribution



The farming reward will be sent once per month directly in your ThreeFold Connect App wallet. Farming rewards are usually distributed around the 5th of each month.



# Additional Information

Congratulations, you now have built your first ThreeFold 3Node server! 

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](https://forum.threefold.io/) or on the [ThreeFold Telegram Farmer Group](https://t.me/threefoldfarmers).