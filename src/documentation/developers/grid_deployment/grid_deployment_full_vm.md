<h1> Grid Deployment on a Full VM </h1>
<h2>Table of Contents</h2>


- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deploy All 3 Network Instances](#deploy-all-3-network-instances)
- [DNS Settings](#dns-settings)
  - [DNS Verification](#dns-verification)
- [Prepare the VM](#prepare-the-vm)
- [Set the Firewall](#set-the-firewall)
- [Launch the Script](#launch-the-script)
- [Access the Grid Services](#access-the-grid-services)
- [Manual Commands](#manual-commands)
- [Update the Deployment](#update-the-deployment)

***

## Introduction

We present the steps to deploy an instance of the TFGrid on a full VM.

For this guide, we will be deploying a mainnet instance. While the steps are similar for testnet and devnet, you will have to adjust your deployment depending on which network you use. Details are provided when needed.

We also provide information to deploy the 3 different network instances.

## Prerequisites

For this guide, you will need to deploy a full VM on the ThreeFold Grid with at least the following minimum specs:

- IPv4
- IPv6
- 32GB of RAM
- 1000 GB of SSD
- 8 vcores

After deploying the full VM, take note of the IPv4 and IPv6 addresses to properly set the DNS records and then SSH into the VM.

It is recommended to deploy on a machine with modern hardware and NVME storage disk.

## Deploy All 3 Network Instances

To deploy the 3 network instances, mainnet, testnet and mainnet, you need to follow the same process for each network on a separate machine or at least on a different VM. 

This means that you can either deploy each network instance on 3 different machines, or you can also deploy 3 different VMs on the same machine, e.g. a dedicated node. Then, each VM will run a different network instance. In this case, you will certainly need a machine with NVME storage disk and modern hardware.

## DNS Settings

You need to set an A record for the IPv4 address and an AAAA record for the IPv6 address with a wildcard subdomain.

The following table explicitly shows how to set the A and AAAA records for your domain for all 3 networks. Note that both `testnet` and `devnet` have a subdomain. The last two lines are for mainnet since no subdomain is needed in this case.

| Type | Host | Value          |
| ---- | ---- | -------------- |
| A    | \*.dev   | <devnet_ipv4_address> |
| AAAA | \*.dev  | <devnet_ipv6_address> |
| A    | \*.test   | <testnet_ipv4_address> |
| AAAA | \*.test  | <testnet_ipv6_address> |
| A    | \*  | <mainnet_ipv4_address> |
| AAAA | \*  | <mainnet_ipv6_address> |

As stated above, each network instance must be on its own VM or machine to work properly. Make sure to adjust the DNS records accordingly.

### DNS Verification

You can use tools such as [DNSChecker](https://dnschecker.org/) or [dig](https://linux.die.net/man/1/dig) on a terminal to check if the DNS propagadation is complete.

## Prepare the VM

We show the steps to prepare the VM to run the network instance.

If you are deploying on testnet or devnet, simply replace `mainnet` by the proper network in the following lines.

- Set the prerequisites
  ```
  apt update && apt install -y git nano ufw
  ```
- Download the ThreeFold `grid_deployment` repository
    ```
    git clone https://github.com/threefoldtech/grid_deployment
    cd grid_deployment/docker-compose/mainnet
    ```
- Generate a TFChain node key with `subkey`
  - Note: If you deploy the 3 network instances, you can use the same node key for all 3 networks. But it is recommended to use 3 different keys to facilitate management.
    ```
    echo .nodekey_mainnet >> .gitignore
    ../../apps/subkey generate-node-key > .nodekey_mainnet
    cat .nodekey_mainnet
    ```
- Create and the set environment variables file
    ```
    cp .secrets.env-example .secrets.env
    ```
- Adjust the environment file
    ```
    nano .secrets.env
    ```
- To adjust the `.secrets.env` file, take into account the following:
  - **DOMAIN**="example.com"
    - Write your own domain
  - **TFCHAIN_NODE_KEY**="abc123"
    - Write the output of the command `cat .nodekey_mainnet`
  - **ACTIVATION_SERVICE_MNEMONIC**="word1 word2 ... word24"
    - Write the seed phrase of an account on mainnet with at least 10 TFT in the wallet
  - **GRID_PROXY_MNEMONIC**="word1 word2 ... word24"
    - Write the seed phrase of an account on mainnet with at least 10 TFT in the wallet and a registered twin ID\*

> \*Note: If you've created an account using the ThreeFold Dashboard on a given network, the twin ID is automatically registered for this network.

## Set the Firewall

You can use UFW to set the firewall:

```
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 30333/tcp
ufw allow 22/tcp
ufw enable
ufw status
```

## Launch the Script

Once you've prepared the VM, you can simply run the script to install the grid stack and deploy it online.

```
sh install_grid_bknd.sh
```

This will take some time since you are downloading the whole mainnet grid snapshots.

## Access the Grid Services

Once you've deployed the grid stack online, you can access the different grid services by usual the usual subdomains:

```
dashboard.example.com
metrics.example.com
tfchain.example.com
graphql.example.com
relay.example.com
gridproxy.example.com
activation.example.com
stats.example.com
```

In the case of testnet and devnet, links will also have the given subdomain, such as `dashboard.test.example.com` for a `testnet` instance.

## Manual Commands

Once you've run the install script, you can deploy manually the grid stack with the following command:

```
docker compose --env-file .secrets.env --env-file .env up -d
```

You can also check if the environment variables are properly set:

```
docker compose --env-file .secrets.env --env-file .env config
```

If you want to see the output during deployment, remove `-d` in the command above as follows:

```
docker compose --env-file .secrets.env --env-file .env up
```

This can be helpful to troubleshoot errors.

## Update the Deployment

Go into the folder of the proper network, e.g. mainnet, and run the following commands:

```
git pull -r
docker compose --env-file .secrets.env --env-file .env up -d
```