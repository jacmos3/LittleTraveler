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
  .send ({from: accounts[0],gas: 30000000, gasPrice: 1000000});
});

describe('TravelerLoot', ()=>{
  it('deploys a contract', () =>{
    assert.ok(travelerLoot.options.address);
  });


  it ('owner can claim a Traveler Loot in range #2001-#2222', async ()=>{
    const hash = await travelerLoot.methods.claimForOwner("2001").send({from: accounts[0],gas: 30000000, gasPrice: 1000000});
    console.log(hash.transactionHash);
    assert.ok(hash.transactionHash);
  });

  it ('owner cant claim a Traveler Loot in range #2223-#10000 range', async ()=>{
    try{
    const hash = await travelerLoot.methods.claimForOwner("2223").send({from: accounts[0],gas: 30000000, gasPrice: 1000000});
    }
    catch(e){
      console.log(e.message);
      assert.ok(true);
      return;
    }
    assert.ok(false,"owner has minted");
  });

  it ('not owner nor users can claim a TL > #10000 range', async ()=>{
    try{
      const hash = await travelerLoot.methods.claimForOwner("11111").send({from: accounts[0],gas: 30000000, gasPrice: 1000000});
    }
    catch(e){
      console.log(e.message);
      assert.ok(true);
      try{
        const hash2 = await travelerLoot.methods.claimForOwner("222222").send({from: accounts[1],gas: 30000000, gasPrice: 1000000});
      }
      catch(err){
        console.log(err.message);
        assert.ok(true);
        return;
      }
      return;
    }
    assert.ok(false,"owner or user has minted");
  });

  it ('can download token uri', async () => {
    const tokenURI = await travelerLoot.methods.tokenURI("2001").call();
    console.log(tokenURI);
    assert.ok(tokenURI);
  });

})
