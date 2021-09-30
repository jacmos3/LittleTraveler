1) Installing components:
npm install

2) Configuring the .env files:
- go to ethereum/ folder and create .env file and write this on it:
MNEMONIC = "[SEED]" #<--- put here your mnemonic seed used to deploy the contract on the blockchain
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #<--- insert here your infura url (go to infura.io, create account and new project, then select testnet you want to use i.e. rinkeby and then copy the link here)

3) Compiling and generating json interface
node compile.js

4) Deploying on the blockchain
node deploy.js

Once the deploy is succeeded, it will be printed the contract address on the console: copy and paste it into the following file:
Go to the main folder of the project and create .env.local, open it and write down this:
NEXT_PUBLIC_CONTRACT_ADDRESS = "[CONTRACT_ADDRESS]" #<--- insert here the contract address
PROVIDER_URL = "[INFURA_PROVIDER_URL]" #<--- again put your infura link (the same of above)


5) Launching tests:
npm run test
