<h1> SSH Remote Connection</h1>

In this Threefold Guide, we explore how to SSH into a 3node on Linux, MAC and Windows with either an IPv4 or a Planetary Network connection.

***

<h2> Table of Contents </h2>

- [Main Steps and Pre-Requisites](#main-steps-and-pre-requisites)
- [Step-by-Step Process](#step-by-step-process)
  - [Linux](#linux)
    - [SSH into a 3node with IPv4 on Linux](#ssh-into-a-3node-with-ipv4-on-linux)
    - [SSH into a 3node with the Planetary Network on Linux](#ssh-into-a-3node-with-the-planetary-network-on-linux)
  - [MAC](#mac)
    - [SSH into a 3node with IPv4 on MAC](#ssh-into-a-3node-with-ipv4-on-mac)
    - [SSH into a 3node with the Planetary Network on MAC](#ssh-into-a-3node-with-the-planetary-network-on-mac)
  - [Windows](#windows)
    - [SSH into a 3node with IPv4 on Windows](#ssh-into-a-3node-with-ipv4-on-windows)
    - [SSH into a 3node with the Planetary Network on Windows](#ssh-into-a-3node-with-the-planetary-network-on-windows)
- [Questions and Feedback](#questions-and-feedback)
***
# Main Steps and Pre-Requisites

The pre-requisites are:

* [Create a Threefold Connect Wallet](https://manual.grid.tf/getstarted/TF_Connect/TF_Connect.html)
* [Buy TFT](https://manual.grid.tf/getstarted/TF_Token/TF_Token.html)
* [Create a Threefold Dashboard Account and Transfer TFT](https://manual.grid.tf/getstarted/TF_Dashboard/TF_Dashboard.html)

The main steps for the whole process are the following:

* Create an SSH Key pair
* Deploy a 3node
  * Choose IPv4 or the Planetary Network
* SSH into the 3node
  * For the Planetary Network, download the Planetary Network Connector

# Step-by-Step Process

## Linux

### SSH into a 3node with IPv4 on Linux

* To create the SSH key pair, write in the terminal 
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write
  * ```
    sudo cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * Refresh the page for the profile to be accessible
  * Deploy a full VM
  * After deployment
    * Copy the IPv4 address
    * Open the terminal and write (adjust your address)
        * ```
          ssh root@IPv4_address
          ```
        * To confirm, write
          *   ```
              yes
              ```
* You now have an SSH connection on Linux with IPv4

***

### SSH into a 3node with the Planetary Network on Linux

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.deb file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-Linux)
  * Right-click and select `Open with other application`
    * Select `Software Install`
  * Search and open in `Show applications`
    * Threefold Planetary Connector
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* Create an SSH Key Pair
  * To create the SSH key pair, in the terminal write
    * ```
      ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To copy the public key, write
  * ```
    sudo cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * Refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Select Planetary Network in Network
    * Copy the Planetary Network address
    * Open the terminal and write (adjust your address)
      * ```
        ssh root@planetary_network_address
        ```
        * To confirm, write
          *   ```
              yes
              ```
* You now have an SSH connection with the Planetary Network

***

## MAC

### SSH into a 3node with IPv4 on MAC

* To create the SSH key pair, in the terminal write
    * ```
      ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To copy the public key, write
    * ```
      sudo cat ~/.ssh/id_rsa.pub
      ```
    * Select and copy the public key
* To add the private key, write
    * ```
      sudo ssh-add ~/.ssh/id_rsa
       ```
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
    * In the profile manager settings
      * Paste the seed phrase
      * Paste the SSH public key
      * Refresh the page for the profile to be accessible
    * Deploy a full VM
      * Choose the necessary parameters and click deploy
    * Once it is deployed
      * Copy the IPv4 address
      * Open terminal and write (adjust your address)
        * ```
          ssh root@IPv4_address
          ```
        * To confirm, write
            *   ```
                yes
                ```
* You now have an SSH connection on MAC with IPv4

***

### SSH into a 3node with the Planetary Network on MAC

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.dmg file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-MacOS)
  * Run the dmg installer
  * Search in `Applications` and open the Threefold Planetary Connector
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* To create the SSH key pair, write in the terminal
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To copy the public key, write
      * ```
        sudo cat ~/.ssh/id_rsa.pub
        ```
        * Select and copy the public key
* To add the private key, write
    * ```
      sudo ssh-add ~/.ssh/id_rsa
      ```
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * Refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Select Planetary Network in Network
    * Copy the Planetary Network address
    * Open the terminal, write (adjust your address)
      * ```
        ssh root@planetary_network_address
        ```
          * To confirm, write
            *   ```
                yes
                ```
* You now have an SSH connection with the Planetary Network

***

## Windows

### SSH into a 3node with IPv4 on Windows

* To download OpenSSH client and OpenSSH server
  * Search `Settings`
  * Open `Apps & Features`
  * Open `Optional Features`
  * Verifiy if OpenSSH Client and OpenSSH Server are there
    * If not
      * Click `Add a feature`
        * Search OpenSSH
        * Install OpenSSH Client and OpenSSH Server
* To generate an SSH key pair, open the command prompt and write
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To copy your public key, write in the terminal
  ```
  cat ~/.ssh/id_rsa.pub
  ```
    * Copy the output
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the Profile Manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * Refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Select Planetary Network in Network
    * After deployment
      * Copy the IPv4 address
      * Open the command prompt and write (adjust your address)
        ```
        ssh root@IPv4_address
        ```
        * To confirm, write
          *   ```
              yes
              ```
* You now have an SSH connection on Window with IPv4

***

### SSH into a 3node with the Planetary Network on Windows

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.msi file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-Windows10)
  * Search and open the `Threefold Planetary Connector`
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* To download OpenSSH client and OpenSSH server
  * Search `Settings`
  * Open `Apps & Features`
  * Open `Optional Features`
  * Verifiy if OpenSSH Client and OpenSSH Server are there
    * If not
      * Click `Add a feature`
        * Search OpenSSH
        * Install OpenSSH Client and OpenSSH Server
* To generate an SSH key pair, open the command prompt and write
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To copy your public key, write in the terminal
  ```
  cat ~/.ssh/id_rsa.pub
  ```
    * Copy the output
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the Profile Manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * Refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Select Planetary Network in Network
    * After deployment
      * Copy the Planetary Network address
      * Open command prompt and write (adjust your address)
        ```
        ssh root@planetary_network_address
        ```
        * To confirm, write
          *   ```
              yes
              ```
* You now have an SSH connection on Window with the Planetary Network

***

# Questions and Feedback

If you have any questions, let us know by writing a post on the [Threefold Forum](http://forum.threefold.io/).