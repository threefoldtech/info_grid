<h1> Algorand </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
  - [Algorand Structure](#algorand-structure)
- [Run Default Node](#run-default-node)
- [Run Relay Node](#run-relay-node)
- [Run Participant Node](#run-participant-node)
- [Run Indexer Node](#run-indexer-node)
- [Select Capacity](#select-capacity)

***

## Introduction

[Algorand](https://www.algorand.com/) builds technology that accelerates the convergence between decentralized and traditional finance by enabling the simple creation of next-generation financial products, protocols, and exchange of value.

## Prerequisites

- Make sure you have a [wallet](../wallet_connector.md)
- From the sidebar click on **Applications**
- Click on **Algorand**

### Algorand Structure

- Algorand has two main [types](https://developer.algorand.org/docs/run-a-node/setup/types/#:~:text=The%20Algorand%20network%20is%20comprised,%2C%20and%20non%2Drelay%20nodes.) of nodes (Relay or Participant). You can also run those nodes on 4 different networks. Combining the types you can get:
  - Default:
    - This is a Non-relay and Non-participant
    - It can run on Devnet, Testnet, Betanet and Mainnet.
  - Relay:
    - A relay node can't be participant.
    - It can run only on Testnet and Mainnet
  - Participant:
    - Can run on any of the four networks.
  - Indexer:
    - It is a default node but with Archival Mode enabled which will make you able to query the data of the blockchain.

## Run Default Node

You can select any network you want and for the node type select Default. 

If you have more than one SSH keys set, you can click on `Manage SSH keys` to select which one to use for this deployment.

![defaultdep](./img/solutions_algorand.png)

After the deployment is done, SSH into the node and run `goal node status`.

Here you see your node runs on mainnet.

![defaulttest](./img/algorand_defaulttest.png)

## Run Relay Node

Relay nodes are where other nodes connect. Therefore, a relay node must be able to support a large number of connections and handle the processing load associated with all the data flowing to and from these connections. Thus, relay nodes require significantly more power than non-relay nodes. Relay nodes are always configured in archival mode.

The relay node must be publicaly accessable, so it must have a public ip.
![relaydep](./img/algorand_relaydep.png)

Once the deployment is done, SSH into the node and run `goal node status` to see the status of the node. You can also check if the right port is listening (:4161 for testnet, and :4160 for mainnet).

![relaytest](./img/algorand_relaytest.png)

The next step accourding to the [docs](https://developer.algorand.org/docs/run-a-node/setup/types/#relay-node) is to register your `ip:port` on Algorand Public SRV.

## Run Participant Node

Participation means participation in the Algorand consensus protocol. An account that participates in the Algorand consensus protocol is eligible and available to be selected to propose and vote on new blocks in the Algorand blockchain.

Participation node is responsible for hosting participation keys for one or more online accounts.

- What do you need?
  - Account mnemonics on the network you deploy on (offline) you can check the status for you account on the AlgoExplorer. Search using your account id.

  The account needs to have some microAlgo to sign the participation transaction.
  - [Main net explorer](https://algoexplorer.io/)
  - [Test net explorer](https://testnet.algoexplorer.io/)

- First Round: is the first block you need your participaiton node to validate from. You can choose the last block form the explorer.
  ![partexp](./img/algorand_partexp.png)
- Last Round: is the final block your node can validate. Let's make it 30M

![partdep](./img/algorand_partdep.png)

Once the deployment is done, SSH into the node and run `goal node status` to see the status of the node. You can see it doing catchup and the fast catchup is to make the node synchronize with the latest block faster by only fetching the last 1k blocks. After this is done, it will start to create the participation keys.
![partstatus](./img/algorand_partstatus.png)

Now if you check the explorer, you can see the status of the account turned to `Online`:

![partonl](./img/algorand_partonl.png)

## Run Indexer Node

The primary purpose of this Indexer is to provide a REST API interface of API calls to support searching the Algorand Blockchain. The Indexer REST APIs retrieve the blockchain data from a PostgreSQL compatible database that must be populated. This database is populated using the same indexer instance or a separate instance of the indexer which must connect to the algod process of a running Algorand node to read block data. This node must also be an Archival node to make searching the entire blockchain possible.

![indexernode](./img/algorand_indexernode.png)

Once it's done, you can access the indexer API at port `8980` and here are the [endpoint](https://developer.algorand.org/docs/rest-apis/indexer/) you can access.

## Select Capacity

The default scenario capacity is computed based on the node (network/type) accourding to this [reference](https://howbigisalgorand.com/).
But you can still change this to higher values by selecting the option `Set Custom Capacity`.
  