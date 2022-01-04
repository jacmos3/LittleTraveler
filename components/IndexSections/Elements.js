import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
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
          <h1 className="text-center mt-4">132 trillion combinations</h1>
          10 categories with 267 elements, and variable rarities.
        </div>
      </div>
      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
          <br />30 Characters
          <br />24 Preferred Travel Environments
          <br />30 Preferred Means of Transports
          <br />30 Spoken Languages
          <br />30 Talents
          <br />30 Preferred Places in the World
          <br />12 Travel Experience Levels
          <br />30 Preferred Accommodations
          <br />21 Stuff in the Bag
          <br />30 Occupations
      </div>
      <br />
      <div className="text-center">
        <a href="#Start">
          <Button className=" hover:text-white  mx-2" secondary >Claim a Traveler Loot</Button>
        </a>
      </div>
    </div>

  )
};
};
export default Elements;
