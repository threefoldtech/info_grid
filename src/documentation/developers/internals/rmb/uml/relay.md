<h1> RMB Relay </h1>

## Introduction

We present an example of RMB relay. Note that the extension for this kind of file is `.wsd`.

## Example


```
@startuml RMB
actor "Peer 1" as peer1
participant "Relay 1" as relay1
participant "Relay 2" as relay2
actor "Peer 2" as peer2
actor "Peer 3" as peer3

peer1 --> relay1: Establish WS connection
peer2 --> relay1: Establish WS connection
peer3 --> relay2: Establish WS connection

peer1 -> relay1: Send message (Envelope)\n(destination "Peer 2")
relay1 -> peer2: Forward message directly

peer1 -> relay1: Send message (Envelope)\n(destination "Peer 3")
note right
"Peer 3" does not live on "Relay 1" hence federation is
needed
end note
relay1 -> relay2: Federation of message for\n Peer 3
relay2 -> peer3: Forward message directly
@enduml
```