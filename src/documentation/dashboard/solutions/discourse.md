<h1> Discourse </h1>

## Introduction

[Discourse](https://www.discourse.org/) is the 100% open source discussion platform built for the next decade of the Internet. Use it as a mailing list, discussion forum, long-form chat room, and more!

- Make sure you have a [wallet](../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Discourse**

## Deployment

![ ](./img/solutions_discourse.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. Ex. ***dc98newdisc*.gent02.dev.grid.tf**

- Enter administrator information including **Email**. This admin will have full permission on the deployed instance.
- Select a capacity package:
    - **Small**: {cpu: 1, memory: 2, diskSize: 15 }
    - **Medium**: {cpu: 2, memory: 4, diskSize: 50 }
    - **Large**: {cpu: 4, memory: 16, diskSize: 100 }
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
- Choose a gateway node to deploy your Discourse instance on.

Unlike other solutions, Discourse requires that you have an SMTP server. So make sure you fill the fields in the **Mail Server** tab in order to deploy your instance successfully. The SMTP configuration supports both `Admin Email` and `Username`.

![ ](./img/discourse4.png)

After that is done you can see a list of all of your deployed instances

![ ](./img/discourse5.png)

Click on ***Visit*** to go to the homepage of your Discourse instance! 

![ ](./img/discourse6.png)
