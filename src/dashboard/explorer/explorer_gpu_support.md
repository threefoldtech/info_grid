# GPU support

We are quite busy nowadays with GPUs, but wanted to give you a quick update on how things are going with the GPU, Let’s start with the UI

## Explorer

![GPU support](../img/explorer_gpu.png)

- A new filter for GPU supported node is going to be added
- gpu count
- filtering capabilities based on the model / device

On the details pages we will be showing the card information and its status (`reserved` or `available`) also the ID that’s needed to be used during deployments is easily accessible and has a copy to clipboard button

![GPU details](../img/gpu_details.png)

Here’s an example of how it looks in case of reserved

![GPU details](../img/gpu_details_reserved.png)

**[Please take a look at this PR. It includes some helpful videos within it.](https://github.com/threefoldtech/tfgrid-sdk-ts/pull/706)**

The dashboard is where to reserve the nodes the farmer should be able to set the extra fees on the form and the user also should be able to reserve and get the details of the node (cost including the extrafees, GPU informations) [In progress]

## Statistics View

![GPU details](../img/dashboard_statistics.png)

A simple card with GPUs count been added
