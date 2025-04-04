<h1>Proof-of-Utilization</h1>



> Note: The proof-of-utilization parameters will be updated for the next 3.14 grid release. Stay tuned.

## Introduction

ThreeFold Token ("TFT") is the token of the ThreeFold ecosystem.

Each ThreeFold Grid user can use the capacity on the grid by using TFT. The ThreeFold Chain ("TFChain") - ThreeFold Blockchain will track the utilization of this capacity. This process is called Proof-of-Utilization. Each hour the utilization is being tracked on the blockchain and charged to the capacity's user.

## What is Proof-of-Utilization? 

Proof-of-utilization is the underlying mechanisms that verifies the utilization of Internet capacity on the ThreeFold Grid. 

Every hour, the utilization is recorded in TFChain and the user is charged for the Internet capacity used on the ThreeFold Grid. Discount calculated in line with the amount of TFT users have in their accounts on TFChain. Learn more about the discount [here](../cloud/pricing/staking_discount_levels.md).

## How does Proof-of-Utilization work?

1. A user reserves Internet capacity on a given set of 3Nodes.
2. Zero-OS records the reserved and used CU, SU, NU and IPAddresses in correlation with TFChain records.
3. The TFChain DAO will charge the costs to the user in line with [discount mechanism](../cloud/pricing/staking_discount_levels.md).
4. TFT from the user account are burned/distributed in line to table below.

| Percentage | Description                            | Remark                                                                   |
| ---------- | -------------------------------------- | ------------------------------------------------------------------------ |
| 35% | TFT burning            | A mechanism used to maintain scarcity in the TFT economy.  |
| 10% | ThreeFold   | Funds allocated to promote and grow the ThreeFold Grid.    |
| 5%  | Validator Staking Pool | Rewards farmers that run TFChain 3.0 validator nodes.      |
| 50% | Solution providers & sales channel | managed by the ThreeFold DAO.             |

> Note: While the solution provider program is still active, the plan is to discontinue the program in the near future. We will update the manual as we get more information. We currently do not accept new solution providers.

## Reward Simulator

You can use the Dashboard Pricing Calculator to simulate utilization rewards. As a farmer, you will receive 50% of the utilization rewards. To simulate rewards, follow those steps:

- Access the Pricing Calculator on the Dashboard via this [link](https://dashboard.grid.tf/#/deploy/pricing-calculator/)
- Enter your node specs in the calculator
- Check the renting price over a month
- Divise the number by 2, as farmers receive 50%, to see the utilization rewards

> Note: Utilization rewards are sent to TFChain.

## ThreeFold DAO rules in Relation To Proof-of-Utilization

### TFGrid Capacity Utilization

- Each solution provider and sales channel gets registered in TFChain and as such the distribution can be defined and calculated at billing time.
- For billing purposes, ThreeFold DAO will check if it is from a known sales channel or solution provider. If yes, then the billing smart contract code will know how to distribute the TFTs. If the channel of solution provider is not known, then the 50% will go to ThreeFold.
- For Certified Farming, ThreeFold can define the solution & sales channel parameters, these are channels as provided by ThreeFold.
- Burning can be lowered to 25% if too many tokens would be burned, ThreeFold DAO consensus needs to be achieved.

### Other Ways TFT are Required

- Anyone building solutions on top of the TFGrid can use TFT as a currency to charge for the added value they provide, this gives an extra huge requirement for TFT.
- Some will use TFT as a store or exchange of value, like money, because TFT is a valuable commodity. The hoarding of TFT means that TFT are not available to be used on the TFGrid.


