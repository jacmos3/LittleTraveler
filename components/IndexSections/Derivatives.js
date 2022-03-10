import React, {Component} from 'react';
import styles from "../../styles/components/Derivates.module.scss";

class Derivatives extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className={`${styles.section__derivates}`}>
                <div className="flex justify-around ">
                    <div className="px-20 py-8 rounded text-center">
                        <span className="uppercase sm:text-xl tracking-widest">Like what you see?</span>
                        <br/>
                        <h2 className="text-center mt-4">Build a Derivative</h2>
                    </div>
                </div>
                <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
                    Are you in the travel industry? Build a Little Traveler derivative!
                    <br/>
                    Maybe something with your city/hotel/villa in the backgrounds, a different character or anything
                    else.
                    <br/>
                    You can use it for access, discounts, fidelization and more.
                    <br/> <br/>
                    Contact us for a quote.

                </div>
                <br/>
                <div className="text-center">
                    <a href="https://www.tripscommunity.com/contacts/">
                        <button className={`btn btn__primary`}>
                            Contact Us
                        </button>
                    </a>
                </div>
            </div>
        )
    };
}

export default Derivatives;
