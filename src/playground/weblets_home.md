<h1> Playground </h1>

The ThreeFold Playground offers an easy-to-use browser experience to deploy solutions on the TFGrid via weblets. A weblet is a compiled javascript web component which can be embedded in HTML page of a web app.

The backend for the weblets is introduced with [grid client](../javascript/grid3_javascript_readme.md) which communicate to TF Chain and TF Grid over RMB.

<h2> Table of Contents </h2>

- [Profile Manager](./weblets_profile_manager.md)

- [Basic Environments](./weblets_basic_environments_readme.md)
  - [Virtual Machines](./weblets_vm_intro.md)
    - [Micro and Full VM Differences ](./weblets_vm_differences.md)
    - [Full Virtual Machine](./weblets_fullVm.md)
    - [Micro Virtual Machine](./weblets_vm.md)
  - [Kubernetes](./weblets_k8s.md)
  - [NixOS MicroVM](./weblets_nixos_micro.md)

- [Ready Community Solutions](./weblets_ready_community_readme.md)
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
  - [Subsquid](./weblets_subsquid.md)
  - [Algorand](./weblets_algorand.md)
  - [Wordpress](./weblets_wordpress.md)
  - [Umbrel](./weblets_umbrel.md)

## Advantages

- It is a non-code easy way to deploy a whole solution on the TFGrid.
- It is 100% decentralized, there is no server involved.

## Playground
Playground is a Vue app that has the weblets embedded. You can access the ThreeFold Playground on different TF Chain networks.
- [https://playground.dev.grid.tf](https://playground.dev.grid.tf) for Dev net.
- [https://playground.qa.grid.tf](https://playground.qa.grid.tf) for QA net.
- [https://playground.test.grid.tf](https://playground.test.grid.tf) for Test net.
- [https://playground.grid.tf](https://playground.grid.tf) for Main net.

## Limitations

- Regarding browser support, we're only supporting Google Chrome browser (and thus Brave browser) at the moment with more browsers to be supported soon.
- Deploys one thing at a time.
- Might take sometime to deploy a solution like Peertube, so you should wait a little bit until it's fully running.