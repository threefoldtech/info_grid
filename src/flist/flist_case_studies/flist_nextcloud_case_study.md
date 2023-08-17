<h1> FList Case Study: Nextcloud All-in-One </h1>

![nextcloud_logo](./img/nextcloud_logo.jpeg)

<h2> Table of Contents </h2>

- [Introduction](#introduction)
  - [FList: What is It?](#flist-what-is-it)
  - [Case Study Objective](#case-study-objective)
  - [The Overall Process](#the-overall-process)
- [Docker Image Creation](#docker-image-creation)
  - [Nextcloud FList Directory Tree](#nextcloud-flist-directory-tree)
  - [Dockerfile](#dockerfile)
  - [README.md File](#readmemd-file)
  - [scripts Folder](#scripts-folder)
    - [sshd\_init.sh](#sshd_initsh)
    - [ufw\_init.sh](#ufw_initsh)
    - [nextcloud.sh](#nextcloudsh)
  - [zinit Folder](#zinit-folder)
    - [ssh-init.yaml and sshd.yaml](#ssh-inityaml-and-sshdyaml)
    - [ufw-init.yaml and ufw.yaml](#ufw-inityaml-and-ufwyaml)
    - [containerd.yaml and dockerd.yaml](#containerdyaml-and-dockerdyaml)
    - [nextcloud.yaml](#nextcloudyaml)
  - [Putting it All Together](#putting-it-all-together)
- [Docker Publishing Steps](#docker-publishing-steps)
  - [Create Account and Access Token](#create-account-and-access-token)
  - [Build and Push the Docker Image](#build-and-push-the-docker-image)
- [Convert the Docker Image to an FList](#convert-the-docker-image-to-an-flist)
- [Nextcloud AIO on the TF Playground](#nextcloud-aio-on-the-tf-playground)
  - [Deploy the FList on the TF Playground](#deploy-the-flist-on-the-tf-playground)
  - [Set the DNS Record](#set-the-dns-record)
  - [Access Parameters](#access-parameters)
- [Conclusion](#conclusion)

***

# Introduction

In this case study, we explain how to create a new FList on the ThreeFold Ecosystem. We will show the process of creating a Nextcloud All-in-One FList and we will deploy a micro VM on the ThreeFold Playground to access our Nextcloud instance. As a reference, the official Nextcloud FList is available [here](https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist.md).

To achieve all this, we will need to create a Docker Hub account, create a Dockerfile and its associated files, a docker image and a docker container, then convert the docker image to a Zero-OS FList. After all this, we will be deploying our Nextcloud instance on the ThreeFold Playground.

As a general advice, before creating an FList for a ThreeFold deployment, you should make sure that you are able to deploy your workload properly by using a micro VM or a full VM on the TFGrid. Once you know all the steps to deploy your workload, and after some thorough tests, you can take what you've learned and incorporate all this into an FList.

***

## FList: What is It?

Before we go any further, let us recall what is an FList. In short, an FList is a very effective way to deal with software data and the end result is fast deployment and high reliability.

In an FList, we separate the metadata from the data. The metadata is a description of what files are in that particular image. It's thus the data providing information about the app/software. Thanks to FList, the 3Node doesn't need to install a complete software program in order to run properly. Only the necessary files are installed. Zero-OS can read the metadata of a container and only download and execute the necessary binaries and applications to run the workload when necessary.

One amazing thing about the FList technology is that it is possible to convert any Docker image into an FList, thanks to the [ThreeFold Docker Hub Converter tool](https://hub.grid.tf/docker-convert). It is very easy to do and we will show you how to proceed in this case study. For a quick guide on converting Docker images into FLists, read [this section](../flist_hub/convert_docker_image.md) of the ThreeFold Manual.

***

## Case Study Objective

The goal of this case study is to give you enough information and tools so that you can build your own FList projects and deploy on the ThreeFold Grid.

We will explore the different files needed to create the FList and explain the overall process. Instead of starting from scratch, we will analyze the Nextcloud FList directory in the [tf-images](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud) ThreeFold Tech repository. As the project is already done, it will be easier to get an overview of the process. Once you know the different components needed to create an FList, it will be easier for your to create your own.

***

## The Overall Process

To give you a bird's-eye view of the whole project, here are the main steps:

* Create the Docker image
* Push the Docker image to the Docker Hub
* Convert the Docker image to a Zero-OS FList
* Deploy a micro VM with the FList on the ThreeFold Playground

One important thing to have in mind is that, when we create an FList, what we are doing is basically automating the required steps to deploy a given workload on the TFGrid. Usually, these steps would be done linearly by an individual deploying on a micro or a full VM. 

Once we've successfully created an FList, we thus have a very quick way to deploy a specific workload while always obtaining the same result. This is why it is highly recommended to test a given deployment on a full or micro VM before building an FList. 

For example, in the case of building a Nextcloud All-in-One FList, the prerequisite would be to successfully deploy a Nextcloud AIO instance on a full VM by executing each step sequentially. This specific example is documented in the Terraform section [Nextcloud All-in-One Guide](../../terraform/advanced/terraform_nextcloud_aio.md) of the System Administrators book.

***

# Docker Image Creation

As we've said previously, we will explore the different components of the existing Nextcloud FList directory. We thus want to check the existing codes and try to understand as much as possible how the different components work together. This is also a very good introduction to the ThreeFold ecosystem.

We will be using the codes available on the [ThreeFold Tech Github page](https://github.com/threefoldtech). In our case, we want to explore the repository [tf-images](https://github.com/threefoldtech/tf-images).

If you go in the subsection [tfgrid3](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3), you can see many different FLists available. In our case, we want to deploy the [Nextcloud All-in-One Flist](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud). 
***
## Nextcloud FList Directory Tree

The Nextcloud FList directory tree is the following:

```
.
├── Dockerfile
├── README.md
├── scripts
│   ├── nextcloud.sh
│   ├── sshd_init.sh
│   └── ufw_init.sh
└── zinit
    ├── containerd.yaml
    ├── dockerd.yaml
    ├── nextcloud.yaml
    ├── sshd.yaml
    ├── ssh-init.yaml
    ├── ufw-init.yaml
    └── ufw.yaml
```

We can see that the directory is composed of four main sections. We will now explore each of those sections to have a good grasp of the whole repository and to understand how it all works together.

To get a big picture of this directory, we could say that the **README.md** file provides the necessary documentation for the users to understand the Nextcloud FList, how it is built and how it works, the **Dockerfile** provides the necessary requirements for the Docker image to be built, installing things such as [openssh](https://www.openssh.com/) and the [ufw firewall](https://wiki.ubuntu.com/UncomplicatedFirewall) for secure remote connection, while the two folders, **scripts** and **zinit**, could be said to work hand-in-hand. While commands can be executed in the .yaml files contained within the zinit folder, these files also serve as a way to organize the scripts. As we will see later on, zinit coupled with the `.yaml` files provides ordered steps for the `.sh` files to be executed. This ensures that the Nextcloud deployment gets built systematically in the proper order.

***

## Dockerfile

We recall that to make a Docker image, you need to create a Dockerfile. As per the [Docker documentation](https://docs.docker.com/engine/reference/builder/), a Dockerfile is "a text document that contains all the commands a user could call on the command line to assemble an image". 

File: `Dockerfile`

```Dockerfile
FROM ubuntu:22.04

RUN apt update && \
  apt -y install wget openssh-server curl sudo ufw

RUN wget -O /sbin/zinit https://github.com/threefoldtech/zinit/releases/download/v0.2.5/zinit && \
  chmod +x /sbin/zinit

RUN curl -fsSL https://get.docker.com -o /usr/local/bin/install-docker.sh && \
    chmod +x /usr/local/bin/install-docker.sh

RUN sh /usr/local/bin/install-docker.sh

COPY ./scripts/ /scripts/
COPY ./zinit/ /etc/zinit/
RUN chmod +x /sbin/zinit && chmod +x /scripts/*.sh

ENTRYPOINT ["/sbin/zinit", "init"]
```

We can see from the first line that this Dockerfile uses the Linux distribution Ubuntu 22.04. 

With the first **RUN** command, we update and upgrade the system, and we also install openssh and ufw for our Nextcloud uses. We also install curl so we can use it to install quickly Docker.

With the second **RUN** command, we install zinit and we give it execution permission with the command `chmod +x`. In a nutshell, zinit is a process manager (pid 1) that knows how to launch, monitor and sort dependencies. It thus executes targets in the proper order. For more information on zinit, check the [zinit repository](https://github.com/threefoldtech/zinit). Reading the rest of the case study will also help you to understand how zinit works.

With third **RUN** command, we download and give proper permissions to the script `install-docker.sh`. On a terminal, the common line to install Docker would be `curl -fsSL https://get.docker.com | sudo sh`. To understand really what's going here, we can simply go to the link provided in the line [https://get.docker.com](https://get.docker.com) for more information. 

The fourth **RUN** command runs the `install-docker.sh` script to properly install Docker within the image.

Once those commands are run, we proceed to copy to our Docker image the necessary folders `scripts` and `zinit`. Once this is done, we want to give execution permissions to these folders by running the **RUN** command with `chmod +x`.

Finally, we set an entrypoint in our Dockerfile. As per the [Docker documentation](https://docs.docker.com/engine/reference/builder/), an entrypoint "allows you to configure a container that will run as an executable". Since we are using zinit, we set the entrypoint `/sbin/zinit`.

***

## README.md File

The **README.md** file has the main goal of explaining clearly to the user the functioning of the Nextcloud directory and its associated FList.

In this file, we can explain what our code is doing and offer steps to properly configure the whole deployment. For users that want to deploy the FList on the ThreeFold Playground, they would only need the FLIst URL and the basic steps to deploy a Micro VM on the TFGrid. We thus add this information in the README.md file. 

We also give the necessary steps to create the Docker image and convert it into an FList starting directly with the Nextcloud directory. This can be useful for users that want to create their own FList, instead of using the [official ThreeFold Nextcloud FList](https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist.md).

To read the complete README.md file, go to [this link](https://github.com/threefoldtech/tf-images/blob/development/tfgrid3/nextcloud/README.md).
***
## scripts Folder

The scripts folder contains without surprise the scripts necessary to run the Nextcloud instance. In the Nextcloud Flist case, there are three scripts: **sshd_init.sh**, **ufw_init.sh** and **nextcloud.sh**.

Let's take a look at each of them.

### sshd_init.sh

File: `sshd_init.sh`

```bash
#!/bin/bash

echo "ssh is not yet set." >> /usr/local/bin/nextcloud_installation.md

mkdir -p ~/.ssh
mkdir -p /var/run/sshd
chmod 600 ~/.ssh
chmod 600 /etc/ssh/*
echo $SSH_KEY >> ~/.ssh/authorized_keys

echo "ssh is set." >> /usr/local/bin/nextcloud_installation.md
```

The first two symbols (`#!`) on the first line are often called shebang. When the file is used as an executable in a Unix-like system (sometimes referred to UN*X or nix), the loader, the part of the OS that is responsible for loading programs and libraries, will then parse the rest of the file's initial line as an interpreter directive. In our case, the first line `#!/bin/bash` will thus make sure that the file is executed using the [Bash shell](https://www.gnu.org/software/bash/).

The lines `echo "ssh is not yet set." [...]` and `echo "ssh is set." [...]` are optional. They are used as a general test to indicate that the process is done in the proper order. Those lines will be printed into the file `nextcloud_installation.md` when we load the VM. Note that similar test lines are also present in the two other scripts.

The goal of this script is to add the public key within the VM in order for the user to get a secure and remote connection to the VM. The two lines starting with `mkdir` create the necessary folders. The lines starting with `chmod` give the owner the permission to write and read the content within the folders. Finally, the line `echo` will write the public SSH key in a file within the VM. In our case, the SSH key is set in the Playground profile manager and passed as a variable when we deploy a micro VM running the Nextcloud FList.

### ufw_init.sh

File: `ufw_init.sh`

```bash
#!/bin/bash

echo "ufw is not yet set." >> /usr/local/bin/nextcloud_installation.md

set -x

ufw default deny incoming
ufw default allow outgoing
ufw allow ssh
ufw allow http
ufw allow https
ufw allow 8443
ufw allow 3478
ufw limit ssh

echo "ufw is set." >> /usr/local/bin/nextcloud_installation.md
```

The script `ufw_init.sh` goal is to set the correct firewall parameters to make sure that our deployment is secure while also providing the necessary access for the Nextcloud users. 

The line `set -x` enables a mode of the shell where all executed commands are printed to the terminal. As additional information, note that to disable this mode, you would enter the line `set +x` in the terminal.

The first two lines starting with `ufw default` are self-explanatory. We want to restrain incoming traffic while making sure that outgoing traffic has no restraints.

The lines starting with `ufw allow` open the ports necessary for our Nextcloud instance. We note that the port 22 is for SSH, 80 for HTTP, and 443 for HTTPS. This means, for example, that the line `ufw allow 22` is equivalent to the line `ufw allow ssh`. The port 8443 is the default port that [Tomcat](https://tomcat.apache.org/) uses to open the SSL text service. In the case of the Nextcloud instance, it is used to access the Nextcloud interface through HTTPS secure connection. More on this will be said later. Finally, the port 3478 is used for Nextcloud Talk.

We also note that there are two protocols, **tcp** and **udp**. When none of the protocols are specified, it allows both protocols to access the ports. For example, if we only wanted to allow the protocol tcp with port 22 (ssh), we would write `ufw allow ssh/tcp`. To allow both protocols, we write `ufw allow ssh`.

The line `ufw limit ssh` will provide additional security by denying connection from IP addresses that attempt to initiate 6 or more connections within a 30-second period.

### nextcloud.sh

File: `nextcloud.sh`

```bash
#!/bin/bash

echo "Before docker info sleep loop." >> /usr/local/bin/nextcloud_installation.md

export COMPOSE_HTTP_TIMEOUT=800
set -x
while ! docker info > /dev/null 2>&1; do
    sleep 2
done

echo "After docker info sleep loop." >> /usr/local/bin/nextcloud_installation.md

docker run \
--sig-proxy=false \
--name nextcloud-aio-mastercontainer \
--restart always \
--publish 80:80 \
--publish 8080:8080 \
--publish 8443:8443 \
--volume nextcloud_aio_mastercontainer:/mnt/docker-aio-config \
--volume /var/run/docker.sock:/var/run/docker.sock:ro \
nextcloud/all-in-one:latest
```

The last script is where the real action starts. This is where we run the Nextcloud All-in-One docker image.

Before discussing the main part of this script, we note that the `while` loop is used to ensure that the `docker run` command starts only after the Docker daemon has properly started.

The code section starting with `docker run` is taken directly from the [Nextcloud All-in-One repository on Github](https://github.com/nextcloud/all-in-one). The last line indicates that the Docker image being pulled will always be the latest version of Nextcloud All-in-One.

We note here that Nextcloud AIO is published on the port 80, 8080 and 8443. We also note that we set restart to **always**. This is very important as it will make sure that the Nextcloud instance is restarted if the Docker daemon reboots. We take the opportunity to note that, on a Linux system, the Docker daemon restarts automatically after a reboot. Thus, this latter fact combined with the line `--restart always` ensures that the user that the Nextcloud instance will restart after a VM reboot.

Finally, we note that this docker run command is specifically written for a container on Linux and without a web server or reverse proxy, hence the line `--sig-proxy=false`.

For more information on this, we invite the readers to consult the [Nextcloud documentation](https://github.com/nextcloud/all-in-one#how-to-use-this).
***
## zinit Folder

Next, we want to take a look at the zinit folder. 

But first, what is zinit? In a nutshell, zinit is a process manager (pid 1) that knows how to launch, monitor and sort dependencies. It thus executes targets in the proper order. For more information on zinit, check the [zinit repository](https://github.com/threefoldtech/zinit). 

When we start the Docker container, the files in the folder zinit will be executed. Those zinit files will run commands that will either execute direct commands and also execute some of the scripts we've seen in the previous sections.

### ssh-init.yaml and sshd.yaml

We start by taking a look at the **ssh-init.yaml** and **sshd.yaml** files. 

File: `ssh-init.yaml`

```yaml
exec: /scripts/sshd_init.sh
oneshot: true
```

In this zinit service file, we define a service named `ssh-init.yaml`, where we tell zinit to execute the following command: `exec: /scripts/sshd_init.sh`.  This command thus runs the script `sshd_init.sh` we covered in a previous section. 

We also note that `oneshot` is set to `true` and this means that it should only be executed once. This command is often used with zinit files and it comes up frequently in the Nextcloud FList directory.

Now, we take a look at the file `sshd.yaml`:

File: `sshd.yaml`

```yaml
exec: bash -c "/usr/sbin/sshd -D"
after:
  - ssh-init
```

We can see that this file executes a line from the Bash shell. It is important to note that, with zinit and .yaml files, you can easily order the executions of the files by setting lines such as the following: `after: - ssh-init`. In this case, it means that the file `sshd.yaml` will only be executed after the file `ssh-init.yaml` is executed.

### ufw-init.yaml and ufw.yaml

Let's take a look at the files **ufw-init.yaml** and **ufw.yaml**.

File: `ufw-init.yaml`

```yaml
exec: /scripts/ufw_init.sh
oneshot: true
```

The file `ufw-init.yaml` is very similar to the previous file `ssh-unit.yaml`. In this case, this file is ran only once and it runs the script `ufw_unit.sh`. 

File: `ufw.yaml`

```yaml
exec: ufw --force enable
oneshot: true
after:
  - ufw-init
```

We can see that the file `ufw.yaml` will only run once and only after the file `ufw-init.yaml` has been run. This is important since the file `ufw-unit.yaml` executes the script `unit_init.sh`. We recall this script allows different ports in the firewall. Once those ports are defined, we can then run the command `ufw --force enable`. This will start the ufw firewall.

### containerd.yaml and dockerd.yaml

We now take a look at the files **containerd.yaml** and **dockerd.yaml**.

File: `containerd.yaml`

```yaml
exec: /usr/bin/containerd
after:
  - ufw
```

We can see here that this file will only be executed after the file `ufw.yaml`, thus only after the firewall is properly set. This file will run the [containerd daemon](https://containerd.io/) which manages the complete container lifecycle of the host system.

File: `dockerd.yaml`

```yaml
exec: /usr/bin/dockerd
after:
  - containerd
```

The file `dockerd.yaml` runs only after the file `containerd`. This file will run the [dockerd daemon](https://docs.docker.com/engine/reference/commandline/dockerd/) which is the persistent process that manages containers. It is thus logic that we run this file only after containerd is properly set.

### nextcloud.yaml

File: `nextcloud.yaml`

```yaml
exec: /scripts/nextcloud.sh
after:
  - dockerd
```

Finally, the file `nextcloud.yaml` runs after all the other .yaml files have been run, since it starts after dockerd, which in turn starts after containerd, and so on.

This file will execute the `nextcloud.sh` script we saw earlier. We recall that this script starts the Nextcloud All-in-One image. At this point, the deployment is complete.

***

## Putting it All Together

We've now went through all the files available in the Nextcloud FList directory. You should now have a proper understanding of the interplay between the zinit (.yaml) and the scripts (.sh) files as well as the basic steps to build a Dockerfile and to write clear documentation.

To build your own Nextcloud docker image, you would simply need to clone this directory to your local computer and to follow the steps presented in the next section [Docker Publishing Steps](#docker-publishing-steps). As explained before, those steps are also detailed in the [README.md file](https://github.com/threefoldtech/tf-images/blob/development/tfgrid3/nextcloud/README.md) of the Nextcloud FList directory.

To have a look at the complete directory, you can always refer to the [Nextcloud FList directory](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud) on the ThreeFold tf-images repository.

***

# Docker Publishing Steps

In this section, we show the necessary steps to publish the Docker image to the Docker Hub. 

To do so, we need to create an account and an access token. Then we will build the Docker image and push it to the Docker Hub.

***

## Create Account and Access Token

To be able to push Docker images to the Docker Hub, you obviously need to create a Docker Hub account! This is very easy and note that there are many great tutorials online about Docker.

Here are the steps to create an account and an access token:

* Go to the [Docker Hub](https://hub.docker.com/)
* Click `Register` and follow the steps given by Docker
* On the top right corner, click on your account name and select `Account Settings`
* On the left menu, click on `Security`
* Click on `New Access Token`
* Choose an Access Token description that you will easily identify then click `Generate`
  * Make sure to set the permissions `Read, Write, Delete`
* On your local computer, make sure that the Docker daemon is running
* Write the following in the command line to connect to the Docker hub:
  * Run `docker login -u <account_name>`
  * Set the password

You now have access to the Docker Hub from your local computer. We will then proceed to push the Docker image to the Docker Hub.
***
## Build and Push the Docker Image

* Make sure the Docker Daemon is running
* Build the docker container
  * Template:
    * ```
      docker build -t <docker_username>/<docker_repo_name> . 
      ```
  * Example:
    * ```
      docker build -t dockerhubuser/nextcloudaio . 
      ```
* Push the docker container to the [Docker Hub](https://hub.docker.com/)
  * Template:
    * ```
      docker push <your_username>/<docker_repo_name>
      ```
  * Example:
    * ```
      docker push dockerhubuser/nextcloudaio
      ```
* You should now see your docker image on the [Docker Hub](https://hub.docker.com/) when you go into the menu option `My Profile`.
  * Note that you can access this link quickly with the following template:
    * ```
      https://hub.docker.com/u/<account_name>
      ```

***

# Convert the Docker Image to an FList

We will now convert the Docker image into a Zero-OS FList.

* Go to the [ThreeFold Hub](https://hub.grid.tf/).
* Sign in with the ThreeFold Connect app.
* Go to the [Docker Hub Converter](https://hub.grid.tf/docker-convert) section.
* Next to `Docker Image Name`, add the docker image repository and name, see the example below:
  * Template:
    * `<docker_username>/docker_image_name:tagname`
  * Example:
    * `dockerhubuser/nextcloudaio:latest`
* Click `Convert the docker image`.
* Once the conversion is done, the FList is available as a public link on the ThreeFold Hub.
* To get the FList URL, go to the [TF Hub main page](https://hub.grid.tf/), scroll down to your 3Bot ID and click on it.
* Under `Name`, you will see all your available FLists.
* Right-click on the FList you want and select `Copy Clean Link`. This URL will be used when deploying on the ThreeFold Playground. We show below the template and an example of what the FList URL looks like.
  * Template:
    * ```
      https://hub.grid.tf/<3BOT_name.3bot>/<docker_username>-<docker_image_name>-<tagname>.flist
      ```
  * Example:
    * ```
      https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist
      ```

***

# Nextcloud AIO on the TF Playground

We now proceed to deploy a Nextcloud All-in-One instance by using the Nextcloud FList we've just created.

To do so, we will deploy a micro VM with the Nextcloud FList on the TF Playground, then we will set the DNS A Record pointing the domain to the IPv4 address of the VM, and finally we will access Nextcloud All-in-One.

***

## Deploy the FList on the TF Playground

* Go to the [ThreeFold Playground](https://playground.grid.tf)
* Log into your TF wallet
* Go to the [Micro VM](https://playground.grid.tf/#/vm) page
* In the section `Config` 
  * Choose a name for your VM under `Name`
  * Under `VM Image`, select `Other`
    * Enter the Nextcloud FList under `FList`:
      * Template:
        * ```
          https://hub.grid.tf/<3BOT_name.3bot>/<docker_username>-<docker_image_name>-<tagname>.flist
          ```
      * Example:
        * ```
          https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist
          ```
  * Under `Entry Point`, the following should be set by default: `/sbin/zinit init`
  * Under `Root File System (GB)`, choose at least 8 GB.
    * Note: If you want to add extra features such as Nextcloud Talk, set at least 40 GB.
  * Under `CPU (vCores)`, choose at least 2 vCores (minimum).
    * Note: If you want to add extra features such as Nextcloud Talk, set at least 4 vCores.
  * Under `Memory (MB)`, choose at least 4096 MB of RAM (minimum).
    * Note: If you want to add extra features such as Nextcloud Talk, set at least 6144 MB of RAM.
  * Make sure that `Public IPv4` is enabled (required).
* In the section `Disks`, click on the `+` button and choose at least 50 GB of storage  under `Size (GB)`.
* Click `Deploy`.
***
## Set the DNS Record

After deployment, you will have access to the IPv4 address of the VM you deployed on. You will need to add a **DNS A record** (Host: "@", Value: <VM_IP_Address>) to your domain to access Nextcloud. This record type indicates the IP address of a given domain.

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify that your domain is properly pointing to the IPv4 address of the VM you deployed on.
***
## Access Parameters

You can access the Nextcloud interface either (1) by using the domain pointing to the VM with port 8443 or (2) by using the IPv4 address of the VM with port 8080.

* (1) Reach the Nextcloud interface using the domain and port 8443:
  * Template
    * ```
      https://<domain_name>:8443
      ```
  * Example:
    * ```
      https://nextcloudwebsite.com:8443
      ```
* (2) Reach the Nextcloud interface using the IPv4 address and port 8080:
  * Template
    * ```
      https://<VM_IPv4_Address>:8080
      ```
  * Example:
    * ```
      https://104.131.122.247:8080
      ```

Note: When reaching the Nextcloud interface with IPv4 and port 8080, you will be using a self-signed certificate for HTTPS connection. Browsers like Firefox make this access easy. While this self-signed certificate should be secure, it would be considered a best practice to use the domain and port 8443.

***

# Conclusion

In this case study, we've seen the overall process of creating a new FList to deploy a Nextcloud instance on a Micro VM on the ThreeFold Playground.

If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.