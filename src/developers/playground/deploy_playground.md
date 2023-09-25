<h1>Deploy the Playground Locally</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Playground Prerequisites](#playground-prerequisites)
  - [NodeJS](#nodejs)
  - [Yarn](#yarn)
  - [Make](#make)
  - [NGINX](#nginx)
  - [Caddy](#caddy)
- [Deploy the Playground Locally](#deploy-the-playground-locally)
  - [Manual Configuration](#manual-configuration)
- [Fund Your TFChain Account](#fund-your-tfchain-account)
- [Exploring the Playground Locally](#exploring-the-playground-locally)
- [Conclusion](#conclusion)

***

## Introduction

In this ThreeFold guide, we explore how to deploy the ThreeFold Playground locally on either Test net or Main net.

In brief, you will need to clone the Playground repository, install the prerequisites, adjust your network config file and run the playground. You will then be able to access the local playground by using a web browser. Make sure to have an Internet connection while running the playground.

***

## Playground Prerequisites

The main prerequisites to run the playground are NodeJS and Yarn. You will also need Make to build the Playground executables. 

If you plan on using a web server, you will need to install NGINX or Caddy and to use Make to build a production build.

### NodeJS

[NodeJS](https://nodejs.org/en) is an open-source, cross-platform JavaScript runtime environment.

### Yarn

[Yarn](https://yarnpkg.com/) is a package manager that doubles down as project manager.

### Make

[Make](https://www.gnu.org/software/make/) is a build automation tool that builds executable programs and libraries from source code by reading files called makefiles which specify how to derive the target program. 

### NGINX

[Nginx](https://www.nginx.com/) is a web server that can also be used as a reverse proxy, load balancer, mail proxy and HTTP cache.

### Caddy
[Caddy](https://caddyserver.com/) is an extensible, cross-platform, open-source web server written in Go. At its core, Caddy is an extensible platform for deploying long-running services ("apps") using a single, unified configuration that can be updated on-line with a REST API.

***

## Deploy the Playground Locally

* Install the prerequisites
  * You can use [Homebrew](https://brew.sh/) to install the prerequisites:
    * NodeJS (Use Node 18 for the current Playground)
      * ```
        brew install node@18
        ```
    * Yarn
      * ```
        brew install yarn
        ```
    * Make
      * ```
        brew install make
        ```
  * Clone the repository
    * ```
      git clone https://github.com/threefoldtech/tfgrid-sdk-ts
      cd tfgrid-sdk-tf
      ```
  * Set the **config.js** file
    * Set the permissions to run the script
      * ```
        chmod u+x packages/playground/scripts/build-env.sh 
        ```
    * Go to the public directory
      * ```
        cd packages/playground/public
        ```
    * Update the script for either Test or Main net
      * ```
        MODE=test ../scripts/build-env.sh
        ```
      * ```
        MODE=main ../scripts/build-env.sh
        ```
    * Go back to the **playground** directory
      * ```
        cd ..
        ```
  * Build the Playground
    * ```
      yarn install
      make build
      ```

* Run the Playground in Development mode
  * ```bash
    make run project=playground
    ```
* Open a browser and reach the local URL shown (usually `localhost:5173`)

***

### Manual Configuration

If you do not want to use the script **build-env.sh**, you can also configure manually the file **config.js**.

You need to adjust the content of the file **config.js** with the path **./packages/playground/public** of the repository **tfgrid-sdk-ts**. Simply replace the file content with the following matching the correct network.

**Test Net**

```
window.env = {
  NETWORK: "test",
  GRAPHQL_URL: "https://graphql.test.grid.tf/graphql",
  GRIDPROXY_URL: "https://gridproxy.test.grid.tf",
  SUBSTRATE_URL: "wss://tfchain.test.grid.tf/ws",
  ACTIVATION_SERVICE_URL: "https://activation.test.grid.tf",
  RELAY_DOMAIN: "relay.test.grid.tf",
  BRIDGE_TFT_ADDRESS: "GA2CWNBUHX7NZ3B5GR4I23FMU7VY5RPA77IUJTIXTTTGKYSKDSV6LUA4",
  STELLAR_NETWORK: "main",
  STELLAR_HORIZON_URL: "https://horizon.stellar.org",
  TFT_ASSET_ISSUER: "GBOVQKJYHXRR3DX6NOX2RRYFRCUMSADGDESTDNBDS6CDVLGVESRTAC47",
};
```

**Main Net**

```
window.env = {
  NETWORK: "main",
  GRAPHQL_URL='https://graphql.grid.tf/graphql'
  GRIDPROXY_URL='https://gridproxy.grid.tf'
  SUBSTRATE_URL='wss://tfchain.grid.tf/ws'
  ACTIVATION_SERVICE_URL='https://activation.grid.tf'
  RELAY_DOMAIN='relay.grid.tf'
  BRIDGE_TFT_ADDRESS=GBNOTAYUMXVO5QDYWYO2SOCOYIJ3XFIP65GKOQN7H65ZZSO6BK4SLWSC
  STELLAR_NETWORK=main
  STELLAR_HORIZON_URL: "https://horizon.stellar.org",
  TFT_ASSET_ISSUER: "GBOVQKJYHXRR3DX6NOX2RRYFRCUMSADGDESTDNBDS6CDVLGVESRTAC47",
};
```

***

## Fund Your TFChain Account

To test the Playground, you need some TFT in your TFChain wallet. You can learn more about TFT and how to acquire some tokens by reading [this section](https://manual.grid.tf/threefold_token/threefold_token.html) of the TF Manual.

***

## Exploring the Playground Locally

If you deploy on Test or Main networks, you can access the same experience as the official TF Playground website. Any workloads you deploy will be reflected on the matching Playground website. If you deploy a new weblet, you will see it in the **Contracts** section of the online Playground website version.

If you make any change to a weblet, you will be able to test it immediately. This is a good environment to test new weblets or adjust existing weblets.

***

## Conclusion

You now have the basics to deploy the Playground locally and experience directly changes in the code. You could explore further the Playground in various ways. 

For example, you could build a new Linux distro FList with the [ThreeFold Zero-OS Hub](https://hub.grid.tf/) and add it to the Micro VM weblet of the Playground. You could also create a whole new weblet starting from the template of another existing weblet.

Feel free to develop your own version of the Playground and to share your results with the ThreeFold community.

If you have any questions, you can ask around on the [ThreeFold Forum](https://forum.threefold.io/).