<h1>Terraform Complete Full VM Deployment</h1>

![ ](./advanced/img/terraform_.png)

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Main Process](#main-process)
- [Prerequisites](#prerequisites)
- [Find a 3node](#find-a-3node)
- [Create the Terraform Files](#create-the-terraform-files)
- [Deploy the Full VM with Terraform](#deploy-the-full-vm-with-terraform)
- [SSH into the 3node](#ssh-into-the-3node)
- [Delete the Deployment](#delete-the-deployment)
- [Conclusion](#conclusion)

***

## Introduction

This short ThreeFold Guide will teach you how to deploy a Full VM on the TFGrid using Terraform. For this guide, we will be deploying Ubuntu 22.04.

The steps are very simple. You first need to create the Terraform files, the variables file and the deployment file, and then deploy the full VM. After the deployment is done, you can SSH into the full VM.

The main goal of this guide is to show you all the necessary steps to deploy a Full VM on the TGrid using Terraform. Once you get acquainted with this first basic deployment, you should be able to explore on your own the possibilities that the TFGrid and Terraform combined provide.

***

## Main Process

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workload.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file. Of course, you can adjust the deployment based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` file as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployments`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable file to take into account your own seed phrase and SSH keys. You should also specifiy the node ID of the 3node you will be deploying on.

Once this is done, initialize and apply Terraform to deploy your workload, then SSH into the Full VM. That's it! Now let's go through all these steps in further details.

***

## Prerequisites

* [Install Terraform](https://developer.hashicorp.com/terraform/downloads)

You need to download and install properly Terraform. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).

***


## Find a 3node

We first need to decide on which 3node we will be deploying our workload.

We thus start by finding a 3node with an IPv4 address and see if it has enough resources. For our full VM deployment, the minimum specs are 1 CPU, 512 MB of memory and 15 GB of storage.

* Go to the TFGrid's [GraphQL](https://graphql.grid.tf/graphql)
* Write the following query
```
query MyQuery {
  publicConfigs {
    node {
      nodeID
      resourcesTotal {
        cru
        mru
        sru
      }
    }
    ipv4
  }
}
```
* Press the "Play" button
* Find a 3node that suits the deployment's needs (under `nodeID`)

***

## Create the Terraform Files

Open the terminal.

* Go to the home folder
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployments`:
  *  ```
     mkdir terraform && cd $_
     ```
  *  ```
     mkdir deployments && cd $_
     ```
* Create the `main.tf` file:
  *  ```
     nano main.tf
     ```

* Copy the `main.tf` content and save the file.

```
terraform {
  required_providers {
    grid = {
      source  = "threefoldtech/grid"
    }
  }
}

variable "mnemonics" {
  type = string
}

variable "SSH_KEY" {
  type = string
}

variable "tfnodeid1" {
  type = string
}

variable "size" {
  type = string
}

variable "cpu" {
  type = string
}

variable "memory" {
  type = string
}

provider "grid" {
  mnemonics = var.mnemonics
  network = "main"
}

locals {
  name = "tfvm"
}

resource "grid_network" "net1" {
  name        = local.name
  nodes       = [var.tfnodeid1]
  ip_range    = "10.1.0.0/16"
  description = "newer network"
  add_wg_access = true
}

resource "grid_deployment" "d1" {
  disks {
    name = "disk1"
    size = var.size
  }
  name         = local.name
  node         = var.tfnodeid1
  network_name = grid_network.net1.name
  vms {
    name  = "vm1"
    flist = "https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist"
    cpu   = var.cpu
    mounts {
        disk_name = "disk1"
        mount_point = "/disk1"
    }
    memory     = var.memory
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
    }
    publicip   = true
    planetary = true
  }
}

output "wg_config" {
  value = grid_network.net1.access_wg_config
}
output "node1_zmachine1_ip" {
  value = grid_deployment.d1.vms[0].ip
}

output "ygg_ip1" {
  value = grid_deployment.d1.vms[0].ygg_ip
}

output "ipv4_vm1" {
  value = grid_deployment.d1.vms[0].computedip
}

```

In this file, we name the VM as `vm1`.

* Create the `credentials.auto.tfvars` file:
  *  ```
     nano credentials.auto.tfvars
     ```

* Copy the `credentials.auto.tfvars` content and save the file. 
```
mnemonics = "..."
SSH_KEY = "..."

tfnodeid1 = "..."

size = "15"
cpu = "1"
memory = "512"
```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the node ID of the server used. Simply replace the three dots by the content.

We set here the minimum specs for a full VM, but you can adjust these parameters.

***

## Deploy the Full VM with Terraform

We now deploy the full VM with Terraform. Make sure that you are in the correct folder `terraform/deployments` containing the main and variables files.

* Initialize Terraform:
  *  ```
     terraform init
     ```

* Apply Terraform to deploy the full VM:
  *  ```
     terraform apply
     ```

After deployments, take note of the 3node' IPv4 address. You will need this address to SSH into the 3node.

***

## SSH into the 3node

* To [SSH into the 3node](https://www2.manual.grid.tf/getstarted/ssh_guide/ssh_guide.html), write the following:
  *  ```
     ssh root@VM_IPv4_Address
     ```

***

## Delete the Deployment

To stop the Terraform deployment, you simply need to write the following line in the terminal:

```
terraform destroy
```

Make sure that you are in the Terraform directory you created for this deployment.

***

## Conclusion

You now have the basic knowledge and know-how to deploy on the TFGrid using Terraform.

If you have any question, let us know!