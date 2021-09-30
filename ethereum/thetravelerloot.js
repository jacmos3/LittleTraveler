import web3 from './web3';
import TheTravelerLoot from './build/TheTravelerLoot.sol.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(TheTravelerLoot.TheTravelerLoot.abi, contractAddress );
export default instance;
