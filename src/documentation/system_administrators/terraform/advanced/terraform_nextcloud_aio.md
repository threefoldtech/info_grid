<h1> Nextcloud All-in-One Deployment </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Deploy a Full VM](#deploy-a-full-vm)
- [Set a Firewall](#set-a-firewall)
- [Set the DNS Record for Your Domain](#set-the-dns-record-for-your-domain)
- [Install Nextcloud All-in-One](#install-nextcloud-all-in-one)
- [Set BorgBackup](#set-borgbackup)
- [Conclusion](#conclusion)

***

## Introduction

We present a quick way to install Nextcloud All-in-One on the TFGrid. This guide is based heavily on the Nextcloud documentation available [here](https://nextcloud.com/blog/how-to-install-the-nextcloud-all-in-one-on-linux/). It's mostly a simple adaptation to the TFGrid with some additional information on how to set correctly the firewall and the DNS record for your domain.



## Deploy a Full VM

* Deploy a Full VM with the [TF Dashboard](../../getstarted/ssh_guide/ssh_openssh.md) or [Terraform](../terraform_full_vm.md)
  * Minimum specs:
    * IPv4 Address
    * 2 vcores 
    * 4096 MB of RAM
    * 50 GB of Storage
* Take note of the VM IP address
* SSH into the Full VM



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

You now have enabled the firewall with proper security rules for your Nextcloud deployment.



## Set the DNS Record for Your Domain

* Go to your domain name registrar (e.g. Namecheap)
  * In the section **Advanced DNS**, add a **DNS A Record** to your domain and link it to the IP address of the VM you deployed on:
    * Type: A Record
    * Host: @
    * Value: <VM_IP_Address>
    * TTL: Automatic
  * It might take up to 30 minutes to set the DNS properly.
  * To check if the A record has been registered, you can use a common DNS checker:
    * ```
      https://dnschecker.org/#A/<domain-name>
      ```



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
* Reach the AIO interface on your browser:
  * ```
    https://<domain_name>:8443
    ```
  * Example: `https://nextcloudwebsite.com:8443`
* Take note of the Nextcloud password
* Log in with the given password
* Add your domain name and click `Submit`
* Click `Start containers`
* Click `Open your Nextcloud`

You can now easily access Nextcloud AIO with your domain URL!


## Set BorgBackup

On the AIO interface, you can easily set BorgBackup. Since we are using Linux, we use the mounting directory `/mnt/backup`. Make sure to take note of the backup password.

## Conclusion

Most of the information in this guide can be found on the Nextcloud official website. We presented this guide to show another way to deploy Nextcloud on the TFGrid.