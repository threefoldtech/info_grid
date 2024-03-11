    
## Deterministic Deployment

- flists concept (deduped vfilesystem, no install, ...)
    
The Dedupe filesystem flist uses fuse = interface which allows you to create the file system interface in user space, it is a virtual filesystem. 
Metadata is exposed. The system sees the full tree of the image, but data itself not there, data is downloaded whenever they are accessed.
     
There are multiple ways to create an flist: 
   - Convert an existing docker image which is hosted on the docker hub
   - Push an archive like a tjz on the hub
   - A library and CLI tool exist to build the flist from scratch: doing it this way, the directory is locally populated, and the flist is then created from the CLI tool. 
   - A [GitHub action](https://github.com/threefoldtech/publish-flist) allows to build a flist directly from GitHub action, useful for developers on GitHub 

Be aware that the flist system works a bit differently than the usual deployment of containers (dockers), which doesn't do mounting of volumes from your local disk into container for configuration. 
With flists you need to modify your image to get configuration from environment. This is basically how docker was originally intended to be used. 

  - Smart contract for IT
    The smart contract for IT concept is applicable to any workload: containers, VMs, all gateways primitives, volumes, kubernetes and network.
    It is a static agreement between farmer and user about deployment of an IT workload. 
      
  - no dynamic behavior for deployment at runtime
    
  - no process can start unless the files are 100% described on flist level
  