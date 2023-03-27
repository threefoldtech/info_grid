# Supported flists

## alpine

|flist|entrypoint|env vars|
|:--:|:--:|:--:|
|[Alpine](https://hub.grid.tf/tf-official-apps/threefoldtech-alpine-3.flist)|`/entrypoint.sh`|`SSH_KEY`|

## ubuntu

|flist|entrypoint|env vars|
|:--:|:--:|:--:|
|[Ubuntu](https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-22.04.flist)|`/init.sh`|`SSH_KEY`|

## centos

|flist|entrypoint|env vars|
|:--:|:--:|:--:|
|`https://hub.grid.tf/tf-official-apps/threefoldtech-centos-8.flist`|`/entrypoint.sh`|`SSH_KEY`|

## k3s

|flist|entrypoint|env vars|
|:--:|:--:|:--|
|[K3s](https://hub.grid.tf/tf-official-apps/threefoldtech-k3s-latest.flist)|`/sbin/zinit init`|<p>- `SSH_KEY` <p>- `K3S_TOKEN` <p>- `K3S_DATA_DIR`<p>- `K3S_FLANNEL_IFACE`<p>- `K3S_NODE_NAME`<p>- `K3S_URL` `https://${masterIp}:6443`|
