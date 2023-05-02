## consumption report

there's no easy, friendly way yet, but to find how much you're being billed

1- you need to find the contract ID
2- ask the graphql for the consumption

example query for all contracts

```graphql
query MyQuery {
  contractBillReports {
    contractId
    amountBilled
    discountReceived
  }
}

```

And for a specific contract

```graphql
query MyQuery {
  contractBillReports(where: {contractId_eq: 10}) {
    amountBilled
    discountReceived
    contractId
  }
}

```

## consumption

```graphql
query MyQuery {
  consumptions(where: {contractId_eq: 10}) {
    contractId
    cru
    sru
    mru
    hru
    nru
  }
}
```
