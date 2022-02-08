import React, {Component} from 'react';
import {Button,Form,Input,Message,Tab,Popup,Icon,Container} from 'semantic-ui-react';
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

    this.setState({trips:trips, howManyLT:howManyLT, howMuchTrips:this.props.state.web3.utils.fromWei(howMuchTrips,'ether')});

  }

  async approve(){
    console.log("start approving");

    this.setState({loading:this.state.loading+1, errorMessage:''});
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      console.log(this.props.state.web3Settings);
      const instance = new this.props.state.web3.eth.Contract(TripsEth, this.state.trips.address );

      console.log(this.props.state.web3Settings.contractAddress);
      console.log(this.state.trips.amount);
      console.log(this.state.howMuchTrips);
      console.log(this.state.howManyLT);
      await instance.methods.approve(this.props.state.web3Settings.contractAddress,this.toFixed(this.state.trips.amount * this.state.howManyLT).toString()).send({from:accounts[0]});
      console.log("approve called");
    }
    catch(err){
      this.setState({errorMessage: err.message});
      this.setState({loading:this.state.loading-1});
      return false;
    }
    this.setState({loading:this.state.loading-1});
    return true;
  }

  async mint(){
    console.log("mint");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );
      console.log(this.state.howManyLT);
      await instance.methods.mintWithTrips(this.state.howManyLT.toString()).send({from:accounts[0]});
      //await instance.methods.transfer().send({from:accounts[0]});
      this.setState({minted:true});
      this.props.goToFetch;
      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }

  onApproveAndMint = async (event) => {
    this.setState({loading:this.state.loading+1});
    event.preventDefault();
    var approved = await this.approve();
    if (approved){
      await this.mint();
    }
    this.setState({loading:this.state.loading-1});
  }

  onChange(event){
    event.preventDefault();
    console.log(this.props.state.web3.utils.fromWei(this.toFixed(event.target.value * this.state.trips.amount).toString(),"ether"));
    this.setState({howManyLT: event.target.value, howMuchTrips:this.props.state.web3.utils.fromWei(this.toFixed(event.target.value * this.state.trips.amount).toString(),"ether")});
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
    <Container>
    <h2 >How many Little Traveler you want?</h2>
    <br />
      <Form onSubmit = {this.onApproveAndMint} error={!!this.state.errorMessage}>
          <Form.Field >
            <Input
              className="px-80"
              label={{ basic: true, content: 'Little Traveler', id:"inputLabel" }}
              labelPosition='right'
              placeholder = "How many Little Travelers?"
              type = 'number'
              min = {1}
              max = {10}
              value = {this.state.howManyLT}
              onChange = {event => this.onChange(event)}

            />
            </Form.Field>
            <h3>it will cost you:</h3>
            <Form.Field>
              <Input className="px-80"
                label={{ basic: true, content: 'TRIPS', id:"inputLabel"}}
                labelPosition='right'
                placeholder='Trips amount'
                readOnly
                value = {Math.round(this.state.howMuchTrips)}
              />
          </Form.Field>
            <Form.Field>
              <Message error header="Oops!" content = {this.state.errorMessage} />
              <Popup
                trigger={
                  <Button  loading = {this.state.loading > 0} secondary >Mint!</Button>
                }
                content="There will be two different transactions! The first one is the approvation, the second one is the minting! You will need to authorize both. Do not set low gas to the first one, or it will may invalidate the process."
                basic
              />

            </Form.Field>
          </Form>
        </Container>
    </Tab.Pane>
  )
};
};
export default ClaimWithTrips;
