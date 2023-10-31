<h1> Introduction to the ThreeFold Pulumi Plugin: Examples</h1>

![](./img/pulumi_logo.svg)

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setting the Environment Variables](#setting-the-environment-variables)
- [Testing the Plugin: Virtual Machine](#testing-the-plugin-virtual-machine)
- [Destroy your deployment](#destroy-your-deployment)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

[Pulumi](https://www.pulumi.com/) is an infrastructure as code platform that allows you to use familiar programming languages and tools to build, deploy, and manage cloud infrastructure.

We present here the basic steps to test the examples within the [ThreeFold Pulumi](https://github.com/threefoldtech/pulumi-threefold) plugin repository. 

Once you've set the plugin and exported the necessary variables, the deployment process from one example to another is very similar.

## Prerequisites

There are a few things to set up before exploring Pulumi.

* Install [Go](https://go.dev/)
  * ```
    sudo snap install go --classic
    ```
* Install [pulumi](https://www.pulumi.com/)
  * ```
    curl -fsSL https://get.pulumi.com | sh
    ```
* Install [pulumictl](https://github.com/pulumi/pulumictl#installation)
  * ```
    brew tap pulumi/tap
    brew install pulumictl
    ```
* Clone the repository
  * ```
    git clone https://github.com/threefoldtech/pulumi-threefold
    ```
* Change directory
  * ```
    cd ./pulumi-threefold
    ```
* Use make to build the project
  * ```
    make build
    ```

## Setting the Environment Variables

You can export the environment variables before deploying workloads.

* Export the network (**dev**, **qa**, **test**, **main**). Note that we are using the **dev** network by default.
  * ```
    export NETWORK="Enter the network"
    ```
* Export your mnemonics. 
  * ```
    export MNEMONIC="Enter the mnemonics"
    ```
* Export the SSH_KEY (public key).
  * ```
    export SSH_KEY="Enter the public Key"
    ```

## Testing the Plugin: Virtual Machine

Once you've properly set the prerequisites, you can test many of the examples by simply going into the proper repository and running **make run**.

The different examples that work simply by running **make run** are the following:

* virtual_machine
* kubernetes
* network
* zdb
* gateway_name

We give an example with **virtual_machine**.

* Go to the directory **virtual_machine**
  * ```
    cd examples/virtual_machine
    ```
* Deploy the Pulumi workload with **make**
  * ```
    make run
    ```

Note: To test **gateway_fqdn**, you will have to update the fqdn in **Pulumi.yaml**.


## Destroy your deployment

You can destroy your Pulumi deployment at any time.

```
make destroy
```   

## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.