---
title: "Web Gateway - Digital Ocean"
sidebar_position: 1
---

## Overview
This guide demonstrates how to deploy a Zero-OS (ZOS) gateway node inside a DigitalOcean virtual machine. While this setup isn't ideal for running general workloads, it's suitable for creating gateway nodes to expose services running on bare metal Zero-OS nodes.

## Prerequisites
- Digital Ocean account
- SSH key pair
- Domain name for gateway configuration
- Minimum 4GB RAM droplet size
- Additional block storage volume (100GB recommended)

## Step 1: Prepare Custom Image
1. Log into DigitalOcean dashboard
2. Navigate to Create > Droplets
3. Select Region and Datacenter
4. Make sure you have a volume
5. Click "Custom Image" (for THCP)
6. Click "Upload Image"
7. Select "Import via URL" and use the Ubuntu Cloud image URL:
```
https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.img
```
8. Set distribution type as "Ubuntu"
9. Choose same region as before for step above
10 . Click "Upload Image"

Then we go back to create the droplet now thatqw can select our custom image.

## Step 2: Create Droplet
1. Click "Create Droplet"
2. Select your region
3. Under "Choose an image", select "Custom Images"
4. Select your uploaded Ubuntu image
5. Choose droplet size:
   - Regular SSD (not Premium)
   - Minimum 4GB RAM
6. Add block storage:
   - 100GB volume
   - Select "Manually Format & Mount"
7. Add/select your SSH key
8. Create droplet

## Step 3: Prepare the server
1. SSH into your droplet:
```bash
ssh root@<droplet-ip>
```

1. Wipe the volume on the server (e.g. with `sda`)
```bash
wipefs -af /dev/sda
```

## Step 4: Generate Boot Script

1. Visit https://bootstrap.grid.tf
2. Enter Expert Mode
3. Configure:
   - Farm ID: Your farm ID
   - Network: mainnet
   - Extra kernel arguments: `version=v3light`
   - Kernel: `zos-v3light-generic`
   - Format: IPXE Boot Script
4. Generate IPXE boot script
5. Copy the generated URL and preprend  `https://bootstrap.grid.tf`

## Step 5: Set IPXE loader

2. Download Zero-OS bootstrap:
```bash
cd /boot
wget <bootstrap-url> -O zos.iso
```

3. Extract the iPXE loader:
```bash
mount -o loop zos.iso /mnt
cp /mnt/ipxe.lkrn /boot
```

## Step 6: Configure GRUB
1. Edit the custom GRUB configuration:
```bash
vim /etc/grub.d/40_custom
```

2. Add the following entry:
```
menuentry 'ZeroOS' --id zos {
    root=(hd0,16)
    linux16 /ipxe.lkrn
}
```

3. Configure GRUB settings file:
```bash
vim /etc/default/grub.d/50-cloudimg-settings.cfg
```

4. Set the following parameters:
```
GRUB_TIMEOUT=30
```

3. Configure GRUB default file:
```bash
vim /etc/default/grub
```

4. Set the following parameters:
```
GRUB_DEFAULT=zos
GRUB_TIMEOUT_STYLE=menu
```

5. Update GRUB:
```bash
update-grub
```

## Step 7: Configure Public Network

- On Digital Ocean droplet page, click "Access" in the left sidebar and then "Launch Recovery Console"
- Select Zos to see the Z-OS screen 
- On this page, you can see the gateway IP address:
```
net0/ip
net0/dns
net0/gateway
```

To see the node public IPV4 address and web gateway address, go to the Digital Ocean droplet page and click on the sidebar item "Network".

## Next Step

Then you can follow the steps in the manual to properly set your public configuration and DNS.

- [Set Up the Public Config](../../../dashboard/farms/your_farms)
- [Set Up a Gateway Domain](../gateway_domain.md)