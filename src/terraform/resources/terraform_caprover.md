<h1> Terraform Caprover </h1>

<h2>Table of Contents</h2>

- [What is CapRover?](#what-is-caprover)
- [Features of Caprover](#features-of-caprover)
- [Prerequisites](#prerequisites)
- [How to Run CapRover on ThreeFold Grid 3](#how-to-run-caprover-on-threefold-grid-3)
  - [Clone the Project Repo](#clone-the-project-repo)
  - [A) leader node deployment/setup:](#a-leader-node-deploymentsetup)
    - [Step 1: Deploy a Leader Node](#step-1-deploy-a-leader-node)
    - [Step 2: Connect Root Domain](#step-2-connect-root-domain)
      - [Note](#note)
    - [Step 3: CapRover Root Domain Configurations](#step-3-caprover-root-domain-configurations)
    - [Step 4: Access the Captain Dashboard](#step-4-access-the-captain-dashboard)
      - [To allow cluster mode](#to-allow-cluster-mode)
  - [B) Worker Node Deployment/setup:](#b-worker-node-deploymentsetup)
- [Implementations Details:](#implementations-details)

***

## What is CapRover?

[CapRover](https://caprover.com/) is an easy-to-use app/database deployment and web server manager that works for a variety of applications such as Node.js, Ruby, PHP, Postgres, and MongoDB. It runs fast and is very robust, as it uses Docker, Nginx, LetsEncrypt, and NetData under the hood behind its user-friendly interface.
Here’s a link to CapRover's open source repository on [GitHub](https://github.com/caprover/caprover).

## Features of Caprover

- CLI for automation and scripting
- Web GUI for ease of access and convenience
- No lock-in: Remove CapRover and your apps keep working !
- Docker Swarm under the hood for containerization and clustering.
- Nginx (fully customizable template) under the hood for load-balancing.
- Let’s Encrypt under the hood for free SSL (HTTPS).
- **One-Click Apps** : Deploying one-click apps is a matter of seconds! MongoDB, Parse, MySQL, WordPress, Postgres and many more.
- **Fully Customizable** : Optionally fully customizable nginx config allowing you to enable HTTP2, specific caching logic, custom SSL certs and etc.
- **Cluster Ready** : Attach more nodes and create a cluster in seconds! CapRover automatically configures nginx to load balance.
- **Increase Productivity** : Focus on your apps ! Not the bells and whistles, just to run your apps.
- **Easy Deploy** : Many ways to deploy. You can upload your source from dashboard, use command line caprover deploy, use webhooks and build upon git push

## Prerequisites

- Domain Name:
  after installation, you will need to point a wildcard DNS entry to your CapRover IP Address.
  Note that you can use CapRover without a domain too. But you won't be able to setup HTTPS or add `Self hosted Docker Registry`.
- TerraForm installed to provision, adjust and tear down infrastructure using the tf configuration files provided here.
- Yggdrasil installed and enabled for End-to-end encrypted IPv6 networking.
- account created on [Polkadot](https://polkadot.js.org/apps/?rpc=wss://tfchain.dev.threefold.io/ws#/accounts) and got an twin id, and saved you mnemonics.
- TFTs in your account balance (in development, Transferer some test TFTs from ALICE account).

## How to Run CapRover on ThreeFold Grid 3

In this guide, we will use Caprover to setup your own private Platform as a service (PaaS) on TFGrid 3 infrastructure.

### Clone the Project Repo

```sh
git clone https://github.com/freeflowuniverse/freeflow_caprover.git
```

### A) leader node deployment/setup:

#### Step 1: Deploy a Leader Node

Create a leader caprover node using terraform, here's an example :

```
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

provider "grid" {
    mnemonics = "<your-mnemonics>"
    network = "dev" # or test to use testnet
}

resource "grid_network" "net0" {
    nodes = [4]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
    add_wg_access = true
}

resource "grid_deployment" "d0" {
  node = 4
  network_name = grid_network.net0.name
  ip_range = lookup(grid_network.net0.nodes_ip_range, 4, "")
  disks {
    name        = "data0"
    # will hold images, volumes etc. modify the size according to your needs
    size        = 20
    description = "volume holding docker data"
  }
  disks {
    name        = "data1"
    # will hold data reltaed to caprover conf, nginx stuff, lets encrypt stuff.
    size        = 5
    description = "volume holding captain data"
  }

  vms {
    name = "caprover"
    flist = "https://hub.grid.tf/samehabouelsaad.3bot/abouelsaad-caprover-tf_10.0.1_v1.0.flist"
    # modify the cores according to your needs
    cpu = 4
    publicip = true
    # modify the memory according to your needs
    memory = 8192
    entrypoint = "/sbin/zinit init"
    mounts {
      disk_name   = "data0"
      mount_point = "/var/lib/docker"
    }
    mounts {
      disk_name   = "data1"
      mount_point = "/captain"
    }
    env_vars = {
      "PUBLIC_KEY" = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC9MI7fh4xEOOEKL7PvLvXmSeRWesToj6E26bbDASvlZnyzlSKFLuYRpnVjkr8JcuWKZP6RQn8+2aRs6Owyx7Tx+9kmEh7WI5fol0JNDn1D0gjp4XtGnqnON7d0d5oFI+EjQQwgCZwvg0PnV/2DYoH4GJ6KPCclPz4a6eXrblCLA2CHTzghDgyj2x5B4vB3rtoI/GAYYNqxB7REngOG6hct8vdtSndeY1sxuRoBnophf7MPHklRQ6EG2GxQVzAOsBgGHWSJPsXQkxbs8am0C9uEDL+BJuSyFbc/fSRKptU1UmS18kdEjRgGNoQD7D+Maxh1EbmudYqKW92TVgdxXWTQv1b1+3dG5+9g+hIWkbKZCBcfMe4nA5H7qerLvoFWLl6dKhayt1xx5mv8XhXCpEC22/XHxhRBHBaWwSSI+QPOCvs4cdrn4sQU+EXsy7+T7FIXPeWiC2jhFd6j8WIHAv6/rRPsiwV1dobzZOrCxTOnrqPB+756t7ANxuktsVlAZaM= sameh@sameh-inspiron-3576"
    # SWM_NODE_MODE env var is required, should be "leader" or "worker"
    # leader: will run sshd, containerd, dockerd as zinit services plus caprover service in leader mode which start caprover, lets encrypt, nginx containers.
    # worker: will run sshd, containerd, dockerd as zinit services plus caprover service in orker mode which only join the swarm cluster. check the wroker terrafrom file example.
      "SWM_NODE_MODE" = "leader"
    # CAPROVER_ROOT_DOMAIN is optional env var, by providing it you can access the captain dashboard after vm initilization by visiting http://captain.your-root-domain
    # otherwise you will have to add the root domain manually from the captain dashboard by visiting http://{publicip}:3000 to access the dashboard
      "CAPROVER_ROOT_DOMAIN" = "roverapps.grid.tf"
   }
  }
}

output "wg_config" {
    value = grid_network.net0.access_wg_config
}
output "ygg_ip" {
    value = grid_deployment.d0.vms[0].ygg_ip
}
output "vm_ip" {
    value = grid_deployment.d0.vms[0].ip
}
output "vm_public_ip" {
    value = grid_deployment.d0.vms[0].computedip
}
```

```bash
cd freeflow_caprover/terraform/leader/
vim main.tf
```

- In `provider` Block, add your `mnemonics` and specify the grid network to deploy on.
- In `resource` Block, update the disks size, memory size, and cores number to fit your needs or leave as it is for testing.
- In the `PUBLIC_KEY` env var value put your ssh public key .
- In the `CAPROVER_ROOT_DOMAIN` env var value put your root domain, this is optional and you can add it later from the dashboard put it will save you the extra step and allow you to access your dashboard using your domain name directly after the deployment.

- save the file, and execute the following commands:

  ```bash
  terraform init
  terraform apply
  ```

- wait till you see `apply complete`, and note the VM public ip in the final output.

- verify the status of the VM

  ```bash
  ssh root@{public_ip_address}
  zinit list
  zinit log caprover
  ```

  You will see output like this:

  ```bash
  root@caprover:~ # zinit list
  sshd: Running
  containerd: Running
  dockerd: Running
  sshd-init: Success
  caprover: Running
  root@caprover:~ # zinit log caprover
  [+] caprover: CapRover Root Domain: newapps.grid.tf
  [+] caprover: {
  [+] caprover:             "namespace": "captain",
  [+] caprover:             "customDomain": "newapps.grid.tf"
  [+] caprover:     }
  [+] caprover: CapRover will be available at http://captain.newapps.grid.    tf after installation
  [-] caprover: docker: Cannot connect to the Docker daemon at unix:///var/   run/docker.sock. Is the docker daemon running?.
  [-] caprover: See 'docker run --help'.
  [-] caprover: Unable to find image 'caprover/caprover:latest' locally
  [-] caprover: latest: Pulling from caprover/caprover
  [-] caprover: af4c2580c6c3: Pulling fs layer
  [-] caprover: 4ea40d27a2cf: Pulling fs layer
  [-] caprover: 523d612e9cd2: Pulling fs layer
  [-] caprover: 8fee6a1847b0: Pulling fs layer
  [-] caprover: 60cce3519052: Pulling fs layer
  [-] caprover: 4bae1011637c: Pulling fs layer
  [-] caprover: ecf48b6c1f43: Pulling fs layer
  [-] caprover: 856f69196742: Pulling fs layer
  [-] caprover: e86a512b6f8c: Pulling fs layer
  [-] caprover: cecbd06d956f: Pulling fs layer
  [-] caprover: cdd679ff24b0: Pulling fs layer
  [-] caprover: d60abbe06609: Pulling fs layer
  [-] caprover: 0ac0240c1a59: Pulling fs layer
  [-] caprover: 52d300ad83da: Pulling fs layer
  [-] caprover: 8fee6a1847b0: Waiting
  [-] caprover: e86a512b6f8c: Waiting
  [-] caprover: 60cce3519052: Waiting
  [-] caprover: cecbd06d956f: Waiting
  [-] caprover: cdd679ff24b0: Waiting
  [-] caprover: 4bae1011637c: Waiting
  [-] caprover: d60abbe06609: Waiting
  [-] caprover: 0ac0240c1a59: Waiting
  [-] caprover: 52d300ad83da: Waiting
  [-] caprover: 856f69196742: Waiting
  [-] caprover: ecf48b6c1f43: Waiting
  [-] caprover: 523d612e9cd2: Verifying Checksum
  [-] caprover: 523d612e9cd2: Download complete
  [-] caprover: 4ea40d27a2cf: Verifying Checksum
  [-] caprover: 4ea40d27a2cf: Download complete
  [-] caprover: af4c2580c6c3: Verifying Checksum
  [-] caprover: af4c2580c6c3: Download complete
  [-] caprover: 4bae1011637c: Verifying Checksum
  [-] caprover: 4bae1011637c: Download complete
  [-] caprover: 8fee6a1847b0: Verifying Checksum
  [-] caprover: 8fee6a1847b0: Download complete
  [-] caprover: 856f69196742: Verifying Checksum
  [-] caprover: 856f69196742: Download complete
  [-] caprover: ecf48b6c1f43: Verifying Checksum
  [-] caprover: ecf48b6c1f43: Download complete
  [-] caprover: e86a512b6f8c: Verifying Checksum
  [-] caprover: e86a512b6f8c: Download complete
  [-] caprover: cdd679ff24b0: Verifying Checksum
  [-] caprover: cdd679ff24b0: Download complete
  [-] caprover: d60abbe06609: Verifying Checksum
  [-] caprover: d60abbe06609: Download complete
  [-] caprover: cecbd06d956f: Download complete
  [-] caprover: 0ac0240c1a59: Verifying Checksum
  [-] caprover: 0ac0240c1a59: Download complete
  [-] caprover: 60cce3519052: Verifying Checksum
  [-] caprover: 60cce3519052: Download complete
  [-] caprover: af4c2580c6c3: Pull complete
  [-] caprover: 52d300ad83da: Download complete
  [-] caprover: 4ea40d27a2cf: Pull complete
  [-] caprover: 523d612e9cd2: Pull complete
  [-] caprover: 8fee6a1847b0: Pull complete
  [-] caprover: 60cce3519052: Pull complete
  [-] caprover: 4bae1011637c: Pull complete
  [-] caprover: ecf48b6c1f43: Pull complete
  [-] caprover: 856f69196742: Pull complete
  [-] caprover: e86a512b6f8c: Pull complete
  [-] caprover: cecbd06d956f: Pull complete
  [-] caprover: cdd679ff24b0: Pull complete
  [-] caprover: d60abbe06609: Pull complete
  [-] caprover: 0ac0240c1a59: Pull complete
  [-] caprover: 52d300ad83da: Pull complete
  [-] caprover: Digest:   sha256:39c3f188a8f425775cfbcdc4125706cdf614cd38415244ccf967cd1a4e692b4f
  [-] caprover: Status: Downloaded newer image for caprover/caprover:latest
  [+] caprover: Captain Starting ...
  [+] caprover: Overriding skipVerifyingDomains from /captain/data/   config-override.json
  [+] caprover: Installing Captain Service ...
  [+] caprover:
  [+] caprover:  Installation of CapRover is starting...
  [+] caprover: For troubleshooting, please see: https://caprover.com/docs/   troubleshooting.html
  [+] caprover:
  [+] caprover:
  [+] caprover:
  [+] caprover:
  [+] caprover:
  [+] caprover:  >>> Checking System Compatibility <<<
  [+] caprover:    Docker Version passed.
  [+] caprover:    Ubuntu detected.
  [+] caprover:    X86 CPU detected.
  [+] caprover:    Total RAM 8339 MB
  [+] caprover: Pulling: nginx:1
  [+] caprover: Pulling: caprover/caprover-placeholder-app:latest
  [+] caprover: Pulling: caprover/certbot-sleeping:v1.6.0
  [+] caprover: October 12th 2021, 12:49:26.301 pm    Fresh installation!
  [+] caprover: October 12th 2021, 12:49:26.309 pm    Starting swarm at   185.206.122.32:2377
  [+] caprover: Swarm started: z06ymksbcoren9cl7g2xzw9so
  [+] caprover: *** CapRover is initializing ***
  [+] caprover: Please wait at least 60 seconds before trying to access   CapRover.
  [+] caprover: ===================================
  [+] caprover:  **** Installation is done! *****
  [+] caprover: CapRover is available at http://captain.newapps.grid.tf
  [+] caprover: Default password is: captain42
  [+] caprover: ===================================
  ```

  Wait until you see \***\* Installation is done! \*\*\*** in the caprover service log.

#### Step 2: Connect Root Domain

After the container runs, you will now need to connect your CapRover instance to a Root Domain.

Let’s say you own example.com. You can set \*.something.example.com as an A-record in your DNS settings to point to the IP address of the server where you installed CapRover. To do this, go to the DNS settings in your domain provider website, and set a wild card A record entry.

For example: Type: A, Name (or host): \*.something.example.com, IP (or Points to): `110.122.131.141` where this is the IP address of your CapRover machine.

```yaml
TYPE: A record
HOST: \*.something.example.com
POINTS TO: (IP Address of your server)
TTL: (doesn’t really matter)
```

To confirm, go to https://mxtoolbox.com/DNSLookup.aspx and enter `somethingrandom.something.example.com` and check if IP address resolves to the IP you set in your DNS.

##### Note

`somethingrandom` is needed because you set a wildcard entry in your DNS by setting `*.something.example.com` as your host, not `something.example.com`.

#### Step 3: CapRover Root Domain Configurations

skip this step if you provided your root domain in the TerraFrom configuration file

Once the CapRover is initialized, you can visit `http://[IP_OF_YOUR_SERVER]:3000` in your browser and login to CapRover using the default password `captain42`. You can change your password later.

In the UI enter you root domain and press Update Domain button.

#### Step 4: Access the Captain Dashboard

Once you set your root domain as caprover.example.com, you will be redirected to captain.caprover.example.com.

Now CapRover is ready and running in a single node.

##### To allow cluster mode

- Enable HTTPS

  - Go to CapRover `Dashboard` tab, then in `CapRover Root Domain Configurations` press on `Enable HTTPS` then you will asked to enter your email address

- Docker Registry Configuration

  - Go to CapRover `Cluster` tab, then in `Docker Registry Configuration` section, press on `Self hosted Docker Registry` or add your `Remote Docker Registry`

- Run the following command in the ssh session:

  ```bash
      docker swarm join-token worker
  ```

  It will output something like this:

  ```bash
  docker swarm join --token   SWMTKN-1-0892ds1ney7pa0hymi3qwph7why1d9r3z6bvwtin51r14hcz3t-cjsephnu4f2ez fpdd6svnnbq7 185.206.122.33:2377
  ```

- To add a worker node to this swarm, you need:

  - Generated token `SWMTKN-1-0892ds1ney7pa0hymi3qwph7why1d9r3z6bvwtin51r14hcz3t-cjsephnu4f2ezfpdd6svnnbq7`
  - Leader node public ip `185.206.122.33`

This information is required in the next section to run CapRover in cluster mode.

### B) Worker Node Deployment/setup:

We show how to deploy a worker node by providing an example worker Terraform file.

```
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
    }
  }
}

provider "grid" {
    mnemonics = "<your-mnemonics>"
    network = "dev" # or test to use testnet
}

resource "grid_network" "net2" {
    nodes = [4]
    ip_range = "10.1.0.0/16"
    name = "network"
    description = "newer network"
}

resource "grid_deployment" "d2" {
  node = 4
  network_name = grid_network.net2.name
  ip_range = lookup(grid_network.net2.nodes_ip_range, 4, "")
  disks {
    name        = "data2"
    # will hold images, volumes etc. modify the size according to your needs
    size        = 20
    description = "volume holding docker data"
  }

  vms {
    name = "caprover"
    flist = "https://hub.grid.tf/samehabouelsaad.3bot/abouelsaad-caprover-tf_10.0.1_v1.0.flist"
    # modify the cores according to your needs
    cpu = 2
    publicip = true
    # modify the memory according to your needs
    memory = 2048
    entrypoint = "/sbin/zinit init"
    mounts {
      disk_name   = "data2"
      mount_point = "/var/lib/docker"
    }
    env_vars = {
      "PUBLIC_KEY" = "ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC9MI7fh4xEOOEKL7PvLvXmSeRWesToj6E26bbDASvlZnyzlSKFLuYRpnVjkr8JcuWKZP6RQn8+2aRs6Owyx7Tx+9kmEh7WI5fol0JNDn1D0gjp4XtGnqnON7d0d5oFI+EjQQwgCZwvg0PnV/2DYoH4GJ6KPCclPz4a6eXrblCLA2CHTzghDgyj2x5B4vB3rtoI/GAYYNqxB7REngOG6hct8vdtSndeY1sxuRoBnophf7MPHklRQ6EG2GxQVzAOsBgGHWSJPsXQkxbs8am0C9uEDL+BJuSyFbc/fSRKptU1UmS18kdEjRgGNoQD7D+Maxh1EbmudYqKW92TVgdxXWTQv1b1+3dG5+9g+hIWkbKZCBcfMe4nA5H7qerLvoFWLl6dKhayt1xx5mv8XhXCpEC22/XHxhRBHBaWwSSI+QPOCvs4cdrn4sQU+EXsy7+T7FIXPeWiC2jhFd6j8WIHAv6/rRPsiwV1dobzZOrCxTOnrqPB+756t7ANxuktsVlAZaM= sameh@sameh-inspiron-3576"
    }
    # SWM_NODE_MODE env var is required, should be "leader" or "worker"
    # leader: check the wroker terrafrom file example.
    # worker: will run sshd, containerd, dockerd as zinit services plus caprover service in orker mode which only join the swarm cluster.

      "SWM_NODE_MODE" = "worker"
    # from the leader node (the one running caprover) run `docker swarm join-token worker`
    # you must add the generated token to SWMTKN env var and the leader public ip to LEADER_PUBLIC_IP env var

      "SWMTKN"="SWMTKN-1-522cdsyhknmavpdok4wi86r1nihsnipioc9hzfw9dnsvaj5bed-8clrf4f2002f9wziabyxzz32d"
    "LEADER_PUBLIC_IP" = "185.206.122.38"

  }
}

output "wg_config" {
    value = grid_network.net2.access_wg_config
}
output "ygg_ip" {
    value = grid_deployment.d2.vms[0].ygg_ip
}
output "vm_ip" {
    value = grid_deployment.d2.vms[0].ip
}
output "vm_public_ip" {
    value = grid_deployment.d2.vms[0].computedip
}
```

```bash
cd freeflow_caprover/terraform/worker/
vim main.tf
```

- In `provider` Block, add your `mnemonics` and specify the grid network to deploy on.
- In `resource` Block, update the disks size, memory size, and cores number to fit your needs or leave as it is for testing.
- In the `PUBLIC_KEY` env var value put your ssh public key.
- In the `SWMTKN` env var value put the previously generated token.
- In the `LEADER_PUBLIC_IP` env var value put the leader node public ip.

- Save the file, and execute the following commands:

  ```bash
  terraform init
  terraform apply
  ```

- Wait till you see `apply complete`, and note the VM public ip in the final output.

- Verify the status of the VM.

  ```bash
  ssh root@{public_ip_address}
  zinit list
  zinit log caprover
  ```

  You will see output like this:

  ```bash
  root@caprover:~# zinit list
  caprover: Success
  dockerd: Running
  containerd: Running
  sshd: Running
  sshd-init: Success
  root@caprover:~# zinit log caprover
  [-] caprover: Cannot connect to the Docker daemon at unix:///var/run/   docker.sock. Is the docker daemon running?
  [+] caprover: This node joined a swarm as a worker.
  ```

This means that your worker node is now ready and have joined the cluster successfully.

You can also verify this from CapRover dashboard in `Cluster` tab. Check `Nodes` section, you should be able to see the new worker node added there.

Now CapRover is ready in cluster mode (more than one server).

To run One-Click Apps please follow this [tutorial](https://caprover.com/docs/one-click-apps.html)

## Implementations Details:

- we use Ubuntu 18.04 to minimize the production issues as CapRover is tested on Ubuntu 18.04 and Docker 19.03.
- In standard installation, CapRover has to be installed on a machine with a public IP address.
- Services are managed by `Zinit` service manager to bring these processes up and running in case of any failure:

  - sshd-init : service used to add user public key in vm ssh authorized keys (it run once).
  - containerd: service to maintain container runtime needed by docker.
  - caprover: service to run caprover container(it run once).
  - dockerd: service to run docker daemon.
  - sshd: service to maintain ssh server daemon.

- we adjusting the OOM priority on the Docker daemon so that it is less likely to be killed than other processes on the system
  ```bash
  echo -500 >/proc/self/oom_score_adj
  ```
