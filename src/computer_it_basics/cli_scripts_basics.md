
<h1> CLI and Scripts Basics </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Basic Commands](#basic-commands)
  - [Set default terminal](#set-default-terminal)
  - [See the current path](#see-the-current-path)
  - [List hidden files](#list-hidden-files)
  - [Display the content of a directory](#display-the-content-of-a-directory)
  - [Vim modes and basic commands](#vim-modes-and-basic-commands)
  - [Check the listening ports using netstat](#check-the-listening-ports-using-netstat)
  - [See the disk usage of different folders](#see-the-disk-usage-of-different-folders)
  - [Verify the application version](#verify-the-application-version)
  - [Find the path of a file with only the file name](#find-the-path-of-a-file-with-only-the-file-name)
  - [Become the superuser (su) on Linux](#become-the-superuser-su-on-linux)
  - [Exit a session](#exit-a-session)
  - [Know the current user](#know-the-current-user)
  - [Set the path of a package](#set-the-path-of-a-package)
  - [See the current path](#see-the-current-path-1)
  - [Find the current shell](#find-the-current-shell)
  - [SSH into Remote Server](#ssh-into-remote-server)
  - [Transfer files between local and remote computers (IPv4 and IPv6) with scp](#transfer-files-between-local-and-remote-computers-ipv4-and-ipv6-with-scp)
  - [Transfer files between computers (local or remote ) with rsync](#transfer-files-between-computers-local-or-remote--with-rsync)
  - [Adjust reorganization of files and folders before running rsync](#adjust-reorganization-of-files-and-folders-before-running-rsync)
  - [Automate backup with rsync](#automate-backup-with-rsync)
  - [Encrypt files with Gocryptfs](#encrypt-files-with-gocryptfs)
  - [Encrypt files with Veracrypt](#encrypt-files-with-veracrypt)
  - [Install Brew](#install-brew)
  - [Brew basic commands](#brew-basic-commands)
  - [Yarn basic commands](#yarn-basic-commands)
  - [Replace a string by another string in a text file](#replace-a-string-by-another-string-in-a-text-file)
  - [Replace extensions of files in a folder](#replace-extensions-of-files-in-a-folder)
  - [Remove extension of files in a folder](#remove-extension-of-files-in-a-folder)
  - [See the current date and time on Linux](#see-the-current-date-and-time-on-linux)
  - [Special variables in Bash Shell](#special-variables-in-bash-shell)
  - [Gather DNS information of a website](#gather-dns-information-of-a-website)
- [Network-related Commands](#network-related-commands)
  - [See the network connections and ports](#see-the-network-connections-and-ports)
  - [See identity and info of IP address](#see-identity-and-info-of-ip-address)
  - [ip basic commands](#ip-basic-commands)
  - [Display socket statistics](#display-socket-statistics)
  - [Query or control network driver and hardware settings](#query-or-control-network-driver-and-hardware-settings)
  - [See if ethernet port is active](#see-if-ethernet-port-is-active)
  - [Add IP address to hardware port (ethernet)](#add-ip-address-to-hardware-port-ethernet)
  - [Private IP address range](#private-ip-address-range)
  - [Set IP Address manually](#set-ip-address-manually)
- [Basic Scripts](#basic-scripts)
  - [Run a script with arguments](#run-a-script-with-arguments)
  - [Print all arguments](#print-all-arguments)
  - [Iterate over arguments](#iterate-over-arguments)
  - [Count lines in files given as arguments](#count-lines-in-files-given-as-arguments)
  - [Find path of a file](#find-path-of-a-file)
  - [Print how many arguments are passed in a script](#print-how-many-arguments-are-passed-in-a-script)
- [MAC](#mac)
  - [Enable remote login on MAC](#enable-remote-login-on-mac)
  - [Find Other storage on MAC](#find-other-storage-on-mac)
  - [Sort files by size and extension on MAC](#sort-files-by-size-and-extension-on-mac)
- [Windows](#windows)
  - [Find the product key](#find-the-product-key)
  - [Find Windows license type](#find-windows-license-type)
- [References](#references)

***

## Introduction

We present here a quick guide on different command-line interface (CLI) commands as well as some basic scripts. 

The main goal of this guide is to demonstrate that having some core understanding of CLI and scripts can drastically increase efficiency and speed when it comes to deploying and managing workloads on the TFGrid.

## Basic Commands

### Set default terminal

```
update-alternatives --config x-terminal-emulator
```

### See the current path

```
pwd
```

***

### List hidden files

```
ls -ld .?*
```

***

### Display the content of a directory

You can use **tree** to display the files and organization of a directory:

* General command
  * ```
    tree
    ```
* View hidden files
  * ```
    tree -a
    ```

***

### Vim modes and basic commands

[Vim](https://www.vim.org/) is a free and open-source, screen-based text editor program.

With Vim, you can use two modes.

* Insert mode - normal text editor
  * Press **i**
* Command mode - commands to the editor
  * Press **ESC**

Here are some basic commands:

* Delete characters
  * **x**
* Undo last command
  * **u**
* Undo the whole line
  * **U**
* Go to the end of line
  * **A**
* Save and exit
  * **:wq**
* Discard all changes
  * **:q!**
* Move cursor to the start of the line
  * **0**
* Delete the current word
  * **dw**
* Delete the current line
  * **dd**

***

### Check the listening ports using netstat

Use the command:

```
netstat
```

***


### See the disk usage of different folders

```
du -sh *
```


***

### Verify the application version

```
which <application_name>
```

***

### Find the path of a file with only the file name

On MAC and Linux, you can use **coreutils** and **realpath** from Brew:

* ```
  brew install coreutils
  ```
* ```
  realpath file_name
  ```

***

### Become the superuser (su) on Linux

You can use either command:

* Option 1
  * ```
    sudo -i
    ```
* Option 2
  * ```
    sudo -s
    ```

***

### Exit a session

You can use either command depending on your shell:

* ```
  exit
  ```
* ```
  logout
  ```

***

### Know the current user

You can use the following command:

* ```
  whoami
  ```

***

### See the path of a package

To see the path of a package, you can use the following command:

* ```
  whereis <package_name>
  ```

***

### Set the path of a package

```
export PATH=$PATH:/snap/bin

```

***


### See the current path

```
pwd
```
  
***

### Find the current shell

* Compact version
  * ```
    echo $SHELL
    ```
* Detailed version
  * ```
    ls -l /proc/$$/exe
    ```

***

### SSH into Remote Server

* Create SSH key pair
  * ```
    ssh-keygen
    ```
* Install openssh-client on the local computer*
  * ```
    sudo apt install openssh-client
    ```
* Install openssh-server on the remote computer*
  * ```
    sudo apt install openssh-server
    ```
* Copy public key
  * ```
    cat ~/.ssh/id_rsa.pub
    ```
* Create the ssh directory on the remote computer
  * ```
    mkdir ~/.ssh
    ```
* Add public key in the file **authorized_keys** on the remote computer
  * ```
    nano ~/.ssh/authorized_keys
    ```
* Check openssh-server status
  * ``` 
    sudo service ssh status
    ```
* SSH into the remote machine
  * ```
    ssh <username>@<remote_server_IP_or_hostname>
    ```

\*Note: For MAC, you can install **openssh-server** and **openssh-client** with Brew: **brew install openssh-server** and **brew install openssh-client**.

To enable remote login on a MAC, [read this section](#enable-remote-login-on-mac).

***

### Transfer files between local and remote computers (IPv4 and IPv6) with scp

* From local to remote, write the following on the local terminal:
  * ```
    scp <path_to_local_file>/<filename> <remote_username>@<remote_IPv4_address>:/<remote_username>/<path_to_remote_file>/<filename>
    ```
* From remote to local, you can write the following on the local terminal (more secure):
  * ```
    scp <remote_username>@<remote_IPv4_address>:/<remote_username>/<path_to_remote_file>/<filename> <path_to_local_file>/<file> 
* From remote to local, you can also write the following on the remote terminal:
  * ```
    scp <path_to_remote_file>/<file> <local_user>@<local_IPv4_address>:/<local_username>/<path_to_local_file>/<filename>

For IPv6, simply add `-6` after scp and add `\[` before and `\]` after the IPv6 address. 

***

### Transfer files between computers (local or remote ) with rsync

[rsync](https://rsync.samba.org/) is a utility for efficiently transferring and synchronizing files between a computer and a storage drive and across networked computers by comparing the modification times and sizes of files.

We show here how to transfer files between two computers. Note that at least one of the two computers must be local.

* From local to remote
  * ```
    rsync -avze ssh --progress --delete /path/to/local/directory remote_user@<remote_host_or_ip>:/path/to/remote/directory/
    ```
* From remote to local
  * ```
    rsync -avze ssh --progress --delete remote_user@<remote_host_or_ip>:/path/to/remote/directory /path/to/local/directory/
    ```

Here is short description of the parameters used:

* **-a**: archive mode, preserving the attributes of the files and directories 
* **-v**: verbose mode, displaying the progress of the transfer
* **-z**: compress mode, compressing the data before transferring 
* **-e** specifies the remote shell (.e.g -**e ssh**)
* **--progress** tells rsync to print information showing the progress of the transfer 
* **--delete** tells rsync to delete files that aren't on the sending side

***

### Adjust reorganization of files and folders before running rsync

[rsync-sidekick](https://github.com/m-manu/rsync-sidekick) propagates changes from source directory to destination directory. You can run rsync-sidekick before running rsync.


* Install go
  * ```
    sudo apt install golang-go
    ```
* Verify that go is properly installed
  * ```
    go version
    ```
* Install rsync-sidekick
  * ```
    sudo go install github.com/m-manu/rsync-sidekick@latest
    ```
* Reorganize the files and folders with rsync-sidekick
  * ```
    rsync-sidekick /path/to/local/directory/ username@IP_Address:/path/to/remote/directory/
    ```

* Transfer and update files and folders with rsync
  * ```
    sudo rsync -avze ssh --progress --delete --log-file=/path/to/local/directory/rsync_storage.log /path/to/local/directory/ username@IP_Address:/path/to/remote/directory/
    ```

***

### Automate backup with rsync

We show how to automate file transfers between two computers using rsync and rsync-sidekick.

* Create the script file
  * ```
    nano rsync_backup.sh
    ```
* Write the following script with the proper paths. Here the log is saved in the same directory.
  * ```
    # filename: rsync_backup.sh
    #!/bin/bash

    rsync-sidekick /path/to/local/directory/ username@IP_Address:/path/to/remote/directory/

    sudo rsync -avze ssh --progress --delete --log-file=/path/to/local/directory/rsync_storage.log /path/to/local/directory/ username@IP_Address:/path/to/remote/directory/
    ```
* Give permission
  * ```
    sudo chmod +x /path/to/script/rsync_backup.sh
    ```
* Set a cron job to run the script periodically
  * Copy your .sh file to **/root**:
    ``` 
    sudo cp path/to/script/rsync_backup.sh /root
    ```
* Open the cron file
  * ```
    sudo crontab -e
    ```
* Add the following to run the script everyday. For this example, we set the time at 18:00PM
  * ```
    0 18 * * * /root/rsync_backup.sh
    ```

***

### Encrypt files with Gocryptfs

You can use [gocryptfs](https://github.com/rfjakob/gocryptfs) to encrypt files.

* Install gocryptfs
  * ```
    apt install gocryptfs
    ```
* Create a vault directory (e.g. **vaultdir**) and a mount directory (e.g. **mountdir**)
  * ```
    mkdir vaultdir mountdir
    ```
* Initiate the vault
  * ```
    gocryptfs -init vaultdir
    ```
* Mount the mount directory with the vault
  * ```
    gocryptfs vaultdir mountdir
    ```
* You can now create files in the folder. For example:
  * ```
    touch mountdir/test.txt
    ```
* The new file **test.txt** is now encrypted in the vault  
  * ```
    ls vaultdir
    ```
* To unmount the mountedvault folder:
  * Option 1
    * ```
      fusermount -u mountdir
      ```
  * Option 2
    * ```
      rmdir mountdir
      ```
***

### Encrypt files with Veracrypt

To encrypt files, you can use [Veracrypt](https://www.veracrypt.fr/en/Home.html). Let's see how to download and install Veracrypt.

* Veracrypt GUI
  * Download the package
    * ```
      wget https://launchpad.net/veracrypt/trunk/1.25.9/+download/veracrypt-1.25.9-Ubuntu-22.04-amd64.deb
      ```
  * Install the package
    * ```
      dpkg -i ./veracrypt-1.25.9-Ubuntu-22.04-amd64.deb
      ```
* Veracrypt console only
  * Download the package
    * ```
      wget https://launchpad.net/veracrypt/trunk/1.25.9/+download/veracrypt-console-1.25.9-Ubuntu-22.04-amd64.deb
      ```
  * Install the package
    * ```
      dpkg -i ./veracrypt-console-1.25.9-Ubuntu-22.04-amd64.deb
      ```

You can visit [Veracrypt download page](https://www.veracrypt.fr/en/Downloads.html) to get the newest releases.

* To run Veracrypt
  * ```
    veracrypt
    ```
* Veracrypt documentation is very complete. To begin using the application, visit the [Beginner's Tutorial](https://www.veracrypt.fr/en/Beginner%27s%20Tutorial.html).

***

### Install Brew

Follow those steps to install [Brew](https://brew.sh/)

* Installation command from Brew:
  * ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    ```
* Add the path to the **.profile** directory. Replace <user_name> by your username.
  * ```
    echo 'eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"' >> /home/<user_name>/.profile
    ```
* Evaluation the following:
  * ```
    eval "$(/home/linuxbrew/.linuxbrew/bin/brew shellenv)"
    ```
* Verify the installation
  * ``` 
    brew doctor
    ```

***

### Brew basic commands

* To update brew in general:
  * ``` 
    brew update
    ```
* To update a specific package:
  * ``` 
    brew update <package_name>
    ```
* To install a package:
  * ``` 
    brew install <package_name>
    ```
* To uninstall a package:
  * ``` 
    brew uninstall <package_name>
    ```
* To search a package:
  * ``` 
    brew search <package_name>
    ```
* [Uninstall Brew](https://github.com/homebrew/install#uninstall-homebrew)
  * ```
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/uninstall.sh)"
    ```

***

### Yarn basic commands

* Add a package
  * ```
    yarn add
    ```
* Initialize the development of a package
  * ```
    yarn init
    ```
* Install all the dependencies in the **package.json** file
  * ```
    yarn install
    ```
* Publish a package to a package manager
  * ```
    yarn publish
    ```
* Remove unused package from the current package
  * ```
    yarn remove
    ```
* Clean the cache
  * ```
    yarn cache clean
    ```

***

### Replace a string by another string in a text file

* Replace one string by another (e.g. **old_string**, **new_string**)
  * ```
    sed -i 's/old_string/new_string/g' <file_path>/<file_name>
    ```
* Use environment variables (double quotes)
  * ```
    sed -i "s/old_string/$env_variable/g" <file_path>/<file_name>
    ```

***

### Replace extensions of files in a folder

Replace **ext1** and **ext2** by the extensions in question.

```
find ./ -depth -name "*.ext1" -exec sh -c 'mv "$1" "${1%.ext1}.ext2"' _ {} \;
```

***

### Remove extension of files in a folder

Replace **ext** with the extension in question.

```bash
for file in *.ext; do
    mv -- "$file" "${file%%.ext}"
done
```

***

### See the current date and time on Linux

```
date
```

***

### Special variables in Bash Shell

| Special Variables | Descriptions                                    |
| ----------------  | ----------------------------------------------- |
| $0                | Name of the bash script                         |
| $1, $2...$n       | Bash script arguments                           |
| $$                | Process id of the current shell                 |
| $*                | String containing every command-line argument   |
| $#                | Total number of arguments passed to the script  |
| $@                | Value of all the arguments passed to the script |
| $?                | Exit status of the last executed command        |
| $!                | Process id of the last executed command         |
| $-                | Print current set of option in current shell    |

***

### Gather DNS information of a website

You can use [Dig](https://man.archlinux.org/man/dig.1) to gather DNS information of a website

* Template
  * ```
    dig <website.tld>
    ```
* Example
  * ```
    dig threefold.io
    ```

You can also use online tools such as [DNS Checker](https://dnschecker.org/).

***

## Network-related Commands

### See the network connections and ports

ifconfig

***

### See identity and info of IP address

* See abuses related to an IP address:
  * ```
    https://www.abuseipdb.com/check/<IP_Address>
    ```
* See general information of an IP address: 
  * ```
    https://www.whois.com/whois/<IP_Address>
    ```

***

### ip basic commands

* Manage and display the state of all network 
  * ```
    ip link
    ```
* Display IP Addresses and property information (abbreviation of address)
  * ```
    ip addr
    ```
* Display and alter the routing table
  * ```
    ip route
    ```
* Manage and display multicast IP addresses
  * ```
    ip maddr
    ```
* Show neighbour object
  * ```
    ip neigh
    ```
* Display a list of commands and arguments for
each subcommand
  * ```
    ip help
    ```
* Add an address
  * Template
    * ```
      ip addr add
      ```
  * Example: set IP address to device **enp0**
    * ```
      ip addr add 192.168.3.4/24 dev enp0
      ```
* Delete an address
  * Template
    * ```
      ip addr del
      ```
  * Example: set IP address to device **enp0**
    * ```
      ip addr del 192.168.3.4/24 dev enp0
      ```
* Alter the status of an interface
  * Template
    * ```
      ip link set
      ```
  * Example 1: Bring interface online (here device **em2**)
    * ```
      ip link set em2 up
      ```
  * Example 2: Bring interface offline (here device **em2**)
    * ```
      ip link set em2 down
      ```
* Add a multicast address
  * Template
    * ```
      ip maddr add
      ```
  * Example : set IP address to device **em2**
    * ```
      ip maddr add 33:32:00:00:00:01 dev em2
      ```
* Delete a multicast address
  * Template
    * ```
      ip maddr del
      ```
  * Example: set IP address to device **em2**
    * ```
      ip maddr del 33:32:00:00:00:01 dev em2
      ```
* Add a routing table entry
  * Template
    * ```
      ip route add
      ```
  * Example 1: Add a default route (for all addresses) via a local gateway
    * ```
      ip route add default via 192.168.1.1 dev em1
      ```
  * Example 2: Add a route to 192.168.3.0/24 via the gateway at 192.168.3.2
    * ```
      ip route add 192.168.3.0/24 via 192.168.3.2
      ```
  * Example 3: Add a route to 192.168.1.0/24 that can be reached on
device em1
    * ```
      ip route add 192.168.1.0/24 dev em1
      ```
* Delete a routing table entry
  * Template
    * ```
      ip route delete
      ```
  * Example: Delete the route for 192.168.1.0/24 via the gateway at
192.168.1.1
    * ```
      ip route delete 192.168.1.0/24 via 192.168.1.1
      ```
* Replace, or add, a route
  * Template
    * ```
      ip route replace
      ```
  * Example: Replace the defined route for 192.168.1.0/24 to use
device em1
    * ```
      ip route replace 192.168.1.0/24 dev em1
      ```
* Display the route an address will take
  * Template
    * ```
      ip route get
      ```
  * Example: Display the route taken for IP 192.168.18.25
    * ```
      ip route replace 192.168.18.25/24 dev enp0
      ```



References: https://www.commandlinux.com/man-page/man8/ip.8.html

***

### Display socket statistics

* Show all sockets
  * ```
    ss -a
    ```
* Show detailed socket information
  * ```
    ss -e
    ```
* Show timer information
  * ```
    ss -o
    ```
* Do not resolve address
  * ```
    ss -n
    ```
* Show process using the socket
  * ```
    ss -p
    ```

Note: You can combine parameters, e.g. **ss -aeo**.

References: https://www.commandlinux.com/man-page/man8/ss.8.html

***

### Query or control network driver and hardware settings

* Display ring buffer for a device (e.g. **eth0**)
  * ```
    ethtool -g eth0
    ```
* Display driver information for a device (e.g. **eth0**)
  * ```
    ethtool -i eth0
    ```
* Identify eth0 by sight, e.g. by causing LEDs to blink on the network port
  * ```
    ethtool -p eth0
    ```
* Display network and driver statistics for a device (e.g. **eth0**)
  * ```
    ethtool -S eth0
    ```

References: https://man.archlinux.org/man/ethtool.8.en

***

### See if ethernet port is active

Replace <ethernet_device> with the proper device:

```
cat /sys/class/net/<ethernet_device>/carrier
```

***

### Add IP address to hardware port (ethernet)

* Find ethernet port ID on both computers
  * ```
    ip a
    ```
* Add IP address (DHCO or static)
  * Computer 1
    * ```
      ip addr add <Private_IP_Address_1>/24 dev <ethernet_interface_1>
      ```
  * Computer 2
    * ```
      ip addr add <Private_IP_Address_2>/24 dev <ethernet_interface_2>
      ```
* Ping the address to confirm connection
  * ```
    ping -c 5 <Private_IP_Address>
    ```

To set and view the address for either DHCP or static, go to **Networks** then **Details**. 

***

### Private IP address range

The private IP range is the following:

* 10.0.0.0–10.255.255.255
* 172.16.0.0–172.31.255.255
* 192.168.0.0–192.168.255.255

***

### Set IP Address manually

You can use the following template when you set an IP address manually:

* Address
  * <Private_IP_Address>
* Netmask
  * 255.255.255.0
* Gateway
  * optional

***

## Basic Scripts

### Run a script with arguments

You can use the following template to add arguments when running a script:

* Option 1
  * ```
    ./example_script.sh arg1 arg2
    ```
* Option 2
  * ```
    sh example_script.sh "arg1" "arg2"
    ```

### Print all arguments

* Write a script
  * File: `example_script.sh`
  * ```bash
    #!/bin/sh
    echo $@
    ```
* Give permissions
  * ```bash
    chmod +x ./example_script.sh
    ```
* Run the script with arguments
  * ```bash
    sh example_script.sh arg1 arg2
    ```
***

### Iterate over arguments

* Write the script
  * ```bash
      # iterate_script.sh
      #!/bin/bash 
      for i; do 
        echo $i 
      done
    ```
* Give permissions
  * ```
    chmod +x ./iterate_script.sh
    ```
* Run the script with arguments
  * ```
    sh iterate_script.sh arg1 arg2
    ```

* The following script is equivalent
  * ```bash
      # iterate_script.sh
      #/bin/bash 
      for i in $*; do 
        echo $i 
      done
    ```

***

### Count lines in files given as arguments

* Write the script
  * ```bash
    # count_lines.sh
    #!/bin/bash
     for i in $*; do
            nlines=$(wc -l < $i)    
            echo "There are $nlines lines in $i"
    done
    ```
* Give permissions
  * ```
    chmod +x ./count_lines.sh
    ```
* Run the script with arguments (files). Here we use the script itself as an example.
  * ```
    sh count_lines.sh count_lines.sh
    ```

***

### Find path of a file

* Write the script
  * ```bash
    # find.sh
    #!/bin/bash

    find / -iname $1 2> /dev/null
    ```
* Run the script
  * ```
    sh find.sh <filename>
    ```

***

### Print how many arguments are passed in a script

* Write the script
  * ```bash
    # print_qty_args.sh
    #!/bin/bash
    echo This script was passed $# arguments
    ```
* Run the script
  * ```
    sh print_qty_args.sh <filename>
    ```
***

## MAC

### Enable remote login on MAC

* Option 1:
  * Use the following command line:
    * ```
      systemsetup -setremotelogin on
      ```
* Option 2
  * Use **System Preferences**
  * Go to **System Preferences** -> **Sharing** -> **Enable Remote Login**.

***

### Find Other storage on MAC

* Open **Finder** \> **Go** \> **Go to Folder**
* Paste this path
  * ```
    ~/Library/Caches
    ```

*** 

### Sort files by size and extension on MAC

* From your desktop, press **Command-F**.
* Click **This Mac**.
* Click the first dropdown menu field and select **Other**.
* From the **Search Attributes** window
  * tick **File Size** and **File Extension**.

***

## Windows

### Find the product key

Write the following in **Command Prompt** (run as administrator):

```
wmic path SoftwareLicensingService get OA3xOriginalProductKey
```

### Find Windows license type

Write the following in **Command Prompt**:

```
slmgr /dli
```

***

## References

* GNU Bash Manual - https://www.gnu.org/software/bash/manual/bash.html