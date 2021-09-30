// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');

//we now use ganache provider, but in future we should change here to set the real
const web3 = new Web3(ganache.provider());

const {interface, object:bytecode} = require('../ethereum/compile');

let theLittleTraveler;
let accounts;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  balance = await web3.eth.getBalance(accounts[0]);
  console.log("balance:"+ balance);
  theLittleTraveler = await new web3.eth.Contract(interface)
  .deploy({data:'0x'+bytecode})
  .send ({from: accounts[0], gas:'300000000'});
});

describe('TheLittleTraveler', ()=>{
  it('deploys a contract', () =>{
    assert.ok(theLittleTraveler.options.address);
    //console.log(theLittleTraveler);
  });


  it ('can change the message', async ()=>{
    const hash = await theLittleTraveler.methods.claim("1000").send({from: accounts[0], gas: '3000000'});
    console.log(hash.transactionHash);
      assert.ok(hash.transactionHash);
  });


  it ('can download token uri', async () => {
    const tokenURI = await theLittleTraveler.methods.tokenURI().call();
    assert.ok(tokenURI);
  });
})
