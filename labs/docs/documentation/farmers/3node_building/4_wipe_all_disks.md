---
title: "4. Wipe All the Disks"
sidebar_position: 177
---

<h1> 4. Wipe All the Disks </h1>

## Introduction

In this section, we explain how to wipe all the disks of your 3Node.



## Main Steps

It only takes a few steps to wipe all the disks of a 3Node.

1. Create a Linux bootstrap image
2. Boot Linux in *Try Mode*
3. Wipe All the Disks

ThreeFold runs its own OS, which is Zero-OS. You thus need to start with completely wiped disks. Note that ALL disks must be wiped. Otherwise, Zero-OS won't boot.

An easy method is to download a Linux distribution and wipe the disks by running simple commands on the command-line interface.

We will show how to do this with Ubuntu 24.04. LTS. This distribution is easy to use and it is thus a good introduction to Linux, in case you haven't yet explored this great operating system.


## 1. Create a Linux Bootstrap Image

[Download the Ubuntu 24.04 ISO file](https://releases.ubuntu.com/24.04/) and burn the ISO image on a USB key. Make sure you have enough space on your USB key. You can also use other Linux Distro such as [GRML](https://grml.org/download/), if you want a lighter ISO image.

The process is the same as in section [Burning the Bootstrap Image](./2_bootstrap_image.md#balenaetcher-mac-linux-windows), but with the Linux ISO instead of the Zero-OS bootstrap image. [BalenaEtcher](https://www.balena.io/etcher/) is recommended as it formats your USB in the process, and it is available for MAC, Windows and Linux.


## 2. Boot Linux in *Try Mode*

When you boot the Linux ISO image, make sure to choose *Try Mode*. Otherwise, it will install Linux on your computer. You do not want this.

If you are using GRML, simply boot the USB key with the GRML bootstrap image, select GRML then press `q` to enter the shell mode. Once this is done, the next steps are similar to the Ubuntu method: you will use `lsblk` and `wipefs` commands to identify and wipe the disks.

## 3. Use wipefs to Wipe All the Disks

We will now use `wipefs` to remove all the data on the disks.

> Important: Make sure that you have no important data on your disks, or make sure that you have copies of your disks before proceeding. 

Once Linux is booted, open the terminal.

First, you can check the available disks by writing the command:

```
lsblk
```

The types of disk you can see are:

- `sdX`
  - SATA type
  - e.g. `sda`
  - Note: It can be an SSD disk or a USB key
- `nvmeX`
  - NVMe type
  - e.g. `nvme0n1`

### SATA Disks

To wipe one specific SATA disk at a time, use the following command by replacing `sdX`  with the specific disk (e.g. `sda`):

```
wipefs -af /dev/sdX
```

To wipe all SATA disks (except the Linux distro USB disk you are currently using to run Ubuntu in *Try Mode*), take note of the Linux distro USB disk (e.g. `sdb`) and replace `sdX` with it in the following line:

```
for i in /dev/sd*; do if [ "$i"!= "/dev/sdX"* ]; then wipefs -af $i; fi; done
```

### NVMe Disks

To wipe one specific NVMe disk at a time, use the following command by replacing `nvmeX` with the specific disk (e.g. `nvme0n1`) :

```
wipefs -af /dev/nvmeX
```

To wipe all NVMe disks, use the following line: 

```
for i in /dev/nvme*; do wipefs -af $i; done
```