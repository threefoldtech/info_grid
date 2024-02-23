## Farming Reward Calculation

Each 3Node has certain amount of compute, storage and network resources:

- Compute Capacity (CPU)
- Memory Capacity (RAM)
- Storage Capacity (SSD/HDD)
- Network Capacity (Bandwidth, IP Addresses)

For making this Internet Capacity available, Farmers are rewarded with TFT.

The amount of resources availabe in a 3Node are translated into compute units (CU), storage units (SU), Network units (NU) and IP addresses (IPAddr) to calculate farming rewards. See also [Cloud Units Calculation For Farming](../../cloudunits/resource_units_calc_cloudunits.md).

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
| Compute Unit (CU)   | typically 2 vcpu, 4 GB mem, 50 GB storage                         | $REWARD_CU_TFT TFT/month  |
| Storage Unit (SU)   | typically 1 TB of netto usable storage                            | $REWARD_SU_TFT TFT/month  |
| Network Unit (NU)   | 1 GB of data transfered as used by TFGrid user for Public IP Addr | $REWARD_NU_TFT TFT/GB     |
| Public IPv4 Address | Public IP Address as used by a TFGrid user                        | $REWARD_IP_TFT TFT/hour   |


The reward for above items are linked (pegged) to the USD

| Unit                | USD   | Unit                                  |
| ------------------- | ----- | ------------------------------------- |
| Compute Unit (CU)   | 2.4   | per month                             |
| Storage Unit (SU)   | 1     | per month                             |
| Network Unit (NU)   | 0.03  | per GB transfer (as customers use it) |
| Public IPv4 Address | 0.005 | per IP address, calculated per hour   |

> IMPORTANT: MORE INFO ABOUT DAO RULES IN RELATION TO PROOF OF CAPACITY, SEE BELOW

> **The rewards above are calculated according to the current TFT to USD price in TFChain of $TFTFARMING** ($NOW). TFDAO is responsible to change this price in accordance to current marketsituation and liquidity.

See below for more info about USD price which will be used to calculate your farming reward as well as any other specifics in relation to farming calculations.

The above farming rewards apply for 3Nodes registered in TFChain for ThreeFold Grid v3. Anyone can calculate their potential rewards using the [Farming Reward Calculator](https://dashboard.grid.tf/calculator/simulator). The same CU, SU, NU and IPAddr principles apply to the sales of Internet capacity in the form [cloud units](../../cloudunits/cloudunits.md).
