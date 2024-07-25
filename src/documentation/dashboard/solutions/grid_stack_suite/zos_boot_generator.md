<h1> ZOS Boot Generator </h1>

<h2>Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)
- [ZOS Boot Generator Link](#zos-boot-generator-link)

***

## Introduction

The Dashboard Suite allows you to easily deploy a grid stack of either main, test, qa or dev net.

## Prerequisites

- Make sure you have a [wallet](../../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Dashboard Suite**

## Deployment

Here are the information to enter for the deployment:

- `Name`
  - Enter an Application Name
- Select a capacity package:
    - **Small**: {cpu: 2, memory: 4, diskSize: 100 }
    - **Medium**: {cpu: 4, memory: 16, diskSize: 500 }
    - **Large**: {cpu: 8, memory: 32, diskSize: 100 }
    - Or choose a **Custom** plan
- `Dedicated` flag to retrieve only dedicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Region`
   - `Country`
   - `Farm Name`
- Choose the node to deploy on or select a specific node with manual selection.
- Select `Custom Domain` and write your custom domain

If you have more than one SSH keys set, you can click on `Manage SSH keys` to select which one to use for this deployment.

After that is done you can see a list of all of your deployed instances.

## ZOS Boot Generator Link

You can access the generator at the domain set in `Custom Domain`.