!!!include:grid3_javascript_loadclient

## Deploying a VM

### Example code

!!!code url:https://github.com/threefoldtech/grid3_client_ts/blob/development/scripts/single_vm.ts


### Detailed explanation


#### building network

```typescript
// create network Object
const n = new NetworkModel();
n.name = "montest";
n.ip_range = "10.232.0.0/16";
```
Here we prepare the network model that is going to be used by specifying a name to our network and the range it will be spanning over


### building the disk model

```typescript
// create disk Object
const disk = new DiskModel();
disk.name = "newDisk";
disk.size = 10;
disk.mountpoint = "/newDisk";
```
here we create the disk model specifying its name, size in GB and where it will be mounted eventually

### building the VM

```typescript
// create vm node Object
const vm = new MachineModel();
vm.name = "testvm";
vm.node_id = 4;
vm.disks = [disk];
vm.public_ip = false;
vm.planetary = true;
vm.cpu = 1;
vm.memory = 1024 * 2;
vm.rootfs_size = 1;
vm.flist = "https://hub.grid.tf/tf-official-apps/base:latest.flist";
vm.entrypoint = "/sbin/zinit init";
vm.env = {
    SSH_KEY:
        "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQDWlguBuvfQikkRJZXkLPei7Scvo/OULUEvjWVR4tCZ5V85P2F4SsSghxpRGixCNc7pNtgvdwJegK06Tn7SkV2jYJ9kBJh8PA06CPSz1mnpco4cgktiWx/R8xBvLGlyO0BwUuD3/WFjrc6fzH9E7Bpkel/xTnacx14w1bZAC1R35hz7BaHu1WrXsfxEd0VH7gpMPoQ4+l+H38ULPTiC+JcOKJOqVafgcc0sU7otXbgCa1Frr4QE5bwiMYhOlsRfRv/hf08jYsVo+RUO3wD12ylLWR7a7sJDkBBwgir8SwAvtRlT6k9ew9cDMQ7H8iWNCOg2xqoTLpVag6RN9kGzA5LGL+qHEcBr6gd2taFEy9+mt+TWuKp6reUeJfTu9RD1UgB0HpcdgTHtoUTISW7Mz4KNkouci2DJFngDWrLRxRoz81ZwfI2hjFY0PYDzF471K7Nwwt3qKYF1Js9a6VO38tMxSU4mTO83bt+dUFozgpw2Y0KKJGHDwU66i2MvTPg3EGs= ayoub@ayoub-Inspiron-3576",
};

```
Now we go to the VM model, that will be used to build our `zmachine` object

We need to specify its
- name
- node_id: where it will get deployed
- disks: disks model collection
- memory
- root filesystem size
- flist: the image it is going to start from. Check the [supported flists](grid3_supported_flists)
- entry point: entrypoint command / script to execute
- env: has the environment variables needed e.g sshkeys used
- public ip: if we want to have a public ip attached to the VM
- planetary: to enable planetary network on VM


### building VMs collection


```typescript
// create VMs Object
const vms = new MachinesModel();
vms.name = "monVMS";
vms.network = n;
vms.machines = [vm];
vms.metadata = "{'testVMs': true}";
vms.description = "test deploying VMs via ts grid3 client";
```
Here it's quite simple we can add one or more VM to the `machines` property to have them deployed as part of our project


### deployment

```typescript
// deploy vms
const res = await grid3.machines.deploy(vms);
log(res);
```

### getting deployment information

can do so based on the name you gave to the `vms` collection
```typescript
// get the deployment
const l = await grid3.machines.getObj(vms.name);
log(l);
```


### deleting a deployment

```typescript
// delete
const d = await grid3.machines.delete({ name: vms.name });
log(d);
```
In the underlying layer we cancel the contracts that were created on the chain and as a result all of the workloads tied to his project will get deleted.