<h1>Nextcloud 2-Node VPN Deployment</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [2-Node Terraform Deployment](#2-node-terraform-deployment)
  - [Create the Terraform Files](#create-the-terraform-files)
    - [Variables File](#variables-file)
    - [Main File](#main-file)
  - [Deploy the 2-Node VPN](#deploy-the-2-node-vpn)
- [Nextcloud Setup](#nextcloud-setup)
- [Nextcloud VM Prerequisites](#nextcloud-vm-prerequisites)
- [Prepare the VMs for the Rsync Daily Backup](#prepare-the-vms-for-the-rsync-daily-backup)
- [Create a Cron Job for the Rsync Daily Backup](#create-a-cron-job-for-the-rsync-daily-backup)
- [Future Projects](#future-projects)
- [Questions and Feedback](#questions-and-feedback)

***

# Introduction

This guide is a proof-of-concept to show that, using two VMs in a WireGuard VPN, it is possible to, on the first VM, set a Nextcloud AIO instance on the TFGrid, set on it a daily backup and update with Borgbackup, and, on the second VM, set a second daily backup of the first backup. This means that we have 2 virtual machines, one VM with the Nextcloud instance and the Nextcloud backup, and another VM with a backup of the Nextcloud backup. 

This architecture leads to a higher redundancy level, since we can afford to lose one of the two VMs and still be able to retrieve the Nextcloud database. Note that to achieve this, we are creating a virtual private network (VPN) with WireGuard. This will connect the two VMs and allow for file transfers. While there are many ways to proceed, for this guide we will be using [ssh-keygen](https://linux.die.net/man/1/ssh-keygen), [Rsync](https://linux.die.net/man/1/rsync) and [Cron](https://linux.die.net/man/1/crontab).

Note that, in order to reduce the deployment cost, we set the minimum CPU and memory requirements for the Backup VM. We do not need high CPU and memory for this VM since it is only used for storage.

Note that this guide also make use of the ThreeFold gateway. For this reason, this deployment can be set on any two 3Nodes on the TFGrid, i.e. there is no need for IPv4 on the 2 nodes we are deploying on, as long as we set a gateway on a gateway node.

For now, let's see how to achieve this redundant deployment with Rsync!

# 2-Node Terraform Deployment

For this guide, we are deploying a Nextcloud AIO instance along a Backup VM, enabling daily backups of both VMs. The two VMs are connected by a WireGuard VPN. The deployment will be using the [Nextcloud FList](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud) available in the **tf-images** ThreeFold Tech repository. 

## Create the Terraform Files

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workloads.

To facilitate the deployment, only the environment variables file needs to be adjusted. The **main.tf** file contains the environment variables (e.g. **var.size** for the disk size) and thus you do not need to change this file. Of course, you can adjust the deployment based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the main.tf as is.

For this example, we will be deploying the Nextcloud instance with a ThreeFold gateway and a gateway domain. Other configurations are possible.

### Variables File

* Copy the following content and save the file under the name `credentials.auto.tfvars`:

```
mnemonics = "..."
SSH_KEY = "..."
network = "main"

size_vm1 = "50"
cpu_vm1 = "2"
memory_vm1 = "4096"

size_vm2 = "50"
cpu_vm2 = "1"
memory_vm2 = "512"

gateway_id = "50"
vm1_id = "5453"
vm2_id = "12"

deployment_name = "nextcloudgatewayvpn"
nextcloud_flist = "https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist"
```

Make sure to add your own seed phrase and SSH public key. Simply replace the three dots by the content. Note that you can deploy on a different node than node 5453 for the **vm1** node. If you want to deploy on another node than node 5453 for the **gateway** node, make sure that you choose a gateway node. To find a gateway node, go on the [ThreeFold Dashboard](https://dashboard.grid.tf/) Nodes section of the Explorer and select **Gateways (Only)**.

Obviously, you can decide to increase or modify the quantity for the CPU, memory and size variables. Note that we set the minimum CPU and memory parameters for the Backup VM (**vm2**). This will reduce the cost of the deployment. Since the Backup VM is only used for storage, we don't need to set the CPU and memory higher.

### Main File

* Copy the following content and save the file under the name `main.tf`:

```
variable "mnemonics" {
  type = string
  default = "your mnemonics"
}

variable "network" {
  type = string
  default = "main"
}

variable "SSH_KEY" {
  type = string
  default = "your SSH pub key"
}

variable "deployment_name" {
  type = string
}

variable "size_vm1" {
  type = string
}

variable "cpu_vm1" {
  type = string
}

variable "memory_vm1" {
  type = string
}

variable "size_vm2" {
  type = string
}

variable "cpu_vm2" {
  type = string
}

variable "memory_vm2" {
  type = string
}

variable "nextcloud_flist" {
  type = string
}

variable "gateway_id" {
  type = string
}

variable "vm1_id" {
  type = string
}

variable "vm2_id" {
  type = string
}


terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

provider "grid" {
    mnemonics = var.mnemonics
    network = var.network
}

data "grid_gateway_domain" "domain" {
  node = var.gateway_id
  name = var.deployment_name
}

resource "grid_network" "net" {
    nodes = [var.gateway_id, var.vm1_id, var.vm2_id]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "My network"
    add_wg_access = true
}

resource "grid_deployment" "d1" {
  node = var.vm1_id
  network_name = grid_network.net.name

  disks {
    name = "data"
    size = var.size_vm1
  }

  vms {
    name = "vm1"
    flist = var.nextcloud_flist
    cpu = var.cpu_vm1
    memory = var.memory_vm1
    rootfs_size = 15000
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
      GATEWAY = "true"
      IPV4 = "false"
      NEXTCLOUD_DOMAIN = data.grid_gateway_domain.domain.fqdn
    }
    mounts {
        disk_name = "data"
        mount_point = "/mnt/data"
    }
  }
}

resource "grid_deployment" "d2" {
  disks {
    name = "disk2"
    size = var.size_vm2
  }
  node         = var.vm2_id
  network_name = grid_network.net.name

  vms {
    name       = "vm2"
    flist      = "https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist"
    cpu        = var.cpu_vm2
    mounts {
        disk_name = "disk2"
        mount_point = "/disk2"
    }
    memory     = var.memory_vm2
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = var.SSH_KEY
    }
    planetary = true
  }
}

resource "grid_name_proxy" "p1" {
  node            = var.gateway_id
  name            = data.grid_gateway_domain.domain.name
  backends        = [format("http://%s:80", grid_deployment.d1.vms[0].ip)]
  network         = grid_network.net.name
  tls_passthrough = false
}

output "wg_config" {
  value = grid_network.net.access_wg_config
}

output "vm1_ip" {
  value = grid_deployment.d1.vms[0].ip
}

output "vm2_ip" {
  value = grid_deployment.d2.vms[0].ip
}


output "fqdn" {
  value = data.grid_gateway_domain.domain.fqdn
}
```

## Deploy the 2-Node VPN

We now deploy the 2-node VPN with Terraform. Make sure that you are in the correct folder containing the main and variables files.

* Initialize Terraform:
  *  ```
     terraform init
     ```

* Apply Terraform to deploy Nextcloud:
  *  ```
     terraform apply
     ```

Note that, at any moment, if you want to see the information on your Terraform deployment, write the following:
  * ```
    terraform show
    ```

# Nextcloud Setup

* Access Nextcloud Setup
  * Once you've deployed Nextcloud, you can access the Nextcloud Setup page by pasting on a browser the URL displayed on the line `fqdn = "..."` of the `terraform show` output. For more information on this, [read this documentation](../../../dashboard/solutions/nextcloud.md#nextcloud-setup).
* Create a backup and set a daily backup and update
  * Make sure to create a backup with `/mnt/backup` as the mount point, and set a daily update and backup for your Nextcloud VM. For more information, [read this documentation](../../../dashboard/solutions/nextcloud.md#backups-and-updates).

> Note: By default, the daily Borgbackup is set at 4:00 UTC. If you change this parameter, make sure to adjust the moment the [Rsync backup](#create-a-cron-job-for-the-rsync-daily-backup) is done.

# Nextcloud VM Prerequisites

We need to install a few things on the Nextcloud VM before going further.

* Update the Nextcloud VM
  * ```
    apt update
    ```
* Install ping on the Nextcloud VM if you want to test the VPN connection (Optional)
  * ```
    apt install iputils-ping -y
    ```
* Install Rsync on the Nextcloud VM
  * ```
    apt install rsync
    ```
* Install nano on the Nextcloud VM
  * ```
    apt install nano
    ```
* Install Cron on the Nextcloud VM
  * apt install cron

# Prepare the VMs for the Rsync Daily Backup

* Test the VPN (Optional) with [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping)
  * ```
    ping <WireGuard_VM_IP_Address>
    ```
* Generate an SSH key pair on the Backup VM
  * ```
    ssh-keygen
    ```
* Take note of the public key in the Backup VM
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
* Add the public key of the Backup VM in the Nextcloud VM
  * ```
    nano ~/.ssh/authorized_keys
    ```

> Make sure to put the Backup VM SSH public key before the public key already present in the file **authorized_keys** of the Nextcloud VM.

# Create a Cron Job for the Rsync Daily Backup

We now set a daily cron job that will make a backup between the Nextcloud VM and the Backup VM using Rsync.

* Open the crontab on the Backup VM
  * ```
    crontab -e
    ```
* Add the cron job at the end of the file
  * ```
    0 8 * * * rsync -avz --no-perms -O --progress --delete --log-file=/root/rsync_storage.log root@10.1.3.2:/mnt/backup/ /mnt/backup/ 
    ```

> Note: By default, the Nextcloud automatic backup is set at 4:00 UTC. For this reason, we set the Rsync daily backup at 8:00 UTC.

> Note: To set Rsync with a script, [read this documentation](../../computer_it_basics/file_transfer.md#automate-backup-with-rsync). 

# Future Projects

This concept can be expanded in many directions. We can generate a script to facilitate the process, we can set a script directly in an FList for minimal user configurations, we can also explore Mariadb and GlusterFS instead of Rsync.

As a generic deployment, we can develop a weblet that makes a daily backup of any other ThreeFold Playground weblet. 

# Questions and Feedback

We invite others to propose ideas and codes if they feel inspired!

If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.