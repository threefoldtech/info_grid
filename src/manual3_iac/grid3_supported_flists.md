Supported flists

## alpine
- [Alpine](https://hub.grid.tf/tf-official-apps/threefoldtech-alpine-3.flist)
### entrypoint

`/entrypoint.sh`

### env vars
- `SSH_KEY`

## ubuntu
- [Ubuntu](https://hub.grid.tf/tf-official-apps/threefoldtech-ubuntu-20.04.flist)

### entrypoint
`/init.sh`

### env vars
- `SSH_KEY`

## centos
- [CentOS](https://hub.grid.tf/tf-official-apps/threefoldtech-centos-8.flist)

### entrypoint
`/entrypoint.sh`

### env vars
- `SSH_KEY`

## k3s
- [K3s](https://hub.grid.tf/ahmed_hanafy_1/ahmedhanafy725-k3s-latest.flist) 

### entrypoint
 
 `/sbin/zinit init`

### env vars
- `SSH_KEY`
- `K3S_TOKEN`
- `K3S_DATA_DIR`
- `K3S_FLANNEL_IFACE`
- `K3S_NODE_NAME`
- `K3S_URL` `https://${masterIp}:6443`

