import React, {Component} from 'react';
import {Button,Form,Input,Message,Tab,Popup,Icon} from 'semantic-ui-react';
import styles from "../../../styles/pages/INDEX.module.scss"; // Styles
import TripsEth from '../../../ethereum/Imported/TripsEth.json';

class ClaimWithTrips extends Component{
  state = {
    loading:0,
    tokenId:'',
    minted:false,
    errorMessage:"",
    all:[]
  }
  constructor(){
    super();

  }

  onApproveAndBuy = async (event) => {
    event.preventDefault();
    if (approve()){
      swap();
    }
  }
  async approve(){
    console.log("ciao");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      console.log("s");
      //console.log(this.props.state);
      const accounts= await this.props.state.web3.eth.getAccounts();
      console.log(this.props.state.web3Settings);
      var trips = this.props.state.web3Settings.chains
        .filter(chain => chain.id === this.props.state.web3Settings.networkId)
        .map(chain => chain.options.trips)[0];

      console.log("ciao0");

      const instance = new this.props.state.web3.eth.Contract(TripsEth, trips.address );

      console.log(this.props.state.web3Settings.contractAddress);
      console.log(trips.address);
      await instance.methods.approve(accounts[0],trips.amount).send({from:accounts[0]});
      console.log("ciao2");
      this.setState({minted:true});
      this.fetchNFTList();
      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
      return false;
    }

    this.setState({loading:this.state.loading-1});
    return true;
  }

  async buy(){
    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(TravelerLoot.TravelerLoot.abi, this.props.state.web3Settings.contractAddress );
      //await instance.methods.activateClaims().send({from:accounts[0]});
      await instance.methods.claim().send({from:accounts[0]});
      this.setState({minted:true});
      this.fetchNFTList();
      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }

  onSwap = async (event) => {
    event.preventDefault();
    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
    /*  const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );
      //await instance.methods.activateClaims().send({from:accounts[0]});
      await instance.methods.claim().send({from:accounts[0]});
      this.setState({minted:true});
      this.fetchNFTList();
      //console.log(this.state.all.description);
*/
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }



render(){

  return (
    <Tab.Pane attached={false}>
      <Form onSubmit = {this.onApproveAndBuy} error={!!this.state.errorMessage}>
          <Form.Field>
            <h2 >Claim a Little Traveler</h2>
            <p>
              by paying using Trips Token


            </p>
            <br />

            <div className = {styles.margin5}>
              <Input
                placeholder = "Insert amount"
                type = 'number'
                min = {0}
                value = {this.state.tokenId}
                onChange = {event => this.setState({tokenId: event.target.value})}

              />
            </div>

            <Message error header="Oops!" content = {this.state.errorMessage} />
            <Button  loading = {this.state.loading > 0} secondary >Claim</Button>
            <Button  secondary type="button" basic color='black' >Refresh</Button>


          </Form.Field>
          </Form>
    </Tab.Pane>
  )
};
};
export default ClaimWithTrips;
