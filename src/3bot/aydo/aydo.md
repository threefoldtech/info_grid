<h1> AYDO Plugin </h1>

- [Introduction](#introduction)
- [Some Key Features](#some-key-features)
- [Install AYDO](#install-aydo)
- [Start Using AYDO](#start-using-aydo)
- [More Information](#more-information)

***

## Introduction

The [AYDO plugin](https://github.com/freeflowuniverse/aydo), a fork of the project [SFTPGo](https://github.com/drakkan/sftpgo), is  a fully featured and highly configurable SFTP server. It offers optional HTTP/S, FTP/S and WebDAV support, such as S3, Google Cloud Storage and Azure Blob. The following is a brief overview of SFTPGo and its forked project, AYDO.

This is a relatively new project that will most likely evolve independently from SFTPGo. The following information is based on SFTPGo's documentation and the current document will be updated as new information and changes about the AYDO plugin come along.

***

## Some Key Features

AYDO supports many features such as serving local filesystem and encrypted local filesystem as well as virtual folders, where a virtual folder can use any of the supported storage backends.

It supports also different databases, such as SQLite, MySQL and PostgreSQL. AYDO offers support for HAProxy PROXY protocol.

When using AYDO, the configuration format is at your choice since it supports JSON, TOML, YAML, HCL and envfile.

Developed and tested on Linux, after each commit, the code is automatically built and tested on Linux, macOS, Windows and FreeBSD.

***

## Install AYDO

The AYDO plugin is available as a [docker image](https://github.com/freeflowuniverse/aydo/blob/development/docker/README.md).

It is also available as [binaries](https://github.com/drakkan/sftpgo/releases) for Linux, macOS and Windows.

***

## Start Using AYDO

To start using AYDO, you need to create an admin user. This can be done in several ways:

- by using the web admin interface
  - The default URL is 
  - ```
    http://127.0.0.1:8080/web/admin
    ```
- by loading initial data
- by enabling create_default_admin in your configuration file and setting the environment variables - SFTPGO_DEFAULT_ADMIN_USERNAME and SFTPGO_DEFAULT_ADMIN_PASSWORD

***

## More Information

For more information, read the [AYDO documentation](https://github.com/freeflowuniverse/aydo).