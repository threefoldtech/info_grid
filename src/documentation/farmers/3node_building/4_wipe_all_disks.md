<h1> 4. Wipe All the Disks </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Main Steps](#main-steps)
- [1. Create a Linux Bootstrap Image](#1-create-a-linux-bootstrap-image)
- [2. Boot Linux in *Try Mode*](#2-boot-linux-in-try-mode)
- [3. Use wipefs to Wipe All the Disks](#3-use-wipefs-to-wipe-all-the-disks)
- [Troubleshooting](#troubleshooting)

***

## Introduction

In this section of the ThreeFold Farmers book, we explain how to wipe all the disks of your 3Node.



## Main Steps

It only takes a few steps to wipe all the disks of a 3Node.

1. Create a Linux Bootstrap Image
2. Boot Linux in *Try Mode*
3. Wipe All the Disks

ThreeFold runs its own OS, which is Zero-OS. You thus need to start with completely wiped disks. Note that ALL disks must be wiped. Otherwise, Zero-OS won't boot.

An easy method is to simply download a Linux distribution and wipe the disk with the proper command line in the Terminal.

We will show how to do this with Ubuntu 20.04. LTS. This distribution is easy to use and it is thus a good introduction for Linux, in case you haven't yet explored this great operating system.



## 1. Create a Linux Bootstrap Image

Download the Ubuntu 20.04 ISO file [here](https://releases.ubuntu.com/20.04/) and burn the ISO image on a USB key. Make sure you have enough space on your USB key. You can also use other Linux Distro such as [GRML](https://grml.org/download/), if you want a lighter ISO image.

The process here is the same as in section [Burning the Bootstrap Image](./2_bootstrap_image.md#burn-the-zero-os-bootstrap-image), but with the Linux ISO instead of the Zero-OS ISO. [BalenaEtcher](https://www.balena.io/etcher/) is recommended as it formats your USB in the process, and it is available for MAC, Windows and Linux.



## 2. Boot Linux in *Try Mode*

When you boot the Linux ISO image, make sure to choose *Try Mode*. Otherwise, it will install Linux on your computer. You do not want this.



## 3. Use wipefs to Wipe All the Disks

When you use wipefs, you are removing all the data on your disk. Make sure you have no important data on your disks, or make sure you have copies of your disks before doing this operation, if needed. 

Once Linux is booted, go into the terminal and write the following command lines.

First, you can check the available disks by writing in a terminal or in a shell:

```
lsblk
```

To see what disks are connected, write this command:

```
fdisk -l
```

If you want to wipe one specific disk, here we use *sda* as an example, write this command:

```
sudo wipefs -a /dev/sda
```

And replace the "a" in sda by the letter of your disk, as shown when you did *lsblk*. The term *sudo* gives you the correct permission to do this. 

To wipe all the disks in your 3Node, write the command:

```
sudo for i in /dev/sd*; do wipefs -a $i; done
```

If you have any `fdisk` entries that look like `/dev/nvme`, you'll need to adjust the command line.

For a nvme disk, here we use *nvme0* as an example, write:

```
sudo wipefs -a /dev/nvme0
```

And replace the "0" in nvme0 by the number corresponding to your disk, as shown when you did *lsblk*. 

To wipe all the nvme disks, write this command line:

```
sudo for i in /dev/nvme*; do wipefs -a $i; done
```

## Troubleshooting

If you're having issues wiping the disks, you might need to use **--force** or **-f** with wipefs (e.g. **sudo wipefs -af /dev/sda**).

If you're having trouble getting your disks recognized by Zero-OS, some farmers have had success enabling AHCI mode for SATA in their BIOS.

If you are using a server with onboard storage, you might need to [re-flash the RAID card](../../faq/faq.md#is-there-a-way-to-bypass-raid-in-order-for-zero-os-to-have-bare-metals-on-the-system-no-raid-controller-in-between-storage-and-the-grid).


