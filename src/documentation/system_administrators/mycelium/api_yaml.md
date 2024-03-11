<h1>API</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [File Example](#file-example)

***

## Introduction

We provide an example of a YAML API file.


## File Example

```

openapi: 3.0.2
info:
  version: '1.0.0' 
  
  title: Mycelium management
  contact:
    url: 'https://github.com/threefoldtech/mycelium'
  license:
    name: Apache 2.0
    url: 'https://github.com/threefoldtech/mycelium/blob/master/LICENSE'
  
  description: |
    This is the specification of the **mycelium** management API. It is used to perform admin tasks on the system, and
    to perform administrative duties.

externalDocs:
  description: For full documentation, check out the mycelium github repo.
  url: 'https://github.com/threefoldtech/mycelium'

tags:
  - name: Admin
    description: Administrative operations
  - name: Peer
    description: Operations related to peer management
  - name: Message
    description: Operations on the embedded message subsystem

servers:
  - url: 'http://localhost:8989'

paths:
  '/api/v1/peers':
    get:
      tags:
        - Admin
        - Peer
      summary: List known peers
      description: |
        List all peers known in the system, and info about their connection.
        This includes the endpoint, how we know about the peer, the connection state, and if the connection is alive the amount
        of bytes we've sent to and received from the peer.
      operationId: getPeers
      responses:
        '200':
          description: Succes
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/PeerStats'

  '/api/v1/messages':
    get:
      tags:
        - Message
      summary: Get a message from the inbound message queue
      description: |
        Get a message from the inbound message queue. By default, the message is removed from the queue and won't be shown again.
        If the peek query parameter is set to true, the message will be peeked, and the next call to this endpoint will show the same message.
        This method returns immediately by default: a message is returned if one is ready, and if there isn't nothing is returned. If the timeout
        query parameter is set, this call won't return for the given amount of seconds, unless a message is received
      operationId: popMessage
      parameters:
        - in: query
          name: peek
          required: false
          schema:
            type: boolean
          description: Whether to peek the message or not. If this is true, the message won't be removed from the inbound queue when it is read
          example: true
        - in: query
          name: timeout
          required: false
          schema: 
            type: integer
            format: int64
            minimum: 0
          description: |
            Amount of seconds to wait for a message to arrive if one is not available. Setting this to 0 is valid and will return
            a message if present, or return immediately if there isn't
          example: 60
        - in: query
          name: topic 
          required: false
          schema: 
            type: string 
            format: byte
            minLength: 0
            maxLength: 340 
          description: |
            Optional filter for loading messages. If set, the system checks if the message has the given string at the start. This way
            a topic can be encoded.
          example: example.topic
      responses:
        '200':
          description: Message retrieved
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InboundMessage'
        '204':
          description: No message ready
    post:
      tags:
        - Message
      summary: Submit a new message to the system.
      description: |
        Push a new message to the systems outbound message queue. The system will continuously attempt to send the message until
        it is either fully transmitted, or the send deadline is expired.
      operationId: pushMessage
      parameters:
        - in: query
          name: reply_timeout
          required: false
          schema: 
            type: integer
            format: int64
            minimum: 0
          description: |
            Amount of seconds to wait for a reply to this message to come in. If not set, the system won't wait for a reply and return
            the ID of the message, which can be used later. If set, the system will wait for at most the given amount of seconds for a reply
            to come  in. If a reply arrives, it is returned to the client. If not, the message ID is returned for later use.
          example: 120
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PushMessageBody'
      responses:
        '200':
          description: We received a reply within the specified timeout
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/InboundMessage'

        '201':
          description: Message pushed successfully, and not waiting for a reply
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PushMessageResponseId'
        '408':
          description: The system timed out waiting for a reply to the message
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PushMessageResponseId'

  '/api/v1/messsages/reply/{id}':
    post:
      tags:
        - Message
      summary: Reply to a message with the given ID
      description: |
        Submits a reply message to the system, where ID is an id of a previously received message. If the sender is waiting
        for a reply, it will bypass the queue of open messages.
      operationId: pushMessageReply 
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
            format: hex
            minLength: 16
            maxLength: 16
          example: abcdef0123456789
      requestBody:
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/PushMessageBody'
      responses:
        '204':
          description: successfully submitted the reply

  '/api/v1/messages/status/{id}':
    get:
      tags:
        - Message
      summary: Get the status of an outbound message
      description: |
        Get information about the current state of an outbound message. This can be used to check the transmission
        state, size and destination of the message.
      operationId: getMessageInfo
      parameters:
        - in: path
          name: id
          required: true
          schema:
            type: string
            format: hex
            minLength: 16
            maxLength: 16
          example: abcdef0123456789
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/MessageStatusResponse'
        '404':
          description: Message not found


components:
  schemas:
    Endpoint:
      description: Identification to connect to a peer
      type: object
      properties:
        proto:
          description: Protocol used
          type: string
          enum:
            - 'tcp'
            - 'quic'
          example: tcp
        socketAddr:
          description: The socket address used
          type: string
          example: 192.0.2.6:9651

    PeerStats:
      description: Info about a peer
      type: object
      properties:
        endpoint:
          $ref: '#/components/schemas/Endpoint'
        type:
          description: How we know about this peer
          type: string
          enum:
            - 'static'
            - 'inbound'
            - 'linkLocalDiscovery'
          example: static
        connectionState:
          description: The current state of the connection to the peer
          type: string
          enum:
            - 'alive'
            - 'connecting'
            - 'dead'
          example: alive
        connectionTxBytes:
          description: The amount of bytes transmitted on the current connection
          type: integer
          format: int64
          minimum: 0
          example: 464531564
        connectionRxBytes:
          description: The amount of bytes received on the current connection
          type: integer
          format: int64
          minimum: 0
          example: 64645089

    InboundMessage:
      description: A message received by the system
      type: object
      properties:
        id:
          description: Id of the message, hex encoded
          type: string
          format: hex
          minLength: 16
          maxLength: 16
          example: 0123456789abcdef
        srcIp:
          description: Sender overlay IP address
          type: string
          format: ipv6
          example: 249:abcd:0123:defa::1
        srcPk:
          description: Sender public key, hex encoded
          type: string
          format: hex
          minLength: 64
          maxLength: 64
          example: fedbca9876543210fedbca9876543210fedbca9876543210fedbca9876543210
        dstIp:
          description: Receiver overlay IP address
          type: string
          format: ipv6
          example: 34f:b680:ba6e:7ced:355f:346f:d97b:eecb
        dstPk:
          description: Receiver public key, hex encoded. This is the public key of the system
          type: string
          format: hex
          minLength: 64
          maxLength: 64
          example: 02468ace13579bdf02468ace13579bdf02468ace13579bdf02468ace13579bdf
        topic:
          description: An optional message topic
          type: string
          format: byte
          minLength: 0
          maxLength: 340
          example: hpV+
        payload:
          description: The message payload, encoded in standard alphabet base64
          type: string
          format: byte
          example: xuV+

    PushMessageBody:
      description: A message to send to a given receiver
      type: object
      properties:
        dst:
          $ref: '#/components/schemas/MessageDestination'
        topic:
          description: An optional message topic
          type: string
          format: byte
          minLength: 0
          maxLength: 340
          example: hpV+
        payload:
          description: The message to send, base64 encoded
          type: string
          format: byte
          example: xuV+

    MessageDestination:
      oneOf:
        - description: An IP in the subnet of the receiver node
          type: object 
          properties:
            ip:
              description: The target IP of the message
              format: ipv6
              example: 249:abcd:0123:defa::1
        - description: The hex encoded public key of the receiver node
          type: object
          properties:
            pk:
              description: The hex encoded public key of the target node
              type: string
              minLength: 64
              maxLength: 64
              example: bb39b4a3a4efd70f3e05e37887677e02efbda14681d0acd3882bc0f754792c32

    PushMessageResponseId:
      description: The ID generated for a message after pushing it to the system
      type: object
      properties:
        id:
          description: Id of the message, hex encoded
          type: string
          format: hex
          minLength: 16
          maxLength: 16
          example: 0123456789abcdef

    MessageStatusResponse:
      description: Information about an outobund message
      type: object
      properties:
        dst:
          description: Ip address of the receiving node
          type: string
          format: ipv6
          example: 249:abcd:0123:defa::1
        state: 
          $ref: '#/components/schemas/TransmissionState'
        created:
          description: Unix timestamp of when this message was created
          type: integer
          format: int64
          example: 1649512789
        deadline:
          description: Unix timestamp of when this message will expire. If the message is not received before this, the system will give up
          type: integer
          format: int64
          example: 1649513089
        msgLen:
          description: Length of the message in bytes
          type: integer
          minimum: 0
          example: 27

    TransmissionState:
      description: The state of an outbound message in it's lifetime
      oneOf:
        - type: string
          enum: ['pending', 'received', 'read', 'aborted']
          example: 'received'
        - type: object
          properties:
            sending:
              type: object
              properties:
                pending:
                  type: integer
                  minimum: 0
                  example: 5
                sent:
                  type: integer
                  minimum: 0
                  example: 17
                acked:
                  type: integer
                  minimum: 0
                  example: 3
      example: 'received'


```