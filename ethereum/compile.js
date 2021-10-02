const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const myPath = path.resolve(__dirname, 'contracts', 'TheTravelerLoot.sol');
const buildPath = path.resolve(__dirname,'build');
const source = fs.readFileSync(myPath, 'utf8');

const theTravelerLoot = {
    language: 'Solidity',
    sources: {'TheTravelerLoot.sol': {content: source}},
    settings: {outputSelection: {'*': {'*': ['*']}}}
}
console.log(myPath);
const output = JSON.parse(solc.compile(JSON.stringify(theTravelerLoot))).contracts;
//console.log(output);

//set to true if you want to generate new json file while compiling. i.e.
//if you changed the .sol file and you want to update the interface
const generateFolder = true;
if (generateFolder){
  fs.removeSync(buildPath);
  fs.ensureDirSync(buildPath);

  for(let contract in output){
    //there could be more than one contract in the same file, so we cycle it
    fs.outputJsonSync(
      path.resolve(buildPath,contract.replace(':','') + '.json'),
      output[contract]
    );
    //console.log(output[contract]);
  }

  console.log("exported to file system");
}

//we now export the main contract.
const {abi: interface, evm: {bytecode:{object}}} = output['TheTravelerLoot.sol'].TheTravelerLoot;
module.exports = {interface, object};
