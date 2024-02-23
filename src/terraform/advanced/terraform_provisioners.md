<h1> Terraform and Provisioner </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Example](#example)
- [Params docs](#params-docs)
  - [Requirements](#requirements)
  - [Connection Block](#connection-block)
  - [Provisioner Block](#provisioner-block)
  - [More Info](#more-info)

***

## Introduction

In this [example](https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/external_provisioner/remote-exec_hello-world/main.tf), we will see how to deploy a VM and apply provisioner commands on it on the TFGrid.

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
  name = "myvm"
}

resource "grid_network" "net1" {
  nodes         = [1]
  ip_range      = "10.1.0.0/24"
  name          = local.name
  description   = "newer network"
  add_wg_access = true
}

resource "grid_deployment" "d1" {
  name         = local.name
  node         = 1
  network_name = grid_network.net1.name
  vms {
    name       = "vm1"
    flist      = "https://hub.grid.tf/tf-official-apps/grid3_ubuntu20.04-latest.flist"
    entrypoint = "/init.sh"
    cpu        = 2
    memory     = 1024
    env_vars = {
      SSH_KEY = file("~/.ssh/id_rsa.pub")
    }
    planetary = true
  }
  connection {
    type  = "ssh"
    user  = "root"
    agent = true
    host  = grid_deployment.d1.vms[0].ygg_ip
  }

  provisioner "remote-exec" {
    inline = [
      "echo 'Hello world!' > /root/readme.txt"
    ]
  }
}
```

## Params docs

### Requirements

- the machine should have `ssh server` running
- the machine should have `scp` installed

### Connection Block

- defines how we will connect to the deployed machine

``` terraform
   connection {
    type     = "ssh"
    user     = "root"
    agent    = true
    host     = grid_deployment.d1.vms[0].ygg_ip
  }
```

type: defines the used service to connect to
user: the connecting users
agent: if used the provisoner will use the default key to connect to the remote machine
host: the ip/host of the remote machine

### Provisioner Block

- defines the actual provisioner behaviour

``` terraform
   provisioner "remote-exec" {
    inline = [
      "echo 'Hello world!' > /root/readme.txt"
    ]
  }
```

- remote-exec: the provisoner type we are willing to use can be remote, local or another type
- inline: This is a list of command strings. They are executed in the order they are provided. This cannot be provided with script or scripts.
- script: This is a path (relative or absolute) to a local script that will be copied to the remote resource and then executed. This cannot be provided with inline or scripts.
- scripts: This is a list of paths (relative or absolute) to local scripts that will be copied to the remote resource and then executed. They are executed in the order they are provided. This cannot be provided with inline or script.

### More Info

A complete list of provisioner parameters can be found [here](https://www.terraform.io/language/resources/provisioners/remote-exec).
