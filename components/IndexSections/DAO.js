import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Card, Container, Image} from 'semantic-ui-react';
import styles from "../../styles/components/Dao.module.scss";

class DAO extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div className={`${styles.dao__section} py-20 text-trips-1`}>
                <div className="flex justify-around ">
                    <div className="px-20 py-8 rounded text-center">
                        <span className="uppercase sm:text-xl tracking-widest">Under The Hood</span>
                        <br/>
                        <h2 className="text-center mt-4">The DAO</h2>
                        <Image src="TravelerDAOfounder.png" wrapped ui={false}/>
                    </div>
                </div>
                <div className={`${styles.content__text}`}>
                    This project is a DAO in a DAO.
                    Born from Trips Community DAO, it is managed by a group of 20 founders with different skillsets.
                    Some are just investors, others worked on a daily basis since August 2021, when the idea started.
                    <br/>
                    We also created and distribuited a governance Certificate NFT to the initial founders.
                    <br/><br/>
                    It will give governance voting rights to the holders and everybody can join the DAO by getting one on OpenSea.
                    <br/>
                </div>
                <br/>
                <div className="text-center">
                    <a href={this.props.state.daoNft}
                       target="_blank">
                        <button className={`btn btn__primary`}>
                            Join the DAO
                        </button>
                    </a>
                </div>
            </div>
        )
    };
}

export default DAO;
