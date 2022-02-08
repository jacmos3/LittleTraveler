import React, {Component} from 'react';
class Menu extends Component{
  constructor(){
    super();

  }
render(){

  return (
    <div className="flex flex-wrap mx-auto w-full justify-center space-x-6 sm:text-2xl font-display sm:space-x-10">
      <div>
        <a className="hover:text-trips-2" href="#Multichain">Multi-chain</a>
      </div>
      <div>
        <a className="hover:text-trips-2" href="#Video">Video</a>
      </div>
      <div>
        <a className="hover:text-trips-2" href="#Claim">Mint</a>
      </div>
      <div>
        <a className="hover:text-trips-2" href="#DAO">The DAO</a>
      </div>
    </div>
  )
};
};
export default Menu;
