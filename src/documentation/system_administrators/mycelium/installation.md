
<h1>Installation</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Full VM Example](#full-vm-example)

***

## Introduction

In this section, we cover how to install Mycelium. For this guide, we will show the steps on a full VM running on the TFGrid.

Currently, Linux, macOS and Windows are supported. On Windows, you must have `wintun.dll` in the same directory you are executing the binary from.

## Full VM Example

- Deploy a Full VM with Planetary network and SSH into the VM
- Update the system
    ```
    apt update
    ```
- Download the latest Mycelium release: [https://github.com/threefoldtech/mycelium/releases/latest](https://github.com/threefoldtech/mycelium/releases/latest)
    ``` 
    wget https://github.com/threefoldtech/mycelium/releases/download/v0.4.0/mycelium-x86_64-unknown-linux-musl.tar.gz
    ```
- Extract Mycelium
    ``` 
    tar -xvf mycelium-x86_64-unknown-linux-musl.tar.gz
    ```
- Move Mycelium to your path
    ``` 
    mv mycelium /usr/local/bin
    ```
- Start Mycelium
    ``` 
    mycelium --peers tcp://83.231.240.31:9651 quic://185.206.122.71:9651 --tun-name utun2
    ```
- Open another terminal
- Check the Mycelium connection information (address: ...)
    ``` 
    mycelium inspect --json
    ```
- Ping the VM from another machine with IPv6
    ``` 
    ping6 mycelium_address
    ```