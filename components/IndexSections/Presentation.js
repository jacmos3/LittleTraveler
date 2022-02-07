import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import {Image,Button,Message,Reveal,Grid,Container,Card} from 'semantic-ui-react';

class Presentation extends Component{
  constructor(){
    super();
  }
render(){
  var params = [
    {color:'red', visible:'/littletravelers/church-441956-bg.png', hidden:'/littletravelers/church-441956-lt.png'},
    {color:'orange', visible:'/littletravelers/mountain-1862077-bg.png', hidden:'/littletravelers/mountain-1862077-lt.png'},
    {color:'yellow', visible:'/littletravelers/petronas-twin-towers-at-night-kuala-lumpur-malaysia-bg.png', hidden:'/littletravelers/petronas-twin-towers-at-night-kuala-lumpur-malaysia-lt.png'},
    {color:'olive', visible:'/littletravelers/pexels-dlkr-5493279-bg.png', hidden:'/littletravelers/pexels-dlkr-5493279-lt.png'},
    {color:'green', visible:'/littletravelers/pexels-shahbaz-zaman-4609844-bg.png', hidden:'/littletravelers/pexels-shahbaz-zaman-4609844-lt.png'},
    {color:'teal', visible:'/littletravelers/danyu-wang-sR7_ImYvt1Q-bg.png', hidden:'/littletravelers/danyu-wang-sR7_ImYvt1Q-lt.png'},
    {color:'blue', visible:'/littletravelers/robot-1464596-bg.png', hidden:'/littletravelers/robot-1464596-lt.png'},
    {color:'violet', visible:'/littletravelers/future-3716486-bg.png', hidden:'/littletravelers/future-3716486-lt.png'},
  ]
  return (
    <div className="text-black mx-auto px-2 sm:px-4 text-center py-80 justify-around flex flex-wrap hero-img ">
      <div className="w-full sm:w-1/2">
        <div className="sm:px-4">
          <div className={styles.home__cta}>
          <h1>The Little Traveler</h1>
          <p className="text-xl sm:text-2xl text-white">
            <br />
            A 10,000 native multi-chain PFP project <br />for the travelers and the travel industry.
          </p>
          </div>
          <br /><br /><br />
          <div className="text-center">
          <a href="#Start">
            <Button className=" hover:text-white  mx-2" secondary >Mint yours</Button>
          </a>
          </div>


        </div>
      </div>
    </div>
  )
};
};
export default Presentation;
