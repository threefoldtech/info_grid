<h1> A Glimpse Into GraphQL </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Get Started](#get-started)
- [GraphQL Examples](#graphql-examples)
  - [Getting Many Nodes](#getting-many-nodes)
  - [Finding Gateways](#finding-gateways)
  - [Finding Farms with Public IPs](#finding-farms-with-public-ips)
  - [Finding Nodes on a Specific Farm](#finding-nodes-on-a-specific-farm)
  - [Finding Nodes by Country](#finding-nodes-by-country)
  - [Filtering Nodes with GPU Devices](#filtering-nodes-with-gpu-devices)
  - [Finding Nodes by Capacity](#finding-nodes-by-capacity)
  - [Filtering Nodes with Specific Capacity](#filtering-nodes-with-specific-capacity)
- [GraphQL and the ThreeFold Explorer](#graphql-and-the-threefold-explorer)

***

## Introduction

[GraphQL](https://graphql.org/), or Graph Query Language, is a powerful and flexible query language used for accessing and manipulating data. It serves as a fundamental component in the ThreeFold Grid ecosystem, offering a standardized and efficient means to interact with and retrieve information from various ThreeFold networks. 

GraphQL allows users to request specific data they need, making it a more dynamic alternative to traditional REST APIs.

In the context of TFGrid, GraphQL plays a pivotal role in indexing and organizing information related to TFChain, the decentralized blockchain technology powering the ThreeFold ecosystem. TFChain's data, including information about nodes, transactions, and network status, is indexed over GraphQL, providing a unified interface for querying the ThreeFold networks (Devnet, Qanet, Testnet, and Mainnet).

## Get Started

Information on TFChain is indexed over GraphQL and is available for queries.

You can query the following ThreeFold networks with GraphQL:

- [Devnet GraphQL](https://graphql.dev.grid.tf/graphql)
- [Qanet GraphQL](https://graphql.qa.grid.tf/graphql)
- [Testnet GraphQL](https://graphql.test.grid.tf/graphql)
- [Mainnet GraphQL](https://graphql.grid.tf/graphql)

The GraphQL interface used to query TF-Chain is the one offered by [Subsquid](https://docs.subsquid.io/). See more info on supported queries [here](https://docs.subsquid.io/query-squid/).

***

## GraphQL Examples

We present here some example on how to use GraphQL to query the ThreeFold Grid and find suitable nodes depending on your specific needs.
***
### Getting Many Nodes

```graphql
query MyQuery {
  nodes(orderBy: nodeId_ASC, limit: 5000, where: {
      cru_gt: "2", hru_gt: "500000000", mru_gt: "50000000", sru_gt: "1000000000", 
      deletedAt_eq: null
    }) 
    {
    twinId
    city
    certificationType
    country
    created
    createdById
    cru
    farmId
    hru
    id
    uptime
    version
    mru
    sru
    nodeId
    interfaces {
      ips
      name
      node {
        city
        country
        cru
        hru
        sru
        mru
      }
    }
    location {
      latitude
      longitude
    }
    publicConfig {
      domain
      gw4
      gw6
      ipv4
      ipv6
    }
    deletedById
  }
}


```
***
### Finding Gateways

gateway typically needs to be a node with public ipv4 or ipv6 and a domain configured otherwise it won't be able to create `NameContracts`

```graphql
 query MyQuery {
  nodes {
    nodeId
    publicConfig {
      domain
      ipv4
    }
  }
}
```
***
### Finding Farms with Public IPs

```graphql
query MyQuery {
  farms {
    farmId
    name

    publicIPs {
      ip
      
    }
  }
}

```
***
### Finding Nodes on a Specific Farm

```graphql
query MyQuery {
  nodes(where: {farmId_eq: 1}) {
    twinId
  }
}
```
***
### Finding Nodes by Country

```graphql
query MyQuery {
  nodes(where: {country_eq: "BE"}) {
    twinId
  }
}
```
***
### Filtering Nodes with GPU Devices

```graphql
query MyQuery {
  nodes(where: {hasGpu_eq: true}) {
    hasGpu
    id
  }
}
```

***
### Finding Nodes by Capacity

```graphql
query MyQuery {
  nodes() {
    cru,
    hru,
    mru,
    sru,
  }
}

```

> Note that the cru are in bytes.
***
### Filtering Nodes with Specific Capacity

```graphql
query MyQuery {
  nodes(where: {cru_gt: "2", hru_gt: "500000000", mru_gt: "50000000", sru_gt: "1000000000"}) {
    nodeId
    cru
    hru
    mru
    sru
  }
}

```

> Note that the cru are in bytes.

***

## GraphQL and the ThreeFold Explorer

Note that most of those examples have their equivalent searches available in our [ThreeFold Explorer](https://dashboard.grid.tf/explorer/nodes).
