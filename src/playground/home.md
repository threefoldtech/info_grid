<h1> TF Playground </h1>

Welcome to the ThreeFold Playground Manual, your portal to a user-friendly and immersive experience in deploying solutions on the TFGrid. The ThreeFold Playground is a revolutionary platform that simplifies the deployment process, allowing users to effortlessly interact with the TFGrid using intuitive web components known as weblets. 

## What is the ThreeFold Playground?

The ThreeFold Playground is a dynamic environment designed for both seasoned developers and newcomers alike. It offers a seamless and accessible browser experience, making it easy to deploy solutions on the TFGrid through the use of weblets. 

In the context of the Playground, a weblet is a compiled JavaScript web component that can be effortlessly embedded within the HTML page of a web application. This modular approach allows for flexible and intuitive interactions, facilitating a user-friendly deployment process.

The backend for the weblets is introduced with [grid client](../javascript/grid3_javascript_readme.md) which communicate to TF Chain and TF Grid over RMB.

<h2> Table of Contents </h2>

- [Wallet Connector](./wallet_connector.md)

- [Basic Environments](./basic_environments_readme.md)
  - [Virtual Machines](./vm_intro.md)
    - [Micro and Full VM Differences ](./vm_differences.md)
    - [Full Virtual Machine](./fullVm.md)
    - [Micro Virtual Machine](./vm.md)
  - [Kubernetes](./k8s.md)
  - [NixOS MicroVM](./nixos_micro.md)
  - [Add a Domain](./add_domain.md)

- [Ready Community Solutions](./ready_community_readme.md)
  - [Caprover](./caprover.md)
  - [Funkwhale](./funkwhale.md)
  - [Peertube](./peertube.md)
  - [Taiga](./taiga.md)
  - [Owncloud](./owncloud.md)
  - [Nextcloud](./nextcloud.md)
  - [Discourse](./discourse.md)
  - [Mattermost](./mattermost.md)
  - [Presearch](./presearch.md)
  - [CasperLabs](./casper.md)
  - [Node Pilot](./nodepilot.md)
  - [Subsquid](./subsquid.md)
  - [Algorand](./algorand.md)
  - [Wordpress](./wordpress.md)
  - [Umbrel](./umbrel.md)

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