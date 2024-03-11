<h1> Deploy a Full VM and Run Apache Guacamole (RDP Connection, Remote Desktop) </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Deploy a Full VM and Create a Root-Access User](#deploy-a-full-vm-and-create-a-root-access-user)
- [SSH with Root-Access User, Install Prerequisites and Apache Guacamole](#ssh-with-root-access-user-install-prerequisites-and-apache-guacamole)
- [Access Apache Guacamole and Create Admin-Access User](#access-apache-guacamole-and-create-admin-access-user)
- [Download the Desktop Environment and Run xrdp](#download-the-desktop-environment-and-run-xrdp)
- [Create an RDP Connection and Access the Server Remotely](#create-an-rdp-connection-and-access-the-server-remotely)
- [Feedback and Questions](#feedback-and-questions)
- [References](#references)

***

## Introduction

In this guide, we deploy a full virtual machine (Ubuntu 20.04) on the Threefold Grid with IPv4. We install and run [Apache Guacamole](https://guacamole.apache.org/) and access the VM with remote desktop connection by using [xrdp](https://www.xrdp.org/).

The Apache Guacamole instance has a two-factor authorization to give further security to the deployment.

With Apache Guacamole, a user can access different deployments and command servers remotely, with desktop access.

This guide can be done on a Windows, MAC, or Linux computer. For more information on deploying a full VM and using SSH remote connection, read this [SSH guide](../../ssh_guide/ssh_guide.md).

If you are new to the Threefold ecosystem and you want to deploy workloads on the Threefold Grid, read the [Get Started section](../../tfgrid3_getstarted.md) of the Threefold Manual.



## Deploy a Full VM and Create a Root-Access User

* Go to the [Threefold Dashboard](https://dashboard.grid.tf/#/)
* Deploy a full VM (Ubuntu 20.04) with at least the minimum specs for a desktop environment
  * IPv4 Address
  * Minimum vcores: 2vcores
  * Minimum Gb of RAM: 4Gb
  * Minimum storage: 15Gb
* After deployment, note the VM IPv4 address
* Connect to the VM via SSH
  * ``` 
    ssh root@VM_IPv4_address
    ```
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
  * Make the new user accessible by SSH
    * ```
      su - newuser
      ```
    * ```
      mkdir ~/.ssh
      ```
    * Add authorized public key in the file and save it
      * ```
        nano ~/.ssh/authorized_keys
        ```
* Exit the VM and reconnect with the new user



## SSH with Root-Access User, Install Prerequisites and Apache Guacamole 

* SSH into the VM
  * ``` 
    ssh newuser@VM_IPv4_address
    ```
* Update and upgrade Ubuntu  
  * ```
    sudo apt update && sudo apt upgrade -y && sudo apt-get install software-properties-common -y
    ```
* Download and run Apache Guacamole  
  * ```
    wget -O guac-install.sh https://git.io/fxZq5
    ```
  * ```
    chmod +x guac-install.sh
    ```
  * ```
    sudo ./guac-install.sh
    ```



## Access Apache Guacamole and Create Admin-Access User

* On your local computer, open a browser and write the following URL with the proper IPv4 address
  * ```
    https://VM_IPv4_address:8080/guacamole
    ```
  * On Guacamole, enter the following for both the username and the password
    * ```
      guacadmin
      ```
  * Download the [TOTP](https://totp.app/) app on your Android or iOS
    * Scan the QR Code
    * Enter the code
    * Next time you log in
      * go to the TOTP app and enter the given code
* Go to the Guacamole Settings
  * Users
    * Create a new user with all admin privileges
* Log out of the session
* Enter with the new admin user
* Go to Settings
  * Users
    * Delete the default user
* Apache Guacamole is now installed



## Download the Desktop Environment and Run xrdp

* Download a Ubuntu desktop environment on the VM
    * ```
      sudo apt install tasksel -y && sudo apt install lightdm -y 
      ```
      * Choose lightdm
    * Run tasksel and choose `ubuntu desktop`
      * ```
        sudo tasksel
        ```

* Download and run xrdp
  * ```
    wget https://c-nergy.be/downloads/xRDP/xrdp-installer-1.4.6.zip
    ```
  * ```
    unzip xrdp-installer-1.4.6.zip
    ```
  * ```
    bash xrdp-installer-1.4.6.sh
    ```



## Create an RDP Connection and Access the Server Remotely

* Create an RDP connection on Guacamole
  * Open Guacamole
    * ```
      http://VM_IPv4_address:8080/guacamole/
      ```
  * Go to Settings
    * Click on Connections
    * Click on New Connection
    * Write the following parameters
      * Name: Choose a name for the connection
      * Location: ROOT
      * Protocol: RDP
      * Network
        * Hostname: VM_IPv4_Address
        * Port: 3389
      * Authentication
        * Username: your root-access username (newuser)
        * Password: your root-access username password (newuser)
      * Security mode: Any
      * Ignore server certificate: Yes
      * Click Save
    * Go to the Apache Guacamole Home menu (top right button)
    * Click on the new connection
    * The remote desktop access is done



## Feedback and Questions

If you have any questions, let us know by writing a post on the [Threefold Forum](https://forum.threefold.io/).



## References

Apache Guacamole for Secure Remote Access to your Computers, [https://discussion.scottibyte.com/t/apache-guacamole-for-secure-remote-access-to-your-computers/32](https://discussion.scottibyte.com/t/apache-guacamole-for-secure-remote-access-to-your-computers/32)

MysticRyuujin's guac-install, [https://github.com/MysticRyuujin/guac-install](https://github.com/MysticRyuujin/guac-install)