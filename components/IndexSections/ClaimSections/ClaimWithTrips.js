import React, {Component} from 'react';
import {Button,Form,Input,Message,Tab,Popup,Icon} from 'semantic-ui-react';
import styles from "../../../styles/pages/INDEX.module.scss"; // Styles
import TripsEth from '../../../ethereum/imported/TripsEth.json';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';

class ClaimWithTrips extends Component{
  state = {
    loading:0,
    howMuchTrips:0,
    howManyLT:0,
    errorMessage:"",
    trips:{amount:0}
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

  toFixed(x) {
    if (Math.abs(x) < 1.0) {
      var e = parseInt(x.toString().split('e-')[1]);
      if (e) {
          x *= Math.pow(10,e-1);
          x = '0.' + (new Array(e)).join('0') + x.toString().substring(2);
      }
    } else {
      var e = parseInt(x.toString().split('+')[1]);
      if (e > 20) {
          e -= 20;
          x /= Math.pow(10,e);
          x += (new Array(e+1)).join('0');
      }
    }
    return x;
  }

  async approve(){
    console.log("start approving");

    this.setState({loading:this.state.loading+1, errorMessage:''});
    try{
      console.log("try");
      //console.log(this.props.state);
      const accounts= await this.props.state.web3.eth.getAccounts();
      console.log(this.props.state.web3Settings);
      const instance = new this.props.state.web3.eth.Contract(TripsEth, this.state.trips.address );

      console.log(this.props.state.web3Settings.contractAddress);
      console.log(this.state.trips.amount);
      console.log(this.state.howMuchTrips);

      await instance.methods.approve(this.props.state.web3Settings.contractAddress,this.toFixed(this.state.trips.amount * this.state.howManyLT).toString()).send({from:accounts[0]});
      console.log("called");

      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
      this.setState({loading:this.state.loading-1});
      return false;
    }
    this.setState({loading:this.state.loading-1});
    return true;
  }

  async buy(){
    console.log("buy");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );
      console.log(this.state.howManyLT);
      await instance.methods.mintWithTrips(this.state.howManyLT.toString()).send({from:accounts[0]});
      //await instance.methods.transfer().send({from:accounts[0]});
      this.setState({minted:true});
      //this.fetchNFTList();
      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }

  onApproveAndBuy = async (event) => {
    this.setState({loading:this.state.loading+1});
    event.preventDefault();
    var approved = await this.approve();
    if (approved){
      await this.buy();
    }
    this.setState({loading:this.state.loading-1});
  }

  onChange(event){
    event.preventDefault();
    console.log(this.toFixed(event.target.value * this.state.trips.amount));
    this.setState({howManyLT: event.target.value, howMuchTrips:this.toFixed((event.target.value * this.state.trips.amount)/1000000000000000000)});
  }

render(){

  return (
    <Tab.Pane attached={false}>
    <h2 >Select how many Little Traveler you want:</h2>
    <br />
      <Form onSubmit = {this.onApproveAndBuy} error={!!this.state.errorMessage}>
       <Form.Group >
          <Form.Field >
            <Input
              label={{ basic: true, content: 'Little Traveler' }}
              labelPosition='right'
              placeholder = "How many Little Traveler?"
              type = 'number'
              min = {1}
              max = {10}
              value = {this.state.howManyLT}
              onChange = {event => this.onChange(event)}
            />
            </Form.Field>
          </Form.Group>
          <h2>it will cost you:</h2>
          <Form.Group>
            <Form.Field>
            <Input
              label={{ basic: true, content: 'TRIPS' }}
              labelPosition='right'
              placeholder='Trips amount'
              type = 'number'
              readOnly
              disabled
              value = {Math.round(this.state.howMuchTrips)}
            />

          </Form.Field>
          </Form.Group>
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
export default ClaimWithTrips;
