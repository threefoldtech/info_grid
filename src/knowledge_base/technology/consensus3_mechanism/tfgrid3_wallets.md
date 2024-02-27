
# TFGrid 3.0 Wallets

ThreeFold has a mobile wallet which will allow to be used on the TFChain backend (Substrate) as well as any other Money Blockchain it supports.

This provides for a very secure digital currency infrastructure with lots of advantages.

- [X] ultra flexible smart contracts possible 
- [X] super safe
- [X] compatible with multiple blockchains (money blockchains)
- [X] ultra scalable

```mermaid


graph TB

    subgraph Money Blockchain
        money_blockchain[Money Blockchain Explorers]
        money_blockchain --- money_blockchain_node_1 & money_blockchain_node_2
        money_blockchain_node_1
        money_blockchain_node_2
    end

    subgraph ThreeFold Wallets
        mobile_wallet[Mobile Wallet]
        desktop_wallet[Desktop Wallet]
        mobile_wallet & desktop_wallet --> money_blockchain
        mobile_wallet & desktop_wallet  --> Explorers
        money_blockchain_wallet[Any Money Blockchain Wallet] --> money_blockchain
    end


    subgraph TFChain[TFGrid Blockchain on Substrate]
        Explorers[TFChain Explorers]-->TFGridDB --> BCNode
        Explorers --> BCNode
    end


```

Generic overview:

```mermaid

graph TB

    subgraph TFChain[TFGrid Chain]
        guardian1[TFChain Node 1]
        guardian2[TFChain Node 2]
        guardian3[TFChain Node 3...9]
    end

    User_wallet[User Wallet] --> money_blockchain_account
    User_wallet[User Wallet] --> money_blockchain_restricted_account

    subgraph Money Blockchain Ecosystem
        money_blockchain_account
        money_blockchain_restricted_account --- guardian1 & guardian2  & guardian3
    end

    subgraph consensus[Consensus Layer on Substrate]
        guardian1 --> ReputationEngine & PricingOracle
        guardian1 --> contract1[Smart Contract Vesting]
        guardian1 --> contract2[Smart Contract Minting/Farming]        
    end




```

!!!include:consensus3_toc