import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message,  Card, Icon, Image } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
import theLittleTraveler from '../ethereum/theLittleTraveler';

class MyDapp extends Component{
  state = {
    errorMessage:'',
    loading:false,
    tokenId:'',
    minted:false,
    name:'',
    description:'',
    image:'https://react.semantic-ui.com/images/avatar/large/matthew.png'
  };


  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await theLittleTraveler.methods.claim(this.state.tokenId).send({from:accounts[0]});
      let uri = await theLittleTraveler.methods.tokenURI(this.state.tokenId).call()
      .then((result)=> {
          return JSON.parse(window.atob(result.split(',')[1]));
      })
      .catch((error)=>{
        console.log(error);
      });
      this.setState({name:uri.name, description:uri.description, image:uri.image, minted:true});
      console.log(uri);
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:false});
  }

  onTest = async() => {

      let uri = await theLittleTraveler.methods.tokenURI(this.state.tokenId).call()
      .then((result)=> {
          return JSON.parse(window.atob(result.split(',')[1]));
      })
      .catch((error)=>{
        console.log(error);
      });
      this.setState({name:uri.name, description:uri.description, image:uri.image, minted:true});
      console.log(uri.image);

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
          <Button basic onClick={this.onTest}> show </Button>

          {!this.state.minted ? null : (
            <Card>
              <Image src={`${this.state.image}`} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{this.state.name}</Card.Header>
                <Card.Meta>
                  <span className='date'>Minted on </span>
                </Card.Meta>
                <Card.Description>
                  {this.state.description}
                </Card.Description>
              </Card.Content>
            </Card>
          )
        }
      </Layout>
    )
  }
}

export default MyDapp;
