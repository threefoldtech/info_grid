<h1>Deployment Details</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Installation](#installation)
- [Essential Workflow](#essential-workflow)
  - [State](#state)
  - [Creating an Empty Stack](#creating-an-empty-stack)
  - [Bringing up the Infrastructure](#bringing-up-the-infrastructure)
  - [Destroy the Infrastructure](#destroy-the-infrastructure)
  - [Pulumi Makefile](#pulumi-makefile)
- [Creating a Network](#creating-a-network)
  - [Pulumi File](#pulumi-file)
- [Creating a Virtual Machine](#creating-a-virtual-machine)
- [Kubernetes](#kubernetes)
- [Creating a Domain](#creating-a-domain)
  - [Example of a Simple Domain Prefix](#example-of-a-simple-domain-prefix)
  - [Example of a Fully Controlled Domain](#example-of-a-fully-controlled-domain)
- [Conclusion](#conclusion)

***

## Introduction 

We present here noteworthy details concerning different types of deployments that are possible with the ThreeFold Pulumi plugin.

Please note that the Pulumi plugin for ThreeFold Grid is not yet officially published. We look forward to your feedback on this project.

## Installation

If this isn't already done, [install Pulumi](./pulumi_install.md) on your machine.

## Essential Workflow

### State

We will be creating a state directory and informing pulumi we want to use that local directory to manage the state, no need to use a cloud backend managed by pulumi or other providers (for the sake of testing).

```sh
 mkdir ${current_dir}/state
 pulumi login --cloud-url file://${current_dir}/state
```

### Creating an Empty Stack

```sh
 pulumi stack init test
```

### Bringing up the Infrastructure

```sh
 pulumi up --yes
```

Here we create an empty stack using `stack init` and we give it the name `test`
then to bring up the infrastructure we execute `pulumi up --yes`.

> The `pulumi up` command shows the plan before agreeing to execute it

### Destroy the Infrastructure

```sh
 pulumi destroy --yes
 pulumi stack rm --yes
 pulumi logout
```

### Pulumi Makefile

In every example directory, you will find a project file `Pulumi.yaml` and a `Makefile` to reduce the amount of typing:

```Makefile
current_dir = $(shell pwd)

run:
 rm -rf ${current_dir}/state 
 mkdir ${current_dir}/state
 pulumi login --cloud-url file://${current_dir}/state
 pulumi stack init test
 pulumi up --yes

destroy:
 pulumi destroy --yes
 pulumi stack rm --yes
 pulumi logout
```

This means that, to execute, you just need to type `make run` and to destroy, you need to type `make destroy`.

## Creating a Network

We address here how to create a [network](https://github.com/threefoldtech/pulumi-provider-grid/blob/development/examples/network).

### Pulumi File

You can find the original file [here](https://github.com/threefoldtech/pulumi-provider-grid/blob/development/examples/network/Pulumi.yaml).

```yml
name: pulumi-provider-grid
runtime: yaml

plugins:
  providers:
    - name: grid
      path: ../..

resources:
  provider:
    type: pulumi:providers:grid
    properties:
      mnemonic:

  scheduler:
    type: grid:internal:Scheduler
    options:
      provider: ${provider}
    properties:
      farm_ids: [1]

  network:
    type: grid:internal:Network
    options:
      provider: ${provider}
      dependsOn:
        - ${scheduler}
    properties:
      name: testing
      description: test network
      nodes:
        - ${scheduler.nodes[0]}
      ip_range: 10.1.0.0/16

outputs:
  node_deployment_id: ${network.node_deployment_id}
  nodes_ip_range: ${network.nodes_ip_range}
```

We will now go through this file section by section to properly understand what is happening.

```yml
name: pulumi-provider-grid
runtime: yaml
```

- name is for the project name (can be anything)
- runtime: the runtime we are using can be code in yaml, python, go, etc.

```yml
plugins:
  providers:
    - name: grid
      path: ../..

```

Here, we define the plugins we are using within our project and their locations. Note that we use `../..` due to the repository hierarchy.

```yml
resources:
  provider:
    type: pulumi:providers:grid
    properties:
      mnemonic:

```

We then start by initializing the resources. The provider which we loaded in the plugins section is also a resource that has properties (the main one now is just the mnemonic of TCHhain).

```yaml
  scheduler:
    type: grid:internal:Scheduler
    options:
      provider: ${provider}
    properties:
      farm_ids: [1]
```

Then, we create a scheduler `grid:internal:Scheduler`, that does the planning for us. Instead of being too specific about node IDs, we just give it some generic information. For example, "I want to work against these data centers (farms)". As long as the necessary criteria are provided, the scheduler can be more specific in the planning and select the appropriate resources available on the TFGrid.

```yaml
  network:
    type: grid:internal:Network
    options:
      provider: ${provider}
      dependsOn:
        - ${scheduler}
    properties:
      name: testing
      description: test network
      nodes:
        - ${scheduler.nodes[0]}
      ip_range: 10.1.0.0/16
```

Now, that we created the scheduler, we can go ahead and create the network resource `grid:internal:Network`. Please note that the network depends on the scheduler's existence. If we remove it, the scheduler and the network will be created in parallel, that's why we have the `dependsOn` section. We then proceed to specify the network resource properties, e.g. the name, the description, which nodes to deploy our network on, the IP range of the network. In our case, we only choose one node.

To access information related to our deployment, we set the section **outputs**. This will display results that we can use, or reuse, while we develop our infrastructure further.

```yaml
outputs:
  node_deployment_id: ${network.node_deployment_id}
  nodes_ip_range: ${network.nodes_ip_range}
```

## Creating a Virtual Machine

Now, we will check an [example](https://github.com/threefoldtech/pulumi-provider-grid/blob/development/examples/virtual_machine) on how to create a virtual machine.

Just like we've seen above, we will have two files `Makefile` and `Pulumi.yaml` where we describe the infrastructure.

```yml
name: pulumi-provider-grid
runtime: yaml

plugins:
  providers:
    - name: grid
      path: ../..

resources:
  provider:
    type: pulumi:providers:grid
    properties:
      mnemonic: <to be filled>

  scheduler:
    type: grid:internal:Scheduler
    options:
      provider: ${provider}
    properties:
      mru: 256
      sru: 2048
      farm_ids: [1]

  network:
    type: grid:internal:Network
    options:
      provider: ${provider}
      dependsOn:
        - ${scheduler}
    properties:
      name: test
      description: test network
      nodes:
        - ${scheduler.nodes[0]}
      ip_range: 10.1.0.0/16

  deployment:
    type: grid:internal:Deployment
    options:
      provider: ${provider}
      dependsOn:
        - ${network}
    properties:
      node_id: ${scheduler.nodes[0]}
      name: deployment
      network_name: test
      vms:
        - name: vm
          flist: https://hub.grid.tf/tf-official-apps/base:latest.flist
          entrypoint: "/sbin/zinit init"
          network_name: test
          cpu: 2
          memory: 256
          planetary: true
          mounts:
            - disk_name: data
              mount_point: /app
          env_vars:
            SSH_KEY:

      disks:
        - name: data
          size: 2

outputs:
  node_deployment_id: ${deployment.node_deployment_id}
  ygg_ip: ${deployment.vms_computed[0].ygg_ip}
```

We have a scheduler, and a network just like before. But now, we also have a deployment `grid:internal:Deployment` object that can have one or more disks and virtual machines.

```yaml
deployment:
    type: grid:internal:Deployment
    options:
      provider: ${provider}
      dependsOn:
        - ${network}
    properties:
      node_id: ${scheduler.nodes[0]}
      name: deployment
      network_name: test
      vms:
        - name: vm
          flist: https://hub.grid.tf/tf-official-apps/base:latest.flist
          entrypoint: "/sbin/zinit init"
          network_name: test
          cpu: 2
          memory: 256
          planetary: true
          mounts:
            - disk_name: data
              mount_point: /app
          env_vars:
            SSH_KEY: <to be filled>

      disks:
        - name: data
          size: 2
```

The deployment can be linked to a network using `network_name` and can have virtual machines in the `vms` section, and disks in the `disks` section. The disk can be linked and mounted in the VM if `disk_name` is used in the `mounts` section of the VM.

We also specify a couple of essential properties, like how many virtual cores, how much memory, what FList to use, and the environment variables in the `env_vars` section. 

That's it! You can now execute `make run` to bring the infrastructure up.

## Kubernetes

We now see how to deploy a [Kubernetes cluster using Pulumi](https://github.com/threefoldtech/pulumi-provider-grid/blob/development/examples/kubernetes/Pulumi.yaml).

```yaml
  content was removed for brevity
  kubernetes:
    type: grid:internal:Kubernetes
    options:
      provider: ${provider}
      dependsOn:
        - ${network}
    properties:
      master:
        name: kubernetes
        node: ${scheduler.nodes[0]}
        disk_size: 2
        planetary: true
        cpu: 2
        memory: 2048

      workers:
        - name: worker1
          node: ${scheduler.nodes[0]}
          disk_size: 2
          cpu: 2
          memory: 2048
        - name: worker2
          node: ${scheduler.nodes[0]}
          disk_size: 2
          cpu: 2
          memory: 2048

      token: t123456789
      network_name: test
      ssh_key: <to be filled>

outputs:
  node_deployment_id: ${kubernetes.node_deployment_id}
  ygg_ip: ${kubernetes.master_computed.ygg_ip}
```

Now, we define the Kubernetes resource `grid:internal:Kubernetes` that has master and workers blocks. You define almost everything like a normal VM except for the FLiist. Also note that the token is the `cluster token`. This will ensure that the workers and the master communicate properly.

## Creating a Domain

The ThreeFold Pulumi repository also covers examples on [how to work with TFGrid gateways](https://github.com/threefoldtech/pulumi-provider-grid/blob/development/examples/gateway_name/Pulumi.yaml). 

The basic idea is that you have a virtual machine workload on a specific IP, e.g. public IPv4, IPv6, or Planetary Network, and you want to access it using domains.

There are two versions to achieve this, a simple and a fully controlled version.

- Simple domain version:
  - subdomain.gent01.dev.grid.tf
  - This is a generous service from ThreeFold to reserve a subdomain on a set of defined gateway domains like **gent01.dev.grid.tf**.
- Fully controlled domain version:
  - e.g. `mydomain.com` where you manage the domain with the name provider.

### Example of a Simple Domain Prefix

We present here the file for a simple domain prefix.

```yml
  content was removed for brevity
  scheduler:
    type: grid:internal:Scheduler
    options:
      provider: ${provider}
    properties:
      mru: 256
      farm_ids: [1]
      ipv4: true
      free_ips: 1

  gatewayName:
    type: grid:internal:GatewayName
    options:
      provider: ${provider}
      dependsOn:
        - ${scheduler}
    properties:
      name: pulumi
      node_id: ${scheduler.nodes[0]}
      backends:
        - "http://69.164.223.208"

outputs:
  node_deployment_id: ${gatewayName.node_deployment_id}
  fqdn: ${gatewayName.fqdn}

```

In this example, we create a gateway name resource `grid:internal:GatewayName` for the name `pulumi.gent01.dev.grid.tf`.

Some things to note:

- **pulumi** is the prefix we want to reserve.
- It's assuming that the gateway domain we received by scheduler was the one managed by freefarm `gent01.dev.grid.tf`.
- **backends:** defines a list of IPs to load balance against when a request for `pulumi.gent01.dev.grid.tf` is received on the gateway.

### Example of a Fully Controlled Domain

Here's an [example](https://github.com/threefoldtech/pulumi-provider-grid/blob/development/examples/gateway_fqdn/Pulumi.yaml) of a more complicated, but fully controlled domain.

```yml
  code removed for brevity
  gatewayFQDN:
    type: grid:internal:GatewayFQDN
    options:
      provider: ${provider}
      dependsOn:
        - ${deployment}
    properties:
      name: testing
      node_id: 14
      fqdn: mydomain.com
      backends:
        - http://[${deployment.vms_computed[0].ygg_ip}]:9000
```

Here, we informed the gateway that any request coming for the domain `mydomain.com` needs to be balanced through the backends.

> Note: You need to create an A record for your domain (here `mydomain.com`) pointing to the gateway IP.

## Conclusion

We covered in this guide some basic details concerning the use of the ThreeFold Pulumi plugin.

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.