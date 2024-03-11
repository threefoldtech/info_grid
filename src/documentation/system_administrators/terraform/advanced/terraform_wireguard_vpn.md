<h1>Deploy Micro VMs and Set a Wireguard VPN</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Find a 3Node with the ThreeFold Explorer](#find-a-3node-with-the-threefold-explorer)
- [Create a Two Servers Wireguard VPN with Terraform](#create-a-two-servers-wireguard-vpn-with-terraform)
- [Deploy the Micro VMs with Terraform](#deploy-the-micro-vms-with-terraform)
- [Set the Wireguard Connection](#set-the-wireguard-connection)
- [SSH into the 3Node](#ssh-into-the-3node)
- [Destroy the Terraform Deployment](#destroy-the-terraform-deployment)
- [Conclusion](#conclusion)

***

## Introduction

In this ThreeFold Guide, we will learn how to deploy two micro virtual machines (Ubuntu 22.04) with Terraform. The Terraform deployment will be composed of a virtual private network (VPN) using Wireguard. The two VMs will thus be connected in a private and secure network.

Note that this concept can be extended with more than two micro VMs. Once you understand this guide, you will be able to adjust and deploy your own personalized Wireguard VPN on the ThreeFold Grid.


## Prerequisites

* [Install Terraform](../terraform_install.md)
* [Install Wireguard](https://www.wireguard.com/install/)

You need to download and install properly Terraform and Wireguard on your local computer. Simply follow the linked documentation depending on your operating system (Linux, MAC and Windows).



## Find a 3Node with the ThreeFold Explorer

We want to find a proper 3Node to deploy our workload. For this guide, we want a 3Node with at least 15GB of storage, 1 vcore and 512MB of RAM, which are the minimum specifications for a micro VM on the TFGrid. We are also looking for a 3Node with a public IPv4 address.

We show here how to find a suitable 3Node using the ThreeFold Explorer.

* Go to the ThreeFold Grid [Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) (Main Net)
* Find a 3Node with suitable resources for the deployment and take note of its node ID on the leftmost column `ID`
* For proper understanding, we give further information on some relevant columns:
  * `ID` refers to the node ID
  * `Free Public IPs` refers to available IPv4 public IP addresses
  * `HRU` refers to HDD storage
  * `SRU` refers to SSD storage
  * `MRU` refers to RAM (memory)
  * `CRU` refers to virtual cores (vcores)
* To quicken the process of finding a proper 3Node, you can narrow down the search by adding filters:
  * At the top left of the screen, in the `Filters` box, select the parameter(s) you want.
  * For each parameter, a new field will appear where you can enter a minimum number requirement for the 3Nodes.
    * `Free SRU (GB)`: 15
    * `Free MRU (GB)`: 1
    * `Total CRU (Cores)`: 1
    * `Free Public IP`: 2
      * Note: if you want a public IPv4 address, it is recommended to set the parameter `FREE PUBLIC IP` to at least 2 to avoid false positives. This ensures that the shown 3Nodes have viable IP addresses.

Once you've found a proper node, take node of its node ID. You will need to use this ID when creating the Terraform files.



## Create a Two Servers Wireguard VPN with Terraform

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workloads.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file.

Of course, you can adjust the deployments based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployment-wg-vpn`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable file to take into account your own seed phras and SSH keys. You should also specifiy the node IDs of the two 3Nodes you will be deploying on.

Now let's create the Terraform files.


* Open the terminal and go to the home directory
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployment-wg-vpn`:
  *  ```
     mkdir -p terraform && cd $_
     ```
  *  ```
     mkdir deployment-wg-vpn && cd $_
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

variable "tfnodeid2" {
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
  nodes       = [var.tfnodeid1, var.tfnodeid2]
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

resource "grid_deployment" "d2" {
  disks {
    name = "disk2"
    size = var.size
  }
  name         = local.name
  node         = var.tfnodeid2
  network_name = grid_network.net1.name

  vms {
    name       = "vm2"
    flist      = "https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist"
    cpu        = var.cpu
    mounts {
        disk_name = "disk2"
        mount_point = "/disk2"
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
output "node1_zmachine2_ip" {
  value = grid_deployment.d2.vms[0].ip
}

output "ygg_ip1" {
  value = grid_deployment.d1.vms[0].ygg_ip
}
output "ygg_ip2" {
  value = grid_deployment.d2.vms[0].ygg_ip
}

output "ipv4_vm1" {
  value = grid_deployment.d1.vms[0].computedip
}

output "ipv4_vm2" {
  value = grid_deployment.d2.vms[0].computedip
}

```

In this guide, the virtual IP for `vm1` is 10.1.3.2 and the virtual IP for `vm2` is 10.1.4.2. This might be different during your own deployment. Change the codes in this guide accordingly.

* Create the `credentials.auto.tfvars` file:
  *  ```
     nano credentials.auto.tfvars
     ```

* Copy the `credentials.auto.tfvars` content and save the file. 
  *  ```
     mnemonics = "..."
     SSH_KEY = "..."

     tfnodeid1 = "..."
     tfnodeid2 = "..."

     size = "15"
     cpu = "1"
     memory = "512"
     ```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the two node IDs of the servers used. Simply replace the three dots by the content. 

Set the parameters for your VMs as you wish. The two servers will have the same parameters. For this example, we use the minimum parameters.


## Deploy the Micro VMs with Terraform

We now deploy the VPN with Terraform. Make sure that you are in the correct folder `terraform/deployment-wg-vpn` containing the main and variables files.

* Initialize Terraform by writing the following in the terminal:
  * ```
    terraform init
    ```
* Apply the Terraform deployment:
  * ```
    terraform apply
    ```
    * Terraform will then present you the actions it will perform. Write `yes` to confirm the deployment.

Note that, at any moment, if you want to see the information on your Terraform deployments, write the following:
  * ```
    terraform show
    ```



## Set the Wireguard Connection

To set the Wireguard connection, on your local computer, you will need to take the terraform `wg_config` output and create a `wg.conf` file in the directory: `/usr/local/etc/wireguard/wg.conf`. Note that the Terraform output starts and ends with EOT.

For more information on WireGuard, notably in relation to Windows, please read [this documentation](../../getstarted/ssh_guide/ssh_wireguard.md).

* Create a file named `wg.conf` in the directory: `/usr/local/etc/wireguard/wg.conf`.
  * ```
    nano /usr/local/etc/wireguard/wg.conf
    ```
  * Paste the content between the two `EOT` displayed after you set `terraform apply`.

* Start the wireguard:
  * ```
    wg-quick up wg
    ```

If you want to stop the Wireguard service, write the following on your terminal:

* ```
  wg-quick down wg
  ```

> Note: If it doesn't work and you already did a Wireguard connection with the same file from terraform (from a previous deployment), write on the terminal `wg-quick down wg`, then `wg-quick up wg`.

As a test, you can [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping) the virtual IP address of the VMs to make sure the Wireguard connection is correct. Make sure to replace `wg_vm_ip` with the proper IP address for each VM:

* ```
  ping wg_vm_ip
  ```



## SSH into the 3Node

You can now SSH into the 3Nodes with either Wireguard or IPv4.

To SSH with Wireguard, write the following with the proper IP address for each 3Node:

```
ssh root@vm_wg_ip
```

To SSH with IPv4, write the following for each 3Nodes:

```
ssh root@vm_IPv4
```

You now have an SSH connection access to the VMs over Wireguard and IPv4.



## Destroy the Terraform Deployment

If you want to destroy the Terraform deployment, write the following in the terminal:

* ```
  terraform destroy
  ```
  * Then write `yes` to confirm. 

Make sure that you are in the corresponding Terraform folder when writing this command. In this guide, the folder is `deployment-wg-vpn`.



## Conclusion

In this ThreeFold Guide, we learned how easy it is to deploy a VPN with Wireguard and Terraform. You can adjust the parameters how you like and explore different possibilities.

As always, if you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.