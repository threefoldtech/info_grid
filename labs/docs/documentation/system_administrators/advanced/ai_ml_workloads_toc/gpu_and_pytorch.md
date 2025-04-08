---
title: "GPU and Pytorch"
sidebar_position: 296
---





## Introduction

We present a basic method to deploy artificial intelligence (AI) and machine learning (ML) on the TFGrid. For this, we make use of dedicated nodes and GPU support.

In the first part, we show the steps to install the Nvidia driver of a GPU card on a full VM Ubuntu 22.04 running on the TFGrid.

In the second part, we show how to use PyTorch to run AI/ML tasks.

## Prerequisites

You need to reserve a [dedicated GPU node](../../../dashboard/deploy/node_finder#dedicated-nodes) on the ThreeFold Grid.

## Prepare the System

- Update the system
    ```
    dpkg --add-architecture i386
    apt-get update
    apt-get dist-upgrade
    reboot
    ```
- Check the GPU info
    ```
    lspci | grep VGA
    lshw -c video
    ```

## Install the GPU Driver

- Download the latest Nvidia driver
  - Check which driver is recommended
      ```
      apt install ubuntu-drivers-common
      ubuntu-drivers devices
      ```
  - Install the recommended driver (e.g. with 535)
      ```
      apt install nvidia-driver-535
      ```
  - Reboot and reconnect to the VM
- Check the GPU status
    ```
    nvidia-smi
    ```

Now that the GPU node is set, let's work on setting PyTorch to run AI/ML workloads.

## Set a Python Virtual Environment

Before installing Python package with pip, you should create a virtual environment.

- Install the prerequisites
  ```
  apt update
  apt install python3-pip python3-dev
  pip3 install --upgrade pip
  pip3 install virtualenv
  ```
- Create a virtual environment
  ```
  mkdir ~/python_project
  cd ~/python_project
  virtualenv python_project_env
  source python_project_env/bin/activate
  ```

## Install PyTorch and Test Cuda

Once you've created and activated a virtual environment for Pyhton, you can install different Python packages.

- Install PyTorch and upgrade Numpy
    ```
    pip3 install torch
    pip3 install numpy --upgrade
    ```

Before going further, you can check if Cuda is properly installed on your machine.

- Check that Cuda is available on Python with PyTorch by using the following lines:
    ```
    import torch
    torch.cuda.is_available()
    torch.cuda.device_count() # the output should be 1
    torch.cuda.current_device() # the output should be 0
    torch.cuda.device(0)
    torch.cuda.get_device_name(0)
    ```

## Set and Access Jupyter Notebook

You can run Jupyter Notebook on the remote VM and access it on your local browser.

- Install Jupyter Notebook 
    ```
    pip3 install notebook
    ```
- Run Jupyter Notebook in no-browser mode and take note of the URL and the token
  ```
  jupyter notebook --no-browser --port=8080 --ip=0.0.0.0
  ```
- On your local machine, copy and paste on a browser the given URL but make sure to change `127.0.0.1` with the WireGuard IP (here it is `10.20.4.2`) and to set the correct token.
  ```
  http://10.20.4.2:8080/tree?token=<insert_token>
  ```

## Run AI/ML Workloads

After following the steps above, you should now be able to run Python codes that will make use of your GPU node to compute AI and ML workloads.

Feel free to explore different ways to use this feature. For example, the [HuggingFace course](https://huggingface.co/learn/nlp-course/chapter1/1) on natural language processing is a good introduction to machine learning.