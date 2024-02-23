<h1> Installing Pulumi </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Installation](#installation)
- [Verification](#verification)

***

## Introduction

You can install [Pulumi](https://www.pulumi.com/) on Linux, MAC and Windows.

To install Pulumi, simply follow the steps provided in the [Pulumi documentation](https://www.pulumi.com/docs/install/). We cover the basic steps here for convenience.

## Installation

* Install on Linux
    * ```
      curl -fsSL https://get.pulumi.com | sh
      ```
* Install on MAC
    * ```
      brew install pulumi/tap/pulumi
      ```
* Install on Windows
    * ```
      choco install pulumi
      ```

For Linux, if you prefer checking the shell script before executing, please do so.

For Windows, note that there are other installation methods. Read the [Pulumi documentation](https://www.pulumi.com/docs/install/) for more information.

## Verification

To verify that Pulumi is properly installed on your machine, use the following command:

```
pulumi version
```

If you need more in-depth information, e.g. installing a specific version or migrating from an older version, please check the [installation documentation](https://www.pulumi.com/docs/install/).