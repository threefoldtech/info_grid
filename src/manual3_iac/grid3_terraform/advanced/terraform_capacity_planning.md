![ ](./img/terraform_.png)

## Capacity planning

In this example we will discuss capacity planning on top of Threefold grid v3


## Example

!!!code url:'https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/simple-dynamic/main.tf'


### preparing the requests


```terraform
resource "grid_scheduler" "sched" {
  # a machine for the first server instance
  requests {
    name = "server1"
    cru = 1
    sru = 256
    mru = 256
  }
  # a machine for the second server instance
  requests {
    name = "server2"
    cru = 1
    sru = 256
    mru = 256
  }
  # a name workload
  requests {
    name = "gateway"
    ipv4 = true
    farm = "Freefarm"
  }
}
```
Here we define a `list` of requests, each request has a name and filter options e.g `cru`, `sru`, `mru`, having `ipv4` or not 

And after that in our code we can reference the grid_scheduler object with the request name to be used instead of node_id 

for example

```terraform
resource "grid_deployment" "server1" {
  node = grid_scheduler.sched.nodes["server1"]
  network_name = grid_network.net1.name
  ip_range = lookup(grid_network.net1.nodes_ip_range, grid_scheduler.sched.nodes["server1"], "")
  vms {
    name = "firstserver"
    flist = "https://hub.grid.tf/omar0.3bot/omarelawady-simple-http-server-latest.flist"
    cpu = 1
    memory = 256
    rootfs_size = 256
    entrypoint = "/main.sh"
    env_vars = {
      SSH_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQCtCuUUCZGLZ4NoihAiUK8K0kSoTR1WgIaLQKqMdQ/99eocMLqJgQMRIp8lueFG7SpcgXVRzln8KNKZX1Hm8lcrXICr3dnTW/0bpEnF4QOGLYZ/qTLF5WmoCgKyJ6WO96GjWJBsZPads+RD0WeiijV7jj29lALsMAI8CuOH0pcYUwWsRX/I1z2goMPNRY+PBjknMYFXEqizfUXqUnpzF3w/bKe8f3gcrmOm/Dxh1nHceJDW52TJL/sPcl6oWnHZ3fY4meTiAS5NZglyBF5oKD463GJnMt/rQ1gDNl8E4jSJUArN7GBJntTYxFoFo6zxB1OsSPr/7zLfPG420+9saBu9yN1O9DlSwn1ZX+Jg0k7VFbUpKObaCKRmkKfLiXJdxkKFH/+qBoCCnM5hfYxAKAyQ3YCCP/j9wJMBkbvE1QJMuuoeptNIvSQW6WgwBfKIK0shsmhK2TDdk0AHEnzxPSkVGV92jygSLeZ4ur/MZqWDx/b+gACj65M3Y7tzSpsR76M= omar@omar-Predator-PT315-52"
    }
    env_vars = {
        PATH = "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
    }

    planetary = true
  }
}
```


> Note: you need to call `distinct` while specifying the nodes in the network, because the scheduler may assign server1, server2 on the same node.