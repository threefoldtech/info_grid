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

We present here a configuration file example that deploys 3 nodes with 2 vcores, 16GB of RAM, 100GB of SSD, 50GB of HDD and an IPv4 address. The same deployment is shown with a YAML file and with a JSON file. Parsing is based on file extension, TFROBOT will use JSON format if the file has a JSON extension and YAML format otherwise.

You can use this example for guidance, and make sure to replace placeholders and adapt the groups based on your actual project details. To the minimum, `ssh_key1` should be replaced by the user SSH public key and `example-mnemonic` should be replaced by the user mnemonics.

Note that if no IPs are specified as true (IPv4 or IPv6), an Yggdrasil IP address will automatically be assigned to the VM, as at least one IP should be set to allow an SSH connection to the VM.

### YAML Example

```
node_groups:
  - name: group_a
    nodes_count: 3
    free_cpu: 2
    free_mru: 16
    free_ssd: 100
    free_hdd: 50
    dedicated: false
    public_ip4: true
    public_ip6: false
    certified: false 
    region: europe
vms:
  - name: examplevm123
    vms_count: 5
    node_group: group_a
    cpu: 1
    mem: 0.25
    public_ip4: true
    public_ip6: false
    ssd:
      - size: 15
        mount_point: /mnt/ssd
    flist: https://hub.grid.tf/tf-official-apps/base:latest.flist
    entry_point: /sbin/zinit init
    root_size: 0
    ssh_key: example1
    env_vars:
      user: user1
      pwd: 1234
ssh_keys:
  example1: ssh_key1
mnemonic: example-mnemonic
network: dev
max_retries: 5
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
      "public_ip4": true,
      "public_ip6": false,
      "certified": false, 
      "region": europe,
    }
  ],
  "vms": [
    {
      "name": "examplevm123",
      "vms_count": 5,
      "node_group": "group_a",
      "cpu": 1,
      "mem": 0.25,
      "public_ip4": true,
      "public_ip6": false,
      "ssd": [
        {
          "size": 15,
          "mount_point": "/mnt/ssd"
        }
      ],
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