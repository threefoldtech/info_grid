<h1> Supported Configurations </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Config File](#config-file)
- [Node Group](#node-group)
- [Vms Groups](#vms-groups)
- [Disk](#disk)

***

## Introduction

When deploying with TFROBOT, you can set different configurations allowing for personalized deployments.

## Config File

| Field | Description| Supported Values|
| :---:   | :---: | :---: |
| [node_group](#node-group) | description of all resources needed for each node_group | list of structs of type node_group |
| [vms](#vms-groups) | description of resources needed for deploying groups of vms belong to node_group | list of structs of type vms |
| ssh_keys | map of ssh keys with key=name and value=the actual ssh key | map of string to string |
| mnemonic | mnemonic of the user | should be valid mnemonic |
| network | valid network of ThreeFold Grid networks | main, test, qa, dev |
| max_retries | times of retries of failed node groups | positive integer |

## Node Group

| Field | Description| Supported Values|
| :---:   | :---: | :---: |
| name | name of node_group | node group name should be unique |
| nodes_count | number of nodes in node group| nonzero positive integer |
| free_cpu | number of cpu of node | nonzero positive integer max = 32 |
| free_mru | free memory in the node in GB | min = 0.25, max = 256 |
| free_ssd | free ssd storage in the node in GB | positive integer value |
| free_hdd | free hdd storage in the node in GB | positive integer value |
| dedicated | are nodes dedicated | `true` or `false` |
| public_ip4 | should the nodes have free ip v4 | `true` or `false` |
| public_ip6 | should the nodes have free ip v6 | `true` or `false` |
| certified | should the nodes be certified(if false the nodes could be certified or DIY)  | `true` or `false` |
| region | region could be the name of the continents the nodes are located in | africa, americas, antarctic, antarctic ocean, asia, europe, oceania, polar |

## Vms Groups

| Field | Description| Supported Values|
| :---:   | :---: | :---: |
| name | name of vm group | string value with no special characters |
| vms_count | number of vms in vm group| nonzero positive integer |
| node_group | name of node_group the vm belongs to | should be defined in node_groups |
| cpu | number of cpu for vm | nonzero positive integer max = 32  |
| mem | free memory in the vm in GB | min = 0.25, max 256 |
| planetary | should the vm have yggdrasil ip | `true` or `false` |
| public_ip4 | should the vm have free ip v4 | `true` or `false` |
| public_ip6 | should the vm have free ip v6 | `true` or `false` |
| flist | should be a link to valid flist | valid flist url with `.flist` or `.fl` extension |
| entry_point | entry point of the flist | path to the entry point in the flist |
| ssh_key | key of ssh key defined in the ssh_keys map | should be valid ssh_key defined in the ssh_keys map |
| env_vars | map of env vars | map of type string to string |
| ssd | list of disks | should be of type disk|
| root_size | root size in GB | 0 for default root size, max 10TB |

## Disk

| Field | Description| Supported Values|
| :---:   | :---: | :---: |
| size | disk size in GB| positive integer min = 15 |
| mount_point | disk mount point | path to mountpoint |
