import React, {Component} from 'react';
import {Button, Image} from 'semantic-ui-react';
import styles from "../../styles/components/Travelerloot.module.scss";

class TravelerLoot extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`${styles.section__travelerloot}`}>
                <div className="flex justify-around ">
                    <div className="px-20 py-8 rounded text-center">
                        <span className="uppercase sm:text-xl tracking-widest">Under The Hood</span>
                        <br/>
                        <h2 className="text-center mt-4">The Traveler Loot</h2>

                        <Image src="img/loots/guild_loot.svg" wrapped ui={false}/>
                    </div>
                </div>
                <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
                    The Little Traveler is the first project based on <a href="https://www.travelerloot.com/"
                                                                         target="_blank">Traveler Loot 🔗</a> universe.
                    <br/>
                    <br/>You can mint one Little Traveler for free on Ethereum if you own a Traveler Loot.


                </div>
                <br/>
                <div className="text-center">
                    <a href="https://www.travelerloot.com/">
                        <button className={`btn btn__primary btn__large`}>
                            Mint a Traveler Loot
                        </button>
                    </a>
                </div>
            </div>
        )
    };
}
export default TravelerLoot;
