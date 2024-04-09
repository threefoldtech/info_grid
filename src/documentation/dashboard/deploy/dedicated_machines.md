<h1> Dedicated Machines </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Quick Process](#quick-process)
- [Detailed Process](#detailed-process)
- [Billing \& Pricing](#billing--pricing)
- [Discounts](#discounts)
- [Contract Information](#contract-information)
- [GPU Support](#gpu-support)
  - [Filter and Reserve a GPU Node](#filter-and-reserve-a-gpu-node)
    - [Filter Nodes](#filter-nodes)
    - [Reserve a Node](#reserve-a-node)
  - [GPU Support Links](#gpu-support-links)

***

## Introduction

Dedicated machines are 3Nodes that can be reserved and rented entirely by one user. The user can thus reserve an entire node and use it exclusively to deploy solutions. This feature is ideal for users who want to host heavy deployments with the benefits of high reliability and cost effectiveness, as users benefit from a 50% discount when they rent a dedicated node.

The process is quick: reserve a dedicated node while enjoying a 50% discount and deploy workloads without any additional fees! Note that users will still need to pay for a public IP and network usage when applicable.

## Quick Process

It is very easy to rent a dedicated node and deploy workloads on it.

- Go to the [Dedicated Machines](https://dashboard.grid.tf/#/deploy/dedicated-nodes/) section of the Dashboard.
- Find a node that fits your requirements and click `Reserve`.
- Once the dedicated node is reserved, you can deploy workloads on the machine. 
  - Go to any deployment page (e.g. [VMs](https://dashboard.grid.tf/#/deploy/virtual-machines/), [orchestrators](https://dashboard.grid.tf/#/deploy/orchestrators/) or [applications](https://dashboard.grid.tf/#/deploy/applications/)) and select `Dedicated`  before deploying.

Note that, instead of using the `Dedicated` button, you can also click on `Manual` selection and enter the node ID of the dedicated node you reserved.

For additional details on this process, read the next section.

## Detailed Process

We provide detailed steps on the process.

- Consult the list of all dedicated nodes in the section [Dedicated Machines](https://dashboard.grid.tf/#/deploy/dedicated-nodes/) of the Dashboard.

    ![ ](../img/dedicated_machines.png)

  - Hover over the price to see the applied discounts

    ![](../img/dashboard_dedicated_nodes_discounts.png)

  - Expand row to see more info on the node:
  
    ![ ](../img/dashboard_dedicated_nodes_details.png)
    - Resources
    - Location
    - Possible Public Ips *this depends on the farm it belongs to*

  - You can see the nodes in 2 states:
    - Free
    - Reserved *Owned by current twin*
- Reserve a node:
  - If node is not rented, you can simply click `Reserve`.


- Unreserve a node:
  - To unreserve a node, click on `Unreserve`. Note that a check will be done to verify that you don't have any active workloads on the node before unreserving.


## Billing & Pricing

- Once a node is rented, there is a fixed charge billed to the tenant regardless of deployed workloads.
- Any subsequent NodeContract deployed on a node where a rentContract is active (and the same user is creating the nodeContracts) can be excluded from billing (apart from public IP and network usage).
- Billing rates are calculated hourly on the TFGrid. 
  - While some of the documentation mentions a monthly price, the chain expresses pricing per hour. The monthly price shown within the manual is offered as a convenience to users, as it provides a simple way to estimate costs.

## Discounts

By default, users renting a dedicated node gets a 50% discount for the whole node. Users can also benefit from an additional 60% staking discount by holding TFT in their TFChain wallet. Read more on staking discount [here](../../../knowledge_base/cloud/pricing/staking_discount_levels.md). 

The staking discount is calculated every time the grid bills by checking the available TFT balance on the user's wallet and seeing if it is sufficient to receive a discount. As a result, if the user balance drops below the treshold of a given staking discount, the deployment price increases. 

> Note: The amount of TFT in the user's wallet does not affect the 50% discount from renting a dedicated node.

## Contract Information

- Node reserved with deploying a `RentContract` on this node. A node can have only one `RentContract`.
- When a user create a `RentContract` against a node, the grid validate that there are no other active contracts on that node on the creation.
- Once a `RentContract` is created, the grid can only accept contracts on this node from the tenant.
- Only workloads from the tenant are accepted.

## GPU Support

To use a GPU on the TFGrid, users need to rent a dedicated node. Once they have rented a dedicated node equipped with a GPU, users can deploy workloads on their dedicated GPU node.

### Filter and Reserve a GPU Node

You can filter and reserve a GPU node using the [Dedicated Machines](https://dashboard.grid.tf/#/deploy/dedicated-nodes/) section of the Dashboard.

#### Filter Nodes

- Filter nodes using the vendor name
  - In **Filters**, select **GPU's vendor name**
    - Write the name of the vendor desired (e.g. **nvidia**, **amd**)
- Filter nodes using the device name
  - In **Filters**, select **GPU's device name**
    - Write the name of the device desired (e.g. **GT218**)

#### Reserve a Node

When you have decided which node to reserve, click on **Reserve** under the column named **Actions**. Once you've rented a dedicated node that has a GPU, you can deploy GPU workloads.

### GPU Support Links

The ThreeFold Manual covers many ways to use a GPU node on the TFGrid. Read [this section](../../system_administrators/gpu/gpu_toc.md) to learn more.