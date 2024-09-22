

<h1> Introduction to Terraform </h1>

<h2>Table of Contents</h2>

- [What is Terraform?](#what-is-terraform)
- [Mycelium Network](#mycelium-network)
- [Get Started](#get-started)
- [Deployment Examples](#deployment-examples)
- [Features](#features)
- [What is Not Supported](#what-is-not-supported)
- [OpenTofu: Alternative to Terraform](#opentofu-alternative-to-terraform)

***

## What is Terraform?

[Terraform](https://www.terraform.io/) is an open-source tool that enables you to describe and deploy infrastructure using a declarative configuration language. With Terraform, you can define your infrastructure components, such as virtual machines, networks, and storage, in a human-readable configuration file. This file, often referred to as the Terraform script, becomes a blueprint for your entire infrastructure.

The beauty of Terraform lies in its ability to automate the provisioning and management of infrastructure across various cloud providers, ensuring that your deployments are reproducible and scalable. It promotes collaboration, version control, and the ability to treat your infrastructure as code, providing a unified and seamless approach to managing complex environments.

This section of the manual will guide you through the process of setting up, configuring, and managing your infrastructure on the ThreeFold Grid using Terraform. Whether you're a seasoned developer, a DevOps professional, or someone exploring the world of decentralized computing for the first time, this guide is designed to provide clear and concise instructions to help you get started.

## Mycelium Network

Note that you can use the [Mycelium network](../../system_administrators/mycelium/mycelium_toc.md) to connect to your deployments. To do so, make sure that the Mycelium network is properly set up for the deployments. You can consult the different examples that include the Mycelium network to understand this further.

## Get Started

To get started, [install Terraform](./terraform_install.md) and [deploy a full VM](./terraform_full_vm.md) on the grid with Terraform.

Once you're acquainted with the basics, you can explore different [Terraform deployment examples](https://github.com/threefoldtech/terraform-provider-grid/tree/development/examples).

## Deployment Examples

Consult the ThreeFold `terraform-provider-grid` repo for different [Terraform deployment examples](https://github.com/threefoldtech/terraform-provider-grid/tree/development/examples).

You can also read the [Resources](./resources/terraform_resources_readme.md) section for more details on different Terraform deployments.

## Features

- All basic primitives from ThreeFold grid can be deployed
- Terraform can destroy deployments
- Terraform shows all the outputs

## What is Not Supported

- We do not support updates nor upgrades. 
  - If you want a change, you need to destroy a deployment & re-create your deployment in case you want to change the current running instances properties or change the node.
- Adding a VM to an existing deployment or decommissioning a vm from a deployment shouldn't affect other running VMs.
  
## OpenTofu: Alternative to Terraform

[OpenTofu](https://opentofu.org/) is a fully open-source Terraform fork that is backward compatible with all prior versions of Terraform up to version 1.6. This alternative can be used instead of Terraform for the following sections. You might need to make changes depending on the version you are working with. Check the [OpenTofu Docs](https://opentofu.org/docs/) for more information.