import React, {Component} from 'react';
import styles from "../../styles/components/Presentation.module.scss";
import Gallery from "./Gallery";

class Presentation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${styles.hero__img} ${styles.presentation__section}`}>
                <div className={styles.presentation__content}>
                    <div className={`${styles.text__content}`}>
                        <h1 className={`${styles.title} text-trips-1 text-center`}>Little<br />Traveler</h1>
                        <div className={`${styles.text__description} text-trips-2`}>
                            A 10,000 native multi-chain PFP project
                            <br/>
                            for the travelers and the travel industry
                        </div>
                        <div className={`${styles.button__component}`}>
                            <a href="#Claim">
                                <button className={`btn btn__primary`}>
                                    Mint Yours
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className={`${styles.gallery__component}`}>
                        <div className={`${styles.social__component}`}>
                            <a
                                href={this.props.state.opensea}
                                target="_blank">
                                <img className={`btn btn__secondary`} src="../img/social/opensea.svg" alt="Opensea"/>
                            </a>
                            <a
                                href={this.props.state.twitter}
                                target="_blank">
                                <img className={`btn btn__secondary`} src="../img/social/twitter.svg" alt="Twitter"/>
                            </a>
                            <a
                                href={this.props.state.discord}
                                target="_blank">
                                <img className={`btn btn__secondary`} src="../img/social/discord.svg" alt="Discord"/>
                            </a>
                        </div>
                        <Gallery state={this.state}/>
                    </div>
                </div>
            </div>
        )
    };
}

export default Presentation;
