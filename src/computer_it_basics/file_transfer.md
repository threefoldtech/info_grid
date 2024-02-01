<h1>File Transfer</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [SCP](#scp)
  - [File transfer with IPv4](#file-transfer-with-ipv4)
  - [File transfer with IPv6](#file-transfer-with-ipv6)
- [Rsync](#rsync)
  - [File transfer](#file-transfer)
  - [Adjust reorganization of files and folders before running rsync](#adjust-reorganization-of-files-and-folders-before-running-rsync)
  - [Automate backup with rsync](#automate-backup-with-rsync)
  - [Parameters --checksum and --ignore-times with rsync](#parameters---checksum-and---ignore-times-with-rsync)
  - [Trailing slashes with rsync](#trailing-slashes-with-rsync)
- [SFTP](#sftp)
  - [SFTP on the Terminal](#sftp-on-the-terminal)
  - [SFTP Basic Commands](#sftp-basic-commands)
  - [SFTP File Transfer](#sftp-file-transfer)
- [SFTP with FileZilla](#sftp-with-filezilla)
  - [Install FileZilla](#install-filezilla)
  - [Add a Private Key](#add-a-private-key)
  - [FileZilla SFTP Connection](#filezilla-sftp-connection)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

Deploying on the TFGrid with tools such as the Playground and Terraform is easy and it's also possible to quickly transfer files between local machine and VMs deployed on 3Nodes on the TFGrid. In this section, we cover different ways to transfer files between local and remote machines.

## SCP

### File transfer with IPv4

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

### File transfer with IPv6

For IPv6, it is similar to IPv4 but you need to add `-6` after scp and add `\[` before and `\]` after the IPv6 address. 

## Rsync

### File transfer

[rsync](https://rsync.samba.org/) is a utility for efficiently transferring and synchronizing files between a computer and a storage drive and across networked computers by comparing the modification times and sizes of files.

We show here how to transfer files between two computers. Note that at least one of the two computers must be local. This will transfer the content of the source directory into the destination directory.

* From local to remote
  * ```
    rsync -avz --progress --delete /path/to/local/directory/ remote_user@<remote_host_or_ip>:/path/to/remote/directory
    ```
* From remote to local
  * ```
    rsync -avz --progress --delete remote_user@<remote_host_or_ip>:/path/to/remote/directory/ /path/to/local/directory
    ```

Here is short description of the parameters used:

* **-a**: archive mode, preserving the attributes of the files and directories 
* **-v**: verbose mode, displaying the progress of the transfer
* **-z**: compress mode, compressing the data before transferring 
* **--progress** tells rsync to print information showing the progress of the transfer 
* **--delete** tells rsync to delete files that aren't on the sending side

### Adjust reorganization of files and folders before running rsync

[rsync-sidekick](https://github.com/m-manu/rsync-sidekick) propagates changes from source directory to destination directory. You can run rsync-sidekick before running rsync. Make sure that [Go is installed](#install-go).

* Install rsync-sidekick
  * ```
    sudo go install github.com/m-manu/rsync-sidekick@latest
    ```
* Reorganize the files and folders with rsync-sidekick
  * ```
    rsync-sidekick /path/to/local/directory/ username@IP_Address:/path/to/remote/directory
    ```

* Transfer and update files and folders with rsync
  * ```
    sudo rsync -avz --progress --delete --log-file=/path/to/local/directory/rsync_storage.log /path/to/local/directory/ username@IP_Address:/path/to/remote/directory
    ```

### Automate backup with rsync

We show how to automate file transfers between two computers using rsync.

* Create the script file
  * ```
    nano rsync_backup.sh
    ```
* Write the following script with the proper paths. Here the log is saved in the same directory.
  * ```
    # filename: rsync_backup.sh
    #!/bin/bash

    sudo rsync -avz --progress --delete --log-file=/path/to/local/directory/rsync_storage.log /path/to/local/directory/ username@IP_Address:/path/to/remote/directory
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

### Parameters --checksum and --ignore-times with rsync

Depending on your situation, the parameters **--checksum** or **--ignore-times** can be quite useful. Note that adding either parameter will slow the transfer.

* With **--ignore time**, you ignore both the time and size of each file. This means that you transfer all files from source to destination.
  * ```
    rsync --ignore-time source_folder/ destination_folder
    ```
* With **--checksum**, you verify with a checksum that the files from source and destination are the same. This means that you transfer all files that have a different checksum compared source to destination.
  * ```
    rsync --checksum source_folder/ destination_folder
    ```

### Trailing slashes with rsync

rsync does not act the same whether you use or not a slash ("\/") at the end of the source path.

* Copy content of **source_folder** into **destination_folder** to obtain the result: **destination_folder/source_folder_content**
  * ```
    rsync source_folder/ destination_folder
    ```
* Copy **source_folder** into **destination_folder** to obtain the result: **destination_folder/source_folder/source_folder_content**
  * ```
    rsync source_folder destination_folder
    ```



## SFTP

### SFTP on the Terminal

Using SFTP for file transfer on the terminal is very quick since the SSH connection is already enabled by default when deploying workloads on the TFGrid.

If you can use the following command to connect to a VM on the TFGrid:

```
ssh root@VM_IP
```

Then, it means you can use SFTP to access the same VM:

```
sftp root@VM_IP
```

Once in the server via SFTP, you can use the command line to get all the commands with `help` or `?`:

```
help
```

### SFTP Basic Commands

Here are some common commands for SFTP.

| Command                     | Function                            |
| --------------------------- | ----------------------------------- |
| bye                         |  Quit sftp                          |
| cd path                     |   Change remote directory to 'path' |
| help                        |  Display this help text             |
| pwd                         |  Display remote working directory   |
| lpwd                        |  Print local working directory      |
| ls [-1afhlnrSt] [path]      |   Display remote directory listing  |
| mkdir path                  |   Create remote directory           |
| put  [-afpR] local [remote] | Upload file                         |
| get [-afpR] remote [local]                            |   Download file |
| quit                        |  Quit sftp                          |
| rm path                     |  Delete remote file                 |
| rmdir path                  |  Remove remote directory            |
| version                     |  Show SFTP version                  |
| !command                    |  Execute 'command' in local shell   |


### SFTP File Transfer

Using SFTP to transfer a file from the local machine to the remote VM is as simple as the following line:

```
put /local/path/file
```

This will transfer the file in the current user home directory of the remote VM.

To transfer the file in a given directory, use the following:

```
put /local/path/file /remote/path/
```

To transfer a file from the remote VM to the local machine, you can use the command `get`:

```
get /remote/path/file /local/path
```

To transfer (`get` or `put`) all the files within a directory, use the `-r` argument,  as shown in the following example

```
get -r /remote/path/to/directory /local/path
```

## SFTP with FileZilla

[FileZilla](https://filezilla-project.org/) is a free and open-source, cross-platform FTP application, consisting of FileZilla Client and FileZilla Server.

It is possible to use FileZilla Client to transfer files between your local machine and a remote VM on the TFGrid. 

Since SSH is set, the user basically only needs to add the private key in FileZilla and enter the VM credentials to connect using SFTP in FileZilla.

### Install FileZilla

FileZilla is available on Linux, MAC and Windows on the [FileZilla website](https://filezilla-project.org/download.php?type=client). Simply follow the steps to properly download and install FileZilla Client.

### Add a Private Key

To prepare a connection using FileZilla, you need to add the private key of the SSH key pair. 

Simply add the file `id_rsa` in **SFTP**.

- Open FileZilla Client
- Go to **Edit** -> **Settings** -> **Connection** -> **SFTP**
- Then click on **Add key file...** 
  - Search the `id.rsa` file usually located in `~/.ssh/id_rsa`
- Click on **OK**

### FileZilla SFTP Connection

You can set a connection between your local machine and a remote 3Node with FileZilla by using **root** as **Username** and the VM IP address as **Host**.

- Enter the credentials
  - Host
    - `VM_IP_Address`
  - Username
    - `root`
  - Password
    - As set by the user. Can be empty.
  - Port
    - `22`
- Click on **Quickconnect**

You can now transfer files between the local machine and the remote VM with FileZilla.

## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.