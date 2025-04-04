---
title: Features Mycelium Network
sidebar_position: 1
---

Mycelium is a locality-aware, end-to-end encrypted network designed for efficient and secure communication between nodes. Below are its key features:

## What Makes Mycelium Unique

1. **Locality Awareness**  
   Mycelium identifies the shortest path between nodes, optimizing communication based on location.

2. **End-to-End Encryption**  
   All traffic between nodes is encrypted, ensuring secure data transmission.

3. **Traffic Routing Over Friend Nodes**  
   Traffic can be routed through nodes of trusted friends, maintaining location awareness.

4. **Automatic Rerouting**  
   If a physical link fails, Mycelium automatically reroutes traffic to ensure uninterrupted connectivity.

5. **Your network Address Linked to Private Key**  
   Each node is assigned an IPv6 network address that is cryptographically linked to its private key.

6. **Scalability**  

   Mycelium is designed to scale to a planetary level. The team has evaluated multiple overlay networks in the past and is focused on overcoming scalability challenges.

## Tech

1.  **Flexible Deployment**  
   Mycelium can be run without a TUN interface, allowing it to function solely as a reliable message bus.

2. **Reliable Message Bus**  
   Mycelium includes a simple and reliable message bus built on top of its network layer.

1. **Multiple Communication Protocols**   
   Mycelium supports various communication methods, including QUIC and TCP. The team is also developing hole-punching for QUIC, enabling direct peer-to-peer (P2P) traffic without intermediaries.
