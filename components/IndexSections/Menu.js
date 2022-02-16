import React, {Component} from 'react';
import styles from "../../styles/components/Menu.module.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={`${styles.nav__section} sticky top-0 z-10`}>
                <div className={`${styles.title}`}>The Little Traveler</div>
                <div className="flex flex-wrap mx-auto w-full justify-center">
                    <nav className={`${styles.navMenu}`}>
                        <a className={`${styles.a__text}`} href="#Multichain">Multi-chain</a>
                        <a className={`${styles.a__text}`} href="#Video">Video</a>
                        <a className={`${styles.a__text}`} href="#Claim">Mint</a>
                        <a className={`${styles.a__text}`} href="#DAO">The DAO</a>
                        <a className={`${styles.a__text}`} href="#Team">Team</a>
                        <a className={`${styles.a__text}`} href="#Derivatives">Derivatives</a>
                        <a className={`${styles.a__text}`} href="#TravelerLoot">Traveler Loot</a>
                        <div className={`${styles.dot}`}></div>
                    </nav>
                </div>
                <div className={`${styles.mobile__menu}`}>
                    <input type="checkbox" id="toogle-menu"/>
                    <label htmlFor="toogle-menu"><span></span></label>
                    <nav>
                        <div>
                            <label htmlFor="toogle-menu">
                                <span></span>
                            </label>
                        </div>
                        <ul>
                            <li><a href="#Multichain">Multi-Chain</a></li>
                            <li><a href="#Video">Video</a></li>
                            <li><a href="#Claim">Mint</a></li>
                            <li><a href="#DAO">The Dao</a></li>
                            <li><a href="#Team">Team</a></li>
                            <li><a href="#Derivatives">Derivatives</a></li>
                            <li><a href="#TravelerLoot">Traveler Loot</a></li>
                        </ul>
                        <div className={`${styles.social__buttons}`}>
                            <a href={this.props.state.opensea}><img loading="lazy" src='img/opensea.png'
                                              className={`${styles.social__icon}`}/></a>
                            <a href={this.props.state.twitter}><img loading="lazy" src='img/twitter.png'
                                              className={`${styles.social__icon}`}/></a>
                            <a href={this.props.state.discord}><img loading="lazy" src='img/discord.png'
                                              className={`${styles.social__icon}`}/></a>
                        </div>
                    </nav>

                </div>
            </div>
        )
    };
}

export default Menu;
