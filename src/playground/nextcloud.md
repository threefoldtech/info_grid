<h1> Nextcloud </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Steps to Deploy](#steps-to-deploy)
- [Set the DNS Record](#set-the-dns-record)
- [Quick Nextcloud Access](#quick-nextcloud-access)
- [Access Parameters](#access-parameters)
- [Finalizing the Installation](#finalizing-the-installation)
- [Backups and Updates](#backups-and-updates)
  - [Create a Backup](#create-a-backup)
  - [Automatic Backups and Updates](#automatic-backups-and-updates)
- [Troubleshooting](#troubleshooting)
  - [Retrieve the Nextcloud AIO Seed Phrase](#retrieve-the-nextcloud-aio-seed-phrase)
  - [Access the Nextcloud interface page](#access-the-nextcloud-interface-page)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

[Nextcloud](https://nextcloud.com/) is a suite of client-server software for creating and using file hosting services. 

Nextcloud provides functionality similar to Dropbox, Office 365 or Google Drive when used with integrated office suites like Collabora Online or OnlyOffice.

***

## Prerequisites

- Make sure you have a [wallet](./wallet_connector.md)

***

## Steps to Deploy

* Click on the **Nextcloud** tab
* Choose a name for your deployment
  * Note: You can use the auto-generated name if you want
* Write your domain
  * Example: `nextcloudwebsite.com`
  * Note: Read the section [Set the DNS Record](#set-the-dns-record) for more information
* Select a capacity package:
    * **Minimum**: {cpu: 2, memory: 4096, diskSize: 50 }
    * **Standard**: {cpu: 2, memory: 8192, diskSize: 500 }
    * **Recommended**: {cpu: 4, memory: 16384, diskSize: 1000 }
    * Or choose a **Custom** plan
* Select the network(s)
  * `Planetary Network` (optional)
  * `Wireguard` (optional)
    * Note: IPv4 is enabled by default and is needed for your Nextcloud instance.
* If you want a dedicated and/or a certified node, select the corresponding options:
  * `Dedicated` flag to retrieve only dedicated nodes 
  * `Certified` flag to retrieve only certified nodes 
* Choose the location of the node
   * `Country`
   * `Farm Name`
* Select a node 
* Click **Deploy**

***

## Set the DNS Record

After deployment, you will have access to the IPv4 address of the VM you deployed on. You will need to add a **DNS A record** (Host: "@", Value: <VM_IP_Address>) to your domain to access Nextcloud. This record type indicates the IP address of a given domain.

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify that your domain is properly pointing to the IPv4 address of the VM you deployed on.

***

## Quick Nextcloud Access

Once the DNS record is propagated, locate the table **Nextcloud Instances** on the Playground Nextcloud weblet page, and under **Actions**, click on the button **Open Nextcloud** to access the Nextcloud AIO setup page.

For more information, read the next section.

***

## Access Parameters

You can access the **Nextcloud AIO setup page** either (1) by using the domain pointing to the VM (as the **Open Nextcloud** button does) with port 8443 or (2) by using the IPv4 address of the VM with port 8080.

* (1) Reach the Nextcloud interface using the domain and port 8443:
  * Template
    * ```
      https://<domain_name>:8443
      ```
    * This is equivalent to using the **Open Nextcloud** button
  * Example:
    * ```
      https://nextcloudwebsite.com:8443
      ```
* (2) Reach the Nextcloud interface using the IPv4 address and port 8080:
  * Template
    * ```
      https://<VM_IPv4_Address>:8080
      ```
  * Example:
    * ```
      https://104.131.122.247:8080
      ```

> Note: DNS propagation must be fully complete to access the Nextcloud AIO setup page with port 8443.

***

## Finalizing the Installation

We now cover the steps to finalize the Nextcloud installation.

* Once you have access to the **Nextcloud AIO setup page** (**domain.tld:8443/setup**), you will be given a seed phrase composed of 8 words. 
  * Use this seed phrase to access the **Nextcloud AIO interface page** (**domain.tld:8443/containers**).
  * Write down this seed phrase somewhere safe and offline.
* Write the domain for your Nextcloud instance and click **Submit domain**.
  * Template
    * **domain.tld**
  * Example
    * **nextcloudwebsite.com**
* On the next page, you can add **Optionals addons** if you want.
* Click on **Download and start containers** to start the Nextcloud instance. 
* Once the containers are properly started, you can access the Nextcloud admin login page by clicking **Open your Nextcloud**. 
  * You will be given an **Initial Nextcloud username** and an **Initial Nextcloud password**. Use these credentials to log into the admin page.
  * Write down those credentials somewhere safe and offline.
* Later, if you want to access the Nextcloud admin login page, you can simply use the URL **domain.tld** (e.g. **nextcloudwebsite.com**). 
  * This will redirect you to the Nextcloud admin login page **domain.tld/login** (e.g. **nextcloudwebsite.com/login**).

The installation is now complete and you have access to your Nextcloud instance.

***

## Backups and Updates

### Create a Backup

In the section **Backup and restore**, you can set a [BorgBackup](https://www.borgbackup.org/) of your Nextcloud instance.

* Add a mount point and a directory name for your backup (e.g. **/mnt/backup**) and click **Submit backup location**.
* After the creation of the backup location, write down the **encryption password for backups** somewhere safe and offline.
* Click **Create backup** to create a BorgBackup of your Nextcloud instance.
  * This will stop all containers, run the backup container and create the backup. 
* Once the backup is complete, you can click on **Start containers** to restart the Nextcloud instance.

### Automatic Backups and Updates

After the first manual backup of your Nextcloud instance is complete, you can set automatic backups and updates.

* In the section **Backup and restore**, open the dropdown menu **Click here to reveal all backup options**. 
* In the section **Daily backup and automatic updates**, choose a time for your daily backup and click **Submit backup time**.
  * To set automatic updates, make sure that the option **Automatically update all containers, the mastercontainer and on** is selected.

***

## Troubleshooting

### Retrieve the Nextcloud AIO Seed Phrase

You can retrieve the Nextcloud AIO seed phrase (8 words) by writing the following command line on the VM hosting your Nextcloud instance:

```
cat /var/lib/docker/volumes/nextcloud_aio_mastercontainer/_data/data/configuration.json | grep password
```

### Access the Nextcloud interface page

To access the Nextcloud interface page, follow those stepse

* Open your Nextcloud instance
* In the top right Profile menu, select **Administration Settings**
* Under **Nextcloud All-in-One**, click **Open Nextcloud AIO Interface**

***

## Questions and Feedback

Ff you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.