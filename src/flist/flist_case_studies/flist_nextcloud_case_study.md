<h1> FList Case Study: Nextcloud All-in-One </h1>

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
  - [zinit Folder](#zinit-folder)
  - [Putting it All Together](#putting-it-all-together)
- [Docker Publishing Steps](#docker-publishing-steps)
  - [Create Account and Access Token](#create-account-and-access-token)
  - [Build and Push the Docker Image](#build-and-push-the-docker-image)
- [Convert the Docker Image to an FList](#convert-the-docker-image-to-an-flist)
- [Nextcloud AIO on the TF Playground](#nextcloud-aio-on-the-tf-playground)
  - [Deploy the FList on the TF Playground](#deploy-the-flist-on-the-tf-playground)
  - [Set the DNS Record](#set-the-dns-record)
  - [Quick Nextcloud Access](#quick-nextcloud-access)
  - [Access Parameters](#access-parameters)
- [Conclusion](#conclusion)

***

## Introduction

In this case study, we explain how to create a new FList on the ThreeFold Ecosystem. We will show the process of creating a Nextcloud All-in-One Flist and we will deploy a micro VM on the ThreeFold Playground to access our Nextcloud instance. As a reference, the official Nextcloud FList is available [here](https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist.md).

To do all this, we will need to create a Docker Hub account, create a Dockerfile, a docker image and a docker container, then convert the docker image to a Zero-OS FList. After all this, we will be deploying our Nextcloud instance on the ThreeFold Playground.

As a general advice, before creating an FList for a ThreeFold deployment, you should make sure that you are able to deploy your workload properly by using a micro VM or a full VM on the TFGrid. Once you know all the steps to deploy your workload, and after some thorough tests, you can take what you've learned and incorporate all this into an FList.

***

### FList: What is It?

Before we go any further, let us recall what is an FList. In short, an FList is a very effective way to deal with software data and the end result is fast deployment and high reliability.

In a FList, we separate the metadata from the data. The metadata is a description of what files are in that particular image. It's the data providing information about the app/software. Thanks to FList, the 3Node doesn't need to install a complete software program in order to run properly. Only the necessary files are installed. Zero-OS can read the metadata of a container and only download and execute the necessary binaries and applications to run the workload, when it is necessary.

One amazing thing about the FList technology is that it is possible to convert any Docker image into an FList, thanks to the [ThreeFold Docker Hub Converter tool](https://hub.grid.tf/docker-convert). It is very easy to do and we will show you how to proceed in this case study. For a quick guide on converting Docker images into FLists, read [this section](../flist_hub/convert_docker_image.md) of the ThreeFold Manual.

***

### Case Study Objective

The goal of this case study is to give you enough information and tools so that you can build your own FList projects and deploy on the ThreeFold Grid.

We will explore the different files needed to create the FList and explain the overall process. Instead of starting from scratch, we will analyze the Nextcloud FList directory in the [tf-images](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud) ThreeFold Tech repository. As the project is already done, it will be easier to get an overview of the process. Once you know the different components needed to create an FList, it will be easier for your to create your own.

***

### The Overall Process

To give you a bird's view of the whole project, here are the main steps:

* Create the Docker image
* Push the Docker image to the Docker Hub
* Convert the Docker image to a Zero-OS FList
* Deploy a micro VM with the FList on the ThreeFold Playground

***

## Docker Image Creation

As we've said previously, we will explore the different componenets of the existing Nextcloud FList directory. We thus want to check the existing codes and try to understand as much as possible how the different components work together. This is also a very good introduction to the ThreeFold ecosystem.

We will be using the codes available on the [ThreeFold Tech Github page](https://github.com/threefoldtech). In our case, we want to explore the repository [tf-images](https://github.com/threefoldtech/tf-images).

If you go in the subsection [tfgrid3](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3), you can see many different FLists available. In our case, we want to deploy the [Nextcloud All-in-One Flist](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud). 

### Nextcloud FList Directory Tree

The Nextcloud FList directory tree looks like this:

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

We can see that the directory is composed of four main sections. We will now explore each of those sections to get a good look at the whole repository and try to understand how it all works together.

### Dockerfile

We recall that to make a Docker image, you need to create a Dockerfile. As per [Docker's documentation](https://docs.docker.com/engine/reference/builder/), a Dockerfile is "a Dockerfile is a text document that contains all the commands a user could call on the command line to assemble an image". 

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

In the first **RUN** command, we want to update and upgrade the system, but we also want to install openssh and ufw for our Nextcloud uses. We also install curl so we can use it to install quickly Docker.

In the second **RUN** command, we install zinit and we give it execution permission with the command **chmod +x**. In a nutshell, zinit is a process manager (pid 1) that knows how to launch, monitor and sort dependencies. It thus executes targets in the proper order. For more information on zinit, check the [zinit repository](https://github.com/threefoldtech/zinit). Reading the rest of the case study will also help you to understand how zinit works.

The the third **RUN** command, we run the script **install-docker.sh** to properly install Docker on our system.

Then, we proceed to copy to our Docker image the necessary folders **scripts** and **zinit**. Once this is done, we want to give execution permissions to these folders by running the **RUN** command with **chmod +x**.

Finally, we set an entrypoint in our Dockerfile. As per the [Docker documentation](https://docs.docker.com/engine/reference/builder/), an entrypoint "allows you to configure a container that will run as an executable". Since we are using **zinit**, we set the entrypoint **/sbin/zinit**.

### README.md File

The **README.md** file has the main goal of explaining clearly to the user the functioning of the Nextcloud directory and its associated FList.

In this file, we can explain what our code is doing and offer steps to properly configure the whole deployment. For the users that will want to deploy the FList on the ThreeFold Playground, they would need the FLIst URL and the basic steps to deploy a Micro VM on the TFGrid. We will thus add this information in the README.md file. 

We also give the necessary steps to create the Docker image and convert it into an FList starting directly with the Nextcloud directory. this would be useful for users that want to create their own FList, instead of using the [official ThreeFold Nextcloud FList](https://hub.grid.tf/tf-official-apps/threefoldtech-nextcloudaio-latest.flist.md).

To read the complete README.md file, go to [this link](https://github.com/threefoldtech/tf-images/blob/development/tfgrid3/nextcloud/README.md).

### scripts Folder

The other important file we will be looking at is the `start.sh` file. This is the basic script that will be used to properly set the docker image. Thankfully, there is nothing more to change in this file, we can leave it as is. As we will see later, this file will be executed by zinit when the container starts.

File: `start.sh`

```.sh
#!/bin/bash

mkdir -p /var/run/sshd
mkdir -p /root/.ssh
touch /root/.ssh/authorized_keys

chmod 700 /root/.ssh
chmod 600 /root/.ssh/authorized_keys

echo "$SSH_KEY" >> /root/.ssh/authorized_keys
```

### zinit Folder

Next, we want to take a look at the zinit folder. 

But first, what is zinit? In a nutshell, zinit is a process manager (pid 1) that knows how to launch, monitor and sort dependencies. It thus executes targets in the proper order. For more information on zinit, check the [zinit repository](https://github.com/threefoldtech/zinit). 

When we start the Docker container, the files in the folder zinit will be executed. 

If we take a look at the file `ssh-init.yaml`, we find the following:

```.yaml
exec: bash /start.sh
log: stdout
oneshot: true
````

We can see that the first line calls the [bash](https://www.gnu.org/software/bash/) Unix shell and that it will run the file `start.sh` we've seen earlier. 

In this zinit service file, we define a service named `ssh-init.yaml`, where we tell zinit which commands to execute (here `bash /start.sh`), where to log (here in `stdout`) and where `oneshot` is set to `true` (meaning that it should only be executed once).

If we take a look at the file `sshd.yaml`, we find the following:

```.yaml
exec: bash -c "/usr/sbin/sshd -D"
after:
  - ssh-init
```

Here another service `sshd.yaml` runs after the `ssh-init.yaml` process.

### Putting it All Together

We've now went through all the files available in the Nextcloud directory in the tf-images repository of ThreeFold Tech. To build your own image, you would simply need to clone this directory to your local computer and to follow the steps presented at the next section, [Docker Publishing Steps](#docker-publishing-steps). As explained before, those steps are also detailed in the [README.md file](https://github.com/threefoldtech/tf-images/blob/development/tfgrid3/nextcloud/README.md) of the Nextcloud FList directory.

To have a look at the complete directory, you can always refer to the [Nextcloud FList directory](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud) on the ThreeFold tf-images repository.

***

## Docker Publishing Steps

### Create Account and Access Token

To be able to push Docker images to the Docker Hub, you obviously need to create a Docker Hub account! This is very easy and please note that there are so many amazing documentation on Docker online. If you're lost, make the most of your favorite search engine and find a way out of the blue.

Here are the steps to create an account and an access token.

* Go to the [Docker Hub](https://hub.docker.com/)
* Click `Register` and follow the steps given by Docker
* On the top right corner, click on your account name and select `Account Settings`
* On the left menu, click on `Security`
* Click on `New Access Token`
* Choose an Access Token description that you will easily identify then click `Generate`
  * Make sure to set the permissions `Read, Write, Delete`
* Follow the steps given to properly connect your local computer to the Docker Hub
  * Run `docker login -u <account_name>`
  * Set the password

You now have access to the Docker Hub from your local computer. We will then proceed to push the Docker image we've created.

### Build and Push the Docker Image

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

## Convert the Docker Image to an FList

We will now convert the Docker image into a Zero-OS FList. This part is so easy you will almost be wondering why you never heard about FList before!

* Go to the [ThreeFold Hub](https://hub.grid.tf/).
* Sign in with the ThreeFold Connect app.
* Go to the [Docker Hub Converter](https://hub.grid.tf/docker-convert) section.
* Next to `Docker Image Name`, add the docker image repository and name, see the example below:
  * Template:
    * `<docker_username>/docker_image_name:tagname`
  * Example:
    * `tfhubuser/nextcloudaio:latest`
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

## Nextcloud AIO on the TF Playground

We now proceed to deploy a Nextcloud All-in-One instance by using the Nextcloud FList we've just created.

### Deploy the FList on the TF Playground

* Go to the [ThreeFold Playground](https://play.grid.tf)
* Log into your TF wallet
* Go to the [Micro VM](https://play.grid.tf/#/vm) page
* In the section `Config`, 
  * Choose a name for your VM under `Name`.
  * Under `VM Image`, select `Other`.
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
  * Under `CPU (vCores)`, choose at least 2 vCores (minimum).
  * Under `Memory (MB)`, choose at least 4096 MB of RAM (minimum).
  * Make sure that `Public IPv4` is enabled (required).
* In the section `Disks`, click on the `+` button and choose at least 50 GB of storage  under `Size (GB)`.
* Click `Deploy`.

### Set the DNS Record

After deployment, you will have access to the IPv4 address of the VM you deployed on. You will need to add a **DNS A record** (Host: "@", Value: <VM_IP_Address>) to your domain to access Nextcloud. This record type indicates the IP address of a given domain.

You can check if the DNS records are propagated globally with DNS propagation check services such as [DNS Checker](https://dnschecker.org/). You can use this tool to verify that your domain is properly pointing to the IPv4 address of the VM you deployed on.

### Quick Nextcloud Access

Once the DNS record is propagated, you can click on the button **Visit** to access your Nextcloud instance.

For more information, read the next section.

### Access Parameters

You can access the Nextcloud interface either (1) by using the domain pointing to the VM (as the **Visit** button does) with port 8443 or (2) by using the IPv4 address of the VM with port 8080.

* (1) Reach the Nextcloud interface using the domain and port 8443:
  * Template
    * ```
      https://<domain_name>:8443
      ```
    * This is equivalent to using the **Visit** button
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

****

## Conclusion

In this case study, we've seen the overall process of creating a new FList to deploy a Nextcloud instance on a Micro VM on the ThreeFold Playground.

If you have any questions or feedback, please let us know by either writing a post on the [ThreeFold Forum](https://forum.threefold.io/), or by chatting with us on the [TF Grid Tester Community](https://t.me/threefoldtesting) Telegram channel.