## client configurations

grid 3 client supports communication over RMB `MessageBusClient` or HTTP `HTTPMessageBusClient` using one of the deployed grid3 proxies.


```typescript
import fs from "fs";
import path from "path";
import { GridClient } from "../src/client";

import { MessageBusClientInterface } from "ts-rmb-client-base";
import { HTTPMessageBusClient } from "ts-rmb-http-client";
import { MessageBusClient } from "ts-rmb-redis-client";

```

So according to your scenario you choose the communication method

## example configuration object

```json
{
    "network": "dev",
    "mnemonic": "",
    "rmb_proxy": true,
    "storeSecret": "secret"
}
```

So all configurations that is needed are
- network: `dev` for devnet, `test` for testnet
- mnemonics
- rmb_proxy: to use the https RMB proxy to reduce the dependencies on having `redis` and `yggrassil` on the same host, and also to be usable too from the browser if needed.

## creating a client

```typescript
async function getClient(): Promise<GridClient> {
    let rmb: MessageBusClientInterface;
    if (config.rmb_proxy) {
        rmb = new HTTPMessageBusClient(0, "");
    } else {
        rmb = new MessageBusClient();
    }
    const gridClient = new GridClient(config.network, config.mnemonic, config.storeSecret, rmb, "", BackendStorageType.auto, KeypairType.sr25519);
    await gridClient.connect();
    return gridClient;
}
```
The grid client requires a communication transport, the availlable options are `MessageBusClient` that works over the RMB, and `HTTPMessageBusClient` using relay proxies 

> HTTPMessageBusClient is very highlevel, and allows easier integration with many languages because it's http based, also it enables the whole space of web applications. It's safe to assume that we will be using it from now on.

- communication transport: RMB or over RMB proxy via HTTP
- network: `dev` for devnet, `test` for testnet
- mnemonics: used for signing the requests.
- storeSecret: used to encrypt data while storing in backeds
- BackendStorage : can be `auto` which willl automatically adapt if running in node environment to use `filesystem backend` or the browser enviornment to use `localstorage backend`. Also you can set it to `kvstore` to use the tfchain keyvalue store module.
- keypairType: is defaulted to `sr25519`, most likely you will never need to change it. `ed25519` is supported too.



> Note: The choice of the node is completely up to the user at this point. They need to do the capacity planning. Check [Exploring Capacity](../dashboard/explorer/explorer_home.md) to know which nodes fits your deployment criteria.

Check the document for [capacity planning using code](../javascript/grid3_javascript_capacity_planning.md) if you want to automate it
> Note: this feature is still experimental