import React, {Component} from 'react';
import {Button,Form,Input,Message,Tab,Popup,Icon,Container} from 'semantic-ui-react';

import TripsEth from '../../../ethereum/imported/TripsEth.json';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';
import styles from "../../../styles/components/claimSections/ClaimWithTrips.module.scss";

class ClaimWithTrips extends Component{
  state = {
    loading:0,
    howMuchTrips:0,
    howManyLT:0,
    errorMessage:"",
    trips:{amount:0},
    checkAllowance:false
  }
  constructor(props){
    super(props);
  }

  componentDidMount(){
    var trips = this.props.state.web3Settings.chains
      .filter(chain => chain.id === this.props.state.web3Settings.networkId)
      .map(chain => chain.options.trips)[0];
    console.log("filter done");
    console.log(trips);

    var howManyLT = 1;
    var howMuchTrips = trips.amount

    this.setState({trips:trips, howManyLT:howManyLT, howMuchTrips:this.props.state.web3.utils.fromWei(howMuchTrips,'ether')});
    this.checkAllowance();
  }

  async checkAllowance(){
    console.log("check allowance");

    this.setState({loading:this.state.loading+1, errorMessage:''});
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(TripsEth, this.state.trips.address );
      console.log("calling allowance");
      let allowanceAmount = await instance.methods.allowance(
        accounts[0],
        this.props.state.web3Settings.contractAddress)
        .call()
        .then((result) =>{
          this.setState({errorMessage:''});
          return result;
        })
        .catch((error) =>{
          this.setState({errorMessage: error.message});
          console.log(error);
          return false;
        });
      console.log("allowance called, result: " + allowanceAmount);
      let checkAllowance = parseInt(this.props.state.web3.utils.fromWei(allowanceAmount,'ether')) >= this.state.howMuchTrips;
      this.setState({checkAllowance});
      console.log("allowanceAmount: " + checkAllowance + ", trips: "+ this.state.howMuchTrips );

      this.setState({loading:this.state.loading-1, errorMessage: ""});
      return checkAllowance;
    }
    catch(err){
      this.setState({loading:this.state.loading-1, errorMessage: err.message});
      return false;
    }

    this.setState({loading:this.state.loading-1, errorMessage: ""});
    return true;
  }

  async approve(){
    console.log("start approving");
    console.log("loading: " + this.state.loading);
    this.setState({loading:this.state.loading+1, errorMessage:''});
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(TripsEth, this.state.trips.address );
      console.log("Requesting approvation to " +this.state.trips.address + " trips address, for " + this.props.state.web3Settings.contractAddress + "to spend " + this.toFixed(this.state.trips.amount * this.state.howManyLT).toString() + " trips");
      await instance.methods.approve(
        this.props.state.web3Settings.contractAddress,
        this.toFixed(this.state.trips.amount * this.state.howManyLT).toString()
      ).send({from:accounts[0]});
      console.log("approve called");
    }
    catch(err){
      this.setState({loading:this.state.loading-1, errorMessage: err.message});
      return false;
    }
    this.setState({loading:this.state.loading-1, errorMessage: ""});
    this.checkAllowance();
    return true;
  }

  async mint(){
    console.log("mint");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );
      console.log(this.state.howManyLT);
      console.log("Requesting mint of " + this.state.howManyLT.toString() + " to " +this.props.state.web3Settings.contractAddress);
      await instance.methods.mintWithTrips(this.state.howManyLT.toString()).send({from:accounts[0]});
      this.props.goToFetch();
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1, errorMessage: ""});
    this.checkAllowance();
  }

  // onApproveAndMint = async (event) => {
  //   this.setState({loading:this.state.loading+1});
  //   event.preventDefault();
  //   var approved = await this.approve();
  //   if (approved){
  //     await this.mint();
  //   }
  //   this.setState({loading:this.state.loading-1, errorMessage:""});
  // }

  onApprove = async (event) =>{
    event.preventDefault();
    this.approve();
  }

  onMint = async (event) =>{
    event.preventDefault();
    this.mint();
  }

  onChange(event){
    event.preventDefault();
    console.log(this.props.state.web3.utils.fromWei(this.toFixed(event.target.value * this.state.trips.amount).toString(),"ether"));
    this.setState({howManyLT: event.target.value, howMuchTrips:this.props.state.web3.utils.fromWei(this.toFixed(event.target.value * this.state.trips.amount).toString(),"ether")});
    this.checkAllowance();
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
render(){

  return (
    <Tab.Pane attached={false} >
    <Container >
    <h2 >How many Little Traveler you want?</h2>
    <br />
      <Form error={!!this.state.errorMessage} className= {`${styles.form}`}>
          <Form.Field >
            <Input
              label={{ basic: true, content: 'Little Traveler', id:"inputLabel" }}
              labelPosition='right'
              placeholder = "How many Little Travelers?"
              type = 'number'
              min = {1}
              max = {10}
              value = {this.state.howManyLT}
              onChange = {event => this.onChange(event)}
              fluid
            />
            </Form.Field>
            <h3>it will cost you:</h3>
            <Form.Field>
              <Input
                label={{ basic: true, content: 'TRIPS', id:"inputLabel"}}
                labelPosition='right'
                placeholder='Trips amount'
                readOnly
                value = {Math.round(this.state.howMuchTrips)}
                fluid
              />
          </Form.Field>
            <Form.Field>
              <Message error header="Oops!" content = {this.state.errorMessage} />

              <Button disabled = {this.state.checkAllowance} loading = {this.state.loading > 0} secondary onClick = {this.onApprove} >Approve!</Button>
              <Button disabled = {!this.state.checkAllowance} loading = {this.state.loading > 0} secondary onClick = {this.onMint} >Mint!</Button>

            </Form.Field>
          </Form>
        </Container>
    </Tab.Pane>
  )
};
};
export default ClaimWithTrips;
