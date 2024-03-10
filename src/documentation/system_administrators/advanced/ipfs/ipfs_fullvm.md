<h1> IPFS on a Full VM</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Deploy a Full VM](#deploy-a-full-vm)
- [Create a Root-Access User](#create-a-root-access-user)
- [Set a Firewall](#set-a-firewall)
  - [Additional Ports](#additional-ports)
- [Install IPFS](#install-ipfs)
- [Set IPFS](#set-ipfs)
- [Final Verification](#final-verification)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this ThreeFold guide, we explore how to set an IPFS node on a Full VM using the ThreeFold Playground.

## Deploy a Full VM

We start by deploying a full VM on the ThreeFold Playground.

* Go to the [Threefold Playground](https://playground.grid.tf/#/)
* Deploy a full VM (Ubuntu 20.04) with an IPv4 address and at least the minimum specs
  * IPv4 Address
  * Minimum vcores: 1vcore
  * Minimum MB of RAM: 1024GB
  * Minimum storage: 50GB
* After deployment, note the VM IPv4 address
* Connect to the VM via SSH
  * ``` 
    ssh root@VM_IPv4_address
    ```

## Create a Root-Access User

We create a root-access user. Note that this step is optional.

* Once connected, create a new user with root access (for this guide we use "newuser")
  * ``` 
    adduser newuser
    ```
  * You should now see the new user directory
    * ``` 
      ls /home
      ```
  * Give sudo capacity to the new user
    * ```
      usermod -aG sudo newuser
      ```
  * Switch to the new user
    * ```
      su - newuser
      ```
  * Create a directory to store the public key
    * ```
      mkdir ~/.ssh
      ```
  * Give read, write and execute permissions for the directory to the new user
    * ```
      chmod 700 ~/.ssh
      ```
  * Add the SSH public key in the file **authorized_keys** and save it
    * ```
      nano ~/.ssh/authorized_keys
      ```
* Exit the VM 
  * ```
    exit
    ```
* Reconnect with the new user
  * ``` 
    ssh newuser@VM_IPv4_address
    ```

## Set a Firewall

We set a firewall to monitor and control incoming and outgoing network traffic. To do so, we will define predetermined security rules. As a firewall, we will be using [Uncomplicated Firewall](https://wiki.ubuntu.com/UncomplicatedFirewall) (ufw).
For our security rules, we want to allow SSH, HTTP and HTTPS (443 and 8443).
We thus add the following rules:
* Allow SSH (port 22)
  * ```
    sudo ufw allow ssh
    ```
* Allow port 4001
  * ```
    sudo ufw allow 4001
    ```
* To enable the firewall, write the following:
  * ```
    sudo ufw enable
    ```
* To see the current security rules, write the following:
  * ```
    sudo ufw status verbose
    ```
You now have enabled the firewall with proper security rules for your IPFS deployment.

### Additional Ports

We provided the basic firewall ports for your IPFS instance. There are other more advanced configurations possible.
If you want to access your IPFS node remotely, you can allow **port 5001**. This will allow anyone to access your IPFS node. Make sure that you know what you are doing if you go this route. You should, for example, restrict which external IP address can access port 5001.
If you want to run your deployment as a gateway node, you should allow **port 8080**. Read the IPFS documentation for more information on this.
If you want to run pubsub capabilities, you need to allow **port 8081**. For more information, read the [IPFS documentation](https://blog.ipfs.tech/25-pubsub/).

## Install IPFS

We install the [IPFS Kubo binary](https://docs.ipfs.tech/install/command-line/#install-official-binary-distributions).
* Download the binary
  * ```
    wget https://dist.ipfs.tech/kubo/v0.24.0/kubo_v0.24.0_linux-amd64.tar.gz
    ```
* Unzip the file
  * ```
    tar -xvzf kubo_v0.24.0_linux-amd64.tar.gz
    ```
* Change directory
  * ```
    cd kubo
    ```
* Run the install script
  * ```
    sudo bash install.sh
    ```
* Verify that IPFS Kubo is properly installed
  * ```
    ipfs --version
    ```

## Set IPFS

We initialize IPFS and run the IPFS daemon.

* Initialize IPFS
  * ```
    ipfs init --profile server
    ```
* Increase the storage capacity (optional)
  * ```
    ipfs config Datastore.StorageMax 30GB
    ```
* Run the IPFS daemon
  * ```
    ipfs daemon
    ```
* Set an Ubuntu systemd service to keep the IPFS daemon running after exiting the VM
  * ```
    sudo nano /etc/systemd/system/ipfs.service
    ```
* Enter the systemd info
  * ```
    [Unit]
    Description=IPFS Daemon
    [Service]
    Type=simple
    ExecStart=/usr/local/bin/ipfs daemon --enable-gc
    Group=newuser
    Restart=always
    Environment="IPFS_PATH=/home/newuser/.ipfs"
    [Install]
    WantedBy=multi-user.target
    ```
* Enable the service
  * ```
    sudo systemctl daemon-reload
    sudo systemctl enable ipfs
    sudo systemctl start ipfs
    ```
* Verify that the IPFS daemon is properly running
  * ```
    sudo systemctl status ipfs
    ```
## Final Verification
We reboot and reconnect to the VM and verify that IPFS is properly running as a final verification.
* Reboot the VM
  * ```
    sudo reboot
    ```
* Reconnect to the VM
  * ```
    ssh newuser@VM_IPv4_address
    ```
* Check that the IPFS daemon is running
  * ```
    ipfs swarm peers
    ```
## Questions and Feedback
If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.