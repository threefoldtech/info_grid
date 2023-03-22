![ ](../advanced/img//terraform_.png)

# Terraform Kubernetes cluster

Kubernetes deployment can be quite difficult and requiring lots of experience, but I think we provided a very simple way to provision Kubernetes cluster on grid 3

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

resource "grid_network" "net1" {
    nodes = [2, 4]
    ip_range = "10.1.0.0/16"
    name = "network12346"
    description = "newer network"
    add_wg_access = true
}

resource "grid_kubernetes" "k8s1" {
  network_name = grid_network.net1.name
  nodes_ip_range = grid_network.net1.nodes_ip_range
  token = "12345678910122"
  ssh_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCtCuUUCZGLZ4NoihAiUK8K0kSoTR1WgIaLQKqMdQ/99eocMLqJgQMRIp8lueFG7SpcgXVRzln8KNKZX1Hm8lcrXICr3dnTW/0bpEnF4QOGLYZ/qTLF5WmoCgKyJ6WO96GjWJBsZPads+RD0WeiijV7jj29lALsMAI8CuOH0pcYUwWsRX/I1z2goMPNRY+PBjknMYFXEqizfUXqUnpzF3w/bKe8f3gcrmOm/Dxh1nHceJDW52TJL/sPcl6oWnHZ3fY4meTiAS5NZglyBF5oKD463GJnMt/rQ1gDNl8E4jSJUArN7GBJntTYxFoFo6zxB1OsSPr/7zLfPG420+9saBu9yN1O9DlSwn1ZX+Jg0k7VFbUpKObaCKRmkKfLiXJdxkKFH/+qBoCCnM5hfYxAKAyQ3YCCP/j9wJMBkbvE1QJMuuoeptNIvSQW6WgwBfKIK0shsmhK2TDdk0AHEnzxPSkVGV92jygSLeZ4ur/MZqWDx/b+gACj65M3Y7tzSpsR76M= omar@omar-Predator-PT315-52"

  master {
    disk_size = 23
    node = 2
    name = "mr"
    cpu = 2
    publicip = true
    memory = 2048
  }
  workers {
    disk_size = 15
    node = 2
    name = "w0"
    cpu = 2
    memory = 2048
  }
  workers {
    disk_size = 14
    node = 4
    name = "w2"
    cpu = 1
    memory = 2048
  }
  workers {
    disk_size = 13
    node = 4
    name = "w3"
    cpu = 1
    memory = 2048
  }
}


output "master_public_ip" {
    value = grid_kubernetes.k8s1.master[0].computedip
}

output "wg_config" {
    value = grid_network.net1.access_wg_config
}

```

Everything looks similar to our first example, the global terraform section, the provider section and the network section.

### grid kubernetes resource

```terraform
resource "grid_kubernetes" "k8s1" {
  network_name = grid_network.net1.name
  nodes_ip_range = grid_network.net1.nodes_ip_range
  token = "12345678910122"
  ssh_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCtCuUUCZGLZ4NoihAiUK8K0kSoTR1WgIaLQKqMdQ/99eocMLqJgQMRIp8lueFG7SpcgXVRzln8KNKZX1Hm8lcrXICr3dnTW/0bpEnF4QOGLYZ/qTLF5WmoCgKyJ6WO96GjWJBsZPads+RD0WeiijV7jj29lALsMAI8CuOH0pcYUwWsRX/I1z2goMPNRY+PBjknMYFXEqizfUXqUnpzF3w/bKe8f3gcrmOm/Dxh1nHceJDW52TJL/sPcl6oWnHZ3fY4meTiAS5NZglyBF5oKD463GJnMt/rQ1gDNl8E4jSJUArN7GBJntTYxFoFo6zxB1OsSPr/7zLfPG420+9saBu9yN1O9DlSwn1ZX+Jg0k7VFbUpKObaCKRmkKfLiXJdxkKFH/+qBoCCnM5hfYxAKAyQ3YCCP/j9wJMBkbvE1QJMuuoeptNIvSQW6WgwBfKIK0shsmhK2TDdk0AHEnzxPSkVGV92jygSLeZ4ur/MZqWDx/b+gACj65M3Y7tzSpsR76M= omar@omar-Predator-PT315-52"

  master {
    disk_size = 23
    node = 2
    name = "mr"
    cpu = 2
    publicip = true
    memory = 2048
  }
  workers {
    disk_size = 15
    node = 2
    name = "w0"
    cpu = 2
    memory = 2048
  }
  workers {
    disk_size = 14
    node = 4
    name = "w2"
    cpu = 1
    memory = 2048
  }
  workers {
    disk_size = 13
    node = 4
    name = "w3"
    cpu = 1
    memory = 2048
  }
}

```

it requires

- the network name

- nodes ip range
- token is the cluster token
- ssh_key to access the cluster VMs

then we describe the VMs master and workers section in terms of

- name within the deployment
- disk size
- node to deploy it on
- cpu
- memory

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

You can check the examples repo [here](https://github.com/threefoldtech/terraform-provider-grid/tree/development/examples)

### Current limitations

- [increasing IPs in active deployment](https://github.com/threefoldtech/terraform-provider-grid/issues/15)

## More Info

A complete list of k8s resource parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/kubernetes.md).

```
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

provider "grid" {
}

resource "grid_network" "net1" {
    nodes = [2, 4]
    ip_range = "10.1.0.0/16"
    name = "network12346"
    description = "newer network"
    add_wg_access = true
}

resource "grid_kubernetes" "k8s1" {
  network_name = grid_network.net1.name
  nodes_ip_range = grid_network.net1.nodes_ip_range
  token = "12345678910122"
  ssh_key = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCtCuUUCZGLZ4NoihAiUK8K0kSoTR1WgIaLQKqMdQ/99eocMLqJgQMRIp8lueFG7SpcgXVRzln8KNKZX1Hm8lcrXICr3dnTW/0bpEnF4QOGLYZ/qTLF5WmoCgKyJ6WO96GjWJBsZPads+RD0WeiijV7jj29lALsMAI8CuOH0pcYUwWsRX/I1z2goMPNRY+PBjknMYFXEqizfUXqUnpzF3w/bKe8f3gcrmOm/Dxh1nHceJDW52TJL/sPcl6oWnHZ3fY4meTiAS5NZglyBF5oKD463GJnMt/rQ1gDNl8E4jSJUArN7GBJntTYxFoFo6zxB1OsSPr/7zLfPG420+9saBu9yN1O9DlSwn1ZX+Jg0k7VFbUpKObaCKRmkKfLiXJdxkKFH/+qBoCCnM5hfYxAKAyQ3YCCP/j9wJMBkbvE1QJMuuoeptNIvSQW6WgwBfKIK0shsmhK2TDdk0AHEnzxPSkVGV92jygSLeZ4ur/MZqWDx/b+gACj65M3Y7tzSpsR76M= omar@omar-Predator-PT315-52"

  master {
    disk_size = 23
    node = 2
    name = "mr"
    cpu = 2
    publicip = true
    memory = 2048
  }
  workers {
    disk_size = 15
    node = 2
    name = "w0"
    cpu = 2
    memory = 2048
  }
  workers {
    disk_size = 14
    node = 4
    name = "w2"
    cpu = 1
    memory = 2048
  }
  workers {
    disk_size = 13
    node = 4
    name = "w3"
    cpu = 1
    memory = 2048
  }
}


output "master_public_ip" {
    value = grid_kubernetes.k8s1.master[0].computedip
}

output "wg_config" {
    value = grid_network.net1.access_wg_config
}
```

## Demo

- see [Demo](./terraform_k8s_demo.md)
