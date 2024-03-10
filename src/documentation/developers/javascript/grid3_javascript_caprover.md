<h1> Deploy CapRover </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Leader Node](#leader-node)
  - [Code Example](#code-example)
  - [Environment Variables](#environment-variables)
- [Worker Node](#worker-node)
  - [Code Example](#code-example-1)
  - [Environment Variables](#environment-variables-1)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this section, we show how to deploy CapRover with the Javascript client.

This deployment is very similar to what we have in the section [Deploy a VM](./grid3_javascript_vm.md), but the environment variables are different.

## Leader Node

We present here a code example and the environment variables to deploy a CapRover Leader node. 

For further details about the Leader node deployment, [read this documentation](https://github.com/freeflowuniverse/freeflow_caprover#a-leader-node-deploymentsetup).

### Code Example

```ts
import {
  DiskModel,
  FilterOptions,
  MachineModel,
  MachinesModel,
  NetworkModel,
} from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
  const grid3 = await getClient();

  const vmQueryOptions: FilterOptions = {
    cru: 4,
    mru: 4, // GB
    sru: 10,
    farmId: 1,
  };

  const CAPROVER_FLIST =
    "https://hub.grid.tf/tf-official-apps/tf-caprover-latest.flist";
  // create network Object
  const n = new NetworkModel();
  n.name = "wedtest";
  n.ip_range = "10.249.0.0/16";

  // create disk Object
  const disk = new DiskModel();
  disk.name = "wedDisk";
  disk.size = 10;
  disk.mountpoint = "/var/lib/docker";

  // create vm node Object
  const vm = new MachineModel();
  vm.name = "testvm";
  vm.node_id = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;
  vm.disks = [disk];
  vm.public_ip = true;
  vm.planetary = false;
  vm.cpu = 4;
  vm.memory = 1024 * 4;
  vm.rootfs_size = 0;
  vm.flist = CAPROVER_FLIST;
  vm.entrypoint = "/sbin/zinit init";
  vm.env = {
    PUBLIC_KEY: config.ssh_key,
    SWM_NODE_MODE: "leader",
    CAPROVER_ROOT_DOMAIN: "rafy.grid.tf", // update me
    DEFAULT_PASSWORD: "captain42",
    CAPTAIN_IMAGE_VERSION: "latest",
  };

  // create VMs Object
  const vms = new MachinesModel();
  vms.name = "newVMS5";
  vms.network = n;
  vms.machines = [vm];
  vms.metadata = "{'testVMs': true}";
  vms.description = "caprover leader machine/node";

  // deploy vms
  const res = await grid3.machines.deploy(vms);
  log(res);

  // get the deployment
  const l = await grid3.machines.getObj(vms.name);
  log(l);

  log(
    `You can access Caprover via the browser using: https://captain.${vm.env.CAPROVER_ROOT_DOMAIN}`
  );

  // // delete
  // const d = await grid3.machines.delete({ name: vms.name });
  // log(d);

  await grid3.disconnect();
}

main();
```



### Environment Variables

- PUBLIC_KEY: Your public IP to be able to access the VM.
- SWM_NODE_MODE: Caprover Node type which must be `leader` as we are deploying a leader node.
- CAPROVER_ROOT_DOMAIN: The domain which you we will use to bind the deployed VM.
- DEFAULT_PASSWORD: Caprover default password you want to deploy with.



## Worker Node

We present here a code example and the environment variables to deploy a CapRover Worker node. 

Note that before deploying the Worker node, you should check the following:

- Get the Leader node public IP address.
- The Worker node should join the cluster from the UI by adding public IP address and the private SSH key.

For further information, [read this documentation](https://github.com/freeflowuniverse/freeflow_caprover#step-4-access-the-captain-dashboard).

### Code Example

```ts
import {
  DiskModel,
  FilterOptions,
  MachineModel,
  MachinesModel,
  NetworkModel,
} from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
  const grid3 = await getClient();

  const vmQueryOptions: FilterOptions = {
    cru: 4,
    mru: 4, // GB
    sru: 10,
    farmId: 1,
  };

  const CAPROVER_FLIST =
    "https://hub.grid.tf/tf-official-apps/tf-caprover-latest.flist";
  // create network Object
  const n = new NetworkModel();
  n.name = "wedtest";
  n.ip_range = "10.249.0.0/16";

  // create disk Object
  const disk = new DiskModel();
  disk.name = "wedDisk";
  disk.size = 10;
  disk.mountpoint = "/var/lib/docker";

  // create vm node Object
  const vm = new MachineModel();
  vm.name = "capworker1";
  vm.node_id = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;
  vm.disks = [disk];
  vm.public_ip = true;
  vm.planetary = false;
  vm.cpu = 4;
  vm.memory = 1024 * 4;
  vm.rootfs_size = 0;
  vm.flist = CAPROVER_FLIST;
  vm.entrypoint = "/sbin/zinit init";
  vm.env = {
    // These env. vars needed to be changed based on the leader node.
    PUBLIC_KEY: config.ssh_key,
    SWM_NODE_MODE: "worker",
    LEADER_PUBLIC_IP: "185.206.122.157",
    CAPTAIN_IMAGE_VERSION: "latest",
  };

  // create VMs Object
  const vms = new MachinesModel();
  vms.name = "newVMS6";
  vms.network = n;
  vms.machines = [vm];
  vms.metadata = "{'testVMs': true}";
  vms.description = "caprover worker machine/node";

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



### Environment Variables

The deployment of the Worker node is similar to the deployment of the Leader node, with the exception of the environment variables which differ slightly.

- PUBLIC_KEY: Your public IP to be able to access the VM.
- SWM_NODE_MODE: Caprover Node type which must be `worker` as we are deploying a worker node.
- LEADER_PUBLIC_IP: Leader node public IP.



## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.