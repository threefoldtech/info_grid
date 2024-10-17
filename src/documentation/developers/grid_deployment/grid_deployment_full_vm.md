<h1> Grid Deployment on a Full VM </h1>
<h2>Table of Contents</h2>


- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deploy All 3 Network Instances](#deploy-all-3-network-instances)
- [DNS Settings](#dns-settings)
  - [DNS Verification](#dns-verification)
- [Files for Each Network](#files-for-each-network)
- [Prepare the VM](#prepare-the-vm)
- [Set the Firewall](#set-the-firewall)
- [Launch the Script](#launch-the-script)
- [Access the Grid Services](#access-the-grid-services)
- [Manual Commands](#manual-commands)
- [Updates](#updates)
- [Metrics](#metrics)
- [Logs](#logs)

***

## Introduction

We present the steps to deploy a ThreeFold grid stack on a full VM.

For this guide, we will be deploying a mainnet instance. While the steps are similar for testnet and devnet, you will have to adjust your deployment depending on which network you use. Details are provided when needed.

We also provide information to deploy the 3 different network instances.

For more information, read the [official repository](https://github.com/threefoldtech/grid_deployment/tree/development/docker-compose).

## Prerequisites

For this guide, you will need to deploy a full VM on the ThreeFold Grid with at least the following minimum specs:

- Configuration
  - A working Docker environment
  - IP addresses: one static IPv4 and one static IPv6
  - One A and one AAAA record to expose all services on. This can be the root of a domain or a subdomain but both must be wildcard records like *.your.domain ([see table for more info](#dns-settings))
  - `node key` for the TFChain public RPC node, generated with `subkey generate-node-key`
  - Mnemonic for a wallet on TFChain for the activation service
    - **this wallet needs funds** and does not need a Twin ID
  - Mnemonic for a wallet on TFChain for the Grid proxy service
    - **this wallet needs funds AND a registered Twin ID**
- Hardware
  - 32GB of RAM
  - 1000 GB of SSD
  - 8 vcores

It is recommended to deploy on a machine with modern hardware and NVME storage disk.

After deploying the full VM, take note of the IPv4 and IPv6 addresses to properly set the DNS records and then SSH into the VM.

Dev, QA and Testnet can do with a Sata SSD setup. Mainnet requires NVMe based SSDs due to the database size.

**Note**: If a deployment does not have enough disk iops available one can see the processor container restarting regulary alongside grid_proxy errors regarding processor database timeouts.

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

## Files for Each Network

Each folder contains the required deployment files for it's net, work in the folder that has the name of the network you want to deploy on.

What does each file do:
- `.env` - contains environment variables maintaned by Threefold Tech
- `.gitignore` - has a list of files to ignore once the repo has been cloned. This has the purpose to not have uncommited changes to files when working in this repo
- `.secrets.env-examples` - is where you have to add all your unique environment variables, after you copied it to `.secrets.env`
- `Caddyfile-example` - contains a full working Caddy config. It is copied by the `install_grid_bknd.sh` script to `Caddyfile`. If you don't use this script, copy the file yourself
- `docker-compose.yml` - has all the required docker-compose configuration to deploy a working Grid stack
- `install_grid_bknd.sh` - is a script to make deploying from 0 easy
- `re-sync_processor.sh` - is a script to re-sync the Graphql processor with the hand of a online snapshot
- `typesBundle.json` - contains data for the Graphql indexer and is not to be touched
- `open_logs_tmux.sh` - opens all the docker logs in tmux sessions

Note that the stacks environment versions are coming from [this link](https://github.com/threefoldtech/home/tree/master/wiki/products/v3).


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

- Check if all environment variables are correct:
  ```
  docker compose --env-file .secrets.env --env-file .env config
  ```

> \*Note: If you've created an account using the ThreeFold Dashboard on a given network, the twin ID is automatically registered for this network.

## Set the Firewall

A correct firewall config is essential! We use NFTables by default: https://wiki.nftables.org/wiki-nftables/index.php/Main_Page
We want the following ports to be publicly exposed for the stack to function correctly:
- 80/TCP -> redirect to 443
- 443/TCP -> Grid services over HTTPS
- 30333/TCP -> libp2p for TFchain communication
- 22/TCP -> SSH: preferably use a none standard port (other then 22)

Example config for
- `eno1` as internal subnet
- `eno2` as external subnet

```sh
#!/usr/sbin/nft -f

flush ruleset

table inet filter {
  chain input {
    type filter hook input priority filter; policy accept;
    ct state { established, related } accept
    ct state invalid drop
    iifname "lo" accept
    iifname "eno1" accept
    iifname "docker0" accept
    ip protocol icmp accept
    ip6 nexthdr ipv6-icmp accept
    iifname "eno2" jump public
  }

  chain forward {
    type filter hook forward priority filter; policy accept;
  }

  chain output {
    type filter hook output priority filter; policy accept;
  }

  chain public {
    # otherwise expose ports we want to expose
    tcp dport { 80, 443, 30333 } counter packets 0 bytes 0 accept
    # public ssh
    tcp dport 22 counter accept
    # separate counter to monitor default ssh port
    tcp dport 22 counter drop
    counter drop
  }
}

table inet nat {
  chain prerouting {
    type nat hook prerouting priority dstnat; policy accept;
  }

  chain input {
    type nat hook input priority 100; policy accept;
  }

  chain output {
    type nat hook output priority -100; policy accept;
  }

  chain postrouting {
    type nat hook postrouting priority srcnat; policy accept;
    ip saddr 172.16.0.0/12 masquerade
  }
}
```

**Note**: In case you use nftables, disable iptables for docker in `/lib/systemd/system/docker.service` by adding `--iptables=false` at the end of `ExecStart=`


For iptables one can use UFW

```sh
ufw allow 80/tcp
ufw allow 443/tcp
ufw allow 30333/tcp
ufw allow 22/tcp
ufw enable
ufw status
```


## Launch the Script

Once you've prepared the VM, you can simply run the script to install the grid stack and deploy it online.

> **Note:** This script downloads and extracts 3 large files. This process can take quite some time to complete (up to several hours depending on the network), and there may be long periods with no visible progress. Please be patient and allow the script to run uninterrupted. This is especially true concerning mainnet.

```
sh install_grid_bknd.sh
```

You can also install the grid stack manually without snapshots. In this case, you'll need to first install docker. Depending on the available disk iops available, it can take up until a week to sync from block 0. 

```sh
docker compose --env-file .secrets.env --env-file .env up -d
```

If you do not want to use the script, but want to run the commands manually, you can consult the content of the scripts for each network:

- [Mainnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/mainnet/install_grid_bknd.sh)
- [Testnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/testnet/install_grid_bknd.sh)
- [Devnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/devnet/install_grid_bknd.sh)
- [QAnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/qanet/install_grid_bknd.sh)

Note that the script downloads and extract the files in the root directory. You can update the paths manually to another user if necessary but this process has been tested and developed specifically for the root user.


## Access the Grid Services

Once you've deployed the grid stack online, you can access the different grid services by usual the usual subdomains.

The .secrets.env file contains a DOMAIN environment variable which is used in docker compose itself and inside several containers. After you deploy caddy will request several certificates for subdomains of your provided DOMAIN environment variable.
Make sure the above DNS requirements are met, IPv6 is optional but we strongly encourage to configure it by default.

These subdomains will be generated, for which Caddy will request a certificate for *.your.domain. 

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

## Updates

You can easily update the grid stack as described below.

`cd` into the correct network folder. Our example uses mainnet.

**Note**: Only list services at the end of this command of which you know there is an update for, example for the `grid_relay`.

```sh
git pull -r
docker compose --env-file .secrets.env --env-file .env up --no-deps -d grid_relay
```

Example for `grid_relay` and `grid_dashboard`.

```sh
git pull -r
docker compose --env-file .secrets.env --env-file .env up --no-deps -d grid_relay grid_dashboard
```

## Metrics

Quite a bunch of Prometheus based metrics are exposed by default.

- Caddy: https://metrics.your.domain/caddy
- TFchain: https://metrics.your.domain/metrics
- Grid Relay: https://relay.your.domain/metrics
- Graphql Indexer: https://metrics.your.domain/indexer/_status/vars
- Graphql Processor: https://metrics.your.domain/graphql/metrics

Note: some metrics are global metrics from the grid, some are regarding the local stack deployment

Example Prometheus server configuration, replace `your.domain` by your domain configured in .secrets.env:

```sh
# Threefold Grid backend - example Prometheus config
global:
  scrape_interval: 15s
  evaluation_interval: 15s

# Caddy (proxy) - Mainnet
  - job_name: 'caddy-mainnet'
    metrics_path: /caddy
    scheme: https
    tls_config:
       insecure_skip_verify: true
    static_configs:
      - targets:
        - metrics.your.domain:443
        labels:
          backend: 'grid-caddy-mainnet'
          
# TFchain public RPC node - Mainnet
  - job_name: 'substrate_mainnet'
    metrics_path: /metrics
    scrape_interval: 5s
    static_configs:
      - targets:
        - metrics.your.domain
        labels:
          backend: 'grid-substrate-mainnet'

## Relay (RMB) - Mainnet
  - job_name: 'relay-mainnet'
    static_configs:
      - targets: 
        - relay.your.domain
        labels:
          backend: 'grid-relay-mainnet'

## GraphQL Indexer - Mainnet
  - job_name: 'indexer-mainnet'
    metrics_path: /indexer/_status/vars
    static_configs:
      - targets:
        - metrics.your.domain
        labels:
          backend: 'grid-indexer-mainnet'

## GraphQL Processor - Mainnet
  - job_name: 'graphql-mainnet'
    metrics_path: /graphql/metrics
    static_configs:
      - targets:
        - metrics.your.domain
        labels:
          backend: 'grid-graphql-mainnet'
```

## Logs

Each network has a script to consult the logs.

- [Mainnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/mainnet/open_logs_tmux.sh)
- [Testnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/testnet/open_logs_tmux.sh)
- [Devnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/devnet/open_logs_tmux.sh)
- [QAnet](https://github.com/threefoldtech/grid_deployment/blob/development/docker-compose/qanet/open_logs_tmux.sh)

If you want to use manual commands, simply consult the scripts to see the commands used.