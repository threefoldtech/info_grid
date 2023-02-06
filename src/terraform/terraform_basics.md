
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

- create `main.tf`  <- creates the terraform main file 

```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
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

- to execute a terraform file `terraform apply -parallelism=1`
- to see the output `terraform output`
    - can be used to get the relevant output variables e.g public ip, planetary network ip, wireguard configurations .. 
- to see the state `terraform show`
- to destroy `terraform destroy -parallelism=1`

## Find your Node

The choice of the node is up to the user. They need to do the capacity planning.

Make sure you choose a node which has enough capacity and is available (up and running).

> Check [Exploring Capacity](../dashboard/explorer/explorer_home.md) to know which nodes fits your deployment criteria.
