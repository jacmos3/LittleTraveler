import web3 from './web3';
import Loot from './build/Loot.sol.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(Loot.Loot.abi, contractAddress );
export default instance;
