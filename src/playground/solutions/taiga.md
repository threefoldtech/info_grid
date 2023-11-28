# Taiga

[Taiga](https://www.taiga.io/) is the project management tool for multi-functional agile teams. It has a rich feature set and at the same time it is very simple to start with through its intuitive user interface.


- Make sure you have a [wallet](./wallet_connector.md)
- Click on the **Taiga** tab

__Process__ :

### **Base** tab

![ ](../img/taiga1.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. Ex. ***tg98taigar*.gent02.dev.grid.tf**

- Enter administrator information including **Username**, **Email** and **Password**. This admin user will have full permission on the deployed instance.
- Select a capacity package:
    - **Minimum**: {cpu: 2, memory: 1024 * 2, diskSize: 100 }
    - **Standard**: {cpu: 2, memory: 1024 * 4, diskSize: 150 }
    - **Recommended**: {cpu: 4, memory: 1024 * 4, diskSize: 250 }
    - Or choose a **Custom** plan

- `Dedicated` flag to retrieve only dedeicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Country`
   - `Farm Name`
- Choose the node to deploy the Tiaga instance on
- `Custom Domain` flag lets the user to use a custom domain
- Choose a gateway node to deploy your Funkwhale instance on.



There's also an optional **Mail Server** tab if you'd like to have your Taiga instance configured with an SMTP server.

![ ](../img/taiga4.png)

After that is done you can see a list of all of your deployed instances

![ ](../img/taiga5.png)

Click on ***Visit*** to go to the homepage of your Funkwhale instance!

![ ](../img/taiga6.png)
