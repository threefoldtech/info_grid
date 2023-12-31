# Funkwhale

[Funkwhale](https://funkwhale.audio/) is social platform to enjoy and share music.
Funkwhale is a community-driven project that lets you listen and share music and audio within a decentralized, open network.


- Make sure you have a [wallet](./wallet_connector.md)
- Click on the **Funkwhale** tab

__Process__ :

![ ](./img/new_funk1.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. Ex. ***fw100myfunk*.gent02.dev.grid.tf**

- Enter administrator information including **Username**, **Email** and **Password**. This admin user will have full permission on the deployed instance.

- Select a capacity package:
    - **Small**: {cpu: 1, memory: 2, diskSize: 50 }
    - **Medium**: {cpu: 2, memory: 4, diskSize: 100 }
    - **Large**: {cpu: 4, memory: 16, diskSize: 250 }
    - Or choose a **Custom** plan
- Choose the network
   - `Public IPv4` flag gives the virtual machine a Public IPv4

- `Dedicated` flag to retrieve only dedeicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Country`
   - `Farm Name`
- Choose the node to deploy on 
- `Custom Domain` flag lets the user to use a custom domain
- Choose a gateway node to deploy your Funkwhale instance on.


After that is done you can see a list of all of your deployed instances

![ ](./img/funkwhale2.png)

Click on ***Visit*** to go to the homepage of your Funkwhale instance!

![ ](./img/funkwhale3.png)