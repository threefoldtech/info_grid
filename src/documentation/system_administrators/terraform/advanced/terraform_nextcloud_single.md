<h1>Nextcloud Single Deployment </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Main Steps](#main-steps)
- [Prerequisites](#prerequisites)
- [Find a 3Node with the ThreeFold Explorer](#find-a-3node-with-the-threefold-explorer)
- [Set the Full VM](#set-the-full-vm)
  - [Overview](#overview)
  - [Create the Terraform Files](#create-the-terraform-files)
  - [Deploy the Full VM with Terraform](#deploy-the-full-vm-with-terraform)
  - [SSH into the 3Node](#ssh-into-the-3node)
  - [Prepare the Full VM](#prepare-the-full-vm)
- [Create the MariaDB Database](#create-the-mariadb-database)
  - [Download MariaDB and Configure the Database](#download-mariadb-and-configure-the-database)
  - [Set the Nextcloud User and Database](#set-the-nextcloud-user-and-database)
- [Install PHP and Nextcloud](#install-php-and-nextcloud)
- [Create a Subdomain with DuckDNS](#create-a-subdomain-with-duckdns)
- [Set Apache](#set-apache)
- [Access Nextcloud on a Web Browser](#access-nextcloud-on-a-web-browser)
- [Enable HTTPS](#enable-https)
  - [Install Certbot](#install-certbot)
  - [Set the Certbot with the DNS Domain](#set-the-certbot-with-the-dns-domain)
  - [Verify HTTPS Automatic Renewal](#verify-https-automatic-renewal)
- [Set a Firewall](#set-a-firewall)
- [Conclusion](#conclusion)
- [Acknowledgements and References](#acknowledgements-and-references)

***

# Introduction

In this Threefold Guide, we deploy a [Nextcloud](https://nextcloud.com/) instance on a full VM running on the [Threefold Grid](https://threefold.io/).

We will learn how to deploy a full virtual machine (Ubuntu 22.04) with [Terraform](https://www.terraform.io/). We will install and deploy Nextcloud. We will add a DDNS (dynamic DNS) domain to the Nextcloud deployment. It will then be possible to connect to the Nextcloud instance over public internet. Nextcloud will be available over your computer and even your smart phone! We will also set HTTPS for the DDNS domain in order to make the Nextcloud instance as secure as possible. You are free to explore different DDNS options. In this guide, we will be using [DuckDNS](https://www.duckdns.org/) for simplicity.

As always, if you have questions concerning this guide, you can write a post on the [Threefold Forum](http://forum.threefold.io/).

Let's go!



# Main Steps

This guide might seem overwhelming, but the steps are carefully explained. Take your time and it will all work out!

To get an overview of the whole process, we present the main steps:

* Download the dependencies
* Find a 3Node on the TF Grid
* Deploy and set the VM with Terraform
* Install PHP and Nextcloud
* Create a subdomain with DuckDNS
* Set Apache
* Access Nextcloud
* Add HTTPS protection
* Set a firewall



# Prerequisites

- [Install Terraform](../terraform_install.md)

You need to download and install properly Terraform on your local computer. Simply follow the documentation depending on your operating system (Linux, MAC and Windows).



# Find a 3Node with the ThreeFold Explorer

We first need to decide on which 3Node we will be deploying our workload.

We thus start by finding a 3Node with sufficient resources. For this current Nextcloud guide, we will be using 1 CPU, 2 GB of RAM and 50 GB of storage. We are also looking for a 3Node with a public IPv4 address.

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
  * For each parameter, a new field will appear where you can enter a minimum number requirement for the 3Node.
    * `Free SRU (GB)`: 50
    * `Free MRU (GB)`: 2
    * `Total CRU (Cores)`: 1
    * `Free Public IP`: 2
      * Note: if you want a public IPv4 address, it is recommended to set the parameter `FREE PUBLIC IP` to at least 2 to avoid false positives. This ensures that the shown 3Nodes have viable IP addresses.

Once you've found a 3Node, take note of its node ID. You will need to use this ID when creating the Terraform files.



# Set the Full VM

## Overview

For this guide, we use two files to deploy with Terraform. The first file contains the environment variables and the second file contains the parameters to deploy our workload.

To facilitate the deployment, only the environment variables file needs to be adjusted. The `main.tf` file contains the environment variables (e.g. `var.size` for the disk size) and thus you do not need to change this file. Of course, you can adjust the deployment based on your preferences. That being said, it should be easy to deploy the Terraform deployment with the `main.tf` as is.

On your local computer, create a new folder named `terraform` and a subfolder called `deployment-single-nextcloud`. In the subfolder, store the files `main.tf` and `credentials.auto.tfvars`.

Modify the variable files to take into account your own seed phrase and SSH keys. You should also specifiy the node ID of the 3Node you will be deploying on.

## Create the Terraform Files

Open the terminal and follow those steps.

* Go to the home folder 
  *  ```
     cd ~
     ```

* Create the folder `terraform` and the subfolder `deployment-single-nextcloud`:
  *  ```
     mkdir -p terraform/deployment-single-nextcloud
     ```
  *  ```
     cd terraform/deployment-single-nextcloud
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

In this file, we name the full VM as `vm1`.

* Create the `credentials.auto.tfvars` file:
  *  ```
     nano credentials.auto.tfvars
     ```

* Copy the `credentials.auto.tfvars` content and save the file. 
  *  ```
     mnemonics = "..."
     SSH_KEY = "..."

     tfnodeid1 = "..."

     size = "50"
     cpu = "1"
     memory = "2048"
     ```

Make sure to add your own seed phrase and SSH public key. You will also need to specify the node ID of the 3Node. Simply replace the three dots by the appropriate content. Obviously, you can decide to set more storage (size). The memory and CPU should be sufficient for the Nextcloud deployment with the above numbers.

## Deploy the Full VM with Terraform

We now deploy the full VM with Terraform. Make sure that you are in the correct folder `terraform/deployment-single-nextcloud` with the main and variables files.

* Initialize Terraform:
  *  ```
     terraform init
     ```

* Apply Terraform to deploy the full VM:
  *  ```
     terraform apply
     ```

After deployments, take note of the 3Node's IPv4 address. You will need this address to SSH into the 3Node.

## SSH into the 3Node

* To [SSH into the 3Node](../../getstarted/ssh_guide/ssh_guide.md), write the following:
  *  ```
     ssh root@VM_IPv4_Address
     ```

## Prepare the Full VM

* Update and upgrade the system
  * ```
    apt update && apt upgrade && apt-get install apache2
    ```
* After download, reboot the system
  * ```
    reboot
    ``` 
* Reconnect to the VM



# Create the MariaDB Database

## Download MariaDB and Configure the Database

* Download MariaDB's server and client
  * ```
    apt install mariadb-server mariadb-client
    ```
* Configure the MariaDB database
  * ```
    nano /etc/mysql/mariadb.conf.d/50-server.cnf
    ```
    * Do the following changes 
      * Add `#` in front of
        * `bind-address = 127.0.0.1`
      * Remove `#` in front of the following lines and make sure the variable `server-id` is set to `1`
        ```
        #server-id              = 1
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

## Set the Nextcloud User and Database

We now set the Nextcloud database. You should choose your own username and password. 

* On the full VM, write:
    ```
    CREATE DATABASE nextcloud;
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


# Install PHP and Nextcloud

* Install PHP and the PHP modules for Nextcloud on both the master and the worker:
  *  ```
     apt install php && apt-get install php zip libapache2-mod-php php-gd php-json php-mysql php-curl php-mbstring php-intl php-imagick php-xml php-zip php-mysql php-bcmath php-gmp zip
     ```

We will now install Nextcloud.

* On the full VM, go to the folder `/var/www`:
  *  ```
     cd /var/www
     ```

* To install the latest Nextcloud version, go to the Nextcloud homepage:
  * See the latest [Nextcloud releases](https://download.nextcloud.com/server/releases/).

* We now download Nextcloud on the full VM. 
  *  ```
     wget https://download.nextcloud.com/server/releases/nextcloud-27.0.1.zip
     ```

* Then, extract the `.zip` file. This will take a couple of minutes. We use 7z to track progress:
  * ```
    apt install p7zip-full
    ```
  * ```
    7z x nextcloud-27.0.1.zip -o/var/www/
    ```
* Then, we grant permissions to the folder.
  *  ```
     chown www-data:www-data /var/www/nextcloud/ -R
     ```



# Create a Subdomain with DuckDNS

We want to create a subdomain to access Nextcloud over the public internet.

For this guide, we use DuckDNS to create a subdomain for our Nextcloud deployment. Note that this can be done with other services. We use DuckDNS for simplicity. We invite users to explore other methods as they see fit.

We create a public subdomain with DuckDNS. To set DuckDNS, you simply need to follow the steps on their website.

* First, sign in on the website: [https://www.duckdns.org/](https://www.duckdns.org/). 
* Then go to [https://www.duckdns.org/install.jsp](https://www.duckdns.org/install.jsp) and follow the steps. For this guide, we use `linux cron` as the operating system.

Hint: make sure to save the DuckDNS folder in the home menu. Write `cd ~` before creating the folder to be sure.



# Set Apache

We now want to tell Apache where to store the Nextcloud data. To do this, we will create a file called `nextcloud.conf`.

* On full VM, write the following:
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

* On the full VM, write the following to set the Nextcloud database with Apache and to enable the new virtual host file:
  *  ```
     a2ensite nextcloud.conf && a2enmod rewrite headers env dir mime setenvif ssl
     ```

* Then, reload and restart Apache:
  *  ```
     systemctl reload apache2 && systemctl restart apache2
     ```



# Access Nextcloud on a Web Browser

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

We will now enable HTTPS on the full VM.

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
     apt install python3-certbot-apache
     ```

## Set the Certbot with the DNS Domain

We now set the certbot with the DNS domain.

* To add the HTTPS protection, write the following line on the full VM with your own subdomain:
  *  ```
     certbot --apache -d subdomain.duckdns.org -d www.subdomain.duckdns.org
     ```

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

You can now [install Nextcloud](https://nextcloud.com/install/) on your local computer. You will then be able to "use the desktop clients to keep your files synchronized between your Nextcloud server and your desktop". You can also do regular backups with Nextcloud to ensure maximum resilience of your data. Check Nextcloud's [documentation](https://docs.nextcloud.com/server/latest/admin_manual/maintenance/backup.html) for more information on this.

You should now have a basic understanding of the Threefold Grid, the ThreeFold Explorer, Terraform, MariaDB, PHP and Nextcloud. 

This Nextcloud deployment could be improved in many ways and other guides might be published in the future with enhanced functionalities. Stay tuned for more Threefold Guides. If you have ideas on how to improve this guide, please let us know. We learn best when sharing knowledge.



# Acknowledgements and References

A big thank you to [Scott Yeager](https://github.com/scottyeager) for his help on brainstorming, troubleshooting and creating this tutorial. This guide wouldn't have been properly done without his time and dedication. This really is a team effort!

This guide has been inspired by Weynand Kuijpers' [great tutorial](https://youtu.be/DIhfSRKAKHw) on how to deploy Nextcloud with Terraform.

This single Nextcloud instance guide is an adaptation from the [Nextcloud Redundant Deployment guide](terraform_nextcloud_redundant.md). The inspiration to make a single instance deployment guide comes from [RobertL](https://forum.threefold.io/t/threefold-guide-nextcloud-redundant-deployment-on-two-3node-servers/3915/3) on the ThreeFold Forum.

Thanks to everyone who helped shape this guide.