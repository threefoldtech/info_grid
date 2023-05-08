## How it works

Here we will try to describe the platform in a nutshell, so we understand the mechanics and clear the terminology a little bit.

#### ThreeFold Grid

ThreeFold Grid is a global, neutral, and sustainable network of autonomous storage and compute Internet capacity created by ThreeFold Farmers, with more than 80,000,000 GB and 20,000 cores existing today. On this Grid, IT capacity is indexed / registered on the TFChain for easy discovery by purchasers. Any application which can run on Linux can run on the ThreeFold Grid but with more privacy, security, closer to the end-user, and at a much lower cost.

This Internet capacity is produced and allocated locally - similar to the way electricity and other utilities are purchased today. This allows any digital service or application provider to host their services and applications in proximity to the end user leading to significantly greater performance, a lower price point and better margins. This is both more cost effective and green.

### Capacity

Threefold grid is providing the [largest](https://dashboard.grid.tf/explorer/statistics) decentralized, peer 2 peer infrastructure.

### The process

The idea is similar to electricity grid. People consume electricity, and sometimes they can provide electricity. It's almost the same.

#### TFchain

TFChain is a blockchain orchestrating the interactions on the grid

- Users registration
- Farms Managment (registration and IP management)
- Money transfers
- Billing and consumptions reports

And more.

#### The farmers

People (we call them farmers) provide internet capacity using one or more 3Nodes. these nodes are registered on `TFChain` in what we call a "farm".

The farm is the logical grouping of nodes. e.g you can have 2 3Nodes in Belgium, and 5 in France. so to logically group them you can create a farm in Belgium with a specific ID that you can use in for the nodes in Belgium and create another farm with another ID for the nodes in france.

> Note: most of the time the grouping is also done by the physical place

#### 3Node

 it's a computer really. That 3Node runs a very specific software `zero-os` sometimes called `zos`. `Zero-OS` is an autonomous operating system designed to expose raw compute, storage and network capacity.

The `Zero-OS` handles
-The workloads provisioning, e.g starting a new container or a VM, starting a `0-db`,

- The networking for the workloads
- The lifecycle management of the workloads running on
- The system upgrades
- Consumption reporting for the billing to happen on the `TFChain`

#### Provisioning

Now that's very cool, we now already know about `TFChain`, `Farmers`, `3Nodes` and `Zero-OS`, but still one major thing is still missing is how can we send a provisioning request to `Zero-OS`?

The provisioning process is done mainly using two tools which you can read about in this manual;

- [Terraform](../terraform/terraform_readme.md)
- [Typescript Client](../javascript/grid3_javascript_readme.md)

So what happens is we build the deployment information (what workloads we want to deploy) and create a contract(s) on the blockchain between us and a 3Node that will fulfill the provisioning of the resources needed in the contract for us, and automatically the node reports to the blockchain periodically to deduct the money from the user account based on the consumption.
