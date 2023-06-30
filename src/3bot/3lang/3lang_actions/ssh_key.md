<h1> SSH Key Actions </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [New Operation](#new-operation)

***

## Introduction

- To store an SSH Key, use the sshkeys action

***

## New Operation

- action name: !!tfgrid.sshkeys.new
- parameters:
  - name [required]
    - name of the key for future reference
  - ssh_key [required]
    - the ssh key

- Example:
  
  ```
  !!tfgrid.sshkeys.new 
      name: default
      ssh_key: 'ssh-rsa ....'
  ```
