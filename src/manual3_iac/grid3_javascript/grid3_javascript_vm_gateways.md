!!!include:grid3_javascript_loadclient

## Deploying a VM and exposing it over a Gateway Prefix

After the [deployment of a VM](grid3_javascript_vm), now it's time to expose it to the world 

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/development/scripts/name_gateway.ts


### Detailed explanation

```javascript
const gw = new GatewayNameModel();
gw.name = "ayoubtest";
gw.node_id = 1;
gw.tls_passthrough = false;
gw.backends = ["http://185.206.122.35:8000"];
```


- we created a gateway name model and gave it a `name` -that's why it's called GatewayName- `ayoubtest` to be deployed on gateway node `1` to end up with a domain `ayoubtest.ghent01.devnet.grid.tf`, 
- we create a proxy for the gateway to send the traffic coming to `example2.ghent01.devnet.grid.tf` to the backend  `http://185.206.122.35`, we say `tls_passthrough is false` to let the gateway terminate the traffic, if you replace it with `true` your backend service needs to be able to do the TLS termination

#### deploying

```typescript
// deploy
const res = await grid3.gateway.deploy_name(gw);
log(res);
```
this deploys `GatewayName` on the grid

#### getting deployment object

```typescript
const l = await grid3.gateway.getObj(gw.name);
log(l);
```
getting the deployment information can be done using `getObj`

#### deletion

```typescript
const d = await grid3.gateway.delete_name({ name: gw.name });
log(d);
```

## Deploying a VM and exposing it over a Gateway using a Full domain

After the [deployment of a VM](grid3_javascript_vm), now it's time to expose it to the world 

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/development/scripts/fqdn_gateway.ts


### Detailed explanation

```typescript
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

#### deploying

```typescript
// deploy
const res = await grid3.gateway.deploy_fqdn(gw);
log(res);
```
this deploys `GatewayName` on the grid

#### get deployment object

```typescript
const l = await grid3.gateway.getObj(gw.name);
log(l);
```
getting the deployment information can be done using `getObj`

#### deletion

```typescript
const d = await grid3.gateway.delete_fqdn({ name: gw.name });
log(d);
```

