<h1> QSFS on Micro VM with Terraform</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Find a 3Node](#find-a-3node)
- [Create the Terraform Files](#create-the-terraform-files)
  - [Create the Files with the Provider](#create-the-files-with-the-provider)
  - [Create the Files Manually](#create-the-files-manually)
- [Deploy the Micro VM with Terraform](#deploy-the-micro-vm-with-terraform)
- [SSH into the 3Node](#ssh-into-the-3node)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this ThreeFold Guide, we will learn how to deploy a Quantum Safe File System (QSFS) deployment with Terraform. The main template for this example can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/qsfs/main.tf). 


## Prerequisites

In this guide, we will be using Terraform to deploy a QSFS workload on a micro VM that runs on the TFGrid. Make sure to have the latest Terraform version.

- [Install Terraform](../terraform_install.md)




## Find a 3Node

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



## Create the Terraform Files

We present two different methods to create the Terraform files. In the first method, we will create the Terraform files using the [TFGrid Terraform Provider](https://github.com/threefoldtech/terraform-provider-grid). In the second method, we will create the Terraform files manually. Feel free to choose the method that suits you best.

### Create the Files with the Provider

Creating the Terraform files is very straightforward. We want to clone the repository `terraform-provider-grid` locally and run some simple commands to properly set and start the deployment.

* Clone the repository `terraform-provider-grid`
  * ```
    git clone https://github.com/threefoldtech/terraform-provider-grid
    ```
* Go to the subdirectory containing the examples
  * ```
    cd terraform-provider-grid/examples/resources/qsfs
    ```
* Set your own mnemonics (replace `mnemonics words` with your own mnemonics)
  * ```
    export MNEMONICS="mnemonics words"
    ```
* Set the network (replace `network` by the desired network, e.g. `dev`, `qa`, `test` or `main`)
  * ```
    export NETWORK="network"
    ```
* Initialize the Terraform deployment
  * ```
    terraform init
    ```
* Apply the Terraform deployment
  * ```
    terraform apply
    ```
* At any moment, you can destroy the deployment with the following line
  * ```
    terraform destroy
    ```

When using this method, you might need to change some parameters within the `main.tf` depending on your specific deployment.

### Create the Files Manually

For this method, we use two files to deploy with Terraform. The first file contains the environment variables (**credentials.auto.tfvars**) and the second file contains the parameters to deploy our workloads (**main.tf**). To facilitate the deployment, only the environment variables file needs to be adjusted. The **main.tf** file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file, but only the file **credentials.auto.tfvars**.

* Open the terminal and go to the home directory (optional)
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployment-qsfs-microvm`:
  *  ```
     mkdir -p terraform && cd $_
     ```
  *  ```
     mkdir deployment-qsfs-microvm && cd $_
     ```
* Create the `main.tf` file:
  *  ```
     nano main.tf
     ```

* Copy the `main.tf` content and save the file.


```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

# Variables

variable "mnemonics" {
  type = string
}

variable "SSH_KEY" {
  type = string
}

variable "network" {
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

variable "minimal_shards" {
  type = string
}

variable "expected_shards" {
  type = string
}

provider "grid" {
  mnemonics = var.mnemonics
  network = var.network
}

locals {
  metas = ["meta1", "meta2", "meta3", "meta4"]
  datas = ["data1", "data2", "data3", "data4"]
}

resource "grid_network" "net1" {
  nodes       = [var.tfnodeid1]
  ip_range    = "10.1.0.0/16"
  name        = "network"
  description = "newer network"
}

resource "grid_deployment" "d1" {
  node = var.tfnodeid1
  dynamic "zdbs" {
    for_each = local.metas
    content {
      name        = zdbs.value
      description = "description"
      password    = "password"
      size        = var.size
      mode        = "user"
    }
  }
  dynamic "zdbs" {
    for_each = local.datas
    content {
      name        = zdbs.value
      description = "description"
      password    = "password"
      size        = var.size
      mode        = "seq"
    }
  }
}

resource "grid_deployment" "qsfs" {
  node         = var.tfnodeid1
  network_name = grid_network.net1.name
  qsfs {
    name                  = "qsfs"
    description           = "description6"
    cache                 = 10240 # 10 GB
    minimal_shards        = var.minimal_shards
    expected_shards       = var.expected_shards
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
    name       = "vm1"
    flist      = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu        = var.cpu
    memory     = var.memory
    entrypoint = "/sbin/zinit init"
    planetary  = true
    env_vars = {
      SSH_KEY = var.SSH_KEY
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

Note that we named the VM as **vm1**.

* Create the `credentials.auto.tfvars` file:
  *  ```
     nano credentials.auto.tfvars
     ```

* Copy the `credentials.auto.tfvars` content and save the file. 
  * ```terraform
    # Network
    network = "main"

    # Credentials
    mnemonics = "..."
    SSH_KEY = "..."

    # Node Parameters
    tfnodeid1 = "..."
    size = "15"
    cpu = "1"
    memory = "512"

    # QSFS Parameters
    minimal_shards = "2"
    expected_shards = "4"
    ```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the node ID of the 3Node you want to deploy on. Simply replace the three dots by the content. If you want to deploy on the Test net, you can replace **main** by **test**.

Set the parameters for your VMs as you wish. For this example, we use the minimum parameters.

For the section QSFS Parameters, you can decide on how many VMs your data will be sharded. You can also decide the minimum of VMs to recover the whole of your data. For example, a 16 minimum, 20 expected configuration will disperse your data on 20 3Nodes, and the deployment will only need at any time 16 VMs to recover the whole of your data. This gives resilience and redundancy to your storage. A 2 minimum, 4 expected configuration is given here for the main template.



## Deploy the Micro VM with Terraform

We now deploy the QSFS deployment with Terraform. Make sure that you are in the correct folder `terraform/deployment-qsfs-microvm` containing the main and variables files.

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



## SSH into the 3Node

You can now SSH into the 3Node with Planetary Network.

To SSH with Planetary Network, write the following:

```
ssh root@planetary_IP
```

Note that the IP address should be the value of the parameter **ygg_ip** from the Terraform Outputs.

You now have an SSH connection access to the VM over Planetary Network.



## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.