<h1> QSFS on Full VM </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Create the Terraform Files](#create-the-terraform-files)
- [Full Example](#full-example)
- [Mounting the QSFS Disk](#mounting-the-qsfs-disk)
- [Debugging](#debugging)

***

## Introduction

This short ThreeFold Guide will teach you how to deploy a Full VM with QSFS disk on the TFGrid using Terraform. For this guide, we will be deploying Ubuntu 22.04 based cloud-init image.

The steps are very simple. You first need to create the Terraform files, and then deploy the full VM and the QSFS workloads. After the deployment is done, you will need to SSH into the full VM and manually mount the QSFS disk.

The main goal of this guide is to show you all the necessary steps to deploy a Full VM with QSFS disk on the TGrid using Terraform.



## Prerequisites

- [Install Terraform](../terraform_install.md)

You need to download and install properly Terraform. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).



## Create the Terraform Files

Deploying a FullVM is a bit different than deploying a MicroVM, let take a look first at these differences
- FullVMs uses `cloud-init` images and unlike the microVMs it needs at least one disk attached to the vm to copy the image to, and it serves as the root fs for the vm.
- QSFS disk is based on `virtiofs`, and you can't use QSFS disk as the first mount in a FullVM, instead you need a regular disk.
- Any extra disks/mounts will be available on the vm but unlike mounts on MicroVMs, extra disks won't be mounted automatically. you will need to mount it manually after the deployment.

Let modify the qsfs-on-microVM [example](./terraform_qsfs_on_microvm.md) to deploy a QSFS on FullVM this time:

- Inside the `grid_deployment` resource we will need to add a disk for the vm root fs.

  ```terraform
  disks {
    name        = "roof-fs"
    size        = 10
    description = "root fs"
  }
  ```

- We need also to add an extra mount inside the `grid_deployment` resource in `vms` block. it must be the first mounts block in the vm:

  ```terraform
  mounts {
    disk_name   = "rootfs"
    mount_point = "/"
  }
  ```

- We also need to specify the flist for our FullVM, inside the `grid_deployment` in the `vms` block, change the flist filed to use this image:
  - https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist



## Full Example
The full example would be like this:

```terraform
terraform {
  required_providers {
    grid = {
      source  = "threefoldtech/grid"
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
  nodes       = [11]
  ip_range    = "10.1.0.0/16"
  name        = "network"
  description = "newer network"
}

resource "grid_deployment" "d1" {
  node = 11
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
  node         = 11
  network_name = grid_network.net1.name
  disks {
    name        = "rootfs"
    size        = 10
    description = "rootfs"
  }
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
    flist      = "https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist"
    cpu        = 2
    memory     = 1024
    entrypoint = "/sbin/zinit init"
    planetary  = true
    env_vars = {
      SSH_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC9MI7fh4xEOOEKL7PvLvXmSeRWesToj6E26bbDASvlZnyzlSKFLuYRpnVjkr8JcuWKZP6RQn8+2aRs6Owyx7Tx+9kmEh7WI5fol0JNDn1D0gjp4XtGnqnON7d0d5oFI+EjQQwgCZwvg0PnV/2DYoH4GJ6KPCclPz4a6eXrblCLA2CHTzghDgyj2x5B4vB3rtoI/GAYYNqxB7REngOG6hct8vdtSndeY1sxuRoBnophf7MPHklRQ6EG2GxQVzAOsBgGHWSJPsXQkxbs8am0C9uEDL+BJuSyFbc/fSRKptU1UmS18kdEjRgGNoQD7D+Maxh1EbmudYqKW92TVgdxXWTQv1b1+3dG5+9g+hIWkbKZCBcfMe4nA5H7qerLvoFWLl6dKhayt1xx5mv8XhXCpEC22/XHxhRBHBaWwSSI+QPOCvs4cdrn4sQU+EXsy7+T7FIXPeWiC2jhFd6j8WIHAv6/rRPsiwV1dobzZOrCxTOnrqPB+756t7ANxuktsVlAZaM= sameh@sameh-inspiron-3576"
    }
    mounts {
      disk_name   = "rootfs"
      mount_point = "/"
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

**note**: the `grid_deployment.qsfs.name` should be the same as the qsfs disk name in `grid_deployment.vms.mounts.disk_name`.



## Mounting the QSFS Disk
After applying this terraform file, you will need to manually mount the disk.
SSH into the VM and type `mount -t virtiofs <QSFS DISK NAME> /qsfs`:

```bash
mkdir /qsfs
mount -t virtiofs qsfs /qsfs
```



## Debugging

During deployment, you might encounter the following error when using mount command:

`mount: /qsfs: wrong fs type, bad option, bad superblock on qsfs3, missing codepage or helper program, or other error.`

- **Explanations**: Most likely you typed a wrong qsfs deployment/disk name that not matched with the one from qsfs deployment.
- **Solution**: Double check your terraform file, and make sure the name you are using as qsfs deployment/disk name is matching the one you are trying to mount on your VM.
