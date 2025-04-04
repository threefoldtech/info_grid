---
title: "Synced CouchDB Databases (NoSQL)"
sidebar_position: 263
---

<h1> Apache CouchDB Synced Databases Between Two VMs</h1>

## Introduction

In this guide, we will demonstrate how to deploy a VPN using WireGuard and create a synced **Apache CouchDB** database between two virtual machines (VMs) using the built-in replication feature of CouchDB. Any changes made to the database on one VM will be mirrored on the other VM. This setup can be useful for creating redundant and highly available server architectures.

### CouchDB

Apache CouchDB is a NoSQL database that uses JSON for documents, JavaScript for indexing and querying, and HTTP for an API. It is designed for ease of use, scalability, and reliability, offering features like distributed architecture, offline-first capabilities, and built-in replication. CouchDB is Free and Open Source Software (FOSS), released under the Apache License 2.0, making it free to use, modify, and distribute.

### Replication

The CouchDB replication is bidirectional and managed by the CouchDB server itself. The replication request tells CouchDB to synchronize data between the two databases, and CouchDB handles the rest.

## Main Steps

Here’s an overview of the process:

1. **Set up Terraform and WireGuard** on your local machine.
2. **Find two 3Nodes** on the ThreeFold Grid with sufficient resources.
3. **Deploy and configure the VMs** using Terraform.
4. **Install and configure CouchDB** on both VMs.
5. **Verify the replication** between the two VMs.


## Prerequisites

Before starting, ensure you have the following installed on your local machine:

