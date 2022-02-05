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
          <span className="uppercase sm:text-xl tracking-widest">TEXT</span>

         <br />
          <h1 className="text-center mt-4 text-white">Text text text text text</h1>
        </div>
      </div>

      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4">

          hey
        </div>

    </div>

  )
};
};
export default Guilds;
