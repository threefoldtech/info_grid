<h1>Running Proxy in Production</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Production Run](#production-run)
- [To upgrade the machine](#to-upgrade-the-machine)
- [Dockerfile](#dockerfile)
- [Update helm package](#update-helm-package)
- [Install the chart using helm package](#install-the-chart-using-helm-package)

***

## Introduction

We show how to run grid proxy in production.

## Production Run

- Download the latest binary [here](https://github.com/threefoldtech/tfgrid-sdk-go/tree/development/grid-client)
- add the execution permission to the binary and move it to the bin directory

  ```bash
  chmod +x ./gridproxy-server
  mv ./gridproxy-server /usr/local/bin/gridproxy-server
  ```

- Add a new systemd service

```bash
cat << EOF > /etc/systemd/system/gridproxy-server.service
[Unit]
Description=grid proxy server
After=network.target

[Service]
ExecStart=gridproxy-server --domain gridproxy.dev.grid.tf --email omar.elawady.alternative@gmail.com -ca https://acme-v02.api.letsencrypt.org/directory --postgres-host 127.0.0.1 --postgres-db db --postgres-password password --postgres-user postgres --mnemonics <insert user mnemonics>
Type=simple
Restart=always
User=root
Group=root

[Install]
WantedBy=multi-user.target
Alias=gridproxy.service
EOF
```

- enable the service

  ```bash
   systemctl enable gridproxy.service
  ```

- start the service

  ```bash
  systemctl start gridproxy.service
  ```

- check the status

  ```bash
  systemctl status gridproxy.service
  ```

- The command options:
  - domain: the host domain which will generate ssl certificate to.
  - email: the mail used to run generate the ssl certificate.
  - ca: certificate authority server url, e.g.
    - let's encrypt staging: `https://acme-staging-v02.api.letsencrypt.org/directory`
    - let's encrypt production: `https://acme-v02.api.letsencrypt.org/directory`
  - postgres -\*: postgres connection info.

## To upgrade the machine

- just replace the binary with the new one and apply

```bash
systemctl restart gridproxy-server.service
```

- it you have changes in the `/etc/systemd/system/gridproxy-server.service` you have to run this command first

```bash
systemctl daemon-reload
```

## Dockerfile

To build & run dockerfile

```bash
docker build -t threefoldtech/gridproxy .
docker run --name gridproxy -e POSTGRES_HOST="127.0.0.1" -e POSTGRES_PORT="5432" -e POSTGRES_DB="db" -e POSTGRES_USER="postgres" -e POSTGRES_PASSWORD="password" -e MNEMONICS="<insert user mnemonics>" threefoldtech/gridproxy
```

## Update helm package

- Do `helm lint charts/gridproxy`
- Regenerate the packages `helm package -u charts/gridproxy`
- Regenerate index.yaml `helm repo index --url https://threefoldtech.github.io/tfgridclient_proxy/ .`
- Push your changes

## Install the chart using helm package

- Adding the repo to your helm

  ```bash
  helm repo add gridproxy https://threefoldtech.github.io/tfgridclient_proxy/
  ```

- install a chart

  ```bash
  helm install gridproxy/gridproxy
  ```
