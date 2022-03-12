import React, {Component} from 'react';
import {Container, Button, Tab} from 'semantic-ui-react';
import styles from "../../styles/components/DonateDirect.module.scss";
import DonateDirectDAO from '../../ethereum/imported/DonateDirectDAO.sol.json';
import ClaimWithEther from "./ClaimSections/ClaimWithEther"
import ClaimForDonateDirect from "./DonateDirectSections/ClaimForDonateDirect"
import FetchDonateDirectNFTList from "./DonateDirectSections/FetchDonateDirectNFTList"
import Gallery from "./Gallery";
import {galleryDetails} from "../../public/lists/donateDirectDetails.js";


class DonateDirect extends Component {
    state = {
        loading: 0,
        all: [],
        activeIndex: 0
    }

    constructor(props) {
        super(props);
        this.goToFetch = this.goToFetch.bind(this);
    }

    handleTabChange = (e, {activeIndex}) => this.setState({activeIndex});

    goToFetch() {
      this.setState({activeIndex:1});
    }

    render() {

      const panes = [
        {
            menuItem: 'Mint With ' + this.props.state.web3Settings.donationChain.coin.name,
            render: () => <ClaimForDonateDirect state={this.props.state} goToFetch={this.goToFetch} />,
        },
        {
            menuItem: "Yours",
            render: () => <FetchDonateDirectNFTList state={this.props.state}/>
        },
      ]
        return (
            <div className={`${styles.claim__container} py-10 text-ukraine-1`}>
                <div className="flex justify-around">
                    <div className={`${styles.container} rounded`}>
                        <h2 className={`${styles.title} text-center mt-4 capitalize`}>The "Donate Direct" DAO for Ukraine</h2>

                        <div className={`${styles.content__text} text-center`}>
                        We are cooperating with The "Donate Direct" DAO and created a set of 500 NFT derivatives
                        <br />for a fundraising effort in favour of Ukrainian refugees.
                        <br />The ETH you pay for the NFTs go to a <a className={`a__underline__primary`} href={this.props.state.web3Settings.donationChain.gnosisSafeURL} target="_blank">Gnosis Safe</a> and will be donated to a specific family on your behalf.
                        <br /> You will know exactly who received the money and will be able to get in touch. <a href={this.props.state.web3Settings.donationChain.readMoreURL} target="_blank" className={`a__underline__primary`}>Read more here</a>
                        <br />See the collection on <a href={this.props.state.web3Settings.donationChain.opensea} target="_blank" className={`a__underline__primary`}>OpenSea</a>
                        </div>
                        <Gallery state={this.state} galleryDetails = {galleryDetails} title = ""/>
                        <br/>
                        <img src = "img/donatedirect/suspended.png" />
                        {
                            this.props.state.web3Settings.isWeb3Connected
                                ?
                                this.props.state.web3Settings.donationChain.id === this.props.state.web3Settings.networkId
                                ?
                                (
                                    <div>
                                        <Tab
                                            menu={{color: "orange", secondary: false, pointing: true}}
                                            panes={panes}
                                            className={`text-trips-1`}
                                            activeIndex={this.state.activeIndex}
                                            onTabChange={this.handleTabChange}
                                        />
                                    </div>
                                )
                                : (
                                    <div>
                                        <Container style={{color: "white"}}>
                                            <div style={{padding: "5px"}}>
                                                <div className="text-center">
                                                    <div className={`${styles.modal}`}>
                                                        <p className={`${styles.modal_error_title}`}>Wrong network!</p>
                                                        <p>You are connected to
                                                        netword {this.props.state.web3Settings.networkId} - {this.props.state.web3Settings.networkName}</p>
                                                        <p className={`${styles.modal_error_second_description}`}>Please connect to
                                                        networks:<br/>
                                                        </p>

                                                              <div>{this.props.state.web3Settings.donationChain.id} - {this.props.state.web3Settings.donationChain.name}</div>

                                                    </div>
                                                </div>
                                            </div>
                                        </Container>
                                    </div>
                                )
                                : (
                                    <div>
                                        <Container style={{color: "white"}}>
                                            <div style={{padding: "5px"}}>
                                                {
                                                    this.props.state.web3Settings.isWeb3Connected
                                                        ? (
                                                            <Button onClick={this.props.disconnect}>
                                                                {this.props.state.web3Settingsaccount}
                                                            </Button>
                                                        )

                                                        : (
                                                            <div className="text-center">
                                                                <button className={`btn btn__primary`} onClick={this.props.connect}>
                                                                    Connect Wallet
                                                                </button>
                                                            </div>
                                                        )
                                                }
                                            </div>
                                        </Container>
                                    </div>
                                )
                        }
                    </div>
                </div>
            </div>
        )
    };
}

export default DonateDirect;
