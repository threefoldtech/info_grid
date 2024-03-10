<h1> Supported Flists </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Flists and Parameters](#flists-and-parameters)
- [More Flists](#more-flists)

***

## Introduction

We provide basic information on the currently supported Flists.

## Flists and Parameters

|flist|entrypoint|env vars|
|:--:|:--:|--|
|[Alpine](https://hub.grid.tf/tf-official-apps/threefoldtech-alpine-3.flist.md)|`/entrypoint.sh`|`SSH_KEY`|
|[Ubuntu](https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist.md)|`/init.sh`|`SSH_KEY`|
|[CentOS](https://hub.grid.tf/tf-official-apps/threefoldtech-centos-8.flist.md)|`/entrypoint.sh`|`SSH_KEY`|
|[K3s](https://hub.grid.tf/tf-official-apps/threefoldtech-k3s-latest.flist.md)|`/sbin/zinit init`|- `SSH_KEY` <br/>- `K3S_TOKEN` <br/>- `K3S_DATA_DIR`<br/>- `K3S_FLANNEL_IFACE`<br/>- `K3S_NODE_NAME`<br/> - `K3S_URL` `https://${masterIp}:6443`|

## More Flists

You can convert any docker image to an flist. Feel free to explore the different possibilities on the [ThreeFold Hub](https://hub.grid.tf/).