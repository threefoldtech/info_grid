# Presearch

[Presearch](https://www.presearch.io/) is a community-powered, decentralized search engine that provides better results while protecting your privacy and rewarding you when you search. This weblet deploys a Presearch node. Presearch Nodes are used to process user search requests, and node operators earn Presearch PRE tokens for joining and supporting the network.

- Make sure you have a [wallet](./wallet_connector.md) 
- Click on the **Presearch** tab

__Process__

![ ](./img/presearch1.png)

- Enter an instance name.

- You need to sign up on Presearch in order to get your *Presearch Registration Code*. To sign up, go to [Presearch](https://presearch.org/), create your account and then head to your [dashboard](https://nodes.presearch.org/dashboard) to find your registration code.

- Choose the network
   - `Public IPv4` flag gives the virtual machine a Public IPv4
   - `Planetary Network` to connect the Virtual Machine to Planetary network

- `Dedicated` flag to retrieve only dedeicated nodes 
- `Certified` flag to retrieve only certified nodes 
- Choose the location of the node
   - `Country`
   - `Farm Name`
- Choose the node to deploy the Virtual Machine on 

### Now what if you already have a Presearch node deployed somewhere and would like to migrate to Threefold?

We got you! All you need to do is:

1. Login to your old server that has your node via SSH.
2. Run `docker cp presearch-node:/app/node/.keys presearch-node-keys` in order to generate your key-pair.
3. Head to the *Restore* tab in the Presearch weblet and paste your key-pair in the fields below and you'll be good to deploy!

![ ](./img/presearch6.png)

After that is done you can see a list of all of your deployed instances

![ ](./img/presearch4.jpg)

Now head to your [dashboard](https://nodes.presearch.org/dashboard)again and scroll down to **Current Nodes**, you'll see your newly created node up and connected!

![ ](./img/presearch5.png)

You should visit Presearch's [docs](https://docs.presearch.org/) if you want to learn more!
