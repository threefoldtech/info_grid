<h1> Deploying a VM with Wireguard and Gateway </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Client Configurations](#client-configurations)
- [Code Example](#code-example)
- [Detailed Explanation](#detailed-explanation)
  - [Get the Client](#get-the-client)
  - [Get the Nodes](#get-the-nodes)
  - [Deploy the VM](#deploy-the-vm)
  - [Deploy the Gateway](#deploy-the-gateway)
  - [Get the Deployments Information](#get-the-deployments-information)
  - [Disconnect the Client](#disconnect-the-client)
  - [Delete the Deployments](#delete-the-deployments)
- [Conclusion](#conclusion)

***

## Introduction

We present here the relevant information when it comes to deploying a virtual machine with Wireguard and a gateway.




## Client Configurations

To configure the client, have a look at [this section](./grid3_javascript_loadclient.md).



## Code Example

```ts
import { FilterOptions, GatewayNameModel, GridClient, MachineModel, MachinesModel, NetworkModel } from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

function createNetworkModel(gwNode: number, name: string): NetworkModel {
  return {
    name,
    addAccess: true,
    accessNodeId: gwNode,
    ip_range: "10.238.0.0/16",
  } as NetworkModel;
}
function createMachineModel(node: number) {
  return {
    name: "testvm1",
    node_id: node,
    public_ip: false,
    planetary: true,
    cpu: 1,
    memory: 1024 * 2,
    rootfs_size: 0,
    disks: [],
    flist: "https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist",
    entrypoint: "/usr/bin/python3 -m http.server --bind ::",
    env: {
      SSH_KEY: config.ssh_key,
    },
  } as MachineModel;
}
function createMachinesModel(vm: MachineModel, network: NetworkModel): MachinesModel {
  return {
    name: "newVMs",
    network,
    machines: [vm],
    metadata: "",
    description: "test deploying VMs with wireguard via ts grid3 client",
  } as MachinesModel;
}
function createGwModel(node_id: number, ip: string, networkName: string, name: string, port: number) {
  return {
    name,
    node_id,
    tls_passthrough: false,
    backends: [`http://${ip}:${port}`],
    network: networkName,
  } as GatewayNameModel;
}

async function main() {
  const grid3 = await getClient();

  const gwNode = +(await grid3.capacity.filterNodes({ gateway: true }))[0].nodeId;

  const vmQueryOptions: FilterOptions = {
    cru: 1,
    mru: 2, // GB
    availableFor: grid3.twinId,
    farmId: 1,
  };
  const vmNode = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;

  const network = createNetworkModel(gwNode, "monNetwork");
  const vm = createMachineModel(vmNode);
  const machines = createMachinesModel(vm, network);
  log(`Deploying vm on node: ${vmNode}, with network node: ${gwNode}`);

  // deploy the vm
  const vmResult = await grid3.machines.deploy(machines);
  log(vmResult);

  const deployedVm = await grid3.machines.getObj(machines.name);
  log("+++ deployed vm +++");
  log(deployedVm);

  // deploy the gateway
  const vmPrivateIP = (deployedVm as { interfaces: { ip: string }[] }[])[0].interfaces[0].ip;
  const gateway = createGwModel(gwNode, vmPrivateIP, network.name, "pyserver", 8000);
  log(`deploying gateway ${network.name} on node ${gwNode}`);

  const gatewayResult = await grid3.gateway.deploy_name(gateway);
  log(gatewayResult);

  log("+++ Deployed gateway +++");

  const deployedGw = await grid3.gateway.getObj(gateway.name);
  log(deployedGw);

  await grid3.disconnect();
}

main();

```


## Detailed Explanation

What we need to do with that code is: Deploy a name gateway with the wireguard IP as the backend; that allows accessing a server inside the vm through the gateway using the private network (wireguard) as the backend.

This will be done through the following steps:

### Get the Client

```ts
const grid3 = getClient();
```

### Get the Nodes

Determine the deploying nodes for the vm, network and gateway.

- Gateway and network access node

  ```ts
  const gwNode = +(await grid3.capacity.filterNodes({ gateway: true }))[0].nodeId;
  ```

  Using the `filterNodes` method, will get the first gateway node id, we will deploy the gateway and will use it as our network access node.

  > The gateway node must be the same as the network access node.
- VM node

  we need to set the filter options first for this example we will deploy the vm with 1 cpu, 2 GB of memory.
  now will crete a `FilterOptions` object with that specs and get the firs node id of the result.

  ```ts
    const vmQueryOptions: FilterOptions = {
    cru: 1,
    mru: 2, // GB
    availableFor: grid3.twinId,
    farmId: 1,
  };
  const vmNode = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;
  ```

### Deploy the VM

We need to create the network and machine models, the deploy the VM

```ts
const network = createNetworkModel(gwNode, "monNetwork");
const vm = createMachineModel(vmNode);
const machines = createMachinesModel(vm, network);
log(`Deploying vm on node: ${vmNode}, with network node: ${gwNode}`);

// deploy the vm
const vmResult = await grid3.machines.deploy(machines);
log(vmResult);
```

- `CreateNetWorkModel` :
 we are creating a network and set the node id to be `gwNode`, the name `monNetwork` and inside the function we set `addAccess: true` to add __wireguard__ access.

- `createMachineModel` and `createMachinesModel` is similar to the previous section of [deploying a single VM](../javascript/grid3_javascript_vm.md), but we are passing the created `NetworkModel` to the machines model and the entry point here runs a simple python server.

### Deploy the Gateway

Now we have our VM deployed with it's network, we need to make the gateway on the same node, same network and pointing to the VM's private IP address.

- Get the VM's private IP address:
  
  ```ts
  const vmPrivateIP = (deployedVm as { interfaces: { ip: string }[] }[])[0].interfaces[0].ip;
  ```

- Create the Gateway name model:
  
  ```ts
  const gateway = createGwModel(gwNode, vmPrivateIP, network.name, "pyserver", 8000);
  ```

  This will create a `GatewayNameModel` with the following properties:
  
  - `name` : the subdomain name
  - `node_id` : the gateway node id
  - `tls_passthrough: false`
  - `backends: [`http://${ip}:${port}`]` : the private ip address and the port number of our machine
  - `network: networkName` : the network name, we already created earlier.

### Get the Deployments Information

  ```ts
  const deployedVm = await grid3.machines.getObj(machines.name); 
  log("+++ deployed vm +++");
  log(deployedVm);

  log("+++ Deployed gateway +++");
  const deployedGw = await grid3.gateway.getObj(gateway.name);
  log(deployedGw);
  ```

- `deployedVm` : is an array of one object contains the details about the vm deployment.

  ```ts
  [
  {
    version: 0,
    contractId: 30658,
    nodeId: 11,
    name: 'testvm1',
    created: 1686225126,
    status: 'ok',
    message: '',
    flist: 'https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist',
    publicIP: null,
    planetary: '302:9e63:7d43:b742:3582:a831:cd41:3f19',
    interfaces: [ { network: 'monNetwork', ip: '10.238.2.2' } ],
    capacity: { cpu: 1, memory: 2048 },
    mounts: [],
    env: {
      SSH_KEY: 'ssh'
    },
    entrypoint: '/usr/bin/python3 -m http.server --bind ::',
    metadata: '{"type":"vm","name":"newVMs","projectName":""}',
    description: 'test deploying VMs with wireguard via ts grid3 client',
    rootfs_size: 0,
    corex: false
  }
  ]
  ```

- `deployedGw` : is an array of one object contains the details of the gateway name.
  
  ```ts
  [
  {
    version: 0,
    contractId: 30659,
    name: 'pyserver1',
    created: 1686225139,
    status: 'ok',
    message: '',
    type: 'gateway-name-proxy',
    domain: 'pyserver1.gent02.dev.grid.tf',
    tls_passthrough: false,
    backends: [ 'http://10.238.2.2:8000' ],
    metadata: '{"type":"gateway","name":"pyserver1","projectName":""}',
    description: ''
  }
  ]
  ```

  Now we can access the vm using the `domain` that returned in the object.

### Disconnect the Client

finally we need to disconnect the client using `await grid3.disconnect();`

### Delete the Deployments

If we want to delete the deployments we can just do this:

```ts
  const deletedMachines = await grid3.machines.delete({ name:  machines.name});
  log(deletedMachines);

  const deletedGW = await grid3.gateway.delete_name({ name: gateway.name});
  log(deletedGW);
```



## Conclusion

This section presented a detailed description on how to create a virtual machine with private IP using Wireguard and use it as a backend for a name gateway.

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.