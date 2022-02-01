import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import {Image,Button,Message,Reveal,Grid} from 'semantic-ui-react';

class Presentation extends Component{
  constructor(){
    super();

  }
render(){
  var params = [
    {color:'red', visible:'/littletravelers/1.png', hidden:'/littletravelers/1_1.png'},
    {color:'orange', visible:'/littletravelers/2.png', hidden:'/littletravelers/2_1.png'},
    {color:'yellow', visible:'/littletravelers/3.png', hidden:'/littletravelers/3_1.png'},
    {color:'olive', visible:'/littletravelers/4.png', hidden:'/littletravelers/4_1.png'},
    {color:'green', visible:'/littletravelers/5.png', hidden:'/littletravelers/5_1.png'},
    {color:'teal', visible:'/littletravelers/2.png', hidden:'/littletravelers/2_2.png'},
    {color:'blue', visible:'/littletravelers/4.png', hidden:'/littletravelers/4_2.png'},
    {color:'violet', visible:'/littletravelers/5.png', hidden:'/littletravelers/5_2.png'},
    //{color:'purple', visible:'/littletravelers/2.png', hidden:'/littletravelers/2_3.png'},
    //{color:'pink', visible:'/littletravelers/2.png', hidden:'/littletravelers/2_4.png'},
  ]
  return (


    <div className="text-black mx-auto px-2 sm:px-4 text-center py-10 sm:py-20 justify-around flex flex-wrap hero-img ">
      <div className="w-full sm:w-1/2">
        <div className="sm:px-4">
          <div className={styles.home__cta}>
            <h1>Little Traveler</h1>

            <Grid columns={4} padded>
               {params.map((param) => (
                 <Grid.Column  className="bg-opacity-10">

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
