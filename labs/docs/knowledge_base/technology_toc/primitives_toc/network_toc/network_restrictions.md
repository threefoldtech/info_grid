---
title: "Network Restrictions"
sidebar_position: 356
---

# Network Restrictions

## Overview

The ThreeFold Grid implements specific network restrictions based on the type of VM deployment to ensure network security and prevent abuse. These restrictions primarily affect email-related ports to prevent spam and maintain the integrity of the network.

## Port Access by VM Type

### VMs without IPv4

VMs deployed without a public IPv4 address have the following restrictions:

- **Restricted ports**: 25, 465, 587
- **Affected services**: SMTP (Simple Mail Transfer Protocol) services
- **Reason**: Email-related ports are blocked to prevent spam and abuse
- **Use case**: Standard deployments where email services are not required

### VMs with IPv4

VMs deployed with a public IPv4 address have:

- **Port restrictions**: None
- **Full access**: All ports are available for use
- **Use case**: Deployments requiring email services or unrestricted network access

## Technical Implementation

The network restrictions are implemented at the Zero-OS level using netfilter/iptables rules. The implementation can be found in the ZOS codebase:

- **Reference**: [ZOS Network Implementation](https://github.com/threefoldtech/zos/blob/0199ee83ff9918918f18fd25fd7ba1cdc1c7abce/cmds/modules/networkd/nft.go#L53)

## Planning Your Deployment

When planning your deployment, consider the following:

- If you need to run email services (SMTP servers, mail relays), ensure you deploy with IPv4
- For most web applications and services, VMs without IPv4 are sufficient and more cost-effective
- The restrictions only apply to outbound connections on the specified ports