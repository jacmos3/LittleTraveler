import web3 from './web3';
import MyContract from './build/MyContract.sol.json';
const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const instance = new web3.eth.Contract(MyContract.MyContract.abi, contractAddress );
export default instance;
