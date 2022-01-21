import React, {Component} from 'react';
class Plot extends Component{
  constructor(){
    super();

  }
render(){

  return (
    <div className="container mx-auto mt-8 text-white">
      <div className="flex justify-around">
        <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
          <span className="uppercase sm:text-xl tracking-widest">Plot</span>
          <h1 className="text-center mt-4">Context and Details</h1>
          <embed
            src="../Traveler Loot - The Story.pdf#navpanes=0&scrollbar=0"
            width="100%" height="700px"
          />
          <a href="../Traveler Loot - The Story.pdf">Download the .pdf here if your browser doesn't support the embedded version</a>
        </div>
      </div>
    </div>

  )
};
};
export default Plot;
