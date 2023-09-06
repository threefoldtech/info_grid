
<h1> Uncomplicated Firewall (ufw) Basic Commands</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Basic Commands](#basic-commands)
  - [Install ufw](#install-ufw)
  - [Enable ufw](#enable-ufw)
  - [Disable ufw](#disable-ufw)
  - [Reset ufw](#reset-ufw)
  - [Reload ufw](#reload-ufw)
  - [Deny Incoming Connections](#deny-incoming-connections)
  - [Allow Outgoing Connections](#allow-outgoing-connections)
  - [Allow a Specific IP address](#allow-a-specific-ip-address)
  - [Allow a Specific IP Address to a Given Port](#allow-a-specific-ip-address-to-a-given-port)
  - [Allow a Port for tcp](#allow-a-port-for-tcp)
  - [Allow a Port for tcp and udp](#allow-a-port-for-tcp-and-udp)
  - [Allow a Subnet to a Given Port](#allow-a-subnet-to-a-given-port)
  - [Deny an IP Address](#deny-an-ip-address)
  - [Block Incoming Connections to a Network Interface](#block-incoming-connections-to-a-network-interface)
  - [Delete a Rule with Number](#delete-a-rule-with-number)
  - [Get App Info](#get-app-info)
  - [Allow a Specific App](#allow-a-specific-app)
- [References](#references)


## Introduction

We present a quick introduction to [Uncomplicated Firewall (ufw)](https://firewalld.org/), a free and open-source firewall management tool for Linux operating systems. This guide can be useful for users of the TFGrid deploying on full and micro VMs as well as other types of deployment.

## Basic Commands

We show here basic commands to set a firewall on Linux with Uncomplicated Firewall (ufw).

### Install ufw

  * Update
    * ``` 
      apt update
      ```
  * Install ufw
    * ``` 
      apt install ufw
      ```

### Enable ufw

  * ``` 
    ufw enable
    ``````

### Disable ufw

  * ``` 
    ufw disable
    ```
  
### Reset ufw

  * ``` 
    ufw reset
    ``` 

### Reload ufw

  * ``` 
    ufw reload
    ``` 

### Deny Incoming Connections

  * ``` 
    ufw default deny incoming
    ```

### Allow Outgoing Connections

  * ``` 
    ufw default allow outgoing
    ```
### Allow a Specific IP address

  * ```
    ufw allow from <IP_Address>
    ```

### Allow a Specific IP Address to a Given Port

  * ```
    ufw allow from <IP_Address> to any port <port>
    ```

### Allow a Port for tcp

* ```
  ufw allow <port>/tcp
  ```
### Allow a Port for udp

* ```
  ufw allow <port>/udp
  ```
### Allow a Port for tcp and udp

* ```
  ufw allow <port>
  ```

### Allow Ports: Examples

Here are some typical examples of ports to allow with ufw:

* Allow SSH (port 22)
  * ```
    ufw allow ssh
    ```
* Allow HTTP (port 80)
  * ```
    ufw allow http
    ```
* Allow HTTPS (port 443)
  * ```
    ufw allow https
    ```
* Allow mysql (port 3306)
  * ```
    ufw allow 3306
    ```

### Allow Port Ranges

* Template
  * ```
    ufw allow <port_range_floor>:<port_range_ceiling>
    ```
* Example
  * ```
    ufw allow 6000:6005
    ```

### Allow a Subnet

* ```
  ufw allow from <subnet>
  ```

### Allow a Subnet to a Given Port

* ```
  ufw allow from <subnet> to any port <port>
  ```

### Deny a Port

* ```
  ufw deny <port>
  ```

### Deny an IP Address

* ```
  ufw deny <IP_Address>
  ```

### Deny a Subnet

* ```
  ufw deny from <subnet>
  ```

### Block Incoming Connections to a Network Interface

* ```
  ufw deny in on <network_interface> from <IP_Address>
  ```

### Check Rules

Use **status** to check the current firewall configurations. Add **verbose** for more details.

* ```
  ufw status 
  ```
* ```
  ufw status verbose
  ```

### Check Rules (Numbered)

It can be useful to see the numbering of the rules, to remove more easily a rule for example.

* ```
  ufw status numbered
  ```

### Delete a Rule with Number

It can be useful to see the numbering of the rules, to remove more easily a rule for example.

* ```
  ufw delete <rule_number>
  ```

### Delete a Rule with the Rule Name and Parameters

You can also delete a rule by writing directly the rule name you used to add the rule.

* Template
  * ```
    ufw delete <rule_name> <rule_parameters>
    ```
* Example
  * ```
    ufw delete allow ssh
    ```
  * ```
    ufw delete allow 22
    ```

You can always check the current rules with **ufw status** to see if the rules are properly removed.

### List the Available Profiles Available

* ```
  ufw app list
  ```

This command will give you the names of the apps present on the server. You can then use **ufw app info** to get information on the app, or allow the app with **ufw allow**

### Get App Info

* ```
  ufw app info <app_name>
  ```

### Set ufw in Verbose Mode

* ```
  ufw verbose
  ```

### Allow a Specific App

* Template
  * ```
    ufw allow "<app_name>"
    ```
* Example
  * ```
    ufw allow "NGINX Full"
    ```

## References

ufw man pages - https://manpages.ubuntu.com/manpages/trusty/man8/ufw.8.html