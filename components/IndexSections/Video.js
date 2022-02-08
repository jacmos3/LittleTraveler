import React, {Component} from 'react';
import {Embed} from 'semantic-ui-react';
class Video extends Component{
  constructor(){
    super();

  }
  render(){

    return (
      <div className="container mx-auto mt-8">
        <div className="flex justify-around">
          <div className="px-20 py-8 rounded text-center">
            <span className="uppercase sm:text-xl tracking-widest"></span>
            <h2 className="text-center mt-4 capitalize text-trips-1">An NFT bridge With The Travel World</h2>
            <br />
            <Embed
              id='7wlySD-fk_Q'
              placeholder='/meta.png'
              source='youtube'
            />
            <p className="text-xl ">
              <br />
                We want to support the traditional travel industry in its journey towards Web3.
                <br />
                See it as a cooperation between the crypto travel world and the travel industry.
                <br />
                <a href="https://medium.com/trips-community/the-traveler-loot-the-offers-7fd8a4eb2410" target="_blank">🔗See the offers</a>
                <br />
                </p>
          </div>
        </div>
      </div>

    )
  };
};
export default Video;
