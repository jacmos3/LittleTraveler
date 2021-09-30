import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
import theLittleTraveler from '../ethereum/theLittleTraveler';

class MyDapp extends Component{
  state = {
    errorMessage:'',
    loading:false,
    tokenId:''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await theLittleTraveler.methods.claim(this.state.tokenId).send({from:accounts[0]});
      //Router.reload(window.location.pathname)
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false})
  }
  render(){
    return (
      <Layout>
        <h1>Claim your Traveler!</h1>
        <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Insert a still available tokenId between 1 and 7777</label>
            <Input
            value = {this.state.tokenId}
             onChange = {event => this.setState({tokenId: event.target.value})}/>
          </Form.Field>

          <Message error header="Oops!" content = {this.state.errorMessage} />
          <Button loading = {this.state.loading} primary>Mint!</Button>
        </Form>
      </Layout>
    )
  }
}

export default MyDapp;
