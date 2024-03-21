<h1>ThreeFold DAO Rules for Proof-of-Capacity</h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Technical Farming Requirements](#technical-farming-requirements)
- [Suggested: improvements to proof-of-capacity](#suggested-improvements-to-proof-of-capacity)
- [TFGrid is a DAO](#tfgrid-is-a-dao)
- [Grid Enhancement Proposal](#grid-enhancement-proposal)

***

> Note: The proof-of-capacity DAO rules will be updated for the next 3.14 grid release. Stay tuned.

## Introduction

- The CU/SU reward gets expressed in TFT and registered in TFChain at 3Node registration time
  - For certified Nodes, the CU/SU reward was specified at sales/promotion time, this process is managed by ThreeFold Tech.
- CU/SU rewards are calculated from Resource Units
  - Certified Node gets 25% more farming rewards
  - TFT pricing is pegged to USD (pricing changes in line with TFT/USD rate)
- Rewards for NU and IP Addresses are dynamic
  - The TFChain tracks capacity utilization and as such the reward can be calculated for the Farmer
- All Internet capacity farmed is rewarded on a monthly basis according to minimum service level agreements
  - Minimum SLA = Service Level Agreement (see special section about SLA) needs to be achieved before TFT can be rewarded

## Technical Farming Requirements

- Make sure you have 50GB SSD capacity min available per logical core (physical core times number of threads it can run), if not your calculated CU will be lower.
- Make sure your network connection is good enough, in future it will be measured and part of the Service Level Agreement.

{{#include tfgrid_min_sla.md}}

**Important Information around TFT USD Price Used at Registration**

This is for mainnet TFGrid 3.0:

- The TFT USD price used at 3Node registration at launch of mainnet is hardcoded in TFChain 3.0 at 0.08 USD per TFT (TFChain 3.0 as used in Jan 2022).
- Once the DAO is life, a new price will be approved by the DAO voters. Idea is to have this price re-visited more or less once a month, if needed faster.
- The TFT USD price used at 3Node registration is defined by the TFDAO at least once a month by means of GEP.

## Suggested: improvements to proof-of-capacity

Suggestions will be made to improve PoC, the DAO will have to come to consensus before changes can be made.

- How to deal with a situation where a 3node adds or removes compute or storage capacity.
- ThreeFold is developing a way of how to detect possible fraud on PoC using TPM chip and dynamic generated code to execute random PoC checks.
- If PoC finds fraud e.g. trying to fake Internet capacity provided, the 3Node will be disabled automatically by Zero-OS and flagged as fraudulant. The Farmer will then have to re-register with a lower reputation for transparancy to the ecosystem. If TFTs are staked at that time, they will be locked permanently.
- How to improve the calculation of CU rewards to mitigate the difference in power provided between new and old hardware. 


## TFGrid is a DAO

- All of above information is public and can be see by everone of the community as per 3Node and Farmer (part of TFChain).
- Farming rewards methodology can and probably will get revised if the community wants this, DAO consensus needs to be achieved before changes can happen, this happens by means of a GEP.

## Grid Enhancement Proposal

- Changes to above described mechanism or any other change request for the TFGrid is managed by grid enhancement proposals (GEP).
- Because we are a DAO, everything is open for change as long as consensus of community in accordance of TFDAO has been achieved.