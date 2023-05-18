# Canceling contracts

## Playground

Read about [How to cancle all contracts from the playground](/weblets/weblets_cancel_contracts.md)

## Graphql

from the graphql service execute the following query.

```
query MyQuery {

  nodeContracts(where: {twinId_eq: TWIN_ID, state_eq: Created}) {
    contractId
  }
}

```

replace `TWIN_ID` with your twin id. the information should be available on the [Dashboard](/dashboard/dashboard.md)

then from [polkadot UI](https://polkadot.js.org/apps/), add the tfchain endpoint to development

![](img/polka_web_add_development_url.png)

go to extrinsics, choose the smartContract module and cancelContract extrinsic and use the IDs from graphql to execute the cancelation

![](img/polka_web_cancel_contracts.jpg)

## Cancelling Contracts Using `grid3_client_ts

In order to use the `grid3_client_ts` module, it is essential to first clone our official mono-repo containing the module and then navigate to it. If you are looking for a quick and efficient way to cancel contracts, we offer a code-based solution that can be found [here](https://github.com/threefoldtech/tfgrid-sdk-ts/blob/development/packages/grid_client/scripts/delete_all_contracts.ts).

To make the most of `grid_client`, we highly recommend following our [Grid-Client guide](https://github.com/threefoldtech/tfgrid-sdk-ts/blob/development/packages/grid_client/README.md) for a comprehensive overview of the many advanced capabilities offered by this powerful tool. With features like contract creation, modification, and retrieval, `grid_client` provides an intuitive and easy-to-use solution for managing your contracts effectively.
