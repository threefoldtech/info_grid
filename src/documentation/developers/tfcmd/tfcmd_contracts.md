<h1>Contracts</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Get](#get)
  - [Get Contracts](#get-contracts)
  - [Get Contract](#get-contract)
- [Cancel](#cancel)
  - [Optional Flags](#optional-flags)

***

## Introduction

We explain how to handle contracts on the TFGrid with `tfcmd`.

## Get

### Get Contracts

Get all contracts

```bash
tfcmd get contracts
```

Example:

```console
$ tfcmd get contracts
5:13PM INF starting peer session=tf-1184566 twin=81
Node contracts:
ID       Node ID    Type            Name           Project Name
50977    21         network         vm1network     vm1
50978    21         vm              vm1            vm1
50980    14         Gateway Name    gatewaytest    gatewaytest

Name contracts:
ID       Name
50979    gatewaytest
```

### Get Contract

Get specific contract

```bash
tfcmd get contract <contract-id>
```

Example:

```console
$ tfcmd get contract 50977
5:14PM INF starting peer session=tf-1185180 twin=81
5:14PM INF contract:
{
        "contract_id": 50977,
        "twin_id": 81,
        "state": "Created",
        "created_at": 1702480020,
        "type": "node",
        "details": {
                "nodeId": 21,
                "deployment_data": "{\"type\":\"network\",\"name\":\"vm1network\",\"projectName\":\"vm1\"}",
                "deployment_hash": "21adc91ef6cdc915d5580b3f12732ac9",
                "number_of_public_ips": 0
        }
}
```

## Cancel

Cancel specified contracts or all contracts.

```bash
tfcmd cancel contracts <contract-id>... [Flags]
```

Example:

```console
$ tfcmd cancel contracts 50856 50857
5:17PM INF starting peer session=tf-1185964 twin=81
5:17PM INF contracts canceled successfully
```

### Optional Flags

- all: cancel all twin's contracts.

Example:

```console
$ tfcmd cancel contracts --all
5:17PM INF starting peer session=tf-1185964 twin=81
5:17PM INF contracts canceled successfully
```