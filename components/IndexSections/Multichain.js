import React, {Component} from 'react';
import styles from "../../styles/components/Multichain.module.scss"; // Styles
import LittleTraveler from '../../ethereum/build/LittleTraveler.sol.json';
import {Container, Card, Image} from 'semantic-ui-react';

class Multichain extends Component {
    constructor(props) {
        super(props);
    }

    state = {}

    render() {
        return (
            <div className={`${styles.multichain__section} bg-trips-4 text-trips-2`}>
                <div className="container mx-auto mt-8">
                    <div className="flex justify-around">
                        <div className="px-20 py-8 rounded text-center">
                            <h2 className="text-center mt-4 text-trips-1">Native Multichain</h2>
                        </div>
                    </div>
                    <p className="text-center sm:text-xl my-4">
                        10,000 Little Travelers
                        <br/>
                        1,000 each chain
                        <br/>
                        10 blockchains
                        <br/>
                        1 address
                        <br/>
                        <br/>
                    </p>
                    <div className={`${styles.card__component}`}>
                        <div className={`${styles.box} ${styles.box__down}`}>
                            <div className={`${styles.img__container}`}>
                                <img src="img/networks/ethereum_logo.png" alt=""></img>
                            </div>
                            <div className={`${styles.text__container}`}>
                                <div className={`${styles.title}`}>Ethereum</div>
                                <p className={`${styles.description}`}>Released on Feb 8, 2022</p>
                            </div>
                        </div>

                        <div className={`${styles.box} ${styles.box__down}`}>
                            <img src="img/networks/polygon_logo.png" alt=""></img>
                            <div className={`${styles.text__container}`}>
                                <div className={`${styles.title}`}>Polygon</div>
                                <p className={`${styles.description}`}>Released on Feb 8, 2022</p>
                            </div>
                        </div>

                        <div className={`${styles.box} ${styles.box__down}`}>
                            <img src="img/networks/coming_soon.png" alt=""></img>
                            <div className={`${styles.text__container}`}>
                                <div className={`${styles.title}`}>+ 8</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}
export default Multichain;
