<h1>SSH Into a 3Node with Wireguard</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Find a 3Node with the ThreeFold Explorer](#find-a-3node-with-the-threefold-explorer)
- [Create the Terraform Files](#create-the-terraform-files)
- [Deploy the Micro VM with Terraform](#deploy-the-micro-vm-with-terraform)
- [Set the Wireguard Connection](#set-the-wireguard-connection)
- [SSH into the 3Node with Wireguard](#ssh-into-the-3node-with-wireguard)
- [Destroy the Terraform Deployment](#destroy-the-terraform-deployment)
- [Conclusion](#conclusion)

***

## Introduction

In this ThreeFold Guide, we show how simple it is to deploy a micro VM on the ThreeFold Grid with Terraform and to make an SSH connection with Wireguard.



## Prerequisites

* [Install Terraform](../terraform_install.md)
* [Install Wireguard](https://www.wireguard.com/install/)

You need to download and install properly Terraform and Wireguard on your local computer. Simply follow the linked documentation depending on your operating system (Linux, MAC and Windows).



## Find a 3Node with the ThreeFold Explorer

We want to find a proper 3Node to deploy our workload. For this guide, we want a 3Node with at least 15GB of storage, 1 vcore and 512MB of RAM, which are the minimum specifications for a micro VM on the TFGrid.

We show here how to find a suitable 3Node using the ThreeFold Explorer.

* Go to the ThreeFold Grid [Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) (Main Net) to find a 3Node
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
  * For each parameter, a new field will appear where you can enter a minimum number requirement for the 3Nodes. Here's what would work for our currernt situation.
    * `Free SRU (GB)`: 15
    * `Free MRU (GB)`: 1
    * `Total CRU (Cores)`: 1

Once you've found a proper node, take node of its node ID. You will need to use this ID when creating the Terraform files.



## Create the Terraform Files

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workloads.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file.

Of course, you can adjust the deployments based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployment-wg-ssh`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable file to take into account your own seed phras and SSH keys. You should also specifiy the node ID of the 3Node you will be deploying on.

Now let's create the Terraform files. 

* Open the terminal and go to the home directory
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployment-wg-ssh`:
  *  ```
     mkdir -p terraform/deployment-wg-ssh
     ```
  *  ```
     cd terraform/deployment-wg-ssh
     ```
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
  }
}

output "wg_config" {
  value = grid_network.net1.access_wg_config
}
output "node1_zmachine1_ip" {
  value = grid_deployment.d1.vms[0].ip
}

```

* Create the `credentials.auto.tfvars` file:
  *  ```
     nano credentials.auto.tfvars
     ```

* Copy the `credentials.auto.tfvars` content, set the node ID as well as your mnemonics and SSH public key, then save the file. 
  *  ```
     mnemonics = "..."
     SSH_KEY = "..."

     tfnodeid1 = "..."

     size = "15"
     cpu = "1"
     memory = "512"
     ```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the node ID of the 3Node server you wish to deploy on. Simply replace the three dots by the proper content.



## Deploy the Micro VM with Terraform

We now deploy the micro VM with Terraform. Make sure that you are in the correct folder `terraform/deployment-wg-ssh` containing the main and variables files.

* Initialize Terraform:
  *  ```
     terraform init
     ```

* Apply Terraform to deploy the micro VM:
  *  ```
     terraform apply
     ```
    * Terraform will then present you the actions it will perform. Write `yes` to confirm the deployment.


Note that, at any moment, if you want to see the information on your Terraform deployments, write the following:
  * ```
    terraform show
    ```



## Set the Wireguard Connection

To set the Wireguard connection, on your local computer, you will need to take the Terraform `wg_config` output and create a `wg.conf` file in the directory: `/usr/local/etc/wireguard/wg.conf`. Note that the Terraform output starts and ends with EOT.

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

> Note: If it doesn't work and you already did a Wireguard connection with the same file from Terraform (from a previous deployment), write on the terminal `wg-quick down wg`, then `wg-quick up wg`.

As a test, you can [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping) the virtual IP address of the VM to make sure the Wireguard connection is correct. Make sure to replace `vm_wg_ip` with the proper IP address:
* ```
  ping vm_wg_ip
  ```
  * Note that, with this Terraform deployment, the Wireguard IP address of the micro VM is named `node1_zmachine1_ip`


## SSH into the 3Node with Wireguard

To SSH into the 3Node with Wireguard, simply write the following in the terminal with the proper Wireguard IP address:

```
ssh root@vm_wg_ip
```

You now have access into the VM over Wireguard SSH connection.



## Destroy the Terraform Deployment

If you want to destroy the Terraform deployment, write the following in the terminal:

* ```
  terraform destroy
  ```
  * Then write `yes` to confirm. 

Make sure that you are in the corresponding Terraform folder when writing this command. In this guide, the folder is `deployment-wg-ssh`.



## Conclusion

In this simple ThreeFold Guide, you learned how to SSH into a 3Node with Wireguard and Terraform. Feel free to explore further Terraform and Wireguard.

As always, if you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.