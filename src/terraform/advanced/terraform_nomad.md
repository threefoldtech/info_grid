<h1>Deploy a Nomad Cluster</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [What is Nomad?](#what-is-nomad)
- [Prerequisites](#prerequisites)
- [Create the Terraform Files](#create-the-terraform-files)
  - [Main File](#main-file)
  - [Credentials File](#credentials-file)
- [Deploy the Nomad Cluster](#deploy-the-nomad-cluster)
- [SSH into the Client and Server Nodes](#ssh-into-the-client-and-server-nodes)
  - [SSH with the Planetary Network](#ssh-with-the-planetary-network)
  - [SSH with WireGuard](#ssh-with-wireguard)
- [Destroy the Nomad Deployment](#destroy-the-nomad-deployment)
- [Conclusion](#conclusion)

***

## Introduction

In this ThreeFold Guide, we will learn how to deploy a Nomad cluster on the TFGrid with Terraform. We cover a basic two client and three server nodes Nomad cluster. After completing this guide, you will have sufficient knowledge to build your own personalized Nomad cluster.



## What is Nomad?

[Nomad](https://www.nomadproject.io/) is a simple and flexible scheduler and orchestrator to deploy and manage containers and non-containerized applications across on-premises and clouds at scale.

In the dynamic world of cloud computing, managing and orchestrating workloads across diverse environments can be a daunting task. Nomad emerges as a powerful solution, simplifying and streamlining the deployment, scheduling, and management of applications.

Nomad's elegance lies in its lightweight architecture and ease of use. It operates as a single binary, minimizing resource consumption and complexity. Its intuitive user interface and straightforward configuration make it accessible to a wide range of users, from novices to experienced DevOps.

Nomad's versatility extends beyond its user-friendliness. It seamlessly handles a wide array of workloads, including legacy applications, microservices, and batch jobs. Its adaptability extends to diverse environments, effortlessly orchestrating workloads across on-premises infrastructure and public clouds. It's more of Kubernetes for humans!



## Prerequisites

* [Install Terraform](https://developer.hashicorp.com/terraform/downloads)
* [Install WireGuard](https://www.wireguard.com/install/)

You need to download and install properly Terraform and Wireguard on your local computer. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).

If you are new to Terraform, feel free to read this basic [Terraform Full VM guide](../terraform_full_vm.md) to get you started.



## Create the Terraform Files

For this guide, we use two files to deploy with Terraform: a main file and a variables file. The variables file contains the environment variables and the main file contains the necessary information to deploy your workload.

To facilitate the deployment, only the environment variables file needs to be adjusted. The file `main.tf` will be using the environment variables from the variables files (e.g. `var.cpu` for the CPU parameter) and thus you do not need to change this file.

Of course, you can adjust the two files based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the main file as is.

Also note that this deployment uses both the Planetary network and WireGuard.

### Main File

We start by creating the main file for our Nomad cluster.

* Create a directory for your Terraform Nomad cluster
  *  ```
     mkdir nomad
     ```
  *  ```
     cd nomad
     ```
* Create the `main.tf` file
  *  ```
     nano main.tf
     ```

* Copy the following `main.tf` template and save the file

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

variable "tfnodeid" {
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
  name = "nomadcluster"
}

resource "grid_network" "net1" {
  name        = local.name
  nodes       = [var.tfnodeid]
  ip_range    = "10.1.0.0/16"
  description = "nomad network"
  add_wg_access = true
}
resource "grid_deployment" "d1" {
  disks {
    name = "disk1"
    size = var.size
  }
  name         = local.name
  node         = var.tfnodeid
  network_name = grid_network.net1.name
  vms {
    name       = "server1"
    flist      = "https://hub.grid.tf/aelawady.3bot/abdulrahmanelawady-nomad-server-latest.flist"
    cpu        = var.cpu
    memory     = var.memory
    mounts {
        disk_name = "disk1"
        mount_point = "/disk1"
    }
    entrypoint = "/sbin/zinit init"
    ip         = "10.1.3.2"
    env_vars = {
      SSH_KEY = var.SSH_KEY
    }
    planetary = true
  }
  vms {
    name       = "server2"
    flist      = "https://hub.grid.tf/aelawady.3bot/abdulrahmanelawady-nomad-server-latest.flist"
    cpu        = var.cpu
    memory     = var.memory
    mounts {
        disk_name = "disk1"
        mount_point = "/disk1"
    }
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
      FIRST_SERVER_IP = "10.1.3.2"
    }
    planetary = true
  }
  vms {
    name       = "server3"
    flist      = "https://hub.grid.tf/aelawady.3bot/abdulrahmanelawady-nomad-server-latest.flist"
    cpu        = var.cpu
    memory     = var.memory
    mounts {
        disk_name = "disk1"
        mount_point = "/disk1"
    }
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
      FIRST_SERVER_IP = "10.1.3.2"
    }
    planetary = true
  }
  vms {
    name       = "client1"
    flist      = "https://hub.grid.tf/aelawady.3bot/abdulrahmanelawady-nomad-client-latest.flist"
    cpu        = var.cpu
    memory     = var.memory
    mounts {
        disk_name = "disk1"
        mount_point = "/disk1"
    }
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
      FIRST_SERVER_IP = "10.1.3.2"
    }
    planetary = true
  }
  vms {
    name       = "client2"
    flist      = "https://hub.grid.tf/aelawady.3bot/abdulrahmanelawady-nomad-client-latest.flist"
    cpu        = var.cpu
    memory     = var.memory
    mounts {
        disk_name = "disk1"
        mount_point = "/disk1"
    }
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
      FIRST_SERVER_IP = "10.1.3.2"
    }
    planetary = true
  }
}

output "wg_config" {
  value = grid_network.net1.access_wg_config
}

output "server1_wg_ip" {
  value = grid_deployment.d1.vms[0].ip
}
output "server2_wg_ip" {
  value = grid_deployment.d1.vms[1].ip
}
output "server3_wg_ip" {
  value = grid_deployment.d1.vms[2].ip
}
output "client1_wg_ip" {
  value = grid_deployment.d1.vms[3].ip
}
output "client2_wg_ip" {
  value = grid_deployment.d1.vms[4].ip
}

output "server1_planetary_ip" {
  value = grid_deployment.d1.vms[0].ygg_ip
}
output "server2_planetary_ip" {
  value = grid_deployment.d1.vms[1].ygg_ip
}
output "server3_planetary_ip" {
  value = grid_deployment.d1.vms[2].ygg_ip
}
output "client1_planetary_ip" {
  value = grid_deployment.d1.vms[3].ygg_ip
}
output "client2_planetary_ip" {
  value = grid_deployment.d1.vms[4].ygg_ip
}
```

### Credentials File

We create a credentials file that will contain the environment variables. This file should be in the same directory as the main file.

* Create the `credentials.auto.tfvars` file
  *  ```
     nano credentials.auto.tfvars
     ```

* Copy the `credentials.auto.tfvars` content and save the file
  *  ```
     mnemonics = "..."
     SSH_KEY = "..."

     tfnodeid = "..."

     size = "50"
     cpu = "2"
     memory = "1024"
     ```

Make sure to replace the three dots by your own information for `mnemonics` and `SSH_KEY`. You will also need to find a suitable node for your deployment and set its node ID (`tfnodeid`). Feel free to adjust the parameters `size`, `cpu` and `memory` if needed.



## Deploy the Nomad Cluster

We now deploy the Nomad Cluster with Terraform. Make sure that you are in the directory containing the `main.tf` file.

* Initialize Terraform
  *  ```
     terraform init
     ```

* Apply Terraform to deploy the Nomad cluster
  *  ```
     terraform apply
     ```



## SSH into the Client and Server Nodes

You can now SSH into the client and server nodes using both the Planetary network and WireGuard.

Note that the IP addresses will be shown under `Outputs` after running the command `Terraform apply`, with `planetary_ip` for the Planetary network and `wg_ip` for WireGuard.

### SSH with the Planetary Network

* To [SSH with the Planetary network](../../getstarted/ssh_guide/ssh_openssh.md), write the following with the proper IP address
  *  ```
     ssh root@planetary_ip
     ```

You now have an SSH connection access over the Planetary network to the client and server nodes of your Nomad cluster.

### SSH with WireGuard

To SSH with WireGuard, we first need to set the proper WireGuard configurations.

* Create a file named  `wg.conf` in the directory `/etc/wireguard`
  *  ```
     nano /etc/wireguard/wg.conf
     ```

* Paste the content provided by the Terraform deployment in the file `wg.conf` and save it.
  * Note that you can use `terraform show` to see the Terraform output. The WireGuard configurations (`wg_config`) stands in between the two `EOT` instances.

* Start WireGuard on your local computer
  *  ```
     wg-quick up wg
     ```
* As a test, you can [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping) the WireGuard IP of a node to make sure the connection is correct
  *  ```
     ping wg_ip
     ```

We are now ready to SSH into the client and server nodes with WireGuard.

* To SSH with WireGuard, write the following with the proper IP address:
  *  ```
     ssh root@wg_ip
     ```

You now have an SSH connection access over WireGuard to the client and server nodes of your Nomad cluster. For more information on connecting with WireGuard, read [this documentation](../../getstarted/ssh_guide/ssh_wireguard.md).



## Destroy the Nomad Deployment

If you want to destroy the Nomad deployment, write the following in the terminal:

* ```
  terraform destroy
  ```
  * Then write `yes` to confirm. 

Make sure that you are in the corresponding Terraform folder when writing this command.


## Conclusion

You now have the basic knowledge to deploy a Nomad cluster on the TFGrid. Feel free to explore the many possibilities available that come with Nomad.

You can now use a Nomad cluster to deploy your workloads. For more information on this, read this documentation on [how to deploy a Redis workload on the Nomad cluster](https://developer.hashicorp.com/nomad/tutorials/get-started/gs-deploy-job).

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.