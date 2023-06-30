<h1> Discourse Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Create Operation](#create-operation)
- [Get Operation](#get-operation)
- [Delete Operation](#delete-operation)

***

## Introduction

- To deploy a discourse instance, use the discourse action.

> Check Discourse docs [here](../../../weblets/weblets_discourse.md)

***

## Create Operation

- action name: !!tfgrid.discourse.create
- parameters:
  - name [optional]
    - identifier for the instance, must be unique
  - farm_id [optional]
    - farm id to deploy on, if 0, a random eligible node on a random farm will be selected
  - capacity [optional]
    - a string in ['small', 'medium', 'large', 'extra-large'] indicating the capacity of the discourse instance. default value is medium
    - small: 1 vCPU, 2GB RAM, 10GB SSD
    - medium: 2 vCPU, 2GB RAM, 50GB SSD
    - large: 4 vCPU, 4GB RAM, 100 SSD
    - extra-large: 4vCPU, 8GB RAM, 150GB SSD
  - ssh_key [optional]
    - ssh key name defined by a previous action. defaults to `default`
  - developer_email [optional]
    - developer email to get development emails, only works if smtp is configured
  - smtp_address [optional]
    - smtp server domain address, defaults to `smtp.gmail.com`
  - smtp_port [optional]
    - smtp server port, defaults to `587`
  - smtp_username [optional]
    - smtp server username
  - smtp_password [optional]
    - smtp server password
  - smtp_tls [optional]
    - if true, tls encryption will be used in the smtp server, defaults to `false`
    - smtp server required all configurations above, if one of the smtp server configurations above was provided, all other configs must be provided, otherwise server will be down.

- Example:
  
  ```md
  !!tfgrid.discourse.create
      name: discoursename
      capacity: large
      ssh_key: my_ssh_key
      developer_email: email@gmail.com
      smtp_hostname: myhostname
      smtp_port: 9000
      smtp_username: username1
      smtp_password: pass1
      smtp_tls: true
  ```

***

## Get Operation

- action name: !!tfgrid.discourse.get
- parameters:
  - name [required]
    - name of the discourse instance

- Example:
  
  ```md
  !!tfgrid.discourse.get
      name: discoursename
  ```

***

## Delete Operation

- action_name: !!tfgrid.discourse.delete
- parameters:
  - name [required]
    - name of the discourse instance

- Example:
  
  ```md
  !!tfgrid.discourse.delete
      name: discoursename
  ```
