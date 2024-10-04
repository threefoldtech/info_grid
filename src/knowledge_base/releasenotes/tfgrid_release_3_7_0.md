# ThreeFold Grid v3.7.0 Release Note

Release Note of ThreeFold Grid v3.7.0.
It includes updates, improvements and fixes of numerous grid components as described below.


## Component Upgrades

### ThreeFold Wallet v3.7.0
- Include the option to show transaction details (Sender, Receiver, Memo, Blockchain hash, Amount, Asset, Date
- Added Farmer types details
- GraphQL types fix
- Enabled wallet deletion 
- Wallet Cache fixes
- Bugs fixes and generic improvements

### ThreeFold Connect v3.7.0
- Improved loading of webpages
- Released the IOS version of planetary network
- Improved login flow (backend)
- Removed the concept of .3bot from the app registration and other display
- Re-enable TFChain bridge after twin changed
- Backend: Upgraded from  Vue v2 to Vue v3
- Backend: Full kubernetes test deploy stack.
- Frontend: Add typescript, tailwind. Removed the use of vuetify
- Generic Bug fixes


### ThreeFold Grid Proxy Client v1.5.9
- Initial Grid Proxy Client  implementation
- Includes the gridproxy API client along with API-specific information
- Includes classes that represent entities in the context of the API in the sub-module model (for making conversions between JSON objects and V objects).
- Added CI pipeline to run tests


### ThreeFold Chain v2.1.0
- Improved Validation for Public Config (Node) by Implementing a maximum size on all types that are filled in by the user or ZOS tfchain
- Improved Validation for Interfaces (Node) by Implementing a maximum size on all types that are filled in by the user or ZOS tfchain
- Improved Validationfor Public IPs (Farm)
- Improved Validation for Twin IPs
- Reworked public IPs on Contract, they are now shown as a list with the actual public IP object
- Executed billing in a transactional operation tfchain
- Added Restriction of deployment hash length (32 bytes)

### Planetary Network v.3.7.0
- Added support for M1 Mac.
- Refresh list of peers.
- Allow extra peers to be added by TF org.
- Fix UI crashing/lags
- Build for Ubuntu, Windows, Build for Mac

### Freeflow Twin Beta 1.5
- Major Rebranding from Uhuru to Freeflow Twin
- Generic Bug fixes
- Enabled tagging people in chats
- Improved dev setup
- Improved staging+production link setup.
- Self-deploy improvements.
- PWA support
- Add info labels
- HTML encoding of messages
- Overflow handling
- Remember login session
- Chat: Added File upload progress view
- Chat: Added Link preview
- Chat: Adding more search options

### TFGrid Dashboard v1.1.4 
- UX/UI : Updated Color Palette
- Updated Font styles
- Updated sidebar menu UX to include TF Portal, TF Explorer
- Enabled day/night mode 
- TFGrid Explorer: Added Nodes page, Statistic Page, and Farms page ON TFGrid Explorer
- TFGrid Explorer: Added category of listed nodes as (dedicated, rented, and arentable)
- TFGrid Stats: Updated Minting Details on TF Dashboard
- TFGrid Stats: show receipts of previous nodes
- TFGrid Stats: Added Calendar UI
- Clickable Live Support Chat Popup

### TF Playground v1.4.4
- UX/UI : Updated Color Palette
- Updated Fonts.
- New Deployment/Solutions Icons in the sidebar.
- New Actions Icons in the deployment list.
- Added Solution Categories
- Enabled custom ‘Presearch instance’ deployment
- New Capacity Filter 
- Add IPv4 Planetary Network Filter for specific instance deployments
- Newly improved Capacity Management for solution deployment: enabling the setting of a full VM as the default Virtual Machine for deployment, 
- Easily fund a deployment profile / ID by scanning your ID wallet QR Code
- Profile Manager: Avoid losing deployment with Grace Period Listing
- provide a simple list where you can select one of the online Grid gateways 
- Profile Management: Add ‘Confirmation’ popup before deleting a deployment profile
- Added an Identifier for the current network in the sidebar (main/test/devnet)
- TF Playground Wallet: show unlocked/locked tokens in balance
- Profile Management: allow a user to create a profile with no SSH key.
- TFGrid Client TS supports Algorand, Stellar, and TFChain Modules.
- NEW Node Pilot Instance Deployment
- NEW Subsquid Solution


