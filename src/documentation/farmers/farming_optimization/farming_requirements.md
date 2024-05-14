<h1> Farming Requirements </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Uptime Requirements](#uptime-requirements)
  - [Farmerbot Consideration](#farmerbot-consideration)
 
---

## Introduction

This section contains information on the farming requirements.

## Uptime Requirements

To be eligible for proof-of-capacity farming rewards, farmers need to ensure that their nodes have a minimum uptime per minting period.

- 95% uptime requirements for DIY nodes
  - This means that nodes have 36 hours of allowed downtime per month
- 98% uptime requirements for certified nodes
  - This means that nodes have 14.4 hours of allowed downtime per month

A minting period is 720 hours. 

### Farmerbot Consideration

When minting considers a node running the Farmerbot, it counts standby time as uptime, as long as the node is healthy. If the node fails to wake within 24 hours, those 24 are deducted. This means that if the node misses two different wakeup within 24 hours, it will not have sufficient uptime for this minting period. This accounts for both certified and DIY cases.