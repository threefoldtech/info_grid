<h1>MariaDB Synced Databases Between Two VMs</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Main Steps](#main-steps)
- [Prerequisites](#prerequisites)
- [Find Nodes with the ThreeFold Explorer](#find-nodes-with-the-threefold-explorer)
- [Set the VMs](#set-the-vms)
  - [Create a Two Servers Wireguard VPN with Terraform](#create-a-two-servers-wireguard-vpn-with-terraform)
    - [Create the Terraform Files](#create-the-terraform-files)
    - [Deploy the 3Nodes with Terraform](#deploy-the-3nodes-with-terraform)
    - [SSH into the 3Nodes](#ssh-into-the-3nodes)
    - [Preparing the VMs for the Deployment](#preparing-the-vms-for-the-deployment)
    - [Test the Wireguard Connection](#test-the-wireguard-connection)
- [Configure the MariaDB Database](#configure-the-mariadb-database)
  - [Download MariaDB and Configure the Database](#download-mariadb-and-configure-the-database)
  - [Create User with Replication Grant](#create-user-with-replication-grant)
  - [Verify the Access of the User](#verify-the-access-of-the-user)
  - [Set the VMs to accept the MariaDB Connection](#set-the-vms-to-accept-the-mariadb-connection)
    - [TF Template Worker Server Data](#tf-template-worker-server-data)
    - [TF Template Master Server Data](#tf-template-master-server-data)
  - [Set the MariaDB Databases on Both 3Nodes](#set-the-mariadb-databases-on-both-3nodes)
- [Install and Set GlusterFS](#install-and-set-glusterfs)
- [Conclusion](#conclusion)

***

# Introduction

In this ThreeFold Guide, we show how to deploy a VPN with Wireguard and create a synced MariaDB database between the two servers using GlusterFS, a scalable network filesystem. Any change in one VM's database will be echoed in the other VM's database. This kind of deployment can lead to useful server architectures. 



# Main Steps

This guide might seems overwhelming, but the steps are carefully explained. Take your time and it will all work out!

To get an overview of the whole process, we present the main steps:

* Download the dependencies
* Find two 3Nodes on the TFGrid
* Deploy and set the VMs with Terraform
* Create a MariaDB database
* Set GlusterFS



# Prerequisites

* [Install Terraform](https://developer.hashicorp.com/terraform/downloads)
* [Install Wireguard](https://www.wireguard.com/install/)

You need to download and install properly Terraform and Wireguard on your local computer. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).



# Find Nodes with the ThreeFold Explorer

We first need to decide on which 3Nodes we will be deploying our workload.

We thus start by finding two 3Nodes with sufficient resources. For this current MariaDB guide, we will be using 1 CPU, 2 GB of RAM and 50 GB of storage. We are also looking for a 3Node with a public IPv4 address.

* Go to the ThreeFold Grid [Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) (Main Net)
* Find a 3Node with suitable resources for the deployment and take note of its node ID on the leftmost column `ID`
* For proper understanding, we give further information on some relevant columns:
  * `ID` refers to the node ID
  * `Free Public IPs` refers to available IPv4 public IP addresses
  * `HRU` refers to HDD storage
  * `SRU` refers to SSD storage
  * `MRU` refers to RAM (memory)
  * `CRU` refers to virtual cores (vcores)
* To quicken the process of finding proper 3Nodes, you can narrow down the search by adding filters:
  * At the top left of the screen, in the `Filters` box, select the parameter(s) you want.
  * For each parameter, a new field will appear where you can enter a minimum number requirement for the 3Nodes.
    * `Free SRU (GB)`: 50
    * `Free MRU (GB)`: 2
    * `Total CRU (Cores)`: 1
    * `Free Public IP`: 2
      * Note: if you want a public IPv4 address, it is recommended to set the parameter `FREE PUBLIC IP` to at least 2 to avoid false positives. This ensures that the shown 3Nodes have viable IP addresses.

Once you've found a proper node, take node of its node ID. You will need to use this ID when creating the Terraform files.



# Set the VMs
## Create a Two Servers Wireguard VPN with Terraform

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workloads.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file.
Of course, you can adjust the deployment based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployment-synced-db`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable files to take into account your own seed phras and SSH keys. You should also specifiy the node IDs of the two 3Nodes you will be deploying on.



### Create the Terraform Files

Open the terminal.

* Go to the home folder
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployment-synced-db`:
  *  ```
     mkdir -p terraform/deployment-synced-db
     ```
  *  ```
     cd terraform/deployment-synced-db
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

In this file, we name the first VM as `vm1` and the second VM as `vm2`. For ease of communication, in this guide we call `vm1` as the master VM and `vm2` as the worker VM.

In this guide, the virtual IP for `vm1` is 10.1.3.2 and the virtual IP for `vm2`is 10.1.4.2. This might be different during your own deployment. If so, change the codes in this guide accordingly.

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

     size = "50"
     cpu = "1"
     memory = "2048"
     ```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the two node IDs of the servers used. Simply replace the three dots by the content. Obviously, you can decide to increase or modify the quantity in the variables `size`, `cpu` and `memory`.



### Deploy the 3Nodes with Terraform

We now deploy the VPN with Terraform. Make sure that you are in the correct folder `terraform/deployment-synced-db` with the main and variables files.

* Initialize Terraform:
  *  ```
     terraform init
     ```

* Apply Terraform to deploy the VPN:
  *  ```
     terraform apply
     ```

After deployments, take note of the 3Nodes' IPv4 address. You will need those addresses to SSH into the 3Nodes.

Note that, at any moment, if you want to see the information on your Terraform deployments, write the following:
  * ```
    terraform show
    ```



### SSH into the 3Nodes

* To [SSH into the 3Nodes](../../getstarted/ssh_guide/ssh_guide.md), write the following while making sure to set the proper IP address for each VM:
  *  ```
     ssh root@3node_IPv4_Address
     ```



### Preparing the VMs for the Deployment

* Update and upgrade the system
  * ```
    apt update && sudo apt upgrade -y && sudo apt-get install apache2 -y
    ```
* After download, you might need to reboot the system for changes to be fully taken into account
  * ```
    reboot
    ``` 
* Reconnect to the VMs



### Test the Wireguard Connection

We now want to ping the VMs using Wireguard. This will ensure the connection is properly established.

First, we set Wireguard with the Terraform output.

* On your local computer, take the Terraform's `wg_config` output and create a `wg.conf` file in the directory `/usr/local/etc/wireguard/wg.conf`.
  *  ```
     nano /usr/local/etc/wireguard/wg.conf
     ```

* Paste the content provided by the Terraform deployment. You can use `terraform show` to see the Terraform output. The WireGuard output stands in between `EOT`.

* Start the WireGuard on your local computer:
  *  ```
     wg-quick up wg
     ```

* To stop the wireguard service:
  *  ```
     wg-quick down wg
     ```

> Note: If it doesn't work and you already did a WireGuard connection with the same file from Terraform (from a previous deployment perhaps), do `wg-quick down wg`, then `wg-quick up wg`.
This should set everything properly.

* As a test, you can [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping) the virtual IP addresses of both VMs to make sure the Wireguard connection is correct:
  *  ```
     ping 10.1.3.2
     ```
  *  ```
     ping 10.1.4.2
     ```

If you correctly receive the packets for the two VMs, you know that the VPN is properly set.

For more information on WireGuard, notably in relation to Windows, please read [this documentation](../../getstarted/ssh_guide/ssh_wireguard.md).



# Configure the MariaDB Database

## Download MariaDB and Configure the Database

* Download the MariaDB server and client on both the master VM and the worker VM
  * ```
    apt install mariadb-server mariadb-client -y
    ```
* Configure the MariaDB database
  * ```
    nano /etc/mysql/mariadb.conf.d/50-server.cnf
    ```
    * Do the following changes 
      * Add `#` in front of
        * `bind-address = 127.0.0.1`
      * Remove `#` in front of the following lines and replace  `X` by `1` for the master VM and by `2` for the worker VM
        ```
        #server-id              = X
        #log_bin                = /var/log/mysql/mysql-bin.log
        ```
      * Below the lines shown above add the following line:
        ```
        binlog_do_db           = tfdatabase
        ```

* Restart MariaDB
  * ```
    systemctl restart mysql
    ```

* Launch Mariadb
  * ```
    mysql
    ```



## Create User with Replication Grant

* Do the following on both the master and the worker
  * ```
    CREATE USER 'repuser'@'%' IDENTIFIED BY 'password';
    GRANT REPLICATION SLAVE ON *.* TO 'repuser'@'%' ;
    FLUSH PRIVILEGES;
    show master status\G;
    ```



## Verify the Access of the User
* Verify the access of repuser user
    ```
    SELECT host FROM mysql.user WHERE User = 'repuser';
    ```
  * You want to see `%` in Host



## Set the VMs to accept the MariaDB Connection

### TF Template Worker Server Data

* Write the following in the Worker VM
  * ```
    CHANGE MASTER TO MASTER_HOST='10.1.3.2',
    MASTER_USER='repuser',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=328;
    ```
  * ```
    start slave;
    ```
  * ```
    show slave status\G;
    ```



### TF Template Master Server Data

* Write the following in the Master VM
  * ```
    CHANGE MASTER TO MASTER_HOST='10.1.4.2',
    MASTER_USER='repuser',
    MASTER_PASSWORD='password',
    MASTER_LOG_FILE='mysql-bin.000001',
    MASTER_LOG_POS=328;
    ```
  * ```
    start slave;
    ```
  * ```
    show slave status\G;
    ```



## Set the MariaDB Databases on Both 3Nodes

We now set the MariaDB database. You should choose your own username and password. The password should be the same for the master and worker VMs.

* On the master VM, write:
    ```
    CREATE DATABASE tfdatabase;
    CREATE USER 'ncuser'@'%';
    GRANT ALL PRIVILEGES ON tfdatabase.* TO ncuser@'%' IDENTIFIED BY 'password1234';
    FLUSH PRIVILEGES;
    ```

* On the worker VM, write:
    ```
    CREATE USER 'ncuser'@'%';
    GRANT ALL PRIVILEGES ON tfdatabase.* TO ncuser@'%' IDENTIFIED BY 'password1234';
    FLUSH PRIVILEGES;
    ```

* To see a database, write the following:
    ```
    show databases;
    ```
* To see users on MariaDB:
    ```
    select user from mysql.user;
    ```
* To exit MariaDB:
    ```
    exit;
    ```



# Install and Set GlusterFS

We will now install and set [GlusterFS](https://www.gluster.org/), a free and open-source software scalable network filesystem.

* Install GlusterFS on both the master and worker VMs
  *  ```
     add-apt-repository ppa:gluster/glusterfs-7 -y && apt install glusterfs-server -y
     ```
* Start the GlusterFS service on both VMs
  *  ```
     systemctl start glusterd.service && systemctl enable glusterd.service
     ```
* Set the master to worker probe IP on the master VM:
  *  ```
     gluster peer probe 10.1.4.2
     ```

* See the peer status on the worker VM:
  *  ```
     gluster peer status
     ```

* Set the master and worker IP address on the master VM:
  *  ```
     gluster volume create vol1 replica 2 10.1.3.2:/gluster-storage 10.1.4.2:/gluster-storage force
     ```

* Start Gluster:
  *  ```
     gluster volume start vol1
     ```

* Check the status on the worker VM:
  *  ```
     gluster volume status
     ```

* Mount the server with the master IP on the master VM:
  *  ```
     mount -t glusterfs 10.1.3.2:/vol1 /var/www
     ```

* See if the mount is there on the master VM:
  *  ```
     df -h
     ```

* Mount the Server with the worker IP on the worker VM:
  *  ```
     mount -t glusterfs 10.1.4.2:/vol1 /var/www
     ```

* See if the mount is there on the worker VM:
  *  ```
     df -h
     ```

We now update the mount with the filse fstab on both master and worker.

* To prevent the mount from being aborted if the server reboot, write the following on both servers:
  *  ```
     nano /etc/fstab
     ```
  * Add the following line in the `fstab` file to set the master VM with the master virtual IP (here it is 10.1.3.2):
    *  ```
       10.1.3.2:/vol1 /var/www glusterfs defaults,_netdev 0 0
       ```

  * Add the following line in the `fstab` file to set the worker VM with the worker virtual IP (here it is 10.1.4.2):
    *  ```
       10.1.4.2:/vol1 /var/www glusterfs defaults,_netdev 0 0
       ```

The databases of both VMs are accessible in `/var/www`. This means that any change in either folder `/var/www` of each VM will be reflected in the same folder of the other VM. In order words, the databases are now synced in real-time.



# Conclusion

You now have two VMs syncing their MariaDB databases. This can be very useful for a plethora of projects requiring redundancy in storage. 

You should now have a basic understanding of the Threefold Grid, the ThreeFold Explorer, Wireguard, Terraform, MariaDB and GlusterFS.

As always, if you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.

