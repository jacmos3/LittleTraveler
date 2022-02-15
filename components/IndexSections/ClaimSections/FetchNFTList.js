import React, {Component} from 'react';
import {Button, Container, Message, Tab} from 'semantic-ui-react';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';
import styles from "../../../styles/components/claimSections/FetchNFTList.module.scss";

class FetchNFTList extends Component {
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        var chain = this.props.state.web3Settings.chains
            .filter(chain => chain.id === this.props.state.web3Settings.networkId)[0];
        this.setState({
            chainName: chain.name,
            opensea: chain.opensea,
            baseUrl: chain.baseUrl,
            openseaCard: chain.openseaCard + this.props.state.web3Settings.contractAddress + "/"
        });
        await this.fetchNFTList();
    }

    state = {
        all: [],
        loading: 0,
        errorMessage: "",
        imgSrc: [],
        showImgs: false,
    };


    fetchNFTList = async () => {
        console.log("fetch");
        this.setState({loading: this.state.loading + 1, errorMessage: '', imgSrc : [], showImgs: false})
        try {
            const accounts = await this.props.state.web3.eth.getAccounts();
            const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress);
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
            var imgSrc = [];
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
                if (i === 0) {
                    imgSrc.push(all[i]);
                }
                this.setState({all: all, imgSrc: imgSrc});
            }
        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: this.state.loading - 1, showImgs: true});
        console.log(this.state.all);
    }

    render() {

        return (
            <Tab.Pane attached={false}>
                <Container>
                    <div style={{display: 'flex', flexFlow: 'column'}}>
                        <h2>You own {this.state.totalOwned} Little Travelers on {this.state.chainName}</h2>

                        {!!this.state.errorMessage ? <Message header="Oops!" content={this.state.errorMessage}/> : ""}

                        {this.state.showImgs && <div className={`${styles.image__container}`}>
                            {
                                this.state.all.map(el => (
                                    <div key={el.key}>
                                        <div className={`${styles.image}`}>
                                            <a target="_blank" href={this.state.openseaCard + el.header}>
                                                <img
                                                    src={this.state.imgSrc[el.key] ? el.image : "/img/incognito.png"}
                                                    onLoad={() => {
                                                        setTimeout(() => {
                                                            if (this.state.imgSrc[el.key]) {
                                                                var temp = this.state.imgSrc;
                                                                temp.push(this.state.all[el.key + 1]);
                                                                this.setState({imgSrc:temp});
                                                            }
                                                        }, 100);

                                                    }}
                                                    onError={({currentTarget}) => {
                                                        currentTarget.onerror = null;
                                                        currentTarget.src = "/img/incognito.png";
                                                        this.setState({index: el.key + 1});
                                                    }}
                                                />
                                            </a>
                                            <h3>#{el.header}</h3>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>}
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

export default FetchNFTList;
