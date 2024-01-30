![](img/blockchain.png)

# TFChain

> ThreeFold Chain

Blockchain based on Parity Substrate which manages the TFGrid 3.x.

This blockchain is used for:

- storing information as needed on the ThreeFold Grid
  - identity information of entities (person and company)
  - 3node phone book, where are the 3nodes, how much capacity, which farmer 
  - TF Farmer's, where are they based, how long active, reputation
  - DigitalTwin Phonebook, registry of all digital_twins, where are they, public key, unique id, ...  (\*1)
  - Reputation information : how good is a farmer, uptime of a 3Node (\*2)
  - Account_Metadata which is information about a digital currency wallet/account needed for vesting, locking, ... 
- backend for Consensus_Engine.
- smartcontract_it layer (how to provision workloads on top of TFGrid)
- the backend for TFChainDB

Is combination of tfchain_nodes
