![](img/farming_rewards_.png)

# ThreeFold DAO rules for Proof of Capacity

- The CU/SU reward gets expressed in TFT and registered in TFChain at 3Node registration time.
  - For certified Nodes, the CU/SU reward was specified at sales/promotion time, this process is managed by threefold_tech. 
  - The rewards per CU/SU are fixed over time for 5 years (\*).
- CU/SU rewards are calculated from Resource Units, [IMPORTANT see this doc](./proof_of_capacity.md#poc-rewards)
  - Certified Node gets 25% more farming rewards.
  - TFT pricing is pegged to USD (pricing changes in line with TFT/USD rate)
- Rewards for NU and IP Addresses are dynamic
  - The TFChain tracks capacity utilization and as such the reward can be calculated for the Farmer.
- All CU/SU rewards are staked (locked to farmer account) until 30% (measured over 3 months) is used or 24 months since registration. 
- All Internet capacity farmed is rewarded on a monthly basis according to minimum service level agreements.
  - Minimum SLA = Service Level Agreement (see special section about SLA) needs to be achieved before TFT can be rewarded.
- Automatic Farming Reward Staking, see below.

## Technical Farming Requirements

- Make sure you have 50GB SSD capacity min available per logical core (physical core times number of threads it can run), if not your calculated CU will be lower.
- Make sure your network connection is good enough, in future it will be measured and part of the Service Level Agreement.

{{#include tfgrid_min_sla.md}}

## Automatic staking of farming rewards

- Farmed TFT are automatically staked (locked) per 3Node and are released to the farmer once the 3Node achieves 30% utilization over a period of 3 months or if it remainded connected for 24 months.
- Certified farmers can be exempted of the staking pool for achieving specific tasks such as bringing Internet capacity to new regions or upgrading from grid 2.0 to 3.0.
- If you delete your 3Node, the staked tokens will remain on your name and come available after 24 months since start.
- If a 3Node achieves 30% for 3 months but month after is again lower, then staking will happen again.

**Important Information around TFT USD Price Used at Registration**

This is for mainnet TFGrid 3.0:

- The TFT USD price used at 3Node registration at launch of mainnet is hardcoded in TFChain 3.0 at 0.08 USD per TFT (TFChain 3.0 as used in Jan 2022).
- Once the DAO is life, a new price will be approved by the DAO voters. Idea is to have this price re-visited +- once a month, if needed faster.
- The TFT USD price used at 3Node registration is defined by the TFDAO at least once a month by means of GEP.


## Remarks

- Majority of 3Nodes are still registered on the [ThreeFold Grid v2 farming reward](./farming_reward2.md). The transition to ThreeFold Grid v3 farming rewards is expected for Q1 2022. More information about the upgrade can be found [here](farming_upgrade_2_3).
- The above described Farming Rewards are for ThreeFold Grid version 3.0.x on mainnet and will only apply for 3Nodes as registered in TF Chain for mainnet 3.0.x. Before this all farming is done using 2.x farming rules even on 3.x Testnet and 3.0 mainnet.
- Above specifications will only be final once DAO is active and first vote has happened (expected Feb/March 2022).
- More information about the upgrade see: [Upgrade from farming 2 to farming 3](farming_upgrade_2_3)

## Suggested: improvements to proof-of-capacity

Suggestions will be made to improve PoC, the DAO will have to come to consensus before changes can be made.

- How to deal with a situation where a 3node adds or removes compute or storage capacity.
- ThreeFold is developing a way of how to detect possible fraud on PoC using TPM chip and dynamic generated code to execute random PoC checks, more details will be provided in Q1 2022.
- If PoC finds fraud e.g. trying to fake Internet capacity provided, the 3Node will be disabled automatically by Zero-OS and flagged as fraudulant. The Farmer will then have to re-register with a lower reputation for transparancy to the ecosystem. If TFTs are staked at that time, they will be locked permanently.
- How to improve the calculation of CU rewards to mitigate the difference in power provided between new and old hardware. 


## TFGrid is a DAO

- All of above information is public and can be see by everone of the community as per 3Node and Farmer (part of TFChain).
- Farming rewards methodology can and probably will get revised if the community wants this, DAO consensus needs to be achieved before changes can happen, this happens by means of a GEP.

## Grid Enhancement Proposal (\*)

- Changes to above described mechanism or any other change request for the TFGrid is managed by gep.
- Because we are a DAO, everything is open for change as long as consensus of community in accordance of TFDAO has been achieved.


<!-- 
## Link to Utilization of TFGrid

- Farmers can also use their own Internet capacity at minimal cost. Learn more on [Personal Farm Utilization](- Farmers can also use their own Internet capacity at minimal cost. Learn more on [Personal Farm Utilization](farmer_personal_utilization).
).
 -->
