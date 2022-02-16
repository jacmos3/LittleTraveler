import React, {Component} from 'react';
import {Card,Container,Image} from 'semantic-ui-react';
import styles from "../../styles/components/Team.module.scss";

class Team extends Component{
  constructor(){
    super();

  }
render(){
  var images = [
      {key: "1", name:"Luca", description:<p>The Mind behind it all</p>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "2", name:"Marco", description:<p>The designer</p>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "3", name:"Jacopo", description:<div><p><strong>Who</strong>: jacmos3 aka jà </p><p><strong>What</strong>: Software Engineer in Sabbatical leave from traditional work, discovering web3 and learning new things in the crypto space.</p><p><strong>Where</strong>: jacopo.crypto </p><p><strong>When</strong>: Joined Trips Community in 2020.</p><p><strong>Why</strong>: I love innovating and experimenting. Crypto space matches my curiosity in many fields: Tech, Investments, Finance and Economy.</p></div>, image:'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "4", name:"lacarlina", description:<div><p><strong>The Organizer</strong></p><p>Since 2018 be part of the tripscommunity. When the web3 changes my mindset and I never go back. Years of ideas, hard works and meeting of great valuable people.</p><p>6 months in dev and marketing area and now our Traveler Loot and The Little Traveler are ready.</p></div>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "5", name:"Tommaso", description:<p>The UI expert</p>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "6", name:"Il Beda", description:<div><p><strong>NFT Expert</strong></p><p>IT professional and crypto enthusiast started his Adventure 37 Years ago with a vic20 and 300 baud modem and a few years ago arrived at web3 With Tripscommunity.</p></div>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "7", name:"FrankMT", description:<div><p><strong>The referrer</strong></p><p>Innovator approached to the crypto blockchain world since 2014, joint several TripsCommunity projects in the last 5 years driving  awarness across the community and linking to external  stakeholders. Always open to new ideas and new projects, In the 2019 parts of Trips team winning the Best Innovative Idea on the Tourism from Alpitour.</p><p>my mantra : Future is already gone!</p></div>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "8", name:"Alessandro", description:<div><p><strong>Statistician and crypto blockchain enthusiastic</strong></p><p>Since 2017 in the core group of tripscommunity where participating in a series of projects. Member of the trips team winning the first 2020 prize as the best innovative idea in tourism recognized by Alpitour. Six months in the marketing area of our Traveler Loot and the Little Traverel project to enter in the new web3 vacation rentals era.</p></div>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "9", name:"Alibrando Ludo", description:<div><p><strong>Direct Booking Maximizer for Hospitality Industry</strong></p><p>10 years Growth Revenue Manager, 4 years Crypto-newbie</p></div>, image: 'img/littletravelers/types/Little-Traveler-1.png'},
      {key: "10", name:"MRV", description:<div><p><strong>Blockchain pathfinder & tech explorer</strong></p><p>Lifelong DRD4-7R. Sailing the unchartered Web3 seas - always westbound.</p></div>, image: 'img/littletravelers/types/Little-Traveler-1.png'},

      /*  {image:'img/littletravelers/types/Little-Traveler-4.png'},
        {image:'img/littletravelers/types/Little-Traveler-7.png'},
        {image:'img/littletravelers/types/Little-Traveler-8.png'},
        {image:'img/littletravelers/types/Little-Traveler-9.png'},

        {image:'img/littletravelers/types/Little-Traveler-10.png'},
        {image:'img/littletravelers/types/Little-Traveler-12.png'}*/
  ]
  return (

    <div className={`${styles.team__section} flex justify-around`}>
        <div className="text-center">
            <h2 className="text-center mt-4 capitalize text-trips-1">Team composition</h2>
            <div className={`${styles.image__container}`}>
                {
                    images.map(el =>
                      <div>
                        <div className={`${styles.image}`} key={el.key}>
                            <img loading="lazy" src={el.image}/>
                            <img loading="lazy" src={el.image}/>

                        </div>
                        <h2>{el.name} </h2>
                        {el.description}
                        </div>
                    )
                }
            </div>
        </div>
    </div>

  )
};
};
export default Team;
