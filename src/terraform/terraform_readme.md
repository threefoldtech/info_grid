

<h1> Terraform </h1>

Welcome to the *Terraform* section of the ThreeFold Manual! 

In this section, we'll embark on a journey to explore the powerful capabilities of Terraform within the ThreeFold Grid ecosystem. Terraform, a cutting-edge infrastructure as code (IaC) tool, empowers you to define and provision your infrastructure efficiently and consistently.

<h2>Table of Contents</h2>

- [What is Terraform?](#what-is-terraform)
- [Terraform on ThreeFold Grid: Unleashing Power and Simplicity](#terraform-on-threefold-grid-unleashing-power-and-simplicity)
- [Get Started](#get-started)
- [Features](#features)
- [What is Not Supported](#what-is-not-supported)

***

## What is Terraform?

Terraform is an open-source tool that enables you to describe and deploy infrastructure using a declarative configuration language. With Terraform, you can define your infrastructure components, such as virtual machines, networks, and storage, in a human-readable configuration file. This file, often referred to as the Terraform script, becomes a blueprint for your entire infrastructure.

The beauty of Terraform lies in its ability to automate the provisioning and management of infrastructure across various cloud providers, ensuring that your deployments are reproducible and scalable. It promotes collaboration, version control, and the ability to treat your infrastructure as code, providing a unified and seamless approach to managing complex environments.

## Terraform on ThreeFold Grid: Unleashing Power and Simplicity

Within the ThreeFold Grid ecosystem, Terraform plays a pivotal role in streamlining the deployment and orchestration of decentralized, peer-to-peer infrastructure. Leveraging the unique capabilities of the ThreeFold Grid, you can use Terraform to define and deploy your workloads, tapping into the TFGrid decentralized architecture for unparalleled scalability, reliability, and sustainability.

This manual will guide you through the process of setting up, configuring, and managing your infrastructure on the ThreeFold Grid using Terraform. Whether you're a seasoned developer, a DevOps professional, or someone exploring the world of decentralized computing for the first time, this guide is designed to provide clear and concise instructions to help you get started.

## Get Started

![ ](../terraform/img//terraform_works.png)

Threefold loves Open Source! In v3.0 we are integrating one of the most popular 'Infrastructure as Code' (IaC) tools of the cloud industry, [Terraform](https://terraform.io). Utilizing the Threefold grid v3 using Terraform gives a consistent workflow and a familiar experience for everyone coming from different background. Terraform describes the state desired of how the deployment should look like instead of imperatively describing the low level details and the mechanics of how things should be glued together.

## Features

- All basic primitives from ThreeFold grid can be deployed, which is a lot.
- Terraform can destroy a deployment
- Terraform shows all the outputs

## What is Not Supported

- we don't support updates/upgrades, if you want a change you need to destroy a deployment & re-create your deployment this in case you want to change the current running instances properties or change the node, but adding a vm to an existing deployment this shouldn't affect other running vm and same if we need to decommission a vm from a deployment this also shouldn't affect the others
