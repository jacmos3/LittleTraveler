[The instructions for install & run the code are at the bottom]

# Little Traveler
___ADD_TEXT___



## Who We Are
We are [Trips Community](https://www.tripscommunity.com/ "Trips Community"), a Travel DAO, established in 2017, a recognised as the leader in the transition to Web3 for the travel industry.
We have sold the first ever NFT booking in a [Villa in Ibiza, Spain](https://medium.com/trips-community/nft-nights-book-a-villa-with-an-nft-77e43f178909 "Villa in Ibiza, Spain") and the [first NFT Hotel booking in Venice, Italy ](https://medium.com/trips-community/the-first-nft-hotel-booking-in-history-was-sold-for-1-eth-3000-8f7d5e988ea0 "first NFT Hotel booking in Venice, Italy ").
We are also the first to organize a travel conference [Proof of Attendance NFT at the VRWRS 2021](https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/93380629908989276154329187712159695682604484101294988604591734364126547280072 "roof of Attendance NFT at the VRWRS 2021") summit in Annency, in France.

## Earnings
Traveler Loots on Ethereum are mostly free + gas, except the Patron NFTs.
We are retaining 100 NFTs for the development of the project.
Sales from Patron NFTs + 100 owner Loots will be used to fund the Traveler NFT project and make it grow into the biggest NFT ecosystem of the global travel industry.

## Expenses
We will invest the money in projects which give direct value to the NFT.
E.g.: we'll buy travel related NFTs which you can spend while travelling (there's very few of those now, but they will come).
We will mostly spend them to market the idea to travel incumbents who will then create valuable NFTs and airdrops them to Travel Loot owners.

## Conferences
The Traveler loot has been presented on the 2nd of December 2021 at the [Hicon, Innovation in Travel conference] (https://www.hicon.it/eng/speaker/luca-degiglio/) in Bologna, Italy.


## PRIORITY FOR TRAVELER LOOT PROJECT OWNERS
___ADD_TEXT___

## 1. Installing components:
`npm install`

## 2. Configuring the .env files:
`cd ethereum`

`touch .env`

open ".env" file with your preferred text editor and write down this in it:

`MNEMONIC = "[SEED]" #put here your mnemonic seed used to deploy the contract on
the blockchain
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #insert here your infura url (go to
infura.io, create account and new project, then select testnet you want to use
i.e. rinkeby and then copy the link here)`

## 3. Compiling and generating json interface
`node compile.js`

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
`firebase login`

`firebase deploy`

## 9. Credits:
The Traveler Loot is inspired by Loot Project: https://www.littletraveler.com

The solidity smart contract and the frontend-style are taken from Loot Project
and modified for our purpose.
