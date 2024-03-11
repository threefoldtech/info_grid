## Zero OS as generator for Compute, Storage, Network capacity.

### Compute (uses CU)

- [ZKube](zkube) : kubernetes deployment
- [ZMachine](zmachine) : the container or virtual machine running inside ZOS
- [CoreX](corex) : process manager (optional), can be used to get remote access to your zmachine

### Storage (uses SU)

- [ZOS Filesystem](zos_fs) : deduped immutable filesystem
- [ZOS Mount](zmount) : a part of a SSD (fast disk), mounted underneath your zmachine
- [Quantum Safe Filesystem](!@qsss_home) : unbreakable storage system (secondary storage only)
- [Zero-DB](zdb) : the lowest level storage primitive, is a key value stor, used underneath other storage mechanisms typically
- [Zero-Disk](zdisk) : OEM only, virtual disk format

### Network (uses NU)

- zos_net : private network between zmachines
- [Planetary Network](planetary_network) : peer2peer end2end encrypted global network
- [WebGateway](webgw) : interface between internet and znet
- zos_bridge: network interface to planetary_net or public ipaddress

<!-- - [Zero-NIC](znic) : interface to planetary network -->
