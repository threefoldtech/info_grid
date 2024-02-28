<h1> Dedicated Machines </h1>

<h2> Table of Contents </h2>

- [What is a Dedicated Machine?](#what-is-a-dedicated-machine)
- [Description](#description)
- [Billing \& Pricing](#billing--pricing)
- [Discounts](#discounts)
- [Usage](#usage)
- [GPU Support](#gpu-support)
- [Filter and Reserve a GPU Node](#filter-and-reserve-a-gpu-node)
  - [Filter Nodes](#filter-nodes)
  - [Reserve a Node](#reserve-a-node)
- [GPU Support Links](#gpu-support-links)

***

## What is a Dedicated Machine?

Dedicated machines are 3Nodes that can be reserved and rented entirely by one user. The user can thus reserve an entire node and use it exclusively to deploy solutions. This feature is ideal for users who want to host heavy deployments with the benefits of high reliability and cost effectiveness.

## Description

- Node reserved with deploying a `RentContract` on this node. node can has only one rentContract.
- When a user create a RentContract against a node, the grid validate that there are no other active contracts on that node on the creation.
- Once a RentContract is created, the grid can only accept contracts on this node from the tenant.
- Only workloads from the tenant are accepted

## Billing & Pricing

- Once a node is rented, there is a fixed charge billed to the tenant regardless of deployed workloads.
- Any subsequent NodeContract deployed on a node where a rentContract is active (and the same user is creating the nodeContracts) can be excluded from billing (apart from public ip and network usage).
- Billing rates are calculated hourly on the TFGrid. 
  - While some of the documentation mentions a monthly price, the chain expresses pricing per hour. The monthly price shown within the manual is offered as a convenience to users, as it provides a simple way to estimate costs.

## Discounts

- Received Discounts for renting a node on TFGrid internet capacity
  - 50% for dedicated node (TF Pricing policies)
  - A second level discount up to 60% for balance level see [Discount Levels](../../../knowledge_base/cloud/pricing/staking_discount_levels.md)
- Discounts are calculated every time the grid bills by checking the available TFT balance on the user wallet and seeing if it is sufficient to receive a discount. As a result, if the user balance drops below the treshold of a given discount, the deployment price increases.

## Usage

- See list of all dedicated node on `Dedicated Machines` tab on the portal.

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
  - If node is not rented by another twin you can simply click reserve.


- Unreserve a node:
  - Simply as reserving but another check will be done to check you don't have any active workloads on the node before unreserving.

## GPU Support

To use a GPU on the TFGrid, users need to rent a dedicated node. Once they have rented a dedicated node equipped with a GPU, users can deploy workloads on their dedicated GPU node.

## Filter and Reserve a GPU Node

You can filter and reserve a GPU node using the [Dedicated Machines section](https://dashboard.grid.tf/#/deploy/dedicated-nodes/) of the **Dashboard**.

### Filter Nodes

- Filter nodes using the vendor name
  - In **Filters**, select **GPU's vendor name**
    - Write the name of the vendor desired (e.g. **nvidia**, **amd**)
- Filter nodes using the device name
  - In **Filters**, select **GPU's device name**
    - Write the name of the device desired (e.g. **GT218**)

### Reserve a Node

When you have decided which node to reserve, click on **Reserve** under the column named **Actions**. Once you've rented a dedicated node that has a GPU, you can deploy GPU workloads.

## GPU Support Links

The ThreeFold Manual covers many ways to use a GPU node on the TFGrid. Read [this section](../../system_administrators/gpu/gpu_toc.md) to learn more.