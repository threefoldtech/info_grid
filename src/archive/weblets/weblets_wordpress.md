# WordPress

[Wordpress](https://wordpress.org/) is the most popular CMS on the market, powering 65.2% of websites whose CMS we know. That translates to 42.4% of all websites – nearly half of the internet. It is a popular option for those who want to build a website or blog.

- Make sure you have an activated [profile](./weblets_profile_manager.md)
- Click on the **Wordpress** tab

**Process** :

![Config](img/wp1.png)

- Enter an instance name.
- Enter admin information.
  - **Username**: will be used as MySQL DB username, and for Wp-admin.
  - **Password**: will be used as MySQL DB password, and for Wp-admin.
  - **Email**: will be used for Wp-admin.
- Select a capacity package:
  - **Small**: { cpu: 1, memory: 2 , diskSize: 15 }
  - **Medium**: { cpu: 2, memory: 4 , diskSize: 50 }
  - **Large**: { cpu: 4, memory: 16 , diskSize: 100 }
  - Or choose a **Custom** plan
- Choose a gateway node to deploy your Wordpress instance on.
- Choose a node to deploy your Wordpress instance on.

  - Either use the **Capacity Filter** which simply lets you pick a *Farm* and *Country*, after clicking on *Apply filters and suggest nodes* then it lists available nodes with these preferences and you pick.

  - Or use **Manual** and type a specific node number to deploy on.

**After Deploying**:

You can see a list of all of your deployed instances

![ ](img/wp2.png)

- you can click on `Show details` for more details about the Wordpress deployment.
    ![ ](img/wp3.png)
    and for more detailed information switch to `JSON` tap.
    ![ ](img/wp4.png)

- Click on ***Visit*** to go to the homepage of your Wordpress instance!
    ![ ](img/wp5.png)
- Click on ***Admin Panel*** to go to `wp-admin` of your WordPress instance!
![ ](img/wp6.png)

  - Enter the ***Username*** and ***Password*** that you provided in `config` section to login into admin panel.
    > Forget the credentials? You can find them with `Show details` button.

    ![ ](img/wp7.png)
