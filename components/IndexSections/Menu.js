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
            </div>
        )
    };
}

export default Menu;
