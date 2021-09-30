import web3 from './web3';
import TheLittleTraveler from './build/TheLittleTraveler.sol.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(TheLittleTraveler.TheLittleTraveler.abi, contractAddress );
export default instance;
