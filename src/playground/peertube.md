# Peertube

[Peertube](https://joinpeertube.org/) aspires to be a decentralized and free/libre alternative to video broadcasting services.

- Make sure you have an activated [profile](./wallet_connector.md)
- Click on the **Peertube** tab

__Process__

![ ](./img/new_peer1.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. 
  the applied format `<solution-code><twin-id><solution-name>.<gateway-subdomain>` Ex. ***pt100peerprod*.gent02.dev.grid.tf**
- Enter an email and password which will be used for the admin login.
- Select a capacity package:
    - **Minimum**: { cpu: 1, memory: 1024  * 2, diskSize: 15 }
    - **Standard**: { cpu: 2, memory: 1024 * 2, diskSize: 100 }
    - **Recommended**: { cpu: 4, memory: 1024 * 4, diskSize: 250 }
    - Or choose a **Custom** plan

   - `Public IPv4` flag gives the virtual machine a Public IPv4
   - `Public IPv6` flag gives the virtual machine a Public IPv6
   - `Planetary Network` to connect the Virtual Machine to Planetary network
   - `Wiregaurd Access` to add a wiregaurd acces to the Virtual Machine
- `Dedicated` flag to retrieve only dedeicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Country`
   - `Farm Name`
- Choose the node to deploy on 
- `Custom Domain` flag lets the user to use a custom domain
- Choose a gateway node to deploy your Peertube instance on.

After that is done you can see a list of all of your deployed instances


![ ](./img/weblet_peertube_listing.png)

Click on ***Visit*** to go to the homepage of your Peertube instance!

![ ](./img/weblet_peertube_instance.png)

> Please note it may take sometime to be ready