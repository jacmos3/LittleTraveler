import React, {Component} from 'react';
import styles from "../../styles/components/Menu.module.scss";
import {menuDetails} from "../../public/lists/menuDetails.js"

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
                    {
                      menuDetails.map(item =>
                        <a className = {`${styles.a__text}`} href= {item.href}>{item.value}</a>
                      )
                    }
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
                        <ul>{
                              menuDetails.map(item =>
                                <li><a href = {item.href}>{item.value}</a></li>
                              )
                            }
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
