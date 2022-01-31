import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import {Image,Button,Message,Reveal,Grid} from 'semantic-ui-react';

class Presentation extends Component{
  constructor(){
    super();

  }
render(){

  return (

    <div className="mx-auto px-2 sm:px-4 text-center py-10 sm:py-20 justify-around flex flex-wrap hero-img bg-opacity-10">
      <div className="w-full sm:w-1/2">
        <div className="sm:px-4">
          <div className={styles.home__cta}>
            <h1>Little Traveler</h1>


            <Grid columns={8} divided>
               <Grid.Row>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/standard_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/standard_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
               </Grid.Row>

               <Grid.Row>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
                 <Grid.Column>
                 <Reveal animated='move' instant>
                   <Reveal.Content visible>
                     <Image src='/loots/guild2_loot.svg' size='small' />
                   </Reveal.Content>
                   <Reveal.Content hidden>
                     <Image src='/loots/guild_loot.svg' size='small' />
                   </Reveal.Content>
                 </Reveal>
                 </Grid.Column>
               </Grid.Row>
             </Grid>








            <p className="text-xl sm:text-2xl text-white">


              <br />
              Traveler Loot is a <a target= "_blank" href="https://www.lootproject.com/">Loot</a> derivative for the travel industry, generated and stored on chain.
              Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Traveler Loot in any way you want.
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
              <Button className=" hover:text-white  mx-2" secondary >Claim a Traveler Loot</Button>
            </a>
          </div>

        </div>
      </div>
    </div>
  )
};
};
export default Presentation;
