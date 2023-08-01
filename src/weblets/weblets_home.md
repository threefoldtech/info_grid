# Weblets

Weblets are a UI tool helps to deploy solutions on TF Grid v3.

A weblet is a compiled javascript web component which can be embedded in HTML page of a web app.

The backend for the weblets is introduced with [grid client](../javascript/grid3_javascript_readme.md) which communicate to TF Chain and TF Grid over RMB.

__Advantages__ :

- It is a non-code easy way to deploy a whole solution on the Grid.
- It is 100% decentralized, there is no server involved

## Weblets list

There are several weblets you can use like: 

- Basic Environments:
  - [Virtual Machine](./weblets_vm.md)
  - [Kubernetes](./weblets_k8s.md)
  - [NixOS MicroVM](./weblets_nixos_micro.md)

- Ready Community Solutions:
  - [Caprover](./weblets_caprover.md)
  - [Funkwhale](./weblets_funkwhale.md)
  - [Peertube](./weblets_peertube.md)
  - [Taiga](./weblets_taiga.md)
  - [Owncloud](./weblets_owncloud.md)
  - [Discourse](./weblets_discourse.md)
  - [Mattermost](./weblets_mattermost.md)
  - [Presearch](./weblets_presearch.md)
  - [CasperLabs](./weblets_casper.md)
  - [Node Pilot](./weblets_nodepilot.md)

- Some utils:
  - [Profile Manager](./weblets_profile_manager.md)

## Playground
Playground is a Vue app that has the weblets embedded. so you can try it out on different TF Chain networks.
- [https://play.dev.grid.tf](https://play.dev.grid.tf) for Devnet.
- [https://play.qa.grid.tf](https://play.qa.grid.tf) for QAnet.
- [https://play.test.grid.tf](https://play.test.grid.tf) for Testnet.
- [https://play.grid.tf](https://play.grid.tf) for Mainnet.

## Limitations

- Regarding browser support, we're only supporting Google Chrome browser at the moment with more browsers to be supported soon. 
- Deploys one thing at a time.
- Might take sometime to deploy a solution like Peertube, so you should wait a little bit until it's fully running.