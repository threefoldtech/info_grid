<h1> Deploying a VM and exposing it over a Gateway Prefix </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Example code](#example-code)
- [Detailed explanation](#detailed-explanation)
  - [deploying](#deploying)
  - [getting deployment object](#getting-deployment-object)
  - [deletion](#deletion)
- [Deploying a VM and exposing it over a Gateway using a Full domain](#deploying-a-vm-and-exposing-it-over-a-gateway-using-a-full-domain)
- [Example code](#example-code-1)
- [Detailed explanation](#detailed-explanation-1)
  - [deploying](#deploying-1)
  - [get deployment object](#get-deployment-object)
  - [deletion](#deletion-1)

***

## Introduction

After the [deployment of a VM](./grid3_javascript_vm.md), now it's time to expose it to the world

## Example code

```ts
import { FilterOptions, GatewayNameModel } from "../src";
import { getClient } from "./client_loader";
import { log } from "./utils";

// read more about the gateway types in this doc: https://github.com/threefoldtech/zos/tree/main/docs/gateway
async function main() {
    const grid3 = await getClient();

    const gatewayQueryOptions: FilterOptions = {
        gateway: true,
        farmId: 1,
    };

    const gw = new GatewayNameModel();
    gw.name = "test";
    gw.node_id = +(await grid3.capacity.filterNodes(gatewayQueryOptions))[0].nodeId;
    gw.tls_passthrough = false;
    // the backends have to be in this format `http://ip:port` or `https://ip:port`, and the `ip` pingable from the node so using the ygg ip or public ip if available.
    gw.backends = ["http://185.206.122.35:8000"];

    // deploy
    const res = await grid3.gateway.deploy_name(gw);
    log(res);

    // get the deployment
    const l = await grid3.gateway.getObj(gw.name);
    log(l);

    // // delete
    // const d = await grid3.gateway.delete_name({ name: gw.name });
    // log(d);

    grid3.disconnect();
}

main();

```

## Detailed explanation

```ts
const gw = new GatewayNameModel();
gw.name = "test";
gw.node_id = +(await grid3.capacity.filterNodes(gatewayQueryOptions))[0].nodeId;
gw.tls_passthrough = false;
gw.backends = ["http://185.206.122.35:8000"];
```

- we created a gateway name model and gave it a `name` -that's why it's called GatewayName- `test` to be deployed on gateway node to end up with a domain `test.gent01.devnet.grid.tf`,
- we create a proxy for the gateway to send the traffic coming to `test.ghent01.devnet.grid.tf` to the backend  `http://185.206.122.35`, we say `tls_passthrough is false` to let the gateway terminate the traffic, if you replace it with `true` your backend service needs to be able to do the TLS termination

### deploying

```ts
// deploy
const res = await grid3.gateway.deploy_name(gw);
log(res);
```

this deploys `GatewayName` on the grid

### getting deployment object

```ts
const l = await grid3.gateway.getObj(gw.name);
log(l);
```

getting the deployment information can be done using `getObj`

### deletion

```ts
const d = await grid3.gateway.delete_name({ name: gw.name });
log(d);
```

## Deploying a VM and exposing it over a Gateway using a Full domain

After the [deployment of a VM](./grid3_javascript_vm.md), now it's time to expose it to the world

## Example code

```ts
import { FilterOptions, GatewayFQDNModel } from "../src";
import { getClient } from "./client_loader";
import { log } from "./utils";

// read more about the gateway types in this doc: https://github.com/threefoldtech/zos/tree/main/docs/gateway
async function main() {
    const grid3 = await getClient();

    const gatewayQueryOptions: FilterOptions = {
        gateway: true,
        farmId: 1,
    };
    const gw = new GatewayFQDNModel();
    gw.name = "applyFQDN";
    gw.node_id = +(await grid3.capacity.filterNodes(gatewayQueryOptions))[0].nodeId;
    gw.fqdn = "test.hamada.grid.tf";
    gw.tls_passthrough = false;
    // the backends have to be in this format `http://ip:port` or `https://ip:port`, and the `ip` pingable from the node so using the ygg ip or public ip if available.
    gw.backends = ["http://185.206.122.35:8000"];

    // deploy
    const res = await grid3.gateway.deploy_fqdn(gw);
    log(res);

    // get the deployment
    const l = await grid3.gateway.getObj(gw.name);
    log(l);

    // // delete
    // const d = await grid3.gateway.delete_fqdn({ name: gw.name });
    // log(d);

    grid3.disconnect();
}

main();
```

## Detailed explanation

```ts
const gw = new GatewayFQDNModel();
gw.name = "applyFQDN";
gw.node_id = 1;
gw.fqdn = "test.hamada.grid.tf";
gw.tls_passthrough = false;
gw.backends = ["my yggdrasil IP"];
```

- we created a `GatewayFQDNModel` and gave it a name `applyFQDNN` to be deployed on gateway node `1` and specified the fully qualified domain `fqdn` to a domain we own `test.hamada.grid.tf`
- we created a record on our name provider for `test.hamada.grid.tf` to point to the IP of gateway node `1`
- we specified the backened would be an yggdrassil ip so once this is deployed when we go to `test.hamada.grid.tf` we go to the gateway server and from their our traffic goes to the backend.

### deploying

```ts
// deploy
const res = await grid3.gateway.deploy_fqdn(gw);
log(res);
```

this deploys `GatewayName` on the grid

### get deployment object

```ts
const l = await grid3.gateway.getObj(gw.name);
log(l);
```

getting the deployment information can be done using `getObj`

### deletion

```ts
const d = await grid3.gateway.delete_fqdn({ name: gw.name });
log(d);
```
