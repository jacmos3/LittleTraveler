import web3 from './web3';
import TravelerLoot from './build/TravelerLoot.sol.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(TravelerLoot.TravelerLoot.abi, contractAddress );
export default instance;
