<h1> Pulumi Complete YAML Guide</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Steps](#steps)
- [Alternative to Make Commands](#alternative-to-make-commands)

---

## Introduction

In this guide, we cover the complete steps to deploy a virtual machine on the grid with Pulumi via a YAML file.

To provide a uniform deployment method, we use Docker for this guide. It is optional but will greatly facilitate the deployment as the steps will be similar for Linux, MacOS and Windows.

This guide is useful to get you started quickly with Pulumi on the TFGrid.

Once you've successfully deployed a VM, you can try all the different YAML examples within the [pulumi-threefold repository](https://github.com/threefoldtech/pulumi-threefold). The examples are available in the subdirectory `/examples/yaml/`.

## Prerequisites

- [A TFChain account](../../../dashboard/wallet_connector.md)
- TFT in your TFChain account
  - [Buy TFT](../../../threefold_token/buy_sell_tft/buy_sell_tft.md)
  - [Send TFT to TFChain](../../../threefold_token/tft_bridges/tfchain_stellar_bridge.md)
- [Get Docker](https://docs.docker.com/get-docker/)

## Steps

- Deploy a Docker Ubuntu container in interactive mode:
    ```
    sudo docker run -it --net=host ubuntu:jammy /bin/bash
    ```
- In Docker Ubuntu, deploy a VM with Pulumi. Make sure to add your `MNEMONIC` and `SSH_KEY` below before running the script. For this deployment we use `main` as the `NETWORK`. Change this if needed.
    ```
    # Install the prerequisites
    apt update && apt install -y curl git make
    curl -fsSL https://get.pulumi.com | sh
    export PATH=$PATH=:/root/.pulumi/bin
    git clone https://github.com/threefoldtech/pulumi-threefold.git
    cd pulumi-threefold/examples/yaml/virtual_machine

    # Export the variables
    export NETWORK="main"
    export SSH_KEY="<ADD_YOUR_SSH_PUBLIC_KEY>"
    export MNEMONIC="<ADD_YOUR_MNEMONIC>"

    # Start Pulumi
    make run
    ```
- You can now SSH into the deployment from your local machine terminal
    ```
    ssh root@VM_IP
    ```
- To destroy the deployment, run the following line within the Docker Ubuntu terminal. 
    ```
    make destroy
    ```

## Alternative to Make Commands

You can use direct Pulumi commands instead of the Make commands above.

- You can replace `make run` with:
    ```
    pulumi login --local
    pulumi up
    ```
- You can replace `make destroy` with:
    ```
    pulumi down
    pulumi stack rm <stack_name>
    ```

That being said, the Make commands provide additional commands. Feel free to explore the possibilities and consult the files within the repo for more information.