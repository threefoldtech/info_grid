```terraform
resource "grid_network" "net" {
    nodes = [2]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
}

resource "grid_deployment" "d1" {
  node = 2
  network_name = grid_network.net.name
  ip_range = lookup(grid_network.net.nodes_ip_range, 2, "")
  disks {
    name = "mydisk1"
    size = 2
    description = "this is my disk description1"
    
  }
  disks {
    name = "mydisk2"
    size=2
    description = "this is my disk2"
  }
  vms {
    name = "vm1"
    flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist"
    cpu = 1
    memory = 1024
    entrypoint = "/sbin/zinit init"
    mounts {
      disk_name = "mydisk1"
      mount_point = "/opt"
    }
    mounts {
      disk_name = "mydisk2"
      mount_point = "/test"
    }
    env_vars = {
      SSH_KEY = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDTwULSsUubOq3VPWL6cdrDvexDmjfznGydFPyaNcn7gAL9lRxwFbCDPMj7MbhNSpxxHV2+/iJPQOTVJu4oc1N7bPP3gBCnF51rPrhTpGCt5pBbTzeyNweanhedkKDsCO2mIEh/92Od5Hg512dX4j7Zw6ipRWYSaepapfyoRnNSriW/s3DH/uewezVtL5EuypMdfNngV/u2KZYWoeiwhrY/yEUykQVUwDysW/xUJNP5o+KSTAvNSJatr3FbuCFuCjBSvageOLHePTeUwu6qjqe+Xs4piF1ByO/6cOJ8bt5Vcx0bAtI8/MPApplUU/JWevsPNApvnA/ntffI+u8DCwgP"
    }

  }
}
```
