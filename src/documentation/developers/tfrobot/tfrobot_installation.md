<h1>Installation</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Installation](#installation)

***

## Introduction

This section covers the basics on how to install TFROBOT (`tfrobot`). 

TFROBOT is available as binaries. Make sure to download the latest release and to stay up to date with new releases.

## Installation

To install TFROBOT, simply download and extract the TFROBOT binaries to your path. 

- Create a new directory for `tfgrid-sdk-go`
  ```
  mkdir tfgrid-sdk-go
  cd tfgrid-sdk-go
  ```
- Download latest release from [releases](https://github.com/threefoldtech/tfgrid-sdk-go/releases)
  - ```
    wget https://github.com/threefoldtech/tfgrid-sdk-go/releases/download/v0.14.4/tfgrid-sdk-go_Linux_x86_64.tar.gz
    ```
- Extract the binaries
  - ```
    tar -xvf tfgrid-sdk-go_Linux_x86_64.tar.gz
    ```
- Move `tfrobot` to any `$PATH` directory:
    ```bash
    mv tfrobot /usr/local/bin
    ```