# Discourse

[Discourse](https://www.discourse.org/) is the 100% open source discussion platform built for the next decade of the Internet. Use it as a mailing list, discussion forum, long-form chat room, and more!

- Make sure you have an activated [profile](./weblets_profile_manager.md)
- Click on the **Discourse** tab

__Process__ :

![ ](./img/discourse1.png)

- Enter an Application Name. It's used in generating a unique subdomain on one of the gateways on the network alongside your twin ID. Ex. ***dc98newdisc*.gent02.dev.grid.tf**

- Enter administrator information including **Email**. This admin will have full permission on the deployed instance.

- Select a capacity package:
    - **Minimum**: {cpu: 1, memory: 1024 * 2, diskSize: 10 }
    - **Standard**: {cpu: 2, memory: 1024 * 2, diskSize: 50 }
    - **Recommended**: {cpu: 4, memory: 1024 * 4, diskSize: 100 }
    - Or choose a **Custom** plan
- Choose a gateway node to deploy your Discourse instance on.

- Select a node to deploy your Discourse instance on.

    - Either use the **Capacity Filter**. Which simply lets you pick a *Farm* and *Country*, after clicking on *Apply filters and suggest nodes* then it lists available nodes with these preferences and you pick.


    - Or use **Manual** and type a specific node number to deploy on.


Unlike other solutions, Discourse requires that you have an SMTP server. So make sure you fill the fields in the **Mail Server** tab in order to deploy your instance successfully.

![ ](./img/discourse4.png)

After that is done you can see a list of all of your deployed instances

![ ](./img/discourse5.png)

Click on ***Visit*** to go to the homepage of your Discourse instance! 

![ ](./img/discourse6.png)
