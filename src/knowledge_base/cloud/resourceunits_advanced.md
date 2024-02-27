<h1>Resource Units Calculation</h1>

<h2> Table of Contents </h2>

- [Calculation from resource units to CU/SU for farming purposes](#calculation-from-resource-units-to-cusu-for-farming-purposes)
- [Compute](#compute)
- [Storage](#storage)
  - [Storage cost price verification Dec 2021](#storage-cost-price-verification-dec-2021)

***

## Calculation from resource units to CU/SU for farming purposes

The threefold Zero-OS and TFChain software translates resource units (CRU, MRU, HRU, SRU) into cloud units (CU, SU) for farming reward purposes.

## Compute

For farming, 1 CU equals:

- 2 virtual CPUs with a maximum over subscription of 4 CPUs and minimum required memory of 4GB. 
- An over subscription of 4 CPUs remains still gentle as we understand many other providers use more.
- There needs to be at least 50GB SSD per CU, if not there is penalty for nr of CU, reasoning is that otherwise people cannot deploy their VM's or Containers if there would not be minimal SSD.

```python
cu = min((mru - 1) / 4, cru * 4 / 2, sru / 50)
```

- 1 GB of memory is subtracted for the operating system to function.
- please note minimal passmark per CU (with 4GB mem), needs to be 1000 passmark at farming side, this is not being checked today but might be done in future. If your chosen CPU has less than 1000 passmark per CU (of 4 GB mem), it could be your final CU's will be lower once that feature is introduced.


## Storage

For farming, 1 SU equals to:
- 1.2 TB of HD capacity (which can deliver 1 TB of net usable storage) 
- 200 GB of SSD capacity with a buffer of 20%

```python
su = hru / 1200 + sru * 0.8 / 200
```

### Storage cost price verification Dec 2021

- price for 16 TB HDD = 300 USD
  - 16000 / 1200 = 13.3 SU
  - 1 SU costs = 300 / 13.3 = 22.5 for HDD
- price for 2 TB SSD = 200 USD
  - 2000 * 0.8 / 200 = 8 SU
  - 1 SU costs 200 / 8 = 25 for SSD


<!-- ## Change Log

- original non final specs from Summer 2021, was mentioned its not final.
- Dec 2021 update for launch v3.x
  - there need to be at least 50 GB SSD capacity per CU
  - was in the specs of farming reward but formula above did not take it into consideration, in others nonconsistenty between specs & formula.
  - sru division to 200, was 300, to be more in line with HDD vs SSD pricing, this check needs to be done +- every 6 months, results in slightly more SU, which is good for farmers.
- Jan 2022 update for launch v3.x
  - reverted change done in Dec, sru does not have to be deducted from cpu, results in increase of farming rewards, in other words good for farmers. Also good formula more easy.
  - Introduced warning about minimum CPU requirements in relation to passmark.
   -->