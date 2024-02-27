<h1>Using TFChain KVStore</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Example code](#example-code)
  - [setting values](#setting-values)
  - [getting key](#getting-key)
  - [listing keys](#listing-keys)
  - [deleting key](#deleting-key)

***

## Introduction

As part of the tfchain, we support a keyvalue store module that can be used for any value within `2KB` range. practically it's used to save the user configurations state, so it can be built up again on any machine, given they used the same mnemonics and same secret.

## Prerequisites

- Make sure you have your [client](./grid3_javascript_loadclient.md) prepared

## Example code

```ts
import { getClient } from "./client_loader";
import { log } from "./utils";

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
    const exampleObj = {
        key1: "value1",
        key2: 2,
    };
    // set key
    await db.set({ key, value: JSON.stringify(exampleObj) });

    // list all the keys
    const keys = await db.list();
    log(keys);

    // get the key
    const data = await db.get({ key });
    log(JSON.parse(data));

    // remove the key
    await db.remove({ key });

    await gridClient.disconnect();
}

main();

```

### setting values

`db.set` is used to set key to any value `serialized as string`

```ts
await db.set({ key, value: JSON.stringify(exampleObj) });
```

### getting key

`db.get` is used to get a specific key

```ts
const data = await db.get({ key });
log(JSON.parse(data));
```

### listing keys

`db.list` is used to list all the keys.

```ts
const keys = await db.list();
log(keys);
```

### deleting key

`db.remove` is used to delete a specific key.

```ts
await db.remove({ key });
```
