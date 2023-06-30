<h1> Kubernetes Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Create Operation](#create-operation)
- [Get Operation](#get-operation)
- [Update Operations](#update-operations)
  - [Add Operation](#add-operation)
  - [Remove Operation](#remove-operation)
- [Delete Operation](#delete-operation)

***

## Introduction

- To deploy a kubernetes cluster, use the kubernetes actions.

***

## Create Operation

- action name: !!tfgrid.kubernetes.create
- parameters:
  - name [optinoal]
    - name of the cluster, must be unique
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible farm will be selected
  - workers [optional]
    - number of cluster workers, must be in the range [1, 252]. defaults to `1`
  - capacity [optional]
    - a string in ['small', 'medium', 'large', 'extra-large'] indicating the capacity of the cluster nodes. defaults to `medium`
    - small: 1 vCPU, 2GB RAM, 10GB SSD
    - medium: 2 vCPU, 4GB RAM, 50GB SSD
    - large: 4 vCPU, 8GB RAM, 240 SSD
    - extra-large: 8vCPU, 16GB RAM, 480GB SSD
  - ssh_key [optional]
    - public ssh key to access the instance in a later stage. defaults to `default`
  - add_wireguard_access
    - if true, adds a wireguard access point to the network
  - add_public_ip_to_master
    - true to add public ipv4 to master
  - add_public_ips_to_workers
    - true to add public ipv4 to workers

- Example:
  
  ```md
  !!tfgrid.kubernetes.create
      name: myk8s
      farm_id: 1
      workers: 4
      capacity: small
      add_public_ip_to_master: yes
  ```

***

## Get Operation

- action name: !!tfgrid.kubernetes.get
- parameters:
  - name [required]
    - cluster name

- Example:
  
  ```md
  !!tfgrid.kubernetes.get
      name: myk8s
  ```

***

## Update Operations

### Add Operation

- action_name: !!tfgrid.kubernetes.add
- parameters:
  - name [required]
    - cluster name
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible farm will be selected
  - capacity [required]
    - a string in ['small', 'medium', 'large', 'extra-large'] indicating the capacity of the worker. defaults to `medium`
    - small: 1 vCPU, 2GB RAM, 10GB SSD
    - medium: 2 vCPU, 4GB RAM, 50GB SSD
    - large: 4 vCPU, 8GB RAM, 240 SSD
    - extra-large: 8vCPU, 16GB RAM, 480GB SSD
  - add_public_ip
    - true to add public ipv4 to the worker

- Example:
  
  ```md
  !!tfgrid.kubernetes.add
      name: myk8s
      farm_id: 2
      capacity: small
  ```

### Remove Operation

- action_name: !!tfgrid.kubernetes.remove
- parameters:
  - name [required]
    - cluster name
  - worker_name [required]
    - worker name to be removed

- Example:
  
  ```md
  !!tfgrid.kubernetes.remove
      name: myk8s
      worker_name: worker1
  ```

***

## Delete Operation

- action_name: !!tfgrid.kubernetes.delete
- parameters:
  - name [required]
    - cluster name

- Example:
  
  ```md
  !!tfgrid.kubernetes.delete
      name: myk8s
  ```
