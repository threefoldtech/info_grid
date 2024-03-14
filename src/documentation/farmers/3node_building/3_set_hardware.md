<h1> 3. Set the Hardware </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Hardware Requirements](#hardware-requirements)
  - [3Node Requirements Summary](#3node-requirements-summary)
- [Bandwidth Requirements](#bandwidth-requirements)
- [Link to Share Farming Setup](#link-to-share-farming-setup)
- [Powering the 3Node](#powering-the-3node)
  - [Surge Protector](#surge-protector)
  - [Power Distribution Unit (PDU)](#power-distribution-unit-pdu)
  - [Uninterrupted Power Supply (UPS)](#uninterrupted-power-supply-ups)
  - [Generator](#generator)
- [Connecting the 3Node to the Internet](#connecting-the-3node-to-the-internet)
  - [Z-OS and Switches](#z-os-and-switches)
- [Using Onboard Storage (3Node Servers)](#using-onboard-storage-3node-servers)
- [Upgrading a DIY 3Node](#upgrading-a-diy-3node)

***


## Introduction

In this section of the ThreeFold Farmers book, we cover the essential farming requirements when it comes to ThreeFold 3Node hardware.

The essential information are available in the section [3Node Requirements Summary](#3node-requirements-summary).

## Hardware Requirements


You need a theoretical minimum of 500 GB of SSD and 2 GB of RAM on a mini pc, desktop or server. In short, for peak optimization, aim for 100 GB of SSD and 8GB of RAM per thread. (Thread is equivalent to virtual core or logical core.)

Also, TFDAO might implement a farming parameter based on [passmark](https://www.cpubenchmark.net/cpu_list.php). From the ongoing discussion on the Forum, you should aim at a CPU mark of 1000 and above per core.

> 3Node optimal farming hardware ratio -> 100 GB of SSD + 8 GB of RAM per Virtual Core

Note that you can run Zero-OS on a Virtual Machine (VM), but you won't farm any TFT from this process. To farm TFT, Zero-OS needs to be on bare metal.

Also, note that ThreeFold runs its own OS, which is Zero-OS. You thus need to start with completely wiped disks. You cannot farm TFT with Windows, Linux or MAC OS installed on your disks. If you need to use such OS temporarily, boot it in Try mode with a removable media (USB key).

Note: Once you have the necessary hardware, you need to [create a farm](./1_create_farm.md), [create a Zero-OS bootstrap image](./2_bootstrap_image.md), [wipe your disks](./4_wipe_all_disks.md) and [set the BIOS/UEFI](./5_set_bios_uefi.md) . Then you can [boot your 3Node](./6_boot_3node.md). If you are planning in building a farm in data center, [read this section](../advanced_networking/advanced_networking_toc.md).



### 3Node Requirements Summary



Any computer with the following specifications can be used as a DIY 3Node.

- Any 64-bit hardware with an Intel or AMD processor chip.
- Servers, desktops and mini computers type hardware are compatible.
- A minimum of 500 GB of SSD and a bare minimum of 2 GB of RAM is required.
- A ratio of 100GB of SSD and 8GB of RAM per thread is recommended.
- A wired ethernet connection is highly recommended to maximize reliability and the ability to farm TFT.
- A [passmark](https://www.passmark.com/) of 1000 per core is recommended and will probably be a minimum requirement in the future.

*A passmark of 1000 per core is recommend and will be a minimum requirement in the future. This is not yet an official requirement. A 3Node with less than 1000 passmark per core of CPU would not be penalized if it is registered before the DAO settles the [Passmark Question](https://forum.threefold.io/t/cpu-benchmarking-for-reward-calculations/2479).



## Bandwidth Requirements

<!---
This section should be checked and validated with the TF Team. We can change the constant (here it's 10) if needed. Or use another equation if this one is deemed suboptimal. This equation is an attempt at a synthesis of the discussions we had on the TF Forum.
-->

A 3Node connects to the ThreeFold Grid and transfers information, whether it is in the form of compute, storage or network units (CU, SU, NU respectively). The more resources your 3Nodes offer to the Grid, the more bandwidth will be needed to transfer the additional information. In this section, we cover general guidelines to make sure you have enough bandwidth on the ThreeFold Grid when utilization will be happening.

Note that the TFDAO will need to discuss and settle on clearer guidelines in the near future. For now, we propose those general guidelines. Being aware of these numbers as you build and scale your ThreeFold farm will set you in the proper direction.

> **The strict minimum for one Titan is 1 mbps of bandwidth**. 

If you want to expand your ThreeFold farm, you should check the following to make sure your bandwidth will be sufficient when there will be Grid utilization.

**Bandwidth per 3Node Equation**

> min Bandwidth per 3Node (mbps) = 10 * max((Total SSD TB / 1 TB),(Total Threads / 8 Threads),(Total GB / 64 GB)) + 10 * (Total HDD TB / 2)

This equation means that for each TB of HDD you need 5 mbps of bandwidth, and for each TB of SSD, 8 Threads and 64GB of RAM (whichever is higher), you need 10 mbps of bandwidth. 

This means a proper bandwidth for a Titan would be 10 mbps. As stated, 1 mbps is the strict minimum for one Titan.



## Link to Share Farming Setup


If you want ideas and suggestions when it comes to building DIY 3Nodes, a good place to start is by checking what other farmers have built. [This post on the Forum](https://forum.threefold.io/t/lets-share-our-farming-setup/286) is a great start. The following section also contains great DIY 3Node ideas.

## Powering the 3Node

### Surge Protector

A surge protector is highly recommended for your farm and your 3Nodes. This ensures your 3Nodes will not overcharge if a power surge happens. Whole-house surge protectors are also an option.

### Power Distribution Unit (PDU)

A PDU (power distribution unit) is useful in big server settings in order to manage your wattage and keep track of your power consumption.


### Uninterrupted Power Supply (UPS)


A UPS (uninterrupted power supply) is great for a 3Node if your power goes on and off frequently for short periods of time. This ensures your 3Node does not need to constantly reboot. If your electricity provider is very reliable, a UPS might not be needed, as the small downtime resulting from rare power outages with not exceed the DIY downtime limit*. (95% uptime, 5% downtime = 36 hours per month.) Of course, for greater Grid utilization experience, considering adding a UPS to your ThreeFold farm can be highly beneficial.

Note: Make sure to have AC Recovery Power set properly so your 3Node goes back online if power shutdowns momentarily. UPS are generally used in data center to make sure people have enough time to do a "graceful" shutdown of the units when power goes off. In the case of 3Nodes, they do not need graceful shutdowns as Zero-OS cannot lose data while functioning. The only way to power down a 3Node is simply to turn it off directly on the machine.


### Generator


A generator will be needed for very large installation with or without an unsteady main power supply.



## Connecting the 3Node to the Internet

As a general consideration, to connect a 3Node to the Internet, you must use an Ethernet cable and set DHCP as a network management protocol. Note that WiFi is not supported with ThreeFold farming. 

The general route from the 3Node to the Internet is the following:

> 3Node -> Switch (optional) -> Router -> Modem

Note that most home routers come with a built-in switch to provide multiple Ethernet ports. Using a stand-alone switch is optional, but can come quite handy when farmers have many 3Nodes.



### Z-OS and Switches

Switches can be managed or unmanaged. Managed switches come with managed features made available to the user (typically more of such features on premium models). 

Z-OS can work with both types of switches. As long as there's a router reachable on the other end offering DHCP and a route to the public internet, it's not important what's in between. Generally speaking, switches are more like cables, just part of the pipes that connect devices in a network.

We present a general overview of the two types of switches.

**Unmanaged Switches**

Unmanaged are the most common type and if someone just says "switch" this is probably what they mean. These switches just forward traffic along to its destination in a plug and play manner with no configuration. When a switch is connected to a router, you can think of the additional free ports on the switch as essentially just extra ports on the router. It's a way to expand the available ports and sometimes also avoid running multiple long cables. My nodes are far from my router, so I run a single long ethernet cable to a switch next to the nodes and then use multiple shorter cables to connect from the switch to the nodes.

**Managed Switches**

Managed switches have more capabilities than unmanaged switches and they are not very common in home settings (at least not as standalone units). Some of our farmers do use managed switches. These switches offer much more control and also require configuration. They can enable advanced features like virtual LANs to segment the network.



## Using Onboard Storage (3Node Servers)

If your 3Node is based on a server, you can either use PCIe slots and PCIe-NVME adapter to install SSD NVME disk, or you can use the onboard storage.

Usually, servers use RAID technology for onboard storage. RAID is a technology that has brought resilience and security to the IT industry. But it has some limitations that ThreeFold did not want to get stuck with. ThreeFold developed a different and more efficient way to [store data reliably](https://library.threefold.me/info/threefold#/cloud/threefold__cloud_products?id=storage-quantum-safe-filesystem). This Quantum Safe Storage overcomes some of the shortfalls of RAID and is able to work over multiple nodes geographically spread on the TF Grid. This means that there is no RAID controller in between data storage and the TF Grid.

For your 3Nodes, you want to bypass RAID in order for Zero-OS to have bare metals on the system. 

To use onboard storage on a server without RAID, you can

1. [Re-flash](https://fohdeesha.com/docs/perc.html) the RAID card
2. Turn on HBA/non-RAID mode
3. Install a different card.
   
For HP servers, you simply turn on the HBA mode (Host Bus Adapter). 

For Dell servers, you can either cross, or [re-flash](https://fohdeesha.com/docs/perc.html), the RAID controller with an “IT-mode-Firmware” (see this [video](https://www.youtube.com/watch?v=h5nb09VksYw)) or get a DELL H310-controller (which has the non-RAID option). Otherwise, you can install a NVME SSD with a PCIe adaptor, and turn off the RAID controller.



Once the disks are wiped, you can shutdown your 3Node and remove the Linux Bootstrap Image (USB key). Usually, there will be a message telling you when to do so.



## Upgrading a DIY 3Node



As we've seen in the [List of Common DIY 3Nodes](#list-of-common-diy-3nodes), it is sometimes necessary, and often useful, to upgrade your hardware.

**Type of upgrades possible**

- Add TBs of SSD/HDD
- Add RAM
- Change CPU
- Change BIOS battery
- Change fans

For some DIY 3Node, no upgrades are required and this constitutes a good start if you want to explore DIY building without going into too much additional steps.

For in-depth videos on how to upgrade mini-pc and rack servers, watch these great [DIY videos](https://www.youtube.com/user/floridanelson).