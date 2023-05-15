# How it Works

Let's delve into the mechanics of the ThreeFold Grid and gain a clearer understanding of its operations.

## The ThreeFold Grid: A Global, Sustainable Network

The ThreeFold Grid is a remarkable network consisting of autonomous storage and compute Internet capacity. It has been created by dedicated individuals known as ThreeFold Farmers, who have contributed over 80,000,000 GB of storage and 20,000 cores to the grid. This massive capacity is globally available, neutral, and sustainable.

To ensure easy discovery by purchasers, the IT capacity within the ThreeFold Grid is indexed and registered on the TFChain. This platform serves as a comprehensive directory, simplifying the process of finding and accessing the desired resources. The ThreeFold Grid supports any application that can run on Linux, guaranteeing compatibility and flexibility. Moreover, it offers additional benefits, including enhanced privacy, security, proximity to end-users, and a significantly lower cost compared to traditional alternatives.

### Local Production and Allocation of Internet Capacity

In a similar manner to purchasing electricity or other utilities, the internet capacity provided by the ThreeFold Grid is produced and allocated locally. This decentralized approach empowers digital service and application providers to host their offerings closer to end-users, resulting in exceptional performance, competitive pricing, and improved profit margins. The ThreeFold Grid's cost-effectiveness and environmentally-friendly nature make it an ideal choice for businesses and individuals alike, creating a win-win situation that combines economic efficiency with sustainability.

By leveraging the power of the ThreeFold Grid, users can access a vast and versatile network that revolutionizes the way digital services are hosted, delivered, and consumed. It unlocks new possibilities, drives innovation, and paves the way for a greener and more connected future.

## ThreeFold Grid Capacity

The __ThreeFold Grid Capacity__ refers to the [extensive pool]((https://dashboard.grid.tf/explorer/statistics) of __decentralized storage and compute resources__ available within the ThreeFold Grid ecosystem. It encompasses a vast network of autonomous nodes contributed by ThreeFold Farmers, resulting in a highly scalable and resilient infrastructure. This capacity is distributed globally, providing users with a reliable and efficient platform to store and process data, run applications, and deliver digital services, providing the world with the largest decentralized, peer-2-peer infrastructure.

## The Process

The ThreeFold Grid operates on a consumption and generation model similar to how people generate and consume electricity from the grid. Just as individuals consume electricity from the grid to power their homes and businesses, users of the ThreeFold Grid consume internet capacity to store data, run applications, and deliver digital services. At the same time, the ThreeFold Grid generates its capacity through the contributions of ThreeFold Farmers, who provide decentralized storage and compute resources to the grid. 

This user-friendly model allows individuals and businesses to tap into a reliable and scalable infrastructure, accessing the resources they need while contributing to the overall capacity of the grid in a seamless and sustainable manner. Just like the electricity grid, the ThreeFold Grid offers a user-friendly and accessible approach to meet the ever-growing demand for internet capacity and digital services.

## TFChain

__TFChain__, also known as __ThreeFold Chain__, is the powerful blockchain that orchestrates the interactions within the ThreeFold Grid ecosystem, providing users with a range of key functions such as:
- Users registration
- Farms Managment (registration and IP management)
- Money transfers
- Billing and consumptions reports
And many more. 

> Read more in-depth about __TFChain__ [here](../concepts/tfchain.md).

## The Farmers

People (we call them farmers) provide internet capacity using one or more 3Nodes. these nodes are registered on `TFChain` in what we call a "farm".

The farm is the logical grouping of nodes. e.g you can have 2 3Nodes in Belgium, and 5 in France. so to logically group them you can create a farm in Belgium with a specific ID that you can use in for the nodes in Belgium and create another farm with another ID for the nodes in france.

> Note: most of the time the grouping is also done by the physical place

## 3Nodes

 it's a computer really. That 3Node runs a very specific software `zero-os` sometimes called `zos`. `Zero-OS` is an autonomous operating system designed to expose raw compute, storage and network capacity.

The `Zero-OS` handles
-The workloads provisioning, e.g starting a new container or a VM, starting a `0-db`,

- The networking for the workloads
- The lifecycle management of the workloads running on
- The system upgrades
- Consumption reporting for the billing to happen on the `TFChain`

## Provisioning

Now that's very cool, we now already know about `TFChain`, `Farmers`, `3Nodes` and `Zero-OS`, but still one major thing is still missing is how can we send a provisioning request to `Zero-OS`?

The provisioning process is done mainly using two tools which you can read about in this manual;

- [Terraform](../terraform/terraform_readme.md)
- [Typescript Client](../javascript/grid3_javascript_readme.md)

So what happens is we build the deployment information (what workloads we want to deploy) and create a contract(s) on the blockchain between us and a 3Node that will fulfill the provisioning of the resources needed in the contract for us, and automatically the node reports to the blockchain periodically to deduct the money from the user account based on the consumption.
