> Note: TFGrid GPU Support is only available on Dev Test for the moment.

## Deploying a VM

Specify the VM name, specs and your public SSH key path:

```console
$ tf-grid-cli deploy vm --name examplevm --ssh ~/.ssh/id_rsa.pub --cpu 2 --memory 4 --disk 10
12:06PM INF deploying network
12:06PM INF deploying vm
12:07PM INF vm yggdrasil ip: 300:e9c4:9048:57cf:7da2:ac99:99db:8821
```

If you require a GPU on your machine, simply add the `--gpu` flag when deploying on a specific rented node.

Get deployed VM using deployment name:

```console
$ tf-grid-cli get vm examplevm
```

Cancel deployed VM using deployment name:

```console
$ tf-grid-cli cancel examplevm
3:37PM INF canceling contracts for project examplevm
3:37PM INF examplevm canceled
```

### Required Flags

- name: name of the deployment.
- ssh: path to public SSH key.

### Optional Flags

- node: node id vm should be deployed on.
- farm: farm id vm should be deployed on, if set choose available node from farm that fits vm specs (default 1). note: node and farm flags cannot be set both.
- cpu: number of cpu units (default 1).
- disk: size of disk in GB mounted on /data. if not set no disk workload is made.
- entrypoint: entrypoint for VM flist (default "/sbin/zinit init"). note: setting this without the flist option will fail.
- flist: flist used in VM (default "https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist").
note: setting this without the entrypoint option will fail.
- ipv4: assign public ipv4 for VM (default false).
- ipv6: assign public ipv6 for VM (default false).
- memory: memory size in GB (default 1).
- rootfs: root filesystem size in GB (default 2).
- ygg: assign yggdrasil ip for VM (default true).
