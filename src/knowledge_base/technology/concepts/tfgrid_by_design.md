<h1>TFGrid by Design: Deployment Architectures and Solution Categories</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
  - [TFGrid by Design](#tfgrid-by-design)
  - [Capacity and Connectivity](#capacity-and-connectivity)
- [TFGrid Main Components Overview and Examples](#tfgrid-main-components-overview-and-examples)
  - [Storage Units](#storage-units)
    - [0-DB-FS](#0-db-fs)
    - [0-stor\_v2](#0-stor_v2)
    - [QSFS](#qsfs)
  - [Compute Units](#compute-units)
    - [Virtual CPUs (vCPUs)](#virtual-cpus-vcpus)
    - [Kubernetes](#kubernetes)
    - [TF Grid-SDK-Go and TF Grid-SDK-TS](#tf-grid-sdk-go-and-tf-grid-sdk-ts)
  - [Network Units](#network-units)
    - [Reliable Message Bus Relay (RMB-RS)](#reliable-message-bus-relay-rmb-rs)
    - [TCP-Router](#tcp-router)
- [Solution Categories](#solution-categories)
  - [DIY Workloads](#diy-workloads)
  - [Independent Commercial Offerings](#independent-commercial-offerings)
  - [ThreeFold Commercial Offerings](#threefold-commercial-offerings)
- [Best Practices](#best-practices)
- [Questions and Feedback](#questions-and-feedback)

***

# Introduction

Before starting a project on the TFGrid, it can be good idea to consider the overall design of the grid itself, and to ponder the potential solution designs you can come up with to ensure reliable and resilient deployments. This text will explore some of the main components of the TFGrid as well as its inherent design in order to provide sufficient information for system administrators to deploy effective and reliable solutions. We will also cover the three main solution categories that can be built on top of the TFGrid.

## TFGrid by Design

At its core, the TFGrid is composed of thousands of 3Nodes. 3Nodes provide storage, compute and network units to the TFGrid. By design, 3Nodes are not reliable in themselves, in the sense that a 3Node online today could be offline tomorrow if hardware or connection failures arise. This reality is inherent to any cloud enterprises. But this does not mean that reliability is not possible on the TFGrid. To the contrary, the TFGrid is composed of different components that can be utilized to provide reliability in all aspects of the grid: storage, compute and network. It is the role of system administrators to develop solutions that will be reliable in themselves.

A myriad of possibilities and configurations are possible within the TFGrid ecosystem and, by understanding the interconnectedness between the grid components, one can knowingly build a solid deployment that will respond to the needs of a given project.

## Capacity and Connectivity

When it comes to deployments, we must consider two major aspects of the Internet infrastructure: capacity and connectivity. While capacity can be thought as the individual 3Nodes composing the TFGrid, where information is processed and stored within the 3Nodes, connectivity can be thought as the links and information transfers between the 3Nodes and the public Internet.

As a general consideration, the TFGrid works mostly on the capacity side, whereas a 3Node will always be connected to the Internet by ways of different Internet Service Providers (ISP) depending on the farmer's location and resources. The 3Nodes provide storage and compute units where users can store information on SSD and HDD disks and where they can generate compute processes with CPUs. Another major component of the TFGrid would be network units. While, as said before, the TFGrid does not provide directly connectivity as per the traditional ISP services, elements such as gateways and Wireguard VPNs are further related to network units than compute or storage units. 

To build a reliable deployment on the TFGrid, you need to take into consideration the three different types of unit on the TFGrid: storage, compute and network. Let's delve into these a little bit more.

# TFGrid Main Components Overview and Examples

We provide here an overview of some of the main components of the TFGrid. We also provide examples for each of those components in order for the reader to obtain a clear understanding of the TF Ecosystem. By understanding the different components of the TFGrid, system administrators will be able to deploy resilient, redundant and reliable solutions on the grid. 

For a complete list of the TFGrid components, read [this documentation](./grid3_components.md).

## Storage Units

Storage units are related to the data stored in SSD and HDD disks. The Quantum Safe Filesystem (QSFS) technology developed by ThreeFold ensures redundancy and resilience in storage units. If one disk of the QSFS array goes offline, the rest of the system can still function properly. To the contrary, if a user stores information on one single 3Node and this 3Node has a drastic disk failure, the user will lose the data. Another way to achieve redundancy in the storage category would be to deploy a solution with real-time synced databases of two or more 3nodes connected via a wireguard VPN. Note that other configurations offering reliability and redundancy are possible.

Let's explore some storage components of the ThreeFold Grid.

### 0-DB-FS

[0-DB-FS](./grid3_components.md#0-db-fs) is storage system that allows for efficient and secure storage of files on the ThreeFold Grid. 0-DB-FS is built on top of 0-DB, which is a key-value store optimized for high performance and scalability. It provides a decentralized and distributed approach to file storage, ensuring data redundancy and availability.

### 0-stor_v2

[0-stor_v2](./grid3_components.md#0-stor_v2) is a distributed and decentralized storage solution that enables data storage and retrieval on the ThreeFold Grid. 

### QSFS

[Quantum Safe Filesystem (QSFS)](./grid3_components.md#qsfs) is ThreeFold's innovative storage solution designed to address the security challenges posed by quantum computing. QSFS employs advanced cryptographic techniques that are resistant to attacks from quantum computers, ensuring the confidentiality and integrity of stored data. By its design, QSFS also offers a high level of redundancy.

## Compute Units

Compute units are related to the CPUs doing calculations during the deployment. If a user deploys on a 3Node and uses the CPUs of the units while those CPUs experience failure, the user will lose compute power. as a main example, a way to achieve redundancy in the compute category would be to deploy a solution via Kubernetes. In this case, the CPU workload is balanced between the different 3Nodes of the Kubernetes cluster and if one 3Node fails, the deployment can still function properly.

Let's explore some compute components of the ThreeFold Grid.

### Virtual CPUs (vCPUs)

Virtual CPUs (vCPUs) are virtual representations of physical CPUs that allow multiple virtual machines (VMs) to run concurrently on a single physical server or host. Virtualization platforms allocate vCPUs to each VM, enabling them to execute tasks and run applications as if they were running on dedicated physical hardware. The number of vCPUs assigned to a VM determines its processing power and capacity to handle workloads. On the TFGrid, the number of vCPUs is limited to the physical number of CPUs on the host (i.e. the 3Node). Since this limitation is done per VM, this means that a node with 8 cores can still have 2 VMs each with 8 vCPUs.

### Kubernetes

[Kubernetes](../../../documentation/dashboard/solutions/k8s.md) is an open-source container orchestration system for automating software deployment, scaling, and management. On the TFGrid, Kubernetes clusters can be deployed out of the box. Thus, system administrators can seamlessly deploy solutions on the TFGrid that are reliable in terms of compute units.

### TF Grid-SDK-Go and TF Grid-SDK-TS

The [TFGrid-SDK-Go](./grid3_components.md#tf-grid-sdk-go) and [TFGrid-SDK-TS](./grid3_components.md#tf-grid-sdk-ts) enable developers to interact with the ThreeFold Grid infrastructure, such as provisioning and managing compute resources, accessing storage, and interacting with the blockchain-based services. They provide a standardized and convenient way to leverage the features and capabilities of the ThreeFold Grid within Go and Typescript applications.

## Network Units

Network units are related to the data transmitted over the Internet. While TFGrid does not provide direct ISP services, elements such as gateways are clearly related to the network. [Gateways](../../../documentation/system_administrators/terraform/resources/terraform_vm_gateway.md) can be used to balance network workloads. A deployment could consist of two different gateways with a master node gateway and a worker node gateway. If the master gateway would fail, the worker gateway would take the lead and become the master gateway. Deploying solutions with several gateways can help system administrators build reliable solutions.

Note that it is also possible to deploy a Wireguard virtual private network (VPN) between different 3Nodes and synchronize their databases. This provides resilience and redundancy. Read more on VPN and synced databases [here](../../../documentation/system_administrators/terraform/advanced/terraform_mariadb_synced_databases.md).

Let's explore some network components of the ThreeFold Grid.

### Reliable Message Bus Relay (RMB-RS)

[Reliable Message Bus Relay (RMB-RS)](./grid3_components.md#reliable-message-bus-relay-rmb-rs) is a component or system that facilitates the reliable and secure transfer of messages between different entities or systems within the ThreeFold ecosystem. It acts as a relay or intermediary, ensuring that messages are delivered accurately and efficiently, even in the presence of network disruptions or failures. The RMB-RS employs robust protocols and mechanisms to guarantee message reliability, integrity, and confidentiality.

### TCP-Router

[TCP-Router](./grid3_components.md#tcp-router) is a component of the ThreeFold technology stack that acts as a TCP (Transmission Control Protocol) router and load balancer. It serves as a network gateway for incoming TCP connections, routing them to the appropriate destinations based on predefined rules and configurations. The TCP-Router component is responsible for distributing incoming network traffic across multiple backend services or nodes, ensuring efficient load balancing and high availability.

# Solution Categories

There are three main solution categories on the TFGrid: DIY workloads, independent commercial offerings, and ThreeFold commercial offerings. Let's take a look at them and discuss their basic properties.

## DIY Workloads

Out-of-the-box applications are available on the [TF Dashboard](../../../documentation/dashboard/deploy/applications.md) and [Terraform](../../../documentation/system_administrators/terraform/terraform_toc.md), where anyone can [buy TFTs](../../../documentation/threefold_token/buy_sell_tft/buy_sell_tft.md) and deploy on the decentralized and open-source grid. The reliability of those deployments depend on the capacity and resources of each DIY system administrator.

In essence, when you deploy on the decentralized and open-source TFGrid, you act as a centralized entity building the solution architecture. You must design the solution in a way that it can be reliable with high-availability and resilience levels that suit the needs of your project.

Note that when you deploy on the ThreeFold Grid, you are doing so in accordance with the [ThreeFold Terms and Conditions](../../legal/terms_conditions_all3.md).

## Independent Commercial Offerings

Since the TFGrid is open-source, anyone could decide to build a commercial offering on top of the grid. In this case, it would be recommended for the commercial offering to provide Terms and Conditions, clear support, a website to advertise the product and a marketing strategy to obtain customers.

In this case, the commercial offering is the centralized entity and if the company makes a mistake, it would be liable to the users to the extent discussed in the T&C.

The ThreeFold Manual already contains a lot of resourceful information on how to [deploy applications](../../../documentation/dashboard/deploy/applications.md) on the TFGrid. We invite everyone to develop independent commercial offerings on top of the ThreeFold Grid.

## ThreeFold Commercial Offerings

ThreeFold is building commercial offerings on top of the TFGrid. Those commercial offerings are for-profit organizations. Each of those organizations would function as a centralized entity.

ThreeFold Ventures will be the branch exploring this aspect of the TF Ecosystem. A major project on the way is [ThreeFold Cloud](https://cloud.threefold.io/). ThreeFold Cloud is thus a centralized entity that will generate its own Terms and Conditions, support, marketing and website strategy. Furthermore, ThreeFold Cloud will be liable to its users to the extent developed in the ThreeFold Cloud Terms and Conditions.

# Best Practices

This text provided an introduction to some deployment architectures and solution categories possible on the TFGrid. In the future, we will expand on some of the main TFGrid best practices. Stay tuned for more on this topic.

Some of the best practices to be covered are the following:

* Use Kubernetes to deploy redundant workloads
* Use multi-gateways deployments for redundancy
  * Deploy manually two VMs
  * Use two webgateways to access the VMs
  * Choose a data replication strategy to have content on both places (e.g. syncing databases)
* Use continous deployment and integration workloads
  * Deploy on 2 different VMs
  * Ensure continuous deployment and integration when changes occur
* Use DNS with redundancy
* Use QSFS for storage resilience and redundancy

These are only a few of the many possibilities that the TFGrid offers. We invite everyone to explore the TFGrid and share their experience and learning.

# Questions and Feedback

If you have any questions or feedback, we invite you to discuss with the ThreeFold community on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) chat on Telegram.
