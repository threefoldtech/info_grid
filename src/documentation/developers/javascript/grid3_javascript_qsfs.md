<h1>Deploying a VM with QSFS</h1>

<h2>Table of Contents</h2>

- [Prerequisites](#prerequisites)
- [Code Example](#code-example)
- [Detailed Explanation](#detailed-explanation)
  - [Getting the Client](#getting-the-client)
  - [Preparing QSFS](#preparing-qsfs)
  - [Deploying a VM with QSFS](#deploying-a-vm-with-qsfs)
  - [Getting the Deployment Information](#getting-the-deployment-information)
  - [Deleting a Deployment](#deleting-a-deployment)

***

## Prerequisites

First, make sure that you have your [client](./grid3_javascript_loadclient.md) prepared.

## Code Example

```ts
import { FilterOptions, MachinesModel, QSFSZDBSModel } from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
    const grid3 = await getClient();

    const qsfs_name = "wed2710q1";
    const machines_name = "wed2710t1";

    const vmQueryOptions: FilterOptions = {
        cru: 1,
        mru: 1, // GB
        sru: 1,
        availableFor: grid3.twinId,
        farmId: 1,
    };

    const qsfsQueryOptions: FilterOptions = {
        hru: 6,
        availableFor: grid3.twinId,
        farmId: 1,
    };

    const qsfsNodes = [];

    const allNodes = await grid3.capacity.filterNodes(qsfsQueryOptions);
    if (allNodes.length >= 2) {
        qsfsNodes.push(+allNodes[0].nodeId, +allNodes[1].nodeId);
    } else {
        throw Error("Couldn't find nodes for qsfs");
    }

    const vmNode = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;

    const qsfs: QSFSZDBSModel = {
        name: qsfs_name,
        count: 8,
        node_ids: qsfsNodes,
        password: "mypassword",
        disk_size: 1,
        description: "my qsfs test",
        metadata: "",
    };

    const vms: MachinesModel = {
        name: machines_name,
        network: {
            name: "wed2710n1",
            ip_range: "10.201.0.0/16",
        },
        machines: [
            {
                name: "wed2710v1",
                node_id: vmNode,
                disks: [
                    {
                        name: "wed2710d1",
                        size: 1,
                        mountpoint: "/mydisk",
                    },
                ],
                qsfs_disks: [
                    {
                        qsfs_zdbs_name: qsfs_name,
                        name: "wed2710d2",
                        minimal_shards: 2,
                        expected_shards: 4,
                        encryption_key: "hamada",
                        prefix: "hamada",
                        cache: 1,
                        mountpoint: "/myqsfsdisk",
                    },
                ],
                public_ip: false,
                public_ip6: false,
                planetary: true,
                cpu: 1,
                memory: 1024,
                rootfs_size: 0,
                flist: "https://hub.grid.tf/tf-official-apps/base:latest.flist",
                entrypoint: "/sbin/zinit init",
                env: {
                    SSH_KEY: config.ssh_key,
                },
            },
        ],
        metadata: "{'testVMs': true}",
        description: "test deploying VMs via ts grid3 client",
    };

    async function cancel(grid3) {
        // delete
        const d = await grid3.machines.delete({ name: machines_name });
        log(d);
        const r = await grid3.qsfs_zdbs.delete({ name: qsfs_name });
        log(r);
    }
    //deploy qsfs
    const res = await grid3.qsfs_zdbs.deploy(qsfs);
    log(">>>>>>>>>>>>>>>QSFS backend has been created<<<<<<<<<<<<<<<");
    log(res);

    const vm_res = await grid3.machines.deploy(vms);
    log(">>>>>>>>>>>>>>>vm has been created<<<<<<<<<<<<<<<");
    log(vm_res);

    // get the deployment
    const l = await grid3.machines.getObj(vms.name);
    log(">>>>>>>>>>>>>>>Deployment result<<<<<<<<<<<<<<<");
    log(l);

    // await cancel(grid3);

    await grid3.disconnect();
}

main();
```

## Detailed Explanation

We present a detailed explanation of the example shown above.

### Getting the Client

```ts
const grid3 = getClient();
```

### Preparing QSFS

```ts
const qsfs_name = "wed2710q1";
const machines_name = "wed2710t1";
```

We prepare here some names to use across the client for the QSFS and the machines project

```ts
    const qsfsQueryOptions: FilterOptions = {
        hru: 6,
        availableFor: grid3.twinId,
        farmId: 1,
    };
    const qsfsNodes = [];

    const allNodes = await grid3.capacity.filterNodes(qsfsQueryOptions);
    if (allNodes.length >= 2) {
        qsfsNodes.push(+allNodes[0].nodeId, +allNodes[1].nodeId);
    } else {
        throw Error("Couldn't find nodes for qsfs");
    }

    const vmNode = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;

    const qsfs: QSFSZDBSModel = {
        name: qsfs_name,
        count: 8,
        node_ids: qsfsNodes,
        password: "mypassword",
        disk_size: 1,
        description: "my qsfs test",
        metadata: "",
    };

const res = await grid3.qsfs_zdbs.deploy(qsfs);
log(">>>>>>>>>>>>>>>QSFS backend has been created<<<<<<<<<<<<<<<");
log(res);
```

Here we deploy `8` ZDBs on nodes `2,3` with password `mypassword`, all of them having disk size of `10GB`

### Deploying a VM with QSFS

```ts
const vmQueryOptions: FilterOptions = {
    cru: 1,
    mru: 1, // GB
    sru: 1,
    availableFor: grid3.twinId,
    farmId: 1,
};

const vmNode = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId;

 // deploy vms
const vms: MachinesModel = {
    name: machines_name,
    network: {
        name: "wed2710n1",
        ip_range: "10.201.0.0/16",
    },
    machines: [
        {
            name: "wed2710v1",
            node_id: vmNode,
            disks: [
                {
                    name: "wed2710d1",
                    size: 1,
                    mountpoint: "/mydisk",
                },
            ],
            qsfs_disks: [
                {
                    qsfs_zdbs_name: qsfs_name,
                    name: "wed2710d2",
                    minimal_shards: 2,
                    expected_shards: 4,
                    encryption_key: "hamada",
                    prefix: "hamada",
                    cache: 1,
                    mountpoint: "/myqsfsdisk",
                },
            ],
            public_ip: false,
            public_ip6: false,
            planetary: true,
            cpu: 1,
            memory: 1024,
            rootfs_size: 0,
            flist: "https://hub.grid.tf/tf-official-apps/base:latest.flist",
            entrypoint: "/sbin/zinit init",
            env: {
                SSH_KEY: config.ssh_key,
            },
        },
    ],
    metadata: "{'testVMs': true}",
    description: "test deploying VMs via ts grid3 client",
};
const vm_res = await grid3.machines.deploy(vms);
log(">>>>>>>>>>>>>>>vm has been created<<<<<<<<<<<<<<<");
log(vm_res);
```

So this deployment is almost similiar to what we have in the [vm deployment section](./grid3_javascript_vm.md). We only have a new section `qsfs_disks`

```ts
    qsfs_disks: [{
        qsfs_zdbs_name: qsfs_name,
        name: "wed2710d2",
        minimal_shards: 2,
        expected_shards: 4,
        encryption_key: "hamada",
        prefix: "hamada",
        cache: 1,
        mountpoint: "/myqsfsdisk"
    }],
```

`qsfs_disks` is a list, representing all of the QSFS disks used within that VM.

- `qsfs_zdbs_name`: that's the backend ZDBs we defined in the beginning
- `expected_shards`: how many ZDBs that QSFS should be working with
- `minimal_shards`: the minimal possible amount of ZDBs to recover the data with when losing disks e.g due to failure
- `mountpoint`: where it will be mounted on the VM `/myqsfsdisk`

### Getting the Deployment Information

```ts
const l = await grid3.machines.getObj(vms.name);
log(l);
```

### Deleting a Deployment

```ts
// delete
const d = await grid3.machines.delete({ name: machines_name });
log(d);
const r = await grid3.qsfs_zdbs.delete({ name: qsfs_name });
log(r);
```
