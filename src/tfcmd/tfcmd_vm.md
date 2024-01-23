
<h1>Deploy a VM</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Deploy](#deploy)
  - [Flags](#flags)
    - [Required Flags](#required-flags)
    - [Optional Flags](#optional-flags)
  - [Examples](#examples)
    - [Deploy a VM without GPU](#deploy-a-vm-without-gpu)
    - [Deploy a VM with GPU](#deploy-a-vm-with-gpu)
- [Get](#get)
  - [Get Example](#get-example)
- [Cancel](#cancel)
  - [Cancel Example](#cancel-example)
- [Questions and Feedback](#questions-and-feedback)

***

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
3:20PM INF vm:
{
        "Name": "examplevm",
        "NodeID": 15,
        "SolutionType": "examplevm",
        "SolutionProvider": null,
        "NetworkName": "examplevmnetwork",
        "Disks": [
                {
                        "Name": "examplevmdisk",
                        "SizeGB": 10,
                        "Description": ""
                }
        ],
        "Zdbs": [],
        "Vms": [
                {
                        "Name": "examplevm",
                        "Flist": "https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist",
                        "FlistChecksum": "",
                        "PublicIP": false,
                        "PublicIP6": false,
                        "Planetary": true,
                        "Corex": false,
                        "ComputedIP": "",
                        "ComputedIP6": "",
                        "YggIP": "301:ad3a:9c52:98d1:cd05:1595:9abb:e2f1",
                        "IP": "10.20.2.2",
                        "Description": "",
                        "CPU": 2,
                        "Memory": 4096,
                        "RootfsSize": 2048,
                        "Entrypoint": "/sbin/zinit init",
                        "Mounts": [
                                {
                                        "DiskName": "examplevmdisk",
                                        "MountPoint": "/data"
                                }
                        ],
                        "Zlogs": null,
                        "EnvVars": {
                                "SSH_KEY": "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDcGrS1RT36rHAGLK3/4FMazGXjIYgWVnZ4bCvxxg8KosEEbs/DeUKT2T2LYV91jUq3yibTWwK0nc6O+K5kdShV4qsQlPmIbdur6x2zWHPeaGXqejbbACEJcQMCj8szSbG8aKwH8Nbi8BNytgzJ20Ysaaj2QpjObCZ4Ncp+89pFahzDEIJx2HjXe6njbp6eCduoA+IE2H9vgwbIDVMQz6y/TzjdQjgbMOJRTlP+CzfbDBb6Ux+ed8F184bMPwkFrpHs9MSfQVbqfIz8wuq/wjewcnb3wK9dmIot6CxV2f2xuOZHgNQmVGratK8TyBnOd5x4oZKLIh3qM9Bi7r81xCkXyxAZbWYu3gGdvo3h85zeCPGK8OEPdYWMmIAIiANE42xPmY9HslPz8PAYq6v0WwdkBlDWrG3DD3GX6qTt9lbSHEgpUP2UOnqGL4O1+g5Rm9x16HWefZWMjJsP6OV70PnMjo9MPnH+yrBkXISw4CGEEXryTvupfaO5sL01mn+UOyE= abdulrahman@AElawady-PC\n"
                        },
                        "NetworkName": "examplevmnetwork"
                }
        ],
        "QSFS": [],
        "NodeDeploymentID": {
                "15": 22748
        },
        "ContractID": 22748
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

# Questions and Feedback

If you have any questions or feedback, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.