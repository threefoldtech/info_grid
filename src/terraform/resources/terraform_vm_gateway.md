![ ](../advanced/img/terraform_.png)

# Terraform Web Gateway With VM

## Expose with prefix

A complete list of gateway name workload parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/name_proxy.md).

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

# this data source is used to break circular dependency in cases similar to the following:
# vm: needs to know the domain in its init script
# gateway_name: needs the ip of the vm to use as backend.
# - the fqdn can be computed from grid_gateway_domain for the vm
# - the backend can reference the vm ip directly
data "grid_gateway_domain" "domain" {
  node = 7
  name = "ashraf"
}
resource "grid_network" "net1" {
    nodes = [8]
    ip_range = "10.1.0.0/24"
    name = "network"
    description = "newer network"
    add_wg_access = true
}
resource "grid_deployment" "d1" {
  node = 8
  network_name = grid_network.net1.name
  ip_range = lookup(grid_network.net1.nodes_ip_range, 8, "")
  vms {
    name = "vm1"
    flist = "https://hub.grid.tf/tf-official-apps/strm-helloworld-http-latest.flist"
    cpu = 2
    publicip = true
    memory = 1024
    env_vars = {
      SSH_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDTwULSsUubOq3VPWL6cdrDvexDmjfznGydFPyaNcn7gAL9lRxwFbCDPMj7MbhNSpxxHV2+/iJPQOTVJu4oc1N7bPP3gBCnF51rPrhTpGCt5pBbTzeyNweanhedkKDsCO2mIEh/92Od5Hg512dX4j7Zw6ipRWYSaepapfyoRnNSriW/s3DH/uewezVtL5EuypMdfNngV/u2KZYWoeiwhrY/yEUykQVUwDysW/xUJNP5o+KSTAvNSJatr3FbuCFuCjBSvageOLHePTeUwu6qjqe+Xs4piF1ByO/6cOJ8bt5Vcx0bAtI8/MPApplUU/JWevsPNApvnA/ntffI+u8DCwgP ashraf@thinkpad"
    }
    planetary = true
  }
}
resource "grid_name_proxy" "p1" {
  node = 7
  name = "ashraf"
  backends = [format("http://%s", split("/", grid_deployment.d1.vms[0].computedip)[0])]
  tls_passthrough = false
}
output "fqdn" {
    value = data.grid_gateway_domain.domain.fqdn
}
output "node1_zmachine1_ip" {
    value = grid_deployment.d1.vms[0].ip
}
output "public_ip" {
    value = split("/",grid_deployment.d1.vms[0].computedip)[0]
}

output "ygg_ip" {
    value = grid_deployment.d1.vms[0].ygg_ip
}

```

please note to use grid_name_proxy you should choose a node that has public config and has a domain in its public config like node 7 in the following example
![ ](./img/graphql_publicconf.png)

Here

- we created a grid domain resource `ashraf` to be deployed on gateway node `7` to end up with a domain `ashraf.ghent01.devnet.grid.tf`
- we create a proxy for the gateway to send the traffic coming to `ashraf.ghent01.devnet.grid.tf` to the vm as a backend, we say `tls_passthrough is false` to let the gateway terminate the traffic, if you replcae it with `true` your backend service needs to be able to do the TLS termination

## Expose with fulldomain

A complete list of gateway fqdn workload parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/fqdn_proxy.md).

it is more like the above example the only difference is you need to create an `A record` on your name provider for `remote.omar.grid.tf` to gateway node `7` IPv4.

```

resource "grid_fqdn_proxy" "p1" {
  node = 7
  name = "workloadname"
  fqdn = "remote.omar.grid.tf"
  backends = [format("http://%s", split("/", grid_deployment.d1.vms[0].computedip)[0])]
  tls_passthrough = true
}

output "fqdn" {
    value = grid_fqdn_proxy.p1.fqdn
}
```
