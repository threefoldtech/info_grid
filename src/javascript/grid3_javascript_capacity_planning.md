## capacity planning

It's almost the same as in [deploying a single VM](../javascript/grid3_javascript_vm.md) the only difference is you can automate the choice of the node to deploy on using code. We now support `FilterOptions` to filter nodes based on specific criteria e.g the node resources (CRU, SRU, HRU, MRU) or being part of a specific farm or located in some country, or being a gateway or not 


```
FilterOptions: { accessNodeV4?: boolean; accessNodeV6?: boolean; city?: string; country?: string; cru?: number; farm?: number; gateway?: boolean; hru?: number; mru?: number; sru?: number }
```


```
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
        mru: 2, // GB
        country: "Belgium",
    };

    // create vm node Object
    const vm = new MachineModel();
    vm.name = "testvm";
    vm.node_id = +(await grid3.capacity.filterNodes(vmQueryOptions))[0].nodeId; // TODO: allow random choise
    vm.disks = [disk];
    vm.public_ip = false;
    vm.planetary = true;
    vm.cpu = 1;
    vm.memory = 1024 * 2;
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

In this example you can notice the criteria for `server1`

```typescript
const server1_options: FilterOptions = {
    cru: 1,
    mru: 2, // GB
    country: "Belgium",
};

```

Here we want all the nodes with `CRU:20` and `MRU:100` and located in `Belgium`

> Note some libraries allow reverse lookup of countries codes by name e.g [i18n-iso-countries](https://www.npmjs.com/package/i18n-iso-countries)


and then in the MachineModel, we specified the `node_id` to be the first value of our filteration 


```typescript
vm.node_id = +(await nodes.filterNodes(server1_options))[0].nodeId;
```

