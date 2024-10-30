<h1>Firewalld Basic Commands</h1>

## Introduction

We present a quick introduction to [firewalld](https://firewalld.org/), a free and open-source firewall management tool for Linux operating systems. This guide can be useful for users of the TFGrid deploying on full and micro VMs as well as other types of deployment.

## Firewalld Basic Commands

### Install Firewalld 

  * ```
    apt install firewalld -y
    ```
### See the Status of Firewalld

  * ```
    firewall-cmd --state
    ```
### Enable Firewalld

  * ```
    systemctl enablefirewalld
    ```
### Stop Firewalld

  * ```
    systemctl stop firewalld
    ```
### Start Firewalld

  * ```
    systemctl start firewalld
    ```
### Disable Firewalld

  * ```
    systemctl disable firewalld
    ```
### Mask Firewalld

  * ```
    systemctl mask --now firewalld
    ```
### Unmask Firewalld

  * ```
    systemctl unmask --now firewalld
    ```
### Add a Service to Firewalld

  * Temporary
    * ```
      firewall-cmd --add-service=<service_name>
      ```
  * Permanent
    * ```
      firewall-cmd --add-service=<service_name> --permanent
      ```

### Remove a Service to Firewalld

  * Temporary
    * ```
      firewall-cmd --remove-service=<service_name>
      ```
  * Permanent
    * ```
      firewall-cmd --remove-service=<service_name> --permanent
      ```

### Remove the Diles of a Service to Firewalld

  * ```
    rm -f /etc/firewalld/services/<service_name>.xml*
    ```

### See if a Service is Available

  * ```
    firewall-cmd --info-service=<service_name>
    ``` 

### Reload Firewalld

  * ```
    firewall-cmd --reload
    ```

### Display the Services and the Open Ports for the Public Zone

  * ```
    firewall-cmd --list-all --zone=public
    ```

### Display the Open Ports by Services and Port Numbers

* By services
  * ```
    firewall-cmd --list-services
    ```
* By port numbers
  * ```
    firewall-cmd --list-ports
    ```

### Add a Port for tcp

  * ```
    firewall-cmd --zone=public --add-port=<port>/tcp
    ```
### Add a Port for udp

  * ```
    firewall-cmd --zone=public --add-port=<port>/udp
    ```
### Add a Port for tcp and udp

  * ```
    firewall-cmd --zone=public --add-port=<port>
    ```

## References

ufw man pages - https://firewalld.org/documentation/man-pages/firewalld.html