# Consensus Mechanism

## Blockchain node components

!!!include:consensus3_overview_graph

- A Blockchain node (= Substrate node) called TF-Chain, containing all entities interacting with each other on the TF-Grid
- An explorer = a Rest + GraphQL interface to TF-Chain (Graphql is a nice query language to make it easy for everyone to query for info)
- Consensus Engine
  - is a Multisignature Engine running on TF-Chain
  - The multisignature is done for the Money BlockchainAccounts
  - It checks the AccountMetadata versus reality and if ok, will sign, which allows transactions to happen after validation of the "smart contract"
- SLA & reputation engine
  - Each node uptime is being checked by Monitor_Engine
  - Also bandwidth will be checked in the future (starting 3.x)

### Remarks

- Each Monitor_Engine checks uptime of X nr of nodes (in beginning it can do all nodes), and stores the info in local DB (to keep history of check)

## Principle

- We keep things as simple as we can
  - Money Blockchain blockchain used to hold the money
    - Money Blockchain has all required features to allow users to manage their money like wallet support, decentralized exchange, good reporting, low transaction fees, ...
  - Substrate based TFChain is holding the metadata for the accounts which express what we need to know per account to allow the start contracts to execute.
  - Smart Contracts are implemented using multisignature feature on Money Blockchain in combination with Multi Signature done by Consensus_Engine.
- on money_blockchain:
  - each user has Money BlockchainAccounts (each of them holds money)
  - there are normal Accounts (means people can freely transfer money from these accounts) as well as RestrictedAccounts. Money cannot be transfered out of RestrictedAccounts unless consensus has been achieved from ConsensusEngine.
- Restricted_Account
  - On stellar we use the multisignature feature to make sure that locked/vesting or FarmingPool cannot transfer money unless consensus is achieved by the ConsensusEngine

- Each account on money_blockchain (Money BlockchainAccount) has account record in TFChain who needs advanced features like:
  - lockup
  - vesting
  - minting (rewards to farmers)
  - tfta to tft conversion

- The Account record in TFGrid_DB is called AccountMetadata.
  - The AccountMetadata describes all info required to be able for consensus engine to define what to do for advanced features like vesting, locking, ...

> TODO: outdated info

!!!include:consensus3_toc