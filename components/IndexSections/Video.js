import React, {Component} from 'react';
import {Embed} from 'semantic-ui-react';
import styles from "../../styles/components/Video.module.scss";


class Video extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${styles.video__section} mx-auto bg-trips-4 text-trips-1`}>
                <div className="flex justify-around">
                    <div className={`${styles.video__container} px-20 py-8 rounded text-center`}>
                        <span className="uppercase sm:text-xl tracking-widest"></span>
                        <h2 className="text-center mt-4 capitalize text-trips-1">An NFT bridge With The Travel World</h2>
                        <br/>
                        <Embed id='7wlySD-fk_Q'
                            placeholder='/meta.png'
                            source='youtube'/>
                        <p className="text-xl ">
                            <br/>
                            We want to support the traditional travel industry in its journey towards <a className={`a__underline__secondary`}>Web3</a>.
                            <br/>
                            See it as a cooperation between the crypto travel world and the travel industry.
                            <br/>
                            <br/>
                        </p>
                        <a href="https://medium.com/trips-community/the-traveler-loot-the-offers-7fd8a4eb2410"
                           target="_blank" className={`a__link`}>
                            <span>SEE THE OFFERS</span>
                        </a>
                    </div>
                </div>
            </div>
        )
    };
}

export default Video;
