## Deploying Gateways

### Gateway Name

Specify the Gateway name, node and backends:

```console
$ tf-grid deploy gateway name -n examplegateway --node 14 --backends http://[300:e9c4:9048:57cf:7da2:ac99:99db:8821]:80
3:34PM INF deploying gateway name
3:34PM INF fqdn: examplegateway.gent01.dev.grid.tf
```

Cancel deployed Gateway using deployment name:

```console
$ tf-grid cancel examplegateway
3:37PM INF canceling contracts for project examplegateway
3:37PM INF examplegateway canceled
```

Check out Gateway Name commands [docs](https://github.com/threefoldtech/grid3_client_go/blob/development/docs/cli/gateway-name.md) for more details.

### Gateway FQDN

Specify the Gateway name, node, backends and FQDN:

```console
$ tf-grid deploy gateway name -n examplegateway --node 14 --backends http://[300:e9c4:9048:57cf:7da2:ac99:99db:8821]:80 --fqdn example.com
3:34PM INF deploying gateway fqdn
3:34PM INF gateway fqdn deployed
```

Cancel deployed Gateway using deployment name:

```console
$ tf-grid cancel examplegateway
3:37PM INF canceling contracts for project examplegateway
3:37PM INF examplegateway canceled
```

Check out Gateway FQDN commands [docs](https://github.com/threefoldtech/tf-grid-cli/blob/development/docs/gateway-fqdn.md) for more details.
