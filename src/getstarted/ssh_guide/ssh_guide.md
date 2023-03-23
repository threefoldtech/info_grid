<h1> SSH Remote Connection</h1>

In this Threefold Guide, we show how easy it is to deploy a full virtual machine (VM) and SSH into a 3node on Linux, MAC and Windows with both an IPv4 and a Planetary Network connection.

To deploy different workloads, the SSH connection process should be very similar.

If you have any questions, feel free to write a post on the [Threefold Forum](http://forum.threefold.io/).

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

***

# Step-by-Step Process

## Linux

### SSH into a 3node with IPv4 on Linux

***

* To create the SSH key pair, write in the terminal 
  * ```
    sudo ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in the terminal
  * ```
    sudo cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * You might need to refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Choose the parameters you want
      * Minimum CPU: 1 vCore
      * Minimum Memory: 512 Mb
      * Minimum Dis Size: 15 Gb
    * Select IPv4 in `Network`
    * In `Node Selection`
      * Select `Capacity Filter`
      * Select `Apply Filters and Suggest Nodes`
    * Click `Deploy`
    * Once the 3node is deployed
      * Copy the IPv4 address
      * Open the terminal, write (adjust your address)
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

***

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.deb file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-Linux)
  * Right-click and select `Open with other application`
    * Select `Software Install`
  * Search the `Threefold Planetary Connector` and open it
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* Create an SSH Key Pair
  * To create the SSH key pair, write in the terminal
    * ```
      sudo ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To see the public key, write in the terminal
  * ```
    sudo cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * You might need to refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Choose the parameters you want
      * Minimum CPU: 1 vCore
      * Minimum Memory: 512 Mb
      * Minimum Dis Size: 15 Gb
    * Select Planetary Network in `Network`
    * In `Node Selection`
      * Select `Capacity Filter`
      * Select `Apply Filters and Suggest Nodes`
    * Click `Deploy`
    * Once the 3node is deployed
      * Copy the Planetary Network address
      * Open the terminal, write (adjust your address)
        * ```
          ssh root@planetary_network_address
          ```
            * To confirm, write
              *   ```
                  yes
                  ```
* You now have an SSH connection on Linux with the Planetary Network

***

## MAC

### SSH into a 3node with IPv4 on MAC

***

* To create the SSH key pair, in the terminal write
    * ```
      sudo ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To add the private key, write in the terminal
    * ```
      sudo ssh-add ~/.ssh/id_rsa
       ```
* To see the public key, write in the terminal
    * ```
      sudo cat ~/.ssh/id_rsa.pub
      ```
    * Select and copy the public key when needed
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * You might need to refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Choose the parameters you want
      * Minimum CPU: 1 vCore
      * Minimum Memory: 512 Mb
      * Minimum Dis Size: 15 Gb
    * Select IPv4 in `Network`
    * In `Node Selection`
      * Select `Capacity Filter`
      * Select `Apply Filters and Suggest Nodes`
    * Click `Deploy`
    * Once the 3node is deployed
      * Copy the IPv4 address
      * Open the terminal, write (adjust your address)
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

***

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.dmg file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-MacOS)
  * Run the dmg installer
  * Search the Threefold Planetary Connector in `Applications` and open it
  * Disconnect your VPN if you have one
  * In the connector, click `Connect`
* To create the SSH key pair, write in the terminal 
    * ```
      sudo ssh-keygen
      ```
      * Save in default location
      * Write a password (optional)
* To add the private key, write
    * ```
      sudo ssh-add ~/.ssh/id_rsa
       ```
* To see the public key, write in the terminal
    * ```
      sudo cat ~/.ssh/id_rsa.pub
      ```
    * Select and copy the public key when needed
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * You might need to refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Choose the parameters you want
      * Minimum CPU: 1 vCore
      * Minimum Memory: 512 Mb
      * Minimum Dis Size: 15 Gb
    * Select Planetary Network in `Network`
    * In `Node Selection`
      * Select `Capacity Filter`
      * Select `Apply Filters and Suggest Nodes`
    * Click `Deploy`
    * Once the 3node is deployed
      * Copy the Planetary Network address
      * Open the terminal, write (adjust your address)
        * ```
          ssh root@planetary_network_address
          ```
            * To confirm, write
              *   ```
                  yes
                  ```
* You now have an SSH connection on MAC with the Planetary Network

***

## Windows

### SSH into a 3node with IPv4 on Windows

***

* To download OpenSSH client and OpenSSH server
  * Open the `Settings` and select `Apps`
  * Click `Apps & Features`
  * Click `Optional Features`
  * Verifiy if OpenSSH Client and OpenSSH Server are there
    * If not
      * Click `Add a feature`
        * Search OpenSSH
        * Install OpenSSH Client and OpenSSH Server
* To generate an SSH key pair, open the `Command Prompt` and write
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in the `Command Prompt`
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * You might need to refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Choose the parameters you want
      * Minimum CPU: 1 vCore
      * Minimum Memory: 512 Mb
      * Minimum Dis Size: 15 Gb
    * Select IPv4 in `Network`
    * In `Node Selection`
      * Select `Capacity Filter`
      * Select `Apply Filters and Suggest Nodes`
    * Click `Deploy`
    * Once the 3node is deployed
      * Copy the IPv4 address
      * Open the `Command Prompt`, write (adjust your address)
        * ```
          ssh root@IPv4_address
          ```
            * To confirm, write
              *   ```
                  yes
                  ```
* You now have an SSH connection on Window with IPv4

***

### SSH into a 3node with the Planetary Network on Windows

***

* To download and connect to the Threefold Planetary Network Connector
  * Download the [.msi file](https://github.com/threefoldtech/planetary_network/releases/tag/v0.3-rc1-Windows10)
  * Search the `Threefold Planetary Connector`
    * Right-click and select `Install`
  * Disconnect your VPN if you have one
  * Open the TF connector and click `Connect`
* To download OpenSSH client and OpenSSH server
  * Open the `Settings` and select `Apps`
  * Click `Apps & Features`
  * Click `Optional Features`
  * Verifiy if OpenSSH Client and OpenSSH Server are there
    * If not
      * Click `Add a feature`
        * Search OpenSSH
        * Install OpenSSH Client and OpenSSH Server
* To generate an SSH key pair, open the `Command Prompt` and write
  * ```
    ssh-keygen
    ```
    * Save in default location
    * Write a password (optional)
* To see the public key, write in the `Command Prompt`
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
  * Select and copy the public key when needed
* To deploy, go to the [Threefold Playground](https://play.grid.tf/)
  * In the profile manager settings
    * Paste the seed phrase
    * Paste the SSH public key
    * You might need to refresh the page for the profile to be accessible
  * Deploy a Full VM on the TF Grid
    * Choose the parameters you want
      * Minimum CPU: 1 vCore
      * Minimum Memory: 512 Mb
      * Minimum Dis Size: 15 Gb
    * Select Planetary Network in `Network`
    * In `Node Selection`
      * Select `Capacity Filter`
      * Select `Apply Filters and Suggest Nodes`
    * Click `Deploy`
    * Once the 3node is deployed
      * Copy the Planetary Network address
      * Open the `Command Prompt`, write (adjust your address)
        * ```
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