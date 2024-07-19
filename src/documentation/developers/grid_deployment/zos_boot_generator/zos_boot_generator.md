
<h1>Zero-OS Boot Generator</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Set the Environment](#set-the-environment)
  - [With Docker Ubuntu 22.04](#with-docker-ubuntu-2204)
  - [With Ubuntu 22.04 Micro VM on TFGrid](#with-ubuntu-2204-micro-vm-on-tfgrid)
- [Prepare the Machine](#prepare-the-machine)
- [Set a DNS A Record](#set-a-dns-a-record)
- [Set a Firewall](#set-a-firewall)
- [Set HTTPS with Caddy](#set-https-with-caddy)
  - [Manually](#manually)
  - [With Zinit](#with-zinit)
- [Run the Development Server](#run-the-development-server)
- [Visit the Boot Generator](#visit-the-boot-generator)

---

## Introduction

We cover how to deploy the development server of the Zero-OS Boot Generator Assistant.

Visit the [0-bootstrap repo](https://github.com/threefoldtech/0-bootstrap) for more information.

## Set the Environment

There are many ways to set your environment. Here we show with Docker and a micro VM.

Using Docker should only be used as a test before deploying on a micro VM with IPv4 and IPv6.

### With Docker Ubuntu 22.04

- Deploy Ubuntu 22.04 (Jammy) with Docker

```
sudo docker pull ubuntu:jammy
sudo docker run -it ubuntu:jammy /bin/bash
```

### With Ubuntu 22.04 Micro VM on TFGrid

- Deploy an Ubuntu 22.04 micro VM on the [Dashboard](https://dashboard.grid.tf/)
  - Set IPv4 and IPv6 as `Network`
- SSH into the VM
  - It is recommended to use VSCodium Explorer to facilitate the file management and editing

## Prepare the Machine

Set the machine to deploy the server

- Set the machine in i386
```
dpkg --add-architecture i386
```

- Update the packages
```
apt update
```
- Install python3-flask
```
echo "2" | apt install -y python3-flask
```
- Install the prerequisites
```
apt install -y mtools syslinux isolinux libc6-dev-i386 libc6-dbg:i386 git wget genisoimage liblzma-dev build-essential sqlite3 nano
```

## Set a DNS A Record

Set a DNS A Record pointing to the server hosting the micro VM.

* Go to your domain name registrar
  * In the section **Advanced DNS**, add a **DNS A Record** to your domain and link it to the IP address of the VM you deployed on:
    * Type: A Record
    * Host: @
    * Value: <IPv4_Address>
    * TTL: Automatic
  * It might take up to 30 minutes to set the DNS properly.
  * To check if the A record has been registered, you can use a common DNS checker:
    * ```
      https://dnschecker.org/#A/example.com
      ```

## Set a Firewall

We set a firewall.

- Install ufw
```
apt install -y ufw
```
- Set the ports
```
ufw allow 80
ufw allow 443
ufw allow 22
```
- Enable and see the status
```
ufw enable
ufw status
```

## Set HTTPS with Caddy

We set HTTPS with Caddy. First, we test manually, then we set a zinit service.

### Manually

- Install Caddy
```
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' > /etc/apt/sources.list.d/caddy-stable.list
apt update
apt install caddy
```

- Start Caddy
```
caddy reverse-proxy -r --from example.com --to :5555
```

You can also set Caddy to run with zinit, as shown below.

### With Zinit

We manage Caddy with zinit.

- Open the file for editing
    ```bash
    nano /etc/zinit/caddy.yaml
    ```
- Insert the following line with your own domain and save the file
    ```
    exec: caddy reverse-proxy -r --from example.com --to :80
    ```
- Add the new Caddy file to zinit
    ```bash
    zinit monitor caddy
    ```

Zinit will start up Caddy immediately, restart it if it ever crashes, and start it up automatically after any reboots. Assuming you tested the Caddy invocation above and used the same form here, that should be all there is to it. 

Here are some other Zinit commands that could be helpful to troubleshoot issues:

- See status of all services (same as "zinit list")
    ```
    zinit
    ```
- Get logs for a service
    ```
    zinit log caddy
    ```
- Restart a service (to test configuration changes, for example)
    ```
    zinit stop caddy
    zinit start caddy
    ```

Now that we set the domain and HTTPS, let's deploy the development server with Python.

## Run the Development Server

We show how to deploy the Boot Generator with Python.


- Clone the repository  
```
git clone https://github.com/threefoldtech/0-bootstrap
cd 0-bootstrap
```
- Copy the sample file to config.py and add the proper info (e.g. set domain)
```
cp config.py.sample config.py
```
- Create the database
```
cat db/schema.sql | sqlite3 db/bootstrap.sqlite3
```
- Run the template script
```
bash setup/template.sh
```
- Run the development server with Python
```
python3 bootstrap.py
```

## Visit the Boot Generator

You can now access the boot generator on `https://example.com`.

![](./img/zos_boot_generator_main.png)
