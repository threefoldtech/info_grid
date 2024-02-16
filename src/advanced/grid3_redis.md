<h1> Redis </h1>

<h2> Table of Contents </h2>

- [Introduction](#introduction)
- [Install Redis](#install-redis)
  - [Linux](#linux)
  - [MacOS](#macos)
- [Run Redis](#run-redis)

***

## Introduction

Redis is an open-source, in-memory data structure store that is widely used as a caching layer, message broker, and database. It is known for its speed, versatility, and support for a wide range of data structures. Redis is designed to deliver high-performance data access by storing data in memory, which allows for fast read and write operations. It supports various data types, including strings, lists, sets, hashes, and more, and provides a rich set of commands for manipulating and querying the data.

Redis is widely used in various use cases, including caching, session management, real-time analytics, leaderboards, task queues, and more. Its simplicity, speed, and flexibility make it a popular choice for developers who need a fast and reliable data store for their applications. In Threefold's ecosystem context, Redis can be used as a backend mechanism to communicate with the nodes on the ThreeFold Grid using the Reliable Message Bus.



## Install Redis

### Linux

If you don't find Redis in your Linux distro's package manager, check the [Redis downloads](https://redis.io/download) page for the source code and installation instructions.

### MacOS

On MacOS, [Homebrew](https://brew.sh/) can be used to install Redis. The steps are as follow:

```
brew update
brew install redis
```

Alternatively, it can be built from source, using the same [download page](https://redis.io/download/) as shown above.



## Run Redis

You can launch the Redis server with the following command:

```
redis-server
```