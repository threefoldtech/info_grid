<h1> Cloud Unit Pricing </h1>

![](img/tfgrid_pricing.jpg)

<h2>Table of Contents</h2>

- [Pricing Policy](#pricing-policy)
- [Operation Fees](#operation-fees)
- [Certified Capacity](#certified-capacity)
- [Dedicated Nodes](#dedicated-nodes)
- [Staking Discount](#staking-discount)
  - [Silver Example: 40% Discount](#silver-example-40-discount)

***

## Pricing Policy

- The current prices are for resources usage on mainnet (testnet get 50% discount)
- A month is considered as 30 days (720 hours)

| Cloud Units       | Description                                      | USD / hour      | USD / month | USD / GB |
| ----------------- | ------------------------------------------------ | --------------- | ----------- | -------- |
| Compute Unit (CU) | typically 2 vcpu, 4 GB mem, 50 GB storage        | 0.01            | 7.20        |          |
| Storage Unit (SU) | typically 1 TB of netto usable storage           | 0.005           | 3.60        |          |
| Network Unit (NU) | 1 GB transfer, bandwidth as used by TFGrid users |                 |             | 0.0015   |

<br>

| Network Addressing | Description                                |  USD / hour | USD / month |
| ------------------ | ------------------------------------------ | ----------- | ----------- | 
| IPv4 Address       | Public Ip Address as used by a TFGrid user | 0.004	    | 2.88        |
| Unique Name        | Usable as name on webgateways              | 0.00025	    | 0.18        |
| Unique Domain Name | Usable as dns name on webgateways          | 0.0005	    | 0.36        |

> Please check our [Cloud Pricing for utilization sheet](https://docs.google.com/spreadsheets/d/1E6MpGs15h1_flyT5AtyKp1TixH1ILuGo5tzHdmjeYdQ/edit#gid=2014089775) for more details.

## Operation Fees

Operations on TFChain have a base fee of 0.001 TFT. Creating and destroying deployments usually includes several operations.

## Certified Capacity

Renting capacity on certified nodes is charged 25% extra (x 1.25).
  
## Dedicated Nodes

Since April 2022, TFGrid has introduced dedicated server support. With dedicated servers, you can reserve a full server exclusively for your use. This comes with 50% discount, making it a cost-effective option.

Here are two examples of dedicated nodes and their prices, with maximum staking discount level (Gold => -60%) for 18 months staking:

- Dedicated Node 1: 192 GB memory, 24 cores, 1000 GB SSD = $75 per month
- Dedicated Node 2: 32 GB memory, 8 cores, 1000 GB SSD = $31 per month

> Please check our [Cloud Pricing for utilization sheet](https://docs.google.com/spreadsheets/d/1E6MpGs15h1_flyT5AtyKp1TixH1ILuGo5tzHdmjeYdQ/edit#gid=2014089775) for more details.

These dedicated nodes come with a generous 5TB bandwidth usage per node per month. They are well-suited for deploying blockchain nodes or other resource-intensive workloads. Using a dedicated node requires reserving a 3node in your TFGrid admin portal. Once reserved, you have exclusive deployment rights for that node, and there are no additional costs.

When renting a dedicated node, you receive a 50% discount for the entire node. However, it's important to note that you will still be required to pay for the entire node, even with the discount applied. This means that while you enjoy the discount, the cost of the dedicated node is not prorated based on the resources you utilize.

## Staking Discount

| Type       | Pricing Level | Nr months of TFT linked to account |
| ---------- | ------------- | ---------------------------------- |
| No staking | - 0%          | 0                                  |
| Default    | - 20%         | 1.5 months                         |
| Bronze     | - 30%         | 3 months                           |
| Silver     | - 40%         | 6 months                           |
| Gold       | - 60%         | 18 months                          |

TFChain charges users for proof of utilization on an hourly basis. The discount applied is determined by the amount of TFT (ThreeFold Token) available in the user's TFChain account. It's important to note that the discount is calculated based on the TFT balance in the TFChain account, not on other supported blockchains like Stellar.

This discount mechanism operates automatically, and users don't need to take any specific actions to avail themselves of this benefit. However, it's worth mentioning that the maximum discount for network-related services is 40%.

### Silver Example: 40% Discount

Let's break down the example for a 40% discount on Internet Capacity consumption:

- Suppose your consumption on the ThreeFold Grid is worth 10 TFT per hour.
- To be eligible for a 40% discount, you need to have a minimum of 43,200 TFT in your account, calculated as 10 TFT * 24 hours * 30 days * 6 months.
- Similarly, to be eligible for a 60% discount, you would need a minimum of 129,600 TFT in your account, calculated as 10 TFT * 24 hours * 30 days * 18 months.
- If you have 60,000 TFT in your TFChain account, you would receive a 40% discount.
- However, since you don't have enough tokens to qualify for the 60% discount, it won't be applicable.
- With the 40% discount, your effective payment for the consumption would be 6 TFT per hour, as long as the amount of TFT in your account falls within the range of 43,200 to 129,600 (as calculated above).

Keep in mind that these calculations are based on the example provided and the specific discount levels mentioned.