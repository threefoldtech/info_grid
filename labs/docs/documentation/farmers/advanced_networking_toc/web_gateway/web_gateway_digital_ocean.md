---
title: "Web Gateway - Digital Ocean"
sidebar_position: 1
---

# Set Up a ThreeFold Web Gateway on Digital Ocean

## Overview

This guide provides step-by-step instructions for setting up a ThreeFold Web Gateway on Digital Ocean. A web gateway enables 3Nodes without public IPv4 addresses to provide publicly accessible services by bridging them with the public IPv4 internet.

**Key Use Case**: Farmers with public IPv4 addresses can provide gateway services, allowing users to deploy workloads on 3Nodes without expensive public IPv4 addresses while still making them accessible from the public internet.

> 📖 **For architectural details and concepts**, see the [Web Gateway Architecture](./web_gateway_architecture) guide.

### Why Use Digital Ocean for Web Gateways?

- **Global Presence**: Data centers worldwide for optimal gateway placement
- **Reliable IPv4**: Stable public IP addresses essential for gateway functionality
- **Performance**: High-bandwidth connections suitable for gateway traffic
- **Cost-Effective**: Competitive pricing for gateway infrastructure

## Prerequisites

- Digital Ocean account with billing set up
- SSH key pair for secure access
- Basic understanding of Linux command line
- Domain name for DNS configuration (optional but recommended)

## Step 1: Create a Digital Ocean Droplet

### 1.1 Initial Setup
1. Log into your Digital Ocean dashboard
2. Create a new project or use an existing one
3. Click "Create" → "Droplets"

