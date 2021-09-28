# SolidityBoilerplate
Dummy solidity boilerplate

- Installing components:
npm install

- Configuring the .env files:
go to the root and create .env.local file and write down this:
NEXT_PUBLIC_CONTRACT_ADDRESS = "[CONTRACT_ADDRESS]"
PROVIDER_URL = "[INFURA_PROVIDER_URL]"

replace [CONTRACT_ADDRESS] with the address of the contract you will deploy on the blockchain.

replace [INFURA_URL] with the infura link (create an account on infura.io, then create project and copy and paste the rinkeby provider url)

go to ethereum/ folder and create .env file and write down this:
MNEMONIC = "[SEED]"
PROVIDER_URL = "[INFURA_PROVIDER_URL]"


replace [SEED] with the mnemonic seed of the account which will be the owner of the deployed contract.

replace [INFURA_PROVIDER_URL] again with the infura provider url

- Compiling
When you modify the .sol contract, then you need to update the json interfaces for the frontend. To do that you have to the file ethereum/compile.js and set generateFolder = true
then save and run the following command on terminal:
node compile.js

- Deploying
If you want to deploy the contract on the blockchain run the following command on terminal:
node deploy.js

then create a new file in the root folder called .env.local and copy and paste the  address you see in the console output like so:
NEXT_PUBLIC_CONTRACT_ADDRESS = "[ADDRESS]"
replace [ADDRESS] with your address.

- Launching tests:
npm run test.
