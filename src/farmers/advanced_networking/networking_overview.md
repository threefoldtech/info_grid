<h1> Networking Overview </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Possible Configurations](#possible-configurations)
- [Overall Requirements](#overall-requirements)
- [Notes and Warnings](#notes-and-warnings)
  - [Management Interfaces](#management-interfaces)
  - [Data Center Cable Management](#data-center-cable-management)
  - [Static IP Uplink](#static-ip-uplink)
- [Testing the Setup](#testing-the-setup)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this section, we provide advanced networking tips for farms with public IPs and in data centers (DC). The information available in this section is a combination of documentation from ThreeFold and tips and advice from community members who experienced first-hand the creation of ThreeFold farms that make use of public IPs block in data centers, personal data centers and home farms. A special thank you to those who contributed to improving the TFGrid and its knowledge base documentation.

## Possible Configurations

For farmers who have public IPs, extra considerations are needed in setting up the network of the farm. We will go through the main considerations in this section.

First, we must acknowledge that by the open-source and design of ThreeFold farming, a farm can range from a simple [single 3Node](../3node_building/3node_building.md) setup, to a multi-rack farm hosted in a typical data center, and everything in-between, from the farmer experiencing with public IP blocks, to the entrepreneur who builds their own data center at home.

There are thus many types of farms and each will have varying configurations. The simplest way to set up a farm has been extensively discussed in the first steps of creating a farm. But what are the other more complex configurations possible? Let's go through some of those:

- Network link
  - DC provides a network link into the farmer's rack
- Router and switch
  - The farmer provider their own router and switch
  - DC provides a router and/or switch in the rack
- Gateway IP and public IP
  - Gateway IP provided is in the same range as the public IPs
  - Gateway IP is in a different range than the public IPs
- Segmenting
  - Farmer segments the OOB ("Zos"/private) interfaces and the public interfaces into 
    - separate VLANs, OR;
    - uses separate switches altogether
  - No segmenting is actually necessary, farmer connects all interfaces to one switch

## Overall Requirements

There are overall requirements for any 3Node farm using IP address blocks in a data centere or at home:

- There must be at least one interface that provide DHCP to each node
- Public IPs must be routable from at least one interface

Note that redundancy can help in avoiding single point of failure [(SPOF)](https://en.wikipedia.org/wiki/Single_point_of_failure).

## Notes and Warnings

### Management Interfaces

You should make sure to never expose management interfaces to the public internet.


### Data Center Cable Management

It's important to have a good cable management, especially if you are in a data center. Proper cable management will improve the cooling streams of your farm. There shouldn't be any cable in front of the fans. This way, your servers will last longer. If you want to patch a rack, you have to have all lenght of patch cables from 30cm to 3m. Also, try to keep the cables as short as possible. Arrange the cables in bundles of eight and lead them to the sides of the rack as much as possible for optimal airflow.

<!--

## Configuring Node Interfaces
Add info on this:

There's a program floating around that allows farmers to configure the interfaces on their nodes. This is done over RMB, and I also developed a script for this purpose. Both might be deprecated with the 3.9 release and new RMB. There should be a documented way of doing this that's relatively accessible.

-->

<!--

### NIC

 QUESTION: Does it matter which NICs are used? -->

### Static IP Uplink

If your DC uplink is established by simple static IP (which is the case in most DCs), there is a simple setup possible. Note that if you have to use PPPoE or pptp/L2TP (like a consumer internet connection at most homes), this would not work. 

If your WAN is established by static IP, you can simply attach the WAN uplink provided by the DC to one of the switches (and not to the WAN-side of your own router). Then, the WAN-side of the router needs to be attached to the switch too. By doing so, your nodes will be able to connect directly to the DC gateway, in the same way that the router is connecting its WAN-side to the gateway, without the public IP traffic being routed/bridged through the router (bypassing). 

With a network configured like this, it is absolutely not important on which ports you connect which NIC of your nodes. You can just randomly plug them anywhere. But there is one restriction: the DC uplink must use a static IP. Dynamic IP would also not work because you would then have two DHCP servers in the same physical network (the one from the DC and your own router).

## Testing the Setup

Manual and automatic validation of the network of a farm are possible. More information on automatic validation will be added in the future.

You can test the network of your farm manually by deploying a workload on your 3Nodes with either a gateway or a public IP reserved.

## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Farmer Chat](https://t.me/threefoldfarmers) on Telegram.