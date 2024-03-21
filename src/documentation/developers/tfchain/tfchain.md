<h1> ThreeFold Chain <h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Twins](#twins)
- [Farms](#farms)
- [Nodes](#nodes)
- [Node Contract](#node-contract)
- [Rent Contract](#rent-contract)
- [Name Contract](#name-contract)
- [Contract billing](#contract-billing)
- [Contract locking](#contract-locking)
- [Contract grace period](#contract-grace-period)
- [DAO](#dao)
- [Farming Policies](#farming-policies)
- [Node Connection price](#node-connection-price)
- [Node Certifiers](#node-certifiers)

***

## Introduction

ThreeFold Chain (TFChain) is the base layer for everything that interacts with the grid. Nodes, farms, users are registered on the chain. It plays the central role in achieving decentralised consensus between a user and Node to deploy a certain workload. A contract can be created on the chain that is essentially an agreement between a node and user.

## Twins

A twin is the central Identity object that is used for every entity that lives on the grid. A twin optionally has an IPV6 planetary network address which can be used for communication between twins no matter of the location they are in. A twin is coupled to a private/public keypair on chain. This keypair can hold TFT on TF Chain.

## Farms

A farm must be created before a Node can be booted. Every farms needs to have an unique name and is linked to the Twin that creates the farm. Once a farm is created, a unique ID is generated. This ID can be used to provide to the boot image of a Node.

## Nodes

When a node is booted for the first time, it registers itself on the chain and a unique identity is generated for this Node.

## Node Contract

A node contract is a contract between a user and a Node to deploy a certain workload. The contract is specified as following:

```
{
    "contract_id": auto generated,
    "node_id": unique id of the node,
    "deployment_data": some additional deployment data
    "deployment_hash": hash of the deployment definition signed by the user
    "public_ips": number of public ips to attach to the deployment contract
}
```

We don't save the raw workload definition on the chain but only a hash of the definition. After the contract is created, the user must send the raw deployment to the specified node in the contract. He can find where to send this data by looking up the Node's twin and contacting that twin over the planetary network.

## Rent Contract

A rent contract is also a contract between a user and a Node, but instead of being able to reserve a part of the node's capacity, the full capacity is rented. Once a rent contract is created on a Node by a user, only this user can deploy node contracts on this specific node. A discount of 50% is given if a the user wishes to rent the full capacity of a node by creating a rent contract. All node contracts deployed on a node where a user has a rent contract are free of use expect for the public ip's which can be added on a node contract.

## Name Contract

A name contract is a contract that specifies a unique name to be used on the grid's webgateways. Once a name contract is created, this name can be used as and entrypoint for an application on the grid.

## Contract billing

Every contract is billed every 1 hour on the chain, the amount that is due is deducted from the user's wallet every 24 hours or when the user cancels his contract. The total amount acrued in those 24 hours gets send to following destinations:

- 10% goes to the threefold foundation
- 5% goes to staking pool wallet (to be implemented in a later phase)
- 50% goes to certified sales channel
- 35% TFT gets burned

See [pricing](../../../knowledge_base/cloud/pricing/pricing.md) for more information on how the cost for a contract is calculated.

## Contract locking

To not overload the chain with transfer events and others we choose to lock the amount due for a contract every hour and after 24 hours unlock the amount and deduct it in one go. This lock is saved on a user's account, if the user has multiple contracts the locked amount will be stacked.

## Contract grace period

When the owner of a contract runs out funds on his wallet to pay for his deployment, the contract goes in to a Grace Period state. The deployment, whatever that might be, will be unaccessible during this period to the user. When the wallet is funded with TFT again, the contract goes back to a normal operating state. If the grace period runs out (by default 2 weeks) the user's deployment and data will be deleted from the node.

## DAO

See [DAO](../../dashboard/tfchain/tf_dao.md) for more information on the DAO on TF Chain.

## Farming Policies

See [farming_policies](farming_policies.md) for more information on the farming policies on TF Chain.

## Node Connection price

A connection price is set to every new Node that boots on the Grid. This connection price influences the amount of TFT farmed in a period. The connection price set on a node is permanent. The DAO can propose the increase / decrease of the connection price. At the time of writing the connection price is set to $ 0.08. When the DAO proposes a connection price and the vote is passed, new nodes will attach to the new connection price.

## Node Certifiers

Node certifiers are entities who are allowed to set a node's certification level to `Certified`. The DAO can propose to add / remove entities that can certify nodes. This is usefull for allowing approved resellers of Threefold nodes to mark nodes as Certified. A certified node farms 25% more tokens than `Diy` a node.