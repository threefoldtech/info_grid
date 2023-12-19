<h1>Cloud Console</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Port Details](#port-details)
- [Playground Setup](#playground-setup)

***

## Introduction

[Cloud console](https://github.com/threefoldtech/cloud-console) is a tool to view machine logging and interact with the machine you have deployed on the TFGrid. It is a small application intended to provide a web-based terminal for virtual machines, who make a serial device or virtio-console available over a pseudoterminal (**pty**). Although primarily intended to be used with cloud-hypervisor 1, any VM which exposes a pty (or any application which exposes a pty for that matter) should be compatible.

## Port Details

There is a simple way to know the Console port for a TFGrid deployment with WireGuard.

- Cloud console always runs on the IP address of the machine private network.
- The port number always equals to `20000 + last octet` of a machine private IP address.
  - For example, if the machine IP is `10.20.2.2/24`, with `2` as the last octet,
    - `cloud-console` is running on `10.20.2.1:20002`.

## Playground Setup

You can easily enable Cloud console on the ThreeFold Playground.

- On the Playground deployment page, enable the toggle button **Cloud console**.
  - This will automatically enable WireGuard if it isn't enabled yet.
- After deployment, set your [WireGuard connection](../getstarted/ssh_guide/ssh_wireguard.md).
- On a browser, go to the Cloud console URL.
  - For example, with the WireGuard IP 10.20.2.4, the Cloud console address would be:
    - `10.20.2.1:20004`