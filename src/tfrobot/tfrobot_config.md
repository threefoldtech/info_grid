<h1> Configuration File</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Examples](#examples)
  - [YAML Example](#yaml-example)
  - [JSON Example](#json-example)
- [Create a Configuration File](#create-a-configuration-file)

***

## Introduction

To use TFROBOT, the user needs to create a YAML or a JSON configuration file that will contain the mass deployment information, such as the groups information, number of VMs to deploy how, the compute, storage and network resources needed, as well as the user's credentials, such as the SSH public key, the network (main, test, dev, qa) and the TFChain mnemonics.

## Examples

We present here a configuration file example that deploys a 3 nodes, with 2 vcores, 16GB of RAM and 100GB of SSD. The same deployment is shown with a YAML file and with a JSON file. Parsing is based on file extension, TFROBOT will use JSON format if the file has a JSON extension and YAML format otherwise.

You can use this example for guidance, and make sure to replace placeholders and adapt the groups based on your actual project details. To the minimum, `<ssh_key>` should be replaced by the user SSH public key and `<mnemonic>` should be replaced by the user mnemonics.

### YAML Example

```
node_groups:
  - name: group_a
    nodes_count: 3 # amount of nodes to be found
    free_cpu: 2 # number of logical cores
    free_mru: 16384 # amount of memory in MB
    free_ssd: 100 # amount of ssd storage in GB
    free_hdd: 50 # amount of hdd storage in GB
    dedicated: false # are nodes dedicated
    pubip4: false # should the nodes have free ip v4
    pubip6: false # should the nodes have free ip v6
    certified: false # should the nodes be certified(if false the nodes could be certified of diyed) 
    region: "europe" # region could be the name of the continents the nodes are located in (africa, americas, antarctic, antarctic ocean, asia, europe, oceania, polar)
vms:
  - name: examplevm
    vms_count: 5 # amount of vms with the same configurations
    node_group: group_a # the name of the predefined group of nodes
    cpu: 1 # number of logical cores
    mem: 256 # amount of memory in MB
    ssd: # list of ssd storage needed to be mounted to the vm
      - size: 5 # size in GB
        mount_point: /mnt/ssd
    pubip4: false
    pubip6: false
    flist: https://hub.grid.tf/tf-official-apps/base:latest.flist
    entry_point: /sbin/zinit init
    root_size: 0 # root size in GB
    ssh_key: example1 # the name of the predefined ssh key

ssh_keys: # map of ssh keys with key=name and value=the actual ssh key
  example1: <ssh_key>
mnemonic: <mnemonic> # mnemonic of the user
network: dev # eg: main, test, qa, dev
```

### JSON Example

```
{
  "node_groups": [
    {
      "name": "group_a",
      "nodes_count": 3,
      "free_cpu": 2,
      "free_mru": 16,
      "free_ssd": 100,
      "free_hdd": 50,
      "dedicated": false,
      "public_ip4": false,
      "public_ip6": false,
      "certified": false,
      "region": "europe"
    }
  ],
  "vms": [
    {
      "name": "examplevm123",
      "vms_count": 1,
      "node_group": "group_a",
      "cpu": 1,
      "mem": 2,
      "ssd": [
        {
          "size": 15,
          "mount_point": "/mnt/ssd"
        }
      ],
      "public_ip4": false,
      "public_ip6": false,
      "flist": "https://hub.grid.tf/tf-official-apps/base:latest.flist",
      "entry_point": "/sbin/zinit init",
      "root_size": 0,
      "ssh_key": "example1",
      "env_vars": {
        "user": "user1",
        "pwd": "1234"
      }
    }
  ],
  "ssh_keys": {
    "example1": "ssh_key1"
  },
  "mnemonic": "example-mnemonic",
  "network": "dev",
  "max_retries": 5
}
```

## Create a Configuration File

You can start with the example above and adjust for your specific deployment needs.

- Create directory
  ```
  mkdir tfrobot_deployments && cd $_
  ```
- Create configuration file and adjust with the provided example above
  ```
  nano config.yaml
  ```

Once you've set your configuration file, all that's left is to deploy on the TFGrid. Read the next section for more information on how to deploy with TFROBOT.