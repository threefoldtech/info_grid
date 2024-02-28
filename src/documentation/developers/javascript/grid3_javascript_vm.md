
<h1> Deploying a VM </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Example](#example)
- [Detailed Explanation](#detailed-explanation)
  - [Building Network](#building-network)
- [Building the Disk Model](#building-the-disk-model)
- [Building the VM](#building-the-vm)
- [Building VMs Collection](#building-vms-collection)
- [deployment](#deployment)
- [Getting Deployment Information](#getting-deployment-information)
- [Deleting a Deployment](#deleting-a-deployment)

***

## Introduction

We present information on how to deploy a VM with the Javascript client with concrete examples.

## Example

```ts
import { DiskModel, FilterOptions, MachineModel, MachinesModel, NetworkModel } from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
    const grid3 = await getClient();

    // create network Object
    const n = new NetworkModel();
    n.name = "dynamictest";
    n.ip_range = "10.249.0.0/16";

    // create disk Object
    const disk = new DiskModel();
    disk.name = "dynamicDisk";
    disk.size = 8;
    disk.mountpoint = "/testdisk";

    const vmQueryOptions: FilterOptions = {
        cru: 1,
        mru: 1, // GB
        sru: 1,
        availableFor: grid3.twinId,
        country: "Belgium",
    };

    // create vm node Object
    const vm = new MachineModel();
    vm.name = "testvm";
    vm.node_id = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId; // TODO: allow random choice
    vm.disks = [disk];
    vm.public_ip = false;
    vm.planetary = true;
    vm.cpu = 1;
    vm.memory = 1024;
    vm.rootfs_size = 0;
    vm.flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist";
    vm.entrypoint = "/sbin/zinit init";
    vm.env = {
        SSH_KEY: config.ssh_key,
    };

    // create VMs Object
    const vms = new MachinesModel();
    vms.name = "dynamicVMS";
    vms.network = n;
    vms.machines = [vm];
    vms.metadata = "{'testVMs': true}";
    vms.description = "test deploying VMs via ts grid3 client";

    // deploy vms
    const res = await grid3.machines.deploy(vms);
    log(res);

    // get the deployment
    const l = await grid3.machines.getObj(vms.name);
    log(l);

    // // delete
    // const d = await grid3.machines.delete({ name: vms.name });
    // log(d);

    await grid3.disconnect();
}

main();
```

## Detailed Explanation

### Building Network

```ts
// create network Object
const n = new NetworkModel();
n.name = "dynamictest";
n.ip_range = "10.249.0.0/16";
```

Here we prepare the network model that is going to be used by specifying a name to our network and the range it will be spanning over

## Building the Disk Model

```ts
// create disk Object
const disk = new DiskModel();
disk.name = "dynamicDisk";
disk.size = 8;
disk.mountpoint = "/testdisk";
```

here we create the disk model specifying its name, size in GB and where it will be mounted eventually

## Building the VM

```ts
// create vm node Object
const vm = new MachineModel();
vm.name = "testvm";
vm.node_id = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId; // TODO: allow random choice
vm.disks = [disk];
vm.public_ip = false;
vm.planetary = true;
vm.cpu = 1;
vm.memory = 1024;
vm.rootfs_size = 0;
vm.flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist";
vm.entrypoint = "/sbin/zinit init";
vm.env = {
    SSH_KEY: config.ssh_key,
};
```

Now we go to the VM model, that will be used to build our `zmachine` object

We need to specify its

- name
- node_id: where it will get deployed
- disks: disks model collection
- memory
- root filesystem size
- flist: the image it is going to start from. Check the [supported flists](../flist/grid3_supported_flists.md)
- entry point: entrypoint command / script to execute
- env: has the environment variables needed e.g sshkeys used
- public ip: if we want to have a public ip attached to the VM
- planetary: to enable planetary network on VM

## Building VMs Collection

```ts
// create VMs Object
const vms = new MachinesModel();
vms.name = "dynamicVMS";
vms.network = n;
vms.machines = [vm];
vms.metadata = "{'testVMs': true}";
vms.description = "test deploying VMs via ts grid3 client";
```

Here it's quite simple we can add one or more VM to the `machines` property to have them deployed as part of our project

## deployment

```ts
// deploy vms
const res = await grid3.machines.deploy(vms);
log(res);
```

## Getting Deployment Information

can do so based on the name you gave to the `vms` collection

```ts
// get the deployment
const l = await grid3.machines.getObj(vms.name);
log(l);
```

## Deleting a Deployment

```ts
// delete
const d = await grid3.machines.delete({ name: vms.name });
log(d);
```

In the underlying layer we cancel the contracts that were created on the chain and as a result all of the workloads tied to his project will get deleted.
