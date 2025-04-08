---
title: "6. Boot the 3Node"
sidebar_position: 179
---




We explain how to boot the 3Node with the Zero-OS bootstrap image with a USB key. We also include optional advanced booting methods using OPNSense and pfSense.

One of the great features of Zero-OS is that it can be completely run within the cache of your 3Node. Indeed, the booting device that contains your farm ID will connect to the ThreeFold Grid and download everything needed to run smoothly. There are many benefits in terms of security and protection of data that comes with this.

## 1. Booting the 3Node with Zero-OS

To boot Zero-OS, insert your Zero-OS bootstrap image USB key, power on your computer and choose the right booting sequence and parameters ([BIOS or UEFI](./5_set_bios_uefi.md)) in your BIOS/UEFI settings. Then, restart the 3Node. Zero-OS should boot automatically.

Note that you need an ethernet cable connected to your router or switch. You cannot farm on the ThreeFold Grid with Wifi.

The first time you boot a 3Node, it will be written: “This node is not registered (farmer : NameOfFarm). This is normal. The Grid will create a node ID and you will be able to see it on screen. This can take a couple of minutes.

If time passes (an hour and more) and the node does not get registered, in many cases, [wiping the disks](./4_wipe_all_disks.md) all over again and trying another reboot usually resolves this issue.

Once you have your node ID, you can also go on the ThreeFold Dashboard to see your 3Node and verify that your 3Node is online.

## 2. Check the 3Node Status Online

You can use the ThreeFold to verify that your V3 3Node is online. 

* [ThreeFold Main Net Dashboard](https://dashboard.grid.tf/)
* [ThreeFold Test Net Dashboard](https://dashboard.test.grid.tf/)
* [ThreeFold Dev Net Dashboard](https://dashboard.dev.grid.tf/)
* [ThreeFold QA Net Dashboard](https://dashboard.qa.grid.tf/)

## 3. Receive the Farming Rewards

The farming reward will be sent once per month at the wallet address associated with your farm ID.

That's it. You've now completed the necessary steps to build a DIY 3Node and to connect it to the Grid.