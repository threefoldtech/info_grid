![ ](./advanced/img//terraform_.png)

## Using Terraform

- make a directory for your project `mkdir myfirstproject`
- `cd myfirstproject`
- create `main.tf` <- creates the terraform main file

## Create

to start the deployment `terraform init && terraform apply`

## Destroying

can be done using `terraform destroy`

And that's it!! you managed to deploy 2 VMs on the threefold grid v3

## How to use a Terraform File

### Initializing the provider

In terraform's global section

```terraform
terraform {
  required_providers {
    grid = {
      source = "threefoldtech/grid"
      version = "1.8.1"
    }
  }
}

```

- You can always provide a version to chooses a specific version of the provider like `1.8.1-dev` to use version `1.8.1` for devnet
- If `version = "1.8.1"` is omitted, the provider will fetch the latest version but for environments other than main you have to specify the version explicitly
- For devnet, qanet and testnet use version = `"<VERSION>-dev", "<VERSION>-qa" and  "<VERSION>-rcx"` respectively

Providers can have different arguments e.g using which identity when deploying, which substrate network to create contracts on, .. etc. This can be done in the provider section

```terraform
provider "grid" {
    mnemonics = "FROM THE CREATE TWIN STEP"
    network = "dev" # or test to use testnet

}
```

Please note you can leave its content empty and export everything as environment variables

```
export MNEMONICS="....."
export NETWORK="....."

```

For more info see [Provider Manual](./advanced/terraform_provider.md)

### output section

```terraform
output "wg_config" {
    value = grid_network.net1.access_wg_config
}
output "node1_vm1_ip" {
    value = grid_deployment.d1.vms[0].ip
}
output "node1_vm2_ip" {
    value = grid_deployment.d1.vms[1].ip
}
output "public_ip" {
    value = grid_deployment.d1.vms[0].computedip
}

```

Output parameters show what has been done:

- the overlay wireguard network configurations
- the private IPs of the VMs
- the public IP of the VM `exposed under computedip`

### Which flists to use in VM

see [list of flists](../manual3_iac/grid3_supported_flists.md)
