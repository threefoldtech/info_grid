# Cloud Units Advanced

## How is the price of Cloud Units (v4) calculated?

The following tables display how cloud units (v4) are calculated on the ThreeFold Grid. The 4th version of cloud units are used since Grid 2.2+ in mid 2020.

> Note: [Resource units](resource_units.md) are used to calculate SU & CU. Resource Units are used to measure compute and storage capacity produced by hardware.

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

See how we compare with the market compute prices [here](pricing).

### Storage Capacity

| SU (Storage Unit)   | HDD  | SSD |
| ------------------- | ---- | --- |
| GB Storage Capacity | 1200 | 200 |

HDD is only usable for Zero Database driven storage (e.g. ThreeFold Quantum Safe Storage). 1.2 TB of HDD is provided following the advised storage policy of 16+4 with 20% overhead. So the net usable storage would be 1TB. In other words, the SU corresponds in that case to 1TB of net usable storage and an extra 200GB for redundancy.

Example of Storage unit:

- 1TB of usable storage as provided by the Zero-DBs (the backend storage systems)
- Recommended price on TF Grid for 1 SU = 10 USD
- Alternative cloud price = between 20 USD and 200 USD

See how we compare with market storage prices [here](pricing).

### Network

| NU (Network Unit = per GB) = NRU per month | GB (NRU) |
| ------------------------------------------ | -------- |
| GB transferred OUT or IN                   | 1        |

> We use SU-month and CU-month to show SU monthly costs. This can be compared to kilowatts (kW) to see electricity usage per month. Learn more about how this is calculated with [Resource units](resource_units), a way to measure the compute and storage capacity produced by hardware.



