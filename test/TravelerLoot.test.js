// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');
const options = { gasLimit: 80000000 };
const provider = ganache.provider(options);
const web3 = new Web3(provider);

const {interface, object:bytecode} = require('../ethereum/compile');

let travelerLoot;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  balance = await web3.eth.getBalance(accounts[0]);
  console.log("balance:"+ balance);

  travelerLoot = await new web3.eth.Contract(interface)
  .deploy({data:'0x'+bytecode})
  .send ({from: accounts[0]});
});

describe('TravelerLoot', ()=>{
  it('deploys a contract', () =>{
    assert.ok(travelerLoot.options.address);
  });


  it ('can change claim a token', async ()=>{
    const hash = await travelerLoot.methods.claim("1000").send({from: accounts[0]});
    console.log(hash.transactionHash);
      assert.ok(hash.transactionHash);
  });


  it ('can download token uri', async () => {
    const tokenURI = await travelerLoot.methods.tokenURI().call();
    assert.ok(tokenURI);
  });
})
