import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import LittleTraveler from '../../ethereum/build/LittleTraveler.sol.json';
class Guilds extends Component{
  constructor(){
    super();

  }
  state = {

  }

render(){

  return (

    <div className="container mx-auto mt-8">
      <div className="flex justify-around">
        <div className="px-20 py-8 rounded text-center">
          <span className="uppercase sm:text-xl tracking-widest">Multi-Chain</span>

         <br />
          <h1 className="text-center mt-4 text-white">10 chains, 1,000 NFTs each, 10,000 Nfts in total</h1>
        </div>
      </div>

      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4">

          We are starting with the Ethereum network and Polygon, and then in the coming months we will launch and more chains, for a total of max 10,000 Little Travelers.

        </div>

    </div>

  )
};
};
export default Guilds;
