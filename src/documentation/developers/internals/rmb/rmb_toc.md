<h1> Reliable Message Bus (RMB) </h1>

Reliable message bus is a secure communication panel that allows bots to communicate together in a chat like way. It makes it very easy to host a service or a set of functions to be used by anyone, even if your service is running behind NAT.

Out of the box RMB provides the following:

- Guarantee authenticity of the messages. 
  - You are always sure that the received message is from whoever is pretending to be.
- End to End encryption.
- Support for 3rd party hosted relays. 
  - Anyone can host a relay and people can use it safely since there is no way messages can be inspected while using e2e. That's similar to home servers by matrix.

<h2> Table of Contents </h2>

- [Introduction to RMB](rmb_intro.md)
- [RMB Specs](rmb_specs.md)
- [RMB Peer](uml/peer.md)
- [RMB Relay](uml/relay.md)