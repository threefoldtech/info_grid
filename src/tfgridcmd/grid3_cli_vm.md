## Deploying a VM

Specify the VM name, specs and your public SSH key path:

```console
$ tf-grid deploy vm --name examplevm --ssh ~/.ssh/id_rsa.pub --cpu 2 --memory 4 --disk 10
12:06PM INF deploying network
12:06PM INF deploying vm
12:07PM INF vm yggdrasil ip: 300:e9c4:9048:57cf:7da2:ac99:99db:8821
```

Cancel deployed VM using deployment name:

```console
$ tf-grid cancel examplevm
3:37PM INF canceling contracts for project examplevm
3:37PM INF examplevm canceled
```

Check out VM commands [docs](https://github.com/threefoldtech/grid3_client_go/blob/development/docs/cli/vm.md) for more details.
