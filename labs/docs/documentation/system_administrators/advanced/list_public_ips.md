---
title: "Listing Free Public IPs"
sidebar_position: 286
---





## Introduction

Listing public IPs can be done by asking graphQL for all IPs that has `contractId = 0`

## Example

```graphql
query MyQuery {
  publicIps(where: {contractId_eq: 0}) {
    ip
  }
}
```
