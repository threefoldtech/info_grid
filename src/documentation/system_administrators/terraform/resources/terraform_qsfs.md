<h1> Quantum Safe Filesystem (QSFS) </h1>

<h2> Table of Contents </h2>

- [QSFS on Micro VM](./terraform_qsfs_on_microvm.md)
- [QSFS on Full VM](./terraform_qsfs_on_full_vm.md)

***

## Introduction

Quantum Storage is a FUSE filesystem that uses mechanisms of forward error correction (Reed Solomon codes) to make sure data (files and metadata) are stored in multiple remote places in a way that we can afford losing x number of locations without losing the data. 

The aim is to support unlimited local storage with remote backends for offload and backup which cannot be broken, even by a quantum computer.

## QSFS Workload Parameters and Documentation

A complete list of QSFS workload parameters can be found [here](https://github.com/threefoldtech/terraform-provider-grid/blob/development/docs/resources/deployment.md#nested-schema-for-qsfs).

The [quantum-storage](https://github.com/threefoldtech/quantum-storage) repo contains a more thorough description of QSFS operation.