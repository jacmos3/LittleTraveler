import React, {Component} from 'react';
import {Tab,Form,Button,Message} from 'semantic-ui-react';

class ClaimWithTravelerLoot extends Component{
  state = {
    loading:0,
    howMuchTrips:0,
    howManyLT:0,
    errorMessage:"",
    loot:""
  }
  constructor(){
    super();
  }

  componentDidMount(){
    var trips = this.props.state.web3Settings.chains
      .filter(chain => chain.id === this.props.state.web3Settings.networkId)
      .map(chain => chain.options.trips)[0];
    console.log("filter done");
    console.log(trips);

    var howManyLT = 1;
    var howMuchTrips = trips.amount

    this.setState({trips:trips, howManyLT:howManyLT, howMuchTrips:Math.round(this.toFixed(howMuchTrips/1000000000000000000))});


  }


  onMint = async (event) => {
    console.log("mint");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );

      await instance.methods.mintByTravelerLoot().send({from:accounts[0]});
      this.setState({minted:true});
      //this.fetchNFTList();
      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }



render(){

  return (
    <Tab.Pane attached={false}>
      <Form onSubmit = {this.onApproveAndBuy} error={!!this.state.errorMessage}>
        <h2>If you hold a Traveler Loot, you can mint a Little Traveler paying only gas </h2>
        <Form.Group>
          <Form.Field>
            <Message error header="Oops!" content = {this.state.errorMessage} />
            <Button  loading = {this.state.loading > 0} secondary >Mint!</Button>
            <Button  secondary type="button" basic color='black' >Refresh</Button>
          </Form.Field>
        </Form.Group>
      </Form>
    </Tab.Pane>
  )
};
};
export default ClaimWithTravelerLoot;
