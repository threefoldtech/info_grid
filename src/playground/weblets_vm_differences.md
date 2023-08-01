<h1> Micro and Full VM Differences </h1>

## Micro Virtual Machine

- It's meant to host microservice. and the user should enter the entrypoint.
- The user has no control over ther kernel used to run the machine.
- The network setup will be created for the user. And the vm's init process can assume that it will be fully set up (according to the config the user provided) by the time it is started. 
- Mountpoints will also be setup for the user. The environment variables passed will be available inside the the vm.

## Full Virtual Machine

- The users run their own operating system, but the image must be
  - EFI bootable
  - Cloud-init enabled
- It contains a default disk attached, as the boot image will be copied to this disk.
- The default disk is mounted on / so if you want to attach any additional disks, you have to choose a different mounting point.
- A /image.raw file is used as "boot disk". This /image.raw is copied to the first attached volume of the vm. Cloud-init will take care of resizing the filesystem on the image to take the full disk size allocated in the deployment.