
## Deploying Caprover Leader Node

### Example code

```ts
import { DiskModel, FilterOptions, MachineModel, MachinesModel, NetworkModel } from "../src";
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

    const CAPROVER_FLIST = "https://hub.grid.tf/tf-official-apps/tf-caprover-latest.flist";
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

    log(`You can access Caprover via the browser using: https://captain.${vm.env.CAPROVER_ROOT_DOMAIN}`);

    // // delete
    // const d = await grid3.machines.delete({ name: vms.name });
    // log(d);

    await grid3.disconnect();
}

main();
```

### Detailed explanation

So this deployment is almost similiar to what we have in the [vm deployment section](./grid3_javascript_vm.md). We only have different environment variables

#### Env. variables in Leader Node

- PUBLIC_KEY: Your public IP to be able to access the VM.
- SWM_NODE_MODE: Caprover Node type which must be `leader` as we are deploying a leader node.
- CAPROVER_ROOT_DOMAIN: The domain which you we will use to bind the deployed VM.
- DEFAULT_PASSWORD: Caprover default password you want to deploy with.

For further details about Leader node deployment please [check](https://github.com/freeflowuniverse/freeflow_caprover#a-leader-node-deploymentsetup)

## Deploying Caprover Worker Node

### Example code

```ts
import { DiskModel, FilterOptions, MachineModel, MachinesModel, NetworkModel } from "../src";
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

    const CAPROVER_FLIST = "https://hub.grid.tf/tf-official-apps/tf-caprover-latest.flist";
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
        SWMTKN: "SWMTKN-1-1eikxeyat4br9t4la1dnln11l1tvlnrngzwh5iq68m2vn7edi1-6lc6xtw3pzd99lrowyuayr5yv",
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

Before worker node deployment:

- Get token from the leader node
- Get leader node public IP

  For futher inforamtion please [check](https://github.com/freeflowuniverse/freeflow_caprover#step-4-access-the-captain-dashboard)

to deploy a worker Node it has the same details as a leader node regarding the deployment details except environment variables.

#### Env. variables in worker Node

- PUBLIC_KEY: Your public IP to be able to access the VM.
- SWM_NODE_MODE: Caprover Node type which must be `worker` as we are deploying a worker node.
- SWMTKN: Token generated on the leader node to allow the worker node to join the docker swarm network
- LEADER_PUBLIC_IP: Leader node public IP.
