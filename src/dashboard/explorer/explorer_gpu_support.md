<h1> GPU Support and the TF Explorer </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [TF Explorer](#tf-explorer)
- [Statistics View](#statistics-view)

***

## Introduction

We are quite busy nowadays with integrating GPUs with the TFGrid. We present here a quick update on how things are going with this project. More information will be added to this section soon.

***

## TF Explorer

![GPU support](../img/explorer_gpu.png)

- A new filter for GPU supported node is going to be added
- GPU count
- Filtering capabilities based on the model / device

On the details pages we will be showing the card information and its status (`reserved` or `available`) also the ID that’s needed to be used during deployments is easily accessible and has a copy to clipboard button

![GPU details](../img/gpu_details.png)

Here’s an example of how it looks in case of reserved

![GPU details](../img/gpu_details_reserved.png)

For more information on the ongoing progress, you can have a look at [this pull request](https://github.com/threefoldtech/tfgrid-sdk-ts/pull/706). This PR also includes many helpful videos.

The TF Dashboard is where to reserve the nodes the farmer should be able to set the extra fees on the form and the user also should be able to reserve and get the details of the node (cost including the extrafees, GPU informations). Note that this is currently in progress.

***

## Statistics View

A simple card with GPUs count been added.

![GPU details](../img/dashboard_statistics.png)
