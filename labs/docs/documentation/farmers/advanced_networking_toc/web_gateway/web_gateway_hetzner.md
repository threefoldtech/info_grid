---
title: "Web Gateway - Hetzner"
sidebar_position: 2
---

# Set Up a ThreeFold Web Gateway on Hetzner Cloud

## Overview

This guide provides step-by-step instructions for setting up a ThreeFold Web Gateway on Hetzner Cloud. A web gateway enables 3Nodes without public IPv4 addresses to provide publicly accessible services by bridging them with the public IPv4 internet.

**Key Use Case**: Farmers with IPv4 addresses can provide gateway services, allowing users to deploy workloads on 3Nodes without expensive public IPv4 addresses while maintaining global accessibility.

> 📖 **For architectural details and concepts**, see the [Web Gateway Architecture](./web_gateway_architecture) guide.

### Why Use Hetzner for Web Gateways?

- **European Focus**: Excellent connectivity across Europe and globally
- **Cost-Effective**: Competitive pricing for IPv4 addresses and bandwidth
- **Reliable Infrastructure**: High-quality data centers with good uptime
- **Flexible Configurations**: Various server sizes suitable for different gateway loads

### Current Limitations

⚠️ **Important**: Hetzner Cloud currently does not support nested virtualization, which limits full ZeroOS functionality. This guide documents the setup process for future reference when this limitation is resolved.

## Prerequisites

- Hetzner Cloud account with payment method configured
- SSH key pair for secure access
- Basic Linux/command line knowledge
- Understanding of iPXE and network booting concepts

## Important Limitations

⚠️ **Critical**: Hetzner Cloud does not support nested virtualization, which means ZeroOS will encounter errors during the virtualization setup phase. This guide documents the process for educational purposes and future reference when this limitation is resolved.

## Step 1: Create Hetzner Cloud Server

### 1.1 Server Configuration
1. Log into Hetzner Cloud Console
2. Create a new project (if needed)
3. Click "Add Server"
4. Choose your preferred location (e.g., Hillsboro, Oregon)
5. Select server type:
   - **CPU**: Shared vCPU (sufficient for gateway)
   - **RAM**: 4GB minimum (ZeroOS requires 2GB+, but 4GB recommended)
   - **Storage**: Default storage + additional volume

### 1.2 Network Configuration
- ✅ **Public IPv4**: Required (this is the main purpose)
- ✅ **Public IPv6**: Optional but doesn't hurt
- ❌ **Private Networks**: Not needed for this setup

### 1.3 Additional Options
- **SSH Keys**: Add your public key (recommended)
- **Volumes**: Add additional volume (minimum 80GB for ZeroOS requirements)

## Step 2: Prepare Build Environment

### 2.1 Enable Rescue Mode
1. In Hetzner Console, go to your server
2. Click "Rescue" tab
3. Enable rescue mode with Linux 64-bit
4. Power cycle the server
5. Server will boot into Debian rescue environment

### 2.2 Connect to Rescue System
```bash
ssh root@[your-server-ip]
```

### 2.3 Install Required Dependencies
```bash
apt update
apt install -y liblzma-dev git build-essential wget
```

## Step 3: Build Custom iPXE

### 3.1 Why Custom iPXE is Required
The standard bootstrap service doesn't work properly with Hetzner's environment. We need to build a custom iPXE with embedded boot script for network connectivity to work correctly.

### 3.2 Clone and Build iPXE
```bash
# Clone the ZeroOS iPXE fork
git clone https://github.com/threefoldtech/ipxe.git
cd ipxe

# Build the basic components
make

# This prepares the build environment for the next steps
make bin/ipxe
```

