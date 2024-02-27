<h1>Go Client Installation</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Requirements](#requirements)
- [Steps](#steps)
- [References](#references)

***

## Introduction

We present the general steps to install the ThreeFold Grid3 Go Client.

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