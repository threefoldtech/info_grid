<h1> Deployment Examples</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Set the Environment Variables](#set-the-environment-variables)
- [Test the Plugin](#test-the-plugin)
- [Destroy the Deployment](#destroy-the-deployment)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

[Pulumi](https://www.pulumi.com/) is an infrastructure as code platform that allows you to use familiar programming languages and tools to build, deploy, and manage cloud infrastructure.

We present here the basic steps to test the examples within the [ThreeFold Pulumi](https://github.com/threefoldtech/pulumi-threefold) plugin repository. Once you've set the plugin and exported the necessary variables, the deployment process from one example to another is very similar.

Please note that the Pulumi plugin for ThreeFold Grid is not yet officially published. We look forward to your feedback on this project.

## Prerequisites

There are a few things to set up before exploring Pulumi. Since we will be using the examples in the ThreeFold Pulumi repository, we must clone the repository before going further.

* [Install Pulumi](./pulumi_install.md) on your machine
* Clone the **Pulumi-ThreeFold** repository
  * ```
    git clone https://github.com/threefoldtech/pulumi-threefold
    ```
* Change directory
  * ```
    cd ./pulumi-threefold
    ```

## Set the Environment Variables

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

## Test the Plugin

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

Note: To test **gateway_fqdn**, you will have to update the fqdn in **Pulumi.yaml** and create an A record for your domain pointing to the gateway IP.


## Destroy the Deployment

You can destroy your Pulumi deployment at any time with the following make command:

```
make destroy
```   

## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.