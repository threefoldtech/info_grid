Info on TFChain is indexed over GraphQL and is available for queries. 

- [Devnet GraphQL](https://graphql.dev.grid.tf/graphql)
- [Qanet GraphQL](https://graphql.qa.grid.tf/graphql)
- [Testnet GraphQL](https://graphql.test.grid.tf/graphql)
- [Mainnet GraphQL](https://graphql.grid.tf/graphql)


## getting lots of nodes

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

##  finding  gateways

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

## finding farms with public IPs

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

## finding nodes on a specific farm


```graphql
query MyQuery {
  nodes(where: {farmId_eq: 1}) {
    twinId
  }
}
```

##  finding nodes  with country

```graphql
query MyQuery {
  nodes(where: {country_eq: "BE"}) {
    twinId
  }
}
```

## finding nodes  with capacity

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

the cru/... are in bytes !

##  filtering nodes with capacity

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

the cru/... are in bytes !

> NOTE: most of this is available on our [explorer portal](explorer_home).