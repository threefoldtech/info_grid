
![](img/tfgrid_pricing.jpg)

## Cloud Unit Pricing

| Cloud Units       | description                                      | mUSD               | mTFT               |
| ----------------- | ------------------------------------------------ | ------------------ | ------------------ |
| Compute Unit (CU) | typically 2 vcpu, 4 GB mem, 50 GB storage        | $CU_MUSD_HOUR/hour | $CU_MTFT_HOUR/hour |
| Storage Unit (SU) | typically 1 TB of netto usable storage (*)       | $SU_MUSD_HOUR/hour | $SU_MTFT_HOUR/hour |
| Network Unit (NU) | 1 GB transfer, bandwidth as used by TFGrid users | $NU_MUSD_GB/GB      | $NU_MTFT_GB/GB     |

| Network Addressing | description                                | mUSD                  | mTFT                  |
| ------------------ | ------------------------------------------ | --------------------- | --------------------- |
| IPv4 Address       | Public Ip Address as used by a TFGrid user | $IP_MUSD_HOUR/hour    | $IP_MTFT_HOUR/hour    |
| Unique Name        | Usable as name on webgateways              | $NAME_MUSD_HOUR/hour  | $NAME_MTFT_HOUR/hour  |
| Unique Domain Name | Usable as dns name on webgateways          | $DNAME_MUSD_HOUR/hour | $DNAME_MTFT_HOUR/hour |

- mUSD = 1/1000 of USD, mTFT = 1/1000 of TFT
- TFT pricing pegged to USD (pricing changes in line with TFT/USD rate)
- **current TFT to USD price is $TFTUSD** , calculated on $NOW
- pricing is calculated per hour for the TFGrid 3.0
<!-- - pricing of capacity of certified farmers is 25% more (x 1.25) (future development) -->

### Pricing Expressed Per Month

| Cloud Units       | description                                      | USD NO DISCOUNT     | USD 60% DISCOUNT                 |
| ----------------- | ------------------------------------------------ | ------------------- | ---------------------------- |
| Compute Unit (CU) | typically 2 vcpu, 4 GB mem, 50 GB storage        | $CU_USD_MONTH/month | $CU_USD_MONTH_DISCOUNT/month |
| Storage Unit (SU) | typically 1 TB of netto usable storage (*)       | $SU_USD_MONTH/month | $SU_USD_MONTH_DISCOUNT/month |
| Network Unit (NU) | 1 GB transfer, bandwidth as used by TFGrid users | $NU_USD_GB/GB       | $NU_USD_MONTH_DISCOUNT/GB    |
| IPv4 Address      | Public Ip Address as used by a TFGrid user       | $IP_USD_MONTH/month | $IP_USD_MONTH_DISCOUNT/month |

> Please check pricing calculator on <http://pricing.threefold.me>

### Dedicated Servers

Starting April 2022, the TFGrid 3.0/a5 has support for dedicated servers. You can reserve a full server and the server is only usable for you, a minimum of 70% discount is given for this usecase.

- Dedicated Node, 192 GB mem, 24 cores, 1000 GB SSD = 75 USD per month (max discount, 3Y staking)
- Dedicated Node, 32 GB mem, 8 cores, 1000 GB SSD = 31 USD per month (max discount, 3Y staking)

Above example was with generous 5TB of bandwidth used per node per month, which is huge.

These nodes are ideal to deploy blockchain nodes, or other high demanding workloads. Dedicated nodes leads to amazing pricing.

To use a dedicated node, you will have to reserve a 3node for yourself in your admin portal of TFGrid, only you can then deploy on this node and there is no additional cost.

> Please check pricing calculator on <http://pricing.threefold.me>

### Discount Levels

| type       | pricing level | nr months of TFT linked to account |
| ---------- | ------------- | ---------------------------------- |
| no staking | - 0%          | 0                                  |
| default    | - 20%         | 3 months                           |
| bronze     | - 30%         | 6 months                           |
| silver     | - 40%         | 12 months                          |
| gold       | - 60%         | 36 months                          |

TFChain charges the user for proof_of_utilization every hour. TFChain will calculate the discount based on amount of TFT available in the account of the user on TFChain (not on Stellar or any of the other blockchains we also support). This is an automatic form of staking, the user does not have to do anything to have this benefit. For network related services its max 40% discount.

### Example for 40% discount

- I've used 10 TFT worth of Internet Capacity on tf_grid for the last hour.
- 10TFT \* 24 \* 30 \* 12 = I would need 86,400 TFT for one year
- 10TFT \* 24 \* 30 \* 36 = I would need 259,200 TFT for 3 year
- I have 120,000 TFT in my account on TF_Chain, this means that I will get 40% discount.
- I don't have enough tokens to get to 60% discount.
