<h1> Nextcloud </h1>

# Introduction

[Nextcloud](https://nextcloud.com/) is a suite of client-server software for creating and using file hosting services. 

Nextcloud provides functionality similar to Dropbox, Office 365 or Google Drive when used with integrated office suites like Collabora Online or OnlyOffice.



# Prerequisites

- Make sure you have a [wallet](../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Nextcloud**



# Domain Names and Public IPs

A domain name is required to use Nextcloud. You can either use your own, which we'll call a *custom domain*, or you can get a free subdomain from a gateway node. This won't impact the function of your deployment, it's just a matter of preference. If you want to use your own domain, follow the steps for custom domain wherever you see them below.

Another choice to make before launching your Nextcloud instance is whether you want to reserve a public IPv4 for the deployment. Renting a public IP is an extra cost and is only required for the dedicated Nextcloud Talk video conferencing backend, recommended for calls with more than four participants. If you don't reserve a public IP, you can still use Talk in a more limited fashion (see the [Talk](#talk) section below for details).

If you're not sure and just want the easiest, most affordable option, skip the public IP and use a gateway domain.



# Deploy Nextcloud

* On the [ThreeFold Dashboard](https://dashboard.grid.tf/), click on solutions from the sidebar, then click on **Nextcloud**
* Choose a name for your deployment
  * Note: You can use the auto-generated name if you want
* Select a capacity package:
    * **Minimum**: {cpu: 2, memory: 4gb, diskSize: 50gb }
    * **Standard**: {cpu: 2, memory: 8gb, diskSize: 500gb }
    * **Recommended**: {cpu: 4, memory: 16gb, diskSize: 1000gb }
    * Or choose a **Custom** plan
- Choose the network
   - `Public IPv4` flag gives the virtual machine a Public IPv4
   - `Mycelium` flag gives the virtual machine a Mycelium address
- `Rented By Me` flag to retrieve nodes currently reserved by you
- `Rentable` flag to retrieve nodes that can be reserved as [dedicated nodes](../deploy/node_finder.md#dedicated-nodes)
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Region`
   - `Country`
   - `Farm Name`
* If you want to use a custom domain, click on **Custom domain** under **Domain Name** and write your domain name
  * Example: `nextcloudwebsite.com`
* The **Select gateway** box will be visible whenever a gateway is required. If so, click it and choose a gateway
  * If you are also using a custom domain, you must set your DNS record now before proceeding. The IP of the gateway will appear on screen. Check [below](#set-the-dns-record) for more information
* Click **Deploy**



# Nextcloud Setup

Once the weblet is deployed, the details page will appear. If you are using a custom domain with a public IPv4, you'll need to set your DNS record now using the IP address shown under **Public IPv4**. Again, see [below](#dns-details) for details.

Before you can access Nextcloud itself, you'll need to decide which addons you want to install and complete a setup step. This is done through the AIO interface that's included with your deployment. To access it, you can visit the **Nextcloud Setup** link shown in the details page, or click on the **Nextcloud Setup** button under **Actions** in the deployments list to set up Nextcloud.

* Once you have access to the **Nextcloud AIO setup page**, you will be given a password composed of 8 words. 
  * Use this password to access the **Nextcloud AIO interface page**.
  * Store this password somewhere safe. It's only possible to recover it by using SSH.
* On the next page, you can add **Optionals addons** if you want.
* Click on **Download and start containers** to start the Nextcloud instance. 
* Once the containers are properly started, you can access the Nextcloud admin login page by clicking **Open your Nextcloud**. 
  * You will be given an **Initial Nextcloud user name** and an **Initial Nextcloud password**. Use these credentials to log into the admin page.
  * Store these credentials somewhere safe.
* Later, if you want to access the Nextcloud admin login page, you can simply click on the button **Open Nextcloud** under **Actions** in the deployment list.

The installation is now complete and you have access to your Nextcloud instance.



# DNS Details

## DNS Record with Public IPv4

After deployment, you will have access to the IPv4 address of the VM you deployed on. You will need to add a **DNS A record** (Host: "@", Value: <VM_IP_Address>) to your domain to access Nextcloud. This record type indicates the IP address of a given domain.

## DNS Record with Gateway

Before starting the deployment, you will need to add a **DNS A record** (Host: "@", Value: <Gateway_IP>) to your domain. The gateway IP will be shown to you when you select this option.

## DNS Propagation

When setting your own custom domain, it might take time for DNS to propagate. It is possible that you see the following message when opening the Nextcloud page: 

>"This site can't be reached. DNS address could not be found. Diagnosing the problem."

This is normal. You might simply need to wait for the DNS to propagate completely.



# Talk

If you don't rent a public IP with your deployement, it's still possible to use Nextcloud Talk in a more limited fashion. It's generally understood that this method can work well for up to four participants in a call, and text chat also works without restriction. For larger calls, the dedicated backend, which requires a public IP, is recommended.

While some calls can go entirely peer-to-peer and don't require any setup beyond installing the Talk app, a TURN server can be helpful to relay data when a peer-to-peer connection can't be established. There's more information on TURN servers after the install instructions.

## Install Talk

To install Talk, do the following:

* Open the dropdown menu at the top right of the Nextcloud page
* Click on **Apps**
* In the left-side menu, select **Social & communication**
* Scroll down and locate the Talk app
* Click on **Download and enable**

Once the Talk app is downloaded and enabled, you can find its icon at the top bar menu. 

## TURN

As mentioned before, TURN servers relay data to help call participants connect to each other. All data sent to TURN server is encrypted in this case, so it's perfectly safe to use a free public server.

That said, such free servers are not common, because relaying video chat uses a lot of bandwidth. As of the time of writing, Open Relay Project is one example that includes [instructions for use with Nextcloud Talk](https://www.metered.ca/tools/openrelay/#turn-server-for-nextcloud-talk). 

TURN server configuration can be found by opening the Talk settings, like this:

* Open the dropdown menu at the top right of the Nextcloud page
* Click on **Personal settings**
* In the left-side menu, select **Talk**

## Use Talk

Once you've installed Talk and optionally added a TURN server, you can use Talk to create video conferences.

Note that the host of the video meeting might need to turn the VPN off before creating a new conversation.



# Backups and Updates

In this section, we cover how to make a BorgBackup on the Nextcloud VM and we also cover how to make a backup of the Nextcloud BorgBackup to a secondary VM for additional redundancy.

## BorgBackup

### Create a BorgBackup

In the section **Backup and restore**, you can set a [BorgBackup](https://www.borgbackup.org/) of your Nextcloud instance.

* Add a mount point and a directory name for your backup (e.g. **/mnt/data/backup**) and click **Submit backup location**.
* After the creation of the backup location, write down the **encryption password for backups** somewhere safe and offline.
* Click **Create backup** to create a BorgBackup of your Nextcloud instance.
  * This will stop all containers, run the backup container and create the backup. 
* Once the backup is complete, you can click on **Start containers** to restart the Nextcloud instance.

### Automatic Borg Backups and Updates

After the first manual backup of your Nextcloud instance is complete, you can set automatic backups and updates.

* In the section **Backup and restore**, open the dropdown menu **Click here to reveal all backup options**. 
* In the section **Daily backup and automatic updates**, choose a time for your daily backup and click **Submit backup time**.
  * To set automatic updates, make sure that the option **Automatically update all containers, the mastercontainer and on** is selected.

## Secondary VM Backup

To allow for another layer of redundancy, you can set a secondary VM on the grid and make a daily backup from the BorgBackup of your Nextcloud instance to the secondary VM. The following shows how to do this. It is based on the [File Transfer section](../../system_administrators/computer_it_basics/file_transfer.md#automate-backup-with-rsync) of the manual.

For the following, we take into account that the BorgBackup is located at `/mnt/data/backup` on the VM running Nextcloud. 

You will need to deploy a full VM on the TFGrid and SSH into this secondary VM.

### SSH Connection

We want to set an SSH connection between the Nextcloud VM and the secondary VM.

* Create SSH key pair on the secondary VM
  * ```
    ssh-keygen
    ```
* Copy the public key of the secondary VM
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
* Create the SSH directory on the Nextcloud VM
  * ```
    mkdir ~/.ssh
    ```
* Add the secondary VM public key in the file **authorized_keys** on the Nextcloud VM
  * ```
    nano ~/.ssh/authorized_keys
    ```
* Check the openssh-server status
  * ``` 
    service ssh status
    ```
* As a test, you can check if you can SSH into the Nextcloud VM from the secondary VM
  * ```
    ssh root@<Nextcloud_VM_IP_Address>
    ```

Once the SSH connection is set up, we need to prepare a backup script. This is covered in the next subsection.

### Secondary VM Backup Script

We now cover how to set up a backup script on the secondary VM.

On the secondary VM, do the following:

* Set a directory for your Nextcloud backup
  * ```
    mkdir -p /root/nextcloud_backup
    ```
* Create the script file
  * ```
    nano /root/rsync_nextcloud_backup.sh
    ```
* Write the following script. Here the log is saved in the same directory.
  * ```
    #!/bin/bash

    sudo rsync -avz --progress --delete --log-file=/root/nextcloud_backup/rsync_nextcloud_storage.log root@<Nextcloud_VM_IP_Address>:/mnt/data/backup /root/nextcloud_backup/ 
    ```
* Give permission to execute the script
  * ```
    sudo chmod +x /root/rsync_nextcloud_backup.sh
    ```
* Set a cron job to run the script periodically
  * Open the cron file
    * ```
      sudo crontab -e
      ```
  * At the bottom of the cron file, add the following to run the script everyday. For this example, we set the time at 18:00PM
    * ```
      0 18 * * * /root/rsync_nextcloud_backup.sh
      ```

Once this is set up, this secondary VM will make a daily backup of the Nextcloud BorgBackup. It is a good idea to set this secondary backup to run the script a few hours after the daily BorgBackup.

# Troubleshooting

## Retrieve the Nextcloud AIO Password

You can retrieve the Nextcloud AIO password (8 words) by writing the following command line on the VM hosting your Nextcloud instance:

```
cat /mnt/data/docker/volumes/nextcloud_aio_mastercontainer/_data/data/configuration.json | grep password
```

## Access the Nextcloud Interface Page

To access the Nextcloud interface page, follow those stepse

* Open your Nextcloud instance
* In the top right Profile menu, select **Administration Settings**
* Under **Nextcloud All-in-One**, click **Open Nextcloud AIO Interface**



## Check the DNS Propagation

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify that your domain is properly pointing to the IPv4 address of the VM you deployed on.



# Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.