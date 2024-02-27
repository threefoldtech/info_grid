<h1> Deploy a Full VM and Run Cockpit, a Web-based Interface for Servers </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Deploy a Full VM and Create a Root-Access User](#deploy-a-full-vm-and-create-a-root-access-user)
- [Set the VM and Install Cockpit](#set-the-vm-and-install-cockpit)
- [Change the Network System Daemon](#change-the-network-system-daemon)
- [Set a Firewall](#set-a-firewall)
- [Access Cockpit](#access-cockpit)
- [Conclusion](#conclusion)
- [Acknowledgements and References](#acknowledgements-and-references)

***

## Introduction

In this Threefold Guide, we show how easy it is to deploy a full VM and access Cockpit, a web-based interface to manage servers. For more information on Cockpit, visit this [link](https://cockpit-project.org/).

For more information on deploying a full VM and using SSH remote connection, read [this SSH guide](../../ssh_guide/ssh_guide.md).

If you are new to the Threefold ecosystem and you want to deploy workloads on the Threefold Grid, read the [Get Started section](../../tfgrid3_getstarted.md) of the Threefold Manual.

Note that the two sections [Change the Network System Daemon](#change-the-network-system-daemon) and [Set a Firewall](#set-a-firewall) are optional. That being said, they provide more features and security to the deployment.



## Deploy a Full VM and Create a Root-Access User

To start, you must [deploy and SSH into a full VM](../../ssh_guide/ssh_guide.md).

* Go to the [Threefold dashboard](https://dashboard.grid.tf/#/)
* Deploy a full VM (e.g. Ubuntu 22.04)
  * With an IPv4 Address
* After deployment, copy the IPv4 address
* Connect into the VM via SSH
  * ``` 
    ssh root@VM_IPv4_address
    ```
* Create a new user with root access
  * Here we use `newuser` as an example
    * ``` 
      adduser newuser
      ```
  * To see the directory of the new user
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
  * Exit the VM and reconnect with the new user
    * ``` 
      exit
      ```
    * ``` 
      ssh newuser@VM_IPv4_address
      ```



## Set the VM and Install Cockpit

* Update and upgrade the VM
  * ```
    sudo apt update -y && sudo apt upgrade -y && sudo apt-get update -y
    ```
* Install Cockpit
  * ```
    . /etc/os-release && sudo apt install -t ${UBUNTU_CODENAME}-backports cockpit -y
    ```



## Change the Network System Daemon

We now change the system daemon that manages network configurations. We will be using [NetworkManager](https://networkmanager.dev/) instead of [networkd](https://wiki.archlinux.org/title/systemd-networkd). This will give us further possibilities on Cockpit.

* Install NetworkManager. Note that it might already be installed.
  * ```
    sudo apt install network-manager -y
    ```
* Update the `.yaml` file
  * Go to netplan's directory
    * ```
      cd /etc/netplan
      ```
  * Search for the proper `.yaml` file name
    * ```
      ls -l
      ```
  * Update the `.yaml` file
    * ```
      sudo nano 50-cloud-init.yaml
      ```
    * Add the following lines under `network:`
      * ```
        version: 2
        renderer: NetworkManager
        ```
      * Note that these two lines should be aligned with `ethernets:`
    * Remove `version: 2` at the bottom of the file
    * Save and exit the file
* Disable networkd and enable NetworkManager
  * ```
    sudo systemctl disable systemd-networkd
    ```
  * ```
    sudo systemctl enable NetworkManager
    ```
* Apply netplan to set NetworkManager
  * ```
    sudo netplan apply
    ```
* Reboot the system to load the new kernel and to properly set NetworkManager
  * ```
    sudo reboot
    ```
* Reconnect to the VM
  * ``` 
    ssh newuser@VM_IPv4_address
    ```


## Set a Firewall

We now set a firewall. We note that [ufw](https://wiki.ubuntu.com/UncomplicatedFirewall) is not compatible with Cockpit and for this reason, we will be using [firewalld](https://firewalld.org/).

* Install firewalld
  * ```
    sudo apt install firewalld -y
    ```

* Add Cockpit to firewalld
  * ```
    sudo firewall-cmd --add-service=cockpit
    ```
  * ```
    sudo firewall-cmd --add-service=cockpit --permanent
    ```
* See if Cockpit is available
  * ```
    sudo firewall-cmd --info-service=cockpit
    ```

* See the status of firewalld
  * ```
    sudo firewall-cmd --state
    ```



## Access Cockpit

* On your web browser, write the following URL with the proper VM IPv4 address
  * ```
    VM_IPv4_Address:9090
    ```
* Enter the username and password of the root-access user
* You might need to grant administrative access to the user
  * On the top right of the Cockpit window, click on `Limited access`
    * Enter the root-access user password then click `Authenticate`



## Conclusion

You now have access to a web-based graphical interface to manage your VM. You can read [Cockpit's documentation](https://cockpit-project.org/documentation.html) to explore further this interface.



## Acknowledgements and References

A big thank you to Drew Smith for his [advice on using NetworkManager](https://forum.threefold.io/t/cockpit-managed-ubuntu-vm/3376) instead of networkd with Cockpit. 