<h1>Cloud Units</h1>

<h2> Table of Contents </h2>

- [What are Cloud Units?](#what-are-cloud-units)
- [How is the price of Cloud Units (v4) calculated?](#how-is-the-price-of-cloud-units-v4-calculated)
  - [Compute Capacity](#compute-capacity)
  - [Storage Capacity](#storage-capacity)
  - [Network](#network)

***

## What are Cloud Units?
Cloud units are the basis for price calculation for anyone intending to use/deploy on the Threefold Grid. 

Cloud units are a unified way to account for virtual hardware resources on the ThreeFold Grid. They represent compute, storage and network equivalents to energy (kW - kilowatt). The are three categories of cloud units:

- Compute Unit (CU): The amount of data processing power in terms of virtual CPU (vCPU) cores (logical [CPUs](https://en.wikipedia.org/wiki/Central_processing_unit)) and Random Access Momory ([RAM](https://en.wikipedia.org/wiki/Random-access_memory)).
- Storage Unit (SU): The amount of storage capacity in terms of Hard Disk Drives (HDDs) and Solid State Drives (SSDs) in Gigabytes (GB).
- Network Unit (NU): The amount of data that travels in and out of storage units or compute units expressed in GB.

> Note: [Resource units](./resource_units_calc_cloudunits.md) are used to calculate SU & CU. Resource Units are used to measure compute and storage capacity produced by hardware.

When a solution is deployed on the ThreeFold Grid, the system automatically gathers the required amount of CU, SU, or NU. It is important to note that users are not billed upon reservation but only when utilizing the actualy CU, SU and NU. TF Certified Farmers can define the price of CU, SU, and NU they make available on the ThreeFold Grid. 

## How is the price of Cloud Units (v4) calculated?

The following tables display how cloud units (v4) are calculated on the ThreeFold Grid. The 4th version of cloud units are used since Grid 2.2+ in mid 2020.

### Compute Capacity

| CU (Compute Unit)                     |     |     |      |                 |
| ------------------------------------- | --- | --- | ---- | --------------- |
| GB Memory                             | 4   | 8   | 2    |                 |
| nr vCPU                               | 2   | 1   | 4    |                 |
| Passmark Minimum (expected is double) | 500 | 250 | 1000 | CPU performance |

The passmark (CPU benchmark or alternative) is not measured on the grid yet. It is used in simulators to check the mechanisms and ensure enough performance per CU is delivered.

Example of Compute unit: 
- 4 GB memory & 2 virtual CPU (and 50GB of SSD disk space)
- Recommended price on TF Grid = 10 USD
- Alternative cloud price = between 40 USD and 180 USD

See how we compare with the market compute prices [here](./pricing/pricing.md).

### Storage Capacity

| SU (Storage Unit)   | HDD  | SSD |
| ------------------- | ---- | --- |
| GB Storage Capacity | 1200 | 200 |

HDD is only usable for Zero Database driven storage (e.g. ThreeFold Quantum Safe Storage). 1.2 TB of HDD is provided following the advised storage policy of 16+4 with 20% overhead. So the net usable storage would be 1TB. In other words, the SU corresponds in that case to 1TB of net usable storage and an extra 200GB for redundancy.

Example of Storage unit:

- 1TB of usable storage as provided by the Zero-DBs (the backend storage systems)
- Recommended price on TF Grid for 1 SU = 10 USD
- Alternative cloud price = between 20 USD and 200 USD

See how we compare with market storage prices [here](./pricing/pricing.md).

### Network

| NU (Network Unit = per GB) = NRU per month | GB (NRU) |
| ------------------------------------------ | -------- |
| GB transferred OUT or IN                   | 1        |

> We use SU-month and CU-month to show SU monthly costs. This can be compared to kilowatts (kW) to see electricity usage per month. Learn more about how this is calculated with [Resource units](./resource_units_calc_cloudunits.md), a way to measure the compute and storage capacity produced by hardware.