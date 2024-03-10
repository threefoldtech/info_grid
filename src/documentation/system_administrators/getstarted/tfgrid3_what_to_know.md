# TFGrid 3.0 Whats There To Know

- [Storage Concepts](./tfgrid3_storage_concepts.md)
- [Network Concepts](./tfgrid3_network_concepts.md)

## Networking

### Private network (ZNET)

For a project that needs a private network, we need a network that can span across multiple nodes, this can be achieved by the network workload reservation [Network](/getstarted/tfgrid3_network_concepts.md)

### Planetary network

For a project that want their workloads directly connected to the planetary network we will need the option planetary enabled when deploying a VM or kubernetes. Check [Planetary network](https://library.threefold.me/info/threefold#/technology/threefold__planetary_network) for more info about 

### Public IPs
When you want to have a public IP assigned to your workload, you need to reserve the number of IPs along with your contract and then you can attach it to the VM workload

## Exposing the workloads to the public

Typically, if you reserved a public IP you can do that directly and create a domain referencing you public IP. Threefold provides also [Webgateway technology](https://library.threefold.me/info/threefold#/technology/threefold__webgw) a very cost-efficient technology to help with exposing your workloads

### how it works
Basically you create a `domain reservation` that can be 
- `prefix` based e.g `mywebsite` that will internally translate to `mywebsite.ghent01.devnet.grid.tf` 
- `full domain` e.g `mysuperwebsite.com`  (this needs to point to the gateway IP)

And then you need to specify the yggrassil IP of your backend service, so the gateway knows where to redirect the traffic

#### TLS
As a user, you have two options
- let the gateway terminate the TLS traffic for you and communicate with your workloads directly 
- let the gateway forward the traffic to your backend and you do the termination yourself (the recommended way if you are doing any sensitive business)


## Compute

VM workload is the only workload that you will need to run a full blown VM or an [flist-based](/flist_hub/flist_hub.md) container

### How can I create an flist?

The easiest way is by converting existing docker images using [the hub](https://hub.grid.tf/docker-convert)


### How flist-based container run in a VM?
ZOS injects its own generic kernel while booting the container based on the content of the filesystem

### kubernetes 
We leverage the VM primitive to allow provisioning kubernetes clusters across multiple nodes based on k3os flist.


## Exploring the capacity
You can easily check using [explorer-ui](dashboard/explorer/explorer_home.md) , also to plan your deployment you can use these [example queries](dashboard/explorer/explorer_graphql_examples.md)

## Getting started

Please check [Getting started](/getstarted/tfgrid3_getstarted.md) to get the necessary software / configurations

