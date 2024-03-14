<h1> 5. Set the BIOS/UEFI </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Z-OS and DHCP](#z-os-and-dhcp)
  - [Regular Computer and 3Node Network Differences](#regular-computer-and-3node-network-differences)
  - [Static IP Addresses](#static-ip-addresses)
- [The Essential Features of BIOS/UEFI for a 3Node](#the-essential-features-of-biosuefi-for-a-3node)
- [Setting the Remote Management of a Server with a Static IP Address (Optional)](#setting-the-remote-management-of-a-server-with-a-static-ip-address-optional)
- [Update the BIOS/UEFI firmware (Optional)](#update-the-biosuefi-firmware-optional)
  - [Check the BIOS/UEFI version on Windows](#check-the-biosuefi-version-on-windows)
  - [Check the BIOS/UEFI version on Linux](#check-the-biosuefi-version-on-linux)
  - [Update the BIOS firmware](#update-the-bios-firmware)
- [Additional Information](#additional-information)
  - [BIOS/UEFI and Zero-OS Bootstrap Image Combinations](#biosuefi-and-zero-os-bootstrap-image-combinations)
  - [Troubleshoot](#troubleshoot)


***

## Introduction

In this section of the ThreeFold Farmers book, we explain how to properly set the BIOS/UEFI of your 3Node.

Note that the BIOS mode is usually needed for older hardware while the UEFI mode is usually needed for newer hardware, when it comes to booting properly Zero-OS on your DIY 3Node.

If it doubt, start with UEFI and if it doesn't work as expected, try with BIOS.

Before diving into the BIOS/UEFI settings, we will present some general considerations on Z-OS and DHCP.

## Z-OS and DHCP

The operating system running on the 3Nodes is called Zero-OS (Z-OS). When it comes to setting the proper network for your 3Node farm, you must use DHCP since Z-OS is going to request an IP from the DHCP server if there's one present, and it won't get network connectivity if there's no DHCP. 

The Z-OS philosophy is to minimize configuration wherever possible, so there's nowhere to supply a static config when setting your 3Node network. Instead, the farmer is expected to provide DHCP. 

While it is possible to set fixed IP addresses with the DHCP for the 3Nodes, it is recommended to avoid this and just set the DHCP normally without fixed IP addresses.

By setting DHCP in BIOS/UEFI, an IP address is automatically assigned by your router to your 3Node every time you boot it.

### Regular Computer and 3Node Network Differences

For a regular computer (not a 3Node), if you want to use a static IP in a network with DHCP, you'd first turn off DHCP and then set the static IP to an IP address outside the DHCP range. That being said, with Z-OS, there's no option to turn off DHCP and there's nowhere to set a static IP, besides public config and remote management. In brief, the farmer must provide DHCP, either on a private or a public range, for the 3Node to boot.

### Static IP Addresses

In the ThreeFold ecosystem, there are only two situations where you would work with static IP addresses: to set a public config to a 3Node or a farm, and to remotely manage your 3Nodes. 

**Static IP and Public Config**

You can [set a static IP for the public config of a 3Node or a farm](./1_create_farm.md#optional-add-public-ip-addresses). In thise case, the 3Node takes information from TF Chain and uses it to set a static configuration on a NIC (or on a virtual NIC in the case of single NIC systems). 

**Static IP and Remote Management**

You can [set a static IP address to remotely manage a 3Node](#setting-the-remote-management-of-a-server-static-ip-address).



## The Essential Features of BIOS/UEFI for a 3Node

There are certain things that you should make sure are set properly on your 3Node.

As a general advice, you can Load Defaults (Settings) on your BIOS, then make sure the options below are set properly.

* Choose the correct combination of BIOS/UEFI and bootstrap image on [https://bootstrap.grid.tf/](https://bootstrap.grid.tf/)
  * Newer system will use UEFI
  * Older system will use BIOS
    * Hint:  If your 3Node boot stops at *Initializing Network Devices*, try the other method (BIOS or UEFI)
* Set Multi-Processor and Hyperthreading at Enabled
  * Sometimes, it will be written Virtual Cores, or Logical Cores. 
* Set Virtualization at Enabled
  * On Intel, it is denoted as CPU virtualization and on ASUS, it is denoted as SVM. 
  * Make sure virtualization is enabled and look for the precise terms in your specific BIOS/UEFI.
* Set AC Recovery at Last Power State
  * This will make sure your 3Node restarts after losing power momentarily.
* Select the proper Boot Sequence for the 3Node to boot Zero-OS from your bootstrap image
  * e.g., if you have a USB key as a bootstrap image, select it in Boot Sequence
* Set Server Lookup Method (or the equivalent) at DNS. Only use Static IP if you know what you are doing.
  * Your router will assign a dynamic IP address to your 3Node when it connects to Internet.
* Set Client Address Method (or the equivalent) at DHCP. Only use Static IP if you know what you are doing.
  * Your router will assign a dynamic IP address to your 3Node when it connects to Internet.
* Secure Boot should be left at disabled
  * Enable it if you know what you are doing. Otherwise, it can be set at disabled.




## Setting the Remote Management of a Server with a Static IP Address (Optional)


Note from the list above that by enabling the DHCP and DNS in BIOS, dynamic IP addresses will be assigned to 3Nodes. This way, you do not need any specific port configuration when booting a 3Node.

As long as the 3Node is connected to the Internet via an ethernet cable (WiFi is not supported), Zero-OS will be able to boot. By setting DHCP in BIOS, an IP address is automatically assigned to your 3Node every time you boot it. This section concerns 3Node servers with remote management functions and interfaces.

You can set up a node through static routing at the router without DHCP by assigning the MAC address of the NIC to a IP address within your private subnet. This will give a static IP address to your 3Node.

With a static IP address, you can then configure remote management on servers. For Dell, [iDRAC](https://www.dell.com/support/kbdoc/en-us/000134243/how-to-setup-and-manage-your-idrac-or-cmc-for-dell-poweredge-servers-and-blades) is used, and for HP, [ILO](https://support.hpe.com/hpesc/public/docDisplay?docId=a00045463en_us&docLocale=en_US) is used.



## Update the BIOS/UEFI firmware (Optional)


Updating the BIOS firmware is not always necessary, but to do so can help prevent future errors and troubleshootings. Making sure the Date and Time are set correctly can also help the booting process.

Note: updating the BIOS/UEFI firmware is optional, but recommended.


### Check the BIOS/UEFI version on Windows

Hit *Start*, type in *cmd* in the search box and click on *Command Prompt*. Write the line

> wmic bios get smbiosbiosversion

This will give you the BIOS or UEFI firmware of your PC.

### Check the BIOS/UEFI version on Linux

Simply type the following command 

> sudo dmidecode | less

or this line:

> sudo dmidecode -s bios-version

### Update the BIOS firmware

1. On the manufacturer's website, download the latest BIOS/UEFI firmware
2. Put the file on a USB flash drive (+unzip if necessary)
3. Restart your hardware and enter the BIOS/UEFI settings
4. Navigate the menus to update the BIOS/UEFI

## Additional Information

### BIOS/UEFI and Zero-OS Bootstrap Image Combinations

To properly boot the Zero-OS image, you can either use an image made for a BIOS system or a UEFI system, this depends on your system. 

BIOS is older technology. It means *Basic Input/Output System*. 

UEFI is newer technology. It means *Unified Extensible Firmware Interface*. BIOS/UEFI is, in a way, the link between the hardware and the software of your computer.

In general, setting a 3Node is similar whether it is with a BIOS or UEFI system. The important is to choose the correct combination of boot media and boot mode (BIOS/UEFI).

The bootstrap images are available [here](https://bootstrap.grid.tf/).

The choices are:

1. EFI IMG - UEFI
2. EFI FILE - UEFI
3. iPXE - Boot from network
4. ISO - BIOS
5. USB - BIOS
6. LKRN - Boot from network

Choices 1 and 2 are for UEFI (newer models).
Choices 4 and 5 are for BIOS (newer models).
Choices 3 and 6 are mainly for network boot.

Refer to [this previous section](./2_bootstrap_image.md) for more information on creating a Zero-OS bootstrap image.

For information on how to boot Zero-OS with iPXE, read [this section](./6_boot_3node.md#advanced-booting-methods-optional).

### Troubleshoot

You might have to try UEFI first and if it doesn't work, try BIOS. Usually when this is the case (UEFI doesn't work with your current computer), the following message will be shown:

> Initializing Network Devices...

And then... nothing. This means that you are still in the BIOS of the hardware and boot is not even started yet. When this happens, try the BIOS mode of your computer. 