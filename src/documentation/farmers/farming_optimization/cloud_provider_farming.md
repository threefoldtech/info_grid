# Cloud Provider Farming

## Introduction

We explain how to set up a 3Node on the ThreeFold Grid running on a cloud provider server. Currently, the documentation is made for [Hetzner](https://www.hetzner.com).

## Considerations

When you set up a node as explained in this guide, it will be running ZOS V4 on Grid 3. This means that you can access the node stats on the Dashboard, but not the usual Dashboard link. To reach out the Dashboard, you will need to use the following link:

- Dashboard link: [https://next.dashboard.grid.tf/](https://next.dashboard.grid.tf/)

Also, this current setup does not allow the node to be a grid gateway node out of the box. If you want to deploy a grid gateway node using Hetzner, reach out to support and we will assist you.

To deploy on those nodes, you can either use the Next Dashboard link above or deploy using Terraform.

## Hetzner Server Specs

You first need to order a dedicated server from Hetzner with the following specs. You can consult the [Hetzner Server Auction page](https://www.hetzner.com/sb/).

- NVMe: First filter on NVMe only servers with 'Drives' > 'NVMe SSD'
- Preferred CPU: Intel Core i7-8700 / AMD Ryzen 5 3600.
  - Try to find the best deals in the first pages.
    - I.e. If you can rent a i7-6700 and a i7-8700 for about the same price, one would prefer the i7-8700.
  - The same logic applies for Xeon and AMD models.
    - You should compare them with benchmark scores vs price to pick the best deal.
  - Important: Currently, the following CPUs are not supported: **Intel 12th, 13th or 14th generation**.
    - This will not work with the current setup.
- Recommendation
  - Max price range of €50 / mnd / excl. vat
- HDD is a great addition, but it is not required.
- Location
  - No preferred location.

Once you get a server with Hetzner, it will be delivered booted in the Hetzner rescue mode. From this, we can install ZOS.

## ZOS Installation Script

The next step is to install ZOS with UEFI using a script written in Bash.

For this, we will SSH into the node, wipe the disk and then partition it to install ZOS on the small partition.

- SSH to the server that is in rescue mode to **wipe the disks** and chech the boot mode (BIOS or UEFI)
```sh
ssh root@xx.xx.xx.xx
root@rescue ~ # lsblk 
NAME    MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0     7:0    0   3.2G  1 loop 
nvme0n1 259:0    0 476.9G  0 disk 
nvme1n1 259:1    0 476.9G  0 disk
root@rescue ~ # wipefs -a /dev/nvme0n1 && wipefs -a /dev/nvme1n1
root@rescue ~ # parted -s /dev/nvme0n1 mklabel msdos && parted -s /dev/nvme1n1 mklabel msdos
root@rescue ~ # dd if=/dev/zero of=/dev/nvme0n1 bs=1M count=10 && dd if=/dev/zero of=/dev/nvme1n1 bs=1M count=10
```

- A server in BIOS mode would have the following output:
```sh
root@rescue ~ # efibootmgr 
EFI variables are not supported on this system.
```

- A server in UEFI mode would have the following output:
```sh
root@rescue ~ # efibootmgr 
BootCurrent: 0001
Timeout: 1 seconds
BootOrder: 0001
Boot0001* UEFI: PXE IP4 Intel(R) Ethernet Connection (H) I219-LM
```

Currently, it is only possible to deploy on a UEFI boot mode server. Since each auction server comes in BIOS boot mode, you have to ask the Hetzner support to change it to UEFI boot mode.

- UEFI boot mode script installation, always use the first disk (mostly `nvme0n1`) and make sure the second is wiped. Note that here we use the farm ID `3997` as an example.
```sh
wget https://docs.grid.tf/threefold_public/public/raw/branch/master/zosinstalluefipxeondisk.sh && chmod +x zosinstalluefipxeondisk.sh
./zosinstalluefipxeondisk.sh -d /dev/nvme0n1 -e prod -f 3997
```

- Check if the partitions have been created.
```sh
root@rescue ~ # lsblk 
NAME        MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
loop0         7:0    0   3.2G  1 loop 
nvme0n1     259:0    0 476.9G  0 disk 
├─nvme0n1p1 259:4    0    99M  0 part 
└─nvme0n1p2 259:5    0 476.8G  0 part 
nvme1n1     259:1    0 476.9G  0 disk 
```

## Test the Server

Reboot the server and ping its public IP, it should reply soon (while in PXE boot). Then it will stop replying. This means it is booting into ZOS. After about 1 minute, it should reply again.

Once the node is connected and registered on the grid, the node should have its ID and be online in the dashboard.

### Dashboard Data

You can consult some basic data on the Dashboard to make sure everything is set up properly.

- Check that the node is properly registered and note the node ID
- Check that all hardware is registered (CPU, RAM, total disk count)
- Check that it is sending metrics by pressing `Check Node Health`

As explained above, you will need to use the following Dashboard link:

- Dashboard link: [https://next.dashboard.grid.tf/](https://next.dashboard.grid.tf/)