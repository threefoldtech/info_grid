<h1> Deploying a VM with Mycelium Network</h1>

## Introduction

We present information on how to deploy a VM with `Mycelium network` by the Javascript client with concrete examples.

Consult the [official Mycelium repo](https://github.com/threefoldtech/mycelium) to learn more.

## Example

Here is a simple example on how to use Mycelium with the Javascript client:

```ts
import { generateRandomHexSeed, GridClient, MachinesDeleteModel, MachinesModel } from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

async function deploy(client: GridClient, vms: MachinesModel) {
  const res = await client.machines.deploy(vms);
  log("================= Deploying VM =================");
  log(res);
  log("================= Deploying VM =================");
}

async function getDeployment(client: GridClient, name: string) {
  const res = await client.machines.getObj(name);
  log("================= Getting deployment information =================");
  log(res);
  log("================= Getting deployment information =================");
}

async function cancel(client: GridClient, options: MachinesDeleteModel) {
  const res = await client.machines.delete(options);
  log("================= Canceling the deployment =================");
  log(res);
  log("================= Canceling the deployment =================");
}

async function main() {
  const name = "newMY";
  const grid3 = await getClient(`vm/${name}`);

  const vms: MachinesModel = {
    name,
    network: {
      name: "hellotest",
      ip_range: "10.249.0.0/16",
      myceliumSeeds: [
        {
          nodeId: 168,
          /**
           * ### Mycelium Network Seed:
           * - The `seed` is an optional field used to provide a specific seed for the Mycelium network.
           * - If not provided, the `GridClient` will generate a seed automatically when the `mycelium` flag is enabled.
           * - **Use Case:** If you need the new machine to have the same IP address as a previously deleted machine, you can reuse the old seed by setting the `myceliumSeed` field.
           */
          seed: generateRandomHexSeed(32),
        },
      ],
    },
    machines: [
      {
        name: "testvmMY",
        node_id: 168,
        disks: [
          {
            name: "wedDisk",
            size: 8,
            mountpoint: "/testdisk",
          },
        ],
        public_ip: false,
        public_ip6: false,
        planetary: true,
        /**
         * ### Mycelium Flag Behavior:
         * - When the `mycelium` flag is enabled, there’s no need to manually provide the `myceliumSeed` flag.
         * - The `GridClient` will automatically generate the necessary seed for you.
         * - **However**, if you have **an existing seed** from a previously deleted machine and wish to deploy a new machine that retains the same IP address,
         * - **you can simply pass in the old seed during deployment instead of calling the `generateRandomHexSeed()` function**.
         */
        mycelium: true,
        /**
         * ### Mycelium Seed:
         * - The `myceliumSeed` is an optional field used to provide a specific seed for the Mycelium network.
         * - If not provided, the `GridClient` will generate a seed automatically when the `mycelium` flag is enabled.
         * - **Use Case:** If you need the new machine to have the same IP address as a previously deleted machine, you can reuse the old seed by setting the `myceliumSeed` field.
         */
        myceliumSeed: generateRandomHexSeed(3), // (HexSeed of length 6)
        cpu: 1,
        memory: 1024 * 2,
        rootfs_size: 0,
        flist: "https://hub.grid.tf/tf-official-apps/base:latest.flist",
        entrypoint: "/sbin/zinit init",
        env: {
          SSH_KEY: config.ssh_key,
        },
      },
    ],
    metadata: "",
    description: "test deploying single VM with mycelium via ts grid3 client",
  };

  //Deploy VMs
  await deploy(grid3, vms);

  //Get the deployment
  await getDeployment(grid3, name);

  //Uncomment the line below to cancel the deployment
  // await cancel(grid3, { name });

  await grid3.disconnect();
}

main();

```

## Detailed Explanation

### What is the Mycelium Network

Mycelium is an IPv6 overlay network written in Rust. Each node that joins the overlay network will receive an overlay network IP in the 400::/7 range. 

### How to Deploy a Machine with the Mycelium Network

You just need to enable `mycelium`: set it to true as we did in the example above.

```ts
const machines = [
  {
    // Other attrs
    mycelium: true,
  }
]
```

## Summary

### Mycelium Flag Behavior

```ts
const machines = [
  {
    // Other attrs
    mycelium: true,
  }
]
```

- When the `mycelium` flag is enabled, there’s no need to manually provide the `myceliumSeed` flag.
- The `GridClient` will automatically generate the necessary seed for you.
- **However**, if you have **an existing seed** from a previously deleted machine and wish to deploy a new machine that retains the same IP address,
- **you can simply pass in the old seed during deployment instead of calling the `generateRandomHexSeed()` function**.

### Mycelium Machine Seed

```ts
const machines = [
  {
    // Other attrs
    myceliumSeed: generateRandomHexSeed(3),
  }
]
```

- The `myceliumSeed` is an optional field used to provide a specific seed for the Mycelium network.
- If not provided, the `GridClient` will generate a seed automatically when the `mycelium` flag is enabled.
- **Use Case:** If you need the new machine to have the same IP address as a previously deleted machine, you can reuse the old seed by setting the `myceliumSeed` field.

### Mycelium Network Seed

```ts
const network = {
  // Other attrs
  myceliumSeeds: [
    {
      nodeId: 1,
      seed: generateRandomHexSeed(32),
    }
  ],
}
```

- The `seed` is an optional field used to provide a specific seed for the Mycelium network.
- If not provided, the `GridClient` will generate a seed automatically when the `mycelium` flag is enabled.
- **Use Case:** If you need the new machine to have the same IP address as a previously deleted machine, you can reuse the old seed by setting the `myceliumSeed` field.
