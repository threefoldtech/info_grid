![ ](../advanced/img/terraform_.png)

## Scheduler Resource

using scheduler resource enables the user to automatically get the nodes that matches his criterias, so if we have an examples as follows

```
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
      version = "1.8.1-dev"
    }
  }
}
provider "grid" {
}

locals {
  name = "testvm"
}

resource "grid_scheduler" "sched" {
  requests {
    farm_id = 53
    name = "node1"
    cru  = 3
    sru  = 1024
    mru  = 2048
    node_exclude = [33] # exlude node 33 from your search
    public_ips_count = 0 # this deployment needs 0 public ips
    public_config = false # this node does not need to have public config
  }
}

resource "grid_network" "net1" {
  name        = local.name
  nodes       = [grid_scheduler.sched.nodes["node1"]]
  ip_range    = "10.1.0.0/16"
  description = "newer network"
}
resource "grid_deployment" "d1" {
  name         = local.name
  node         = grid_scheduler.sched.nodes["node1"]
  network_name = grid_network.net1.name
  vms {
    name       = "vm1"
    flist      = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu        = 2
    memory     = 1024
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = file("~/.ssh/id_rsa.pub")
    }
    planetary = true
  }
  vms {
    name       = "anothervm"
    flist      = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu        = 1
    memory     = 1024
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = file("~/.ssh/id_rsa.pub")
    }
    planetary = true
  }
}
output "vm1_ip" {
  value = grid_deployment.d1.vms[0].ip
}
output "vm1_ygg_ip" {
  value = grid_deployment.d1.vms[0].ygg_ip
}

output "vm2_ip" {
  value = grid_deployment.d1.vms[1].ip
}
output "vm2_ygg_ip" {
  value = grid_deployment.d1.vms[1].ygg_ip
}

```

for the scheduler part above

```
resource "grid_scheduler" "sched" {
  requests {
    name = "node1"
    cru  = 3
    sru  = 1024
    mru  = 2048
    node_exclude = [33] # exlude node 33 from your search
    public_ips_count = 0 # this deployment needs 0 public ips
    public_config = false # this node does not need to have public config
  }
}
```

here the user is specifying his requirements which matches his deployments and later on he can use the result of the scheduler which contains the `[nodes]` in his deployments and follows.

```
resource "grid_network" "net1" {
  name        = local.name
  nodes       = [grid_scheduler.sched.nodes["node1"]]
  ...
}

```

and

```
resource "grid_deployment" "d1" {
  name         = local.name
  node         = grid_scheduler.sched.nodes["node1"]
  network_name = grid_network.net1.name
  vms {
    name       = "vm1"
    ...
  }
  ...
}
```

what scheduler does is actually the following:

- At first if farm_id is specified, then the scheduler will check if this farm has farmerbot enabled, if so it will try to find a suitable node using farmerbot.
- If farmerbot is not enabled, it will use grid proxy to find a suitable node.
