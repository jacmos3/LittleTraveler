[The instructions for install & run the code are at the bottom]

## Who We Are
We are [Trips Community](https://www.tripscommunity.com/ "Trips Community"), a Travel DAO, established in 2017, a recognised as the leader in the transition to Web3 for the travel industry.
We have sold the first ever NFT booking in a [Villa in Ibiza, Spain](https://medium.com/trips-community/nft-nights-book-a-villa-with-an-nft-77e43f178909 "Villa in Ibiza, Spain") and the [first NFT Hotel booking in Venice, Italy ](https://medium.com/trips-community/the-first-nft-hotel-booking-in-history-was-sold-for-1-eth-3000-8f7d5e988ea0 "first NFT Hotel booking in Venice, Italy ").
We are also the first to organize a travel conference [Proof of Attendance NFT at the VRWRS 2021](https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/93380629908989276154329187712159695682604484101294988604591734364126547280072 "roof of Attendance NFT at the VRWRS 2021") summit in Annency, in France.

## PRIORITY FOR TRAVELER LOOT PROJECT OWNERS
___ADD_TEXT___

## 1. Installing components:
`npm install`

## 2. Compiling and generating json interface
`cd ethereum`
`node compile.js`

## 3. Configuring the .env files :

`touch .env`

open ".env" file with your preferred text editor and write down this in it:

`MNEMONIC = "[SEED]" #put here your mnemonic seed used to deploy the contract on
the blockchain
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #insert here your infura url (go to
infura.io, create account and new project, then select testnet you want to use
i.e. rinkeby and then copy the link here)`

## 4. Deploying on the blockchain
`node deploy.js`

Once the deploy is succeeded, it will be generated `/.env.local` file with a
env variable containing the contract address you have deployed.

This file is used by the frontend to interact with the contract using web3.

## 5. Launch server:
`npm run dev`

go to https://localhost:3000 and feel free to use the dapp

## 6. Launching tests:

`npm run test`

NOTE: Tests are not intended to be completed. Feel free to write your own tests.


## 7. Exporting for hosting:
`npm run build && npm run export`

## 8. Deploy to Firebase (example)
Create a Project on Firebase

`npm install -g firebase-tools`

`firebase init`
  - then go ahead and select your preferences

`firebase login`

`firebase deploy`
