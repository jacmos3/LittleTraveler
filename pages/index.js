import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message,  Card, Icon, Image, Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
//import web3 from '../ethereum/web3';
import {Router} from '../routes';
import TravelerLoot from '../ethereum/build/TravelerLoot.sol.json';
import styles from "../styles/pages/INDEX.module.scss"; // Styles
import Web3 from "web3";
import Web3Modal from "web3modal";

class MyDapp extends Component{
  state = {
    errorMessage:'',
    loading:false,
    tokenId:'',
    minted:false,
    name:'',
    description:'',
    image:'',
    web3Settings:{
      isWeb3Connected:false,
      deployingNetworkId : 4, //1 ethereum, 4 rinkeby
      deployingNetworkName : "Rinkeby"
    }
  };


  constructor(){
    super();

  }

  async componentDidMount(){
    var web3Settings = this.state.web3Settings;
    web3Settings.contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
    this.setState({web3Settings:web3Settings});
    console.log(this.state);
  }

  onSubmit = async (event) => {
    event.preventDefault();
    this.setState({loading:true, errorMessage:''});
    try{
      const accounts= await this.state.web3.eth.getAccounts();
      const instance = new this.state.web3.eth.Contract(TravelerLoot.TravelerLoot.abi, this.state.web3Settings.contractAddress );

      await instance.methods.claim(this.state.tokenId).send({from:accounts[0]});
      let uri = await instance.methods.tokenURI(this.state.tokenId).call()
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
    console.log(this.state);
    const instance = new this.state.web3.eth.Contract(TravelerLoot.TravelerLoot.abi, this.state.web3Settings.contractAddress );

      let uri = await instance.methods.tokenURI(this.state.tokenId).call()
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

    disconnect = (event) =>{
        console.log("disconnect");
        var web3Settings = this.state.web3Settings;
        web3Settings.isWeb3Connected = false;
        this.setState({web3Settings:web3Settings});
    }

    connect = async (event) => {
      var providerOptions={
       injected:{
         display:{
           name: "Injected",
           description: "Connect with the provider in your Browser"
         },
         package:null
       }
      }
      var web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });
      var provider;
      try {
        provider = await web3Modal.connect();
      } catch(e) {
        console.log("Could not get a wallet connection", e);
        return;
      }

      var web3=new Web3(provider);

      provider.on('accountsChanged', function (accounts) {
        console.log("account changed "+accounts[0]);
        window.location.reload();
      })

      provider.on('chainChanged', function (networkId) {
        console.log("chain changed: reloading page");
        window.location.reload();
      })

      provider.on("disconnect",function() {
        console.log("disconnecting");
        provider.close();
        web3Modal.clearCachedProvider();
        provider=null;
      }
     );
      this.setState({web3:web3});

      console.log(this.state.web3);
       const networkId =  await this.state.web3.eth.net.getId();
       const accounts = await this.state.web3.eth.getAccounts();
       console.log("account:"+ accounts[0]);

       const ethBalance = await this.state.web3.eth.getBalance(accounts[0]) / 10 ** 18;
       console.log(this.state.web3Settings.isWeb3Connected);
       var web3Settings = this.state.web3Settings;
       web3Settings.account = accounts[0];
       web3Settings.networkId = networkId;
       web3.eth.net.getNetworkType()
        .then((value) => {
         web3Settings.networkName = value;
         this.forceUpdate();
       });

       web3Settings.ethBalance = ethBalance;
       web3Settings.isWeb3Connected = accounts.length > 0;
       this.setState({web3Settings:web3Settings});

       console.log(this.state.web3Settings.isWeb3Connected);
    }

  render(){


    return (

      <Layout disconnect = {this.disconnect} connect = {this.connect}  state = {this.state.web3Settings}>
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
        {
          this.state.web3Settings.isWeb3Connected
          ? this.state.web3Settings.networkId == this.state.web3Settings.deployingNetworkId
            ?
            (

                <div className={styles.home__feature}>
                <h2>Claim your Traveler!</h2>
                <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
                  <Form.Field>
                    <p>Insert an available tokenId between 2223 and 10000</p>
                    <Input
                    type='number'
                    max={10000}
                    min = {2223}
                    value = {this.state.tokenId}
                     onChange = {event => this.setState({tokenId: event.target.value})}/>
                  </Form.Field>

                  <Message error header="Oops!" content = {this.state.errorMessage} />
                  {/*<Button disabled={this.state.tokenId.length == 0} type="button" basic color='grey' onClick={this.onSynthetic} > Preview</Button>*/}
                  <Button disabled={this.state.tokenId.length == 0} loading = {this.state.loading} primary>User Mint</Button>
                  <Button target="_blank" href={`https://rinkeby.etherscan.io/address/${this.state.web3Settings.contractAddress}#code`} type="button" basic color='blue' > H4x0r M1n7 </Button>
                </Form>
                {!this.state.minted ? null : (
                  <Card centered>
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
            )
            :
              (
                <Dimmer active>
                  <Loader size='massive'>
                  <h1>Wrong Network!</h1>
                  <h2>You are connected to netword {this.state.web3Settings.networkId} - {this.state.web3Settings.networkName}</h2>
                  <h3>Please connect to network {this.state.web3Settings.deployingNetworkId} - {this.state.web3Settings.deployingNetworkName}</h3>
                  </Loader>
                </Dimmer>
              )

              : (
                  <Segment>
                    <div>
                      <Container textAlign="center" style={{color:"black"}}>
                        placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text placeholder text
                      </Container></div>
                  </Segment>
                )
        }
      </Layout>
    )
  }
}

export default MyDapp;
