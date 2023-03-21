## Deploying Kubernetes Clusters

Specify cluster name, nodes for master and workers, your public SSH key path and specs:

```console
$ tf-grid deploy kubernetes -n examplekube --ssh ~/.ssh/id_rsa.pub --master-node 14 --workers-number 2 --workers-node 15
4:21PM INF deploying network
4:22PM INF deploying cluster
4:22PM INF master yggdrasil ip: 300:e9c4:9048:57cf:504f:c86c:9014:d02d
```

Cancel deployed Kubernetes Cluster using deployment name:

```console
$ tf-grid cancel examplekube
3:37PM INF canceling contracts for project examplekube
3:37PM INF examplekube canceled
```

Check out Kubernetes commands [docs](https://github.com/threefoldtech/tf-grid-cli/blob/development/docs/kubernetes.md) for more details.
