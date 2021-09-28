import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
import loot from '../ethereum/loot';

class MyDapp extends Component{
  state = {
    errorMessage:'',
    loading:false,
    newMessage:''
  };

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await loot.methods.claim(this.state.newMessage).send({from:accounts[0]});
      //Router.reload(window.location.pathname)
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false})
  }
  render(){
    return (
      <Layout>
        <h1>{this.state.message}</h1>
        <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Change message</label>
            <Input
            value = {this.state.newMessage}
             onChange = {event => this.setState({newMessage: event.target.value})}/>
          </Form.Field>

          <Message error header="Oops!" content = {this.state.errorMessage} />
          <Button loading = {this.state.loading} primary>Change!</Button>
        </Form>
      </Layout>
    )
  }
}

export default MyDapp;
