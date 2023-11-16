<h1> GPU Support and the TF Explorer </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [TF Explorer](#tf-explorer)
- [Statistics View](#statistics-view)

***

## Introduction

The TFGrid now supports GPU. Note that to deploy a workload on the TFGrid and use a GPU, you will need to rent the whole 3Node as a dedicated server.

***

## TF Explorer

![GPU support](../img/explorer_gpu.png)

- A new filter for GPU supported node is now available on the TF Explorer
- GPU count
- Filtering capabilities based on the model / device

On the details pages is shown the card information and its status (`reserved` or `available`) also the ID that’s needed to be used during deployments is easily accessible and has a copy to clipboard button.

![GPU details](../img/gpu_details.png)

Here’s an example of how it looks in case of reserved

![GPU details](../img/gpu_details_reserved.png)

The TF Dashboard is where to reserve the nodes the farmer should be able to set the extra fees on the form and the user also should be able to reserve and get the details of the node (cost including the extrafees, GPU informations).

***

## Statistics View

A simple card with GPUs count been added.

![GPU details](../img/dashboard_statistics.png)