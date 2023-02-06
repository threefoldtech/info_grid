# ownCloud

[ownCloud](https://owncloud.com/) develops and provides open-source software for content collaboration, allowing teams to easily share and work on files seamlessly regardless of device or location.


- Make sure you have an activated [profile](._profile_manager.md)
- Click on the **Owncloud** tab

__Process__ :

![ ](./img/owncloud1.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. Ex. ***oc98newcloud*.gent02.dev.grid.tf**

- Enter administrator information including **Username** and **Password**. This admin user will have full permission on the deployed instance.


- Select a capacity package:
    - **Minimum**: { cpu: 2, memory: 1024 * 16, diskSize: 250 }
    - **Standard**: { cpu: 2, memory: 1024 * 16, diskSize: 500 }
    - **Recommended**: { cpu: 4, memory: 1024 * 16, diskSize: 1000 }
    - Or choose a **Custom** plan
- Choose a gateway node to deploy your Owncloud instance on.

- Select a node to deploy your OwnCloud instance on.

    - Either use the **Capacity Filter**. Which simply lets you pick a *Farm* and *Country*, after clicking on *Apply filters and suggest nodes* then it lists available nodes with these preferences and you pick.


    - Or use **Manual** and type a specific node number to deploy on.



There's also an optional **Mail Server** tab if you'd like to have your Owncloud instance configured with an SMTP server.

![ ](./img/owncloud4.png)

After that is done you can see a list of all of your deployed instances

![ ](./img/owncloud5.png)

Click on ***Visit*** to go to the homepage of your Owncloud instance! If you'd like to be able to use TFConnect to login, you need to login using your admin username and password first and allow TFConnect login from settings.

![ ](./img/owncloud6.png)
