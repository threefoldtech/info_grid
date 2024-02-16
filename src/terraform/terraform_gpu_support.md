<h1> GPU Support and Terraform </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Example](#example)

***

## Introduction

The TFGrid now supports GPUs. We present here a quick example. This section will be expanded as new information comes in.



## Example

```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtechdev.com/providers/grid"
    }
  }
}
provider "grid" {
}
locals {
  name = "testvm"
}
resource "grid_network" "net1" {
  name        = local.name
  nodes       = [93]
  ip_range    = "10.1.0.0/16"
  description = "newer network"
}
resource "grid_deployment" "d1" {
  name         = local.name
  node         = 93
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
    gpus = [
      "0000:0e:00.0/1002/744c"
    ]
  }
```