1. **Terraform**: Follow the official [Terraform installation guide](https://developer.hashicorp.com/terraform/downloads).
2. **WireGuard**: Follow the official [WireGuard installation guide](https://www.wireguard.com/install/).
3. **SSH Key**: Ensure you have an SSH key pair (`id_rsa` and `id_rsa.pub`). If not, generate one:
   ```bash
   ssh-keygen -t ed25519
   ```



## Find Nodes with the ThreeFold Explorer

1. Go to the ThreeFold Grid [Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) (Main Net).
2. Find two 3Nodes with the following minimum resources:
   - **1 CPU**
   - **2 GB RAM**
   - **50 GB Storage**
   - **Public IPv4 Address**
3. Note the **Node IDs** of the selected nodes for use in the Terraform configuration.



## Set Up the VMs

### Create a Two-Server WireGuard VPN with Terraform

1. Create a folder for the Terraform configuration:
   ```bash
   mkdir -p ~/terraform/couchdb-sync
   cd ~/terraform/couchdb-sync
   ```

2. Create the `main.tf` file:
   ```bash
   nano main.tf
   ```

3. Paste the following Terraform configuration into `main.tf`:
   ```hcl
   terraform {
     required_providers {
       grid = {
         source = "threefoldtech/grid"
       }
     }
   }

   variable "mnemonic" {
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
     mnemonic = var.mnemonic
     network  = "main"
   }

   locals {
     name = "couchdb-vm"
   }

   resource "grid_network" "net1" {
     name        = local.name
     nodes       = [var.tfnodeid1, var.tfnodeid2]
     ip_range    = "10.1.0.0/16"
     description = "CouchDB Synced Network"
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
       name       = "vm1"
       flist      = "https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist"
       cpu        = var.cpu
       mounts {
         name       = "disk1"
         mount_point = "/disk1"
       }
       memory     = var.memory
       entrypoint = "/sbin/zinit init"
       env_vars   = {
         SSH_KEY = var.SSH_KEY
       }
       publicip   = true
       planetary  = true
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
         name       = "disk2"
         mount_point = "/disk2"
       }
       memory     = var.memory
       entrypoint = "/sbin/zinit init"
       env_vars   = {
         SSH_KEY = var.SSH_KEY
       }
       publicip   = true
       planetary  = true
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

   output "planetary_ip1" {
     value = grid_deployment.d1.vms[0].planetary_ip
   }

   output "planetary_ip2" {
     value = grid_deployment.d2.vms[0].planetary_ip
   }

   output "ipv4_vm1" {
     value = grid_deployment.d1.vms[0].computedip
   }

   output "ipv4_vm2" {
     value = grid_deployment.d2.vms[0].computedip
   }
   ```

4. Create the `credentials.auto.tfvars` file:
   ```bash
   nano credentials.auto.tfvars
   ```

5. Paste the following content into `credentials.auto.tfvars`:
   ```hcl
   mnemonic = "your_mnemonic_phrase"
   SSH_KEY = "your_ssh_public_key"

   tfnodeid1 = "node_id_1"
   tfnodeid2 = "node_id_2"

   size = "50"
   cpu = "1"
   memory = "2048"
   ```

   Replace the placeholders with your actual mnemonic, SSH public key, and node IDs.



### Deploy the 3Nodes with Terraform

1. Initialize Terraform:
   ```bash
   terraform init
   ```

2. Apply the Terraform configuration:
   ```bash
   terraform apply
   ```

3. Confirm the deployment by typing `yes` when prompted.

4. After deployment, note the **WireGuard configuration** and **VM IP addresses** from the Terraform output.

### Test the WireGuard Connection

1. On your local machine, create a WireGuard configuration file:
   ```bash
   nano /etc/wireguard/wg.conf
   ```

2. Paste the `wg_config` output from Terraform into the file.

3. Start WireGuard:
   ```bash
   wg-quick up wg
   ```

4. Test the connection by pinging the VMs:
   ```bash
   ping 10.1.3.2
   ping 10.1.4.2
   ```


### SSH into the VMs

1. SSH into each VM using its IP address:
   ```bash
   ssh root@<VM_IP_Address>
   ```



### Prepare the VMs for Deployment

You can upgrade and reboot the system if you want, but it is optional. The updating command is necessary.

1. Update and upgrade the system:
   ```bash
   apt update && apt upgrade -y
   ```

2. Reboot the VMs if necessary:
   ```bash
   reboot
   ```






## Configure CouchDB

### Install CouchDB on Both VMs

1. Update the system and install dependencies, add the CouchDB repository, install CouchDB and test the installation:
   ```bash
   apt update && apt install -y curl apt-transport-https gnupg sudo
   curl https://couchdb.apache.org/repo/keys.asc | gpg --dearmor | sudo tee /usr/share/keyrings/couchdb-archive-keyring.gpg >/dev/null 2>&1
   echo "deb [signed-by=/usr/share/keyrings/couchdb-archive-keyring.gpg] https://apache.jfrog.io/artifactory/couchdb-deb/ jammy main" | sudo tee /etc/apt/sources.list.d/couchdb.list >/dev/null
   sudo apt update
   sudo apt install -y couchdb
   curl http://127.0.0.1:5984/
   ```

   You should see a response like:
   ```json
   {
      "couchdb": "Welcome",
      "version": "3.3.2",
      "git_sha": "abcdef1",
      "uuid": "1234567890abcdef1234567890abcdef",
      "features": ["pluggable-storage-engines", "scheduler"],
      "vendor": {
         "name": "The Apache Software Foundation"
      }
   }
   ```

5. Start and enable the CouchDB service:
   ```bash
   systemctl enable --now couchdb
   ```



### Configure CouchDB for Replication

1. On both VMs, edit the CouchDB configuration file:
   ```bash
   nano /opt/couchdb/etc/local.ini
   ```

2. Update the `[chttpd]` section to bind CouchDB to the WireGuard IP address, make sure to remove the semi-clon (`;`) in front of the lines
   ```ini
   [chttpd]
   bind_address = 0.0.0.0
   port = 5984
   ```

2. Set the admin with a password
   ```ini
   [admins]
   admin = password 
   ```

1. Restart CouchDB on both VMs:
   ```bash
   systemctl restart couchdb
   ```

2. On both VMs,  create a database:
   ```bash
   curl -X PUT http://admin:password@127.0.0.1:5984/mydatabase
   ```

3. Set up replication between the two databases on either one of the VMs. This command sets up continuous replication from the master VM to the worker VM.
   ```bash
   curl -X POST http://admin:password@127.0.0.1:5984/_replicate -d '{"source": "http://admin:password@10.1.3.2:5984/mydatabase", "target": "http://admin:password@10.1.4.2:5984/mydatabase", "continuous": true}' -H "Content-Type: application/json"
   ```
   


### Verify the Replication

1. On the **master VM**, add a document to the database:
   ```bash
   curl -X POST http://admin:password@127.0.0.1:5984/mydatabase -d '{"name": "test", "value": "123"}' -H "Content-Type: application/json"
   ```

2. On the **worker VM**, check if the document is replicated:
   ```bash
   curl -X GET http://admin:password@127.0.0.1:5984/mydatabase/_all_docs
   ```

   You should see the document you created on the master VM.

## Conclusion

You now have two VMs with a synced **Apache CouchDB** database with the built-in CouchDB replication feature. This setup provides redundancy and high availability for your database.

If you have any questions, feel free to ask the ThreeFold community on the [ThreeFold Forum](http://forum.threefold.io/) or the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.