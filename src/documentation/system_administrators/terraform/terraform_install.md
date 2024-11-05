<h1> Installing Terraform</h1>



## Introduction

There are many ways to install Terraform depending on your operating system. Terraform is available for Linux, MAC and Windows.

## Install Terraform

You can get Terraform from the Terraform website [download page](https://www.terraform.io/downloads.html). You can also install it using your system package manager. The Terraform [installation manual](https://learn.hashicorp.com/tutorials/terraform/install-cli) contains the essential information for a proper installation.

We cover here the basic steps for Linux, MAC and Windows for convenience. Refer to the official Terraform documentation if needed.

### Linux

To install Terraform on Linux, we follow the official [Terraform documentation](https://developer.hashicorp.com/terraform/downloads). 

* [Install Terraform on Linux](../computer_it_basics/cli_scripts_basics.md#install-terraform)

### MacOS

To install Terraform on MacOS, install Brew and then install Terraform.

* [Install Brew](../computer_it_basics/cli_scripts_basics.md#install-brew)
* [Install Terraform with Brew](../computer_it_basics/cli_scripts_basics.md#install-terraform-with-brew)

### Windows

To install Terraform on Windows, a quick way is to first install Chocolatey and then install Terraform.

* [Install Chocolatey](../computer_it_basics/cli_scripts_basics.md#install-chocolatey)
* [Install Terraform with Chocolatey](../computer_it_basics/cli_scripts_basics.md#install-terraform-with-chocolatey)

## ThreeFold Terraform Plugin

The ThreeFold [Terraform plugin](https://github.com/threefoldtech/terraform-provider-grid) is supported on Linux, MAC and Windows.

There's no need to specifically install the ThreeFold Terraform plugin. Terraform will automatically load it from an online directory according to instruction within the deployment file.