<h1>Go Client Installation</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Mycelium Network](#mycelium-network)
- [Requirements](#requirements)
- [Steps](#steps)
- [References](#references)

***

## Introduction

We present the general steps to install the ThreeFold Grid3 Go Client.

## Mycelium Network

Note that you can use the [Mycelium network](../../system_administrators/mycelium/mycelium_toc.md) to connect to your deployments. To do so, make sure that the Mycelium network is properly set up for the deployments. You can consult the different examples that include the Mycelium network to understand this further.

## Requirements

Make sure that you have at least Go 1.19 installed on your machine.

- [Go](https://golang.org/doc/install) >= 1.19

## Steps

* Create a new directory
  * ```bash
    mkdir tf_go_client
    ```
* Change directory
  * ```bash
    cd tf_go_client
    ```
* Creates a **go.mod** file to track the code's dependencies
  * ```bash
    go mod init main
    ```
* Install the Grid3 Go Client
  * ```bash
    go get github.com/threefoldtech/tfgrid-sdk-go/grid-client
    ```

This will make Grid3 Go Client packages available to you.

## References

For more information, you can read the official [Go documentation](https://go.dev/doc/).