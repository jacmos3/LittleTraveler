import React, {Component} from 'react';
import {Card, Container, Image} from 'semantic-ui-react';
import styles from "../../styles/components/Team.module.scss";

class Team extends Component {
    constructor() {
        super();

    }

    render() {
        var images = [
            {
                key: "1",
                name: "Luca",
                title: <p>The Mind behind it all</p>,
                description: <p>The Mind behind it all</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "2",
                name: "Marco",
                title: <p>Designer</p>,
                description: <p>The designer</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "3",
                name: "Jacopo",
                title: <p>Software engineer</p>,
                description: <p> Software Engineer in Sabbatical leave from traditional work, discovering web3 and learning new things in the
                    crypto space.Joined Trips Community in 2020.I love innovating and experimenting. Crypto space
                    matches my curiosity in many fields: Tech, Investments, Finance and Economy.</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "4",
                name: "lacarlina",
                title: <p>The Organizer</p>,
                description: <p>Since 2018 be part of the tripscommunity. When
                    the web3 changes my mindset and I never go back. Years of ideas, hard works and meeting of great
                    valuable people.6 months in dev and marketing area and now our Traveler Loot and The Little
                    Traveler are ready.</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "5",
                name: "Tommaso",
                title: <p>Front-end engineer</p>,
                description: <p>The UI expert</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "6",
                name: "Il Beda",
                title: <p>NFT Expert</p>,
                description: <p>IT professional and crypto enthusiast started his
                    Adventure 37 Years ago with a vic20 and 300 baud modem and a few years ago arrived at web3 With
                    Tripscommunity.</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "7",
                name: "FrankMT",
                title: <p>The referrer</p>,
                description: <p>Innovator approached to the crypto blockchain
                    world since 2014, joint several TripsCommunity projects in the last 5 years driving awarness across
                    the community and linking to external stakeholders.my mantra : Future is already gone!</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "8",
                name: "Alessandro",
                title: <p>Blockchain enthusiastic</p>,
                description: <p>Since 2017
                    in the core group of tripscommunity where participating in a series of projects. Member of the trips
                    team winning the first 2020 prize as the best innovative idea in tourism recognized by Alpitour.
                    Statistician and crypto blockchain enthusiastic</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "9",
                name: "Alibrando Ludo",
                title: <div>Direct Booking Maximizer</div>,
                description: <p>10 years
                    Growth Revenue Manager, 4 years Crypto-newbie & Direct Booking Maximizer for Hospitality Industry</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
            {
                key: "10",
                name: "MRV",
                title: <p>Blockchain pathfinder</p>,
                description: <p>Lifelong DRD4-7R. Sailing the unchartered Web3 seas - always westbound & tech explorer.</p>,
                image: 'img/littletravelers/types/Little-Traveler-1.png',
                twitter: 'img/littletravelers/types/Little-Traveler-1.png',
                github: 'img/littletravelers/types/Little-Traveler-1.png'
            },
        ]
        return (

            <div className={`${styles.team__section} flex justify-around`}>
                <div className="text-center">
                    <h2 className="text-center mt-4 capitalize text-trips-1">Team composition</h2>
                    <div className={`${styles.team__container}`}>
                        {
                            images.map(el =>
                                <div className={`${styles.member__component}`} key={el.key}>
                                    <img loading="lazy" src={el.image} className={`${styles.member__image}`}/>
                                    <div className={`${styles.member__content}`}>
                                        <p className={`${styles.name}`}>{el.name}</p>
                                        <div className={`${styles.member__content__bottom}`}>
                                            <div className={`${styles.title}`}>{el.title}</div>
                                            <div className={`${styles.member__content__social}`}>
                                                {el.github && <div>
                                                    <a href={el.github}><img loading="lazy" src='img/github_blue.png' className={`${styles.member__social}`}/></a>
                                                </div>}
                                                {el.twitter && <div>
                                                    <a href={el.twitter}><img loading="lazy" src='img/twitter_blue.png' className={`${styles.member__social}`}/></a>
                                                </div>}
                                            </div>
                                        </div>
                                    </div>
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
