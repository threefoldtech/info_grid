
<h1> Planetary Network </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Install](#install)
- [Run](#run)
  - [Linux](#linux)
  - [MacOS](#macos)
- [Test Connectivity](#test-connectivity)
- [Firewalls](#firewalls)
  - [Linux](#linux-1)
  - [MacOS](#macos-1)
- [Get Yggdrasil IP](#get-yggdrasil-ip)
- [Add Peers](#add-peers)
- [Clients](#clients)
- [Peers](#peers)
  - [Central europe](#central-europe)
    - [Ghent](#ghent)
  - [Austria](#austria)
- [Peers config for usage in every Yggdrasil - Planetary Network client](#peers-config-for-usage-in-every-yggdrasil---planetary-network-client)

***

## Introduction

In a first phase, to get started, you need to launch the planetary network by running [Yggdrasil](https://yggdrasil-network.github.io) from the command line. 

Yggdrasil is an implementation of a fully end-to-end encrypted IPv6 network. It is lightweight, self-arranging, supported on multiple platforms, and allows pretty much any IPv6-capable application to communicate securely with other nodes on the network. Yggdrasil does not require you to have IPv6 Internet connectivity - it also works over IPv4.

## Install

Yggdrasil is necessary for communication between your local machine and the nodes on the Grid that you deploy to. Binaries and packages are available for all major operating systems, or it can be built from source. Find installation instructions here.

After installation, you'll need to add at least one publicly available peer to your Yggdrasil configuration file. By default on Unix based systems, you'll find the file at `/etc/yggdrasil.conf`. To find peers, check this site, which compiles and displays the peer information available on Github.

Add peers to your configuration file like so:

```
Peers: ["PEER_URL:PORT", "PEER_URL:PORT", ...]
```

Please consult [yggdrasil installation page](https://yggdrasil-network.github.io/installation.html) for more information and clients

## Run

### Linux

On Linux with `systemd`, Yggdrasil can be started and enabled as a service, or run manually from the command line:

```
sudo yggdrasil -useconffile /etc/yggdrasil.conf
```

Get your IPv6 address with following command :

```
yggdrasilctl getSelf
```

### MacOS

The MacOS package will automatically install and start the `launchd` service. After adding peers to your config file, restart Yggdrasil by stopping the service (it will be restarted automatically):

```
sudo launchctl stop yggdrasil
```

Get your IPv6 address with following command :

```
sudo yggdrasilctl getSelf
```

## Test Connectivity

To ensure that you have successfully connected to the Yggdrasil network, try loading the site in your browser:

```
http://[319:3cf0:dd1d:47b9:20c:29ff:fe2c:39be]/
```

## Firewalls

Creating deployments on the Grid also requires that nodes can reach your machine as well. This means that a local firewall preventing inbound connections will cause deployments to fail.

### Linux

On systems using `iptables`, check:
```
sudo ip6tables -S INPUT
```

If the first line is `-P INPUT DROP`, then all inbound connections over IPv6 will be blocked. To open inbound connections, run:

```
sudo ip6tables -P INPUT ACCEPT
```

To make this persist after a reboot, run:

```
sudo ip6tables-save
```

If you'd rather close the firewall again after you're done, use:

```
sudo ip6tables -P INPUT DROP
```

### MacOS

The MacOS system firewall is disabled by default. You can check your firewall settings according to instructions here.

## Get Yggdrasil IP

Once Yggdrasil is installed, you can find your Yggdrasil IP address using this command on both Linux and Mac:

```
yggdrasil -useconffile /etc/yggdrasil.conf -address
```

You'll need this address when registering your twin on TFChain later.


## Add Peers


 - Add the needed [peers](https://publicpeers.neilalexander.dev/) in the config file generated under Peers.

  **example**:
```
        Peers:
        [
        tls://54.37.137.221:11129
        ]
```
- Restart yggdrasil by

        systemctl restart yggdrasil

## Clients

- [planetary network connector](https://github.com/threefoldtech/planetary_network)

## Peers

### Central europe

#### Ghent

- tcp://gent01.grid.tf:9943
- tcp://gent02.grid.tf:9943
- tcp://gent03.grid.tf:9943
- tcp://gent04.grid.tf:9943
- tcp://gent01.test.grid.tf:9943
- tcp://gent02.test.grid.tf:9943
- tcp://gent01.dev.grid.tf:9943
- tcp://gent02.dev.grid.tf:9943

### Austria

- tcp://gw291.vienna1.greenedgecloud.com:9943
- tcp://gw293.vienna1.greenedgecloud.com:9943
- tcp://gw294.vienna1.greenedgecloud.com:9943
- tcp://gw297.vienna1.greenedgecloud.com:9943
- tcp://gw298.vienna1.greenedgecloud.com:9943
- tcp://gw299.vienna2.greenedgecloud.com:9943
- tcp://gw300.vienna2.greenedgecloud.com:9943
- tcp://gw304.vienna2.greenedgecloud.com:9943
- tcp://gw306.vienna2.greenedgecloud.com:9943
- tcp://gw307.vienna2.greenedgecloud.com:9943
- tcp://gw309.vienna2.greenedgecloud.com:9943
- tcp://gw313.vienna2.greenedgecloud.com:9943
- tcp://gw324.salzburg1.greenedgecloud.com:9943
- tcp://gw326.salzburg1.greenedgecloud.com:9943
- tcp://gw327.salzburg1.greenedgecloud.com:9943
- tcp://gw328.salzburg1.greenedgecloud.com:9943
- tcp://gw330.salzburg1.greenedgecloud.com:9943
- tcp://gw331.salzburg1.greenedgecloud.com:9943
- tcp://gw333.salzburg1.greenedgecloud.com:9943
- tcp://gw422.vienna2.greenedgecloud.com:9943
- tcp://gw423.vienna2.greenedgecloud.com:9943
- tcp://gw424.vienna2.greenedgecloud.com:9943
- tcp://gw425.vienna2.greenedgecloud.com:9943

## Peers config for usage in every Yggdrasil - Planetary Network client

```
          Peers:
        [
    # Threefold Lochrist
    tcp://gent01.grid.tf:9943
    tcp://gent02.grid.tf:9943
    tcp://gent03.grid.tf:9943
    tcp://gent04.grid.tf:9943
    tcp://gent01.test.grid.tf:9943
    tcp://gent02.test.grid.tf:9943
    tcp://gent01.dev.grid.tf:9943
    tcp://gent02.dev.grid.tf:9943
    # GreenEdge
    tcp://gw291.vienna1.greenedgecloud.com:9943
    tcp://gw293.vienna1.greenedgecloud.com:9943
    tcp://gw294.vienna1.greenedgecloud.com:9943
    tcp://gw297.vienna1.greenedgecloud.com:9943
    tcp://gw298.vienna1.greenedgecloud.com:9943
    tcp://gw299.vienna2.greenedgecloud.com:9943
    tcp://gw300.vienna2.greenedgecloud.com:9943
    tcp://gw304.vienna2.greenedgecloud.com:9943
    tcp://gw306.vienna2.greenedgecloud.com:9943
    tcp://gw307.vienna2.greenedgecloud.com:9943
    tcp://gw309.vienna2.greenedgecloud.com:9943
    tcp://gw313.vienna2.greenedgecloud.com:9943
    tcp://gw324.salzburg1.greenedgecloud.com:9943
    tcp://gw326.salzburg1.greenedgecloud.com:9943
    tcp://gw327.salzburg1.greenedgecloud.com:9943
    tcp://gw328.salzburg1.greenedgecloud.com:9943
    tcp://gw330.salzburg1.greenedgecloud.com:9943
    tcp://gw331.salzburg1.greenedgecloud.com:9943
    tcp://gw333.salzburg1.greenedgecloud.com:9943
    tcp://gw422.vienna2.greenedgecloud.com:9943
    tcp://gw423.vienna2.greenedgecloud.com:9943
    tcp://gw424.vienna2.greenedgecloud.com:9943
    tcp://gw425.vienna2.greenedgecloud.com:9943
          ]
```

