<h1> Introducing Grid Proxy </h1>

## About

The TFGrid client Proxy acts as an interface to access information about the grid. It supports features such as filtering, limitation, and pagination to query the various entities on the grid like nodes, contracts and farms. Additionally the proxy can contact the required twin ID to retrieve stats about the relevant objects and performing ZOS calls.

The proxy is used as the backend of several threefold projects like:

- [Dashboard](../../dashboard/dashboard.md)

<!-- Usage -->

## How to Use the Project

If you don't want to care about setting up your instance you can use one of the live instances. each works against a different TFChain network.

- Dev network: <https://gridproxy.dev.grid.tf>
  - Swagger: <https://gridproxy.dev.grid.tf/swagger/index.html>
- Qa network: <https://gridproxy.qa.grid.tf>
  - Swagger: <https://gridproxy.qa.grid.tf/swagger/index.html>
- Test network: <https://gridproxy.test.grid.tf>
  - Swagger: <https://gridproxy.test.grid.tf/swagger/index.html>
- Main network: <https://gridproxy.grid.tf>
  - Swagger: <https://gridproxy.grid.tf/swagger/index.html>

Or follow the [development guide](#start-for-development) to run yours.
By default, the instance runs against devnet. to configure that you will need to config this while running the server.

> Note: You may face some differences between each instance and the others. that is normal because each network is in a different stage of development and works correctly with others parts of the Grid on the same network.

<!-- Prerequisites -->
## Used Technologies & Prerequisites

1. **GoLang**: Mainly the two parts of the project written in `Go 1.17`, otherwise you can just download the compiled binaries from github [releases](https://github.com/threefoldtech/tfgrid-sdk-go/releases)
2. **Postgresql**: Used to load the TFGrid DB
3. **Docker**: Containerize the running services such as Postgres and Redis.
4. **Mnemonics**: Secret seeds for adummy identity to use for the relay client.

For more about the prerequisites and how to set up and configure them. follow the [Setup guide](./setup.md)

<!-- Development -->

## Start for Development

To start the services for development or testing make sure first you have all the [Prerequisites](#used-technologies--prerequisites).

- Clone this repo
  
  ```bash
   git clone https://github.com/threefoldtech/tfgrid-sdk-go.git
   cd tfgrid-sdk-go/grid-proxy
  ```

- The `Makefile` has all that you need to deal with Db, Explorer, Tests, and Docs.

  ```bash
   make help     # list all the available subcommands.
  ```

- For a quick test explorer server.
  
  ```bash
   make all-start e=<MNEMONICS>
  ```

  Now you can access the server at `http://localhost:8080`
- Run the tests
  
  ```bash
   make test-all
  ```

- Generate docs.

  ```bash
   make docs
  ```

To run in development environment see [here](./db_testing.md) how to generate test db or load a db dump then use:

```sh
go run cmds/proxy_server/main.go --address :8080 --log-level debug -no-cert --postgres-host 127.0.0.1 --postgres-db tfgrid-graphql --postgres-password postgres --postgres-user postgres --mnemonics <insert user mnemonics>
```

Then visit `http://localhost:8080/<endpoint>`

For more illustrations about the commands needed to work on the project, see the section [Commands](./commands.md). For more info about the project structure and contributions guidelines check the section [Contributions](./contributions.md).

<!-- Production-->

## Setup for Production

## Get and Install the Binary

- You can either build the project:

  ```bash
   make build
   chmod +x cmd/proxy_server/server \
    && mv cmd/proxy_server/server /usr/local/bin/gridproxy-server
  ```

- Or download a release:
  Check the [releases](https://github.com/threefoldtech/tfgrid-sdk-go/releases) page and edit the next command with the chosen version.

  ```bash
   wget https://github.com/threefoldtech/tfgrid-sdk-go/releases/download/v1.6.7-rc2/tfgridclient_proxy_1.6.7-rc2_linux_amd64.tar.gz \
    && tar -xzf tfgridclient_proxy_1.6.7-rc2_linux_amd64.tar.gz \
    && chmod +x server \
    && mv server /usr/local/bin/gridproxy-server
  ```

## Add as a Systemd Service

- Create the service file

  ```bash
  cat << EOF > /etc/systemd/system/gridproxy-server.service
  [Unit]
  Description=grid proxy server
  After=network.target

  [Service]
  ExecStart=gridproxy-server --domain gridproxy.dev.grid.tf --email omar.elawady.alternative@gmail.com -ca https://acme-v02.api.letsencrypt.org/directory --substrate wss://tfchain.dev.grid.tf/ws --postgres-host 127.0.0.1 --postgres-db db --postgres-password password --postgres-user postgres --mnemonics <insert user mnemonics>
  Type=simple
  Restart=always
  User=root
  Group=root

  [Install]
  WantedBy=multi-user.target
  Alias=gridproxy.service
  EOF
  ```

