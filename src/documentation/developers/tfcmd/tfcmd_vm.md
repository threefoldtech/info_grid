
<h1>Deploy a VM</h1>

# Introduction

In this section, we explore how to deploy a virtual machine (VM) on the ThreeFold Grid using `tfcmd`. 

# Deploy

You can deploy a VM with `tfcmd` using the following template accompanied by required and optional flags:

```bash
tfcmd deploy vm [flags]
```

## Flags

When you use `tfcmd`, there are two required flags (`name` and `ssh`), while the other remaining flags are optional. Using such optional flags can be used to deploy a VM with a GPU for example or to set an IPv6 address and much more.

### Required Flags

- **name**: name for the VM deployment also used for canceling the deployment. The name must be unique.
- **ssh**: path to public ssh key to set in the VM.

### Optional Flags

- **node**: node ID the VM should be deployed on.
- **farm**: farm ID the VM should be deployed on, if set choose available node from farm that fits vm specs (default `1`). Note: node and farm flags cannot both be set.
- **cpu**: number of cpu units (default `1`).
- **disk**: size of disk in GB mounted on `/data`. If not set, no disk workload is made.
- **entrypoint**: entrypoint for the VM FList (default `/sbin/zinit init`). Note: setting this without the flist option will fail.
- **flist**: FList used in the VM (default `https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist`). Note: setting this without the entrypoint option will fail.
- **ipv4**: assign public ipv4 for the VM (default `false`).
- **ipv6**: assign public ipv6 for the VM (default `false`).
- **memory**: memory size in GB (default `1`).
- **rootfs**: root filesystem size in GB (default `2`).
- **ygg**: assign yggdrasil ip for the VM (default `true`).
- **mycelium**: assign Mycelium ip for the VM (default `true`).
- **gpus**: assign a list of gpus' IDs to the VM. Note: setting this without the node option will fail.

## Examples

We present simple examples on how to deploy a virtual machine with or without a GPU using `tfcmd`.

### Deploy a VM without GPU

```console
$ tfcmd deploy vm --name examplevm --ssh ~/.ssh/id_rsa.pub --cpu 2 --memory 4 --disk 10
12:06PM INF deploying network
12:06PM INF deploying vm
12:07PM INF vm yggdrasil ip: 300:e9c4:9048:57cf:7da2:ac99:99db:8821
```
### Deploy a VM with GPU

```console
$ tfcmd deploy vm --name examplevm --ssh ~/.ssh/id_rsa.pub --cpu 2 --memory 4 --disk 10 --gpus '0000:0e:00.0/1882/543f' --gpus '0000:0e:00.0/1887/593f' --node 12
12:06PM INF deploying network
12:06PM INF deploying vm
12:07PM INF vm yggdrasil ip: 300:e9c4:9048:57cf:7da2:ac99:99db:8821
```

# Get

To get the VM, use the following template:

```bash
tfcmd get vm <vm>
```

Make sure to replace `<vm>` with the name of the VM specified using `tfcmd`.

## Get Example

In the following example, the name of the deployment to get is `examplevm`.

```console
$ tfcmd get vm examplevm
11:56AM INF starting peer session=tf-1522837 twin=192
11:56AM INF vm:
{
        "Name": "examplevm",
        "NodeID": 11,
        "SolutionType": "vm/examplevm",
        "SolutionProvider": null,
        "NetworkName": "examplevmnetwork",
        "Disks": [
                {
                        "name": "examplevmdisk",
                        "size": 10,
                        "description": ""
                }
        ],
        "Zdbs": [],
        "Vms": [
                {
                        "name": "examplevm",
                        "flist": "https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist",
                        "flist_checksum": "",
                        "publicip": false,
                        "publicip6": false,
                        "planetary": true,
                        "corex": false,
                        "computedip": "",
                        "computedip6": "",
                        "planetary_ip": "302:9e63:7d43:b742:c2e0:ab69:e101:8032",
                        "mycelium_ip": "45f:6cd6:8c6d:6c73:ff0f:6c97:11e3:4e84",
                        "ip": "10.20.2.2",
                        "mycelium_ip_seed": "bJcR406E",
                        "description": "",
                        "gpus": null,
                        "cpu": 2,
                        "memory": 4096,
                        "rootfs_size": 2048,
                        "entrypoint": "/sbin/zinit init",
                        "mounts": [
                                {
                                        "name": "examplevmdisk",
                                        "mount_point": "/data"
                                }
                        ],
                        "zlogs": null,
                        "env_vars": {
                                "SSH_KEY": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDcGrS1RT36rHAGLK3/4FMazGXjIYgWVnZ4bCvxxg8KosEEbs/DeUKT2T2LYV91jUq3yibTWwK0nc6O+K5kdShV4qsQlPmIbdur6x2zWHPeaGXqejbbACEJcQMCj8szSbG8aKwH8Nbi8BNytgzJ20Ysaaj2QpjObCZ4Ncp+89pFahzDEIJx2HjXe6njbp6eCduoA+IE2H9vgwbIDVMQz6y/TzjdQjgbMOJRTlP+CzfbDBb6Ux+ed8F184bMPwkFrpHs9MSfQVbqfIz8wuq/wjewcnb3wK9dmIot6CxV2f2xuOZHgNQmVGratK8TyBnOd5x4oZKLIh3qM9Bi7r81xCkXyxAZbWYu3gGdvo3h85zeCPGK8OEPdYWMmIAIiANE42xPmY9HslPz8PAYq6v0WwdkBlDWrG3DD3GX6qTt9lbSHEgpUP2UOnqGL4O1+g5Rm9x16HWefZWMjJsP6OV70PnMjo9MPnH+yrBkXISw4CGEEXryTvupfaO5sL01mn+UOyE= abdulrahman@AElawady-PC\n"
                        },
                        "network_name": "examplevmnetwork",
                        "console_url": "10.20.2.0:20002"
                }
        ],
        "QSFS": [],
        "NodeDeploymentID": {
                "11": 100063
        },
        "ContractID": 100063,
        "IPrange": "10.20.2.0/24"
}
```

# Cancel

To cancel your VM deployment, use the following template:

```bash
tfcmd cancel <deployment-name>
```

Make sure to replace `<deployment-name>` with the name of the deployment specified using `tfcmd`.

## Cancel Example

In the following example, the name of the deployment to cancel is `examplevm`.

```console
$ tfcmd cancel examplevm
3:37PM INF canceling contracts for project examplevm
3:37PM INF examplevm canceled
```

