<h1>Proof-of-Capacity</h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [What is proof-of-capacity?](#what-is-proof-of-capacity)
- [Why proof-of-capacity?](#why-proof-of-capacity)
- [How does Proof-of-Capacity work?](#how-does-proof-of-capacity-work)
- [PoC Rewards](#poc-rewards)
- [Farming Reward Calculation](#farming-reward-calculation)

***

> Note: The proof-of-capacity parameters will be updated for the next 3.14 grid release. Stay tuned.

## Introduction

The ThreeFold Blockchain (TFChain) uses work algorythm called "Proof-of-Capacity" to verify the Internet capacity provided by 3Nodes. Put simply, PoC verifies, on an ongoing basis, that farms are honestly representing the Internet capacity they provide to the network. 

## What is proof-of-capacity? 
 
POC allows ThreeFold Farmers to earn reward according to their contribution. Farming is the "work" itself, the act of providing Internet capacity to the network and making it accessible via our TFDAO and TFChain.

The PoC algorythm records four different types of Internet capacity:

- Compute Capacity (CPU)
- Memory Capacity (RAM)
- Storage Capacity (SSD/HDD)
- Network Capacity (Bandwidth, IP Addresses)

## Why proof-of-capacity? 

PoC comes with a number of benefits, including: 

- Energy efficiency: earning reward in form of TFT does not waste energy.
- Lower barriers to entry with reduced hardware requirements: no need for elite hardware to stand a chance for earning rewards.
- Decentralized: allows anyone to connect a 3node to the network. TFGrid runs as a DAO.

The main advantage of PoC to farmers it makes it really easy to run a 3Node. It doesn't require huge investments in hardware or energy and everyone earns a fair reward for their contribution. It is more decentralized, allowing for increased participation, and more 3Nodes doesn't mean increased returns, like in mining. 

## How does Proof-of-Capacity work?

1. A farmer boots hardware with Zero-OS (multiple boot methods available)
2. Zero-OS is a low level OS, with no shell, farmers cannot access Zero-OS
3. Zero-OS reports used IT capacity towards TFChain
4. TFChain and TFDAO will calculate rewards as required for the farmer (TFGrid 3.1.x)
5. TFChain will mint the required TFT and send them to account on TFChain of the farmer.
6. Everyone can use the [ThreeFold Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) to see where capacity is available. This info comes from the TFChain.


## PoC Rewards

100% of specified [farming rewards](./farming_reward.md) goes to the farmer.

## Farming Reward Calculation

Each 3Node has certain amount of compute, storage and network resources:

- Compute Capacity (CPU)
- Memory Capacity (RAM)
- Storage Capacity (SSD/HDD)
- Network Capacity (Bandwidth, IP Addresses)

For making this Internet Capacity available, Farmers are rewarded with TFT.

The amount of resources availabe in a 3Node are translated into compute units (CU), storage units (SU), Network units (NU) and IP addresses (IPAddr) to calculate farming rewards. See also [Cloud Units Calculation For Farming](../cloud/resource_units_calc_cloudunits.md).

> **Unless explicitly specified otherwise, calculations of "gigabytes" use base
> 1024. That is, 1 GB is equal to 1073741824 bytes.**

The formula to calculate farming rewards is the following:

```python
TFT earned per month = 
    CU farmed * CU farming rewards 
    + SU farmed * SU farming rewards
    + NU used * NU farming rewards
    + IPAddr used * IPAddr farming rewards

```

The below table expands on CU, SU, NU and IPAddr and their farming rewards:

| Unit                | description                                                       | v3 farming rewards in TFT |
| ------------------- | ----------------------------------------------------------------- | ------------------------- |
| Compute Unit (CU)   | typically 2 vcpu, 4 GB mem, 50 GB storage                         | 30.00 TFT/month |
| Storage Unit (SU)   | typically 1 TB of netto usable storage                            | 12.50 TFT/month  |
| Network Unit (NU)   | 1 GB of data transfered as used by TFGrid user for Public IP Addr | 0.38 TFT/GB     |
| Public IPv4 Address | Public IP Address as used by a TFGrid user                        | 0.06 TFT/hour   |

> **The rewards above are calculated according to the current TFT to USD price in TFChain of 0.08. TFDAO is responsible to change this price in accordance to the current market and liquidity.**

The above farming rewards apply for 3Nodes registered in TFChain for ThreeFold Grid v3. Anyone can calculate their potential rewards using the [Farming Reward Simulator](https://dashboard.grid.tf/#/farms/simulator/). The same CU, SU, NU and IPAddr principles apply to the sales of Internet capacity in the form of [cloud units](../cloud/cloudunits.md).
