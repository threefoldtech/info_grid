<h1> 3. Set the Hardware </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Hardware Requirements](#hardware-requirements)
  - [3Node Requirements Summary](#3node-requirements-summary)
- [Bandwidth Requirements](#bandwidth-requirements)
- [Link to Share Farming Setup](#link-to-share-farming-setup)
- [List of Common DIY 3Nodes](#list-of-common-diy-3nodes)
  - [The Mini PC DIY 3Node](#the-mini-pc-diy-3node)
  - [The Desktop PC DIY 3Node](#the-desktop-pc-diy-3node)
  - [The Mini Server DIY 3Node](#the-mini-server-diy-3node)
  - [The Tower Server DIY 3Node](#the-tower-server-diy-3node)
  - [The Rack Server DIY 3Node](#the-rack-server-diy-3node)
- [Powering the 3Node](#powering-the-3node)
  - [Surge Protector](#surge-protector)
  - [Power Distribution Unit (PDU)](#power-distribution-unit-pdu)
  - [Uninterrupted Power Supply (UPS)](#uninterrupted-power-supply-ups)
  - [Generator](#generator)
- [Using Onboard Storage (3Node Servers)](#using-onboard-storage-3node-servers)
- [Upgrading a DIY 3Node](#upgrading-a-diy-3node)

***

## Introduction

In this section of the ThreeFold Farmers book, we cover the essential farming requirements when it comes to ThreeFold 3Node hardware.

***

## Hardware Requirements


You need a theoretical minimum of 500 GB of SSD and 2 GB of RAM on a mini pc, desktop or server. In short, for peak optimization, aim for 100 GB of SSD and 8GB of RAM per thread. (Thread is equivalent to virtual core or logical core.)

Also, TFDAO might implement a farming parameter based on [passmark](https://www.cpubenchmark.net/cpu_list.php). From the ongoing discussion on the Forum, you should aim at a CPU mark of 1000 and above per core.

> 3Node optimal farming hardware ratio -> 100 GB of SSD + 8 GB of RAM per Virtual Core

Note that you can run Zero-OS on a Virtual Machine (VM), but you won't farm any TFT from this process. To farm TFT, Zero-OS needs to be on bare metal.

Also, note that ThreeFold runs its own OS, which is Zero-OS. You thus need to start with completely wiped disks. You cannot farm TFT with Windows, Linux or MAC OS installed on your disks. If you need to use such OS temporarily, boot it in Try mode with a removable media (USB key).

Note: Once you have the necessary hardware, you need to [create a farm](#1-create-a-farm), [create a Zero-OS bootstrap image](#2-create-a-zero-os-bootstrap-image), [wipe your disks](#4-wipe-all-the-disks) and [set the BIOS/UEFI](#5-set-the-biosuefi) . Then you can [boot your 3Node](#6-boot-the-3node). 

***

### 3Node Requirements Summary

***

Any computer with the following specifications can be used as a DIY 3Node.

- Any 64-bit hardware with an Intel or AMD processor chip.
- Servers, desktops and mini computers type hardware are compatible.
- A minimum of 500 GB of SSD and a bare minimum of 2 GB of RAM is required.
- A ratio of 100GB of SSD and 8GB of RAM per thread is recommended.
- A wired ethernet connection is highly recommended to maximize reliability and the ability to farm TFT.
- A [passmark](https://www.passmark.com/) of 1000 per core is recommended and will probably be a minimum requirement in the future.

*A passmark of 1000 per core is recommend and will be a minimum requirement in the future. This is not yet an official requirement. A 3Node with less than 1000 passmark per core of CPU would not be penalized if it is registered before the DAO settles the [Passmark Question](https://forum.threefold.io/t/cpu-benchmarking-for-reward-calculations/2479).

***

## Bandwidth Requirements

<!---
This section should be checked and validated with the TF Team. We can change the constant (here it's 10) if needed. Or use another equation if this one is deemed suboptimal. This equation is an attempt at a synthesis of the discussions we had on the TF Forum.
-->

***

A 3Node connects to the ThreeFold Grid and transfers information, whether it is in the form of compute, storage or network units (CU, SU, NU respectively). The more resources your 3Nodes offer to the Grid, the more bandwidth will be needed to transfer the additional information. In this section, we cover general guidelines to make sure you have enough bandwidth on the ThreeFold Grid when utilization will be happening.

Note that the TFDAO will need to discuss and settle on clearer guidelines in the near future. For now, we propose those general guidelines. Being aware of these numbers as you build and scale your ThreeFold farm will set you in the proper direction.

> **The strict minimum for one Titan is 1 mbps of bandwidth**. 

If you want to expand your ThreeFold farm, you should check the following to make sure your bandwidth will be sufficient when there will be Grid utilization.
***
**Bandwidth per 3Node Equation**
***
> min Bandwidth per 3Node (mbps) = 10 * max((Total SSD TB / 1 TB),(Total Threads / 8 Threads),(Total GB / 64 GB)) + 10 * (Total HDD TB / 2)

This equation means that for each TB of HDD you need 5 mbps of bandwidth, and for each TB of SSD, 8 Threads and 64GB of RAM (whichever is higher), you need 10 mbps of bandwidth. 

This means a proper bandwidth for a Titan would be 10 mbps. As stated, 1 mbps is the strict minimum for one Titan.

***

## Link to Share Farming Setup


If you want ideas and suggestions when it comes to building DIY 3Nodes, a good place to start is by checking what other farmers have built. [This post on the Forum](https://forum.threefold.io/t/lets-share-our-farming-setup/286) is a great start. The following section also contains great DIY 3Node ideas.

***

## List of Common DIY 3Nodes


From the data collected by the ThreeFold DIY Farming Community, we can list some common 3Node builds. Note that these builds can be used as starting inspiration to build your own unique 3Node! That's the beauty of *the TF 3Node DIY Adventure*.

Building a 3Node depends a lot on the hardware accessibility in your specific location. Do your own research and check what are the best deals when it comes to buying computers and parts where you live.

We regroup the 3Node builds in 5 main categories:

1. [Mini PC](#the-mini-pc-diy-3node)
2. [Desktop](#the-desktop-pc-diy-3node)
3. [Mini server](#the-mini-server-diy-3node)
4. [Tower Server](#the-tower-server-diy-3node)
5. [Rack Server](#the-rack-server-diy-3node)

***

### The Mini PC DIY 3Node

***

Many farmers start with a Titan plug n play and then explore the world of Mini PC DIY 3Nodes. 

***

**Lenovo M900 Tiny**


- Lenovo M900 Tiny
- Intel Core i7-6700T CPU (8 Threads)
- CPU Passmark per Core: 1817.75
- 1TB SSD
- Crucial 64GB RAM CT2K32G4SFD8266 (2x32GB) DDR4 2666 MHz CL19 Laptop Memory

A common Mini PC is the Lenovo M900 tiny. Equipped with an i7-6700T CPU (or i7-6700), this 3Node can have up to 64GB of RAM. Note that for a i7-6500 and below, the maximum is 32GB of RAM.

For this DIY 3Node, you usually need to buy the RAM and SSD separately to get the best price. Here's an [amazing TF video](https://www.youtube.com/watch?v=-AmDJYWWS5M) to get you started on this 3Node DIY journey.

***

### The Desktop PC DIY 3Node

***

**DELL OptiPlex 7020**

- DELL OptiPlex 7020
- i5-4570
- CPU Passmark per Core: 1300
- 32GB Ram
- 1x 512GB SSD

This 3Node is a great way to start your ThreeFold adventure: it requires no upgrade or any hardware tweaking. 

It has the minimum SSD requirement as well as 32GB of RAM. This SSD/RAM ratio optimizes the farming reward. In short, for around 240$, you can farm around 257 TFT per month. With the current TFT price of 8 cents, this gives you a return on investment of less than 12 months. Building the New Internet isn't that hard after all!

***

**HP EliteDesk 800 G1 Desktop**


- HP EliteDesk 800 G1 Desktop
- Intel Core i7-6700
- CPU Passmark per Core: 2019
- 32GB DDR3 RAM
- 1TB SSD Hard Drive
- Zero-OS boot mode: UEFI

This model has a nice CPU Passmark ratio and has the same basic specs as a Titan. A great advantage of this model is that you can buy it as is, wipe the disk and plug in your bootstrap image and that's it, you're farming TFT! It's thus an excellent first DIY 3Node. 

This build can be upgraded to 64GB of RAM, but it requires SODIMM RAM, which can be expenseive. DYOR.

***
### The Mini Server DIY 3Node
***

**Supermicro Pizza Box Chassis** 


- AMD 5700G - 8 Core 16 Thread CPU
- CPU Passmark per Core: 3066.875
- Asrock Rack X470 Motherboard
- 128GB RAM
- 2x 2TB Kingston NVME SSD’s
- 1x 8TB Enterprise SATA HDD

This 3Node build is very effective and has a good ratio investment/TFT rewards if you can get the parts online. This takes a little bit of DIY working as you need to assemble the parts. The CPU mark is also excellent.

***

### The Tower Server DIY 3Node

***

**HP Z800**

- HP Z800
- 2x Xeon 5650(16 Cores / 32 Threads)
- 192 GB RAM (12x 16GB DDR3 PC3L-8500R)
- CPU Passmark per Core: 960.83
- 3TB SSD (1x1TB + 1x2TB)
- Zero-OS boot mode: UEFI

***

**Dell Precision T5810**


- Dell Precision T5810
- Intel Xeon E5-2698 V3 (16 Cores / 32 Threads)
- CPU Passmark per Core: 1237.125
- 256GB SK Hynix DDR4 ECC RAM
- 4TB Crucial MX500 SSD

***

A Tower Server DIY 3Node is a good way to get major TFT rewards while also having an ergonomic and quiet 3Node. Note that the Rack Server DIY 3Node are usually louder, due to the fans spinning.

Building tower servers as DIY 3Nodes is also has a clear advantage: when GPU will be available on TF Grid, you will have ample room to add a decent GPU. This is thus future-proof in that regard.

***

### The Rack Server DIY 3Node

***

**DELL R720**

- Dell R720 refurbished (125 USD)
- 2 x Intel Xeon E5-2695 V2 (123 USD)
- CPU Passmark per Core: 1126.75
- 48 Threads
- 12 x 32GB (384GB) LR Ram ddr3 ebay (458 USD)
- 2 x 2TB ssd (360 USD)
- 1 x 1TB ssd (80 USD)
- cabels, caddies, etc: (15 USD)
- Zero-OS boot mode: BIOS

Total : 1161 USD

- 3122.5 TFT per month
- 175 Watt
- 126 kWh/month without any cultivation.

Estimated ROI: around 6 months

The prices are subjected to change depending on where you buy them. DYOR.

This 3Node build by @Valentine969 is quite amazing. You get great TFT rewards in a 2U rack server. 

Note that 2U servers are quieter than 1U. The reason is simple, 2U servers have larger fans, thus they can move more volume of air with a slower speed than would 1U fans. This is a general statement and it depends on the specific hardware.

***

**DELL R620**


- Dell R620
- 2x E5 2640 V2
- CPU Passmark per Core: 967.625
- 32 Threads
- 256 GB RAM 
- 16x16GB RAM DDR3 (256 GB)
- 2x 2TB SSD NVME with PCIe 3.0 X 4 Adaptor Card
- Zero-OS boot mode: BIOS


You can usually build the same 3Node build with a R620 as with a R720. The difference is that the R620 is a 1U server so it can generate more noise. The smaller form factor is a plus though. The HP Proliant 

***

**DELL R630**

- E5-2630 v3 - 8 core / 16 thread CPU (32 threads total)
- CPU Passmark per Core: 1298.25
- 256GB DDR4 RAM
- Inland Premium 2TB NVME
- Intel DC P4500 2TB NVME

This server has the same specs as the R620 above, but it is a newer generation of server.

***

**HP Proliant DL 580 G8**

- 4 x Intel Xeon E7-4880 V2 15 core / 30 threads (60/120 total)
- 960 GB DDR3
- CPU Passmark per Core: 3229
- 5 TB SSD (1TB Samsung 860 EVO + 4TB Samsung 870 QVO)
- 3,3 TB HDD (few SAS Samsung / HP)
- Power Consumption (Idle): 283 W

This server is an amazing 3Node with a great CPU passmark ratio. The HDD won't make much difference in terms of farming rewards, but it's alway a nice addition if you have some spare disks to add for your 3Node!

***

Those were examples of what you can do as a DIY 3Node build. The possibilities are huge. Explore and build the New Internet!

***

## Powering the 3Node
***

### Surge Protector

A surge protector is highly recommended for your farm and your 3Nodes. This ensures your 3Nodes will not overcharge if a power surge happens. Whole-house surge protectors are also an option.
***
### Power Distribution Unit (PDU)

A PDU (power distribution unit) is useful in big server settings in order to manage your wattage and keep track of your power consumption.

***
### Uninterrupted Power Supply (UPS)


A UPS (uninterrupted power supply) is great for a 3Node if your power goes on and off frequently for short periods of time. This ensures your 3Node does not need to constantly reboot. If your electricity provider is very reliable, a UPS might not be needed, as the small downtime resulting from rare power outages with not exceed the DIY downtime limit*. (95% uptime, 5% downtime = 36 hours per month.) Of course, for greater Grid utilization experience, considering adding a UPS to your ThreeFold farm can be highly beneficial.

Note: Make sure to have AC Recovery Power set properly so your 3Node goes back online if power shutdowns momentarily. UPS are generally used in data center to make sure people have enough time to do a "graceful" shutdown of the units when power goes off. In the case of 3Nodes, they do not need graceful shutdowns as Zero-OS cannot lose data while functioning. The only way to power down a 3Node is simply to turn it off directly on the machine.

***
### Generator


A generator will be needed for very large installation with or without an unsteady main power supply.

***



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

***

Once the disks are wiped, you can shutdown your 3Node and remove the Linux Bootstrap Image (USB key). Usually, there will be a message telling you when to do so.


***
## Upgrading a DIY 3Node

***

As we've seen in the [List of Common DIY 3Nodes](#list-of-common-diy-3nodes), it is sometimes necessary, and often useful, to upgrade your hardware.

**Type of upgrades possible**

- Add TBs of SSD/HDD
- Add RAM
- Change CPU
- Change BIOS battery
- Change fans

For some DIY 3Node, no upgrades are required and this constitutes a good start if you want to explore DIY building without going into too much additional steps.

For in-depth videos on how to upgrade mini-pc and rack servers, watch these great [DIY videos](https://www.youtube.com/user/floridanelson).

For a DIY picture guide on how to build a R620 3Node rack server, read [this documentation](../3node_diy_rack_server/3node_diy_rack_server.md).