![ ](./img/terraform_.png)

## Updating (NOT SUPPORTED)

Some of the updates are working, but the code is not finished, use on your own risk

Updates are triggered by changing the deployments fields.
```
resource "grid_network" "net" {
    nodes = [2, 4]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
}

```

- add node 4 to the network
- the version of the workload needs to get updated internally
- the version of the deployment needs to get updated internally
- update the hash in the contract (the contract id will stay the same)
- there are workloads that doesn't support in-place updates (e.g. Zmachines). To change them there are a couple of options (all performs destroy/create so data can be lost):
1. `terraform taint grid_deployment.d1` (next apply will destroy ALL workloads within grid_deployment.d1 and create a new deployment)
2. `terraform destroy --target grid_deployment.d1 --parallelism=1 && terraform apply --target grid_deployment.d1 --parallelism=1` (same as above)
3. remove the vm, then execute a `terraform apply`, then add the vm with the new config (this performs two updates but keeps neighboring workloads inside the same deployment intact)
dispatching the updated deployment object to `zos.deployment.update` of the node 