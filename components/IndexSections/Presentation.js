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
            </div>
        )
    };
}

export default Presentation;
