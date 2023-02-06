!!!include:grid3_javascript_loadclient

## Using tfchain KVStore

As part of the tfchain, we support a keyvalue store module that can be used for any value within `2KB` range. practically it's used to save the user configurations state, so it can be built up again on any machine, given they used the same mnemonics and same secret. 

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/a72f9b0a45/scripts/kvstore_example.ts



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

