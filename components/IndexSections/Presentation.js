import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import {Image,Button,Message,Reveal,Grid} from 'semantic-ui-react';

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
    <div className="text-black mx-auto px-2 sm:px-4 text-center py-10 sm:py-20 justify-around flex flex-wrap hero-img ">
      <div className="w-full sm:w-1/2">
        <div className="sm:px-4">
          <div className={styles.home__cta}>
            <h1>Little Traveler</h1>
            
            <Grid columns={4} padded>
               {params.map((param) => (
                 <Grid.Column  className="bg-opacity-10" key={param.color}>
                 <Reveal animated='small fade' instant>
                     <Reveal.Content visible >
                       <Image src={param.visible} size='small' style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "100%"}}/>
                     </Reveal.Content>
                     <Image src={param.hidden} size='small' style={{display: "block", marginLeft: "auto", marginRight: "auto", width: "100%"}}/>
                   </Reveal>
                 </Grid.Column>
               ))}
             </Grid>
            <p className="text-xl sm:text-2xl text-white">
              <br />
              A 10,000 multi-chain PFP project for the travelers.
            </p>
          </div>
          <div className="flex py-8 w-full justify-center space-x-6">
            <a
              href={this.props.state.opensea}
              className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-blue-1"
              target="_blank"
            >
              <Image className="hover:text-white  w-6 h-6 mx-2" src="../img/opensea.svg"  />
            </a>
            <a
              href={this.props.state.twitter}
              className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-blue-1"
              target="_blank"
            >
              <Image className="fill-current w-6 h-6 mx-2" src="../img/twitter.svg"/>
            </a>
            <a
              href={this.props.state.discord}
              className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-blue-1"
              target="_blank"
            >
              <Image className="fill-current  text-white w-6 h-6 mx-2" src="../img/discord.svg"/>
            </a>
          </div>
          <div><a href={this.props.state.etherscan} target="_blank">VIEW CONTRACT</a></div>
          <br />
          <div className="text-center">
            <a href="#Start">
              <Button className=" hover:text-white  mx-2" secondary >Claim a Little Traveler</Button>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
};
};
export default Presentation;
