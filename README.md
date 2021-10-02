##0. Credits
The Traveler Loot is inspired by Loot Project: https://www.lootproject.com/

The solidity smart contract and the frontend-style are taken from Loot Project
and modified for our purpose.

Everybody can mint a Traveler NFT on Ethereum, by using Etherscan here:
__ADD_LINK__ or by using our native frontend here: __ADD_LINK__

Loot Project owners have no reserved pieces, but they would have the possibility
to mint a Traveler Loot in special edition opening the doors for other possible
future advantages. This means that if I own the Loot #1, I would be elegible to
mint Traveler Loot #1 in special edition. But only if I mint it before than
everybody else, because the #1 is not reserved to me.

By the way, nobody else except me would be able to mint the #1 as a special
edition, and they would receive a normal Traveler Loot.

If you let them do so, you lost your chance to get your Traveler Loot special
edition, but you'll still be able to mint a normal edition using another tokenId.


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

## 3) Compiling and generating json interface
`node compile.js`

just be sure generateFolder is set to true if you want to deploy a new version

## 4) Deploying on the blockchain
`node deploy.js`

Once the deploy is succeeded, it will be generated `/.env.local` file with a
env variable containing the contract address you have deployed.

This file is used by the frontend to interact with the contract using web3.

## 5) Launch server:
`npm run dev`

go to https://localhost:3000 and feel free to use the dapp

## 6) Launching tests:

`npm run test`

NOTE: Tests are not intended to be completed. Feel free to write your own tests.
