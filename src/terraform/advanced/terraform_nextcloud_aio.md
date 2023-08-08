<h1> Nextcloud All-in-One Guide </h1>

![ ](./img/terraform_.png)

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Deploy a Full VM](#deploy-a-full-vm)
- [Set a Firewall](#set-a-firewall)
- [Set the DNS Record for Your Domain](#set-the-dns-record-for-your-domain)
- [Install Nextcloud All-in-One](#install-nextcloud-all-in-one)
- [Access the AIO Interface with HTTPS](#access-the-aio-interface-with-https)
- [Set BorgBackup](#set-borgbackup)
- [Conclusion](#conclusion)

***

## Introduction

We present a quick way to install Nextcloud All-in-One on the TFGrid. This guide is based heavily on the Nextcloud documentation available [here](https://nextcloud.com/blog/how-to-install-the-nextcloud-all-in-one-on-linux/). It's mostly a simple adaptation to the TFGrid with some additional information on how to set correctly the firewall and the DNS record for your domain.

***

## Deploy a Full VM

* Deploy a Full VM with the [TF Playground](https://www.manual.grid.tf/getstarted/ssh_guide/ssh_openssh.html) or [Terraform](https://www.manual.grid.tf/terraform/terraform_full_vm.html)
  * Minimum specs:
    * IPv4 Address
    * 2 vcores 
    * 4096 MB of RAm
    * 50 GB of Storage
* Take note of the VM IP address
* SSH into the Full VM

***

## Set a Firewall

We set a firewall to monitor and control incoming and outgoing network traffic. To do so, we will define predetermined security rules. As a firewall, we will be using [Uncomplicated Firewall](https://wiki.ubuntu.com/UncomplicatedFirewall) (ufw).

It should already be installed on your system. If it is not, install it with the following command:

```
apt install ufw
```

For our security rules, we want to allow SSH, HTTP and HTTPS (443 and 8443).

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
* Allow port 8443
  * ```
    ufw allow 8443
    ```
* Allow port 3478 for Nextcloud Talk
  * ```
    ufw allow 3478
    ```

* To enable the firewall, write the following:
  * ```
    ufw enable
    ```

* To see the current security rules, write the following:
  * ```
    ufw status verbose
    ```

You now have enabled the firwall with proper security rules for your Nextcloud deployment.

***

## Set the DNS Record for Your Domain

* Go to your domain name registrar (e.g. Namecheap)
  * In the section Advanced DNS, add a DNS A Record to your domain (both @ and www as hosts) and link it with the VM IP Address
    * Record with @ as host
      * Type: A Record
      * Host: @
      * Value: VM IP Address
      * TTL: Automatic
    * Record with www as host
      * Type: A Record
      * Host: www
      * Value: VM IP Address
      * TTL: Automatic
  * It might take up to 30 minutes to set the DNS properly.
  * To check if the A record has been registered, you can use a common DNS checker:
    * ```
      https://dnschecker.org/#A/<domain-name>
      ```

***

## Install Nextcloud All-in-One

For the rest of the guide, we follow the steps availabe on the Nextcloud website's tutorial [How to Install the Nextcloud All-in-One on Linux](https://nextcloud.com/blog/how-to-install-the-nextcloud-all-in-one-on-linux/).

* Install Docker
  * ```
    curl -fsSL get.docker.com | sudo sh
    ```
* Install Nextcloud AIO
  * ```
    sudo docker run \
    --sig-proxy=false \
    --name nextcloud-aio-mastercontainer \
    --restart always \
    --publish 80:80 \
    --publish 8080:8080 \
    --publish 8443:8443 \
    --volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
    --volume /var/run/docker.sock:/var/run/docker.sock:ro \
    nextcloud/all-in-one:latest
    ```
* Reach the AIO interface on your browser
  * ```
    https://<VM_IP_Address>:8080
    ```
* Take note of the Nextcloud password
* Log in with the given password
* Add your domain name and click `Submit`
* Click `Start containers`
* Click `Open your Nextcloud`

You can now easily access Nextcloud AIO with your domain URL!

## Access the AIO Interface with HTTPS

Once you've set the domain name for your Nextcloud AIO, you can access the AIO interface with the following HTTPS link:

```
https://<domain-name>.com:8443
```

If you need to stop the Apache server to access the AIO interface, use the following lines to stop and start the server:

* Stop the apache server
  * ```
    sudo docker stop nextcloud-aio-apache
    ```
* Start the apache server
  * ```
    sudo docker start nextcloud-aio-apache
    ```

***
## Set BorgBackup

On the AIO interface, you can easily set BorgBackup. Since we are using Linux, we use the mounting directory `/mnt/backup`. Make sure to take note of the backup password.
***
## Conclusion

Most of the information in this guide can be found on the Nextcloud official website. We presented this guide to show another way to deploy Nextcloud on the TFGrid.