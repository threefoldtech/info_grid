<h1>TFCMD Getting Started</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Installation](#installation)
- [Login](#login)
- [Commands](#commands)
- [Using TFCMD](#using-tfcmd)

***

## Introduction

This section covers the basics on how to set up and use TFCMD (`tfcmd`).

TFCMD is available as binaries. Make sure to download the latest release and to stay up to date with new releases.

## Installation

An easy way to use TFCMD is to download and extract the TFCMD binaries to your path. 

- Download latest release from [releases](https://github.com/threefoldtech/tfgrid-sdk-go/releases)
  - ```
    wget <binaries_url>
    ```
- Extract the binaries
  - ```
    tar -xvf <binaries_file>
    ```
- Move `tfcmd` to any `$PATH` directory:
    ```bash
    mv tfcmd /usr/local/bin
    ```

## Login

Before interacting with Threefold Grid with `tfcmd` you should login with your mnemonics and specify the grid network:

```console
$ tfcmd login
Please enter your mnemonics: <mnemonics>
Please enter grid network (main,test): <grid-network>
```

This validates your mnemonics and store your mnemonics and network to your default configuration dir.
Check [UserConfigDir()](https://pkg.go.dev/os#UserConfigDir) for your default configuration directory.

## Commands

You can run the command `tfcmd help` at any time to access the help section. This will also display the available commands.

| Command    | Description                                                |
| ---------- | ---------------------------------------------------------- |
| cancel     | Cancel resources on Threefold grid                         |
| completion | Generate the autocompletion script for the specified shell |
| deploy     | Deploy resources to Threefold grid                         |
| get        | Get a deployed resource from Threefold grid                |
| help       | Help about any command                                     |
| login      | Login with mnemonics to a grid network                     |
| version    | Get latest build tag                                       |

## Using TFCMD

Once you've logged in, you can use commands to deploy workloads on the TFGrid. Read the next sections for more information on different types of workloads available with TFCMD.


