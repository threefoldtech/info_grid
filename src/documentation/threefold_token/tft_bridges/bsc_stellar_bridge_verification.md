<h1>BSC-Stellar Bridge Verification</h1>

<h2>Table of Contents</h2>

- [Introduction](#introduction)
- [From Stellar to BSC](#from-stellar-to-bsc)
- [From BSC to Stellar](#from-bsc-to-stellar)
- [Conclusion](#conclusion)

***

## Introduction

In this guide, we show how to verify transactions on the BSC-Stellar bridge.

When using the TFT bridge to Binance Chain (BSC), it's not simple to verify that tokens arrived at the destination wallet. The core reason is that it's not a regular token transfer, and so it doesn't show up that way in blockchain explorers.

Instead, the result of using the bridge is a contract call that actually mints wrapped TFT on Binance Chain. The corresponding tokens are vaulted on Stellar, and when the bridge is used in the opposite direction, TFT on Binance Chain are burnt and then released on Stellar. Thus, the total number of TFT in circulation is constant throughout these operations.

What we can do, instead of looking at token transfers, is to look for the mint events themselves. By parsing together data from a few different sources, we can verify that tokens sent to the bridge address on Stellar indeed arrived at their destination on Binance Chain.

## From Stellar to BSC

We start with a bridge example going from Stellar to BSC. For this tutorial, we'll use an example transaction found by looking at the transaction history from the [bridge wallet](https://stellar.expert/explorer/public/account/GBFFWXWBZDILJJAMSINHPJEUJKB3H4UYXRWNB4COYQAF7UUQSWSBUXW5). This wallet uses both directions of bridging. In our case, we want to look for an inbound transaction. Here's an example:

![](./img/bsc_stellar_picture_1.png) 

The first thing to do is decode the destination wallet address on Binance Chain, which is contained in the memo we see here on Stellar. It's encoded in base 64 and we can convert back to the original hex using a tool like this [Base64 to Hex Converter](https://base64.guru/converter/decode/hex):

![](./img/bsc_stellar_picture_2.png)

The output is the destination address on Binance Chain. Since we usually write hex values with a leading `0x`, the full address in the normal format is `0x64df465bbcee5db45131e9406662818e8ba34fc0`.

The other thing to note is the date and time of the original Stellar transaction. There are sometimes delays on the bridge, but we know that the outbound transaction on Binance Chain will always happen after the inbound transaction on Stellar. In this case, we are looking at the most recent transaction on the Stellar side of the bridge, so we can just look for the most recent transaction on the Binance side too.

To do that, we'll go to the [Bitquery explorer](https://explorer.bitquery.io/bsc) for BSC. We're looking for the token contract for TFT on Binance Chain, which you can find in our documentation: `0x8f0fb159380176d324542b3a7933f0c2fd0c2bbf`. 

On the [contract page](https://explorer.bitquery.io/bsc/token/0x8f0fb159380176d324542b3a7933f0c2fd0c2bbf), click **Events**:

![](./img/bsc_stellar_picture_3.png)

Then on the row **Mint** events, click on the icon aligned with the **Event Count** column:

![](./img/bsc_stellar_picture_4.png)

We then arrive at [this page](https://explorer.bitquery.io/bsc/txs/events?contract=0x8f0fb159380176d324542b3a7933f0c2fd0c2bbf&event=85a66b9141978db9980f7e0ce3b468cebf4f7999f32b23091c5c03e798b1ba7a):

![](./img/bsc_stellar_picture_5.png)

You can use the **Date range** selector here to look for events in the past. In this case, we'll just look for the latest one, since that's what we're using for our example. Click the transaction link and then copy the transaction hash from the next page:

![](./img/bsc_stellar_picture_6.png)

To get a look into the contract call, we switch over to [BscScan](https://bscscan.com/) at this point for a better view. Search for the transaction hash and then select the event log. We will then see the output address and the amount of TFT minted in the data below:

![](./img/bsc_stellar_picture_7.png)

We can see that the address matches the one we decoded from the Stellar memo. As for the **tokens** amount, we need to account fo the fact that TFT uses 7 decimal places. For this reason, we move the decimal place by dividing by 1e7 (i.e. 1x10⁷):

![](./img/bsc_stellar_picture_8.png)

The original transaction on Stellar was for 2600 TFT, and the output after subtracting the 100 TFT bridge fee is 2500 TFT.

## From BSC to Stellar

Now, we will see a bridge example going from BSC to Stellar. This time, we start at the BscScan explorer. 

Here is an example bridge transaction, as seen from the account transactions view, which is the default view if you search for a wallet address:

![](./img/BSC%20to%20Stellar1.jpeg)

We can identify it because it's using the **Withdraw** method in a transaction to the TFT contract address on BSC.

If we open the [Transaction Details page](https://bscscan.com/tx/0xae2a9b5cdad652ecb1e6252ee44a7f0e3c5fc9cdf1df9fddff3b0c100c4b3cb5) by clicking on the transaction hash and switch to the **Logs** view, we can see more details:

![](./img/BSC%20to%20Stellar2.png)

In particular, this shows us the destination address on Stellar and the TFT amount. To get the decimal form, we once again divide by 1e7 (i.e. 1x10⁷).

Back on StellarExpert, we can find a transaction on the same date just shortly after the transaction on BSC, for the same amount of TFT minus the 1 TFT bridge fee. It originates from the bridge address on Stellar and the destination is the address we see in the contract call above:

![](./img/BSC%20to%20Stellar3.png)

As a final step, we double-check that the transaction we see on Stellar is actually the result of the bridge interaction we saw on BSC. It's possible, after all, that the user has sent multiple transactions with the same amount. To do this, we look at the memo on the Stellar transaction. As above, we need to convert from base 64 to hex again. To do so, we can once again use the [Base64 to HEX Converter](https://base64.guru/converter/decode/hex):

![](./img/BSC%20to%20Stellar4.png) 

If the output hex doesn't already look familiar, you can compare it to the transaction hash from above, while remembering that `0x` is just a formatting convention indicating that hex data follows. Indeed, we can even search it on BscScan, to come full circle back to transaction details page we have seen before. 

We have made a direct link between the use of the bridge contract on BSC and the resulting payment from the bridge on Stellar.

## Conclusion

In this guide, we covered how to verify bridge transactions going from BSC to Stellar and from Stellar to BSC.

In the world of public blockchains, all data is recorded and accessible, but sometimes it takes some investigation to find what we are looking for.

If you have any questions, you can ask the ThreeFold community for help on the [ThreeFold Forum](http://forum.threefold.io/) or on the [ThreeFold Grid Tester Community](https://t.me/threefoldtesting) on Telegram.