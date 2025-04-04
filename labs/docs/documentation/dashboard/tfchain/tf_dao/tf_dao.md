---
title: "TF DAO"
sidebar_position: 57
---



The TFChain DAO (i.e. Decentralized Autonomous Organization) feature integrates decentralized governance capabilities into the ThreeFold Dashboard. It enables community members to participate in decision-making processes and to contribute to the evolution of the ThreeFold ecosystem. Through the TFChain DAO, users can propose, vote on, and implement changes to the network protocols, policies, and operations, fostering a collaborative and inclusive environment.

## An Introduction to the DAO concept

A decentralized autonomous organization (DAO) is an entity with no central leadership. Decisions get made from the bottom-up, governed by a community organized around a specific set of rules enforced on a blockchain. 

DAOs are internet-native organizations collectively owned and managed by their members. They have built-in treasuries that are only accessible with the approval of their members. Decisions are made via proposals the group votes on during a specified period.



## Prerequisites to Vote

Voting for a DAO proposal is very simple. You first need to meet certain requirements to be able to vote.

- Have a Threefold farm
- Have at least one active 3node server on the farm
- If you created your farm with the Threefold Connect app
  - Import your farm on the Threefold Dashboard



## How to Vote for a Proposal

To vote, you need to log into your Threefold Dashboard account, go to **TF DAO** section of **TFChain** and vote for an active proposal. Make sure to read the proposition and ask questions on the Threefold Forum proposition post if you have any.

## The Goal of the Threefold DAO

The goal of DAO voting system is to gather the thoughts and will of the Threefold community and build projects that are aligned with the ethos of the project.

We encourage anyone to share their ideas. Who knows? Your sudden spark of genius might lead to an accepted proposal on the Threefold DAO!

## Voting Weight

The DAO votes are weighted as follows:

- Get all linked farms to the account
- Get all nodes per farm
- Get compute and storage units per node (CU and SU)
- Compute the weight of a farm:
  ```
  2 * (sum of CU of all nodes) + (sum of SU of all nodes)
  ```

Voting weights are tracked per farm to keep it easy and traceable. Thus, if an account has multiple farms, the vote will be registered per farm.

For more information on voting weight, [check this example](./tf_dao_voting_weight.md).