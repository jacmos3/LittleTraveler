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
        loot: ""
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
                    <h2>Do you hold a
                        <a target="_blank" href={this.props.state.travelerLoot}
                           className={`${styles.link} a__link__secondary color2`}>
                            <span>TRAVELER LOOT</span>
                        </a>
                        ?</h2>
                    <Form onSubmit={this.onMint} error={!!this.state.errorMessage} className={`${styles.form}`}>
                        <h3>Mint a Little Traveler for free + gas!</h3>
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
                        <div className={`${styles.buttons__component}`}>
                            <Message error header="Oops!" content={this.state.errorMessage}/>
                            <button className={`btn btn__primary`} disabled={this.state.loading > 0}>
                                Mint!
                            </button>
                        </div>
                    </Form>
                </Container>
            </Tab.Pane>
        )
    };
}
export default ClaimWithTravelerLoot;
