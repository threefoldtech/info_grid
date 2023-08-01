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
  - **Minimum**: { cpu: 1, memory: 2048 , diskSize: 15 }
  - **Standard**: { cpu: 2, memory: 2048 , diskSize: 50 }
  - **Recommended**: { cpu: 4, memory: 4096 , diskSize: 100 }
  - Or choose a **Custom** plan

- Choose the network
   - `Public IPv4` flag gives the virtual machine a Public IPv4

- `Dedicated` flag to retrieve only dedeicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Country`
   - `Farm Name`
- Choose the node to deploy the Wordpress instance on 
- `Custom Domain` flag lets the user to use a custom domain
- Choose a gateway node to deploy your Funkwhale instance on.


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
