<h1> ZMachine </h1>

<h2>Table of Contents </h2>

- [Introduction](#introduction)
- [Features](#features)
- [Architecture](#architecture)

***

## Introduction

ZMachine is a unified container/virtual machine type. This can be used to start a virtual machine on a zos node.

## Features

*   import from docker (market std for containers)
*   can be easily deployed at the edge (edge cloud)
*   single-tenant, fully decentralized!
*   can deploy unlimited amounts of storage using our qsfs.
*   [ZOS Protect](../../zos/benefits/zos_advantages.md#zero-os-protect): no hacking surface to the Zero-Nodes, integrate silicon route of trust
*   [ZOS Filesystem](../storage/qsfs.md): dedupe, zero-install, hacker-proof
*   [WebGateway](../network/webgw3.md:) intelligent connection between web (internet) and container services
*   integration with [ZNet](../network/znet.md) (efficient, secure encrypted network between the zmachines)

## Architecture

![](img/zmachine_zos_.jpg)

A ZMachine is running as a virtual machine on top of Zero-OS.
