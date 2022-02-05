import React, {Component} from 'react';
class Menu extends Component{
  constructor(){
    super();

  }
render(){

  return (
    <div className="flex flex-wrap mx-auto w-full justify-center space-x-6 sm:text-2xl font-display sm:space-x-10  py-8 ">
      <div>
        <a className="hover:text-trips-1" href="#Start">Menu 1</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Guilds">Menu 2</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Types">Menu 3</a>
      </div>
      <div>
        <a className="hover:text-trips-1" href="#Elements">Menu 4</a>
      </div>
    </div>
  )
};
};
export default Menu;
