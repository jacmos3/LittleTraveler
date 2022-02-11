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
                        <h1 className={`${styles.title} text-trips-1 text-center`}>The Little Traveler</h1>
                        <div className={`${styles.text__description} text-trips-2`}>
                            <br/>
                            A 10,000 native multi-chain PFP project <br/>for the travelers and the travel industry.
                        </div>
                        <div className={`${styles.button__component}`}>
                            <a href="#Claim">
                                <button className={`btn btn__primary`}>
                                    Mint Yours
                                </button>

                                <div className="flex py-8 w-full justify-center space-x-6">
                                   <a
                                     href={this.props.state.opensea}
                                     className="self-center p-3 border rounded-xl bg-trips-2 hover:bg-trips-1"
                                     target="_blank"
                                   >
                                     <img className="hover:text-white  w-6 h-6 mx-2" src="../img/opensea.svg"  />
                                   </a>
                                   <a
                                     href={this.props.state.twitter}
                                     className="self-center p-3 border rounded-xl  bg-trips-2 hover:bg-trips-1"
                                     target="_blank"
                                   >
                                     <img className="fill-current w-6 h-6 mx-2" src="../img/twitter.svg"/>
                                   </a>
                                   <a
                                     href={this.props.state.discord}
                                     className="self-center p-3 border rounded-xl  bg-trips-2 hover:bg-trips-1"
                                     target="_blank"
                                   >
                                     <img className="fill-current  text-white w-6 h-6 mx-2" src="../img/discord.svg"/>
                                   </a>

                                 </div>
                            </a>
                        </div>
                    </div>
                    <div className={`${styles.gallery__component}`}>
                        <Gallery state = {this.state}/>
                    </div>
                </div>
            </div>
        )
    };
}

export default Presentation;
