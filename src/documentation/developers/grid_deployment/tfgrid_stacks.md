<h1> TFGrid Stacks </h1>
<h2>Table of Contents</h2>


- [Introduction](#introduction)
- [Advantages](#advantages)
- [Deploy a Grid Instance](#deploy-a-grid-instance)


***

## Introduction

ThreeFold is an open-source project and anyone can run the full stack of the TFGrid in a totally decentralized manner. In practice, this means that anyone can grab a docker compose file shared by ThreeFold of the TFGrid stacks and run an instance of the grid services on their own domain.

This means that you could host your own instance of the ThreeFold Dashboard at `dashboard.yourdomain.com` that would serve your own instance of the complete TFGrid stack! Users could then access the ThreeFold Dashboard via your own domain.

The process is actually very straightforward and we even provide a script to streamline the process.

## Advantages

Setting such instances of the TFGrid ensures resiliency and decentralization of the ThreeFold ecosystem. 

As a very concrete example, image that one instance of the Dashboard goes offline, `dashboard.grid.tf`, then users could still access the Dashboard from another instance. The more users of the TFGrid deploy their own instance, the more resilient the grid becomes. 

The overall ThreeFold ecosystem becomes more resilient to failures of individual nodes.

## Deploy a Grid Instance

You can deploy an instance of the TFGrid on a full VM.

Read more about this in [next section](./grid_deployment_full_vm.md).