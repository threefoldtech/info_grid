<h1> Cloud console </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Overview](#overview)
- [Connect to Cloud Console](#connect-to-cloud-console)

---

## Introduction

Cloud console is a tool to view machine logging and interact with the machine you have deployed. We show the basics of cloud-console and how to access it via a browser during deployment.

## Overview

Cloud console always runs on the machine's private network ip and port number equla to `20000 +last octect` of machine private IP. For example if the machine ip is `10.20.2.2/24`, this means that `cloud-console` is running on `10.20.2.1:20002`.

For the cloud-console to run we need to start the cloud-hypervisor with option "--serial pty" instead of tty, this allows us to interact with the vm from another process, `cloud-console` in our case.

## Connect to Cloud Console

You can easily connect to cloud console on the TFGrid.

- Deploy a VM on the TFGrid with the WireGuard network
- Set the WireGuard configuration file
- Start the WireGuard connection:
    ```
    wg-quick up wireguard.conf
    ```
- Go to your browser with the network router IP `10.20.2.1:20002` to access cloud console.

> Note: You might need to create a user/password in the VM first before connecting to cloud-console if the image used does not have a default user.