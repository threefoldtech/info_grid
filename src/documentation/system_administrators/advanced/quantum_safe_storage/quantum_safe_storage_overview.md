<h1> Quantum Safe Storage Overview </h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Components](#components)
- [Repository](#repository)

---

## Introduction

Quantum Safe Storage (also known as Quantum Safe Filesystem or QSFS) is a distributed data store that is designed to provide resilience, security, and good performance. It is implemented on the front end as a FUSE filesystem that can be mounted on any Linux machine. All files written to this filesystem are then dispersed among a configurable number of back ends, such that failure of X nodes or Y groups of nodes can be tolerated without losing any data.

The system can support petabytes of total capacity, and the front end serves as a cache of configurable size. Data blocks are encrypted and dispersed using forward look error correcting codes (FLECC). Once stored in the back ends, blocks can be freed from the front end to make room for fresh data once the cache is full. When that data is needed again, it is reconstructed and decrypted on the fly.

Thanks to the methods used, not even a quantum computer capable of breaking encryption can decode data stored in the back ends.

## Components

There are three main components comprising QSFS. These components are:

- [0-db-fs](https://github.com/threefoldtech/0-db-fs) (also known as zdbfs) this is what creates the FUSE mount (the actual user facing filesystem) this component is not aware of the back end operations like encryption and FLECC. It's main job is to expose the FUSE filesystem and store its data in a local zdb instance
- [0-db](https://github.com/threefoldtech/0-db) (also known as zdb) is used both for the local cache db and also for the back end data stores. Zdb is a fast and efficient append only key value database
- [0-stor](https://github.com/threefoldtech/0-stor_v2) (also known as zstor) is responsible for the encryption and FLECC operations on data blocks and database indexes, storing them among the configured backends

Each component is also capable of independent operation. For example, zstor can be used to store individual files of any kind. Zdb is a general purpose key value store compatible with a subset of Redis operations, and zdbfs can be used without any offloading of data to back ends.

More information about these projects can be found in their repositories linked above.

## Repository

There is also a Quantum Safe Storage repository available [here](https://github.com/threefoldtech/quantum-storage). It provides some set up scripts, documentation, and other resources. Be advised that the contents of the repository may be outdated or incomplete in places. All the necessary information to get started with QSFS is contained in this guide.