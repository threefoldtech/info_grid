# Listing Public IPs

Listing public IPs can be done by asking graphQL for all IPs that has `contractId = 0`

```graphql
query MyQuery {
  publicIps(where: {contractId_eq: 0}) {
    ip
  }
}
```
