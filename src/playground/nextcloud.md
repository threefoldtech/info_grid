<h1> Nextcloud </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Steps to Deploy](#steps-to-deploy)
- [Set the DNS Record](#set-the-dns-record)
- [Quick Nextcloud Access](#quick-nextcloud-access)
- [Access Parameters](#access-parameters)

## Introduction

[Nextcloud](https://nextcloud.com/) is a suite of client-server software for creating and using file hosting services. 

Nextcloud provides functionality similar to Dropbox, Office 365 or Google Drive when used with integrated office suites like Collabora Online or OnlyOffice.

## Prerequisites

- Make sure you have a [wallet](./wallet_connector.md)

## Steps to Deploy

* Click on the **Nextcloud** tab
* Choose a name for your deployment
  * Note: You can use the auto-generated name if you want
* Write your domain
  * Example: `example.com`
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

## Set the DNS Record

After deployment, you will have access to the IPv4 address of the VM you deployed on. You will need to add a **DNS A record** (Host: "@", Value: <VM_IP_Address>) to your domain to access Nextcloud. This record type indicates the IP address of a given domain.

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify that your domain is properly pointing to the IPv4 address of the VM you deployed on.

## Quick Nextcloud Access

Once the DNS record is propagated, you can click on the button **Visit** to access your Nextcloud instance.

For more information, read the next section.

## Access Parameters

You can access the Nextcloud interface either (1) by using the domain pointing to the VM (as the **Visit** button does) with port 8443 or (2) by using the IPv4 address of the VM with port 8080.

* (1) Reach the Nextcloud interface using the domain and port 8443:
  * Template
    * ```
      https://<domain_name>:8443
      ```
    * This is equivalent to using the **Visit** button
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