<h1> Grid Deployment on a Full VM </h1>
<h2>Table of Contents</h2>


- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [DNS Settings](#dns-settings)
  - [DNS Verification](#dns-verification)
- [Prepare the VM](#prepare-the-vm)
- [Launch the Script](#launch-the-script)
- [Access the Grid Services](#access-the-grid-services)
- [Manual Commands](#manual-commands)
- [Update the Deployment](#update-the-deployment)

***

## Introduction

We present the steps to deploy a development network (devnet) instance of the TFGrid on a full VM.

## Prerequisites

For this guide, you will need to deploy a full VM on the ThreeFold Grid with at least the following minimum specs:

- IPv4
- IPv6
- 32GB of RAM
- 1000 GB of SSD
- 8 vcores

After deploying the full VM, take note of the IPv4 and IPv6 addresses to properly set the DNS records and then SSH into the VM.

## DNS Settings

You need to set an A record for the IPv4 address and an AAAA record for the IPv6 address with a wildcard subdomain.

The following table explicitly shows how to set the A and AAAA records for your domain.

| Type | Host | Value          |
| ---- | ---- | -------------- |
| A    | \*   | <ipv4_address> |
| AAAA | \*   | <ipv6_address> |


### DNS Verification

You can use tools such as [DNSChecker](https://dnschecker.org/) or [dig](https://linux.die.net/man/1/dig) on a terminal to check if the DNS propagadation is complete.

## Prepare the VM

- Download the ThreeFold Tech `grid_deployment` repository
    ```
    git clone https://github.com/threefoldtech/grid_deployment
    cd grid_deployment/docker-compose/devnet
    ```
- Generate a TFChain node key with `subkey`
    ```
    echo .subkey_devnet >> .gitignore
    ../subkey generate-node-key > .nodekey_devnet
    cat .nodekey_devnet
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
  - **DOMAIN**
    - Write your own domain (e.g. example.com)
  - **TFCHAIN_NODE_KEY**
    - Write the output of the command `cat .nodekey_devnet`
  - **ACTIVATION_SERVICE_MNEMONIC**
    - Write the seed phrase of an account on devnet with at least 10 TFT in the wallet
  - **GRID_PROXY_MNEMONIC**
    - Write the seed phrase of an account on devenet with at least 10 TFT in the wallet and a registered twin ID\*

> \*Note: If you've created an account using the ThreeFold Dashboard on devnet, the twin ID is automatically registered.
## Launch the Script

Once you've prepared the VM, you can simply run the script to install the grid stack and deploy it online.

```
sh install_grid_bknd.sh
```

This will take a few minutes since you are downloading the whole devnet grid snapshots.

## Access the Grid Services

Once you've deployed the grid stack online, you can access the different grid services by usual the usual subdomains:

```
dashboard.your.domain
metrics.your.domain
tfchain.your.domain
graphql.your.domain
relay.your.domain
gridproxy.your.domain
activation.your.domain
stats.your.domain
```

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

Go into the correct folder for the network your deploying for, e.g. devnet, and run the following commands

```
git pull -r
docker compose --env-file .secrets.env --env-file .env up -d
```

If you're interested about hosting your own instance of the grid to strenghten the ThreeFold ecosystem, make sure to read the next section, [Guardians of the Grid](./tfgrid_guardians.md).
