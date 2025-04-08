---
title: "6. Boot the 3Node"
sidebar_position: 179
---




We explain how to boot the 3Node with the Zero-OS bootstrap image with a USB key.

One of the great features of Zero-OS is that it can be completely run within the cache of your 3Node. Indeed, the booting device that contains your farm ID will connect to the ThreeFold Grid and download everything needed to run smoothly. There are many benefits in terms of security and protection of data that comes with this.

## Booting the 3Node with Zero-OS

To boot Zero-OS, insert your Zero-OS bootstrap image USB key, power on your computer and choose the right booting sequence and parameters ([BIOS or UEFI](./5_set_bios_uefi.md)) in your BIOS/UEFI settings. Then, restart the 3Node. Zero-OS should boot automatically.

Note that you need an ethernet cable connected to your router or switch. You cannot farm on the ThreeFold Grid with Wifi.

The first time you boot a 3Node, it will be written: “This node is not registered (farmer : NameOfFarm). This is normal. The Grid will create a node ID and you will be able to see it on screen. This can take a couple of minutes.

> Note: If time passes (an hour and more) and the node does not get registered, in many cases, [wiping the disks](./4_wipe_all_disks.md) all over again and trying another reboot usually resolves this issue.

When the registration process is complete, you will see your node ID on screen.