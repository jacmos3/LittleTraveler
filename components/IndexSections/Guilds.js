import React, {Component} from 'react';
import {Card} from 'semantic-ui-react';
import {derivatives} from "../../derivatives.js"
class Guilds extends Component{
  constructor(){
    super();

  }
render(){

  return (

    <div className="container mx-auto mt-8">
      <div className="flex justify-around ">
        <div className="px-20 py-8 rounded text-center">
          <span className="uppercase sm:text-xl tracking-widest">Guilds</span>

         <br />
          <h1 className="text-center mt-4 text-white">Selected Loot Projects</h1>
        </div>
      </div>
      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4">
        <div>
        Each project of this list represents a Guild:
        <br />
        <br />
        <div id="derivatives">
          <Card.Group itemsPerRow={3} centered items={derivatives} />
        </div>
        </div>
        <br />
        <br />
         If you own one NFT of these Projects, then you are in a Guild.
        <br />
        <br />
        Traveler Loots #1 - #900 are called <span className="italic">Traveler Loot for Guilds</span> and are provided in first-come-first-served basis, which means other Guilds may pick the NFT you are elegible to before you do, if you are not faster enough.
      </div>

      <div className="text-center">
        <br />
        <br />
        The minting function is regulated by <a href="https://en.wikipedia.org/wiki/Modulo_operation" target="_blank">🔗modulo operation</a> (mod 900) which means that more Guilds-tokenIds point to the same single Traveler-Loot-tokenId.
        <br />
        Claims are possible on etherscan by calling the function:
        <br />
        claimForGuilds(tokenId, contractAddress);
        </div>
    </div>

  )
};
};
export default Guilds;
