
# Proof-of-Capacity

![](img/farming_rewards_.png)

The ThreeFold Blockchain (TFChain) uses work algorythm called "Proof-of-Capacity" to verify the Internet capacity provided by 3Nodes. Put simply, PoC verifies, on an ongoing basis, that farms are honestly representing the Internet capacity they provide to the network.

**See Proof-of-Capacity in action** by visiting the [ThreeFold Grid Capacity Explorer](https://dashboard.grid.tf/explorer/statistics) which represents the best resource to view POC-related data. 

## What is proof-of-capacity? 
 
POC allows ThreeFold Farmers to earn reward according to their contribution. Farming is the "work" itself, the act of providing Internet capacity to the network and making it accessible via our TFDAO and TFChain.

The PoC algorythm records four different types of Internet capacity:

- Compute Capacity (CPU)
- Memory Capacity (RAM)
- Storage Capacity (SSD/HDD)
- Network Capacity (Bandwidth, IP Addresses)

## Why proof-of-capacity? 

PoC comes with a number of benefits, including: 

- Energy efficiency: earning reward in form of TFT does not waste energy, farming TFT is a carbon_negative operation.
- Lower barriers to entry with reduced hardware requirements: no need for elite hardware to stand a chance for earning rewards.
- Decentralized: allows anyone to connect a 3node to the network. TFGrid runs as a DAO.

The main advantage of PoC to farmers it makes it really easy to run a 3Node. It doesn't require huge investments in hardware or energy and everyone earns a fair reward for their contribution. It is more decentralized, allowing for increased participation, and more 3Nodes doesn't mean increased returns, like in mining. 

## How does Proof-of-Capacity work?

1. A farmer boots hardware with Zero-OS (multiple boot methods available)
2. Zero-OS is a low level OS, with no shell, farmers cannot access Zero-OS
3. Zero-OS reports used IT capacity towards TFChain
4. TFChain and TFDAO will calculate rewards as required for the farmer (TFGrid 3.1.x)
5. TFChain will mint the required TFT and send them to account on TFChain of TFFarmer.
6. Everyone can use the [ThreeFold Explorer](https://dashboard.grid.tf/explorer/statistics) to see where capacity is available. This info comes from the TFChain.


## PoC Rewards

| Percentage                                         | Description    | Remark                           |
| -------------------------------------------------- | -------------- | -------------------------------- |
| 100% of specified [farming reward](farming_reward.md) | goes to Farmer | Allows for a pure Utility Token. |

- Additional TFT are farmed to compensate for Carbon and deliver the yield for the Layer 2 Staking pools

{{#include farming_reward_calculation.md}}