import React, {Component} from 'react';
import styles from "../../styles/components/Presentation.module.scss";
import {Button} from 'semantic-ui-react';
import Gallery from "./Gallery";

class Presentation extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        // var params = [
        //     {
        //         color: 'red',
        //         visible: '/littletravelers/church-441956-bg.png',
        //         hidden: '/littletravelers/church-441956-lt.png'
        //     },
        //     {
        //         color: 'orange',
        //         visible: '/littletravelers/mountain-1862077-bg.png',
        //         hidden: '/littletravelers/mountain-1862077-lt.png'
        //     },
        //     {
        //         color: 'yellow',
        //         visible: '/littletravelers/petronas-twin-towers-at-night-kuala-lumpur-malaysia-bg.png',
        //         hidden: '/littletravelers/petronas-twin-towers-at-night-kuala-lumpur-malaysia-lt.png'
        //     },
        //     {
        //         color: 'olive',
        //         visible: '/littletravelers/pexels-dlkr-5493279-bg.png',
        //         hidden: '/littletravelers/pexels-dlkr-5493279-lt.png'
        //     },
        //     {
        //         color: 'green',
        //         visible: '/littletravelers/pexels-shahbaz-zaman-4609844-bg.png',
        //         hidden: '/littletravelers/pexels-shahbaz-zaman-4609844-lt.png'
        //     },
        //     {
        //         color: 'teal',
        //         visible: '/littletravelers/danyu-wang-sR7_ImYvt1Q-bg.png',
        //         hidden: '/littletravelers/danyu-wang-sR7_ImYvt1Q-lt.png'
        //     },
        //     {
        //         color: 'blue',
        //         visible: '/littletravelers/robot-1464596-bg.png',
        //         hidden: '/littletravelers/robot-1464596-lt.png'
        //     },
        //     {
        //         color: 'violet',
        //         visible: '/littletravelers/future-3716486-bg.png',
        //         hidden: '/littletravelers/future-3716486-lt.png'
        //     },
        // ]
        return (
            <div className={`${styles.hero__img} ${styles.presentation__section}`}>
                <div className={styles.presentation__content}>
                    <div className={`${styles.text__content}`}>
                        <h1 className="text-trips-1 text-center">The Little Traveler</h1>
                        <div className={`${styles.text__description} text-trips-2`}>
                            <br/>
                            A 10,000 native multi-chain PFP project <br/>for the travelers and the travel industry.
                        </div>
                        <div className={`${styles.button__component}`}>
                            <a href="#Claim">
                                {/*<Button className={`button__primary`} primary>Mint yours</Button>*/}
                                <button className={`btn btn__primary`}>
                                    Mint Yours
                                </button>
                            </a>
                        </div>
                    </div>
                    <div className={`${styles.gallery__component}`}>
                        <Gallery state = {this.state}/>
                    </div>
                </div>
                <br/><br/><br/>
            </div>
        )
    };
}

export default Presentation;
