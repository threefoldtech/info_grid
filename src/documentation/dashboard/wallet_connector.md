<h1> Wallet Connector </h1>

<h2>Table of Contents </h2>

- [Introduction](#introduction)
- [Supported Networks](#supported-networks)
- [Create a Wallet](#create-a-wallet)
- [Import a Wallet](#import-a-wallet)

***

## Introduction

To interact with TFChain, users can connect their TFChain wallet to the wallet connector available on the ThreeFold Dashboard.

You can create a new wallet or import an existing wallet.

## Supported Networks

Currently, we're supporting four different networks:

- Dev net, for development purposes
  - [https://dashboard.dev.grid.tf](https://dashboard.dev.grid.tf)
- QA net, for internal testing and verifications
  - [https://dashboard.qa.grid.tf](https://dashboard.qa.grid.tf)
- Test net, for testing purposes
  - [https://dashboard.test.grid.tf](https://dashboard.test.grid.tf)
- Main net, for production-ready purposes
  - [https://dashboard.grid.tf](https://dashboard.grid.tf)

![ ](./img/profile_manager1.png)

## Create a Wallet

Open the ThreeFold Dashboard and enter the following information to create your new wallet.

![ ](./img/profile_manager2.png)

- `Mnemonics` are the secret words of your Polkadot account. Click on the **Create Account** button to generate yours.
- `Password` is used to access your account.
- `Confirm Password`

After setting your credentials, click on **Connect**. Once your profile gets activated, you should find your **Twin ID** and **Address** generated under your **_Mnemonics_**. Your **Account Balance** will be available at the top right corner.

![ ](./img/profile_manager3.png)

## Import a Wallet

You can import an existing wallet by entering in `Mnemonics` the associated seed phrase or HEX secret.

- To import a wallet created with the TF Dashboard, use the seed phrase provided when you created the account.
- To import a wallet or a farm created on the TF Connect app, use the TFChain HEX secret.
  - From the menu, open **Wallet** -> **Wallet name** -> **Info symbol (i)**, and then reveal and copy the **TFChain Secret**.