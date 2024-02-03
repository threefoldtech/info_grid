

<h1> Deployment </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Deploy Workloads](#deploy-workloads)
- [Using TFCMD with TFROBOT](#using-tfcmd-with-tfrobot)
  - [Get Contracts](#get-contracts)
  - [Delete Contracts](#delete-contracts)

***

## Introduction

We present how to deploy workloads on the ThreeFold Grid using TFROBOT.

## Prerequisites

To deploy workloads on the TFGrid with TFROBOT, you first need to [install TFROBOT](./tfrobot_installation.md) on your machine and create a [configuration file](./tfrobot_config.md).

## Deploy Workloads

Once you've installed TFROBOT and created a configuration file, you deploy on the TFGrid with the following command. Make sure to indicate the path to your configuration file.

- Run TFROBOT
  ```
  tfrobot -c ./config.yaml
  ```

## Using TFCMD with TFROBOT

### Get Contracts

The TFCMD tool works well with TFROBOT, as it can be used to query the TFGrid, for example you can see the contracts created by TFROBOT by running the TFCMD command, taking into consideration that you are using the same mnemonics and are on the same network:

```
tfcmd get contracts
```

### Delete Contracts

To delete the contracts, you can use the following line:

```
tfcmd cancel contracts --all
```

For more information on TFCMD, [read the documentation](../tfcmd/tfcmd.md).