## Deploying Gateways

## Required Flags

- name: name of the deployment.
- backends: list of backends the gateway will forward requests to.

## Optional Flags

- node: node id gateway should be deployed on.
- farm: farm id gateway should be deployed on, if set choose available node from farm that fits vm specs (default 1). note: node and farm flags cannot be set both.
- tls: add TLS passthrough option (default false).

### Gateway Name

Specify the gateway name, node and backends:

```console
$ tf-grid-cli deploy gateway name -n examplegateway --node 14 --backends http://[300:e9c4:9048:57cf:7da2:ac99:99db:8821]:80
3:34PM INF deploying gateway name
3:34PM INF fqdn: examplegateway.gent01.dev.grid.tf
```

Get deployed gateway using deployment name:

```console
$ tf-grid-cli get gateway name examplegateway
```

Cancel deployed gateway using deployment name:

```console
$ tf-grid-cli cancel examplegateway
3:37PM INF canceling contracts for project examplegateway
3:37PM INF examplegateway canceled
```

### Gateway FQDN

Specify the gateway name, node, backends and FQDN:

```console
$ tf-grid-cli deploy gateway name -n examplegateway --node 14 --backends http://[300:e9c4:9048:57cf:7da2:ac99:99db:8821]:80 --fqdn example.com
3:34PM INF deploying gateway fqdn
3:34PM INF gateway fqdn deployed
```

Get deployed gateway using deployment name:

```console
$ tf-grid-cli get gateway fqdn examplegateway
```

Cancel deployed gateway using deployment name:

```console
$ tf-grid-cli cancel examplegateway
3:37PM INF canceling contracts for project examplegateway
3:37PM INF examplegateway canceled
```

#### FQDN Required Flags

- fqdn: FQDN pointing to the specified node.
