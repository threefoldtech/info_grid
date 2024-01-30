# TFGrid release 3.0

TFGrid 3.0 will be released gradually during Q3/Q4 2021. 

## What's new ?

TFGrid 3.0 is a full redesign of the ThreeFold Grid architecture. The main purpose of this redesign is to decentralize all the components that the Grid is built with. 

### TFChain 3.0

A decentralised chain holding all information on entities that make up the ThreeFold Grid. It runs on Parity Substrate blockchain infrastructure. 

Features :
- Your identity and proofs/reputation on our blockchain
- All info about TFGrid (nodes, farmers, …)
- A Graphql interface to be able to query the blockchain
- Support of side chains (unlimited scalability, allow others to run their own blockchain)
- TFT exists now also on TFChain (allows us to work around Stellar scalability issues)
- Bridge between TFT on Stellar and TFT on TFChain (one way to start)
- Blockchain based provisioning process
- TFChain API (javascript, golang, vlang)
- Support for 'Infrastructure as Code' : IAC frameworks 
   - Terraform
   - Kubernetes, Helm, Kubernetes
   - Ansible (planned for Q4 2021)
- Use RMB = peer2peer secure Reliable Message Bus to communicate with Zero-OS

### Proof of Utilization

- Resource utilisation is captured and calculated on hourly basis
- Resource utilisation stored in TFChain
- An automated discount system has been put in place, rewarding users who pre-purchased their cloud needs. Price discounts are applied, in line with amount of TFT you have in your account and the period you are holding these TFT.
E.g. if you have 12 months worth of TFT in your account in relation to the last hour used capacity you get 40% discount, 36 months results in 60% discount. 

### New Explorer UI
- An updated User Interface of the TF Grid Explorer, nicer and easier to use
- It uses the Graphql layer of TFChain

## Roadmap 

The feature overview split over different releases can be found [here](https://circles.threefold.me/project/despiegk-product_tfgrid3_roadmap/wiki/roadmap).

More info and announcements on Grid 3.0 to be found on our [forum](https://forum.threefold.io/t/announcement-of-tfgrid-3-0/1132) 
