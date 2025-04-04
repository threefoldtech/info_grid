<h1> Add a Domain to a VM</h1>

## Introduction

We cover the overall process to add a domain to a virtual machine running on the ThreeFold Grid. This process works for both micro and full virtual machines.

## Preparation

- Deploy a virtual machine
- Click on the button **Manage Domains** under **Actions**

![](./img/add_domain_6.png)

- Open the **Add New Domain** tab

![](./img/add_domain_10.png)

## Add New Domain

There are different parameters to fill in to add a new domain.

![](./img/add_domain_12.png)

- **Subdomain**
  - The subdomain is used to reference to the complete domain name. It is randomly generated, but the user can write a specific subdomain name.
    - The subdomain prefix (e.g. **fvm3748domainguide**) is decided as follows:
      - Solution name (e.g. **fvm**)
      - Twin ID (e.g. **3748**)
      - Deployment name (e.g. **domainguide**)
  - The complete subdomain is thus composed of the subdomain prefix mentioned above and the subdomain entered in the **Subdomain** field.
- **Custom Domain** 
  - You can also use a custom domain.
    - In this case, instead of having a gateway subdomain and a gateway name as your domain, the domain will be the custom domain entered in this field.
  - If you select **Custom domain**, make sure to set a DNS A record pointing to the gateway IP address on your domain name registrar.

- **Select domain**
  - Choose a gateway for your domain.

- **Port**
  - Choose the port that exposes your application instance on the virtual machine which the domain will point to.
  - By default, it is set to **80**.

- **TLS Passthrough**
  - Disabling TLS passthrough will let the gateway terminate the traffic.
  - Enabling TLS passthrough will let the backend service terminate the traffic.

- **Supported Interfaces**
  - You can select the network interface. Note that you will only see the network(s) provided when you deployed the VM.
    - `WireGuard`
    - `Public IPv4`
    - `Planetary`
    - `Mycelium`
    - `Public IPv6`


Once you've filled the domain parameters, click on the **Add** button. The message **Successfully deployed gateway** will be presented once the domain is properly added.

![Success Domain](./img/add_new_domain_success.png)

## Domains List

Once your domain is set, you can access the **Domains List** tab to consult its parameters. To visit the domain, simply click on the **Visit** button under **Actions**.

![List Domain For VM](./img/add_domain_9.png)

* **Name**
  * The name is the subdomain (without the prefix)
* **Contract ID**
  * Contract ID of the domain
* **Domain**
  * Without a custom domain (default)
    * The complete domain name (e.g. `fvm3748domainguidextebgpt.gent01.dev.grid.tf`) is composed of the subdomain prefix, the subdomain and the gateway domain.
      - The subdomain prefix (e.g. `fvm3748domainguide`), as mentioned above.
      - The subdomain (e.g. `xtebgpt`), chosen during the domain creation.
      - The gateway domain (e.g. `gent01.dev.grid.tf`), based on the chosen gateway.
  - With a custom domain
    - The domain will be your custom domain (`e.g. threefold.pro`).
* **TLS Passthrough**
  * The TLS passthrough status can be either **Yes** or **No**.
* **Backend**
  * The network IP and the chosen port of the domain.
* **Status**
  * **OK** is displayed when the domain is properly set.
* **Actions**
  * Use the **Visit** button to open the domain URL.

At all time, you can click on **Reload** to reload the Domains List parameters.

## Delete a Domain

To delete a domain, open the **Manage Domains** window, in the tab **Domains lists** select the domain you wish to delete and click **Delete**.

![Select To Delete Domain](./img/add_domain_11.png)

By clicking the **Delete** button, the deletion will start and the domain will be deleted from this virtual machine.