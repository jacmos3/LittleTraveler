import React, {Component} from 'react';
import {Tab,Form,Pane,Field,Input,Message,Button} from 'semantic-ui-react';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';

class ClaimWithEther extends Component{
  state = {
    loading:0,
    howMuchCoin:0,
    howManyLT:0,
    errorMessage:"",
    coin:""
  }
  constructor(){
    super();
  }

  componentDidMount(){
    var coin = this.props.state.web3Settings.chains
      .filter(chain => chain.id === this.props.state.web3Settings.networkId)
      .map(chain => chain.options.coin)[0];
    console.log("filter done");
    console.log(coin);

    var howManyLT = 1;
    var howMuchCoin = coin.amount

    this.setState({coin:coin, howManyLT:howManyLT, howMuchCoin:howMuchCoin});


  }

  onChange(event){
    event.preventDefault();
    console.log(event.target.value * this.state.coin.amount);
    this.setState({howManyLT: event.target.value, howMuchCoin:(event.target.value * this.state.coin.amount)});
  }


  onMint = async (event) => {
    event.preventDefault();
    console.log("mint");

    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );
      console.log(this.state.howManyLT);
      console.log(this.props.state.web3.utils.toWei(this.state.howMuchCoin.toString()));
      await instance.methods.mint(this.state.howManyLT.toString()).send({from:accounts[0], value:(this.props.state.web3.utils.toWei(this.state.howMuchCoin.toString()))});
      //await instance.methods.transfer().send({from:accounts[0]});
      //this.setState({minted:true});
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
    <h2 >How many Little Travelers you want?</h2>
    <br />
      <Form onSubmit = {this.onMint} error={!!this.state.errorMessage}>
          <Form.Field >
            <Input className="px-80"
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
          <h2>it will cost you:</h2>
            <Form.Field>
            <Input className="px-80"
              label={{ basic: true, content: this.state.coin.name }}
              labelPosition='right'
              placeholder='Ether amount'
              
              readOnly

              value = {this.state.howMuchCoin}
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
export default ClaimWithEther;
