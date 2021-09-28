// contract test code will go here
const assert = require('assert');
const ganache = require('ganache-cli')
const Web3 = require('web3');

//we now use ganache provider, but in future we should change here to set the real
const web3 = new Web3(ganache.provider());

const {interface, object:bytecode} = require('../ethereum/compile');

let myContract;
let accounts;
let INITIAL_STRING = "Hello World!!";
let FINAL_STRING = "Goodbye World!!";

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  myContract = await new web3.eth.Contract(interface)
  .deploy({data:bytecode,arguments:[INITIAL_STRING]})
  .send ({from: accounts[0], gas:'1000000'});
});

describe('MyContract', ()=>{
  it('deploys a contract', () =>{
    assert.ok(myContract.options.address);
    //console.log(myContract);
  });

  it ('has a default message', async () => {
    const message = await myContract.methods.message().call();
    assert.equal(message, INITIAL_STRING);
  });

  it ('can change the message', async ()=>{
    const hash = await myContract.methods.setMessage(FINAL_STRING).send({from: accounts[0], gas: '1000000'});
    //console.log(hash.transactionHash);
    const message = await myContract.methods.message().call();
    assert.equal(message, FINAL_STRING);
  });
})
