<h1> Farming Requirements </h1>



## Introduction

This section contains information on the farming requirements.

## Uptime Requirements

To be eligible for proof-of-capacity farming rewards, farmers need to ensure that their nodes have a minimum uptime per minting period. 

- 95% uptime requirements for DIY nodes
  - This means that nodes have 36 hours of allowed downtime per month
- 98% uptime requirements for certified nodes
  - This means that nodes have 14.4 hours of allowed downtime per month

Each minting period is 720 hours. The minimum uptime is always calculated against the duration of a full minting period. 

> We can recommend that farmers bring any new nodes online shortly before the start of a new minting period, to avoid any extra energy use during a period where the node can't possibly be eligible for minting. Consult the 2024 minting periods [here](./farming_optimization/minting_periods.md#2024-minting-periods).

### Farmerbot Considerations

When minting considers a node running the Farmerbot, it counts standby time as uptime, as long as the node is healthy. If the node fails to wake within 24 hours, those 24 hours are deducted. This means that if the node misses two different wakeup within 24 hours, it will not have sufficient uptime for this minting period. This accounts for both certified and DIY cases.