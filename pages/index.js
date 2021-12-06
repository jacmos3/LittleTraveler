import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message,  Card, Icon, Image, Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
//import web3 from '../ethereum/web3';
import {Router} from '../routes';
import TravelerLoot from '../ethereum/build/TravelerLoot.sol.json';
import styles from "../styles/pages/INDEX.module.scss"; // Styles
import Web3 from "web3";
import Web3Modal from "web3modal";
import Opensea from "../img/opensea.svg"
import Twitter from "../img/twitter.svg";
import ExchangeIcon from "../img/exchangeIcon2.svg";
import Discord from "../img/discord.svg";

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
            <div className="mx-auto px-2 sm:px-4 text-center py-10 sm:py-20 justify-around flex flex-wrap hero-img bg-opacity-10">
            <div className="w-full sm:w-1/2">
              <div className="sm:px-4">

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

              <div>
              <Container>
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
        </Container>
        </div>
                <p className="text-xl sm:text-2xl text-gray-300">Loot is randomized adventurer gear generated and stored on chain. Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Loot in any way you want.</p>
                <div>
                  <div className="flex py-8 w-full justify-center space-x-6">
                    <a
                      href="https://www.loot.exchange/"
                      className="self-center p-3 border border-gray-800 rounded-xl bg-black hover:bg-gray-600"
                      target="_blank"
                    >
                    <Image className="fill-current hover:text-gray-200 text-gray-400 w-6 h-6 mx-2" src="../img/exchangeIcon2.svg"  />

                    </a>
                    <a
                      href="https://opensea.io/collection/lootproject"
                      className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-gray-600"
                      target="_blank"
                    >
                      <Image className=" hover:text-gray-200  w-6 h-6 mx-2" src="../img/opensea.svg"  />
                    </a>
                    <a
                      href="https://twitter.com/lootproject"
                      className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-gray-600"
                      target="_blank"
                    >
                      <Image className="fill-current  text-white w-6 h-6 mx-2" src="../img/twitter.svg"/>
                    </a>
                    <a
                      href="https://discord.gg/KuYyKXam9G"
                      className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-gray-600"
                      target="_blank"
                    >
                      <Image className="fill-current  text-white w-6 h-6 mx-2" src="../img/discord.svg"/>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap mx-auto sticky top-0 bg-black w-full justify-center text-sm space-x-6 sm:space-x-10 py-4 z-10 sm:text-2xl font-display">
            <div>
              <a className="hover:text-gray-600" href="#start">Get Loot</a>
            </div>
            <div>
              <a className="hover:text-gray-600" href="#chapter1">Gear Up</a>
            </div>
            <div>
              <a className="hover:text-gray-600" href="#chapter2">Character</a>
            </div>
            <div>
              <a className="hover:text-gray-600" href="#chapter3">Quests</a>
            </div>
          </div>

          <div id="start" className="bg-black  sm:py-20 py-10 pb-40 ">
                <div className="container mx-auto mt-8">
                  <div className="flex justify-around">
                    <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3 ">
                      <span className="uppercase sm:text-xl tracking-widest text-gray-400">The Quest begins here</span>
                      <h1 className="text-center mt-4 capitalize">Start here: Get a Loot Bag</h1>
                      <p className="text-xl sm:text-2xl text-gray-400">8,000 Bags full of Loot, discovered by Adventurers. Where did they come from? What stories do they hold? Collect a bag, learn its story, and begin your adventure. </p>
                    </div>
                  </div>


                </div>
              </div>
              <div id="chapter1" className=" sm:py-20 py-10 pb-40  bg-gray-800">
                <div className="container mx-auto mt-8">
                  <div className="flex justify-around">
                    <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                      <span className="uppercase sm:text-xl tracking-widest text-gray-400">Chapter 1</span>
                      <h1 className="text-center mt-4 capitalize">Gear up</h1>
                      <p className="sm:text-2xl text-gray-400">Mint, claim, or trade additional items</p>
                    </div>
                  </div>


                </div>
              </div>
              <div id="chapter2" className=" bg-gray-700 py-20">
                <div className="container mx-auto mt-8">
                  <div className="flex justify-around">
                    <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                      <span className="uppercase sm:text-xl tracking-widest text-gray-400">Chapter 2</span>
                      <h1 className="text-center mt-4">Get Your Character</h1>
                      <p className="sm:text-2xl text-gray-400">Who carried these Loot bags? Where did they come from? What are their stories?</p>
                    </div>
                  </div>



                </div>
              </div>
              {/* <div id="chapter2" className="bg-gradient-to-b from-gray-700 to-gray-600 py-20">
                <div className="container mx-auto mt-8">
                  <div className="flex justify-around">
                    <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                      <span className="uppercase sm:text-2xl">Chapter 3</span>
                      <h1 className="text-center mt-4">Fun & Games</h1>
                      <p className="sm:text-2xl">Who carried these Loot bags? Where did they come from? What can you do with these treasures? Your adventure begins now.</p>
                    </div>
                  </div>


                  {whatToDo.map(({ name, description, project }, i) => {
                    return (
                      <CardRow key={i} name={name} description={description} project={project} />
                    );
                  })}
                </div>
              </div> */}
              <div id="chapter3" className="bg-white  py-20 text-black ">
                <div className="container mx-auto mt-8">
                  <div className="flex justify-around ">
                    <div className="px-20 py-8 rounded text-center">
                      <span className="uppercase sm:text-xl tracking-widest text-gray-400">Chapter 3</span>
                      <h1 className="text-center mt-4">Go on Quests</h1>
                    </div>
                  </div>
                  <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 ">
                    <p className="my-4">Your journey continues soon.</p>
                    <br />
                    <a
                      target="_blank"
                      href="https://a.quest"
                      className="bg-gray-800 hover:bg-gray-600 py-2 rounded-xl px-5 my-1 text-lg  text-gray-200 border border-gray-700 w-full text-center"
                    >
                      Coming soon
                    </a>
                  </div>
                </div>
              </div>





      </Layout>
    )
  }
}

export default MyDapp;
