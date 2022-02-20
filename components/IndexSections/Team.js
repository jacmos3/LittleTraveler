import React, {Component} from 'react';
import {Card, Container, Image} from 'semantic-ui-react';
import styles from "../../styles/components/Team.module.scss";
import {teamDetails} from "../../public/lists/teamDetails.js"

class Team extends Component {
    constructor() {
        super();

    }

    render() {
        return (

            <div className={`${styles.team__section} flex justify-around`}>
                <div className="text-center">
                    <h2 className="text-center mt-4 capitalize text-trips-1">Team composition</h2>
                    <div className={`${styles.team__container}`}>
                        {
                            teamDetails.map(el =>
                                <div className={`${styles.card}`} key={el.key}>
                                    <div className={`${styles.additional}`}>
                                        <div className={`${styles.user__card}`}>
                                            {/*<div className={`${styles.level} ${styles.center}`}>*/}
                                            {/*    Level 13*/}
                                            {/*</div>*/}
                                            <div className={`${styles.points} ${styles.center}`}>
                                                {el.title}
                                            </div>
                                            <img loading="lazy" src={el.image} className={`${styles.image__card} ${styles.center}`}/>
                                        </div>
                                        <div className={`${styles.more__info}`}>
                                            <h3>{el.name}</h3>
                                            <div className={`${styles.stats}`}>
                                                {el.linkedin && <div>
                                                    <a href={el.linkedin}><img loading="lazy" src='img/linkedin.png' className={`${styles.social__card}`}/></a>
                                                </div>}
                                                {el.twitter && <div>
                                                    <a href={el.twitter}><img loading="lazy" src='img/twitter.png' className={`${styles.social__card}`}/></a>
                                                </div>}
                                                {el.github && <div>
                                                    <a href={el.github}><img loading="lazy" src='img/github.png' className={`${styles.social__card}`}/></a>
                                                </div>}
                                                {el.www && <div>
                                                    <a href={el.www}><img loading="lazy" src='img/www.png' className={`${styles.social__card}`}/></a>
                                                </div>}
                                                {el.instagram && <div>
                                                    <a href={el.instagram}><img loading="lazy" src='img/instagram.png' className={`${styles.social__card}`}/></a>
                                                </div>}
                                                {el.email && <div>
                                                    <a href={el.email}><img loading="lazy" src='img/email.png' className={`${styles.social__card}`}/></a>
                                                </div>}
                                                {/*<div>*/}
                                                {/*    <div className={`${styles.title}`}>Coffee</div>*/}
                                                {/*    <i className="fa fa-coffee"></i>*/}
                                                {/*    <div className={`${styles.value} ${styles.infinity}`}>∞</div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.general}`}>
                                        <h3>{el.name}</h3>
                                        <div className={`${styles.text__description}`}>
                                            {el.description}
                                        </div>
                                        {/*<span className={`${styles.more}`}>Mouse over the card for more info</span>*/}
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
