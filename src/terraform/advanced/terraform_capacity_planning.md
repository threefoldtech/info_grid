<h1> Capacity Planning </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Example](#example)
- [Preparing the Requests](#preparing-the-requests)

***

## Introduction

In this [example](https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/simple-dynamic/main.tf) we will discuss capacity planning on top of the TFGrid.

## Example

```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
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
      SSH_KEY = "PUT YOUR SSH KEY HERE"
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
      SSH_KEY = "PUT YOUR SSH KEY HERE"
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

## Preparing the Requests

```terraform
resource "grid_scheduler" "sched" {
  # a machine for the first server instance
  requests {
    name = "server1"
    cru = 1
    sru = 256
    mru = 256
  }
  # a machine for the second server instance
  requests {
    name = "server2"
    cru = 1
    sru = 256
    mru = 256
  }
  # a name workload
  requests {
    name = "gateway"
    public_config = true
  }
}
```

Here we define a `list` of requests, each request has a name and filter options e.g `cru`, `sru`, `mru`, `hru`, having `public_config` or not, `public_ips_count` for this deployment, whether or not this node should be `dedicated`, whether or not this node should be `distinct` from other nodes in this plannder, `farm_id` to search in, nodes to exlude from search in `node_exclude`, and whether or not this node should be `certified`.

The full docs for the capacity planner `scheduler` are found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/scheduler.md)

And after that in our code we can reference the grid_scheduler object with the request name to be used instead of node_id.

For example:

```terraform
resource "grid_deployment" "server1" {
  node = grid_scheduler.sched.nodes["server1"]
  network_name = grid_network.net1.name
  ip_range = lookup(grid_network.net1.nodes_ip_range, grid_scheduler.sched.nodes["server1"], "")
  vms {
    name = "firstserver"
    flist = "https://hub.grid.tf/omar0.3bot/omarelawady-simple-http-server-latest.flist"
    cpu = 1
    memory = 256
    rootfs_size = 256
    entrypoint = "/main.sh"
    env_vars = {
      SSH_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCtCuUUCZGLZ4NoihAiUK8K0kSoTR1WgIaLQKqMdQ/99eocMLqJgQMRIp8lueFG7SpcgXVRzln8KNKZX1Hm8lcrXICr3dnTW/0bpEnF4QOGLYZ/qTLF5WmoCgKyJ6WO96GjWJBsZPads+RD0WeiijV7jj29lALsMAI8CuOH0pcYUwWsRX/I1z2goMPNRY+PBjknMYFXEqizfUXqUnpzF3w/bKe8f3gcrmOm/Dxh1nHceJDW52TJL/sPcl6oWnHZ3fY4meTiAS5NZglyBF5oKD463GJnMt/rQ1gDNl8E4jSJUArN7GBJntTYxFoFo6zxB1OsSPr/7zLfPG420+9saBu9yN1O9DlSwn1ZX+Jg0k7VFbUpKObaCKRmkKfLiXJdxkKFH/+qBoCCnM5hfYxAKAyQ3YCCP/j9wJMBkbvE1QJMuuoeptNIvSQW6WgwBfKIK0shsmhK2TDdk0AHEnzxPSkVGV92jygSLeZ4ur/MZqWDx/b+gACj65M3Y7tzSpsR76M= omar@omar-Predator-PT315-52"
    }
    env_vars = {
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    }

    planetary = true
  }
}
```

> Note: you need to call `distinct` while specifying the nodes in the network, because the scheduler may assign server1, server2 on the same node. Example:

```terraform
  resource "grid_network" "net1" {
    name        = local.name
    nodes       = distinct(values(grid_scheduler.sched.nodes))
    ip_range    = "10.1.0.0/16"
    description = "newer network"
  }
```
