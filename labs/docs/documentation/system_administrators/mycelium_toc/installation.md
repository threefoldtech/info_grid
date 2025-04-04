---
title: "Installation"
sidebar_position: 220
---






## Introduction

In this section, we cover how to install Mycelium. This guide can be done on a local machine and also on a full VM running on the TFGrid. 

Currently, Linux, macOS and Windows are supported. On Windows, you must have `wintun.dll` in the same directory you are executing the binary from.

## Considerations

You might need to run Mycelium as root, enable IPv6 at the OS level and disconnect your VPN.

Read the [Troubleshooting](./information.md#troubleshooting) section for more information.

## Set Mycelium

We show how to set up Mycelium.

- Update the system
    ```
    apt update
    ```
- Download the latest Mycelium release: [https://github.com/threefoldtech/mycelium/releases/latest](https://github.com/threefoldtech/mycelium/releases/latest)
  - E.g. for Linux 64-bit x86 processor, download the latest release of the file `mycelium-x86_64-unknown-linux-musl.tar.gz`
- Extract Mycelium
    ``` 
    tar -xvf mycelium-x86_64-unknown-linux-musl.tar.gz
    ```
- Move Mycelium to your path
    ``` 
    mv mycelium /usr/local/bin
    ```

## Start Mycelium

You can start Mycelium 

- Start Mycelium
    ``` 
    mycelium --peers tcp://188.40.132.242:9651 quic://185.69.166.8:9651 --tun-name utun9
    ```
- Open another terminal
- Check the Mycelium connection information (address and public key)
    ``` 
    mycelium inspect --json
    ```

## Use Mycelium

Once you've set Mycelium, you can use it to ping other addresses and also to connect into VMs running on the TFGrid.

- Ping the VM from another machine with IPv6
    ``` 
    ping6 mycelium_address
    ```
- SSH into a VM running on the TFGrid
    ```
    ssh root@vm_mycelium_address
    ```

## Mycelium Service (optional)

You can create a systemd service to make sure Mycelium is always enabled and running.

- Create a Mycelium service
    ```bash
    nano /etc/systemd/system/mycelium.service
    ```
- Set the service and save the file
    ```
    [Unit]
    Description=End-2-end encrypted IPv6 overlay network
    Wants=network.target
    After=network.target
    Documentation=https://github.com/threefoldtech/mycelium

    [Service]
    ProtectHome=true
    ProtectSystem=true
    SyslogIdentifier=mycelium
    CapabilityBoundingSet=CAP_NET_ADMIN
    StateDirectory=mycelium
    StateDirectoryMode=0700
    ExecStartPre=+-/sbin/modprobe tun
    ExecStart=/usr/local/bin/mycelium --tun-name mycelium -k %S/mycelium/key.bin --peers tcp://146.185.93.83:9651 quic://185.69.166.8:9651 quic://185.206.122.71:9651 tcp://[2a04:f340:c0:71:28cc:b2ff:fe63:dd1c]:9651 tcp://[2001:728:1000:402:78d3:cdff:fe63:e07e]:9651 quic://[2a10:b600:1:0:ec4:7aff:fe30:8235]:9651
    Restart=always
    RestartSec=5
    TimeoutStopSec=5

    [Install]
    WantedBy=multi-user.target  
    ```
- Enable the service
    ```
    systemctl daemon-reload
    systemctl enable mycelium
    systemctl start mycelium
    ```
- Verify that the Mycelium service is properly running
    ```
    systemctl status mycelium
    ```

Systemd will start up the Mycelium, restart it if it ever crashes, and start it up automatically after any reboots.