# Do-it-Yourself Farming Guide

Any standard computer can become a 3Node on the ThreeFold Grid. This section covers the compatible systems and setup optimization for anyone who wants to purchase or build their own nodes. 

## What kind of hardware is supported?

Any 64-bit hardware with an Intel or AMD processor chip can run Zero-OS and become a 3Node. The following configurations provide guidelines on compatible and recommended setups:

- Servers, desktops and mini computers type hardware are compatible. 
- A minimum of 500 GB of SSD and a bare minimum of 2 GB of RAM is required. 
- A ratio of 1:4 between vCPU and RAM (e.g. 8vCPU and 32 GB of RAM) is recommended.
- The recommended upper limit is 8 GB of RAM per vCPU as farming rewards do not increase beyond that ratio. 
- A minimum of 500 GB of SSD and a bare minimum of 2 GB of RAM is required. 
- A wired ethernet connection is highly recommended to maximize reliability and the ability to farm TFT. 

> Note: The team successfully tested ARM based devices, but they are not yet supported. 

The follwoing configurations are not advised or not supported:

- Laptops are not advised and USB based external drives are not supported due to reliability concerns.
- No graphics or display is required, although it may be helpful during the boot configuration or troubleshooting if necessary.
- GPU is not yet supported.

## How much power does a node consume?

Power efficiency is important for farmers to spend less on electricity and therefore increase earnings. A small form factor server may be much more power efficient than a gaming PC with similar specs (GPUs are not supported yet). 

> Note: Knowing exactly how much power a system will draw can be complicated, but some manufacturers provide more detailed estimates than the watt rating of a power supply.

## What kind of internet connection is needed?

- A wired network connection should be considered essential to maximize a node's reliability. Any domestic high speed internet plan is adequate for a basic node. 
- If the node connects more than a few terrabytes of storage, a gigabit or faster connection may be necessary to support the traffic.
- The Grid is designed with IPv6 in mind, but IPv4 is sufficient for now.

> A node only needs bandwidth when it is being utilized. That means you could scale up your connectivity as utilization of your node grows.

## How to boot a node with Zero-OS?

Zero OS can be booted either from a USB stick (the boot image is tiny, so any size drive will do) or over a network via PXE. In either case, the latest software will be downloaded and cryptographically verified before boot. After the first boot, Zero OS will update itself automatically and requires virtually no maintenance. 

When you’re ready to start farming, follow [these instructions](https://library.threefold.me/info/manual/#/manual__farming) to bring your 3Node online.

> Note: Occasionally, updates to the boot medium may be required.