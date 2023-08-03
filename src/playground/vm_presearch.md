# Mount a Presearch node on TFGrid3 using VM

The fastest way to mount a Presearch node on TFGrid3 is inside a VM. 

Steps : 
- Set up a VM, see [here](./vm.md). It is recommended to reserve a fix IP. You can also try out the planetary network (so reserve a VM without public IP), as long as the node you select is connected to the internet through an IPv4 address that isn't used yet for a Presearch node, you don't explicitly need to reserve a public IPv4 address. However, the planetary network is still in beta phase and might generate performance issues. 
- 1 CPU is enough for a PRE node. As we still need to install Docker on the VM before deploying a PRE node, please choose 8192 memory size. 
- Once your VM is set up, SSH into our machine. 

![](./img/vm_list.png)

For the VM having an IP address you can enter the terminal command 
```
ssh root@185.206.122.162
```

If you didn't reserve a public IPv4 address, you can ssh into your machine using the IPv6 address. Peopl doing this, should however first set up their identity in the Planetary Network with Yggdrasil. See [here](yggdrasil_client) to know how to do this. 

```
ssh root@300:aa1b:e91b:720f:ae5f:8991:6df8:1ec9
```

Now you have an empty VM, also Docker still needs to be installed. 

Execute the following commands inside your VM : 

```
apt update ; 
apt install sudo ;
sudo apt install apt-transport-https ca-certificates curl software-properties-common ;
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - ;
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable" ; 
``` 
Finally, install Docker. The Ubuntu machine does not come with `systemd`. The following does the trick : 

```
apt-get install docker-ce docker-ce-cli containerd.io
apt-cache madison docker-ce

dockerd &
``` 

Once Docker is set up, you can launch the PRE node instructions on your VM: 

```
docker stop presearch-node ; docker rm presearch-node ; docker stop presearch-auto-updater ; docker rm presearch-auto-updater ; docker run -d --name presearch-auto-updater --restart=unless-stopped -v /var/run/docker.sock:/var/run/docker.sock presearch/auto-updater --cleanup --interval 900 presearch-auto-updater presearch-node ; docker pull presearch/node ; docker run -dt --name presearch-node --restart=unless-stopped -v presearch-node-storage:/app/node -e REGISTRATION_CODE=$YOUR_REGISTRATION_CODE_HERE presearch/node ; docker logs -f presearch-node
```

And you're done ! 

![ ](./img/weblet_vm_presearch_result.jpg)