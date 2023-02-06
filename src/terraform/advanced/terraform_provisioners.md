![ ](./img//terraform_.png)

# Deploying a VM and apply provisioner commands after deployment

In this example we will see how to deploy a VM and apply provisioner commands on it on the Threefold grid v3

!!!code url:'https://github.com/threefoldtech/terraform-provider-grid/blob/development/examples/resources/external_provisioner/remote-exec_hello-world/main.tf'

## Params docs
### Requirements
- the machine should have `ssh server` running
- the machine should have `scp` installed
### Connection Block
- defines how we will connect to the deployed machine 
```
   connection {
    type     = "ssh"
    user     = "root"
    agent    = true
    host     = grid_deployment.d1.vms[0].ygg_ip
  }
```
type: defines the used service to connect to
user: the connecting users
agent: if used the provisoner will use the default key to connect to the remote machine
host: the ip/host of the remote machine
### Provisioner Block
- defines the actual provisioner behaviour
```
   provisioner "remote-exec" {
    inline = [
      "echo 'Hello world!' > /root/readme.txt"
    ]
  }
```
- remote-exec: the provisoner type we are willing to use can be remote, local or another type
- inline: This is a list of command strings. They are executed in the order they are provided. This cannot be provided with script or scripts.
- script: This is a path (relative or absolute) to a local script that will be copied to the remote resource and then executed. This cannot be provided with inline or scripts.
- scripts: his is a list of paths (relative or absolute) to local scripts that will be copied to the remote resource and then executed. They are executed in the order they are provided. This cannot be provided with inline or script.

## More Info
A complete list of provisioner parameters can be found [here](https://www.terraform.io/language/resources/provisioners/remote-exec).
