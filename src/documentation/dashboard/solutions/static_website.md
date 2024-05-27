<h1> Static Website </h1>

<h2>Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)

---

## Introduction

Static Website is an application where a user provides a GitHub repository URL for the files to be automatically served online using Caddy.

## Prerequisites

- Make sure you have a [wallet](../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Static Website**

## Deployment

![ ](./img/staticwebsite.png)

- Enter an instance name

- Enter HTTPS URL for a Git repository that needs to be cloned

- Enter Git Branch if available

- Enter the html directory that need to be served if available

- Select a capacity package:

  - **Small**: {cpu: 1, memory: 2 , diskSize: 50 }
  - **Medium**: {cpu: 2, memory: 4, diskSize: 100 }
  - **Large**: {cpu: 4, memory: 16, diskSize: 250 }
  - Or choose a **Custom** plan

- `Dedicated` flag to retrieve only dedicated nodes
- `Certified` flag to retrieve only certified nodes
- Choose the location of the node
  - `Region`
  - `Country`
  - `Farm Name`
- Choose the node to deploy on
  - Note: You can select a specific node with manual selection
- `Custom Domain` flag allows the user to use a custom domain
- Choose a gateway node to deploy your static website

Once this is done, you can see a list of all of your deployed instances:

![ ](./img/staticwebsite_list.png)

Click on the button **Visit** under **Actions** to go to your static website!
