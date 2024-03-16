<h1>Ethereum-Stellar Bridge</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [How to Use the Ethereum-Stellar Bridge](#how-to-use-the-ethereum-stellar-bridge)
- [Bridge Fees](#bridge-fees)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

The TFT Stellar-Ethereum bridge serves as a vital link between the Stellar and Ethereum blockchains, enabling the seamless transfer of TFT tokens between these two networks. This bridge enhances interoperability and expands the utility of TFT by allowing users to leverage the strengths of both platforms. With the bridge in place, TFT holders can convert their tokens from the Stellar network to the Ethereum network and vice versa, unlocking new possibilities for engagement with decentralized applications, smart contracts, and the vibrant Ethereum ecosystem. This bridge promotes liquidity, facilitates cross-chain transactions, and encourages collaboration between the Stellar and Ethereum communities.



## How to Use the Ethereum-Stellar Bridge

The easiest way to transfer TFT between Ethereum and Stellar is to use the [TFT Ethereum Bridge](https://bridge.eth.threefold.io). We present here the main steps on how to use this bridge.

When you go to the [TFT Ethereum-Stellar bridge website](https://bridge.eth.threefold.io/), connect your Ethereum wallet. Then the bridge will present a QR code which you scan with your Stellar wallet. This will populate a transaction with the bridge wallet as the destination and an encoded form of your Ethereum address as the memo. The bridge will scan the transaction, decode the Ethereum wallet address, and deliver newly minted TFT on Ethereum, minus the bridge fees.

For the reverse operation, going from Ethereum to Stellar, there is a smart contract interaction that burns TFT on Ethereum while embedding your Stellar wallet address. The bridge will scan that transaction and release TFT from its vault wallet to the specified Stellar address, again minus the bridge fees.

Note that the contract address for TFT on Ethereum is the following: `0x395E925834996e558bdeC77CD648435d620AfB5b`.

To see the ThreeFold Token on Etherscan, check [this link](https://etherscan.io/token/0x395E925834996e558bdeC77CD648435d620AfB5b).

## Bridge Fees

To learn more about the bridge fees, read [this documentation](../../transaction_fees.md).

## Questions and Feedback

If you have any question, feel free to write a post on the [Threefold Forum](https://forum.threefold.io/).