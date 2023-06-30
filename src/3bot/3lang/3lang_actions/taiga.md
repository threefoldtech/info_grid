<h1>  Taiga Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Create Operation](#create-operation)
- [Get Operation](#get-operation)
- [Update Operations](#update-operations)
- [Delete Operation](#delete-operation)

***

## Introduction

- To deploy a taiga instance, use the Taiga actions.

> Check Taiga docs [here](../../../weblets/weblets_taiga.md)

***

## Create Operation

- action name: !!tfgrid.taiga.create
- parameters:
  - name [optional]
    - identifier for the instance, must be unique
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible node on a random farm will be selected
  - capacity [optional]
    - a string in ['small', 'medium', 'large', 'extra-large'] indicating the capacity of the taiga instance. defaults to `medium`
    - small: 2 vCPU, 2GB RAM, 100GB SSD
    - medium: 2 vCPU, 4GB RAM, 150GB SSD
    - large: 4 vCPU, 4GB RAM, 250 SSD
    - extra-large: 4vCPU, 8GB RAM, 400GB SSD
  - disk_size [optional]
    - size of disk to mount on instance. defaults to `50`
  - ssh_key [required]
    - ssh key name defined by a previous action. defaults to `default`
  - public_ipv6
    - if true, a public ipv6 will be added to the instance
  - admin_username [required]
  - admin_password [required]
  - admin_email [required]

- Example:
  
  ```md
  !!tfgrid.taiga.create
      name: hamadataiga
      capacity: medium
      size: 50GB
      ssh_key: my_taiga_ssh_key
      admin_username: user1
      admin_password: pass1
      admin_email: email@gmail.com
  ```

***

## Get Operation

- action name: !!tfgrid.taiga.get
- parameters:
  - name [required]
    - name of the taiga instance

- Example:
  
  ```md
  !!tfgrid.taiga.get
      name: hamadataiga
  ```

***

## Update Operations

- Update operations are not allowed on taiga instances.

***
  
## Delete Operation

- action_name: !!tfgrid.taiga.delete
- parameters:
  - name [required]
    - name of the taiga instance

- Example:
  
  ```md
  !!tfgrid.taiga.delete
      name: hamadataiga
  ```
