import React, {Component} from 'react';
import {Button, Container, Message, Tab} from 'semantic-ui-react';
import DonateDirectDAO from '../../../ethereum/imported/DonateDirectDAO.sol.json';
import styles from "../../../styles/components/donateDirectSections/FetchDonateDirectNFTList.module.scss";

class FetchDonationNFTList extends Component {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        var chain = this.props.state.web3Settings.donationChain;
        this.setState({
            chainName: chain.name,
            opensea: chain.opensea,
            baseUrl: chain.thumbsFolder,
            openseaCard: chain.openseaCard + this.props.state.web3Settings.donationChain.contractAddress + "/"
        });
        await this.fetchNFTList();
    }

    state = {
        all: [],
        loading: 0,
        errorMessage: "",
        totalOwned:0,
    };


    fetchNFTList = async () => {
        console.log("fetch");
        this.setState({loading: this.state.loading + 1, errorMessage: ''})
        try {
            const accounts = await this.props.state.web3.eth.getAccounts();
            const instance = new this.props.state.web3.eth.Contract(DonateDirectDAO.DonateDirectDAO.abi, this.props.state.web3Settings.donationChain.contractAddress);
            let lastUserIndex = await instance.methods.balanceOf(accounts[0]).call()
                .then((result) => {
                    return JSON.parse(result);
                })
                .catch((error) => {
                    this.setState({errorMessage: error.message});
                    console.log(error);
                })

            if (!!this.state.errorMessage) {
                this.setState({loading: this.state.loading - 1});
                return;
            }
            this.setState({totalOwned: lastUserIndex});
            //TODO check su errorMessage e saltare tutto se c'è un errore
            var all = [];
            for (var index = lastUserIndex - 1, i = 0; index >= 0; index--, i++) {
                //    for (var index = 0; index < lastUserIndex; index++){
                let tokenId = await instance.methods.tokenOfOwnerByIndex(accounts[0], index).call()
                    .then((result) => {
                        //console.log(result);
                        return result;
                    })
                    .catch((error) => {
                        this.setState({errorMessage: error.message});
                        console.log(error);
                    });

                if (!!this.state.errorMessage) {
                    this.setState({loading: this.state.loading - 1});
                    return;
                }
                var element = {"key": i, "header": tokenId, "image": this.state.baseUrl + tokenId + '.png'};
                all.push(element);
            }
            this.setState({all: all});
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: this.state.loading - 1});
    }

    render() {

        return (
            <Tab.Pane attached={false}>
                <Container>
                    <div style={{display: 'flex', flexFlow: 'column'}}>
                        <h2 className="text-center">Your gallery</h2>

                        {!!this.state.errorMessage ? <Message header="Oops!" content={this.state.errorMessage}/> : ""}
                        {this.state.loading > 0 &&
                          <div className = "text-center"> <h3 >Loading... please wait</h3> <div className={`${styles.image__container}`}>

                          {
                            [...Array(this.state.totalOwned)].map((elementInArray, index) => (

                            <div key={index}>
                                <div className={`${styles.image}`}>
                                  <img src = "/img/incognito.png" />
                                  <h3>#???</h3>
                                </div>
                            </div>
                          ))
                          }
                          </div>
                          </div>
                        }
                        {this.state.loading == 0
                          && <div className = "text-center">
                              {this.state.totalOwned > 0 ? <h3 >Thank you! The following NFT(s) are your donation receipt</h3> : null }
                              <div className={`${styles.image__container}`}>
                                {
                                    this.state.all.map(el => (
                                        <div key={el.key}>
                                            <div className={`${styles.image}`}>
                                                <a target="_blank" href={this.state.openseaCard + el.header}>
                                                    <img src={el.image} />
                                                </a>

                                              <h3>#{el.header}</h3>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                      }
                      <div className="text-center">
                       you own {this.state.totalOwned} NFT
                      </div>
                        <div className={`${styles.buttons}`}>
                            <button className={`btn btn__primary`} disabled={this.state.loading > 0}
                                    onClick={this.fetchNFTList}>
                                Refresh List
                            </button>
                            <a target="_blank" href={this.state.opensea}>
                                <button className={`btn btn__primary btn__large`}>
                                    Open Full Collection on Opensea
                                </button>
                            </a>
                        </div>
                    </div>
                </Container>
            </Tab.Pane>
        )
    };
}
export default FetchDonationNFTList;
