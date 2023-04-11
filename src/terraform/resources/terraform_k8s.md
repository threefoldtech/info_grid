# Kubernetes cluster

![ ](../advanced/img//terraform_.png)

Kubernetes deployment can be quite difficult and requiring lots of experience, but I think we provided a very simple way to provision Kubernetes cluster on grid 3.

An example for deploying a kubernetes cluster could be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/k8s/main.tf)

```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

provider "grid" {
}

resource "grid_scheduler" "sched" {
  requests {
    name     = "master_node"
    cru      = 2
    sru      = 512
    mru      = 2048
    distinct = true
    public_ips_count = 1
  }
  requests {
    name     = "worker1_node"
    cru      = 2
    sru      = 512
    mru      = 2048
    distinct = true
  }
  requests {
    name     = "worker2_node"
    cru      = 2
    sru      = 512
    mru      = 2048
    distinct = true
  }
  requests {
    name     = "worker3_node"
    cru      = 2
    sru      = 512
    mru      = 2048
    distinct = true
  }
}

locals {
  solution_type = "Kubernetes"
  name          = "myk8s"
}
resource "grid_network" "net1" {
  solution_type = local.solution_type
  name          = local.name
  nodes         = distinct(values(grid_scheduler.sched.nodes))
  ip_range      = "10.1.0.0/16"
  description   = "newer network"
  add_wg_access = true
}

resource "grid_kubernetes" "k8s1" {
  solution_type = local.solution_type
  name          = local.name
  network_name  = grid_network.net1.name
  token         = "12345678910122"
  ssh_key       = "PUT YOUR SSH KEY HERE"

  master {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["master_node"]
    name      = "mr"
    cpu       = 2
    publicip  = true
    memory    = 2048
  }
  workers {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["worker1_node"]
    name      = "w0"
    cpu       = 2
    memory    = 2048
  }
  workers {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["worker2_node"]
    name      = "w2"
    cpu       = 2
    memory    = 2048
  }
  workers {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["worker3_node"]
    name      = "w3"
    cpu       = 2
    memory    = 2048
  }
}

output "computed_master_public_ip" {
  value = grid_kubernetes.k8s1.master[0].computedip
}

output "wg_config" {
  value = grid_network.net1.access_wg_config
}
```

Everything looks similar to our first example, the global terraform section, the provider section and the network section.

## grid kubernetes resource

```terraform
resource "grid_kubernetes" "k8s1" {
  solution_type = local.solution_type
  name          = local.name
  network_name  = grid_network.net1.name
  token         = "12345678910122"
  ssh_key       = "PUT YOUR SSH KEY HERE"

  master {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["master_node"]
    name      = "mr"
    cpu       = 2
    publicip  = true
    memory    = 2048
  }
  workers {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["worker1_node"]
    name      = "w0"
    cpu       = 2
    memory    = 2048
  }
  workers {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["worker2_node"]
    name      = "w2"
    cpu       = 2
    memory    = 2048
  }
  workers {
    disk_size = 2
    node      = grid_scheduler.sched.nodes["worker3_node"]
    name      = "w3"
    cpu       = 2
    memory    = 2048
  }
}
```

It requires

- Network name that would contain the cluster
- A cluster token to work as a key for other nodes to join the cluster
- SSH key to access the cluster VMs.

Then, we describe the the master and worker nodes in terms of:

- name within the deployment
- disk size
- node to deploy it on
- cpu
- memory
- whether or not this node needs a public ip

### Kubernetes outputs

```terraform
output "master_public_ip" {
    value = grid_kubernetes.k8s1.master[0].computedip
}

output "wg_config" {
    value = grid_network.net1.access_wg_config
}

```

We will be mainly interested in the master node public ip `computed IP` and the wireguard configurations

## More Info

A complete list of k8s resource parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/kubernetes.md).
