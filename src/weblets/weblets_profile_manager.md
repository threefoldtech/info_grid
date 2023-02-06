# Profile Manager

Currently, we're supporting four different networks.
- One for development purposes (Devnet) where you can find it at https://play.dev.grid.tf
- One for internal testing and verifications (QAnet) where you can find it at https://play.qa.grid.tf
- One for testing (Testnet) where you can find it at https://play.test.grid.tf
- One for our mainnet and you can find it at https://play.grid.tf

    
![ ](./img/profile_manager1.png)

Start by creating a profile from the upper right button. This creates a profile, saved and encrypted locally in your browser.

### Secure 

![ ](./img/pro_manager5.png)

The **Profile Manager Password** is how you store your profile info in browser local storage.
Create a new profile by visiting the **Create Profile Manager** tab and enter your new password. After you're done, click on **Create New Profile Manager**. 

You'll need that password to be able to load your profiles afterwards from the **Activate Profile Manager** tab.

![ ](./img/pro_manager6.png)

### Process

Start entering the following information required to create your new profile.

![ ](./img/dev_profile2.png)

- `Profile Name`: Any chosen name, makes it easy for you to remember between sessions.
- `Mnemonics` are the secret words of your Polkadot account, [Generate yours here!](tfchain_portal_polkadot_create_account). 
- Your `Public SSH Key` is used to login into VM's, Kubernetes, ... 

After you finish typing your credentials, click on **Activate**. Once your profile gets activated, you should find your **Twin ID** and **Address** generated under your ***Mnemonics*** for verification. Also, your **Account Balance** will be available at the top right corner under your profile name. 

![ ](./img/dev_profile3.png)