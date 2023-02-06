!!!include:grid3_javascript_loadclient

## Deploying ZDB

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/development/scripts/zdb.ts


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

