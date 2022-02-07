import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Card,Container,Image} from 'semantic-ui-react';
class Elements extends Component{
  constructor(){
    super();

  }
render(){

  return (

    <div className="container mx-auto mt-8">
      <div className="flex justify-around ">
        <div className="px-20 py-8 rounded text-center">
          <span className="uppercase sm:text-xl tracking-widest">Under The Hood</span>
          <br />
          <h1 className="text-center mt-4">The Traveler Loot</h1>
          
          
          <Image src="loots/guild_loot.svg" wrapped ui={false} />
                  </div>
      </div>
      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
        The Little Traveler is the first project based on <a href="https://www.travelerloot.com/" target="_blank">Traveler Loot 🔗</a> universe.
          <br />
          <br />You can mint one Little Traveler for free on Ethereum if you own a Traveler Loot.
          
         
      </div>
      <br />
      <div className="text-center">
        <a href="https://www.travelerloot.com/">
          <Button className=" hover:text-white  mx-2" secondary >Mint a Traveler Loot</Button>
        </a>
      </div>
    </div>

    
    

  )
};
};
export default Elements;
