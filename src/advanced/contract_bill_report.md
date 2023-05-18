# Contract Billing Rate (Playground)

Now you can check the billing rate of your contracts directly from the `Contracts` tab in the playground.

> It takes an hour for the contract to display the billing rate (Until it reaches the first billing cycle).

The `Billing Rate` is displayed in `TFT/Hour`

![image](img/billing_rate.png)

## Contract Billing Report (graphql)

- you need to find the contract ID
- ask the graphql for the consumption

> example query for all contracts

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
