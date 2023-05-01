<h1> Deploy a Full VM and Run XRDP for Remote Desktop Connection </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Server Side: Deploy the Full VM, install a desktop and XRDP](#server-side-deploy-the-full-vm-install-a-desktop-and-xrdp)
- [Client Side: Install Remote Desktop Connection for Windows, MAC or Linux](#client-side-install-remote-desktop-connection-for-windows-mac-or-linux)
  - [Download the App](#download-the-app)
  - [Connect Remotely](#connect-remotely)

***

# Introduction

In this guide, we learn how to deploy a full virtual machine on a 3node on the Threefold Grid.
We access Ubuntu with a desktop environment to offer a graphical user interface (GUI).

This guide can be done on a Window, MAC or Linux machine. The only difference will be in the Remote Desktop app. The steps are very similar.

***

# Server Side: Deploy the Full VM, install a desktop and XRDP

* Go to the [Threefold Playground](https://play.grid.tf/#/)
* Deploy a Full VM (Ubuntu 20.04)
  * IPv4 Address
* After deployment, copy the IPv4 address
* To SSH into the 3node, write in the terminal
  * ``` 
    ssh root@IPv4_address
    ```
* Once connected, update, upgrade and install the desktop environment
  * Update
    * ```
      sudo apt update -y && sudo apt upgrade -y
      ```  
  * Install a light-weight desktop environment (Xfce)
    * ```
      sudo apt install xfce4 xfce4-goodies -y
      ```
* Create a user with root access
    * ``` 
      adduser newuser
      ```
    * ``` 
      ls /home
      ```
        * You should see the newuser directory
    * Give sudo capacity to newuser
      * ```
        usermod -aG sudo newuser
        ```
    * Make newuser accessible by SSH
      * ```
        su - newuser
        ```
      * ```
        mkdir ~/.ssh
        ```
      * ```
        nano ~/.ssh/authorized_keys
        ```
        * add authorized public key in file and save
  * Exit the VM and reconnect with new user
    * ```
      exit
      ```
* Reconnect to the 3node (server) terminal and install XRDP
    * ``` 
      ssh newuser@IPv4_address
      ```
* Install XRDP
  * ```
    sudo apt install xrdp -y
    ```
* Check XRDP status 
  * ```
    sudo systemctl status xrdp
    ```
  * If not running, run manually:
    * ```
      sudo systemctl start xrdp
      ```
* If needed, configure xrdp (optional)
  * ```
    sudo nano /etc/xrdp/xrdp.ini
    ```
* Create a session with root-access user
Move to home directory
  * Go to home directory of root-access user
    * ```
      cd ~
      ```
* Create session
  * ``` 
    echo "xfce4-session" | tee .xsession
    ```
* Restart the server
  * ```
    sudo systemctl restart xrdp
    ```

* Find your local computer IP address
  * On your local computer terminal, write
    * ```
      curl ifconfig.me
      ```

* On the 3node terminal, allow client computer port to the firewall (ufw)
  * ```
    sudo ufw allow from your_local_ip/32 to any port 3389
    ```
* Allow SSH connection to your firewall
  * ```
    sudo ufw allow ssh
    ```
* Verify status of the firewall
  * ```
    sudo ufw status
    ```
  * If not active, do the following:
    * ```
      sudo ufw disable
      ```
    * ```
      sudo ufw enable
      ```
  * Then the ufw status should show changes
    * ```
      sudo ufw status
      ```
***

# Client Side: Install Remote Desktop Connection for Windows, MAC or Linux

For the client side (the local computer accessing the 3node remotely), you can use remote desktop connection for Windows, MAC and Linux. The process is very similar in all 3 cases.

Simply download the app, open it and write the IP address of the 3node. You then will need to write the username and password to enter into your 3node.

## Download the App

* Client side Remote app
  * Windows
    * [Remote Desktop Connection app](https://apps.microsoft.com/store/detail/microsoft-remote-desktop/9WZDNCRFJ3PS?hl=en-ca&gl=ca&rtc=1)
  * MAC
    * Download in app store
      *  [Microsoft Remote Desktop Connection app](https://apps.apple.com/ca/app/microsoft-remote-desktop/id1295203466?mt=12)
  * Linux
    * [Remmina RDP Client](https://remmina.org/)
 
## Connect Remotely

* General process
  * In the Remote app, enter the following:
    * your IP Address of the 3node
    * 3node root-access username
    * username password
  * You now have remote desktop connection to your 3node