<h1> 5. Set the BIOS/UEFI </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [The Essential Features of BIOS/UEFI for a 3Node](#the-essential-features-of-biosuefi-for-a-3node)
- [Setting the Remote Management of a Server (Static IP Address)](#setting-the-remote-management-of-a-server-static-ip-address)
- [Update the BIOS/UEFI firmware](#update-the-biosuefi-firmware)
  - [Check the BIOS/UEFI version on Windows](#check-the-biosuefi-version-on-windows)
  - [Check the BIOS/UEFI version on Linux](#check-the-biosuefi-version-on-linux)
  - [Update the BIOS firmware](#update-the-bios-firmware)
- [BIOS/UEFI and Zero-OS Bootstrap Image Combinations](#biosuefi-and-zero-os-bootstrap-image-combinations)
- [Example of BIOS Settings - Rack Server - Dell R720](#example-of-bios-settings---rack-server---dell-r720)
- [Example of UEFI Settings - Desktop Computer - Dell Optiplex 7010](#example-of-uefi-settings---desktop-computer---dell-optiplex-7010)


***

## Introduction

In this section of the ThreeFold Farmers book, we explain how to properly set the BIOS/UEFI of your 3Node.

Note that the BIOS mode is usually needed for older hardware while the UEFI mode is usually needed for newer hardware, when it comes to booting properly Zero-OS on your DIY 3Node.

If it doubt, start with UEFI and if it doesn't work as expected, try with BIOS.

## The Essential Features of BIOS/UEFI for a 3Node
***
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



***
## Setting the Remote Management of a Server (Static IP Address)
***

Note from the list above that by enabling the DHCP and DNS in BIOS, dynamic IP addresses will be assigned to 3Nodes. This way, you do not need any specific port configuration when booting a 3Node.

As long as the 3Node is connected to the Internet via an ethernet cable (WiFi is not supported), Zero-OS will be able to boot. By setting DHCP in BIOS, an IP address is automatically assigned to your 3Node every time you boot it. This section concerns 3Node servers with remote management functions and interfaces.

You can set up a node through static routing at the router without DHCP by assigning the MAC address of the NIC to a IP address within your private subnet. This will give a static IP address to your 3Node.

With a static IP address, you can then configure remote management on servers. For Dell, [iDRAC](https://www.dell.com/support/kbdoc/en-us/000134243/how-to-setup-and-manage-your-idrac-or-cmc-for-dell-poweredge-servers-and-blades) is used, and for HP, [ILO](https://support.hpe.com/hpesc/public/docDisplay?docId=a00045463en_us&docLocale=en_US) is used.


***
## Update the BIOS/UEFI firmware
***

Updating the BIOS firmware is not always necessary, but to do so can help prevent future errors and troubleshootings. Making sure the Date and Time are set correctly can also help the booting process.

Note: updating the BIOS/UEFI firmware is optional, but recommended.

***
### Check the BIOS/UEFI version on Windows
***
Hit *Start*, type in *cmd* in the search box and click on *Command Prompt*. Write the line

> wmic bios get smbiosbiosversion

This will give you the BIOS or UEFI firmware of your PC.
***
### Check the BIOS/UEFI version on Linux
***
Simply type the following command 

> sudo dmidecode | less

or this line:

> sudo dmidecode -s bios-version
***
### Update the BIOS firmware
***
1. On the manufacturer's website, download the latest BIOS/UEFI firmware
2. Put the file on a USB flash drive (+unzip if necessary)
3. Restart your hardware and enter the BIOS/UEFI settings
4. Navigate the menus to update the BIOS/UEFI


***
## BIOS/UEFI and Zero-OS Bootstrap Image Combinations
***
To boot your 3Node, you need to create your own boot device for your system. This might sound like a big project to accomplish, but it's actually pretty simple. As simple as can be, you need a removable media (USB key for example) where you will burn/install the Zero-OS bootstrap image on it. The type of file you burn on the removable media will change depending if your system is old or recent. Older system uses BIOS and newer system uses UEFI.

Whether you use BIOS or UEFI, 3Nodes are also self-healing, so once you set up your 3Node, maintenance is minimal. 

To properly boot the Zero-OS image, you can either use an image made for a BIOS system or a UEFI system, this depends on your system. 

BIOS is older technology. It means *Basic Input/Output System*. 

UEFI is newer technology. It means *Unified Extensible Firmware Interface*. BIOS/UEFI is, in a way, the link between the hardware and the software of your computer.

In general, setting a 3Node is similar whether it is with a BIOS or UEFI system. The important is to choose the correct combination of boot media + boot mode (BIOS/UEFI).

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

For information on how to boot Zero-OS with iPXE, read [this section](#advanced-booting-option---network-booting-pxe).

You might have to try UEFI first and if it doesn't work, try BIOS. Usually when this is the case (UEFI doesn't work with your current computer), the following message will be shown:

> Initializing Network Devices...

And then... nothing. This means that you are still in the BIOS of the hardware and boot is not even started yet. When this happens, try the BIOS mode of your computer. 

***

**Additional information :** One of the great features of Zero-OS is that it can be completely run within the cache of your 3Node. Indeed, the booting device, that contains your farm ID, will connect to the ThreeFold Grid and download everything needed to run smoothly. There are many benefits in terms of security and protection of data that comes with this.

***

Let's go into BIOS mode now!

## Example of BIOS Settings - Rack Server - Dell R720
***

The following covers proper settings for the BIOS mode of a DIY 3Node. Note that it is also called the normal BIOS or legacy BIOS.

There might be other ways to configure those settings, depending on the specific computer. Depending on your hardware (disks connections, RAID controller, etc.), you might need to change some settings to fit the specific model. Most of the time, if you follow these lines, your 3Node should work 100% with the Grid. Check the [Troubleshooting and Error Messages](/faq/faq.md#troubleshooting-and-error-messages) section if you have trouble on your way to booting Zero-OS.

It is possible that your 3Node needs to be booted with the UEFI mode. In this case, refer to the [next section](#example-of-uefi-settings---desktop-computer---dell-optiplex-7010).

***

Note that the settings are similar for UEFI and non-UEFI. But some details are important.

To boot Zero-OS, you need to use the bootstrap image [here](https://bootstrap.grid.tf/).

Old servers/desktops will need to use the 4th and 5th options (named: ISO and USB). Newer servers/desktops can use UEFI (1st and 2nd option).

The BIOS setting in BIOS (non-UEFI) mode presented here is mostly based on a Dell R720. We also add information to cover more broadly the subject. There may be differences with your specific 3Node hardware. The following should give you a good overview of how to set it up and you can adjust the details. For newer servers, UEFI mode might be the preferred option.
***

Please note that you can set your iDRAC with remote access. In this section, we set up the 3Node directly with a monitor and keyboard. Once this BIOS settings are set and the 3Node is running, you will not need to do much maintenance on the server's BIOS or iDRAC settings, thanks to the Self-Healing properly of ThreeFold's Zero-OS.

***

SYSTEM SETUP
***

To enter into system setup, you need to press a certain key when the computer is powered on. With Dell server R720, hit F2 to get into System Setup.

To set the 3Node running, you will need to configure the following sections:

- System BIOS
- iDRAC Settings

First, let's go into System BIOS.

***

**System BIOS**

***

MEMORY SETTINGS
***

In `System BIOS`, go into `Memory Settings` and make sure the Memory parameters are correct (Size, Type, Speed, Voltage). If you have less GB of RAM than expected, perhaps the RAM sticks are not well seated. 

You will have the choice of enabling or disabling the function `System Memory Testing`. You can leave this at `disabled` in general. You will want it at `enabled` when you want to tests the condition and integrity of the 3Node's memory.

The options for `Memory Operating Mode` are the following, with **Optimizer Mode** being the option by default, which you can leave as such:

- Optimizer Mode
- Advanced ECC Mode
- Mirror Mode
- Spare Mode
- Dell Fault Resilient Mode

You will have the choice of enabling or disabling the function `Node Interleaving`.

Usually your system will run faster with this option `disabled`.

When `enabled`, Node Interleaving will interleave the memory addresses across the memory in each processor. In some situation and for certain workload, this can improve the performance.

***
PROCESSOR SETTINGS 
***
Next, we will adjust the proper settings for the processors in `Processor Settings`. 

| #  | Settings  | Option  |
|---|---|---|
| 1  | Logical Processors  | **Enabled**  |
|  2 |  QPI Speed | Maximum datarate  |
|   3|  Alternate RTID | Disabled  |
|  4 |  Virtualization Technology | Enabled  |
| 5  | Adjacent Cache Line Prefetch  | Enabled   |
|  6 | Hardware Prefetcher  | Enabled  |
| 7  | DCU Streamer Prefetcher  | Enabled  |
| 8  | DCU IP Prefetcher  | Enabled  |
| 9  | Execute Disable  | Enabled  |
| 10  | Logical Processor Idling  | Disabled  |
| 11  | Dell Controlled Turbo  | Disabled  |
| 12  | Number of Cores per Processor  | **All**  |

Setting Logical Processor at Enabled is particularly important. If you're supposed to have `x` vcores, and the Explorer says you only have `x/2` (only half of expected vcores), chances are you need to enable this setting. Also make sure the number of cores is set to **All**.

Next in the section Processor Settings, you will see the information of your processor(s). The number of cores per processor will also be shown. In short, make sure you have the expected processors and number of cores.

***

SATA SETTINGS
***

Next, we will adjust the proper software settings for the SATA connections and hardware in `SATA Settings`.

| #  | Settings  | Option  |
|---|---|---|
| 1  | Embedded SATA  | **AHCI**/RAID/ATA/Off  |
|  2 |  Port A (First port) | Auto  |
|   3|  ... | ...  |
|  4 |  Port Z (Last port) | Auto  |

If you are using SATA disks, you probably want #1 set to AHCI. Depending on your disks configurations, you might need to chance this parameter.

The rest of the settings are for the Ports. You can always check in the User's Guide of your server to check which ports are for which hardware. For example, on Dell R720, Port E is for the optical drive (CD/DVD).

***
BOOT SETTINGS
***

Next, we will adjust the proper settings for the processors `BOOT Settings`.

| #  | Settings  | Option  |
|---|---|---|
| 1  | BOOT Mode  | **BIOS** / UEFI  |
|  2 |  Boot Sequence Retry | **Enabled** / Disabled  |
|   3|  BIOS Boot Settings | ...  |
|  4 |  BIOS Boot Settings | ...  |

Since we are doing a BIOS boot, and not a UEFI boot, for the 3Node, make sure you have BIOS mode instead of UEFI selected. Otherwise it won't boot properly. For newer servers, work with UEFI instead.

You can have Boot Sequence Retry Enabled, but your server should boot fine without. When enabled, the system will reattempt the boot sequence 30 seconds after a failed booting sequence.

Then you need to save these changes and come back to access BIOS Boot Settings (if you were previously set to UEFI mode).

***
BIOS Boot Settings
***

Next, we will adjust the proper settings for the processors `BIOS Boot Settings`. Note that USB keys will often be called **Hard drive C:**. Click on **Boot Sequence** and choose the proper order for your 3Node configuration. Here we choose **Hard drive C:** as we will be booting from USB key. If you use another method than a USB key, make sure you select it. 

- BOOT Sequence
  - **Hard drive C:**
  - SATA Port
  - Integrated NIC
  - ...

- Boot Option Enable/Disable
  -   [x]  Hard drive C:
  -   [ ]  SATA Port:
  -   [ ]  ...

In Boot Option Enable/Disable, you can check the option you will be using for your booting device. Here we check `Hard drive C:`, as we are booting Zero-OS from a USB key.

***

INTEGRATED DEVICES
***

Next, we will adjust the proper settings for the `Integrated Devices`.
This will change depending on your hardware configuration.

| #  | Settings  | Option  |
|---|---|---|
| 1  | Integrated RAID Controller  | Enabled / **Disabled**  |
| 2  | User Accesible USB Ports  | **All Ports On** / Only Back Ports / All Ports Off  |
| 3  | Internal USB  | **On** / Off  |
| 4  | Integrated Network Card 1  | **Enabled** / Disabled  |
| 5  | OS Watchdog Timer  | Enabled / **Disabled**  |
| 6  | Embedded Video Controller  | **Enabled** / Disabled   |
| 7  | SR-IOV Global Enable | **Enabled** /*Disabled  |
| 8  | Memory Mapped I/O above 4 GB  | **Enabled** / Disabled   |
| 9  | Slot Disablement  | **Enabled** / Disabled   |



1. The RAID controller can be disabled if you are plugging your disks with a PCIe adaptors or the SATA connection of the optical drive. If you are using the front panel disks, you will need to deal with RAID configuration. You can also use RAID 0. But in general, 3Nodes do not use RAID. 

    You can use the onboard storage on a server without RAID. You can [re-flash](https://fohdeesha.com/docs/perc.html) the RAID card, turn on HBA/non-RAID mode, or install a different card. There is no need for RAID on a 3Node.
    
    It's usually easy to set servers such as a HP Proliant with the HBA mode. For Dell servers, you can either cross-flash the RAID controller with an “IT-mode-Firmware” (see this [video](https://www.youtube.com/watch?v=h5nb09VksYw)) or get a DELL H310-controller (which has the non-RAID option). Otherwise, you can install a NVME SSD with a PCIe adaptor as stated above.

    Concerning RAID technology, here is what Weynand Kuijpers, one of ThreeFold's co-founders, has to say:

    > RAID is a technology that has brought resilience and security to the IT industry. But it has some limitations that we at ThreeFold did not want to get stuck in. We developed a different (and more efficient way to store data reliably). Please have a look [here](https://library.threefold.me/info/threefold#/cloud/threefold__cloud_products?id=storage-quantum-safe-filesystem). 
    > 
    > This Quantum Safe Storage overcomes some of the shortfalls of RAID and is able to work over multiple nodes geographically spread on the TF Grid.

2. Usually you can leave all USB ports accessible. 
3. You can choose to leave your booting device inside the server (this is recommended). You might sometimes have to upgrade the booting device, but minor upgrades are always done via the ThreeFold Grid so this would not happen often.
4. It is important to enable your Network Card so your 3Node can connect to the ThreeFold Grid.
5. OS Timer is not necessary as Zero-OS is self-healing.
6. By default, this parameter is enabled. The video controller is used to check the 3Node Zero-OS status. Note that it is possible to run a 3Node headless, and/or without a GPU connected.
7. This is for virtualization devices.
8. Memory Mapped is to perit PCIe devices to uses a lot of memory. Useful for NVME SSD PCIe adaptor 3Node build.
9. To enable PCIe slots. You can leave them all enabled, and disabled them for specific use cases.

| #  | Settings  | Option  |
|---|---|---|
| 1  | First Slot (1)  | **AHCI**/RAID/ATA/Off  |
|   3|  ... | ...  |
|  4 |  Last Slot (7) | **Enabled** / Disabled / Boot Driver Disabled |

All slots should be set at Enabled in Slot Disablement. You might want to disable unused slots depending on your spectific configuration.

***
SERIAL COMMUNICATION
***

Next, we will adjust the proper settings for the `Serial Communication`.
This can change depending on your hardware configuration.

| #  | Settings  | Option  |
|---|---|---|
| 1  | Serial Communication  | **On without Console Redirection**  |
|   2|  Serial Port Address | **Serial Device 1=COM2, Serial Device 2=COM1** |
|  3 |  External Serial Connector | **Serial Device1** |
| 4 | Failsafe Baud Rate  | **115200**  |
|  5|  Remote Terminal Type | **VTT100/VT220** / ANSI  |
|  6 |  Redirection After Boot | **Enabled** / Disabled |

In general, this section can be left with the default parameters. It can be useful when you have specific connections and want to use remote access device.

1. To select serial communication devices.
2. This can be used to set the port address for serial devices.

***

SYSTEM PROFILE
***

Next, we will adjust the proper settings for the `System Profile`.
This can change depending on your hardware configuration.

| #  | Settings  | Option  |
|---|---|---|
| 1  | System Profile  | **Performance Per Watt (DAPC)**  |
|   2| CPU Power Management | **System DBPM (DAPC)** |
|  3 |  Memory Frequency | **Maximum Performance** |
| 4 | Turbo Boost  | **Enabled**  |
|  5| C1E  |  **Enabled**|
|  6| C States  | **Enabled** |
|  7| Monitor/Mwait  | **Enabled** |
|  8|  Memory Patrol Scrub | **Standard** |
|  9|  Memory Refresh Rate | **1x** |
|  10| Memory Operating Voltage  | **Auto** |
|  11| Collaborative CPU Performance Control  | **Disabled** |

System Profile Settings can be at Performance Per Watt. In this case, all the parameters are locked to default. This is aimed at being efficient and consume less power.

You can also use custom parameters. Make sure you know what you are doing. Many things can be done such as changing the frequency and the DIMM voltage selection. This can, in certain situations, increase the 3Node's performance.

***

SYSTEM SECURITY
***

Next, we will adjust the proper settings for the `System Security`. Here you can set a password for the BIOS and also set the AC Power Recovery with a set detay.

| #  | Settings  | Option  |
|---|---|---|
| 1  | Password Status  | **Unlocked** / Locked  |
| 2  | ...  | ...  |
| 3  | Power Button  | **Enabled** / Disabled  |
| 4  | ...  | ...  |
| 5  | AC Power Recovery  | **Last** / On / Off  |
| 6  |  AC Power Recovery Delay | **User Defined***  |
| 7  | ...  | ...  |

*In System Security, it can be very useful to set AC Power Recovery at **Last**. If your 3Node is powered on and you have an electric outage, your 3Node will power back on when the power outage is over. You can also set it to **power on** after X seconds (from 0 to 240 with Dell servers). Imagine if you have 15 power outage in the same 30 minutes, your serves would constantly power back on, and this could damage the unit if this is done too frequently. For this reason, it is good to set the power on after 30 seconds or more.

To reset your Trusted Platform Module (TPM), use TPM Clear.

***
MISCELLANEOUS SETTINGS
***

Next, we will adjust the proper settings for the `Miscellaneous Settings`.
This can change depending on your hardware configuration.

| #  | Settings  | Option  |
|---|---|---|
| 1  | System Time  | HH:MM:SS PM  |
| 2  | System Date  | DD/MM/YYYY  |
| 3  |  ... | ...  |
| 4  | F1/F2 Prompt on Error  | **Enabled** / Disabled  |
| 5  |  ... | ...  |

The settings in this section can be left at default. It is good to verify that the date and time are correct. Some farmers have reported that their 3Nodes were not booting easily when they were out of sync.

***

**iDRAC Settings**
***

The next section covers the basic to set a iDRAC that will run properly with the 3Node and help ease the farming maintenance. It is possible to set the iDRAC completely with a remote access. This will be partly covered here, but it is not the focus. Once your 3Node is booted and connected to the TF Grid, minimal maintenances are required.
***
SYSTEM SUMMARY
***
In System Summary, you can see your computer informations. It's a good thing to make sure you have the latest iDRAC Firmware. Here you can make sure IPv4 and DHCP are Enabled.

To set the iDRAC remotely, you can look at the iDRAC MAC Address.
***
SYSTEM EVENT LOG
***
In System Event Log, you can Clear Records. This can be a good thing to do when you buy a used server. 
In Display System Event Log, you can check the history of your 3Node. This can be good for specific troubleshootings.
***
NETWORK
***
In Network, make sure to set Enabled at Enable NIC and Auto Dedicated NIC. You will also need to enable DHCP and IPV4 (and IPV6 if needed). For remote access, you will need to Enabled Register DRAC on DNS and Use DHCP to obtain DNS server addresses.
***
FRONT PANEL SECURITY
***
In Front Panel Security, you want to make sure Disable Power Button is set at No. Front Panel Access can be set to Full Capabilities as this can be useful to check your server's parameters. 
***
VIRTUAL MEDIA
***
Virtual Media setting can be set at Auto attach. This is for remote usage of software image files (ISO-files). This is used to update servers and install operating systems.

***
vFlash Media
***
Enable vFlash can be set at Disabled in the vFlash Media section. This SD card can be used as a storage device to boot Zero-OS. It can also be used as a storage backup when replacing the motherboard.

***
LIFECYCLE CONTROLLER
***
It's good to set Enabled at Lifecycle Controller and Collect System Inventory on Restart. This checks if anything new was added to the server between usages. Also Lifecycle Controller can be used to set iDRAC remotely.
***
POWER CONFIGURATION
***
You can disable Power Cap Policy and set Power Supply Options - Redundant Policy at Not Redundant. If you want to put a power limit on the system, you can set Power Cap Policy at enabled.

You can enable Power Factor Correction to improve the server's efficiency and reduce current, but this is not necessary.

Make sure **Hot Spare is Enabled**. This feature makes sure the server will function properly if one of the two PSU (power supply unit) is damaged or removed during use.

***

SMART CARD
***
The Smart Card option can be Disabled. This can be used to connect to iDRAC with a Two Factor Authetication (2FA).
***
THERMAL
***
In the section Thermal, you can set Thermal Base Algorithm at Auto and the Cooling Options at Default.
***
COMMUNICATION PERMISSIONS
***
Communication Permissions can be disabled. When enabled, you can launch the browswer in the host OS, but this does not really apply to a 3Node.
***
USER CONFIGURATION
***
In User Configuration, you want to enable Enable User. You can set a password.
***
REMOTE ENABLEMENT
***
To use iDRAC remotely with Dell OpenManage Server Administrator (OMSA), you will need to set Enable Auto-Discovery at Enabled. Otherwise, you can set it at Disabled.
***
SYSTEM LOCATION
***
System Location can be useful if you are in a data center. You don't need to fill in any information.
***
RESET iDRAC
***
If ever needed, you can do a Factory Reset of the iDRAC configuration.
***
We have been through the BIOS settings and th iDRAC settings of a typical Dell R720 Server. With these notions in mind, you should be able to properly set your DIY 3Node. Some changes may be needed depending on your hardware and desired configuration. 

## Example of UEFI Settings - Desktop Computer - Dell Optiplex 7010
***

The UEFI mode is usually needed for newer hardware.
***
There might be other ways to configure those settings, depending on the specific computer. Depending on your hardware (disks connections, RAID controller, etc.), you might need to change some settings to fit your specific computer model. Most of the time, if you follow these lines, your 3Node should work 100% with the ThreeFold Grid. Check the [Troubleshooting and Error Messages](/faq/faq.md#troubleshooting-and-error-messages) section if you have trouble on your way to booting Zero-OS.

It is possible that your 3Node needs to be booted with the BIOS mode. In this case, refer to the [previous section](#example-of-bios-settings---rack-server---dell-r720).

***
To boot Zero-OS, you need to use the bootstrap image [here](https://bootstrap.grid.tf/).

Old servers/desktops will need to use the non-UEFI mode, which are the 4th and 5th options (named: ISO and USB). Newer servers/desktops can use UEFI (1st and 2nd option).

We will now present the BIOS/UEFI settings that work with ThreeFold Zero-OS.
Note that the settings are similar for UEFI and non-UEFI. But some details are important.

The UEFI settings are from a HP G1 EliteDesk Desktop. These should give you a good overview of how to set it up.
***

**UEFI mode with HP EliteDesk.**

***

The following section will propose UEFI settings to boot a 3Node properly on the TF Grid. Note that the settings might need some modifications in your specific situations. These guidelines will help you set your 3Node properly.

Start your computer and hit Escape to get into the startup Menu. For some other computers, it can be another key. It's usually shown at the start of the boot.
Hit F10 or click on Computer Setup.

***
It can be a good idea to first check in System Information that your setup is as expected.

Here you can see your computer model and manufacturer. You can check that the processors are properly recognized and that you have the correct quantity of RAM. It's a good idea to check the BIOS and Firmware Versions. Updating the UEFI can help to boot the 3Node.

***

In Storage -> Device Configuration, you can see if all your disks are well connected (SATA, USB, etc.). Usually, to be recognized, you need to plug your removable media before booting the 3Node.
***

In Storage -> Storage Options, select AHCI as SATA Emulation and make sure Removable Media Boot is Enabled. For some specific configurations, you will want to use another paramter than AHCI.

***

In Storage -> Boot Order, you can choose the UEFI Boot Sources. If you are using a removable media, make sure it is the first in the list. Options can be: USB Hard Drive, USB Floppy/CD, CD/DVD Drive and more.

If you are booting from a USB key, you'll want to select USB Hard Drive first for the Boot Order.

***

In the section Security -> Device Security, you can see that your devices are available. 

- Netowrk Controller
- SATA0
- ...
- SATA2
- ...
In the section Device Security, make sure all are set to Device Available.

***

In Security -> USB Security, make sure the port you want to use is Enabled. The easy way is to make them all Enabled.

***

In Security -> Slot Security, you can enable the PCI Express (PCIe) slots. This can be useful when you have SSD NVME disk to use via a PCIe adapter.

***

Network boot can be set at Disabled if you are booting with a removable media (USB key, CD/DVD). If you are using PXE mode, you will need to set the Network Boot at Enabled.

***

In Security -> Master Boot Record Security, you can se it at Disabled. This is used to successfully boot from a disk while accessing the data it contains. In the case of Zero-OS, the OS is on the removable media.
***

In Security -> System Security, you can enable Data Execution Prevention and OS management of Embedded Security Device. This is the place to set the Virtualization Technology (VTx). It is needed with Zero-OS in order for users to deploy virtual machines on the 3Nodes.
***

In Security -> Secure Boot Configuration, make sure you have Legacy Support set at Enabled (without this, your 3Node can't boot without a monitor). You should also Disabled the Secure Boot. Sometimes Zero-OS won't boot otherwise. There is no security problem when doing so to a 3Node running on Zero-OS. 

Enabling Secure Boot can be helpful when setting a 3Node and you want to be sure no one can access the BIOS/UEFI and change the settings.

***

In Power -> OS Power Management, it can be set to Enabled Extended and Disabled.

***

In Power -> Hardware Power Management, both SATA Power Management and PCI Express Power Mangement can be set at Enabled. It can be set to Enabled Extended and Disabled. Here are the settings for Hard Power Management. S5 Maximum Power Savings can be set at Disabled. This function, when the computer is off, will turn off the power of all nonessential hardware.
***
In Advanted -> Power-On Options, it is a good idea to have After Power Loss set at Previous State. You can select a proper POST Delay (in seconds). This means if your servers are running and you get a power outage, they will turn back on when power comes back. As 3Nodes don't have "graceful shutdown", if you lose electricity momentarily, the 3Node will symply reboot and continue its work. No data can be lost when a 3Node is shutdown.

If you have different 3Nodes on the same breaker, it can be a good idea to set different POST delay timer. This will ensure that you do not have a sudden high power demand when they power on.

***

In Advanced -> BIOS Power-On, you can set all the BIOS Power-On Option at Disabled.

***
In Advanced -> Bus Options, you can set PCI SERR# Generation at Enabled, but it is simply concerning ill-behaved PCI add-in cards. PCI VGA Palette Snooping concerns graphics and can be set at Disabled.
***

In Advanced -> Device Options, you can Enabled Turbo Mode. It is very important to have **Multi-Processor and Hyperthreading at Enabled.** Sometimes, it will be written Virtual Cores, or Logical Cores. 

***

In Advanced -> Management Operations, you can set the Active Management Technology (AMT). This is for remote access and is not necessary when it comes to booting and running a 3Node.

***

In Advanced -> Option ROM Launch Policy, you can all all the parameters at Legacy Only. In Legacy mode, the computer will be able to boot from all bootage devices. 

***

In Advanced -> Update BIOS via Network, you can set automatic BIOS Update and enabled Update via Network. You can either leave it Enabled or Disabled. To upgrade the BIOS, you can also use a booting removable device (USB key) containing the newer firmware file.

***

In Advanced -> Ethernet Connection -> NIC Configuration, make sure your Link Status is at Connected.

***

That's it. You went through the whole Computer Setup and this should get your 3Node working good.

In the next section, we will boot the 3Node and connect to the ThreeFold Grid. How exciting!
