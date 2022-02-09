import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import {Image,Button,Message,Reveal,Grid,Container,Card,Embed} from 'semantic-ui-react';

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
    <div className="text-black mx-auto px-2 sm:px-4 text-center py-20 justify-around flex flex-wrap hero-img-1">
      <div className="w-full sm:w-1/2">
        <div className="sm:px-4">
          <div className={styles.home__cta}>
            <br />
          <h1 className="text-trips-1">The Little Traveler</h1><br /><br />
            <h2>Watch the live streaming </h2>
          <Embed
            id='F6TaDIixSHg'
            placeholder='/meta.png'
            source='youtube'
          />
          <div className="text-xl sm:text-2xl text-trips-2">
            <br />
            A 10,000 native multi-chain PFP project <br />for the travelers and the travel industry.
          </div>
          <div className="flex py-8 w-full justify-center space-x-6">
              <a
                href={this.props.state.opensea}
                className="self-center p-3 border border-gray-800 rounded-xl bg-trips-2 hover:bg-blue-1"
                target="_blank"
              >
                <Image className="hover:text-white  w-6 h-6 mx-2" src="../img/opensea.svg"  />
              </a>
              <a
                href={this.props.state.twitter}
                className="self-center p-3 border border-gray-800 rounded-xl  bg-trips-2 hover:bg-blue-1"
                target="_blank"
              >
                <Image className="fill-current w-6 h-6 mx-2" src="../img/twitter.svg"/>
              </a>
              <a
                href={this.props.state.discord}
                className="self-center p-3 border border-gray-800 rounded-xl  bg-trips-2 hover:bg-blue-1"
                target="_blank"
              >
                <Image className="fill-current  text-white w-6 h-6 mx-2" src="../img/discord.svg"/>
              </a>

            </div>
          </div>
          <div className="text-center">
          <a
            href="#Claim"
            className="self-center p-3 border border-gray-800 rounded-xl  bg-trips-1 hover:bg-blue-1"
            >
            <Image  className="fill-current  text-white h-6 mx-2">Mint yours</Image>
          </a>
          </div>


        </div>
      </div>
    </div>
  )
};
};
export default Presentation;
