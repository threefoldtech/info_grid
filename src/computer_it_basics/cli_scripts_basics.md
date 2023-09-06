
<h1> CLI and Scripts Basics </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Basic Commands](#basic-commands)
  - [Set default terminal](#set-default-terminal)
  - [See the current path](#see-the-current-path)
  - [List hidden files](#list-hidden-files)
  - [Write and exit with Vim](#write-and-exit-with-vim)
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
  - [Transfer a file between local and remote machines (IPv4 and IPv6)](#transfer-a-file-between-local-and-remote-machines-ipv4-and-ipv6)
  - [See the network connections and ports](#see-the-network-connections-and-ports)
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

### Write and exit with Vim

Use the command:

```
:wq
```

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


### Transfer a file between local and remote machines (IPv4 and IPv6)

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

### See the network connections and ports

ifconfig

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