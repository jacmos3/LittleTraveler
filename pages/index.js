import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message,  Card, Icon, Image, Container, Dimmer, Loader, Segment, Table, Header, Popup} from 'semantic-ui-react';
//import web3 from '../ethereum/web3';
import {Router} from '../routes';
import TravelerLoot from '../ethereum/build/TravelerLoot.sol.json';
import styles from "../styles/pages/INDEX.module.scss"; // Styles
import Web3 from "web3";
import Web3Modal from "web3modal";
import {derivatives} from "../derivatives.js"

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
    //console.log(this.state);
    //console.log(derivatives);
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
        {name: "Twitter",url: "https://twitter.com/tripscommunity"},
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
                <p className="text-xl sm:text-2xl text-white">
                  <br />
                  Traveler Loot is a <a target= "_blank" href="https://www.lootproject.com/">Loot</a> derivative for the travel industry, generated and stored on chain.
                  <br />
                  Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use Traveler Loot in any way you want.
                </p>
              </div>
              <div className="flex py-8 w-full justify-center space-x-6">
                <a
                  href="https://opensea.io/collection/#"
                  className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-blue-1"
                  target="_blank"
                >
                  <Image className=" hover:text-white  w-6 h-6 mx-2" src="../img/opensea.svg"  />
                </a>
                <a
                  href="https://twitter.com/tripscommunity"
                  className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-blue-1"
                  target="_blank"
                >
                  <Image className="fill-current w-6 h-6 mx-2" src="../img/twitter.svg"/>
                </a>
                <a
                  href="https://discord.gg/tripscommunity"
                  className="self-center p-3 border border-gray-800 rounded-xl  bg-black hover:bg-blue-1"
                  target="_blank"
                >
                  <Image className="fill-current  text-white w-6 h-6 mx-2" src="../img/discord.svg"/>
                </a>

              </div>
              <div><a href="href=https://rinkeby.etherscan.io/">VIEW CONTRACT</a></div>


            </div>
          </div>
        </div>
        <div className="bg-black flex flex-wrap mx-auto sticky top-0 w-full justify-center space-x-6 sm:space-x-10 py-4 z-10 sm:text-2xl font-display">
          <div>
            <a className="hover:text-gray-600" href="#Start">Claim</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#Plot">Plot</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#Guilds">Guilds</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#Types">Types</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#Elements">Elements</a>
          </div>
        </div>

        <div id="Start" className="bg-black  sm:py-20 py-10 pb-40 ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3 ">
                <span className="uppercase sm:text-xl tracking-widest text-white">
                  A Real World Loot
                </span>
                <h1 className="text-center mt-4 capitalize">Start Here: Get A Traveler Loot</h1>
                <br />
                {
                  this.state.web3Settings.isWeb3Connected
                  ? (<div></div>)
                  :(
                    <p className="text-xl sm:text-2xl text-white">
                      10,000 Loots, discovered by travelers.
                      <br />
                      What treasures do they hold?
                      <br />
                      Which gifts will they attracts?
                      <br />
                      Free nights in hotels?
                      <br />
                      Big discounts on flights?
                      <br />
                      Special offers in restaurants?
                      <br />
                      <br />
                    </p>
                  )
                }
                <Container>
                  {
                    this.state.web3Settings.isWeb3Connected
                    ? this.state.web3Settings.networkId == this.state.web3Settings.deployingNetworkId
                      ?
                      (
                          <div className={styles.home__feature}>
                            <div className=" justify-center grid grid-cols-5 gap-4">
                            <div className="col-start-2 col-span-3">
                            <Form onSubmit = {this.onSubmit} error={!!this.state.errorMessage}>
                              <Form.Field>
                                <p>
                                  Insert an available tokenId between 2223 and 10000
                                  <Popup content='#1 - #2222 are reserved. Minting is possible on etherscan by eligible guilds'
                                    size='tiny'
                                    trigger={<Icon name='info' color='question circle' size='medium' circular />}
                                  />
                                </p>
                                <br />
                                <Input
                                type='number'
                                max = {10000}
                                min = {2223}
                                value = {this.state.tokenId}
                                 onChange = {event => this.setState({tokenId: event.target.value})}/>
                              </Form.Field>
                              <br />

                              <Message error header="Oops!" content = {this.state.errorMessage} />
                              {/*<Button disabled={this.state.tokenId.length == 0} type="button" basic color='grey' onClick={this.onSynthetic} > Preview</Button>*/}
                              <Button disabled={this.state.tokenId.length == 0} loading = {this.state.loading} secondary>Claim</Button>
                              <Button target="_blank" href={`https://rinkeby.etherscan.io/address/${this.state.web3Settings.contractAddress}#code`} type="button" basic color='black' >H4x0r</Button>
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
                            </div>
                          </div>

                      )
                      :(
                          <Segment className="h-80">
                            <Dimmer active>
                              <Loader size='massive'>
                              <h1>Wrong Network!</h1>
                              <h2>You are connected to netword {this.state.web3Settings.networkId} - {this.state.web3Settings.networkName}</h2>
                              <h3>Please connect to network {this.state.web3Settings.deployingNetworkId} - {this.state.web3Settings.deployingNetworkName}</h3>
                              </Loader>
                            </Dimmer>
                          </Segment>
                        )

                        :(
                          <div>
                            <Container style={{color:"white"}}>
                              <div style={{padding:"5px"}}>
                              {
                                this.state.web3Settings.isWeb3Connected
                                ? (
                                    <Button onClick={this.disconnect}>
                                      {this.state.web3Settingsaccount}
                                    </Button>
                                )

                                :(
                                  <div className="grid grid-cols-10 gap-4">
                                    <div
                                      className="col-start-5 col-span-2"
                                    >
                                      <Button className=" hover:text-white  mx-2" secondary onClick={this.connect}>Connect Wallet</Button>
                                    </div>
                                  </div>
                                )
                              }
                              </div>
                            </Container>
                          </div>
                        )
                  }
                </Container>
              </div>
            </div>


          </div>
        </div>

        <div id="Plot" className="bg-gray-PLATINUM py-20">
          <div className="container mx-auto mt-8 text-black">
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                <span className="uppercase sm:text-xl tracking-widest">Plot</span>
                <h1 className="text-center mt-4">Context and Details</h1>

                <p className="sm:text-2xl">
                  <br />
                  Once upon a time there was a World populated by Explorers living their lives in search of expeditions. Over the centuries, evolution brought these explorers to build and live in coordination and civilization.
                  <br />They istituited Guilds each one with own flag and civility rules.
                  <br />
                  <br />World was still not fully explored due of lack of knowledge and resources so far, but thanks to recent details coming from Anonymous Entity, Explorers were now able to start new discovering researches. They knew it could take years, but they don't care.
                  <br />
                  <br />Entity's details tell about some "Traveler Loots" that are waiting to be discovered all over the World.
                  <br />Evidence shows about of #10.000 of them to be found. At least.
                  <br />
                  <br />Local Explorers have also been noticed that Explorers from Stranger Worlds were coming to pick some of the Traveler Loots, but their tools are not sofisticated enough to let them find the ones in range #1 - #2000. Traveler Loots in this range have special characteristic: they get forged with the Guild's Flag by its discoverer. That seems interesting!
                  <br />
                  <br />If you own a Loot derivative or a Loot (for Adventurers) NFT, you may be part of a Guild, otherwise you are a Stranger.
                  <br />
                  <br />Since Strangers and Locals are in competition between each other in the process of finding all the 10.000 Traveler Loots, Local Guilds are also in competition between themselves for the specific range #1 - #2000: their goal is to forge the Guild Flag into more Traveler Loot as possible during the process. There will be no loosers, but the one forging the most, becomes the Conqueror of the World.
                  <br />
                  <br />
                  After some studies and investigations, Explorers figured out that Conqueror Guild gains access to some knowledge letting them access to a special <span className="italic">Traveler Loot</span> called "for Patrons". They don't know much about <span className="italic">Traveler Loot for Patrons</span>, but they found others need to pay an expensive price to get access to the same knowledges the Conqueror has for free.
                  <br />
                  <br />
                  Entity did not spoil anything about other advantages yet, but all the clues made the explorers confident that will be given more details.
                  <br />
                  <br />
                  Traces are open and accessible to everybody interested. <a href="https://www.etherscan.com" target="_blank">Here</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div id="Guilds" className="bg-black  py-20 text-white ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around ">
              <div className="px-20 py-8 rounded text-center">
                <span className="uppercase sm:text-xl tracking-widest">Guilds</span>

               <br />
                <h1 className="text-center mt-4 text-white">Selected Loot Projects</h1>
              </div>
            </div>
            <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4">
              <div>
              Each project of this list represents a Guild:
              <br />
              <br />
              <div id="derivatives">
                <Card.Group itemsPerRow={3} centered items={derivatives} />
              </div>
              </div>
              <br />
              <br />
               If you own one NFT of these Guilds, then you are in a Guild.
              <br />
              <br />
              Traveler Loots #1 - #2000 are called <span className="italic">Traveler Loot for Guilds</span> and are provided in first-come-first-served basis, which means other Guilds may pick the NFT you are elegible to before you do, if you are not faster enough.
            </div>

            <div className="text-center">
              <br />
              <br />
              The minting function is regulated by <a href="https://en.wikipedia.org/wiki/Modulo_operation" target="_blank">🔗modulo operation</a> (mod 2000) which means that more Guilds-tokenIds point to the same single Traveler-Loot-tokenId.
              <br />
              Claims are possible on etherscan by calling the function:
              <br />
              claimForGuilds(tokenId, contractAddress);
              </div>
          </div>
        </div>
        <div id="Types" className="bg-gray-PLATINUM sm:py-20 py-10 pb-40 text-black ">
          <div className="container mx-auto mt-8 " >
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                <span className="uppercase sm:text-xl tracking-widest ">Types</span>
                <h1 className="text-center mt-4 capitalize">Each Traveler has a Type</h1>
                <p className="sm:text-2xl">Find yours</p>
              </div>
            </div>

            <Card.Group itemsPerRow={2} stackable={true} doubling={true}>
              <Card>
              <Image src='loots/COLORED_LOOT.svg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Traveler Loot for Guilds</Card.Header>
                    <Card.Meta>Supply: 2000 (#1 to #2000)</Card.Meta>
                    <Card.Description>
                      <a href="#Guilds">Guilds</a> members can claim these slots by calling claimForGuilds() function on etherscan.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    Cost: Free + Gas
                  </Card.Content>
              </Card>

              <Card>
                <Image src='loots/BW_LOOT2.svg' wrapped ui={false} />
                <Card.Content>
                  <Card.Header>Traveler Loot Standard</Card.Header>
                  <Card.Meta >Supply: 8000 (#2001 to #10000)</Card.Meta>
                  <Card.Description>
                    Everybody can claim one (or more) Traveler Loot Standard <a href="#Start">🔗 here</a>.
                    <br/>From #2001 to #2222 are reserved to Trips Community.
                    <br />From #2223 to #10000 are open to everybody. No restrictions applied.
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  Cost: Free + Gas
                </Card.Content>
              </Card>
            </Card.Group>

          <br />
          <p>
          Traveler Loot Project is a layer built on top of Loot Project and 14 other Loot Derivatives (<a href="#Guilds">🔗Guilds</a>). By holding one of their NFT, you have access to the <span className="italic">Traveler Loot for Guilds</span> mints ranging between #1 and #2000, with the Guild Flag attached to them. If you do not own any Guild's NFT, you can choose one project from them and mint one or you can buy in the secondary market. Once done you'll get instant eligibility for <span className="italic">Traveler Loot for Guild</span> NFT. <span className="italic">Traveler Loot Standard</span> ranging between #2222 and #10000 are open and free (+ gas) minting instead. Loot Project and Derivatives Loots are indipendent projects and there are no royalities or referrals related to Traveler Loot Project.
          </p>
          </div>
        </div>

        <div id="Elements" className="bg-black  py-20 text-white ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around ">
              <div className="px-20 py-8 rounded text-center">
                <span className="uppercase sm:text-xl tracking-widest">Under The Hood</span>
                <br />
                <h1 className="text-center mt-4">100 trillion combinations</h1>
                10 categories with 264 elements, and variable rarities.
              </div>
            </div>
            <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 italic">
                <br />30 Characters
                <br />24 Preferred Travel Environments
                <br />30 Preferred Means of Transports
                <br />30 Spoken Languages
                <br />30 Talents
                <br />30 Preferred Places in the World
                <br />9 Travel Experience Levels
                <br />30 Preferred Accommodations
                <br />21 Stuff in the Bag
                <br />30 Occupations
            </div>
            <br />
            <div className="text-center">
              <a href="#Start">
                <Button className=" hover:text-white  mx-2" secondary >Claim a Traveler Loot</Button>
              </a>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default MyDapp;
