---
title: "HDD-Only Nodes"
sidebar_position: 184
---





## Introduction

It is possible to create an HDD-only node. This means that this node doesn't have SSD disks, but only HDD disks.

The steps are almost all the same, except for the creation of the Zero-OS Bootstrap image, which needs an extra kernel argument.

The requirements and BIOS parameters differences are also covered.

## Requirements

An HDD-only node needs at least 100GB of HDD disk.

## BIOS Parameters

In the BIOS, make sure to set `AHCI` for SATA disks.

## Bootstrap Image for HDD-Only Nodes

To create an HDD-only node, the bootstrap image needs an extra kernel argument:

- Navigate to the [Zero-OS Bootstrap site](https://bootstrap.grid.tf/).
- Select `Expert mode` from the menu at the top.
- Fill in all the needed inputs (Farm ID, network, kernel and format).
  - You can keep the default kernel
- In the `Extra kernel arguments` input field, type `missing-ssd`.
- Generate and download the image.
