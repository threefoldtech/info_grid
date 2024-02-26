
<h1>Additional Information</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [Connect to Other Nodes](#connect-to-other-nodes)
- [Possible Peers](#possible-peers)
- [Default Port](#default-port)
- [Check Network Information](#check-network-information)
- [Test the Network](#test-the-network)
- [Key Pair](#key-pair)
- [Running without TUN interface](#running-without-tun-interface)
- [API](#api)
- [Message System](#message-system)
- [Inspecting Node Keys](#inspecting-node-keys)

***

## Introduction

We provide additional information concerning Mycelium and how to properly use it.

## Connect to Other Nodes

If you want to connect to other nodes, you can specify their listening address as
part of the command (combined with the protocol they are listening on, usually TCP);

```sh
mycelium --peers tcp://83.231.240.31:9651 quic://185.206.122.71:9651
```

If you are using other tun inferface, e.g. utun3 (default), you can set a different utun inferface

```sh
mycelium --peers tcp://83.231.240.31:9651 quic://185.206.122.71:9651 --tun-name utun9
```

## Possible Peers

Here are some possible peers.

```
tcp://146.185.93.83:9651
quic://83.231.240.31:9651
quic://185.206.122.71:9651
tcp://[2a04:f340:c0:71:28cc:b2ff:fe63:dd1c]:9651
tcp://[2001:728:1000:402:78d3:cdff:fe63:e07e]:9651
quic://[2a10:b600:1:0:ec4:7aff:fe30:8235]:9651
```

## Default Port

By default, the node will listen on port `9651`, though this can be overwritten with the `-p` flag.

## Check Network Information

You can check your Mycelium network information by running the following line:

```bash
mycelium inspect --json
```

Where a typical output would be:

```
{
  "publicKey": "abd16194646defe7ad2318a0f0a69eb2e3fe939c3b0b51cf0bb88bb8028ecd1d",
  "address": "3c4:c176:bf44:b2ab:5e7e:f6a:b7e2:11ca"
}
```

## Test the Network

You can easily test that the network works by pinging to anyone in the network.

```
ping6 3c4:c176:bf44:b2ab:5e7e:f6a:b7e2:11ca
```

## Key Pair

The node uses a `x25519` key pair from which its identity is derived. The private key of this key pair
is saved in a local file (32 bytes in binary format). You can specify the path to this file with the
`-k` flag. By default, the file is saved in the current working directory as `priv_key.bin`.

## Running without TUN interface

It is possible to run the system without creating a TUN interface, by starting with the `--no-tun` flag.
Obviously, this means that your node won't be able to send or receive L3 traffic. There is no interface
to send packets on, and consequently no interface to send received packets out of. From the point of
other nodes, your node will simply drop all incoming L3 traffic destined for it. The node **will still
route traffic** as normal. It takes part in routing, exchanges route info, and forwards packets not
intended for itself.

The node also still allows access to the [message subsystem](#message-system).

## API

The node starts an HTTP API, which by default listens on `localhost:8989`. A different listening address
can be specified on the CLI when starting the system through the `--api-server-addr` flag. The API
allows access to [send and receive messages](#message-system), and will later be expanded to allow
admin functionality on the system. Note that message are sent using the identity of the node, and a
future admin API can be used to change the system behavior. As such, care should be taken that this
API is not accessible to unauthorized users.

## Message System

A message system is provided which allows users to send a message, which is essentially just "some data"
to a remote. Since the system is end-to-end encrypted, a receiver of a message is sure of the authenticity
and confidentiality of the content. The system does not interpret the data in any way and handles it
as an opaque block of bytes. Messages are sent with a deadline. This means the system continuously
tries to send (part of) the message, until it either succeeds, or the deadline expires. This happens
similar to the way TCP handles data. Messages are transmitted in chunks, which are embedded in the
same data stream used by L3 packets. As such, intermediate nodes can't distinguish between regular L3
and message data.

The primary way to interact with the message system is through [the API](#API). The message API is
documented in [here](./api_yaml.md). For some more info about how to
use the message system, see [the Message section](./message.md).


## Inspecting Node Keys

Using the `inspect` subcommand, you can view the address associated with a public key. If no public key is provided, the node will show
its own public key. In either case, the derived address is also printed. You can specify the path to the private key with the `-k` flag.
If the file does not exist, a new private key will be generated. The optional `--json` flag can be used to print the information in json
format.

```sh
mycelium inspect a47c1d6f2a15b2c670d3a88fbe0aeb301ced12f7bcb4c8e3aa877b20f8559c02
```

Where the output could be something like this:

```sh
Public key: a47c1d6f2a15b2c670d3a88fbe0aeb301ced12f7bcb4c8e3aa877b20f8559c02
Address: 27f:b2c5:a944:4dad:9cb1:da4:8bf7:7e65
```