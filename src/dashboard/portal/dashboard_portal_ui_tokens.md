# Manage your TFT on TFChain

## Transfer TFT between TFChain accounts

The portal can be used to transfer TFTs between 2 accounts that exist on the same chain.

> Remark: testnet and mainnet both have the same TFTs but as the 2 chains are different, there is no way to do a direct transfer between accounts on testnet and on mainnet.

![ ](../img/dashboard_portal_transfer.png ':size=600')

Click on `Transfer` in the sidebar to get the transfer screen.

![ ](../img/dashboard_portal_transfer_detail.png ':size=300')

Fill in the recipient address, the amount of tokens to transfer, and click on `Submit`. Sign in the extension screen, and you're done !

There is no transfer fee, just a signing fee of 0.001 TFT.

## Transfer TFT between Stellar Network and TF-Chain

A minimum amount of TFT is sponsored for the initial setup, but as every action on TF-Chain requires some small TFT amount, TFT can be sent over from the Stellar network.
Also, capacity that is reserved is paid to the Substrate account. For multiple reasons (selling, storing, ...) you might need to transfer this amount to the Stellar network. There is a bridge between the two blockchains available, and transfers can be launched as indicated below.

### Deposit

A deposit of tokens from the Stellar network onto TF-Chain needs to happen from a Stellar wallet, like in the ThreeFold Connect App.

You have 2 options:

- TFT needs to be sent to the bridge account
- specifying in the memo field the twinID that was generated with the Twin creation e.g. twin_110 (dont forget twin_)
- Note there is a transaction cost of 1 TFT.

Or

- You can scan the QR code

Go to portal

!!!include:tfchain_portal_list

Click on `Bridge` in the sidebar to get the transfer screen. Click `Deposit`

![ ](../img/dashboard_portal_deposit_tft.png ':size=400')

### Withdraw

Sending tokens to the Stellar network can happen from this portal, after indicating the destination address and the amount to be transferred.

Go to portal

!!!include:tfchain_portal_list

Click on `Swap` in the sidebar to get the transfer screen. Click `Withdraw`.

![ ](../img/dashboard_portal_withdraw_tft.png ':size=400')

Click on `Submit` and sign using your password.

![ ](../img/dashboard_portal_transaction_sign.png ':size=400')

!!!include:tfchain_portal_toc
