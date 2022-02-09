import React, {Component} from 'react';
import styles from "../../styles/components/Menu.module.scss";

class Menu extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className={`${styles.nav__section} sticky top-0 z-10`}>
                <div className="flex flex-wrap mx-auto w-full justify-center">
                    {/*<div>
                    <a className={`${styles.a__text}`} href="#Multichain">Multi-chain</a>
                </div>
                <div>
                    <a className={`${styles.a__text}`} href="#Video">Video</a>
                </div>
                <div>
                    <a className={`${styles.a__text}`} href="#Claim">Mint</a>
                </div>
                <div>
                    <a className={`${styles.a__text}`} href="#DAO">The DAO</a>
                </div>*/}

                    <nav className={`${styles.navMenu}`}>
                        <a className={`${styles.a__text}`} href="#Multichain">Multi-chain</a>
                        <a className={`${styles.a__text}`} href="#Video">Video</a>
                        <a className={`${styles.a__text}`} href="#Claim">Mint</a>
                        <a className={`${styles.a__text}`} href="#DAO">The DAO</a>
                        <div className={`${styles.dot}`}></div>
                    </nav>
                </div>
            </div>
        )
    };
}

export default Menu;
