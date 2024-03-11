![specs](img/specs_header.jpg)

# System requirements

System that is easy to provision storage capacity on the TF grid
- user can create X storage nodes on a random or specific locations
- user can list their storage nodes
- check node status/info in some shape or form in a monitoring solution
- external authentication/payment system using threefold connect app
- user can delete their storage nodes
- user can provision mode storage nodes
- user can increase total size of storage solutions
- user can install the quantum safe filesystem on any linux based system, physical or virtual

# Non-functional requirements

- How many expected concurrent users: not application - each user will have it's own local binary and software install.
- How many users on the system: 10000-100000
- Data store: fuse filesystem plus local and grid based ZDB's
- How critical is the system? it needs to be alive all the time.
- What do we know about the external payment system?
Threefold Connect, use QR code for payments and validate on the blockchain
- Life cycle of the storage nodes? How does the user keep their nodes alive? The local binary / application has a wallet from which it can pay for the existing and new storage devices.  This wallet needs to be kept topped up.
- When the user is asked to sign the deployment of 20 storage nodes:
   - will the user sign each single reservation? or should the system itself sign it for the user and show the QR code only for payments?
- Payments should be done to the a specific user wallet and with a background service with extend the user pools or /extend in the bot conversation? to be resolved
- Configuration and all metadata should be stored as a hash / private key.  With this information you are able to regain access to your stored data from everywhere.


# Components mapping / SALs

- Entities: User, storage Node
- ReservationBuilder: builds reservation for the user to sign (note the QR code data size limit is 3KB)
- we need to define how many nodes can we deploy at a time, shouldn't exceed 3KB for the QR Code, if it exceeds the limit should we split the reservations?
   
- UserInfo: user info are loaded from threefold login system
- Blockchain Node (role, configurations) 
- Interface to Threefold connect (authentication+payment)  /identify + generate payments
- User notifications / topup
- Monitoring: monitoring + redeployment of the solutions again if they go down, when redeploying who owns the reservation to delete -can be fixed with delete signers field- and redeploy, but to deploy we need the user identity or should we inform the user in telegram and ask him to /redeploy
- Logging 

# Tech stack

- [JS-SDK[](https://github.com/threefoldtech/js-sdk) (?)
- [0-db](https://github.com/threefoldtech/0-db-s)
- [0-db-fs](https://github.com/threefoldtech/0-db-fs)
- [0-stor_v2](https://github.com/threefoldtech/0-stor_v2)
- [quantum_storage](https://github.com/threefoldtech/quantum-storage)



# Blockers


Idea from blockchain jukekebox brainstorm:

## payments
- QR code contains threebot://signandpay/#https://tf.grid/api/a6254a4a-bdf4-11eb-8529-0242ac130003 (can also be uni link)
- App gets URL
- URL gives data
- { DataToSign : {RESERVATIONDETAILS}, Payment: {PAYMENTDETAILS}, CallbackUrl: {CALLBACKURL} }
- App signs reservation, makes payment, calls callbackurl { SingedData : {SINGEDRESERVATION}, Payment: {FINISHED_PAYMENTDETAILS}}

Full flow:
- User logs in using normal login flow
- User scans QR
- User confirms reservation and payment in the app
