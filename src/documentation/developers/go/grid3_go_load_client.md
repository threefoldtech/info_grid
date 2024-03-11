<h1>Load Client</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [TFPluginClient Configuration](#tfpluginclient-configuration)
- [Creating Client](#creating-client)

***

## Introduction

We cover how to load client using the Go client.

## TFPluginClient Configuration

- mnemonics
- keyType: can be `ed25519` or `sr25519`
- network: can be `dev`, `qa`, `test` or `main`

## Creating Client

Import `deployer` package to your project:

```go
import "github.com/threefoldtech/tfgrid-sdk-go/grid-client/deployer"
```

Create new Client:

```go
func main() {
    client, err := deployer.NewTFPluginClient(mnemonics, keyType, network, "", "", "", 0, true)
}
```
