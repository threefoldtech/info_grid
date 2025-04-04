<h1> Funkwhale </h1>

## Introduction

[Funkwhale](https://funkwhale.audio/) is social platform to enjoy and share music.
Funkwhale is a community-driven project that lets you listen and share music and audio within a decentralized, open network.

## Prerequisites

- Make sure you have a [wallet](../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Funkwhale**

## Deployment

__Process__ :

![ ](./img/solutions_funkwhale.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. Ex. ***fw100myfunk*.gent02.dev.grid.tf**

- Enter administrator information including **Username**, **Email** and **Password**. This admin user will have full permission on the deployed instance.

- Select a capacity package:
    - **Small**: {cpu: 1, memory: 2, diskSize: 50 }
    - **Medium**: {cpu: 2, memory: 4, diskSize: 100 }
    - **Large**: {cpu: 4, memory: 16, diskSize: 250 }
    - Or choose a **Custom** plan
- Choose the network
   - `Public IPv4` flag gives the virtual machine a Public IPv4
   - `Mycelium` flag gives the virtual machine a Mycelium address
- `Rented By Me` flag to retrieve nodes currently reserved by you
- `Rentable` flag to retrieve nodes that can be reserved as [dedicated nodes](../deploy/node_finder.md#dedicated-nodes)
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Region`
   - `Country`
   - `Farm Name`

- Choose the node to deploy on
> Or you can select a specific node with manual selection.
- `Custom Domain` flag lets the user to use a custom domain
- Choose a gateway node to deploy your Funkwhale instance on.


After that is done you can see a list of all of your deployed instances

![ ](./img/funkwhale2.png)

Click on ***Visit*** to go to the homepage of your Funkwhale instance!

![ ](./img/funkwhale3.png)

## Troubleshooting

If you get a `Bad Gateway` while connecting to the website, you might simply need to wait for the deployment to complete.