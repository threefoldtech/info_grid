## Deploying Kubernetes Clusters

Specify cluster name, nodes for master and workers, your public SSH key path and specs:

```console
$ tf-grid-cli deploy kubernetes -n examplekube --ssh ~/.ssh/id_rsa.pub --master-node 14 --workers-number 2 --workers-node 15
4:21PM INF deploying network
4:22PM INF deploying cluster
4:22PM INF master yggdrasil ip: 300:e9c4:9048:57cf:504f:c86c:9014:d02d
```

Cancel deployed Kubernetes Cluster using deployment name:

```console
$ tf-grid-cli cancel examplekube
3:37PM INF canceling contracts for project examplekube
3:37PM INF examplekube canceled
```

### Required Flags

- name: name of the deployment.
- ssh: path to public SSH key.

### Optional Flags

- master-node: node id master should be deployed on.
- master-farm: farm id master should be deployed on, if set choose available node from farm that fits master specs (default 1). note: master-node and master-farm flags cannot be set both.
- workers-node: node id workers should be deployed on.
- workers-farm: farm id workers should be deployed on, if set choose available node from farm that fits master specs (default 1). note: workers-node and workers-farm flags cannot be set both.
- ipv4: assign public ipv4 for master node (default false).
- ipv6: assign public ipv6 for master node (default false).
- ygg: assign yggdrasil ip for master node (default true).
- master-cpu: number of cpu units for master node (default 1).
- master-memory: master node memory size in GB (default 1).
- master-disk: master node disk size in GB (default 2).
- workers-number: number of workers nodes (default 0).
- workers-cpu: number of cpu units for each worker node (default 1).
- workers-memory: memory size for each worker node in GB (default 1).
- workers-disk: disk size in GB for each worker node (default 2).
- workers-node: node id to deploy all workers nodes on.