### 1.2 Choose Region and Datacenter
- Select a region that supports volumes (some regions don't support volumes)
- Verify the region shows "Volumes available" 
- Example: Choose regions like SFO3 which support both sizes and volumes

### 1.3 Custom Image Setup
⚠️ **Important**: You must use a custom image to get DHCP support. Digital Ocean's default images won't provide DHCP.

1. Click "Custom images" tab
2. If this is your first time, click "Upload Image"
3. Select "Import via URL"
4. Go to [Ubuntu Cloud Images](https://cloud-images.ubuntu.com/)
5. Navigate to current release → AMD64 → find the `.img` file
6. Right-click and copy the link address
7. Paste the URL in Digital Ocean's import field
8. Select the same region and datacenter as your droplet
9. Add a distribution label (optional but helpful)
10. Click "Upload Image"

### 1.4 Droplet Configuration
- **Size**: Choose at least 4GB RAM (ZeroOS requires minimum 2GB, but 2GB instances often don't pass the threshold)
- **Storage**: Add a volume with minimum 80GB (ZeroOS requires minimum disk space)
- **Authentication**: Add your SSH key (recommended) or use password
- **Monitoring**: Enable if desired

## Step 2: Prepare the System

### 2.1 Initial System Setup
1. SSH into your new droplet
2. Check available disks:
   ```bash
   lsblk
   ```
   - `sda` = main system volume
   - `sdb` = additional volume you added

### 2.2 Prepare the Boot Volume
1. Create boot directory:
   ```bash
   mkdir -p /boot
   ```

2. Mount the additional volume:
   ```bash
   mount /dev/sdb /boot
   ```

## Step 3: Download ZeroOS Bootstrap

### 3.1 Get Bootstrap Link
1. Visit [bootstrap.grid.tf](https://bootstrap.grid.tf)
2. Switch to "Expert Mode"
3. Configure the following:
   - **Version**: `v3-light` (optimized for cloud environments)
   - **Kernel**: Choose v3-light generic from the list
   - **Format**: Select "EFI" format

4. Click "Generate" and copy the download link

### 3.2 Download Bootstrap
```bash
cd /boot
wget [paste-your-bootstrap-link-here]
```

### 3.3 Create iPXE Script
Create a simple iPXE script for network booting:
```bash
# Create iPXE script
cat > /boot/boot.ipxe << 'EOF'
#!ipxe
# ZeroOS iPXE boot script
# Replace with your actual bootstrap URL
chain [your-bootstrap-url]
EOF
```

## Step 4: Configure GRUB Bootloader

### 4.1 Edit GRUB Custom Configuration
```bash
nano /etc/grub.d/40_custom
```

Add the following entry (replace `hd0,16` with your actual boot partition):
```bash
#!/bin/sh
exec tail -n +3 $0
# This file provides an easy way to add custom menu entries.

menuentry 'ZeroOS Network Boot' {
    insmod part_gpt
    insmod fat
    set root='hd0,gpt16'  # Adjust based on your boot partition
    chainloader /boot.ipxe
}
```

### 4.2 Configure GRUB Defaults
Edit the main GRUB configuration:
```bash
nano /etc/default/grub
```

Modify these settings:
```bash
# Set timeout to 30 seconds
GRUB_TIMEOUT=30

# Set default boot entry to ZeroOS
GRUB_DEFAULT="ZeroOS Network Boot"
```

### 4.3 Update GRUB
```bash
update-grub
```

## Step 5: Network Configuration

### 5.1 Get Network Information
From Digital Ocean dashboard:
1. Go to your droplet details
2. Note down:
   - Public IPv4 address
   - Gateway address
   - Netmask (usually /20 or /24)

### 5.2 Configure ZeroOS Network (After Boot)
Once ZeroOS boots successfully:
1. Access the ZeroOS dashboard
2. Navigate to Network settings
3. Enter the public IP configuration:
   - **IP Address**: Your droplet's public IP
   - **Gateway**: Gateway from droplet details
   - **Netmask**: Usually /20 for Digital Ocean
   - **DNS**: Configure your domain settings

## Step 6: Boot and Verify

### 6.1 Reboot System
```bash
reboot
```

### 6.2 Monitor Boot Process
1. Use Digital Ocean's recovery console to watch the boot process
2. You should see the GRUB menu with ZeroOS option selected by default
3. ZeroOS will download and boot (this may take several minutes)

### 6.3 Post-Boot Configuration
After successful boot:
1. Set up public configuration in ZeroOS dashboard
2. Configure DNS settings for your domain
3. Reboot the VM after configuration changes
4. Verify network connectivity and gateway functionality

## Important Notes

### System Requirements
- **RAM**: Minimum 4GB (2GB often insufficient)
- **Storage**: Minimum 80GB additional volume
- **Network**: Public IPv4 required for gateway functionality

### Limitations
- IPv6 is not supported in this configuration
- This setup is optimized for gateway nodes, not general VM workloads
- ZeroOS Light version is specifically designed for cloud environments

### Troubleshooting
- If boot fails, use Digital Ocean's recovery console to access GRUB menu
- Select Ubuntu option to return to the base system for debugging
- Check GRUB configuration if ZeroOS doesn't appear in boot menu
- Verify bootstrap URL is accessible and correct

## Security Considerations
- Always use SSH keys instead of passwords when possible
- Configure firewall rules appropriate for your gateway use case
- Keep the underlying Ubuntu system updated for security patches
- Monitor system logs for any unusual activity

## Gateway Usage for Users

Once your web gateway is operational, users can leverage it to expose their workloads:

### For Workload Deployment
1. **Deploy workloads** on any 3Nodes (public IPv4 not required)
2. **Select your gateway** from available options in the ThreeFold Dashboard
3. **Configure routing** to connect gateway to workload via Mycelium network
4. **Access applications** through the gateway's public IPv4 endpoint

### Gateway Benefits for Users
- **Cost Savings**: No need for expensive public IPv4 addresses on workload nodes
- **Global Access**: Workloads become accessible from anywhere on the internet
- **Secure Communication**: Internal traffic encrypted via Mycelium network
- **Flexible Deployment**: Place workloads on optimal 3Nodes regardless of IP availability

## Next Steps

Once your ZeroOS gateway is running:

1. **Configure gateway domains** and certificates as needed
2. **Advertise your gateway** to the ThreeFold community
3. **Monitor gateway performance** and connectivity
4. **Consider implementing backup** gateway solutions for redundancy
5. **Set up billing/usage tracking** if offering commercial gateway services

This completes the Digital Ocean web gateway setup process. Your gateway is now ready to bridge IPv4 internet traffic to ThreeFold's Mycelium network, enabling users to deploy globally accessible applications without requiring public IP addresses on their workload nodes.
