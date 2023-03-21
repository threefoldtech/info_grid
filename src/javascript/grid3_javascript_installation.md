The [client](https://github.com/threefoldtech/grid3_client_ts) is written using typescript to provide more convinient, type-checked code and it is used to deploy workloads like Virtual machines, kubernetes clusters, quantum storage, .. etc

## Prerequisites

- node 16.13.1 or higher
- npm 8.2.0 or higher

> [nvm](https://nvm.sh/) is the recommended way for installing node.

## Installation

### External package

```bash
npm install grid3_client
```

or

```bash
yarn add grid3_client
```

### Local usage

- Clone the repository

```bash
git clone https://github.com/threefoldtech/grid3_client_ts.git
```

- Install it

```bash
npm install
```

or

```bash
yarn install
```

From now on in the document we will assume you already have

- account
- twin
- mnemonics

If you don't, please visit the [Get started section](../getstarted/tfgrid3_getstarted.md)

We provided set of scripts to play around with in the repository in the `scripts` directory.

## How to run the scripts

- Set your grid3 client configuration in `scripts/client_loader.ts` or easily use one of `config.json`
- update your customized deployments specs
- Run using [ts-node](https://www.npmjs.com/ts-node)

```bash
npx ts-node --project tsconfig-node.json scripts/zdb.ts
```

or

```bash
yarn run ts-node --project tsconfig-node.json scripts/zdb.ts
```

## Reference API

Still in progress, but you can check always [here](https://threefoldtech.github.io/grid3_client_ts/api/)
