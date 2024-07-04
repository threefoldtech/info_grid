<h1> Gitea </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)

***

## Introduction

[Gitea](https://about.gitea.com/) is a forge software package for hosting software development version control using Git as well as other collaborative features like bug tracking, code review, continuous integration, kanban boards, tickets, and wikis.

## Prerequisites

- Make sure you have a [wallet](../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Gitea**

## Deployment

- Enter a name for your deployment or keep the default name
- Select a capacity package:
    - **Small**: {cpu: 1, memory: 2, diskSize: 25 }
    - **Medium**: {cpu: 2, memory: 4, diskSize: 50 }
    - **Large**: {cpu: 4, memory: 16, diskSize: 100 }
    - Or choose a **Custom** plan
- Choose the network
   - `Public IPv4` flag gives the virtual machine a Public IPv4
   - `Public IPv6` flag gives the virtual machine a Public IPv6
   - `Planetary Network` flag gives the virtual machine an Yggdrasil address
   - `Mycelium` flag gives the virtual machine a Mycelium address

- `Dedicated` flag to retrieve only dedicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the node 
  - Automated
    - Choose the location of the node
       - `Region`
       - `Country`
       - `Farm Name`

    - Click on `Load Nodes`
    - Click on the node you want to deploy on
  - Manual selection
    - Select a specific node ID
- Click `Deploy`

By default, the admin email is the email you set in the Dashboard when connecting your wallet. To update it, open the `Mail Server` tab.

After deployment, you can see a list of all of your deployed instances.