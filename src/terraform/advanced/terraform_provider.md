<h1> Terraform Provider </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Example](#example)
- [Environment Variables](#environment-variables)
- [Remarks](#remarks)

***

## Introduction

We present the basics of the Terraform Provider.

## Example

``` terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}
provider "grid" {
    mnemonics = "FROM THE CREATE TWIN STEP"
    network = grid network, one of: dev test qa main
    key_type = key type registered on substrate (ed25519 or sr25519)
    relay_url =  example: "wss://relay.dev.grid.tf"
    rmb_timeout = timeout duration in seconds for rmb calls
    substrate_url = substrate url, example: "wss://tfchain.dev.grid.tf/ws"
}
```

## Environment Variables

should be recognizable as Env variables too

- `MNEMONICS`
- `NETWORK`
- `SUBSTRATE_URL`
- `KEY_TYPE`
- `RELAY_URL`
- `RMB_TIMEOUT`

The *_URL variables can be used to override the dafault urls associated with the specified network

## Remarks

- Grid terraform provider is hosted on terraform registry [here](https://registry.terraform.io/providers/threefoldtech/grid/latest/docs?pollNotifications=true)
- All provider input variables and their description can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/index.md)
- Capitalized environment variables can be used instead of writing them in the provider (e.g. MNEMONICS)
