<h1>Terraform Complete Full VM Deployment</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Main Process](#main-process)
- [Prerequisites](#prerequisites)
- [Find a 3Node with the ThreeFold Explorer](#find-a-3node-with-the-threefold-explorer)
  - [Using the Grid Scheduler](#using-the-grid-scheduler)
  - [Using the Grid Explorer](#using-the-grid-explorer)
- [Create the Terraform Files](#create-the-terraform-files)
- [Deploy the Full VM with Terraform](#deploy-the-full-vm-with-terraform)
- [SSH into the 3Node](#ssh-into-the-3node)
- [Delete the Deployment](#delete-the-deployment)
- [Conclusion](#conclusion)

***

## Introduction

This short ThreeFold Guide will teach you how to deploy a Full VM on the TFGrid using Terraform. For this guide, we will be deploying Ubuntu 22.04.

The steps are very simple. You first need to create the Terraform files, the variables file and the deployment file, and then deploy the full VM. After the deployment is done, you can SSH into the full VM.

The main goal of this guide is to show you all the necessary steps to deploy a Full VM on the TGrid using Terraform. Once you get acquainted with this first basic deployment, you should be able to explore on your own the possibilities that the TFGrid and Terraform combined provide.



## Main Process

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workload.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file. Of course, you can adjust the deployment based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` file as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployments`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable file to take into account your own seed phrase and SSH keys. You should also specifiy the node ID of the 3Node you will be deploying on.

Once this is done, initialize and apply Terraform to deploy your workload, then SSH into the Full VM. That's it! Now let's go through all these steps in further details.



## Prerequisites

- [Install Terraform](./terraform_install.md)

You need to download and install properly Terraform. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).



## Find a 3Node with the ThreeFold Explorer

We want to find a proper 3Node to deploy our workload. For this guide, we want a 3Node with at least 15GB of storage, 1 vcore and 512MB of RAM, which are the minimum specifications for a micro VM on the TFGrid. We are also looking for a 3Node with a public IPv4 address.

We present two options to find a suitable node: the scheduler and the TFGrid Explorer.



### Using the Grid Scheduler

Using the TFGrid scheduler can be very efficient depending on what you are trying to achieve. To learn more about the scheduler, please refer to this [Scheduler Guide](resources/terraform_scheduler.md).



### Using the Grid Explorer

We show here how to find a suitable 3Node using the ThreeFold Explorer.

- Go to the ThreeFold Grid [Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) (Main Net)
- Find a 3Node with suitable resources for the deployment and take note of its node ID on the leftmost column `ID`
- For proper understanding, we give further information on some relevant columns:
  - `ID` refers to the node ID
  - `Free Public IPs` refers to available IPv4 public IP addresses
  - `HRU` refers to HDD storage
  - `SRU` refers to SSD storage
  - `MRU` refers to RAM (memory)
  - `CRU` refers to virtual cores (vcores)
- To quicken the process of finding a proper 3Node, you can narrow down the search by adding filters:
  - At the top left of the screen, in the `Filters` box, select the parameter(s) you want.
  - For each parameter, a new field will appear where you can enter a minimum number requirement for the 3Nodes.
    - `Free SRU (GB)`: 15
    - `Free MRU (GB)`: 1
    - `Total CRU (Cores)`: 1
    - `Free Public IP`: 2
      - Note: if you want a public IPv4 address, it is recommended to set the parameter `FREE PUBLIC IP` to at least 2 to avoid false positives. This ensures that the shown 3Nodes have viable IP addresses.

Once you've found a proper node, take node of its node ID. You will need to use this ID when creating the Terraform files.



## Create the Terraform Files

Open the terminal.

- Go to the home folder

  - ```
    cd ~
    ```

- Create the folder `terraform` and the subfolder `deployment-full-vm`:
  - ```
    mkdir -p terraform/deployment-full-vm
    ```
  - ```
    cd terraform/deployment-full-vm
    ```
- Create the `main.tf` file:

  - ```
    nano main.tf
    ```

- Copy the `main.tf` content and save the file.

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

- Create the `credentials.auto.tfvars` file:

  - ```
    nano credentials.auto.tfvars
    ```

- Copy the `credentials.auto.tfvars` content and save the file.

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



## Deploy the Full VM with Terraform

We now deploy the full VM with Terraform. Make sure that you are in the correct folder `terraform/deployments` containing the main and variables files.

- Initialize Terraform:

  - ```
    terraform init
    ```

- Apply Terraform to deploy the full VM:
  - ```
    terraform apply
    ```

After deployments, take note of the 3Node' IPv4 address. You will need this address to SSH into the 3Node.



## SSH into the 3Node

- To [SSH into the 3Node](../getstarted/ssh_guide/ssh_guide.md), write the following:
  - ```
    ssh root@VM_IPv4_Address
    ```



## Delete the Deployment

To stop the Terraform deployment, you simply need to write the following line in the terminal:

```
terraform destroy
```

Make sure that you are in the Terraform directory you created for this deployment.



## Conclusion

You now have the basic knowledge and know-how to deploy on the TFGrid using Terraform.

As always, if you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.
