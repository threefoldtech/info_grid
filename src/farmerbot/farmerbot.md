<h1>Farmerbot: Basic Guide for QA Net</h1>

<div class="youtubeVideoWrapper">
<iframe title="Farmerbot" width="560" height="315" src="https://peertube.hostservice.nl/videos/embed/bef2b1f9-8fc9-44a9-b40a-91ab6f3b6681" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [How to Prepare Your Farm for the Farmerbot with WOL](#how-to-prepare-your-farm-for-the-farmerbot-with-wol)
  - [WOL Requirements](#wol-requirements)
    - [Enabling WOL in the BIOS](#enabling-wol-in-the-bios)
    - [ZOS Nodes and NIC](#zos-nodes-and-nic)
    - [NIC Firmware and WOL](#nic-firmware-and-wol)
- [How to Move Your Farm to a Different Network](#how-to-move-your-farm-to-a-different-network)
- [How to Set the Farmerbot](#how-to-set-the-farmerbot)
  - [Requirements](#requirements)
  - [Configuration](#configuration)
    - [Node Configuration](#node-configuration)
    - [Farm Configuration](#farm-configuration)
    - [Power Configuration](#power-configuration)
    - [Example of a Configuration File](#example-of-a-configuration-file)
  - [Running the Farmerbot](#running-the-farmerbot)
    - [QA Net](#qa-net)
    - [Test Net](#test-net)
    - [Running the Farmerbot](#running-the-farmerbot-1)
- [Feedback and Questions](#feedback-and-questions)

***

# Introduction

Welcome to the farmerbot. The farmerbot is a service that a farmer can run in order to automatically manage the nodes in his or her farm. 

The key feature of the farmerbot is powermanagement. The farmerbot will automatically shutdown nodes from its farm whenever possible and bring them back on using Wake-on-Lan (WOL) when they are needed. It will try to maximize downtime as much as possible by recommending which nodes to use, this is one of the requests that the farmerbot can handle. All this behavior is customizable through markup definition files. 

There are 3 main steps to run the Farmerbot on your 3node Threefold farm.

* Prepare Your Farm for the Farmerbot with WOL
* Move Your Farm to Test Net (or QA Net)
* Set the Farmerbot

The farmerbot is currently available for Test Net and QA Net.

Note that QA Net is a testing environment and farmers do not receive farming rewards (TFT) when deploying on this network. To farm TFT, you would need to have your farm and the farmerbot on the Test Net.

***
# How to Prepare Your Farm for the Farmerbot with WOL

ZOS can utilize 2 NIC's (Network Interface Card) of a node (server, workstation, desktop, ..). The first NIC on the motherboard will always be what we call the ZOS/dmz NIC, the second one is used for public config's (Gateway, public IP's for workloads, ..). So if you don't have public IP's in your farm, only the first NIC of your ZOS node will be used. This subnet is where the farmerbot operates. If you do have public IP's the same applies.

Wake On LAN (WOL) is used to be able to boot (start) a ZOS node remotely that was shut down by the farmerbot. It works by sending what is called a 'magic packet' to the NIC MAC address of a ZOS node. If that NIC is setup correctly, aka 'listening' for the packet, the node will start up, post and boot ZOS. The farmerbot will keep a list of MAC addresses for nodes under it's management, so it knows where to send the packet if it's required.
***
## WOL Requirements

WOL comes with a few requirements. We list them in the sections that follow.

### Enabling WOL in the BIOS

Enable WOL in the BIOS of your ZOS node.

A ZOS node must be capable of doing WOL. Have a look at your node hardware / BIOS manual. If so make sure to enable it in the BIOS! A bit of research will quickly tell you how to enable for your hardware. Some older motherboards do not support this, sometimes you can be lucky it does after a BIOS upgrade, but that is brand/model specific.

Some examples:

![farmerbot_bios_1|517x291](img/farmerbot_bios_1.jpeg) 

![farmerbot_bios_2|499x375](img/farmerbot_bios_2.jpeg) 

### ZOS Nodes and NIC

All your ZOS nodes and their first NIC (ZOS/dmz) should be in the same network subnet (also called network segment or broadcast domain).

This requires some basic network knowledge. WOL packets can not be send across different subnets by default, it can but this requires specific configuration on the firewall that connects the two subnets. Though cross-subnet WOL is currently not supported by the farmerbot.

A 'magic' WOL packet is sent only on networking layer 2 (L2 or the 'data link layer') based on MAC address. So not on L3 based on ip address. This is why all nodes that should be brought up via WOL, need to be in the same subnet.

You can check if this is the case like this: if for example one node has the ip 192.168.0.20/24, then all other nodes should have an ip between 192.168.0.1 and 192.168.0.254. You can calculate subnet ranges easely here: https://www.tunnelsup.com/subnet-calculator/

So for the 192.168.0.0/24 example, you can see the range under 'Usable Host Range':

![farmerbot_bios_3|499x500](img/farmerbot_bios_3.png) 

### NIC Firmware and WOL

Some NIC's require WOL to be set on the NIC firmware.

This is fully handled by ZOS. Every time ZOS boots it will enable WOL on links if they require it. So if a ZOS node then is added to a farmerbot, it will have WOL enabled on its NIC when it's turned off (by the farmerbot).

Your farmerbot can be run on any system, including on a node. It doesn't have to be on the same network subnet as the nodes from the farm. The nodes of the farm on the other hand have to be in the same LAN. Don't hesitate to ask your technical questions here, we and the community will help you set things up!

***

# How to Move Your Farm to a Different Network

If you are on Main Net and you want to try the farmerbot, you should move your farm to either Test Net or QA Net.

To move your farm to a different network, you need to create a new bootstrap image for the new network instead of your current network. You should also wipe your 3nodes' disks before moving to a different network.

To download the Zero-OS bootstrap image, go to the usual bootstrap link [https://v3.bootstrap.grid.tf/](https://v3.bootstrap.grid.tf/) and select the network you want.

Note that the farmerbot is currently available on QA Net and Test Net.

![test_net|690x422](img/farmerbot_5.png) 

Once you have your new bootstrap image for the new network, [wipe your disks](https://manual.grid.tf/TF_Farmer_Guide/TF_Complete_Farmer_Guide/farmer_guide.html#4-wipe-all-the-disks), insert the new bootstrap image and reboot the 3node.

***
# How to Set the Farmerbot

The sections on this page will guide you through the requirements, the required configuration and the steps to run the farmerbot.
***
## Requirements
The farmerbot is shipped inside a docker image so that it is easy to run in a docker environment. Thus, the one and only requirement to run the farmerbot is docker so please [install docker](https://docs.docker.com/engine/install/) on your vm or system. Next, you'll have to copy the [docker-compose file](https://raw.githubusercontent.com/threefoldtech/farmerbot/development/docker-compose.yaml) that will start the farmerbot for you when executing the command specified in section [Running the farmerbot](#running-the-farmerbot).
***
## Configuration
Some configuration is required before running the farmerbot which should happen in a markdown file (*farmerbot.md* for example). This file should be located inside a folder called *config* in the directory of the docker-compose file. The possible configuration will be discussed in this section.

### Node Configuration
The farmerbot can only manage the nodes that you define in the configuration. So, for each node in your farm, fill in these required attributes:
- id: the id of the node
- twinid: the twin id of the node

Next to the required attributes you can provide the following attributes:
- never_shutdown: a value telling the farmerbot whether or not the node should never be shutdown
- cpuoverprovision: a value between 1 and 4 defining how much the cpu can be overprovisioned (2 means the farmerbot will allocate 2 deployments to one cpu)
- public_config: a value telling the farmerbot whether or not the node has a public config
- dedicated: a value telling the farmerbot whether or not the node is dedicated (only allow renting the full node)
- certified: a value telling the farmerbot whether or not the node is certified

The snippet below shows you an example of a node definition in the markdown config file:
```
!!farmerbot.nodemanager.define
    id:20
    twinid:105
    public_config:true
    dedicated:1
    certified:yes
    cpuoverprovision:1
```

### Farm Configuration
Two more settings are required regarding the farm:
- id: the id of the farm
- public_ips: the amount of public ips that the farm has

Here is an example of the farm definition in the markdown config file:
```
!!farmerbot.farmmanager.define
    id:3
    public_ips:2
```

### Power Configuration
Finally, you can add some configuration that will the behavior of the farmerbot regarding the powermanagement of the nodes. The following attributes can be added to the markdown config file:
- wake_up_threshold: a value between 50 and 80 defining the threshold at which nodes will be powered on or off. If the usage percentage (total used resources devided by the total amount of resources) is greater then this threshold a new node will be powered on. In the other case the farmerbot will try to power off nodes if possible.
- periodic_wakeup: nodes have to be woken up once a day, this variable defines the time at which this should happen. The offline nodes will be powered on sequentially with an interval of 5 minutes starting at the time defined by this variable.

An example of the power definition in the markdown config file:
```
!!farmerbot.powermanager.define
    wake_up_threshold:75
    periodic_wakeup:8:30AM
```

### Example of a Configuration File
Below you will find an example of a markdown config file for a farm with 3 nodes and 2 public ips. The first node has a public config, is dedicated, is certified and has a cpu overprovisioning of 2. The wake up threshold is set to 75% and the periodic wakeup will happen at 8:30AM.
```
My nodes
!!farmerbot.nodemanager.define
    id:20
    twinid:105
    public_config:true
    dedicated:1
    certified:yes
    cpuoverprovision:2

!!farmerbot.nodemanager.define
    id:21
    twinid:106

!!farmerbot.nodemanager.define
    id:22
    twinid:107

Farm configuration
!!farmerbot.farmmanager.define
    id:3
    public_ips:2

Power configuration
!!farmerbot.powermanager.define
    wake_up_threshold:75
    periodic_wakeup:8:30AM
```
***
## Running the Farmerbot
Once the configuration is done you should create a *.env* file (next to the docker-compose file) with the content below. Make sure to change the fields to what is required: you should fill in the mnemonic of your farm, choose the appropriate network and modify the relay and substrate values if need be. 

We give examples for both QA Net and Test Net.

### QA Net

For QA Net you should modify the NETWORK to qa, the RELAY to wss://relay.qa.grid.tf:443 and SUBSTRATE to wss://tfchain.qa.grid.tf:443:
```
MNEMONIC="THE_MNEMONIC_OF_YOUR_FARM"
NETWORK=qa
RELAY=wss://relay.qa.grid.tf:443
SUBSTRATE=wss://tfchain.qa.grid.tf:443
```

### Test Net

For Test Net you should modify the NETWORK to test, the RELAY to wss://relay.test.grid.tf:443 and SUBSTRATE to wss://tfchain.test.grid.tf:443:
```
MNEMONIC="THE_MNEMONIC_OF_YOUR_FARM"
NETWORK=test
RELAY=wss://relay.test.grid.tf:443
SUBSTRATE=wss://tfchain.test.grid.tf:443
```

### Running the Farmerbot

Now to run the the farmerbot, write the following commands:
```
wget https://raw.githubusercontent.com/threefoldtech/farmerbot/development/docker-compose.yaml

docker compose up -d
```

If the farmerbot is already running and you want to run the new version of the farmerbot, write the following commands instead (for more info, click [here](https://forum.threefold.io/t/farmerbot-basic-guide-for-qa-net/3845/14)):

```
wget https://raw.githubusercontent.com/threefoldtech/farmerbot/development/docker-compose.yaml

docker compose rm -f -s

mv config/farmerbot.log config/farmerbot.log.archiverc12

docker compose up -d
```

The farmerbot should be running after a couple of seconds. It will create a log file inside your config folder called *farmerbot.log*. If you wish to restart a running farmerbot you can run the command shown below. It can take a couple of seconds before the farmerbot is completely shutdown. But before doing that it might be good to copy or delete the old log file.
```
docker compose restart
```

If the docker-compose file has changed and you wish to run the new version you will have to copy the new docker-compose file, stop the running farmerbot and start the new farmerbot. Or just run the command (copy or delete the log file first):
```
docker compose rm -f -s && docker compose up -d
```
This again will take a couple of seconds.

***

# Feedback and Questions

If you have any questions, please let us know.

You can ask questions on this [Threefold Forum post](https://forum.threefold.io/t/farmerbot-basic-guide-for-qa-net/3845).