<h1>TFGrid by Design: Deployment Architectures and Categories of Solutions</h1>

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
    - [Kubernetes](#kubernetes)
    - [TF Grid-SDK-Go and TF Grid-SDK-TS](#tf-grid-sdk-go-and-tf-grid-sdk-ts)
  - [Network Units](#network-units)
    - [Reliable Message Bus Relay (RMB-RS)](#reliable-message-bus-relay-rmb-rs)
    - [TCP-Router](#tcp-router)
- [Categories of Solutions](#categories-of-solutions)
  - [DIY Workloads](#diy-workloads)
  - [Independent Commercial Offerings](#independent-commercial-offerings)
  - [ThreeFold Commercial Offerings](#threefold-commercial-offerings)

***

# Introduction

Before starting a project on the TFGrid, it can be well worth it to consider the overall design of the grid itself, and to ponder the potential solution designs you can come up with to ensure reliable and resilient deployments. This text will explore the different components of the TFGrid as well as its inherent design in order to provide suffucient information for system administrators to deploy effective and reliable solutions. We will also cover the three main categories of solutions that can be built on top of the TFGrid.

## TFGrid by Design

At its core, the TFGrid is composed of thousands of 3Nodes. 3Nodes provide storage, compute and network units to the TFGrid. By design, 3Nodes are not reliable in themselves, in the sense that a 3Node online today could be offline tomorrow if hardware or connection failures arise. This reality is inherent to any cloud enterprises. But this does not mean that reliability is not possible on the TFGrid. To the contrary, the TFGrid is composed of different components that can be utilized to provide reliability in all aspects of the grid: storage, compute and network. It is the role of the system administrator to develop solutions that will be in themselves reliable.

A myriad of possibilities and configurations are possible within the TFGrid ecosystem and by understanding the interconnected between the grid components, one can knowingly build a solid deployment that will respond to the needs of each project.

## Capacity and Connectivity

When it comes to deployments we must consider two major aspects of the internet infrastructure: capacity and connectivity. While capacity can be taught as the individual computers and servers building the grid, that we call 3Nodes, where information is processed and stored, connectivity can be taught as the links and information transfers between two computers and servers.

As a general consideration, the TFGrid works mostly on the capacity side, whereas a 3Node will always be connected to the Internet by ways of different Internet Service Providers (ISP) depending on the farmer's location and resources. The 3Nodes provide storage and compute units where users can store information on SSD and HDD disks and they can exercise compute processes by ways of the CPU running the 3Nodes. Another major component of the TFGrid would be network units. While as said before the TFGrid does not provide directly connectivity as per the traditional ISP services, elements such as gateways and wireguard VPNs are further related to network units than compute or storage units. 

To build a reliable deployment on the TFGrid, you need to take into consider the three different types of unit on the TFGrid: storage, compute and network. Let's delve into these a little bit more.

# TFGrid Main Components Overview and Examples

We provide here an overview of the main components of the TFGrid. We also provide some examples for each main components to help the reader graps a clear understanding of the TF Ecosystem. By understanding the different components of the TFGrid, the system administrators will be able to deploy resilient solutions on the TFGrid.

The TFGrid disposes of different components that can provide reliability, redundancy and resilience for storage, compute and network units. 

## Storage Units

Storage units are related to the data stored in SSD and HDD disks. The Quantum Safe Filesystem (QSFS) technology developed by ThreeFold ensures redundancy and resilience in storage units. Another way to achieve redundancy in the storage category would be to deploy a solution with real-time synced databases of two or more 3nodes connected via a wireguard VPN. 

If one disk of the QSFS array goes offline, the rest of the system can still function at 100%. To the contrary, if a user stores information on one single 3Node and this 3Node has a drastic disk failure, the user will lose the data.

### 0-DB-FS

[0-DB-FS](./grid3_components.md#0-db-fs) is storage system that allows for efficient and secure storage of files on the ThreeFold Grid. 0-db-fs is built on top of 0-db, which is a key-value store optimized for high performance and scalability. It provides a decentralized and distributed approach to file storage, ensuring data redundancy and availability.

### 0-stor_v2

[0-stor_v2](./grid3_components.md#0-stor_v2) is a distributed and decentralized storage solution that enables data storage and retrieval on the ThreeFold Grid. 

### QSFS

[Quantum Safe Filesystem (QSFS)](./grid3_components.md#qsfs) is ThreeFold's innovative storage solution designed to address the security challenges posed by quantum computing. QSFS employs advanced cryptographic techniques that are resistant to attacks from quantum computers, ensuring the confidentiality and integrity of stored data.

## Compute Units

Compute units are related to the CPUs doing calculations during the deployment. If a user deploys on a 3Node and uses the CPUs of the units while those CPUs experience failure, the user will lose the compute powers. A way to achieve redundancy in the compute category would be to deploy a solution via Kubernetes. In this case the CPU workload is balanced between the different 3Nodes of the kubernetes cluster and if one 3Node fails, the deployment can still function to 100%.

### Kubernetes

[Kubernetes](../playground/k8s.md) is an open-source container orchestration system for automating software deployment, scaling, and management. On the TF grid, Kubernetes clusters can be deployed out of the box. System administrators can seamlessly deploy solutions that are reliable in terms of compute units.

### TF Grid-SDK-Go and TF Grid-SDK-TS

The [TFGrid-SDK-Go](./grid3_components.md#tf-grid-sdk-go) and [TFGrid-SDK-TS](./grid3_components.md#tf-grid-sdk-ts) enable developers to interact with the ThreeFold Grid infrastructure, such as provisioning and managing compute resources, accessing storage, and interacting with the blockchain-based services. They provide a standardized and convenient way to leverage the features and capabilities of the ThreeFold Grid within TypeScript applications.

## Network Units

Network units are related to the data transmistted over Internet. While TFGrid does not provide direct ISP services, elements such as the gateways are drastically related to network. [Gateways](../terraform/resources/terraform_vm_gateway.md) can be used to balance network workloads. A deployment could consist of two different gateways with a master and a slave gateway. If the master gateway would fail, the slave gateway would take the lead and become master. Deploying architecture solutions with gateways in mind can help the system administrator to build reliable solutions.

It is also possible to deploy Wireguard VPN between different 3Nodes and have them sync their database. This provide resilience and redundancy by design. [Read more on VPN and synced databases here](../terraform/advanced/terraform_mariadb_synced_databases.md).

### Reliable Message Bus Relay (RMB-RS)

[Reliable Message Bus Relay (RMB-RS)](./grid3_components.md#reliable-message-bus-relay-rmb-rs) is a component or system that facilitates the reliable and secure transfer of messages between different entities or systems within the ThreeFold ecosystem. It acts as a relay or intermediary, ensuring that messages are delivered accurately and efficiently, even in the presence of network disruptions or failures. The RMB-RS employs robust protocols and mechanisms to guarantee message reliability, integrity, and confidentiality.

### TCP-Router

[TCP-Router](./grid3_components.md#tcp-router) is a component of the ThreeFold technology stack that acts as a TCP (Transmission Control Protocol) router and load balancer. It serves as a network gateway for incoming TCP connections, routing them to the appropriate destinations based on predefined rules and configurations. The TCP-Router component is responsible for distributing incoming network traffic across multiple backend services or nodes, ensuring efficient load balancing and high availability.

# Categories of Solutions

There are three main categories of solutions on the TFGrid: DIY workloads, independent and ThreeFold commercial offerings. Let's take a look at them and see their basic properties.

## DIY Workloads

Out-of-the-box weblets are available on the [TF Playground](../playground/ready_community_readme.md) and [Terraform](../terraform/terraform_readme.md), where anyone can buy TFTs and deploy on the decentralized and open-source grid. The reliability of those deployments depend on the capacity and resources of the DIY system administrator.

In essence, when you deploy on the decentralized and open source TFGrid, you are the centralized entity building the solution's architecture. You must design it to be reliable with high-availability and resilience depending on your projects' needs.

## Independent Commercial Offerings

Since the TFGrid is open-source, anyone could decide to build a commercial offering on top of the grid. In this case, the commercial offering should provide terms and conditions (T&C), clear support, a website to advertise the product and a marketing strategy to obtain clients.

In this case, the commercial offering is the centralized entity and if the company makes a mistake, it would be liable to the user to the extent described in the T&C.

## ThreeFold Commercial Offerings

ThreeFold is building commercial offerings on top of the TFGrid. Those commercial offerings would be for-profit organization that would act as centralized entities. 

TF Ventures will be the branch exploring this aspect of the TF Ecosystem. A major project is ThreeFold Cloud. This is a centralized entity that will generate its own Terms and Conditions, support, marketing and website strategy and be liable to the users to the extent described in the T&C.