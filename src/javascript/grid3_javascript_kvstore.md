first, make sure you have your [client](./grid3_javascript_loadclient.md) prepared

## Using tfchain KVStore

As part of the tfchain, we support a keyvalue store module that can be used for any value within `2KB` range. practically it's used to save the user configurations state, so it can be built up again on any machine, given they used the same mnemonics and same secret. 

### Example code
```
import "reflect-metadata";

import { getClient } from "./client_loader";

const exampleObj = {
    key1: "value1",
    key2: 2,
};

/*
KVStore example usage:
*/
async function main() {
    //For creating grid3 client with KVStore, you need to specify the KVStore storage type in the pram:

    const gridClient = await getClient();

    //then every module will use the KVStore to save its configuration and restore it.

    // also you can use it like this:
    const db = gridClient.kvstore;

    // set key
    const key = "hamada";
    await db.set({ key, value: JSON.stringify(exampleObj) });

    // list all the keys
    const keys = await db.list();
    console.log(keys);

    // get the key
    const data = await db.get({ key });
    console.log(JSON.parse(data.toString()));

    // // remove the key
    // await db.remove({ key });

    // disconnect
    await gridClient.disconnect();
}

main();
```


#### setting values

`db.set` is used to set key to any value `serialized as string`

```typescript
await db.set({ key, value: JSON.stringify(exampleObj) });
```


#### getting key

`db.get` is used to get a specific key

```typescript
const data = await db.get({ key });
log(JSON.parse(data));
```


#### listing keys

`db.list` is used to list all the keys.

```typescript
const keys = await db.list();
log(keys);
```

#### deleting key

`db.remove` is used to delete a specific key.

```typescript
await db.remove({ key });
```

