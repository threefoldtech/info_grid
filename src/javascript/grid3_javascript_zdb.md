first, make sure you have your [client](./grid3_javascript_loadclient.md) prepared


## Deploying ZDB

### Example code

```
import { FilterOptions, ZDBModel, ZdbModes, ZDBSModel } from "../src";
import { getClient } from "./client_loader";
import { log } from "./utils";

async function main() {
    const grid3 = await getClient();

    const zdbQueryOptions: FilterOptions = {
        hru: 10,
        farmId: 1,
    };

    // create zdb object
    const zdb = new ZDBModel();
    zdb.name = "hamada";
    zdb.node_id = +(await grid3.capacity.filterNodes(zdbQueryOptions))[0].nodeId;
    zdb.mode = ZdbModes.user;
    zdb.disk_size = 9;
    zdb.publicNamespace = false;
    zdb.password = "testzdb";

    // create zdbs object
    const zdbs = new ZDBSModel();
    zdbs.name = "tttzdbs";
    zdbs.zdbs = [zdb];
    zdbs.metadata = '{"test": "test"}';

    // deploy zdb
    const res = await grid3.zdbs.deploy(zdbs);
    log(res);

    // get the deployment
    const l = await grid3.zdbs.getObj(zdbs.name);
    log(l);

    // // delete
    // const d = await grid3.zdbs.delete({ name: zdbs.name });
    // log(d);

    await grid3.disconnect();
}

main();
```


### Detailed explanation

#### Getting the client

```typescript
const grid3 = getClient();
```

#### Building the model

```typescript
// create zdb object
const zdb = new ZDBModel();
zdb.name = "hamada";
zdb.node_id = 16;
zdb.mode = ZdbModes.user;
zdb.disk_size = 9;
zdb.publicNamespace = false;
zdb.password = "testzdb";
```

Here we define a `ZDB model` and setting the relevant properties e.g 
- name
- node_id : where to deploy on
- mode: `user` or `seq`
- disk_size: disk size in GB
- publicNamespace: a public namespace can be read-only if a password is set
- password: namespace password


#### preparing ZDBs collection
```typescript
// create zdbs object
const zdbs = new ZDBSModel();
zdbs.name = "tttzdbs";
zdbs.zdbs = [zdb];
zdbs.metadata = '{"test": "test"}';

```
you can attach multiple ZDBs into the collection nand send it for deployment



#### Deployment


```typescript
const res = await grid3.zdbs.deploy(zdbs);
log(res);
```


#### Getting Deployment information

`getObj` gives detailed information about the workload.

```typescript
// get the deployment
const l = await grid3.zdbs.getObj(zdbs.name);
log(l);
```


#### Deleting a deployment

`.delete` method helps cancelling the relevant contracts related to that ZDBs deployment

```typescript
// delete
const d = await grid3.zdbs.delete({ name: zdbs.name });
log(d);
```

