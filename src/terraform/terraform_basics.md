![ ](./advanced/img//terraform_.png)

# terraform basics

## Requirements

<!-- please make sure to read [What you need to know before getting started](grid3_developer_basics) -->

Make sure following is done:

- [Get started with your account on TFGrid](../getstarted/tfgrid3_getstarted.md)
- [Install Terraform](../terraform/terraform_install.md)

## Prepare

- make a directory for your project `mkdir myfirstproject`
- `cd myfirstproject`

- create `main.tf` <- creates the terraform main file

```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
      version = "<version-dev>" // provide version if you want to deploy with a version other than latest
    }
  }
}

provider "grid" {
    mnemonics = "FROM THE CREATE TWIN STEP"
    network = "dev" # or test to use testnet
}

```

- to initialize the repo `terraform init`

## basic commands

- to execute a terraform file `terraform apply `
- to see the output `terraform output`
  - can be used to get the relevant output variables e.g public ip, planetary network ip, wireguard configurations ..
- to see the state `terraform show`
- to destroy `terraform destroy`

## Find your Node

we have two options here(using the scheduler or searching for a node in the capacity explorer)

- Use the [scheduler](resources/terraform_scheduler.md), scheduler will help you find a node that matches your criteria
- You do the capacity planning your self and make sure you choose a node which has enough capacity and is available (up and running).

> Check [Exploring Capacity](../dashboard/explorer/explorer_home.md) to know which nodes fits your deployment criteria.
