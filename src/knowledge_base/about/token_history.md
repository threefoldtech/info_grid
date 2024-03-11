<h1> Token History </h1>

<h2>Table of Contents </h2>

- [Introduction](#introduction)
- [Quick History Overview](#quick-history-overview)
- [Organic Growth](#organic-growth)
- [Farming Model Improvements](#farming-model-improvements)
  - [TFT Versions](#tft-versions)
- [Migration](#migration)
  - [Migration from TFTv1 Rivine to TFTv1 Stellar (2020)](#migration-from-tftv1-rivine-to-tftv1-stellar-2020)
  - [Migration from TFTv1 Stellar (Staking Pool=TFTA) to TFTv2 Stellar (Trading or Production Pool=TFT)](#migration-from-tftv1-stellar-staking-pooltfta-to-tftv2-stellar-trading-or-production-pooltft)
  - [Technical Information](#technical-information)

***

## Introduction

We present the ThreeFold token history and the path from TFT v1 towards TFT v2.

## Quick History Overview

- More than 10 years ago, this project started from out of our incubator (see [Incubaid](https://www.incubaid.com))
- More than 6 years ago TF Foundation started deploying capacity for development purposes
  - This became our ([our genesis pool](./genesis_pool.md)), which is the beginning of farming
  - In 2017-18, value of the genesis pools were about 7m USD in TFT (tokens did not exist yet)
  - Genesis pools are owned by ThreeFold Dubai (ThreeFold_Dubai).
- March 2018 our first-generation blockchain for the ThreeFold_Token saw daylight
  - The TFT v1 was launched on a blockchain called Rivine (PTO)
  - The genesis pool resulted in the first batch initial TFT
  - The blockchain nodes were hosted by +30 different parties completely unrelated to each other
- In Q2 2019, ThreeFold_Dubai launched our generation 1 of our TF Grid
- April 2020 ThreeFold_Dubai launched the TFGrid v2.0 which is now public and usable by the world
  - ThreeFold has a new website and a new wiki
  - The farmers & TFT holders have at their own will upgraded their wallets, zero-nodes, ...
- May 2020: ThreeFold_Dubai launched our 2nd version of our token called TFT but this time on Stellar
  - The original TFTv1 kept all same properties and benefits and is now called TFTA also on Stellar (is technology choice), anyone can move from TFTv1 to TFTv2
  - TF Foundation Dubai has provisioned the TFTv1 & TFTv2 on Stellar blockchain, but has no influence or access to any of the wallets or for that matter the 3Nodes (the boxes providing IT capacity)
  - See below for more info, this was the result of 12 months of work with our community and of-course consensus to do this.

## Organic Growth

We didn't artificially pump the value of the tokens.

We did not issue (print) tokens and go out onto an exchange to offer these tokens to the market. This is referred to as a public ICO. Some ICOs were not very clean in how they created hype and convinced people to invest. Because of our decision not to do a public ICO, we have not been able to raise much money, but we feel that this was more aligned with our values.

We have sold some TFT over the counter but please note every buyer could at any point in time use these TFTs to buy IT capacity, this makes these TFT purposeful, even from the very start.

## Farming Model Improvements

In Q2 2020 we were launching TF Grid 2.0 with updated minting rules. As part of these farming rules the max number of tokens became 4 billion, which changes the optics of the original size of the genesis token pool. 

In Q3 2021 we launched TF Grid 3.0 which has again brought improvement to the farming model. Its up to the farmers to choose if they want to change to the new farming model or not. 

### TFT Versions

|                                 | version 1 Rivine            | version 1 Stellar | version 2 Stellar           |
| ------------------------------- | --------------------------- | ----------------- | --------------------------- |
| blockchain tech                 | Rivine, proof of blockstake | Public, Stellar   | Public, Stellar             |
| on public blockchain            | march 2018                  | 2020 May          | 2020 May                    |
| farmed since                    | +-2017                      | 2020 May          | tbd                         |
| freely transferable (\*)        | YES                         | YES               | YES                         |
| complete blockchain feature set | YES                         | YES               | YES                         |
| decentralized exchange          | YES (atomic swap)           | YES (Stellar)     | YES (Stellar)               |
| public exchange                 | BTC Alpha till Dec 2019     | Stellar           | Stellar, BTC Alpha & Liquid (until August 2022) |
| freely tradable on exchange     | YES                         | YES               | YES                         |
| Name on Blockchain              | TFT                         | TFTA              | TFT                         |
| Purpose                         | v1 token                    | Staking Pool      | Trading Pool                |

## Migration

### Migration from TFTv1 Rivine to TFTv1 Stellar (2020)

- TF Tech decided to no longer support development of Rivine, at this time there are better technologies available as blockchain
- The Foundation investigated many blockchain platforms & recommended to use Stellar
- Jimber (company which maintains the wallet, which is open source code), has made the changes in the wallet to be able to support this new blockchain
- The conversation had to be a mandatory one, because otherwise there would be the potential of double-spending problems over both simultaneously-active blockchains
- What happened here can be compared to a website deciding to change the database backend (change from e.g. MS Sql to Oracle). The users of the website should not have to be aware of this migration
- Every user had to do the transaction themselves, no developer or anyone else had control over this migration step. This was an automatic step
- Everyone can use the validation scripts available to check the correct conversion between two blockchain technologies. The validation scripts prove that every transaction in the conversion happened well

### Migration from TFTv1 Stellar (Staking Pool=TFTA) to TFTv2 Stellar (Trading or Production Pool=TFT)

- See [TFTA to TFT](../legal/terms_conditions/tfta_to_tft.md)

### Technical Information

[TFTA TrustLine](https://stellar.expert/explorer/public/asset/TFTA-GBUT4GP5GJ6B3XW5PXENHQA7TXJI5GOPW3NF4W3ZIW6OOO4ISY6WNLN2)

Accounts that got initial balances migrated them from the previous blockchain, [rivine](https://explorer2.threefoldtoken.com/).

To validate this, each migration transaction contain hash of the rivine lock transaction in their memo in hex format.

[Rivine block explorer](https://explorer2.threefoldtoken.com/) can be used for validation purposes.

> Important note: The ThreeFold Token (TFT) is not an investment instrument. TFTs represent IT capacity on the ThreeFold Grid, farmers create TFT, developers use TFT.