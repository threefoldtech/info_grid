<h1>Gateway Name</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Deploy](#deploy)
  - [Required Flags](#required-flags)
  - [Optional Flags](#optional-flags)
- [Get](#get)
- [Cancel](#cancel)

***

## Introduction

We explain how to use gateway names on the TFGrid using `tfcmd`.

## Deploy

```bash
tfcmd deploy gateway name [flags]
```

### Required Flags

- name: name for the gateway deployment also used for canceling the deployment. must be unique.
- backends: list of backends the gateway will forward requests to.

### Optional Flags

- node: node id gateway should be deployed on.
- farm: farm id gateway should be deployed on, if set choose available node from farm that fits vm specs (default 1). note: node and farm flags cannot be set both.
-tls: add TLS passthrough option (default false).

Example:

```console
$ tfcmd deploy gateway name -n gatewaytest --node 14 --backends http://93.184.216.34:80
3:34PM INF deploying gateway name
3:34PM INF fqdn: gatewaytest.gent01.dev.grid.tf
```

## Get

```bash
tfcmd get gateway name <gateway>
```

gateway is the name used when deploying gateway-name using tfcmd.

Example:

```console
$ tfcmd get gateway name gatewaytest
1:56PM INF gateway name:
{
        "NodeID": 14,
        "Name": "gatewaytest",
        "Backends": [
                "http://93.184.216.34:80"
        ],
        "TLSPassthrough": false,
        "Description": "",
        "SolutionType": "gatewaytest",
        "NodeDeploymentID": {
                "14": 19644
        },
        "FQDN": "gatewaytest.gent01.dev.grid.tf",
        "NameContractID": 19643,
        "ContractID": 19644
}
```

## Cancel

```bash
tfcmd cancel <deployment-name>
```

deployment-name is the name of the deployment specified in while deploying using tfcmd.

Example:

```console
$ tfcmd cancel gatewaytest
3:37PM INF canceling contracts for project gatewaytest
3:37PM INF gatewaytest canceled
```