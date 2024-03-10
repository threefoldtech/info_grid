
<h1>Overview</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Features](#features)
- [Testing](#testing)

***

## Introduction

Mycelium is an end-2-end encrypted IPv6 overlay network written in Rust where each node that joins the overlay network will receive an overlay network IP in the 400::/7 range.

The overlay network uses some of the core principles of the [Babel routing protocol](https://www.irif.fr/~jch/software/babel). 


## Features

- Mycelium, is locality aware, it will look for the shortest path between nodes
- All traffic between the nodes is end-2-end encrypted
- Traffic can be routed over nodes of friends, location aware
- If a physical link goes down Mycelium will automatically reroute your traffic
- The IP address is IPV6 and linked to private key
- A simple reliable messagebus is implemented on top of Mycelium
- Mycelium has multiple ways how to communicate quic, tcp, ... and we are working on holepunching for Quick which means P2P traffic without middlemen for NATted networks e.g. most homes
- Scalability is very important for us, we tried many overlay networks before and got stuck on all of them, we are trying to design a network which scales to a planetary level
- You can run mycelium without TUN and only use it as reliable message bus.

## Testing

We are looking for lots of testers to push the system. Visit the [Mycelium repository](https://github.com/threefoldtech/mycelium) to contribute.