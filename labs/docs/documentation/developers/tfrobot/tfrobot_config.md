---
title: "Configuration File"
sidebar_position: 109
---

<h1> Configuration File</h1>

## Introduction

To use TFROBOT, the user needs to create a YAML or a JSON configuration file that will contain the mass deployment information, such as the groups information, number of VMs to deploy how, the compute, storage and network resources needed, as well as the user's credentials, such as the SSH public key, the network (main, test, dev, qa) and the TFChain mnemonics.

## Examples

We present here a configuration file example that deploys 3 nodes with 2 vcores, 16GB of RAM, 150GB of SSD, 50GB of HDD and a Mycelium address. The same deployment is shown with a YAML file and with a JSON file. Parsing is based on file extension, TFROBOT will use JSON format if the file has a JSON extension and YAML format otherwise.

You can use this example for guidance, and make sure to replace placeholders and adapt the groups based on your actual project details. To the minimum, `ssh_key1` should be replaced by the user SSH public key and `example-mnemonic` should be replaced by the user mnemonics.

Note that if no IPs are specified as true (IPv4 or IPv6), an Yggdrasil IP address will automatically be assigned to the VM, as at least one IP should be set to allow an SSH connection to the VM.

### YAML Example

```
node_groups:
  - name: group_a
    nodes_count: 3 # amount of nodes to be found
    free_cpu: 2 # number of logical cores
    free_mru: 16 # amount of memory in GB
    free_ssd: 150 # amount of ssd storage in GB
    free_hdd: 50 # amount of hdd storage in GB
    dedicated: false # are nodes dedicated
    public_ip4: false # should the nodes have free ip v4
    public_ip6: false # should the nodes have free ip v6
    certified: false # should the nodes be certified(if false the nodes could be certified or DIY) 
    region: "europe" # region could be the name of the continents the nodes are located in (africa, americas, antarctic, antarctic ocean, asia, europe, oceania, polar)
vms:
  - name: examplevm
    vms_count: 5 # amount of vms with the same configurations
    node_group: group_a # the name of the predefined group of nodes
    cpu: 1 # number of logical cores, min 1, max 32
    mem: 2 # amount of memory in GB, min 0.25 GB, max 256 GB
    ssd: # list of ssd storage needed to be mounted to the vm
      - size: 15 # size in GB, min 15 GB
        mount_point: /mnt/ssd
    volume: # list of volume storage needed to be mounted to the vm
      - size: 15 # size in GB, min 15 GB
        mount_point: /mnt/vol
    public_ip4: false
    public_ip6: false
    mycelium_ip: true
    flist: https://hub.grid.tf/tf-official-apps/base:latest.flist
    entry_point: /sbin/zinit init
    root_size: 0 # root size in GB, 0 for default root size, max 10TB
    ssh_key: example1 # the name of the predefined ssh key
    env_vars: # env vars are passed to the newly created vms
      user: user1
      pwd: 1234
    wireguard: false

ssh_keys: # map of ssh keys with key=name and value=the actual ssh key
  example1: ssh_key1
mnemonic: example-mnemonic # mnemonic of the user
network: dev # eg: main, test, qa, dev
max_retries: 5 # max retries for each node group (default 5)
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
      "mycelium_ip": true,
      "flist": "https://hub.grid.tf/tf-official-apps/base:latest.flist",
      "entry_point": "/sbin/zinit init",
      "root_size": 0,
      "ssh_key": "example1",
      "env_vars": {
        "user": "user1",
        "pwd": "1234"
      },
      "wireguard": false
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