# Docker compatibility


Docker is being recognized as the market leader as a technology provider for containerization technology.  Many enterprise and software developers have adopted Docker's technology stack to built a devops (development and operations, more information [here](https://en.wikipedia.org/wiki/DevOps)) "train" (internal process, a way of developing and delivering software) for delivering updates to applications and new applications.  Regardless of how this devops "train" is organised it always spits out docker (application) images and deployments methods. Hercules is built with a 100% backwards compatibility in mind to the created docker images and deployment methods.  

A major step in accepting and importing Docker images is to transpose docker images to the [ZOS Filesystem](zos_fs).  

## Features

- 100 % backwards compatible with all existing and new to be created docker images.
- Easy import and transpose facility
- deduplicated application deployment simplifying aplication image management and versioning

!!!include:zos_toc