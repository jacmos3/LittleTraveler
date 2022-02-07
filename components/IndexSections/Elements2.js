import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Card,Container,Image} from 'semantic-ui-react';
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
         
          <Image src="TravelerDAOfounder.png" wrapped ui={false} />

        </div>
      </div>
      <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
      This project is a DAO in a DAO.
          Born from Trips Community DAO, it is managed by a group of 20 people with different skillsets.
          <br />
          Some are just investors, others worked on a daily basis since August.
          <br />
          You can be part of the governance and share in the potential upside by acquiring a Traveler Dao Founder certificate NFT.
         
         
      </div>
      <br />
      <div className="text-center">
        <a href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/93380629908989276154329187712159695682604484101294988604591734366325570535524" target="_blank">
          <Button  className=" hover:text-white  mx-2" secondary >Buy a Traveler Dao Founder certificate NFT</Button>
        </a>
      </div>
    </div>

    
    

  )
};
};
export default Elements2;
