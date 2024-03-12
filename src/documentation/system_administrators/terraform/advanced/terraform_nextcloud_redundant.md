<h1>Nextcloud Redundant Deployment</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Main Steps](#main-steps)
- [Prerequisites](#prerequisites)
- [Find Nodes with the ThreeFold Explorer](#find-nodes-with-the-threefold-explorer)
- [Set the VMs](#set-the-vms)
  - [Create a Two Servers Wireguard VPN with Terraform](#create-a-two-servers-wireguard-vpn-with-terraform)
    - [Create the Terraform Files](#create-the-terraform-files)
    - [Deploy the 3nodes with Terraform](#deploy-the-3nodes-with-terraform)
    - [SSH into the 3nodes](#ssh-into-the-3nodes)
    - [Preparing the VMs for the Deployment](#preparing-the-vms-for-the-deployment)
    - [Test the Wireguard Connection](#test-the-wireguard-connection)
- [Create the MariaDB Database](#create-the-mariadb-database)
  - [Download MariaDB and Configure the Database](#download-mariadb-and-configure-the-database)
  - [Create User with Replication Grant](#create-user-with-replication-grant)
  - [Verify the Access of the User](#verify-the-access-of-the-user)
  - [Set the VMs to Accept the MariaDB Connection](#set-the-vms-to-accept-the-mariadb-connection)
    - [TF Template Worker Server Data](#tf-template-worker-server-data)
    - [TF Template Master Server Data](#tf-template-master-server-data)
  - [Set the Nextcloud User and Database](#set-the-nextcloud-user-and-database)
- [Install and Set GlusterFS](#install-and-set-glusterfs)
- [Install PHP and Nextcloud](#install-php-and-nextcloud)
- [Create a Subdomain with DuckDNS](#create-a-subdomain-with-duckdns)
  - [Worker File for DuckDNS](#worker-file-for-duckdns)
- [Set Apache](#set-apache)
- [Access Nextcloud on a Web Browser with the Subdomain](#access-nextcloud-on-a-web-browser-with-the-subdomain)
- [Enable HTTPS](#enable-https)
  - [Install Certbot](#install-certbot)
  - [Set the Certbot with the DNS Domain](#set-the-certbot-with-the-dns-domain)
  - [Verify HTTPS Automatic Renewal](#verify-https-automatic-renewal)
- [Set a Firewall](#set-a-firewall)
- [Conclusion](#conclusion)
- [Acknowledgements and References](#acknowledgements-and-references)

***

# Introduction

In this Threefold Guide, we deploy a redundant [Nextcloud](https://nextcloud.com/) instance that is continually synced on two different 3node servers running on the [Threefold Grid](https://threefold.io/).

We will learn how to deploy two full virtual machines (Ubuntu 22.04) with [Terraform](https://www.terraform.io/). The Terraform deployment will be composed of a virtual private network (VPN) using [Wireguard](https://www.wireguard.com/). The two VMs will thus be connected in a private and secure network. Once this is done, we will link the two VMs together by setting up a [MariaDB](https://mariadb.org/) database and using [GlusterFS](https://www.gluster.org/). Then, we will install and deploy Nextcloud. We will add a DDNS (dynamic DNS) domain to the Nextcloud deployment. It will then be possible to connect to the Nextcloud instance over public internet. Nextcloud will be available over your computer and even your smart phone! We will also set HTTPS for the DDNS domain in order to make the Nextcloud instance as secure as possible. You are free to explore different DDNS options. In this guide, we will be using [DuckDNS](https://www.duckdns.org/) for simplicity.

The advantage of this redundant Nextcloud deployment is obvious: if one of the two VMs goes down, the Nextcloud instance will still be accessible, as the other VM will take the lead. Also, the two VMs will be continually synced in real-time. If the master node goes down, the data will be synced to the worker node, and the worker node will become the master node. Once the master VM goes back online, the data will be synced to the master node and the master node will retake the lead as the master node.

This kind of real-time backup of the database is not only limited to Nextcloud. You can use the same architecture to deploy different workloads while having the redundancy over two 3node servers. This architecture could be deployed over more than two 3nodes. Feel free to explore and let us know in the [Threefold Forum](http://forum.threefold.io/) if you come up with exciting and different variations of this kind of deployment.

As always, if you have questions concerning this guide, you can write a post on the [Threefold Forum](http://forum.threefold.io/).

Let's go!



# Main Steps

This guide might seem overwhelming, but the steps are carefully explained. Take your time and it will all work out!

To get an overview of the whole process, we present the main steps:

* Download the dependencies
* Find two 3nodes on the TF Grid
* Deploy and set the VMs with Terraform
* Create a MariaDB database
* Download and set GlusterFS
* Install PHP and Nextcloud
* Create a subdomain with DuckDNS
* Set Apache
* Access Nextcloud
* Add HTTPS protection
* Set a firewall



# Prerequisites

* [Install Terraform](../terraform_install.md)
* [Install Wireguard](https://www.wireguard.com/install/)

You need to download and install properly Terraform and Wireguard on your local computer. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).



# Find Nodes with the ThreeFold Explorer

We first need to decide on which 3Nodes we will be deploying our workload.

We thus start by finding two 3Nodes with sufficient resources. For this current Nextcloud guide, we will be using 1 CPU, 2 GB of RAM and 50 GB of storage. We are also looking for 3Nodes with each a public IPv4 address.

* Go to the ThreeFold Grid [Node Finder](https://dashboard.grid.tf/#/deploy/node-finder/) (Main Net)
* Find two 3Nodes with suitable resources for the deployment and take note of their node IDs on the leftmost column `ID`
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

Once you've found two 3Nodes, take note of their node IDs. You will need to use those IDs when creating the Terraform files.



# Set the VMs
## Create a Two Servers Wireguard VPN with Terraform

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workloads.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file. Of course, you can adjust the deployment based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployment-nextcloud`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable files to take into account your own seed phrase and SSH keys. You should also specifiy the node IDs of the two 3nodes you will be deploying on.

### Create the Terraform Files

Open the terminal.

* Go to the home folder
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployment-nextcloud`:
  *  ```
     mkdir -p terraform/deployment-nextcloud
     ```
  *  ```
     cd terraform/deployment-nextcloud
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

In this file, we name the first VM as `vm1` and the second VM as `vm2`. In the guide, we call `vm1` as the master VM and `vm2` as the worker VM.

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

     size = "50"
     cpu = "1"
     memory = "2048"
     ```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the two node IDs of the servers used. Simply replace the three dots by the content. Obviously, you can decide to set more storage (size). The memory and CPU should be sufficient for the Nextcloud deployment with the above numbers.

### Deploy the 3nodes with Terraform

We now deploy the VPN with Terraform. Make sure that you are in the correct folder `terraform/deployment-nextcloud` with the main and variables files.

* Initialize Terraform:
  *  ```
     terraform init
     ```

* Apply Terraform to deploy the VPN:
  *  ```
     terraform apply
     ```

After deployments, take note of the 3nodes' IPv4 address. You will need those addresses to SSH into the 3nodes.

### SSH into the 3nodes

* To [SSH into the 3nodes](../../getstarted/ssh_guide/ssh_guide.md), write the following:
  *  ```
     ssh root@VM_IPv4_Address
     ```

### Preparing the VMs for the Deployment

* Update and upgrade the system
  * ```
    apt update && apt upgrade -y && apt-get install apache2 -y
    ```
* After download, reboot the system
  * ```
    reboot
    ``` 
* Reconnect to the VMs



### Test the Wireguard Connection

We now want to ping the VMs using Wireguard. This will ensure the connection is properly established. 

For more information on WireGuard, notably in relation to Windows, please read [this documentation](../../getstarted/ssh_guide/ssh_wireguard.md).

First, we set Wireguard with the Terraform output.

* On your local computer, take the Terraform's `wg_config` output and create a `wg.conf` file in the directory `/etc/wireguard/wg.conf`.
  *  ```
     nano /etc/wireguard/wg.conf
     ```

* Paste the content provided by the Terraform deployment. You can use `terraform show` to see the Terraform output. The Wireguard output stands in between `EOT`.

* Start Wireguard on your local computer:
  *  ```
     wg-quick up wg
     ```

* To stop the wireguard service:
  *  ```
     wg-quick down wg
     ```

If it doesn't work and you already did a wireguard connection with the same file from Terraform (from a previous deployment perhaps), do `wg-quick down wg`, then `wg-quick up wg`.
This should set everything properly.

* As a test, you can [ping](../../computer_it_basics/cli_scripts_basics.md#test-the-network-connectivity-of-a-domain-or-an-ip-address-with-ping) the virtual IP addresses of both VMs to make sure the Wireguard connection is correct:
  *  ```
     ping 10.1.3.2
     ```
  *  ```
     ping 10.1.4.2
     ```

If you correctly receive the packets from the two VMs, you know that the VPN is properly set.



# Create the MariaDB Database

## Download MariaDB and Configure the Database

* Download MariaDB's server and client on both VMs
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
      * Remove `#` in front of the following lines and replace  `X` by `1` on the master VM and by `2` on the worker VM
        ```
        #server-id              = X
        #log_bin                = /var/log/mysql/mysql-bin.log
        ```
      * Below the lines shown above add the following line:
        ```
        binlog_do_db           = nextcloud
        ```

* Restart MariaDB
  * ```
    systemctl restart mysql
    ```

* Launch MariaDB
  * ```
    mysql
    ```

## Create User with Replication Grant

* Do the following on both VMs
  * ```
    CREATE USER 'repuser'@'%' IDENTIFIED BY 'password';
    GRANT REPLICATION SLAVE ON *.* TO 'repuser'@'%' ;
    FLUSH PRIVILEGES;
    show master status\G;
    ```

## Verify the Access of the User
* Verify the access of the user
    ```
    SELECT host FROM mysql.user WHERE User = 'repuser';
    ```
  * You want to see `%` in Host

## Set the VMs to Accept the MariaDB Connection

### TF Template Worker Server Data

* Write the following in the worker VM
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

* Write the following in the master VM
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

## Set the Nextcloud User and Database

We now set the Nextcloud database. You should choose your own username and password. The password should be the same for the master and worker VMs.

* On the master VM, write:
    ```
    CREATE DATABASE nextcloud;
    CREATE USER 'ncuser'@'%';
    GRANT ALL PRIVILEGES ON nextcloud.* TO ncuser@'%' IDENTIFIED BY 'password1234';
    FLUSH PRIVILEGES;
    ```

* On the worker VM, write:
    ```
    CREATE USER 'ncuser'@'%';
    GRANT ALL PRIVILEGES ON nextcloud.* TO ncuser@'%' IDENTIFIED BY 'password1234';
    FLUSH PRIVILEGES;
    ```

* To see the databases, write:
    ```
    show databases;
    ```
* To see users, write:
    ```
    select user from mysql.user;
    ```
* To exit MariaDB, write:
    ```
    exit;
    ```



# Install and Set GlusterFS

We will now install and set [GlusterFS](https://www.gluster.org/), a free and open source software scalable network filesystem.

* Install GlusterFS on both the master and worker VMs
  *  ```
     echo | add-apt-repository ppa:gluster/glusterfs-7 && apt install glusterfs-server -y
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

* Start GlusterFS on the master VM:
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

* Mount the server with the worker IP on the worker VM:
  *  ```
     mount -t glusterfs 10.1.4.2:/vol1 /var/www
     ```

* See if the mount is there on the worker VM:
  *  ```
     df -h
     ```

We now update the mount with the filse fstab on both VMs.

* To prevent the mount from being aborted if the server reboots, write the following on both servers:
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



# Install PHP and Nextcloud

* Install PHP and the PHP modules for Nextcloud on both the master and the worker:
  *  ```
     apt install php -y && apt-get install php zip libapache2-mod-php php-gd php-json php-mysql php-curl php-mbstring php-intl php-imagick php-xml php-zip php-mysql php-bcmath php-gmp zip -y
     ```

We will now install Nextcloud. This is done only on the master VM.

* On both the master and worker VMs, go to the folder `/var/www`:
  *  ```
     cd /var/www
     ```

* To install the latest Nextcloud version, go to the Nextcloud homepage:
  * See the latest [Nextcloud releases](https://download.nextcloud.com/server/releases/).

* We now download Nextcloud on the master VM. 
  *  ```
     wget https://download.nextcloud.com/server/releases/nextcloud-27.0.1.zip
     ```

You only need to download on the master VM, since you set a peer-to-peer connection, it will also be accessible on the worker VM.

* Then, extract the `.zip` file. This will take a couple of minutes. We use 7z to track progress:
  * ```
    apt install p7zip-full -y
    ```
  * ```
    7z x nextcloud-27.0.1.zip -o/var/www/
    ```

* After the download, see if the Nextcloud file is there on the worker VM:
  *  ```
     ls
     ```

* Then, we grant permissions to the folder. Do this on both the master VM and the worker VM.
  *  ```
     chown www-data:www-data /var/www/nextcloud/ -R
     ```



# Create a Subdomain with DuckDNS

We want to create a subdomain to access Nextcloud over the public internet.

For this guide, we use DuckDNS to create a subdomain for our Nextcloud deployment. Note that this can be done with other services. We use DuckDNS for simplicity. We invite users to explore other methods as they see fit.

We create a public subdomain with DuckDNS. To set DuckDNS, you simply need to follow the steps on their website. Make sure to do this for both VMs.

* First, sign in on the website: [https://www.duckdns.org/](https://www.duckdns.org/). 
* Then go to [https://www.duckdns.org/install.jsp](https://www.duckdns.org/install.jsp) and follow the steps. For this guide, we use `linux cron` as the operating system.

Hint: make sure to save the DuckDNS folder in the home menu. Write `cd ~` before creating the folder to be sure.

## Worker File for DuckDNS

In our current scenario, we want to make sure the master VM stays the main IP address for the DuckDNS subdomain as long as the master VM is online. To do so, we add an `if` statement in the worker VM's `duck.sh` file. The process is as follow: the worker VM will ping the master VM and if it sees that the master VM is offline, it will run the command to update DuckDNS's subdomain with the worker VM's IP address. When the master VM goes back online, it will run the `duck.sh` file within 5 minutes and the DuckDNS's subdomain will be updated with the master VM's IP address.

The content of the `duck.sh` file for the worker VM is the following. Make sure to replace the line `echo ...` with the line provided by DuckDNS and to replace `mastervm_IPv4_address` with the master VM's IP address.

```
ping -c 2 mastervm_IPv4_address

if [ $? != 0 ] 
then 
  
  echo url="https://www.duckdns.org/update?domains=exampledomain&token=a7c4d0ad-114e-40ef-ba1d-d217904a50f2&ip=" | curl -k -o ~/duckdns/duck.log -K -
  
fi

```

Note: When the master VM goes offline, after 5 minutes maximum DuckDNS will change the IP address from the master’s to the worker’s. Without clearing the DNS cache, your browser might have some difficulties connecting to the updated IP address when reaching the URL `subdomain.duckdns.org`. Thus you might need to [clear your DNS cache](https://blog.hubspot.com/website/flush-dns). You can also use the [Tor browser](https://www.torproject.org/) to connect to Nextcloud. If the IP address changes, you can simply leave the browser and reopen another session as the browser will automatically clear the DNS cache.



# Set Apache

We now want to tell Apache where to store the Nextcloud data. To do this, we will create a file called `nextcloud.conf`.

* On both the master and worker VMs, write the following:
  *  ```
     nano /etc/apache2/sites-available/nextcloud.conf
     ```

The file should look like this, with your own subdomain instead of `subdomain`:

```
<VirtualHost *:80>
        DocumentRoot "/var/www/nextcloud"
        ServerName subdomain.duckdns.org
        ServerAlias www.subdomain.duckdns.org

        ErrorLog ${APACHE_LOG_DIR}/nextcloud.error
        CustomLog ${APACHE_LOG_DIR}/nextcloud.access combined

        <Directory /var/www/nextcloud/>
            Require all granted
            Options FollowSymlinks MultiViews
            AllowOverride All

           <IfModule mod_dav.c>
               Dav off
           </IfModule>

        SetEnv HOME /var/www/nextcloud
        SetEnv HTTP_HOME /var/www/nextcloud
        Satisfy Any

       </Directory>

</VirtualHost>
```

* On both the master VM and the worker VM, write the following to set the Nextcloud database with Apache and to enable the new virtual host file:
  *  ```
     a2ensite nextcloud.conf && a2enmod rewrite headers env dir mime setenvif ssl
     ```

* Then, reload and restart Apache:
  *  ```
     systemctl reload apache2 && systemctl restart apache2
     ```



# Access Nextcloud on a Web Browser with the Subdomain

We now access Nextcloud over the public Internet.

* Go to a web browser and write the subdomain name created with DuckDNS (adjust with your own subdomain):
  *  ```
     subdomain.duckdns.org
     ```

Note: HTTPS isn't yet enabled. If you can't access the website, make sure to enable HTTP websites on your browser.

* Choose a name and a password. For this guide, we use the following:
  *  ```
     ncadmin
     password1234
     ```

* Enter the Nextcloud Database information created with MariaDB and click install:
  *  ```
     Database user: ncuser
     Database password: password1234
     Database name: nextcloud
     Database location: localhost
     ```

Nextcloud will then proceed to complete the installation. 

We use `localhost` as the database location. You do not need to specifiy MariaDB's port (`3306`), as it is already configured within the database.

After the installation, you can now access Nextcloud. To provide further security, we want to enable HTTPS for the subdomain.



# Enable HTTPS 

## Install Certbot

We will now enable HTTPS. This needs to be done on the master VM as well as the worker VM. This section can be done simultaneously on the two VMs. But make sure to do the next section on setting the Certbot with only one VM at a time.

To enable HTTPS, first install `letsencrypt` with `certbot`:

Install certbot by following the steps here: [https://certbot.eff.org/](https://certbot.eff.org/)

* See if you have the latest version of snap:
  *  ```
     snap install core; snap refresh core
     ```

* Remove certbot-auto:
  *  ```
     apt-get remove certbot
     ```

* Install certbot:
  *  ```
     snap install --classic certbot
     ```

* Ensure that certbot can be run:
  *  ```
     ln -s /snap/bin/certbot /usr/bin/certbot
     ```

* Then, install certbot-apache:
  *  ```
     apt install python3-certbot-apache -y
     ```

## Set the Certbot with the DNS Domain

To avoid errors, set HTTPS with the master VM and power off the worker VM. 

* To do so with a 3node, you can simply comment the `vms` section of the worker VM in the Terraform `main.tf` file and do `terraform apply` on the terminal.
  * Put `/*` one line above the section, and `*/` one line below the section `vms`:
```
/*
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
*/
```
* Put `#` in front of the appropriated lines, as shown below:
```
output "node1_zmachine1_ip" {
  value = grid_deployment.d1.vms[0].ip
}
#output "node1_zmachine2_ip" {
#  value = grid_deployment.d2.vms[0].ip
#}

output "ygg_ip1" {
  value = grid_deployment.d1.vms[0].ygg_ip
}
#output "ygg_ip2" {
#  value = grid_deployment.d2.vms[0].ygg_ip
#}

output "ipv4_vm1" {
  value = grid_deployment.d1.vms[0].computedip
}

#output "ipv4_vm2" {
#  value = grid_deployment.d2.vms[0].computedip
#}
```

* To add the HTTPS protection, write the following line on the master VM with your own subdomain:
  *  ```
     certbot --apache -d subdomain.duckdns.org -d www.subdomain.duckdns.org
     ```

* Once the HTTPS is set, you can reset the worker VM:
  * To reset the worker VM, simply remove `/*`, `*/` and `#` on the main file and redo `terraform apply` on the terminal.

Note: You then need to redo the same process with the worker VM. This time, make sure to set the master VM offline to avoid errors. This means that you should comment the section `vms`of `vm1`instead of `vm2`.

## Verify HTTPS Automatic Renewal

* Make a dry run of the certbot renewal to verify that it is correctly set up.
  *  ```
     certbot renew --dry-run
     ```

You now have HTTPS security on your Nextcloud instance.

# Set a Firewall

Finally, we want to set a firewall to monitor and control incoming and outgoing network traffic. To do so, we will define predetermined security rules. As a firewall, we will be using [Uncomplicated Firewall](https://wiki.ubuntu.com/UncomplicatedFirewall) (ufw).

It should already be installed on your system. If it is not, install it with the following command:

```
apt install ufw
```

For our security rules, we want to allow SSH, HTTP and HTTPS.

We thus add the following rules:


* Allow SSH (port 22)
  * ```
    ufw allow ssh
    ```
* Allow HTTP (port 80)
  * ```
    ufw allow http
    ```
* Allow https (port 443)
  * ```
    ufw allow https
    ```

* To enable the firewall, write the following:
  * ```
    ufw enable
    ```

* To see the current security rules, write the following:
  * ```
    ufw status verbose
    ```

You now have enabled the firewall with proper security rules for your Nextcloud deployment.



# Conclusion

If everything went smooth, you should now be able to access Nextcloud over the Internet with HTTPS security from any computer or smart phone!

The Nextcloud database is synced in real-time on two different 3nodes. When one 3node goes offline, the database is still synchronized on the other 3node. Once the powered-off 3node goes back online, the database is synced automatically with the node that was powered off.

You can now [install Nextcloud](https://nextcloud.com/install/) on your local computer. You will then be able to "use the desktop clients to keep your files synchronized between your Nextcloud server and your desktop". You can also do regular backups with Nextcloud to ensure maximum resilience of your data. Check Nextcloud's [documentation](https://docs.nextcloud.com/server/latest/admin_manual/maintenance/backup.html) for more information on this.

You should now have a basic understanding of the Threefold Grid, the ThreeFold Explorer, Wireguard, Terraform, MariaDB, GlusterFS, PHP and Nextcloud. Now, you know how to deploy workloads on the Threefold Grid with an efficient architecture in order to ensure redundancy. This is just the beginning. The Threefold Grid has a somewhat infinite potential when it comes to deployments, workloads, architectures and server projects. Let's see where it goes from here!

This Nextcloud deployment could be improved in many ways and other guides might be published in the future with enhanced functionalities. Stay tuned for more Threefold Guides. If you have ideas on how to improve this guide, please let us know. We learn best when sharing knowledge.



# Acknowledgements and References

A big thank you to [Scott Yeager](https://github.com/scottyeager) for his help on brainstorming, troubleshooting and creating this tutorial. This guide wouldn't have been properly done without his time and dedication. This really is a team effort!

The main reference for this guide is this [amazing video](https://youtu.be/ARsqxUw1ONc) by NETVN82. Many steps were modified or added to make this suitable with Wireguard and the Threefold Grid. Other configurations are possible. We invite you to explore the possibilities offered by the Threefold Grid!

This guide has been inspired by Weynand Kuijpers' [great tutorial](https://youtu.be/DIhfSRKAKHw) on how to deploy Nextcloud with Terraform.