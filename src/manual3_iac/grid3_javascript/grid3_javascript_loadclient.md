# Grid3 Client

grid3_client is a client used for deploying workloads (VMs, ZDBs, k8s, etc.) on grid3.

## Client Configurations

so you have to set up your configuration file to be like this:

```json
{
    "network": "dev",
    "mnemonic": "<Your mnemonic>",
    "storeSecret": "secret",
    "ssh_key": ""
}
```

## Creating/Inintializing The Grid3 Client

```ts
import type { GridClient, NetworkEnv } from "grid3_client";

async function getGrid(mnemonic: string) {
  const gridClient = new GridClient(
    {
      network: window.config.network as NetworkEnv,
      mnemonic,
      projectName:"ProjectName",
      backendStorageType: BackendStorageType.tfkvstore
    }
  );
  return await gridClient.connect();
}
```

The grid client uses `rmb-rs` tool to send requests to/from nodes.

## What is `rmb-rs` | Reliable Message Bus --rust

Reliable message bus is a secure communication panel that allows bots to communicate together in a chat like way. It makes it very easy to host a service or a set of functions to be used by anyone, even if your service is running behind NAT.

Out of the box RMB provides the following:

- Guarantee authenticity of the messages. You are always sure that the received message is from whoever is pretending to be
- End to End encryption
- Support for 3rd party hosted relays. Anyone can host a relay and people can use it safely since there is no way messages can be inspected while
using e2e. That's similar to home servers by matrix

## Grid3 Client Options

- network: `dev` for devnet, `test` for testnet
- mnemonics: used for signing the requests.
- storeSecret: used to encrypt data while storing in backeds
- BackendStorage : can be `auto` which willl automatically adapt if running in node environment to use `filesystem backend` or the browser enviornment to use `localstorage backend`. Also you can set it to `kvstore` to use the tfchain keyvalue store module.
- keypairType: is defaulted to `sr25519`, most likely you will never need to change it. `ed25519` is supported too.

for more details, check [client options](https://github.com/threefoldtech/grid3_client_ts/blob/development_adding_docs/src/client.ts)

> Note: The choice of the node is completely up to the user at this point. They need to do the capacity planning. Check [Exploring Capacity](../dashboard/explorer/explorer_home.md) to know which nodes fits your deployment criteria.

Check the document for [capacity planning using code](../javascript/grid3_javascript_capacity_planning.md) if you want to automate it
> Note: this feature is still experimental