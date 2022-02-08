import React, {Component} from 'react';
import {Card,Container,Image,Grid,Reveal} from 'semantic-ui-react';

class Gallery extends Component{
  constructor(){
    super();

  }
render(){
  var params = [
    {image:'img/littletravelers/church-441956-lt.png'},
    {image:'img/littletravelers/mountain-1862077-lt.png'},
    {image:'img/littletravelers/petronas-twin-towers-at-night-kuala-lumpur-malaysia-lt.png'},
    {image:'img/littletravelers/pexels-dlkr-5493279-lt.png'},
    {image:'img/littletravelers/types/Little-Traveler-1.png'},
    {image:'img/littletravelers/types/Little-Traveler-2.png'},
    {image:'img/littletravelers/pexels-shahbaz-zaman-4609844-lt.png'},
    {image:'img/littletravelers/danyu-wang-sR7_ImYvt1Q-lt.png'},
    {image:'img/littletravelers/robot-1464596-lt.png'},
    {image:'img/littletravelers/future-3716486-lt.png'},
    {image:'img/littletravelers/types/Little-Traveler-3.png'},
    {image:'img/littletravelers/types/Little-Traveler-5.png'},

  /*  {image:'img/littletravelers/types/Little-Traveler-4.png'},
    {image:'img/littletravelers/types/Little-Traveler-7.png'},
    {image:'img/littletravelers/types/Little-Traveler-8.png'},
    {image:'img/littletravelers/types/Little-Traveler-9.png'},

    {image:'img/littletravelers/types/Little-Traveler-10.png'},
    {image:'img/littletravelers/types/Little-Traveler-12.png'}*/
  ]

  return (

    <div className="flex justify-around hero-img-2">
      <div className="px-4 sm:px-20  rounded-2xl text-center md:w-2/3">
        <h2 className="text-center mt-4 capitalize text-trips-1">An Incredible Variety of Travelers</h2>
        <Card.Group itemsPerRow={6} items={params} />
      </div>

    </div>

  )
};
};
export default Gallery;
