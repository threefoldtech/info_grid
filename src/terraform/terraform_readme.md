![ ](./advanced/img/terraform_.png)

# Terraform Intro

![ ](../terraform/img//terraform_works.png)

Threefold loves Open Source! In v3.0 we are integrating one of the most popular 'Infrastructure as Code' (IaC) tools of the cloud industry, [Terraform](https://terraform.io). Utilizing the Threefold grid v3 using Terraform gives a consistent workflow and a familiar experience for everyone coming from different background. Terraform describes the state desired of how the deployment should look like instead of imperatively describing the low level details and the mechanics of how things should be glued together.

## Features

- All basic primitives from ThreeFold grid can be deployed, which is a lot.
- Terraform can destroy a deployment
- Terraform shows all the outputs

## What is not supported.

- we don't support updates/upgrades, if you want a change you need to destroy a deployment & re-create your deployment this in case you want to change the current running instances properties or change the node, but adding a vm to an existing deployment this shouldn't affect other running vm and same if we need to decommission a vm from a deployment this also shouldn't affect the others
