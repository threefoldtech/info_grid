# ThreeFold Grid v3.13.0 Release Note

This release having lots of features and fixes around the new dashboard and mycelium support, and more stability and healthchecks in ZOS.

## sdk-ts

- Full rewrite of the dashboard and playground. [#268](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/468)
- Full rewrite for the statistics website. [#467](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/467)
- Support node Manual selection. [#1094](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1312)
- Redesign the node selection flow. [#1872](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1872)
- Support hex secrets in login flow (and ed25519). [#1113](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1113)
- Add node performance test results to node details. [#1388](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1388)
- Improve the contract page UX by separating the contracts by their type (node, name, and rent). [#1593](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1593)
- Add Nextcloud to applications. [#1773](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1773)
- Add logs tab. [#1468](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/1468)
- Support mycelium on deployments. [#2085](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/2085)
- Show deployment health status in deployment table. [#2245](https://github.com/threefoldtech/tfgrid-sdk-ts/issues/2245)

## sdk-go

### Client

- Mycelium integration in go-client including (grid-cli, tfrobot). [#677](https://github.com/threefoldtech/tfgrid-sdk-go/issues/677)
- Concurrent preprocessing for each network before deployment, which showed a significant performance improvements. [#676](https://github.com/threefoldtech/tfgrid-sdk-go/issues/676)
- Fix same private IPs assigned to different VMs. [#457](https://github.com/threefoldtech/tfgrid-sdk-go/issues/457)
- Fix failed batch calls to cancel contracts if count of contracts to delete > 400. [#833](https://github.com/threefoldtech/tfgrid-sdk-go/issues/833)

### RMB

- Add router for direct client to allow building custom servers using the RMB. [#499](https://github.com/threefoldtech/tfgrid-sdk-go/issues/499)
- Fix mismatched public keys generated by mnemonic and seed for the same twin. [#551](https://github.com/threefoldtech/tfgrid-sdk-go/issues/551)
- Introducing twin cache and how long the twin cache is kept before refreshing. [#898](https://github.com/threefoldtech/tfgrid-sdk-go/issues/898)
- Add relay cache warmer update relay's Redis cache with twins data periodically. [#899](https://github.com/threefoldtech/tfgrid-sdk-go/issues/899)

### Gridproxy

- Support sorting on resources based on its fields. [#243](https://github.com/threefoldtech/tfgrid-sdk-go/issues/243)
- Improve the queries by denormalizing some of the repeatedly retrieved tables. [#308](https://github.com/threefoldtech/tfgrid-sdk-go/issues/308)
- Better decoding for URL parameters with validation support. [#269](https://github.com/threefoldtech/tfgrid-sdk-go/issues/308)
- A faster GPU indexing for new registered nodes. [#322](https://github.com/threefoldtech/tfgrid-sdk-go/issues/308)
- Add node-health indexer that periodically check the reachability for nodes. [#603](https://github.com/threefoldtech/tfgrid-sdk-go/issues/603)
- Allow sorting and querying nodes by price. [#608](https://github.com/threefoldtech/tfgrid-sdk-go/issues/608)
- Various new node fields/filters (region, excluded, total_cru, owned_by, farm_name, in_dedicated_farm)

### Farmerbot

- Rewrite farmerbot in go. [#484](https://github.com/threefoldtech/tfgrid-sdk-go/issues/484)
- Add a detailed report for the nodes of the farm used in running the farmerbot every update round. [#658](https://github.com/threefoldtech/tfgrid-sdk-go/issues/658)
- Power on any dedicated nodes if found offline. [#585](https://github.com/threefoldtech/tfgrid-sdk-go/issues/585)

### TFCMD

- Support new commands (get contracts details and cancel contracts). [#534](https://github.com/threefoldtech/tfgrid-sdk-go/issues/534)
- Allow getting deployments created using the dashboard in tfcmd and vice versa. [#882](https://github.com/threefoldtech/tfgrid-sdk-go/issues/882)

### TFRobot

- Creating a new command line tool to allow deploying mass deployments with large counts of VMs in different groups against different node groups, all using only one command. [#604](https://github.com/threefoldtech/tfgrid-sdk-go/issues/604)

## Terraform

- Mycelium integration. [#888](https://github.com/threefoldtech/terraform-provider-grid/issues/888)
- Add nomad module in terraform. [#765](https://github.com/threefoldtech/terraform-provider-grid/issues/765)

## ZOS

- Support both mycelium and yggdrasil. [#2208](https://github.com/threefoldtech/zos/issues/2208)
- Add healthcheck to report to zui for errors. [#2143](https://github.com/threefoldtech/zos/issues/2143)
- Add iperf service. [#2042](https://github.com/threefoldtech/zos/issues/2042)
- Main perf tests by. [#2052](https://github.com/threefoldtech/zos/issues/2052)
- Add cpu benchmark binary. [#2053](https://github.com/threefoldtech/zos/issues/2053)
- Add kernel version to zui. [#2058](https://github.com/threefoldtech/zos/issues/2058)
- Validate cpus according to actual number of node cpus. [#2057](https://github.com/threefoldtech/zos/issues/2057)
- Performance monitor package. [#2046](https://github.com/threefoldtech/zos/issues/2046)
- Filter out integrated GPUs. [#2064](https://github.com/threefoldtech/zos/issues/2064)
- Adds flag to disable gpu. [#2067](https://github.com/threefoldtech/zos/issues/2067)
- Add CPU benchmark task. [#2066](https://github.com/threefoldtech/zos/issues/2066)
- Vlan support. [#2084](https://github.com/threefoldtech/zos/issues/2084)
- Add cmdline param pub:mac to configure public mac. [#2090](https://github.com/threefoldtech/zos/issues/2090)
- Unify rfs and zufs pkgs. [#2091](https://github.com/threefoldtech/zos/issues/2091)
- RFS new format integration. Avoid hub specific calls by @muhamadazmy in. [#2094](https://github.com/threefoldtech/zos/issues/2094)
- Add public IPs validation task. [#2070](https://github.com/threefoldtech/zos/issues/2070)
- Fix setting the gateway and caching the request. [#2100](https://github.com/threefoldtech/zos/issues/2100)
- Add rmb diagnostics call, that will be giving insights to the tooling to do more proper planning around the nodes. [#2160](https://github.com/threefoldtech/zos/issues/2160)
- Assign ipv6 and gw6 to vm via config. [#2199](https://github.com/threefoldtech/zos/issues/2199)
- Add list and list_private_ips rmb calls. [#2206](https://github.com/threefoldtech/zos/issues/2206)
- Improve VM detection. [#2105](https://github.com/threefoldtech/zos/issues/2105)
- Clean up host keys before first boot. [#2138](https://github.com/threefoldtech/zos/issues/2138)
- Update cloud-container tolatest cloud-container. [#2150](https://github.com/threefoldtech/zos/issues/2150)
- Update yggdrasil to latest 0.5.2. [#2108](https://github.com/threefoldtech/zos/issues/2108)
- Update cache quota checker. [#2152](https://github.com/threefoldtech/zos/issues/2152)
- Update virt-what to rhel-9.3. [#2191](https://github.com/threefoldtech/zos/issues/2191)
  
## TFChain

- Allow renting standby node. [#933](https://github.com/threefoldtech/tfchain/pull/933)
- Fix discount level calculation. [#946](https://github.com/threefoldtech/tfchain/pull/946)
- Allowing a collective proposal (council or farmers) to cancel a contract. [#884](https://github.com/threefoldtech/tfchain/issues/884)
- Upgrade to polkadot v1.0.0. [#802](https://github.com/threefoldtech/tfchain/issues/802)
- Fix expired proposals outcome. [#803](https://github.com/threefoldtech/tfchain/issues/803)
- Fix unrecoverable bridge transfers. [#883](https://github.com/threefoldtech/tfchain/issues/883)
- Other bug fixes, client improvements, documentation improvements, and CI enhancements.

## Mycelium

An IPv6 overlay network completely writing in Rust, developed by Threefold. The overlay network uses some of the core principles of the Babel routing protocol (<https://www.irif.fr/~jch/software/babel/>). Each node that joins the overlay network will receive an overlay network IP in the 400::/7 range.

Please check this [introduction on mycelium](https://forum.threefold.io/t/introducing-mycelium/4082) or the [repository](https://github.com/threefoldtech/mycelium) for detailed instructions

For detailed list of features and bugfixes introduced, please check the [github project for 3.13](https://github.com/orgs/threefoldtech/projects/199).