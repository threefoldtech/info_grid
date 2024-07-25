<h1> Dashboard Suite </h1>

<h2>Table of Contents </h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deployment](#deployment)
- [Dashboard Suite Links](#dashboard-suite-links)
- [Temporary Status Webpage](#temporary-status-webpage)

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
- `Network`
  - Select which network the Dashboard Suite will deploy
- `Seed Phrase`
  - Enter a valid seed phrase of an account on the chosen network with at least 10 TFT in the wallet
- Select the large capacity package:
    - **Large**: {cpu: 8, memory: 32, diskSize: 1000 }
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

## Dashboard Suite Links

Once the Dashboard Suite is deployed you can access the usual links:

```
dashboard.example.com
metrics.example.com
tfchain.example.com
graphql.example.com
relay.example.com
gridproxy.example.com
activation.example.com
stats.example.com
```

## Temporary Status Webpage

For long deployment, we set a basic webpage showing the deployment status. This is accessible at your domain during deployment. After deployment is done, you can access the links above and the status webpage will be removed.