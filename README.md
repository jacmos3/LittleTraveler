## 1. Installing components:
`npm install`

## 2. Configuring the .env files:
`cd ethereum`

`touch .env`

open ".env" file with your preferred text editor and write down this in it:

`MNEMONIC = "[SEED]" #put here your mnemonic seed used to deploy the contract on the blockchain
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #insert here your infura url (go to infura.io, create account and new project, then select testnet you want to use i.e. rinkeby and then copy the link here)`

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
