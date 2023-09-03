import React, {Component} from 'react';
import {Tab, Form, Button, Message, Input, Container} from 'semantic-ui-react';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';
import styles from "../../../styles/components/claimSections/ClaimWithTravelerLoot.module.scss";

class ClaimWithTravelerLoot extends Component {
    state = {
        loading: 0,
        howMuchTrips: 0,
        howManyLT: 0,
        errorMessage: "",
        loot: "",
        mintingFinished: false
    }

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let total = 0;
        let totalThisChain = 0;
        this.setState({loading: this.state.loading + 1, errorMessage: ''})
        try {
            const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress);
            totalThisChain = Number(await instance.methods.maxThisChain().call());
            total = Number (await instance.methods.totalSupply().call());

        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        //console.log("ok + ", total , totalThisChain);
        this.setState({loading: this.state.loading - 1, mintingFinished: total >= totalThisChain});
    }


    onMint = async (event) => {
        console.log("mint");

        this.setState({loading: this.state.loading + 1, errorMessage: ''})
        try {
            const accounts = await this.props.state.web3.eth.getAccounts();
            const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress);

            await instance.methods.mintByTravelerLoot().send({from: accounts[0]});
            this.props.goToFetch();

        } catch (err) {
            this.setState({errorMessage: err.message});
        }
        this.setState({loading: this.state.loading - 1});
    }


    render() {

        return (
            <Tab.Pane attached={false}>
                <Container>
                    <h2 className="text-center">Do you hold a
                        <a target="_blank" href={this.props.state.travelerLoot}
                           className={`${styles.link} a__link__secondary color2`}>
                            <span>TRAVELER LOOT</span>
                        </a>
                        ?</h2>
                    <Form onSubmit={this.onMint} error={!!this.state.errorMessage} className={`${styles.form}`}>
                        <h4>If yes, you are eligible for Little Traveler minting by only paying gas!</h4>
                        <Form.Field>
                            <Input
                                label={{basic: true, content: 'Little Traveler', id: "inputLabel"}}
                                labelPosition='right'
                                placeholder="How many Little Travelers?"
                                min={1}
                                max={10}
                                value={1}
                                readOnly
                            />
                        </Form.Field>
                        <p>You can mint as many Little Travelers as you want, by simply holding one single Traveler Loot,
                        but we require a really basic <strong>proof of willingness</strong>.
                        <br />This means that you can't mint more than 1 Little Traveler per transaction,
                        but you can do more transactions if you want mint more Little Travelers! </p>
                        <div className={`${styles.buttons__component}`}>
                        
                            <Message error header="Oops!" content={this.state.errorMessage}/>
                            <button className={`btn btn__primary`} disabled={this.state.loading > 0 || this.state.mintingFinished}>
                                Mint!
                            </button>
                        </div>
                        {!!this.state.mintingFinished ? <Message header="Sorry!" content={"Minting is Finished for this chain! Try another chain or buy on secondary market!!"}/> : ""}
                    </Form>
                </Container>
            </Tab.Pane>
        )
    };
}
export default ClaimWithTravelerLoot;
