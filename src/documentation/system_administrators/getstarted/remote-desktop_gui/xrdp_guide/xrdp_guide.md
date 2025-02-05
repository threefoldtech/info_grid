<h1> Deploy a Full VM and Run XRDP for Remote Desktop Connection </h1>



## Introduction

In this guide, we learn how to deploy a full virtual machine on a 3node on the Threefold Grid.
We access Ubuntu with a desktop environment to offer a graphical user interface (GUI).

This guide can be done on a Windows, MAC, or Linux computer. The only difference will be in the Remote Desktop app. The steps are very similar.

For more information on deploying a full VM and using SSH remote connection, read this [SSH guide](../../ssh_guide/ssh_guide.md).

If you are new to the Threefold ecosystem and you want to deploy workloads on the Threefold Grid, read the [Get Started section](../../tfgrid3_getstarted.md) of the Threefold Manual.



## Server Side: Deploy the Full VM, install a desktop and XRDP

* Go to the [Threefold Dashboard](https://dashboard.grid.tf/#/)
* Deploy a full VM (Ubuntu 24.04)
  * With an IPv4 Address
* After deployment, copy the IPv4 address
* To SSH into the VM, write in the terminal
  * ``` 
    ssh root@VM_IPv4_address
    ```
* Once connected, update, upgrade and install the desktop environment
  * Update
    * ```
      apt update && apt install nano -y && apt upgrade -y
      ```  
  * You can install XCFE, a lightweight desktop environment or Ubuntu Desktop (choose either one)
    * Install XCFE
      * ```
        apt install xrdp xfce4 xfce4-goodies -y
        ```
    * Install Ubuntu Desktop
      * ```
        apt install xrdp ubuntu-desktop -y
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
    * Update the setuid for root
      * ```
        chown root:root /usr/bin/sudo
        chmod 4755 /usr/bin/sudo
        ls -l /usr/bin/sudo
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
        * Add the authorized public key and save the file
  * Exit the VM and reconnect with new user
    * ```
      exit
      ```
* Reconnect to the VM terminal with newuser
    * ``` 
      ssh newuser@VM_IPv4_address
      ```
* Check XRDP status 
  * ```
    sudo systemctl status xrdp
    ```
  * If not running, run manually (this also makes sure xrdp runs at every restart of the VM)
    * ```
      sudo systemctl enable --now xrdp
      ```
* If needed, configure xrdp (optional)
  * ```
    sudo nano /etc/xrdp/xrdp.ini
    ```
* Create a session with root-access user
  * Go to home directory of root-access user
    * ```
      cd ~
      ```
* Create a desktop session
  * For XCFE
    * ``` 
        echo "xfce4-session" | tee .xsession
        ```
  * For Ubuntu desktop
    * ``` 
        echo "gnome-session" | tee .xsession
        ```
* Reload the daemon and restart xrdp
  * ```
    sudo systemctl daemon-reload
    sudo systemctl restart xrdp
    ```

### Set Firewall (Optional)

You can set a firewall, but this is optional.

* Find your local computer IP address
  * On your local computer terminal, write
    * ```
      curl ifconfig.me
      ```

* On the VM terminal, install ufw
  * ```
    sudo apt install ufw -y
    ```
* Allow client computer port to the firewall (ufw)
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


## Client Side: Install Remote Desktop Connection for Windows, MAC or Linux

For the client side (the local computer accessing the VM remotely), you can use remote desktop connection for Windows, MAC and Linux. The process is very similar in all three cases.

Simply download the app, open it and write the IPv4 address of the VM. You then will need to write the username and password to enter into your VM.

### Download the App

* Client side Remote app
  * Windows
    * [Remote Desktop Connection app](https://apps.microsoft.com/store/detail/microsoft-remote-desktop/9WZDNCRFJ3PS?hl=en-ca&gl=ca&rtc=1)
  * MAC
    * Download in app store
      *  [Microsoft Remote Desktop Connection app](https://apps.apple.com/ca/app/microsoft-remote-desktop/id1295203466?mt=12)
  * Linux
    * [Remmina RDP Client](https://remmina.org/)
 
### Connect Remotely

* General process
  * In the Remote app, enter the following:
    * the IPv4 Address of the VM
    * the VM root-access username and password
  * You now have remote desktop connection to your VM



## Conclusion

You now have a remote access to the desktop environment of your VM. If you have any questions, let us know by writing a post on the [Threefold Forum](https://forum.threefold.io/).