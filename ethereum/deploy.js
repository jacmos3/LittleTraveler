const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, object:bytecode} = require('./compile');
require('dotenv').config()

const seed = process.env.MNEMONIC;
const providerUrl = process.env.PROVIDER_URL;
const provider = new HDWalletProvider(seed,providerUrl);
const web3 = new Web3(provider);
const INITIAL_STRING = "Hello World!!";
let theTravelerLoot;
let accounts;

const deploy = async() => {

  accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  theTravelerLoot = await new web3.eth.Contract(interface)
  .deploy({data:'0x'+bytecode})
  .send ({from: accounts[0]});

  console.log("Contract deployed to", theTravelerLoot.options.address);
}

deploy();
