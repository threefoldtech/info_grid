![](img/layer0_.jpg)

# TFGrid Low Level Functions = Primitives

The following are the low level constructs which can be deployed on the TFGrid.

The following functionalities allow you to create any solutions on top of the grid.
Any application which can run on linux can run on the TFGrid.

### Compute

- [ZKube](zkube) : kubernetes deployment
- [ZMachine](zmachine) : the container or virtual machine running inside ZOS
- [CoreX](corex) : process manager (optional), can be used to get remote access to your zmachine

Uses [Compute Units = CU](cloudunits).

### Storage (uses SU)

- [ZOS Filesystem](zos_fs) : deduped immutable filesystem
- [ZOS Mount](zmount) : a part of a SSD (fast disk), mounted underneath your zmachine
- [Quantum Safe Filesystem](qsfs) : unbreakable storage system (secondary storage only)
- [Zero-DB](zdb) : the lowest level storage primitive, is a key value stor, used underneath other storage mechanisms typically
- [Zero-Disk](zdisk) : OEM only, virtual disk format

Uses [Storage Units = SU](cloudunits).

### Network (uses NU)

- znet : private network between zmachines
- [Planetary Network](planetary_network) : peer2peer end2end encrypted global network
- znic : interface to planetary network
- [WebGateway](webgw) : interface between internet and znet
<!-- - [Peer2Peer Agent](p2pagent) : p2p agent terminates the traffic coming from the webgw. -->

Uses [Network Units = SU](cloudunits).

## Zero-OS Advantages

!!!include:zos_advantages


!!!def alias:tfgrid_primitives,grid_primitives

