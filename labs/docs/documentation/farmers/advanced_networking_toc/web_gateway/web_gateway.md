---
title: "Web Gateway"
sidebar_position: 198
---

# Web Gateway

ThreeFold Web Gateways solve a simple problem for users: **if your workload doesn't have public IPv4 access, it's not reachable from the public internet**.

As a farmer, you can provide gateway services using your public IPv4 addresses, allowing users to deploy workloads on any 3Node while still making them publicly accessible.

Web gateways are 3Nodes with public IPv4 addresses that act as reverse proxies, making any workload on any 3Node accessible from the regular internet - regardless of the workload's network setup.

## Documentation

- [Digital Ocean Setup](./web_gateway_digital_ocean) - Step-by-step gateway deployment guide
- [Hetzner Setup](./web_gateway_hetzner) - Setup guide with current limitations noted
- [Web Gateway Architecture](./web_gateway_architecture) - Concepts, use cases, and technical architecture

## Key Benefits

- **Public Internet Access**: Makes any workload accessible from the regular internet
- **Cost Efficiency**: Only gateways need expensive public IPv4 addresses
- **Network Flexibility**: Deploy workloads on any 3Node regardless of network setup
- **Global Availability**: Farmers worldwide provide gateway services
- **Simple Setup**: No complex networking configuration required