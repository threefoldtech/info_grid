---
title: Farming FAQ
sidebar_position: 5
description: Relevant questions and answers concerning ThreeFold v3farming.
---

# ThreeFold Farming Frequently Asked Questions

## General Farming Questions

### What is ThreeFold farming?
ThreeFold farming is the process of connecting hardware (3Nodes) to the ThreeFold Grid to provide decentralized compute and storage capacity. Farmers earn ThreeFold Tokens (TFT) through both proof-of-capacity rewards and utilization rewards.

### How do I become a farmer on the ThreeFold Grid?
You can become a farmer by either buying a certified node from an [official ThreeFold vendor](./3node_buying/order_a_node) or by [building your own DIY 3Node](category/build-a-3node) following the documentation.

## V3 Farming Questions

### How are farming rewards distributed?
Farming rewards are sent to your farming wallet around the 8th of each month. This can vary depending on the situation. The minting is done automatically by code and verified by humans as a double check.

### What are the uptime requirements for capacity rewards?
To be eligible for proof-of-capacity farming rewards, your nodes need to meet minimum uptime requirements:
- DIY nodes: 95% uptime (36.5 hours of allowed downtime per month)
- Certified nodes: 98% uptime (14.6 hours of allowed downtime per month)

### Where are the utilization rewards distributed?

Utilization rewards are distributed to the TFChain wallet associated with the farm's twin.

### Where are the capacity rewards distributed?

Capacity rewards are distributed to the Stellar wallet associated with the farm's twin.

### How do utilization rewards work?
50% of proof-of-utilization rewards go to the farmer running the 3Node. This means farmers get paid in TFT 50% of what is spent to utilize their nodes.

### When do I receive utilization rewards?
Payments go to the TFChain wallet associated with the farm's twin. Billing usually happens every hour, but funds are deposited into the farmer's wallet less frequently, typically between 5 to 16 hours.

### Is there a way to track utilization rewards?
Currently, there is no specific way to gather information on these payments. If you're not using your wallet for anything else than farming (i.e., not deploying workloads), you'll be able to see the TFT amount in your wallet accumulate.

### Why does my 3Node get stuck at "Initializing Network Device" in UEFI mode?
Booting the 3Node in BIOS mode instead of UEFI mode usually fixes this issue. Make a bootable USB with the BIOS option from the Zero-OS bootstrap image page and ensure your server boots using BIOS, not UEFI.

### How do I fix the error "Network configuration succeed but Zero-OS kernel could not be downloaded"?
Try restarting your router and rebooting the 3Node. If the issue persists, check if your router is still functional, as this error can occur when your router is malfunctioning.

### What does the error "no route with default gateway found" mean?
This error usually indicates that your 3Node has difficulty reaching the ThreeFold Grid. Ensure you have a direct connection with your Internet Service Provider (ISP) via an ethernet cable (WiFi doesn't work) and verify your DHCP is set correctly.

### How can I access the Error/Log Screen on my 3Node?
Connect a monitor to your 3Node and on the Zero-OS console, press Alt+F2 to open the Error/Log Screen. Press Alt+F3 to go back to the main screen.

## Disclaimer

Bugs in the code (e.g., Zero-OS or other components) can happen. If this occurs, there might be a loss of tokens during minting which won't be refunded by ThreeFold. If there are minting code errors, ThreeFold will try its best to fix the minting code and remint nodes that were affected by such errors.

Farmers are solely responsible for the hardware they use to build their nodes. ThreeFold makes no warranties or representations regarding the compatibility, performance, or reliability of any specific hardware. Thorough research and testing are recommended before building your node.