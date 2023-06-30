<h1> Presearch Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Create Operation](#create-operation)
- [Get Operation](#get-operation)
- [Update Operations](#update-operations)
- [Delete Operation](#delete-operation)

***

## Introduction

- To deploy a presearch instance, use the Presearch actions.

> Check Presearch docs [here](../../../weblets/weblets_presearch.md)

***

## Create Operation

- action name: !!tfgrid.presearch.create
- parameters:
  - name [optional]
    - identifier for the instance, must be unique
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible node on a random farm will be selected
  - disk_size [optional]
    - size of disk to mount on instance.
  - ssh_key [optional]
    - ssh key name defined by a previous action. defaults to `default`
  - public_ipv4 [optional]
    - if true, a public ipv4 will be added to the instance
  - public_ipv6 [optional]
    - if true, a public ipv6 will be added to the instance
  - registration_code [required]
    - You need to sign up on Presearch in order to get your Presearch Registration Code.
  - public_restore_key [optional]
  - private_resotre_key [optional]
    - presearch config for restoring old nodes
    - to restore old nodes, you need to provide both resotre keys

- Example:
  
  ```md
  !!tfgrid.presearch.create
      name: mypresearch
      farm_id: 3
      disk_size: 10GB
      public_ip: yes
      registration_code: qoweifjquoiwenwfiqurnviqeru9123f234f
  ```

***

## Get Operation

- action name: !!tfgrid.presearch.get
- parameters:
  - name [required]
    - presearch instance name

- Example:
  
  ```md
  !!tfgrid.presearch.get
      name: mypresearch
  ```

***

## Update Operations

- Update operations are not allowed on presearch instances.

***
  
## Delete Operation

- action_name: !!tfgrid.presearch.delete
- parameters:
  - name [required]
    - presearch instance name

- Example:
  
  ```md
  !!tfgrid.presearch.delete
      name: mypresearch
  ```
