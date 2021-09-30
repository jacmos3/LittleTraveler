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

Once the deploy is succeeded, the contract address will be printed on the console screen (it may take a few minutes).

Once it is shown, copy it and paste into the following file you are going to create now:

## 5) Generating .env.local file
`cd ..`

`touch .env.local`

open it and write:

`NEXT_PUBLIC_CONTRACT_ADDRESS = "[CONTRACT_ADDRESS]" #paste here the contract address on the blockchain
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #<gain put your infura link (the same of above)`

## 6) Launch server:
`npm run dev`

go to https://localhost:3000 and feel free to use the dapp

## 7) Launching tests:

`npm run test`

NOTE: Tests are not intended to be completed. Feel free to write your own tests.
