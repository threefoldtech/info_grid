<h1> GPU Support </h1>

## Introduction

We present here an example on how to deploy using the Go client. This is part of our integration tests.



## Example

```go
func TestVMWithGPUDeployment(t *testing.T) {
 tfPluginClient, err := setup()
 assert.NoError(t, err)

 ctx, cancel := context.WithTimeout(context.Background(), 5*time.Minute)
 defer cancel()

 publicKey, privateKey, err := GenerateSSHKeyPair()
 assert.NoError(t, err)

 twinID := uint64(tfPluginClient.TwinID)
 nodeFilter := types.NodeFilter{
  Status:   &statusUp,
  FreeSRU:  convertGBToBytes(20),
  FreeMRU:  convertGBToBytes(8),
  RentedBy: &twinID,
  HasGPU:   &trueVal,
 }

 nodes, err := deployer.FilterNodes(ctx, tfPluginClient, nodeFilter)
 if err != nil {
  t.Skip("no available nodes found")
 }
 nodeID := uint32(nodes[0].NodeID)

 nodeClient, err := tfPluginClient.NcPool.GetNodeClient(tfPluginClient.SubstrateConn, nodeID)
 assert.NoError(t, err)

 gpus, err := nodeClient.GPUs(ctx)
 assert.NoError(t, err)

 network := workloads.ZNet{
  Name:        "gpuNetwork",
  Description: "network for testing gpu",
  Nodes:       []uint32{nodeID},
  IPRange: gridtypes.NewIPNet(net.IPNet{
   IP:   net.IPv4(10, 20, 0, 0),
   Mask: net.CIDRMask(16, 32),
  }),
  AddWGAccess: false,
 }

 disk := workloads.Disk{
  Name:   "gpuDisk",
  SizeGB: 20,
 }

 vm := workloads.VM{
  Name:       "gpu",
  Flist:      "https://hub.grid.tf/tf-official-vms/ubuntu-22.04.flist",
  CPU:        4,
  Planetary:  true,
  Memory:     1024 * 8,
  GPUs:       ConvertGPUsToStr(gpus),
  Entrypoint: "/init.sh",
  EnvVars: map[string]string{
   "SSH_KEY": publicKey,
  },
  Mounts: []workloads.Mount{
   {DiskName: disk.Name, MountPoint: "/data"},
  },
  NetworkName: network.Name,
 }

 err = tfPluginClient.NetworkDeployer.Deploy(ctx, &network)
 assert.NoError(t, err)

 defer func() {
  err = tfPluginClient.NetworkDeployer.Cancel(ctx, &network)
  assert.NoError(t, err)
 }()

 dl := workloads.NewDeployment("gpu", nodeID, "", nil, network.Name, []workloads.Disk{disk}, nil, []workloads.VM{vm}, nil)
 err = tfPluginClient.DeploymentDeployer.Deploy(ctx, &dl)
 assert.NoError(t, err)

 defer func() {
  err = tfPluginClient.DeploymentDeployer.Cancel(ctx, &dl)
  assert.NoError(t, err)
 }()

 vm, err = tfPluginClient.State.LoadVMFromGrid(nodeID, vm.Name, dl.Name)
 assert.NoError(t, err)
 assert.Equal(t, vm.GPUs, ConvertGPUsToStr(gpus))

 time.Sleep(30 * time.Second)
 output, err := RemoteRun("root", vm.YggIP, "lspci -v", privateKey)
 assert.NoError(t, err)
 assert.Contains(t, string(output), gpus[0].Vendor)
}
```



## More Information

For more information on this, you can check this [Client Pull Request](https://github.com/threefoldtech/tfgrid-sdk-go/pull/207/) on how to support the new calls to list GPUs and to deploy a machine with GPU.