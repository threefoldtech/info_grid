<h1> Updating </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Updating with Terraform](#updating-with-terraform)
- [Adjustments](#adjustments)

***

## Introduction

We present ways to update using Terraform. Note that this is not fully supported.

Some of the updates are working, but the code is not finished, use at your own risk.

## Updating with Terraform

Updates are triggered by changing the deployments fields.
So for example, if you have the following network resource:

```terraform
resource "grid_network" "net" {
    nodes = [2]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
}
```

Then decided to add a node:

```terraform
resource "grid_network" "net" {
    nodes = [2, 4]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
}
```

After calling `terraform apply`, the provider does the following:

- Add node 4 to the network.
- Update the version of the workload.
- Update the version of the deployment.
- Update the hash in the contract (the contract id will stay the same)

## Adjustments

There are workloads that doesn't support in-place updates (e.g. Zmachines). To change them there are a couple of options (all performs destroy/create so data can be lost):

1. `terraform taint grid_deployment.d1` (next apply will destroy ALL workloads within grid_deployment.d1 and create a new deployment)
2. `terraform destroy --target grid_deployment.d1 && terraform apply --target grid_deployment.d1` (same as above)
3. Remove the vm, then execute a `terraform apply`, then add the vm with the new config (this performs two updates but keeps neighboring workloads inside the same deployment intact). (CAUTION: this could be done only if the vm is last one in the list of vms, otherwise undesired behavior will occur)
