<h1> How 3Lang Works </h1>

<h2> Table of Contents </h2>

- [Threelang Parser](#threelang-parser)
- [3Lang Action Properties](#3lang-action-properties)
- [Module actions](#module-actions)
- [Basic Example with 4 VMs](#basic-example-with-4-vms)

***

## Threelang Parser

Threelang is an intermediate language to tell the web3 proxy what to do. The language is markdown syntax augmented with actions. Actions tell the web3 proxy what to do. Each action contains a name and optionally parameters.

***

## 3Lang Action Properties

- An action is indicated in an md file by a line starting with !!
- Actions are delimited by new lines.
- Actions consist of:
  - Action names
  - Action parameters
  - Action arguments
- An action name is the string following the "!!"
- Action names consist of three parts separated by a ".", in this order:
  - Module name
  - Namespace
  - Operation
- Action parameters are all the key value pairs that follow an action name
- Action arguments are all the single values that follow an action name
- Parameters and arguments could be mixed toghether and do not have a particular order

***

## Module actions

You can see the module actions in the section [3Lang Actions](./3lang_actions/3lang_actions.md).

***

## Basic Example with 4 VMs

If a user wants to deploy a group of 4 machines on the same network, the following could would suffice:

```md
    !!tfgrid.machine.create
        name: 'my machines'
        ssh_key: 'ssh_key'
        times: 4
        capacity: medium
```

This code would deploy 4 VMs with medium capacity (cru, mru, sru) on the same network.