<h1> Funkwhale Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Create Operation](#create-operation)
- [Get Operation](#get-operation)
- [Delete Operation](#delete-operation)

***

## Introduction

- To deploy a funkwhale instance, use the funkwhale action.

> Check Funkwhale docs [here](../../../weblets/weblets_funkwhale.md)

***

## Create Operation

- action name: !!tfgrid.funkwhale.create
- parameters:
  - name [optional]
    - identifier for the instance, must be unique
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible node on a random farm will be selected
  - capacity [optional]
    - a string in ['small', 'medium', 'large', 'extra-large'] indicating the capacity of the funkwhale instance. defaults to `medium`
    - small: 2 vCPU, 1GB RAM, 50GB SSD
    - medium: 2 vCPU, 2GB RAM, 100GB SSD
    - large: 4 vCPU, 4GB RAM, 250 SSD
    - extra-large: 4vCPU, 8GB RAM, 400GB SSD
  - ssh_key [optional]
    - ssh key name defined by a previous action. defaults to `default`
  - admin_email [required]
    - admin email to access admin dashboard
  - admin_username [optional]
    - admin username to access admin dashboard
  - admin_password [optional]
    - admin password to access admin dashboard

- Example:
  
  ```md
  !!tfgrid.funkwhale.create
      name: funkwhale_instance
      farm_id: 4
      capacity: medium
      ssh_key: my_ssh_key
      admin_email: email@gmail.com
      admin_username: username1
      admin_password: pass1
  ```

***

## Get Operation

- action name: !!tfgrid.funkwhale.get
- parameters:
  - name [required]
    - name of the funkwhale instance

- Example:
  
  ```md
  !!tfgrid.funkwhale.get
      name: funkwhale_instance
  ```

***

## Delete Operation

- action_name: !!tfgrid.funkwhale.delete
- parameters:
  - name [required]
    - name of the funkwhale instance

- Example:
  
  ```md
  !!tfgrid.funkwhale.delete
      name: funkwhale_instance
  ```
