<h1>Terraform Basics</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Basic Commands](#basic-commands)
- [Find A Node](#find-a-node)
- [Preparation](#preparation)
- [Main File Details](#main-file-details)
  - [Initializing the Provider](#initializing-the-provider)
- [Export Environment Variables](#export-environment-variables)
  - [Output Section](#output-section)
- [Start a Deployment](#start-a-deployment)
- [Delete a Deployment](#delete-a-deployment)
- [Available Flists](#available-flists)
- [Full and Micro Virtual Machines](#full-and-micro-virtual-machines)
- [Tips on Managing Resources](#tips-on-managing-resources)
- [Conclusion](#conclusion)

***

## Introduction

We cover some important aspects of Terraform deployments on the ThreeFold Grid. 

For a complete guide on deploying a full VM on the TFGrid, read [this documentation](./terraform_full_vm.md).

## Requirements

Here are the requirements to use Terraform on the TFGrid:

- [Set your TFGrid account](../getstarted/tfgrid3_getstarted.md)
- [Install Terraform](../terraform/terraform_install.md)

## Basic Commands

Here are some very useful commands to use with Terraform:

- Initialize the repo `terraform init` 
- Execute a terraform file `terraform apply`
- See the output `terraform output`
  - This is useful when you want to output variables such as public ip, planetary network ip, wireguard configurations, etc.
- See the state `terraform show`
- Destroy `terraform destroy`

## Find A Node

There are two options when it comes to finding a node to deploy on. You can use the scheduler or search for a node with the Nodes Explorer.

- Use the [scheduler](resources/terraform_scheduler.md)
  - Scheduler will help you find a node that matches your criteria
- Use the Nodes Explorer
  - You can check the [Node Finder](../../dashboard/deploy/node_finder.md) to know which nodes fits your deployment criteria.
  - Make sure you choose a node which has enough capacity and is available (up and running).

## Preparation

We cover the basic preparations beforing explaining the main file.

- Make a directory for your project 
  - ```
    mkdir myfirstproject
    ```
- Change directory
  - ```
    cd myfirstproject
    ```
- Create a main file and insert content
  - ```
    nano main.tf
    ```


## Main File Details

Here is a concrete example of a Terraform main file.

### Initializing the Provider


```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
      version = "1.8.1"
    }
  }
}

```
- You can always provide a version to chooses a specific version of the provider like `1.8.1-dev` to use version `1.8.1` for devnet
- If `version = "1.8.1"` is omitted, the provider will fetch the latest version, but for environments other than main you have to specify the version explicitly
- For devnet, qanet and testnet use version = `"<VERSION>-dev", "<VERSION>-qa" and  "<VERSION>-rcx"` respectively

Providers can have different arguments e.g using which identity when deploying, which Substrate network to create contracts on, etc. This can be done in the provider section, as shown below:

```terraform
provider "grid" {
    mnemonics = "FROM THE CREATE TWIN STEP"
    network = "dev" # or test to use testnet

}
```

## Export Environment Variables

When writing the main file, you can decide to leave a variable content empty. In this case you can export the variable content as environment variables.

* Export your mnemonics
  * ```
    export MNEMONICS="..."
    ```
* Export the network
  * ```
    export NETWORK="..."
    ```

For more info, consult the [Provider Manual](./advanced/terraform_provider.md).

### Output Section

The output section is useful to find information such as:

- the overlay wireguard network configurations
- the private IPs of the VMs
- the public IP of the VM `exposed under computedip`


The output section will look something like this:

```terraform
output "wg_config" {
    value = grid_network.net1.access_wg_config
}
output "node1_vm1_ip" {
    value = grid_deployment.d1.vms[0].ip
}
output "node1_vm2_ip" {
    value = grid_deployment.d1.vms[1].ip
}
output "public_ip" {
    value = grid_deployment.d1.vms[0].computedip
}

```

## Start a Deployment

To start a deployment, run the following command `terraform init && terraform apply`.

## Delete a Deployment

To delete a deployment, run the following command:

```
terraform destroy
```

## Available Flists

You can consult the [list of Flists](../../developers/flist/flist.md)  to learn more about the available Flist to use with a virtual machine.

## Full and Micro Virtual Machines

There are some key distinctions to take into account when it comes to deploying full or micro VMs on the TFGrid:

* Only the flist determines if we get a full or a micro VM
* Full VMs ignore the **rootfs** field and use the first mount as their root filesystem (rootfs)
* We can upgrade a full VM by tearing it down, leaving the disk in detached state, and then reattaching the disk to a new VM
  * For more information on this, read [this documentation](https://forum.threefold.io/t/full-vm-recovery-tool/4152).

## Tips on Managing Resources

As a general advice, you can use multiple accounts on TFChain and group your resources per account.

This gives you the following benefits:

- More control over TFT spending
- Easier to delete all your contracts
- Less chance to make mistakes
- Can use an account to share access with multiple people

## Conclusion

This was a quick introduction to Terraform, for a complete guide, please read [this documentation](./terraform_full_vm.md). For advanced tutorials and deployments, read [this section](./advanced/terraform_advanced_readme.md). To learn more about the different resources to deploy with Terraform on the TFGrid, read [this section](./resources/terraform_resources_readme.md).