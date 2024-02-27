<h1>Deploying ZDBs for QSFS</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Example code](#example-code)
- [Detailed explanation](#detailed-explanation)
  - [Getting the client](#getting-the-client)
  - [Preparing the nodes](#preparing-the-nodes)
  - [Preparing ZDBs](#preparing-zdbs)
  - [Deploying the ZDBs](#deploying-the-zdbs)
  - [Getting deployment information](#getting-deployment-information)
  - [Deleting a deployment](#deleting-a-deployment)

***

## Introduction

We show how to deploy ZDBs for QSFS on the TFGrid with the Javascript client.

## Prerequisites

- Make sure you have your [client](./grid3_javascript_loadclient.md) prepared

## Example code

````typescript
import { FilterOptions, QSFSZDBSModel } from "../src";
import { getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
    const grid3 = await getClient();
    const qsfs_name = "zdbsQsfsDemo";
    const qsfsQueryOptions: FilterOptions = {
        hru: 8,
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

    const qsfs: QSFSZDBSModel = {
        name: qsfs_name,
        count: 12,
        node_ids: qsfsNodes,
        password: "mypassword",
        disk_size: 1,
        description: "my zdbs test",
        metadata: "",
    };
    const deploy_res = await grid3.qsfs_zdbs.deploy(qsfs);
    log(deploy_res);

    const zdbs_data = await grid3.qsfs_zdbs.get({ name: qsfs_name });
    log(zdbs_data);


    await grid3.disconnect();
}
main();

````

## Detailed explanation

### Getting the client

```typescript
const grid3 = getClient();
```

### Preparing the nodes

we need to deploy the zdbs on two different nodes so, we setup the filters here to retrieve the available nodes.

````typescript
const qsfsQueryOptions: FilterOptions = {
    hru: 16,
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
````

Now we have two nodes in `qsfsNode`.

### Preparing ZDBs

````typescript
const qsfs_name = "zdbsQsfsDemo";
````

We prepare here a name to use across the client for the QSFS ZDBs

### Deploying the ZDBs

````typescript
const qsfs: QSFSZDBSModel = {
        name: qsfs_name,
        count: 12,
        node_ids: qsfsNodes,
        password: "mypassword",
        disk_size: 1,
        description: "my qsfs test",
        metadata: "",
    };
const deploy_res = await grid3.qsfs_zdbs.deploy(qsfs);
log(deploy_res);
````

Here we deploy `12` ZDBs on nodes in  `qsfsNode` with password `mypassword`, all of them having disk size of `1GB`, the client already add 4 zdbs for metadata.

### Getting deployment information

````typescript
const zdbs_data = await grid3.qsfs_zdbs.get({ name: qsfs_name });
log(zdbs_data);
````

### Deleting a deployment

````typescript
const delete_response = await grid3.qsfs_zdbs.delete({ name: qsfs_name });
log(delete_response);
````
