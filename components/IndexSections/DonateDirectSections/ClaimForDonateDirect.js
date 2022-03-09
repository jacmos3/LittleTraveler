import React, {Component} from 'react';
import {Tab,Form,Field,Input,Message,Button,Container} from 'semantic-ui-react';
import DonateDirectDAO from '../../../ethereum/imported/DonateDirectDAO.sol.json';
import styles from "../../../styles/components/donateDirectSections/ClaimForDonateDirect.module.scss";

class ClaimForDonateDirect extends Component{
  state = {
    loading:0,
    howMuchCoin:0,
    howManyNFT:0,
    errorMessage:"",
    coin:""
  }
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var coin = this.props.state.web3Settings.donationChain.coin;
    console.log("filter done");
    console.log(coin);
    var howManyNFT = 1;
    var howMuchCoin = coin.amount
    this.setState({coin:coin, howManyNFT:howManyNFT, howMuchCoin:howMuchCoin});
  }

  onChange(event){
    event.preventDefault();
    console.log(event.target.value * this.state.coin.amount);
    this.setState({howManyNFT: event.target.value, howMuchCoin:(event.target.value * this.state.coin.amount)});
  }


  onMint = async (event) => {
    event.preventDefault();
    console.log("mint");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(DonateDirectDAO.DonateDirectDAO.abi, this.props.state.web3Settings.donationChain.contractAddress);
      console.log(this.state.howManyNFT);
      console.log(this.props.state.web3.utils.toWei(this.state.howMuchCoin.toString()));
      await instance.methods.mint(this.state.howManyNFT.toString()).send({from:accounts[0], value:(this.state.howMuchCoin.toString())});
      this.props.goToFetch();
    }
    catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }

render(){

  return (
    <Tab.Pane attached={false}>
    <h2 className="text-center">How many NFT donations do you want to do?</h2>
    <br />
      <Container>
        <Form onSubmit = {this.onMint} error={!!this.state.errorMessage} className= {`${styles.form}`}>
            <Form.Field >
              <Input
                label={{ basic: true, content: 'NFT', id:"inputLabel" }}
                labelPosition='right'
                placeholder = "How many NFT?"
                type = 'number'
                min = {1}
                max = {50}
                value = {this.state.howManyNFT}
                onChange = {event => this.onChange(event)}
              />
              </Form.Field>
            <h3>you are donating {this.props.state.web3.utils.fromWei(this.state.howMuchCoin.toString(),"ether")} {this.state.coin.name}</h3>

              <div className={`${styles.buttons__component}`}>
                <Message error header="Oops!" content = {this.state.errorMessage} />
                <button className={`btn btn__primary`} disabled={this.state.loading > 0}>
                  Mint!
                </button>
              </div>
            </Form>
          </Container>
        </Tab.Pane>
  )
};
};
export default ClaimForDonateDirect;
