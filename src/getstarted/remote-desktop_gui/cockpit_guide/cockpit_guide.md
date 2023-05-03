<h1> Deploy a Full VM and Run Cockpit, a Web-based Interface for Servers </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Deploy a Full VM and Create a Root-Access User](#deploy-a-full-vm-and-create-a-root-access-user)
- [Set the VM, Install and Access Cockpit](#set-the-vm-install-and-access-cockpit)
- [Conclusion](#conclusion)

***

## Introduction

In this Threefold Guide, we show how easy it is to deploy a full VM and access Cockpit, a web-based interface to manage servers. For more information on Cockpit, visit this [link](https://cockpit-project.org/).

For more information on deploying a full VM and using SSH remote connection, read [this SSH guide](../../ssh_guide/ssh_guide.md).

If you are new to the Threefold ecosystem and you want to deploy workloads on the Threefold Grid, read the [Get Started section](../../tfgrid3_getstarted.md) of the Threefold Manual.

***

## Deploy a Full VM and Create a Root-Access User

To start, you must [deploy and SSH into a Full VM](../../ssh_guide/ssh_guide.md).

* Go to the [Threefold Playground](https://play.grid.tf/#/)
* Deploy a full VM (e.g. Ubuntu 22.04)
  * With an IPv4 Address
* After deployment, copy the IPv4 address
* In the terminal write
  * ``` 
    ssh root@VM_IPv4_address
    ```
* To create a new user with root access
  * Here we use `newuser` as an example
    * ``` 
      adduser newuser
      ```
  * To see the directory of the `newuser` 
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
    * ```
      nano ~/.ssh/authorized_keys
      ```
      * add the authorized public key in the file, then save and quit
  * Exit the VM and reconnect with new user
  * ``` 
    ssh newuser@VM_IPv4_address
    ```

***

## Set the VM, Install and Access Cockpit

* Set the system up to date:
  * ```
    sudo apt update -y && sudo apt upgrade -y && sudo apt-get update -y
    ```
* Install Cockpit:
  * ```
    . /etc/os-release && sudo apt install -t ${UBUNTU_CODENAME}-backports cockpit -y
    ```
* Access Cokcpit on a web browser:
  * Write the following URL with the VM IPv4 address: 
    * ```
      VM_IPv4_Address:9090
      ```
  * Enter the username and password of the root-access user

***

## Conclusion

You now have access to a web-based graphical interface to manage your VM. Read [Cockpit's documentation](https://cockpit-project.org/documentation.html) to explore further this interface.