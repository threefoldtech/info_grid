<h1> Commands and Flags </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Commands](#commands)
- [Subcommands](#subcommands)
- [Flags](#flags)

***

## Introduction

We present the various commands, subcommands and flags available with TFROBOT.


## Commands

You can run the command `tfrobot help` at any time to access the help section. This will also display the available commands.

| Command    | Description                                                |
| ---------- | ---------------------------------------------------------- |
| completion     | Generate the autocompletion script for the specified shell                        |
| help       | Help about any command                                     |
| version    | Get latest build tag                                       |

Use `tfrobot [command] --help` for more information about a command.

## Subcommands

You can use subcommands to deploy and cancel workloads on the TFGrid.

- **deploy:** used to mass deploy groups of vms with specific configurations
    ```bash
    tfrobot deploy -c path/to/your/config.yaml
    ```
- **cancel:** used to cancel all vms deployed using specific configurations
    ```bash
    tfrobot cancel -c path/to/your/config.yaml
    ```
- **load:** used to load all vms deployed using specific configurations
    ```bash
    tfrobot load -c path/to/your/config.yaml
    ```

## Flags

You can use different flags to configure your deployment.

| Flag | Usage |
| :---:   | :---: |
| -c | used to specify path to configuration file |
| -o | used to specify path to output file to store the output info in |
| -d | allow debug logs to appear in the output logs |
| -h | help |

> **Note:** Make sure to use every flag once. If the flag is repeated, it will ignore all values and take the last value of the flag.`