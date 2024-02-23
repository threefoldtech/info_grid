<h1> Deploying a Kubernetes Cluster </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Example code](#example-code)
- [Detailed explanation](#detailed-explanation)
  - [Building network](#building-network)
  - [Building nodes](#building-nodes)
  - [Building cluster](#building-cluster)
  - [Deploying](#deploying)
  - [Getting deployment information](#getting-deployment-information)
  - [Deleting deployment](#deleting-deployment)

***

## Introduction

We show how to deploy a Kubernetes cluster on the TFGrid with the Javascript client.

## Prerequisites

- Make sure you have your [client](./grid3_javascript_loadclient.md) prepared

## Example code

```ts
import { FilterOptions, K8SModel, KubernetesNodeModel, NetworkModel } from "../src";
import { config, getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
    const grid3 = await getClient();

    // create network Object
    const n = new NetworkModel();
    n.name = "monNetwork";
    n.ip_range = "10.238.0.0/16";
    n.addAccess = true;

    const masterQueryOptions: FilterOptions = {
        cru: 2,
        mru: 2, // GB
        sru: 2,
        availableFor: grid3.twinId,
        farmId: 1,
    };

    const workerQueryOptions: FilterOptions = {
        cru: 1,
        mru: 1, // GB
        sru: 1,
        availableFor: grid3.twinId,
        farmId: 1,
    };

    // create k8s node Object
    const master = new KubernetesNodeModel();
    master.name = "master";
    master.node_id = +(await grid3.capacity.filterNodes(masterQueryOptions))[0].nodeId;
    master.cpu = 1;
    master.memory = 1024;
    master.rootfs_size = 0;
    master.disk_size = 1;
    master.public_ip = false;
    master.planetary = true;

    // create k8s node Object
    const worker = new KubernetesNodeModel();
    worker.name = "worker";
    worker.node_id = +(await grid3.capacity.filterNodes(workerQueryOptions))[0].nodeId;
    worker.cpu = 1;
    worker.memory = 1024;
    worker.rootfs_size = 0;
    worker.disk_size = 1;
    worker.public_ip = false;
    worker.planetary = true;

    // create k8s Object
    const k = new K8SModel();
    k.name = "testk8s";
    k.secret = "secret";
    k.network = n;
    k.masters = [master];
    k.workers = [worker];
    k.metadata = "{'testk8s': true}";
    k.description = "test deploying k8s via ts grid3 client";
    k.ssh_key = config.ssh_key;

    // deploy
    const res = await grid3.k8s.deploy(k);
    log(res);

    // get the deployment
    const l = await grid3.k8s.getObj(k.name);
    log(l);

    // // delete
    // const d = await grid3.k8s.delete({ name: k.name });
    // log(d);

    await grid3.disconnect();
}

main();
```

## Detailed explanation

### Building network

```typescript
// create network Object
const n = new NetworkModel();
n.name = "monNetwork";
n.ip_range = "10.238.0.0/16";

```

### Building nodes

```typescript
// create k8s node Object
const master = new KubernetesNodeModel();
master.name = "master";
master.node_id = +(await grid3.capacity.filterNodes(masterQueryOptions))[0].nodeId;
master.cpu = 1;
master.memory = 1024;
master.rootfs_size = 0;
master.disk_size = 1;
master.public_ip = false;
master.planetary = true;

 // create k8s node Object
const worker = new KubernetesNodeModel();
worker.name = "worker";
worker.node_id = +(await grid3.capacity.filterNodes(workerQueryOptions))[0].nodeId;
worker.cpu = 1;
worker.memory = 1024;
worker.rootfs_size = 0;
worker.disk_size = 1;
worker.public_ip = false;
worker.planetary = true;

```

### Building cluster

Here we specify the cluster project name, cluster secret, network model to be used, master and workers nodes and sshkey to access them

```ts
// create k8s Object
const k = new K8SModel();
k.name = "testk8s";
k.secret = "secret";
k.network = n;
k.masters = [master];
k.workers = [worker];
k.metadata = "{'testk8s': true}";
k.description = "test deploying k8s via ts grid3 client";
k.ssh_key = config.ssh_key;
```

### Deploying

use `deploy` function to deploy the kubernetes project

```ts
const res = await grid3.k8s.deploy(k);
log(res);
```

### Getting deployment information

```ts
const l = await grid3.k8s.getObj(k.name);
log(l);
```

### Deleting deployment

```ts
const d = await grid3.k8s.delete({ name: k.name });
log(d);
```
