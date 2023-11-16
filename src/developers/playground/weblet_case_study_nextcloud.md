<h1>Weblet Case Study: Nextcloud AIO</h1>

![](./img/nextcloud_aio.png)

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Process Overview](#process-overview)
- [Questions and Feedback](#questions-and-feedback)

***

## Introduction

In this ThreeFold guide, we explore how to create a weblet on the Playground. To do so, we will use the Nextcloud weblet as a case study. This weblet is ideal to study since it uses many of the ThreeFold Grid functionalities, such as gateways and gateway domains.

By reading this guide, you should have a proper understanding of the general process of building a new weblet on the ThreeFold Grid. This might give you inspiration to build your own weblet and contribute to the ThreeFold Playground.

## Process Overview

The bulk of the files needed for the Nextcloud weblet can be found in the [ThreeFold tfgrid-sdk-ts repository](https://github.com/threefoldtech/tfgrid-sdk-ts) on GitHub. More specifically, we are interested in the subdirectory called [playground](https://github.com/threefoldtech/tfgrid-sdk-ts/tree/development/packages/playground).

While there are many ways to proceed in the development of a ThreeFold weblet for the Playground, we present here a general method that works efficiently and is well organized.

The information provided here are specific to the Nextcloud workload, but it can be applied to other types of workload.

Before building the Nextcloud weblet, we first deployed a [Nextcloud instance](../../terraform/advanced/terraform_nextcloud_aio.md) on the ThreeFold Grid with a full virtual machine. Once this deployment was working well, we built an [Nextcloud FList](../../flist/flist_case_studies/flist_nextcloud_case_study.md). Note that you can consult the Nextcloud FList code in the ThreeFold Tech [tf-images repository](https://github.com/threefoldtech/tf-images/tree/development/tfgrid3/nextcloud). 

In sum, once we were confortable launching Nextcloud on a full VM and also using an FList, we were ready to tackle the building of a weblet. These steps should be taken into account when building your own weblet. We proceed this way to ensure that the workload is properly configured. Once we know the FList is working properly, we can focus on the weblet aspect of the deployment, knowing the deployment itself is working properly.

## Questions and Feedback

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) chat on Telegram.