### 3.3 Generate Bootstrap Configuration
1. Visit [bootstrap.grid.tf](https://bootstrap.grid.tf)
2. Switch to "Expert Mode"
3. Configure:
   - **Version**: `v3-light` (optimized for cloud environments)
   - **Kernel**: Select "v3-light generic" from the list
   - **Format**: Choose "iPXE boot script"
4. Click "Generate"
5. Copy the generated URL (format: `https://bootstrap.grid.tf/ipxe/...`)

### 3.4 Download and Embed Boot Script
```bash
# Download the iPXE boot script
wget -O boot.ipxe [paste-your-bootstrap-url-here]

# Build iPXE with embedded script
make bin/ipxe.usb EMBED=boot.ipxe
```

This creates a USB-bootable image with the iPXE script embedded.

## Step 4: Write Boot Image to Disk

### 4.1 Identify Target Disk
```bash
lsblk
```
- Identify your additional volume (usually `/dev/sdb`)
- This will be used as the boot disk

### 4.2 Write iPXE Image
```bash
# Write the iPXE USB image to the volume
dd if=bin/ipxe.usb of=/dev/sdb bs=1M status=progress

# Verify the write
sync
```

### 4.3 Set Boot Priority
In Hetzner Console:
1. Go to server settings
2. Ensure the additional volume is set as primary boot device
3. Or configure BIOS/UEFI to boot from the correct disk

## Step 5: Boot Process

### 5.1 Exit Rescue Mode and Reboot
1. In Hetzner Console, disable rescue mode
2. Power cycle the server
3. Monitor boot process via console

### 5.2 Expected Boot Sequence
1. Server boots from the iPXE image on additional volume
2. iPXE loads and displays boot menu
3. ZeroOS kernel downloads (this is usually fast on Hetzner)
4. ZeroOS begins initialization process
5. ❌ **Expected Failure**: Process will fail at virtualization step due to nested virtualization limitation

## Step 6: Network Information Gathering

### 6.1 Get Network Configuration
Since ZeroOS won't fully boot, gather network info from rescue mode:

```bash
# Boot back into rescue mode to get network details
ip addr show
ip route show
```

### 6.2 Required Information for Future Use
Document these values for when ZeroOS fully supports Hetzner:
- **IP Address**: Server's public IP
- **Gateway**: Default gateway IP
- **Netmask**: Network mask (usually /32 for Hetzner)
- **DNS Servers**: Hetzner's DNS or your preferred DNS

## Current Status and Limitations

### What Works
✅ Custom iPXE builds and boots successfully  
✅ Network connectivity during boot process  
✅ ZeroOS kernel downloads and starts initialization  
✅ Basic system components load  

### What Doesn't Work
❌ Virtualization components fail due to nested virtualization limitation  
❌ ZeroOS cannot complete full initialization  
❌ Gateway functionality not available  

## Alternative Approaches

### Option 1: Custom ISO (Untested)
Hetzner supports custom ISO mounting through support tickets:
1. Build custom ISO with embedded iPXE
2. Submit ISO to Hetzner support for mounting
3. Boot from custom ISO
4. **Status**: Not yet tested, requires support ticket process

### Option 2: Wait for Nested Virtualization
Monitor Hetzner Cloud updates for nested virtualization support:
- Check Hetzner Cloud changelog regularly
- Test periodically as infrastructure updates roll out

## Future Configuration (When Working)

### Network Setup
Once ZeroOS boots successfully:
```bash
# Network configuration in ZeroOS dashboard
IP Address: [server-public-ip]
Gateway: [gateway-from-rescue-mode]
Netmask: /32 (typical for Hetzner)
DNS: 8.8.8.8, 1.1.1.1 (or Hetzner DNS)
```

### Gateway Configuration
1. Set public configuration in ZeroOS dashboard
2. Configure domain and DNS settings
3. Set up workload exposure rules
4. Test connectivity from other ZeroOS nodes

## Troubleshooting

### Build Issues
```bash
# If iPXE build fails, ensure dependencies are installed
apt install -y liblzma-dev build-essential

# Clean and rebuild if necessary
make clean
make bin/ipxe.usb EMBED=boot.ipxe
```

### Boot Issues
- Verify boot order in server settings
- Check that iPXE image was written correctly to disk
- Use Hetzner console to monitor boot process
- Ensure rescue mode is disabled before testing boot

### Network Issues
- Verify bootstrap URL is accessible
- Check that iPXE script was embedded correctly
- Test network connectivity from rescue mode

## Monitoring Progress

Keep track of:
1. Hetzner Cloud feature updates
2. ZeroOS compatibility improvements
3. Community solutions and workarounds
4. Alternative cloud providers with nested virtualization support

## Gateway Usage for Users (When Available)

Once Hetzner resolves nested virtualization limitations and your web gateway becomes operational, users will be able to leverage it:

### For Workload Deployment
1. **Deploy workloads** on any 3Nodes (IPv4 not required)
2. **Select your gateway** from available options in the ThreeFold Dashboard
3. **Configure routing** to connect gateway to workload via Mycelium network
4. **Access applications** through the gateway's public IPv4 endpoint

### Gateway Benefits for Users
- **Cost Savings**: No need for expensive IPv4 addresses on workload nodes
- **European Connectivity**: Excellent performance for European users
- **Secure Communication**: Internal traffic encrypted via Mycelium network
- **Flexible Deployment**: Place workloads on optimal 3Nodes regardless of IP availability

## Conclusion

While ZeroOS cannot currently run fully on Hetzner Cloud due to nested virtualization limitations, this guide provides the complete foundation for when this support becomes available. The custom iPXE approach works correctly up to the virtualization step, indicating that the networking and boot process are properly configured.

### Current Status
- **Setup Process**: Fully documented and tested
- **Network Configuration**: Verified working
- **Boot Process**: Successfully configured
- **Limitation**: Nested virtualization requirement blocks full functionality

### Next Steps
1. **Monitor Hetzner updates** for nested virtualization support
2. **Track ZeroOS development** for potential workarounds
3. **Consider alternative providers** for immediate gateway deployment
4. **Prepare for quick deployment** once limitations are resolved

**Recommendation**: This guide positions you to quickly deploy a Hetzner-based web gateway as soon as the nested virtualization limitation is resolved, providing cost-effective European gateway services to the ThreeFold community.
