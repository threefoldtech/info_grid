<h1> Nextcloud </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Four Deployment Variations](#four-deployment-variations)
- [Deploy Nextcloud](#deploy-nextcloud)
- [Nextcloud Setup](#nextcloud-setup)
- [Deployment Variations Details](#deployment-variations-details)
  - [Set the DNS Record for Case 1](#set-the-dns-record-for-case-1)
  - [Set the DNS Record for Case 3](#set-the-dns-record-for-case-3)
  - [DNS Propagation for Cases 1 and 3](#dns-propagation-for-cases-1-and-3)
  - [Set Talk and TURN Server for Cases 3 and 4](#set-talk-and-turn-server-for-cases-3-and-4)
    - [Install Talk](#install-talk)
    - [Set a TURN Public Server](#set-a-turn-public-server)
    - [Use Talk](#use-talk)
- [Backups and Updates](#backups-and-updates)
  - [Create a Backup](#create-a-backup)
  - [Automatic Backups and Updates](#automatic-backups-and-updates)
- [Troubleshooting](#troubleshooting)
  - [Retrieve the Nextcloud AIO Seed Phrase](#retrieve-the-nextcloud-aio-seed-phrase)
  - [Access the Nextcloud Interface Page](#access-the-nextcloud-interface-page)
  - [Check the DNS Propagation](#check-the-dns-propagation)
- [Questions and Feedback](#questions-and-feedback)

***

# Introduction

[Nextcloud](https://nextcloud.com/) is a suite of client-server software for creating and using file hosting services. 

Nextcloud provides functionality similar to Dropbox, Office 365 or Google Drive when used with integrated office suites like Collabora Online or OnlyOffice.

***

# Prerequisites

- Make sure you have a [wallet](./wallet_connector.md)

***

# Four Deployment Variations

There are four possible configurations for this Nextcloud weblet. There are two parameters, domain name and connection, which you need to choose two options from: to use a custom domain or to use a gateway domain, and to use IPv4 connection or gateway connection.

* Case 1:
  * IPv4 connection + custom domain
* Case 2:
  * IPv4 connection + gateway domain
* Case 3:
  * Gateway connection + custom Domain
* Case 4:
  * Gateway connection + gateway domain

You can read [this section](#deployment-variations-details) to learn more about the deployment variations details.

***

# Deploy Nextcloud

* On the [ThreeFold Playground](https://playground.grid.tf/), click on the **Nextcloud** tab
* Choose a name for your deployment
  * Note: You can use the auto-generated name if you want
* Select a capacity package:
    * **Minimum**: {cpu: 2, memory: 4096, diskSize: 50 }
    * **Standard**: {cpu: 2, memory: 8192, diskSize: 500 }
    * **Recommended**: {cpu: 4, memory: 16384, diskSize: 1000 }
    * Or choose a **Custom** plan
* If you are using IPv4, click on Network then select **Public IPv4**
* If you want a [dedicated](../dashboard/portal/dashboard_portal_dedicated_nodes.md) and/or a certified node, select the corresponding options:
  * `Dedicated` flag to retrieve only dedicated nodes 
  * `Certified` flag to retrieve only certified nodes 
* Choose the location of the node
   * `Country`
   * `Farm Name`
* Select a node 
* If you want to use a custom domain, click on **Custom domain** under **Domain Name** and write your domain name
  * Example: `nextcloudwebsite.com`
  * Note: Read the section [Set the DNS Record](#set-the-dns-record) for more information
* If you want to use a gateway, click on **Select gateway** and choose a gateway
* Click **Deploy**

***

# Nextcloud Setup

Once the weblet is deployed, you can click on the button **Nextcloud Setup** under **Actions** to set up Nextcloud.

* Once you have access to the **Nextcloud AIO setup page**, you will be given a seed phrase composed of 8 words. 
  * Use this seed phrase to access the **Nextcloud AIO interface page**.
  * Write down this seed phrase somewhere safe and offline.
* On the next page, you can add **Optionals addons** if you want.
* Click on **Download and start containers** to start the Nextcloud instance. 
* Once the containers are properly started, you can access the Nextcloud admin login page by clicking **Open your Nextcloud**. 
  * You will be given an **Initial Nextcloud username** and an **Initial Nextcloud password**. Use these credentials to log into the admin page.
  * Write down those credentials somewhere safe and offline.
* Later, if you want to access the Nextcloud admin login page, you can simply click on the button **Open Nextcloud** under **Actions** on the Playground page.

The installation is now complete and you have access to your Nextcloud instance.

***

# Deployment Variations Details


## Set the DNS Record for Case 1

After deployment, you will have access to the IPv4 address of the VM you deployed on. You will need to add a **DNS A record** (Host: "@", Value: <VM_IP_Address>) to your domain to access Nextcloud. This record type indicates the IP address of a given domain.

## Set the DNS Record for Case 3

Before starting the deployment, you will need to add a **DNS A record** (Host: "@", Value: <Gateway_IP>) to your domain. The gateway IP will be shown to you when you select this option.

## DNS Propagation for Cases 1 and 3

When setting your own custom domain, it might take time for DNS to propagate. It is possible that you see the following message when opening the Nextcloud page: 

>"This site can't be reached. DNS address could not be found. Diagnosing the problem."

This is normal. You might simply need to wait for the DNS to propagate completely.

## Set Talk and TURN Server for Cases 3 and 4

When using Case 3 or 4, if you want to use the Talk app, you need to install it and then set a TURN server.

### Install Talk

To install Talk, do the following:

* Open the dropdown menu at the top right of the Nextcloud page
* Click on **Apps**
* In the left-side menu, select **Social & communication**
* Scroll down and locate the Talk app
* Click on **Download and enable**

Once the Talk app is downloaded and enabled, you can find its icon at the top bar menu. 

### Set a TURN Public Server

To install a TURN public server, we will be using the **metered.ca**'s [documentation and service](https://www.metered.ca/tools/openrelay/#turn-server-for-nextcloud-talk). 

* Open the dropdown menu at the top right of the Nextcloud page
* Click on **Personal settings**
* In the left-side menu, select **Talk**
* Scroll down and locate the section **TURN servers**
* To add a new TURN server, click on **Add a new TURN server**
  * You need to set two TURN servers with the following parameters:

| Column 1   | Column 2                            | Column 3               | Column 4    |
| ---------- | ----------------------------------- | ---------------------- | ----------- |
| turn: only | staticauth.openrelay.metered.ca:80  | openrelayprojectsecret | UDP and TCP |
| turn: only | staticauth.openrelay.metered.ca:443 | openrelayprojectsecret | UDP and TCP | 

### Use Talk

Once you've installed Talk and set the TURN server, you can use Talk to create video conferences and chat rooms.

Note that the host of the video meeting might need to turn the VPN off before creating a new conversation.

***

# Backups and Updates

## Create a Backup

In the section **Backup and restore**, you can set a [BorgBackup](https://www.borgbackup.org/) of your Nextcloud instance.

* Add a mount point and a directory name for your backup (e.g. **/mnt/backup**) and click **Submit backup location**.
* After the creation of the backup location, write down the **encryption password for backups** somewhere safe and offline.
* Click **Create backup** to create a BorgBackup of your Nextcloud instance.
  * This will stop all containers, run the backup container and create the backup. 
* Once the backup is complete, you can click on **Start containers** to restart the Nextcloud instance.

## Automatic Backups and Updates

After the first manual backup of your Nextcloud instance is complete, you can set automatic backups and updates.

* In the section **Backup and restore**, open the dropdown menu **Click here to reveal all backup options**. 
* In the section **Daily backup and automatic updates**, choose a time for your daily backup and click **Submit backup time**.
  * To set automatic updates, make sure that the option **Automatically update all containers, the mastercontainer and on** is selected.

***

# Troubleshooting

## Retrieve the Nextcloud AIO Seed Phrase

You can retrieve the Nextcloud AIO seed phrase (8 words) by writing the following command line on the VM hosting your Nextcloud instance:

```
cat /mnt/data/docker/volumes/nextcloud_aio_mastercontainer/_data/data/configuration.json | grep password
```

## Access the Nextcloud Interface Page

To access the Nextcloud interface page, follow those stepse

* Open your Nextcloud instance
* In the top right Profile menu, select **Administration Settings**
* Under **Nextcloud All-in-One**, click **Open Nextcloud AIO Interface**

***

## Check the DNS Propagation

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify that your domain is properly pointing to the IPv4 address of the VM you deployed on.

***

# Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.