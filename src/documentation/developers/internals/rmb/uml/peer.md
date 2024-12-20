<h1> RMB Peer </h1>

## Introduction

We present an example of RMB peer. Note that the extension for this kind of file is `.wsd`.

## Example

```
@startuml RMB

participant "Local Process" as ps
database "Local Redis" as redis
participant "Rmb Peer" as peer

participant "Rmb Relay" as relay
note across: Handling Out Request
peer --> relay: Establish connection

ps -> redis: PUSH message on \n(msgbus.system.local)
redis -> peer : POP message from \n(msgbus.system.local)

peer -> relay: message pushed over the websocket to the relay
...
relay -> peer: received response
peer -> redis: PUSH over $msg.reply_to queue
...
note across: Handling In Request
relay --> peer: Received a request
peer -> redis: PUSh request to `msgbus.$cmd`
redis -> ps: POP new request msg
ps -> ps: Process message
ps -> redis: PUSH to (msgbus.system.reply)
redis -> peer: POP from (msgbus.system.reply)
peer -> relay: send response message
@enduml
```