<h1> Quantum Safe Storage Bootstrap </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Run the Bootstrap](#run-the-bootstrap)

---

## Introduction

We show how to use the bootstrap program written in V to set a Quantum Safe Storage instance.

You can either the bootstrap program in V or use the bash script.

## Prerequisites

- [V](https://vlang.io/)

## Run the Bootstrap

You can use the bootstrap (`bootstrap/bootstrap.v`) to download the required components and start everything. The default configuration uses everything locally. You can pass a specific zstor configuration file to use a real backend.

Everything will be installed in `~/.threefold` and nowhere else.
This bootstrap will spawn two `zdb`'s', one `zstor daemon` and the `zdbfs` fuse system.

First go into the bootstrap directory:

```
cd bootstrap
```

To run the bootstrap program:

```
v run bootstrap.v
```

To run the bash script:

```
sudo bash build.sh
```