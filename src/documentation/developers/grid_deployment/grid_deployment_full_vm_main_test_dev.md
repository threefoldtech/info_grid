<h1> Grid Deployment on a Full VM (Main/Test/Dev)</h1>
<h2>Table of Contents</h2>


- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
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

We present the steps to deploy network instances of the TFGrid on a full VM for mainnet, testnet and devnet all at once.

## Prerequisites

For this guide, you will need to deploy a full VM on the ThreeFold Grid with at least the following minimum specs:

- IPv4
- IPv6
- 32GB of RAM
- 1000 GB of SSD
- 8 vcores

After deploying the full VM, take note of the IPv4 and IPv6 addresses to properly set the DNS records and then SSH into the VM.

## DNS Settings

You need to set an A record for the IPv4 address and an AAAA record for the IPv6 address with a wildcard subdomain for each network. Mainnet does not need any subdomain. For testnet and devnet, we add the `test` and `dev` subdomains.

The following table explicitly shows how to set the A and AAAA records for your domain (mainnet, testnet, devnet)

| Type | Host | Value          |
| ---- | ---- | -------------- |
| A    | \*.dev   | <ipv4_address> |
| AAAA | \*.dev  | <ipv6_address> |
| A    | \*.test   | <ipv4_address> |
| AAAA | \*.test  | <ipv6_address> |
| A    | \*  | <ipv4_address> |
| AAAA | \*  | <ipv6_address> |


### DNS Verification

You can use tools such as [DNSChecker](https://dnschecker.org/) or [dig](https://linux.die.net/man/1/dig) on a terminal to check if the DNS propagadation is complete.

## Prepare the VM

- Download the ThreeFold Tech `grid_deployment` repository
    ```
    git clone https://github.com/threefoldtech/grid_deployment
    cd grid_deployment
    ```
- Generate a TFChain node key with `subkey` for each network.
  - Note: You can use the same node key for all 3 networks. But it's easier to recognize them with different node keys.
    ```
    echo .nodekey_mainnet >> .gitignore
    echo .nodekey_testnet >> .gitignore
    echo .nodekey_devnet >> .gitignore
    cd docker-compose
    ./subkey generate-node-key > ./mainnet/.nodekey_mainnet
    ./subkey generate-node-key > ./testnet/.nodekey_mainnet
    ./subkey generate-node-key > ./devnet/.nodekey_mainnet
    ```
- For each network:
  - Go into the folder (e.g. `cd ./mainnet`)
      ```
      cd ./<network>
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
      - Write your own domain, for testnet and devnet, write `test.example.com` and `dev.example.com`
    - **TFCHAIN_NODE_KEY**="abc123"
      - Write the output of the command `cat ./.nodekey_<network>`
    - **ACTIVATION_SERVICE_MNEMONIC**="word1 word2 ... word24"
      - Write the seed phrase of an account on the proper network (e.g. mainnet) with at least 10 TFT in the wallet
    - **GRID_PROXY_MNEMONIC**="word1 word2 ... word24"
      - Write the seed phrase of an account on the proper network (e.g. mainnet) with at least 10 TFT in the wallet and a registered twin ID\*

> \*Note: If you've created an account using the ThreeFold Dashboard on a given network, the twin ID is automatically registered.

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

Once you've prepared the VM, you can simply run the script to install the grid stack and deploy it online. Run this script for each network within each proper directory.

```
sh install_grid_bknd.sh
```

This will take some time since you are downloading the whole grid snapshots.

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

For testnet and devnet, you will naturally have e.g. `dashboard.test.your.domain` and so forth.

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

This can be helpful to troubleshoot errors for each network. Make sure to run the command in the proper network directory (e.g. `cd ./testnet`).

## Update the Deployment

Go into the folder of the proper network, e.g. mainnet, and run the following commands:

```
git pull -r
docker compose --env-file .secrets.env --env-file .env up -d
```