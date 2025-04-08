---
title: "Gateway Domain"
sidebar_position: 197
---

# Gateway Domain

## Introduction

We present how to set up a gateway domain to a node.

## Overview

Farmers who offer gateway nodes can optionally attach a domain to their gateway. The node can then issue subdomains to workloads. 

If configured properly the node can also obtain a wildcard certificate from Let's Encrypt and then gateway subdomains terminating their TLS at the gateway will use this certificate.

## How to Proceed

To set up a gateway domain, you need first to set up the DNS records and then set the public configuration on your node.

If you do it the other way around (public config first then DNS records), the node will eventually retry obtaining the TLS certificate. Note that this could take up to a day or so. Rebooting the node should also help to accelerate the process. Considering this, it is advised to set the DNS records first.

## DNS Records

Set up the following DNS records with the DNS registrar:

```
gatewaydomain.com                   A       ip.of.the.gateway
*.gatewaydomain.com                 CNAME   gatewaydomain.com
_acme-challenge.gatewaydomain.com   NS      gatewaydomain.com / ns.gatewaydomain.com
```

Some DNS providers only allow NS records that start with the letters "ns". In this case the second form using the "ns" subdomains is fine—it will fall under the CNAME wildcard and ultimately resolve the the gateway's IP address.

For more information on this feature, refer the [ZOS documentation](https://github.com/threefoldtech/zosbase/blob/main/docs/internals/gateway/readme#implementation-details).

## Public Config

Gateway nodes are those that have a public config with at least a public IPv4 address specified. Adding a domain is optional, and can be done via the same process as documented [here](../../dashboard/farms/your_farms#public-configuration).

## How to Test

Once your gateway domain is set up, you can test it. 

Note that only a subset of well-known gateways are available for use via the ThreeFold Dashboard. For this reason, to test your gateway domain, you can use different clients that interact with the grid, such as Terraform.

We provide below a template example to test the gateway domain with Terraform.

```
terraform {
  required_providers {
    grid = {
       source = "threefold.io/providers/grid"
    }
  }
}

provider "grid" {
}

locals {
  name = "testvm"
  node = 1
}

# this data source is used to break circular dependency in cases similar to the following:
# vm: needs to know the domain in its init script
# gateway_name: needs the ip of the vm to use as backend.
# - the fqdn can be computed from grid_gateway_domain for the vm
# - the backend can reference the vm ip directly 
data "grid_gateway_domain" "domain" {
  node = local.node
  name = "example2"
}

resource "grid_network" "net1" {
  name     = local.name
  nodes    = [local.node]
  ip_range = "10.1.0.0/16"
  description = "network"
  add_wg_access = true
}

resource "grid_name_proxy" "p1" {
  node            = local.node
  name            = "example2"
  backends        = ["http://${grid_deployment.d1.vms[0].ip}"]
  tls_passthrough = false
  network         = grid_network.net1.name
}

resource "grid_deployment" "d1" {
  name         = local.name
  node         = local.node
  network_name = grid_network.net1.name
  vms {
    name       = "vm1"
    flist      = "https://hub.grid.tf/tf-official-vms/ubuntu-24.04-latest.flist"
    cpu        = 2
    memory     = 1024
    entrypoint = "/sbin/zinit init"
    env_vars = {
      SSH_KEY = file("~/.ssh/id_rsa.pub")
    }
  }
}
output "vm1_ip" {
  value = grid_deployment.d1.vms[0].ip
}

output "vm1_console_url" {
  value = grid_deployment.d1.vms[0].console_url
}

output "fqdn" {
  value = data.grid_gateway_domain.domain.fqdn
}

output "wg_config" {
  value = grid_network.net1.access_wg_config
}
```
