import React, {Component} from 'react';
import {Tab,Form,Button,Message,Input} from 'semantic-ui-react';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';

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
      <h2>Do you hold a Traveler Loot?<br /> Mint a Little Traveler for free + gas</h2>
      <Form onSubmit = {this.onMint} error={!!this.state.errorMessage}>
        <Form.Field >
          <Input className="px-80"
            label={{ basic: true, content: 'Little Traveler' }}
            labelPosition='right'
            placeholder = "How many Little Traveler?"
          
            min = {1}
            max = {10}
            value = {1}
            readOnly

          />
          </Form.Field>

          <Form.Field>
            <Message error header="Oops!" content = {this.state.errorMessage} />
            <Button  loading = {this.state.loading > 0} secondary >Mint!</Button>
          </Form.Field>

      </Form>
    </Tab.Pane>
  )
};
};
export default ClaimWithTravelerLoot;
