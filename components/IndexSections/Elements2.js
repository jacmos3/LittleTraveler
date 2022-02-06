import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
class Elements2 extends Component{
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
          <h1 className="text-center mt-4">The DAO</h1>
          xxxxxxxx
        </div>
      </div>
      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
        xxxx
         
         
      </div>
      <br />
      <div className="text-center">
        <a href="#Start">
          <Button className=" hover:text-white  mx-2" secondary >Mint a Little Traveler</Button>
        </a>
      </div>
    </div>

    
    

  )
};
};
export default Elements2;
