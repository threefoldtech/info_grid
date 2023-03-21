# Virtual Machine

<div class="youtubeVideoWrapper">
<iframe title="How to Deploy a Full VM on the ThreeFold Playground" width="560" height="315" src="https://www.youtube-nocookie.com/embed/MDSIBkcYdqg" frameborder="0" allowfullscreen="" sandbox="allow-same-origin allow-scripts allow-popups"></iframe>
</div>

Deploy a new virtual machine on the Threefold Grid

- Make sure you have an activated [profile](./weblets_profile_manager.md) 
- Click on the **Virtual Machine** tab

__Process__ : 

![ ](../weblets/img/new_vm1.png)

- Fill in the instance name: it's used to reference the VM in the future.
- Choose the image from the drop down (e.g Alpine, Ubuntu) or you can click on `Other` and manually specify the flist URL and the entrypoint.
- `Public IPv4` flag gives the virtual machine a Public IPv4
- `Public IPv6` flag gives the virtual machine a Public IPv6
- `Planetary Network` to connect the Virtual Machine to Planetary network
- Choose the node to deploy on which can be
   - Manual: where you specify the node id yourself
   - Automatic: Suggests nodes list based on search criteria e.g `country`, `farm`, capacity..
  

![ ](../weblets/img/new_vm2.png)
Clicking on enviornment allows you to define environment variables to pass to the virtual machine. 
> Note the Public SSH key in the profile is automatically used as variable `SSH_KEY` passed to all Virtual Machines 

![ ](../weblets/img/new_vm3.png)
You can attach one or more disks to the Virtual Machine by clicking on the Disks tab and the plus `+` sign and specify the following parameters
   - Disk name 
   - Disk size
   - Mount point

in the bottom of the page you can see a list of all of the virual machines you deployed. you can click on `Show details` for more details

![ ](../weblets/img/weblet_vm5.png)
You can also go to JSON tab for full details
![ ](../weblets/img/weblet_vm6.png)
