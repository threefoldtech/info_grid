<h1> Nextcloud </h1>

[Nextcloud](https://nextcloud.com/) is a suite of client-server software for creating and using file hosting services. 

Nextcloud provides functionality similar to Dropbox, Office 365 or Google Drive when used with integrated office suites like Collabora Online or OnlyOffice.

## Prerequisites

- Make sure you have a [wallet](./wallet_connector.md)

## Steps

* Click on the **Nextcloud** tab
* Choose a name for your deployment
  * Note: You can let the auto-generated name if you want
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

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify if your domain is properly pointing to the IPv4 address of the VM you deployed on.

## Access Nextcloud

Once the DNS record is propagated, you can click on the button **Visit** to access your Nextcloud instance.