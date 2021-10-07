## 0. Credits:
The Traveler Loot is inspired by Loot Project: https://www.lootproject.com/

The solidity smart contract and the frontend-style are taken from Loot Project
and modified for our purpose.

## How it works:

Everybody can mint a Traveler Loot NFT on Ethereum, by using Etherscan here:
__ADD_LINK__ or by using our native frontend here: __ADD_LINK__

Loot Project owners have no reserved pieces, but they have the special right to
mint a Traveler Loot in special edition opening the doors for other possible
future airdrops or advantages.

By using the qualifiedClaim(tokenId, contractAddress) function you can mint a
colored NFT. There are 15 qualified Loot and Loot derivatives addresses that have
been selected to be qualified for this purpose. The qualification was based on
the trading volume on OpenSea. The qualified loot projects are the first 15 in
the list, sorted by trading volume on October, 05 2021.

If you own the Loot #1, you would be able to mint the Traveler Loot #1 using
the qualifiedClaim(tokenId, contractAddress), just providing the tokenId you own
and the Loot address.
This will be minted in special edition (different color).
Note that when you mint your number, you "steal" the number to all the others
loot or loot-derivatives owners,because there will be one and only one #1.
So If you've mint it, the other owners have lost the opportunity to do the same.
The first one who mint its own number will receive the special edition minting.

There will be only 2000 special Traveler Loot, at maximum: from #1 to #2000.
If you own a higher tokenId, don't worry you can claim your special edition too
because the number will be % by 2000. So everybody can mint their special
edition if they are fast enough to claim it before they go out of supply.

If you do not own any Loot or any Loot Derivative, then you'll be able to claim
a standard Traveler Loot in black/white edition, just claiming from the function
claim(tokenId). Using this function, you'll be able to claim from number 2223 to
10000.

The owner of the contract will be able to claim the tokenId from 2001 to 2222.

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
