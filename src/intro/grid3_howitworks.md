# How it Works

Let's delve into the mechanics of the ThreeFold Grid and gain a clearer understanding of its operations.

## The ThreeFold Grid: A Global, Sustainable Network

The ThreeFold Grid is a remarkable network consisting of autonomous storage and compute Internet capacity. It has been created by dedicated individuals known as ThreeFold Farmers, who have contributed over 80,000,000 GB of storage and 20,000 cores to the grid. This massive capacity is globally available, neutral, and sustainable.

To ensure easy discovery by purchasers, the IT capacity within the ThreeFold Grid is indexed and registered on the TFChain. This platform serves as a comprehensive directory, simplifying the process of finding and accessing the desired resources. The ThreeFold Grid supports any application that can run on Linux, guaranteeing compatibility and flexibility. Moreover, it offers additional benefits, including enhanced privacy, security, proximity to end-users, and a significantly lower cost compared to traditional alternatives.

### Local Production and Allocation of Internet Capacity

In a similar manner to purchasing electricity or other utilities, the internet capacity provided by the ThreeFold Grid is produced and allocated locally. This decentralized approach empowers digital service and application providers to host their offerings closer to end-users, resulting in exceptional performance, competitive pricing, and improved profit margins. The ThreeFold Grid's cost-effectiveness and environmentally-friendly nature make it an ideal choice for businesses and individuals alike, creating a win-win situation that combines economic efficiency with sustainability.


## ThreeFold Grid Capacity

The __ThreeFold Grid Capacity__ refers to the [extensive pool]((https://dashboard.grid.tf/explorer/statistics) of __decentralized storage and compute resources__ available within the ThreeFold Grid ecosystem. It encompasses a vast network of autonomous nodes contributed by ThreeFold Farmers, resulting in a highly scalable and resilient infrastructure. This capacity is distributed globally, providing users with a reliable and efficient platform to store and process data, run applications, and deliver digital services, providing the world with the largest decentralized, peer-2-peer infrastructure.

## The Process

The ThreeFold Grid operates on a consumption and generation model similar to how people generate and consume electricity from the grid. Just as individuals consume electricity from the grid to power their homes and businesses, users of the ThreeFold Grid consume internet capacity to store data, run applications, and deliver digital services. At the same time, the ThreeFold Grid generates its capacity through the contributions of ThreeFold Farmers, who provide decentralized storage and compute resources to the grid. 

This user-friendly model allows individuals and businesses to tap into a reliable and scalable infrastructure, accessing the resources they need while contributing to the overall capacity of the grid in a seamless and sustainable manner. Just like the electricity grid, the ThreeFold Grid offers a user-friendly and accessible approach to meet the ever-growing demand for internet capacity and digital services.

## TFChain: The Backbone Blockhain Infrastructure

__TFChain__, also known as __ThreeFold Chain__, is the powerful blockchain that orchestrates the interactions within the ThreeFold Grid ecosystem, providing users with a range of key functionalities such as:
- Users registration
- Farms Management (registration and IP management)
- Fund transfers
- Billing and consumptions reports
And many more. 

> Read more in-depth about __TFChain's key functionalities__  [here](../concepts/tfchain.md).

## The Farmers: Empowering the ThreeFold Grid

In the ThreeFold ecosystem, dedicated individuals, whom we fondly refer to as "__Farmers__," play a crucial role in providing the valuable internet capacity that drives the ThreeFold Grid. These farmers contribute to the network by utilizing one or more __3Nodes__, which are registered on the TFChain, our dedicated blockchain infrastructure.

A farm represents a logical grouping of nodes, allowing farmers to organize their infrastructure effectively. For example, a farmer may have 2 3Nodes located in Belgium, and 5 3Nodes in France. By creating separate farms with unique IDs, the nodes can be logically grouped based on their geographical location. This logical grouping not only simplifies management but also reflects the physical placement of the nodes.

The farmers' commitment to deploying and maintaining their nodes fuels the growth and resilience of the ThreeFold Grid. Through their efforts, they contribute to the availability of decentralized internet capacity, enabling individuals and businesses to benefit from secure, efficient, and cost-effective resources. The dedication of our farmers is instrumental in creating a robust and sustainable infrastructure that powers the future of the internet.

## 3Nodes: Unleashing the Power of Raw Capacity

__3Nodes__ are the driving force behind the ThreeFold Grid, acting as __specialized computers that run the remarkable Zero-OS software__. Think of a 3Node as a unique breed of operating system, designed to expose raw compute, storage, and network capacity in a seamless and efficient manner.

With Zero-OS at its core, a 3Node takes care of various essential tasks to ensure optimal performance:

__Workload Provisioning__: Whether it's starting a new container or a virtual machine (VM), or even initiating a "0-db" database, the 3Node expertly handles the provisioning of your workloads, empowering you to effortlessly deploy and manage your applications.

__Networking for Workloads__: The 3Node effortlessly manages the networking requirements of your workloads, ensuring smooth connectivity and efficient data transfer within the ThreeFold Grid.

__Lifecycle Management__: Say goodbye to manual workload management! The 3Node diligently oversees the lifecycle of your running workloads, handling tasks such as scaling, monitoring, and resource allocation, so you can focus on what matters most: your applications.

__System Upgrades__: Keeping your infrastructure up-to-date is a breeze with 3Nodes. The Zero-OS automatically manages system upgrades, seamlessly integrating the latest enhancements and security patches, all without causing disruption to your workloads.

__Consumption Reporting__: Accurate billing is essential, and the 3Node provides comprehensive consumption reporting. By recording resource usage data, it facilitates transparent and precise billing processes that take place on the TFChain, our dedicated blockchain.

Through the power of 3Nodes, the ThreeFold Grid empowers users to harness the raw capacity of compute, storage, and network resources with ease. Say goodbye to complexities and hello to a user-friendly ecosystem that allows you to focus on innovation and productivity.

## Provisioning: Empowering Resource Deployment

Now that we've covered the fundamental components of the ThreeFold Grid, it's time to explore the exciting world of provisioning. But how can we initiate a provisioning request to the Zero-OS operating system? Let's find out!

The provisioning process revolves around two powerful tools, which we will delve into within this manual:

- [Terraform](../terraform/terraform_readme.md)
- [Typescript Client](../javascript/grid3_javascript_readme.md)

Here's how it works: First, we gather the necessary deployment information, specifying the workloads we want to deploy. Using either Terraform or the Typescript Client, we create a contract on the blockchain. This contract acts as an agreement between us and a dedicated 3Node, ensuring that the required resources will be provisioned on our behalf.

Once the contract is in place, the 3Node diligently reports its resource consumption to the blockchain at regular intervals. As a result, the associated fees are automatically deducted from the user's account, ensuring a seamless and transparent billing process based on actual resource consumption.

With the provisioning process, you have the power to effortlessly deploy the resources you need, thanks to the harmony between the blockchain, 3Nodes, and the Zero-OS operating system. Discover the full potential of resource deployment and embrace the convenience and flexibility of the ThreeFold Grid.






