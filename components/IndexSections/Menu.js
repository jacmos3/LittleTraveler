import React, {Component} from 'react';
import styles from "../../styles/components/Menu.module.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: props.isChecked || false,
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.setState({ isChecked: !this.state.isChecked })
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
                        <a className={`${styles.a__text}`} href="#TravelerLoot">Traveler Loot</a>
                        <a className={`${styles.a__text}`} href="#Derivatives">Derivatives</a>
                        <a className={`${styles.a__text}`} href="#Team">Team</a>
                        <div className={`${styles.dot}`}></div>
                    </nav>
                </div>
                <div className={`${styles.mobile__menu}`}>
                    <input type="checkbox" id="toogle-menu" checked={this.state.isChecked} onChange={this.handleChange}/>
                    <label htmlFor="toogle-menu"><span></span></label>
                    <nav>
                        <div>
                            <label htmlFor="toogle-menu">
                                <span></span>
                            </label>
                        </div>
                        <ul>
                            <li><a href="#Multichain" onClick={this.handleChange}>Multi-Chain</a></li>
                            <li><a href="#Video" onClick={this.handleChange}>Video</a></li>
                            <li><a href="#Claim" onClick={this.handleChange}>Mint</a></li>
                            <li><a href="#DAO" onClick={this.handleChange}>The Dao</a></li>
                            <li><a href="#TravelerLoot" onClick={this.handleChange}>Traveler Loot</a></li>
                            <li><a href="#Derivatives" onClick={this.handleChange}>Derivatives</a></li>
                            <li><a href="#Team" onClick={this.handleChange}>Team</a></li>
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
