<h1> Quantum Safe Filesystem </h1>

![ ](../advanced/img/terraform_.png)

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [QSFS Workload Parameters and Documentation](#qsfs-workload-parameters-and-documentation)
- [QSFS Example on microVM](#qsfs-example-on-microvm)

***

## Introduction

Quantum Storage is a FUSE filesystem that uses mechanisms of forward error correction (Reed Solomon codes) to make sure data (files and metadata) are stored in multiple remote places in a way that we can afford losing x number of locations without losing the data. 

The aim is to support unlimited local storage with remote backends for offload and backup which cannot be broken, even by a quantum computer.

***

## QSFS Workload Parameters and Documentation

A complete list of QSFS workload parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/deployment.md#nested-schema-for-qsfs).

The [quantum-storage](https://github.com/threefoldtech/quantum-storage) repo contains a more thorough description of QSFS operation.

***

## QSFS Example on microVM

We present below an example of a QSFS deployment on a microVM. Note that you will need to replace the line `SSH_KEY = "PUT YOUR SSH KEY HERE"` with your own SSH key.

The main template for this example can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/qsfs/main.tf). 

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
  metas = ["meta1", "meta2", "meta3", "meta4"]
  datas = ["data1", "data2", "data3", "data4"]
}

resource "grid_network" "net1" {
  nodes       = [7]
  ip_range    = "10.1.0.0/16"
  name        = "network"
  description = "newer network"
}

resource "grid_deployment" "d1" {
  node = 7
  dynamic "zdbs" {
    for_each = local.metas
    content {
      name        = zdbs.value
      description = "description"
      password    = "password"
      size        = 10
      mode        = "user"
    }
  }
  dynamic "zdbs" {
    for_each = local.datas
    content {
      name        = zdbs.value
      description = "description"
      password    = "password"
      size        = 10
      mode        = "seq"
    }
  }
}

resource "grid_deployment" "qsfs" {
  node         = 7
  network_name = grid_network.net1.name
  qsfs {
    name                  = "qsfs"
    description           = "description6"
    cache                 = 10240 # 10 GB
    minimal_shards        = 2
    expected_shards       = 4
    redundant_groups      = 0
    redundant_nodes       = 0
    max_zdb_data_dir_size = 512 # 512 MB
    encryption_algorithm  = "AES"
    encryption_key        = "4d778ba3216e4da4231540c92a55f06157cabba802f9b68fb0f78375d2e825af"
    compression_algorithm = "snappy"
    metadata {
      type                 = "zdb"
      prefix               = "hamada"
      encryption_algorithm = "AES"
      encryption_key       = "4d778ba3216e4da4231540c92a55f06157cabba802f9b68fb0f78375d2e825af"
      dynamic "backends" {
        for_each = [for zdb in grid_deployment.d1.zdbs : zdb if zdb.mode != "seq"]
        content {
          address   = format("[%s]:%d", backends.value.ips[1], backends.value.port)
          namespace = backends.value.namespace
          password  = backends.value.password
        }
      }
    }
    groups {
      dynamic "backends" {
        for_each = [for zdb in grid_deployment.d1.zdbs : zdb if zdb.mode == "seq"]
        content {
          address   = format("[%s]:%d", backends.value.ips[1], backends.value.port)
          namespace = backends.value.namespace
          password  = backends.value.password
        }
      }
    }
  }
  vms {
    name       = "vm"
    flist      = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu        = 2
    memory     = 1024
    entrypoint = "/sbin/zinit init"
    planetary  = true
    env_vars = {
      SSH_KEY = "PUT YOUR SSH KEY HERE"
    }
    mounts {
      disk_name   = "qsfs"
      mount_point = "/qsfs"
    }
  }
}
output "metrics" {
  value = grid_deployment.qsfs.qsfs[0].metrics_endpoint
}
output "ygg_ip" {
  value = grid_deployment.qsfs.vms[0].ygg_ip
}
```
