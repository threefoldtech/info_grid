

<h1> Deployment </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deploy Workloads](#deploy-workloads)
- [Delete Workloads](#delete-workloads)
- [Logs](#logs)
- [Using TFCMD with TFROBOT](#using-tfcmd-with-tfrobot)
  - [Get Contracts](#get-contracts)

***

## Introduction

We present how to deploy workloads on the ThreeFold Grid using TFROBOT.

## Prerequisites

To deploy workloads on the TFGrid with TFROBOT, you first need to [install TFROBOT](./tfrobot_installation.md) on your machine and create a [configuration file](./tfrobot_config.md).

## Deploy Workloads

Once you've installed TFROBOT and created a configuration file, you can deploy on the TFGrid with the following command. Make sure to indicate the path to your configuration file.

```bash
tfrobot deploy -c ./config.yaml
```

## Delete Workloads

To delete the contracts, you can use the following line. Make sure to indicate the path to your configuration file.

```bash
tfrobot cancel -c ./config.yaml
```

## Logs

To ensure a complete log history, append `2>&1 | tee path/to/log/file` to the command being executed.

```bash
tfrobot deploy -c ./config.yaml 2>&1 | tee path/to/log/file
```

## Using TFCMD with TFROBOT

### Get Contracts

The TFCMD tool works well with TFROBOT, as it can be used to query the TFGrid, for example you can see the contracts created by TFROBOT by running the TFCMD command, taking into consideration that you are using the same mnemonics and are on the same network:

```bash
tfcmd get contracts
```

For more information on TFCMD, [read the documentation](../tfcmd/tfcmd.md).