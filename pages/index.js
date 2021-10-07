import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message,  Card, Icon, Image } from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import {Router} from '../routes';
import travelerLoot from '../ethereum/travelerLoot';
import styles from "../styles/pages/INDEX.module.scss"; // Styles

class MyDapp extends Component{
  state = {
    errorMessage:'',
    loading:false,
    tokenId:'',
    minted:false,
    name:'',
    description:'',
    image:''
  };


  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts = await web3.eth.getAccounts();
      await travelerLoot.methods.claim(this.state.tokenId).send({from:accounts[0]});
      let uri = await travelerLoot.methods.tokenURI(this.state.tokenId).call()
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

  onSynthetic = async() => {

      let uri = await travelerLoot.methods.tokenURI(this.state.tokenId).call()
      .then((result)=> {
          return JSON.parse(window.atob(result.split(',')[1]));
      })
      .catch((error)=>{
        console.log(error);
      });
      this.setState({name:uri.name, description:uri.description, image:uri.image, minted:true});
      console.log(uri.image);

    }

    quicklinks = [
        {name: "OpenSea", url: "#"},
        {name: "Twitter",url: "#"},
        {name: "Contract",url: "#"},
      ];


  render(){
    return (

      <Layout>
        <div className={styles.home__cta}>
        <h1>Traveler Loot</h1>
        {/* Quicklinks */}
        <ul>
          {this.quicklinks.map(({ name, url }, i) => {
            return (
              <li key={i}>
                {url.startsWith("/") ? (
                  // If link to local page use Link
                  <Link href={url}>
                    <a>{name}</a>
                  </Link>
                ) : (
                  // Else, redirect in new tab
                  <a href={url} target="_blank" rel="noopener noreferrer">
                    {name}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
        {/* CTA Description */}
          <p>
            Traveler Loot is randomized character generated and stored on
            chain.<br />Stats, images, and other functionality are intentionally
            omitted for others to interpret.
            <br /> Feel free to use The Traveler Loot in any way you want.
          </p>
        </div>

        {/* Rendering sample loot bags */}
        <div className={styles.home__feature}>
        <h2>Claim your Traveler!</h2>
        <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <p>Insert a still available tokenId between 2223 and 10000</p>
            <Input
            value = {this.state.tokenId}
             onChange = {event => this.setState({tokenId: event.target.value})}/>
          </Form.Field>

          <Message error header="Oops!" content = {this.state.errorMessage} />
          <Button loading = {this.state.loading} primary>Mint!</Button>
          <Button type="button" basic color='grey' onClick={this.onSynthetic} > Synthetic</Button>
        </Form>

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
        </div>
      </Layout>
    )
  }
}

export default MyDapp;
