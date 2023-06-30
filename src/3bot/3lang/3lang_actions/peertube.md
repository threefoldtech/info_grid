<h1> Peertube Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Create Operation](#create-operation)
- [Get Operation](#get-operation)
- [Update Operations](#update-operations)
- [Delete Operation](#delete-operation)

***

## Introduction

- To deploy a peertube instance, use the Peertube actions.

> Check Peertube docs [here](../../../weblets/weblets_peertube.md)

***

## Create Operation

- action name: !!tfgrid.peertube.create
- parameters:
  - name [optional]
    - identifier for the instance, must be unique
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible farm will be selected
  - capacity [optional]
    - a string in ['small', 'medium', 'large', 'extra-large'] indicating the capacity of the peertube instance. defaults to `medium`
    - small: 1 vCPU, 2GB RAM, 10GB SSD
    - medium: 2 vCPU, 2GB RAM, 100GB SSD
    - large: 4 vCPU, 4GB RAM, 250 SSD
    - extra-large: 4vCPU, 8GB RAM, 400GB SSD
  - ssh_key [optional]
    - ssh key name defined by a previous action. defaults to `default`
  - db_username [optional]
    - database username
  - db_password [optional]
    - database password
  - admin_email [required]
    - admin email

- Example:
  
  ```md
  !!tfgrid.peertube.create
      name: mypeertube
      farm_id: 2
      capacity: extra-large
      ssh_key: my_peertube_sshkey
      db_username: dbusername
      db_password: dbpassword
      admin_email: admin@gmail.com
  ```

***

## Get Operation

- action name: !!tfgrid.peertube.get
- parameters:
  - name [required]
    - name of the peertube instance

- Example:
  
  ```md
  !!tfgrid.peertube.get
      name: mypeertube
  ```

***

## Update Operations

- Update operations are not allowed on gateway names.

***
  
## Delete Operation

- action_name: !!tfgrid.peertube.delete
- parameters:
  - name [required]
    - name of the peertube instance

- Example:
  
  ```md
  !!tfgrid.peertube.delete
      name: mypeertube
  ```
