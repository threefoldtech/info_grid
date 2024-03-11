<h1> Deploying a VM with Mounts Using Terraform </h1>

<h2> Table of Contents</h2>

- [Introduction](#introduction)
- [Example](#example)
- [More Info](#more-info)

***

## Introduction

In this [example](https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/mounts/main.tf), we will see how to deploy a VM and mount disks on it on the TFGrid.

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

resource "grid_network" "net1" {
    nodes = [2, 4]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
}
resource "grid_deployment" "d1" {
  node = 2
  network_name = grid_network.net1.name
  ip_range = lookup(grid_network.net1.nodes_ip_range, 2, "")
  disks {
    name = "data"
    size = 10
    description = "volume holding app data"
  }
  vms {
    name = "vm1"
    flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu = 1
    publicip = true
    memory = 1024
    entrypoint = "/sbin/zinit init"
    mounts {
        disk_name = "data"
        mount_point = "/app"
    }
    env_vars = {
      SSH_KEY = "PUT YOUR SSH KEY HERE"
    }
  }
  vms {
    name = "anothervm"
    flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu = 1
    memory = 1024
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = "PUT YOUR SSH KEY HERE"
    }
  }
}
output "wg_config" {
    value = grid_network.net1.access_wg_config
}
output "node1_zmachine1_ip" {
    value = grid_deployment.d1.vms[0].ip
}
output "node1_zmachine2_ip" {
    value = grid_deployment.d1.vms[1].ip
}
output "public_ip" {
    value = grid_deployment.d1.vms[0].computedip
}
```

## More Info

A complete list of Mount workload parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/deployment.md#nested-schema-for-vmsmounts).
