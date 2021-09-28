const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const {interface, object:bytecode} = require('./compile');
require('dotenv').config()

const seed = process.env.MNEMONIC;
const providerUrl = process.env.PROVIDER_URL;
const provider = new HDWalletProvider(seed,providerUrl);
const web3 = new Web3(provider);
const INITIAL_STRING = "Hello World!!";
let myContract;
let accounts;

const deploy = async() => {

  accounts = await web3.eth.getAccounts();
  console.log("Attempting to deploy from account", accounts[0]);

  myContract = await new web3.eth.Contract(interface)
  .deploy({data:bytecode,arguments:[INITIAL_STRING]})
  .send ({from: accounts[0], gas:'1000000'});

  console.log("Contract deployed to", myContract.options.address);
}

deploy();
