---
title: "Subsquid"
sidebar_position: 40
---



## Introduction

[Subsquid](https://www.subsquid.io/) indexer is a piece of software that reads all the blocks from a Substrate based blockchain, decodes and stores them for processing in a later stage.

## Prerequisites

- Make sure you have a [wallet](../../wallet_connector)
- From the sidebar click on **Applications**
- Click on **Subsquid**

## Deployment

![](./img/solutions_subsquid.png)

- Enter an instance name.

- Enter an endpoint for a supported substrate chain. You can find the list of endpoints of supported cahins [here](https://github.com/polkadot-js/apps/blob/master/packages/apps-config/src/endpoints/production.ts).


- Select a capacity package:
    - **Small**: \{cpu: 1, memory: 2 , diskSize: 50 \}
    - **Medium**: \{cpu: 2, memory: 4, diskSize: 100 \}
    - **Large**: \{cpu: 4, memory: 16, diskSize: 250 \}
    - Or choose a **Custom** plan
- Choose the network
   - `Mycelium` flag gives the virtual machine a Mycelium address
- `Rented By Me` flag to retrieve nodes currently reserved by you
- `Rentable` flag to retrieve nodes that can be reserved as [dedicated nodes](../node_finder#dedicated-nodes)
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Region`
   - `Country`
   - `Farm Name`
- Choose the node to deploy on
> Or you can select a specific node with manual selection.
- `Custom Domain` flag lets the user to use a custom domain
- Choose a gateway node to deploy your Subsquid instance on.


After that is done you can see a list of all of your deployed instances

![](./img/subsquid_list.png)

Click on ***Visit*** to go to the homepage of your Subsquid indexer instance!

![](./img/subsquid_graphql.png)
