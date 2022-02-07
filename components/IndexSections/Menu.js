import React, {Component} from 'react';
class Menu extends Component{
  constructor(){
    super();

  }
render(){

  return (
    <div className="flex flex-wrap mx-auto w-full justify-center space-x-6 sm:text-2xl font-display sm:space-x-10">
      <div>
        <a className="hover:text-trips-1" href="#Start">The Bridge</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Multichain">Multi-chain</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Elements">Loot</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Types">Gallery</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Team">The Team</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Elements2">The DAO</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Elements3">Derivatives</a>
      </div>
    </div>
  )
};
};
export default Menu;
