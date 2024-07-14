## My first MultiversX dApp 

I'm really happy that I had the opportunity to participate in the MultiversX blockchain workshop in Cluj together with **Rebegea Dragos**.

This is the tutorial for workshop [Build your first dApp in 30 minutes](https://multiversx.com/builders/build-your-first-multiversx-dapp-in-30-minutes).

---

_First off, we tackled smart contracts. We got our development environment all set up, grabbed a copy of the contract, compiled it, and then deployed it to the blockchain._

_Next, we switched gears to the dApp side of things. We started with the sdk-dapp template and created up a simple yet fully functional dApp. This demonstrates how straightforward it is to develop a dApp that enables users to connect and sign transactions in order to interact with a smart contract._

--- 
## App Screens
#### Deploy the contract
![alt text](<Screenshot 2024-07-14 at 10.55.53.png>)
---
#### Before login with the wallet
![alt text](<Screenshot 2024-07-14 at 11.13.22.png>)
---
#### Dashboard of App
![alt text](<Screenshot 2024-07-14 at 11.15.19.png>)
--- 

#### Escrow ABI widget
![alt text](<Screenshot 2024-07-14 at 11.56.09.png>)
----
![alt text](<Screenshot 2024-07-08 at 20.13.07.png>)

___ 
#### The Escrow smart contract features two primary actions:

> **Deposit**: This action is triggered by sending a non-zero xEGLD transaction to the contract. The transaction must include the word deposit in the data field to invoke the deposit logic within our contract.
---- 
> **Withdraw**: This action involves sending a zero xEGLD transaction to the contract with withdraw included in the data field, thereby invoking the withdrawal logic. The contract checks for any successful deposits from our address and, if found, returns the xEGLD to us upon transaction processing.