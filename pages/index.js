import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import {Form, Button, Input, Message,  Card, Icon, Image, Container, Dimmer, Loader, Segment } from 'semantic-ui-react';
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
    console.log(derivatives);
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
                  The Traveler Loot is a Loot derivative for the travel industry, generated and stored on chain.
                  <br />
                  Stats, images, and other functionality are intentionally omitted for others to interpret. Feel free to use The Traveler Loot in any way you want.
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
            </div>
          </div>
        </div>
        <div className="bg-black flex flex-wrap mx-auto sticky top-0 w-full justify-center text-sm space-x-6 sm:space-x-10 py-4 z-10 sm:text-2xl font-display">
          <div>
            <a className="hover:text-gray-600" href="#start">Get Traveler Loot</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#chapter1">Priorities</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#chapter2">Derivative Loots</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#chapter3">Selected Guilds</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#chapter4">Patrons</a>
          </div>
          <div>
            <a className="hover:text-gray-600" href="#chapter5">Elements and Rarity</a>
          </div>
        </div>

        <div id="start" className="bg-black  sm:py-20 py-10 pb-40 ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3 ">
                <span className="uppercase sm:text-xl tracking-widest text-white">
                  A Real World Loot
                </span>
                <h1 className="text-center mt-4 capitalize">Start Here: Get A Traveler Loot</h1>
                <br />
                {
                  this.state.web3Settings.isWeb3Connected ? (<div></div>) :(

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
                                <p>Insert an available tokenId between 2223 and 10000</p>
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
                              <Button disabled={this.state.tokenId.length == 0} loading = {this.state.loading} secondary>User Mint</Button>
                              <Button target="_blank" href={`https://rinkeby.etherscan.io/address/${this.state.web3Settings.contractAddress}#code`} type="button" basic color='black' > H4x0r M1n7 </Button>
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
        <div id="chapter1" className="bg-blue-4 sm:py-20 py-10 pb-40  ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                <span className="uppercase sm:text-xl tracking-widest text-white">Special Traveler Loots</span>
                <h1 className="text-center mt-4 capitalize">Priorities for Loot owners</h1>
                <p className="sm:text-2xl text-white">Mint Special Loots</p>
              </div>
            </div>

            <Card.Group itemsPerRow={4}>
              <Card>
                  <Image src='https://storage.opensea.io/files/e8334ee6001611c4aa49b616de22281b.svg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Colored Loots</Card.Header>
                    <Card.Meta>#1 to #2000</Card.Meta>
                    <Card.Description>
                      Colored NFTs reserved for owners of Loot NFT from <a href="#selected">selected Loot projects (*)</a>
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    Cost: Free + Gas
                  </Card.Content>
              </Card>


              <Card>
                  <Image src='https://storage.opensea.io/files/b5453db98be03de689c2c6ce60170831.svg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Owner Loots</Card.Header>
                    <Card.Meta>TokenId: #2001 to #2222</Card.Meta>
                    <Card.Description>
                      Black and white Traveler Loots reserved to contract deployer (Trips Community).
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    Cost: Free + Gas
                  </Card.Content>
              </Card>


              <Card>
                  <Image src='https://storage.opensea.io/files/40acdc427b768cb761c4ae626c4f1f11.svg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Standard Loots</Card.Header>
                    <Card.Meta >TokenId: #2223 to #10000</Card.Meta>
                    <Card.Description>
                      Black and white Traveler Loots.
                    </Card.Description>
                  </Card.Content>
                  <Card.Content extra>
                    Cost: Free + Gas
                  </Card.Content>
                </Card>

              <Card>
                  <Image src='https://storage.opensea.io/files/40acdc427b768cb761c4ae626c4f1f11.svg' wrapped ui={false} />
                  <Card.Content>
                    <Card.Header>Patron Traveler Loots</Card.Header>
                    <Card.Meta>TokenId: Your address</Card.Meta>
                    <Card.Description>
                      Colored Traveler Loots. Each address can only claim one and the tokenId is the address number who mints it
                    </Card.Description>

                  </Card.Content>
                  <Card.Content extra>
                    Cost: 1ETH (variable) + Gas
                  </Card.Content>
              </Card>
            </Card.Group>
          </div>
        </div>

        <div id="chapter2" className="bg-blue-5 py-20">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                <span className="uppercase sm:text-xl tracking-widest text-white">Team up</span>
                <h1 className="text-center mt-4">Derivative Loot Guilds</h1>
                <p className="sm:text-2xl text-white">If you have an NFT from an eligible Loot project, you are part of a Guild.<br />
If you are the first to mint from your Guild, you will decide the Color of your Guild Traveler Loots.<br />
There are 14 Colors.<br /><br />

When all 2000 Colored Loots have been minted, the Guild with most NFTs will WIN.<br /> Your Guild wins the possibility to mint for free + gas a Patron NFT, which otherwise costs about 1 ETH.<br /></p>
              </div>
            </div>



          </div>
        </div>
         <a name="selected"></a>
        <div id="chapter3" className="bg-blue-6  py-20 text-black ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around ">
              <div className="px-20 py-8 rounded text-center">
                <span className="uppercase sm:text-xl tracking-widest text-white">Only For Loot Owners</span>

               <br />
                <h1 className="text-center mt-4 text-white">Selected Loot Projects</h1>
              </div>
            </div>
            <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 text-white">
              <p className="my-4">Owners of NFTs in these projects have priority on Colored Loots</p>
              <Card.Group itemsPerRow={3} centered items={derivatives} />

              <br />
              <br />
              Loot project owners have the priority to mint a Traveler Loot in special edition Colored NFT, opening the doors for other possible future airdrops or advantages.
              <br />

              <br />
              By using the "qualifiedClaim(tokenId, contractAddress)" function Loot project owners can mint a Special Edition colored NFT on a first-come-first-served basis.


              <br />
              E.g.: if you own the Loot #1 from an eligible Loot project, you would be able to mint the Traveler Loot #1, just providing the tokenId you own and the Loot address.
              <br />
              <br />This will be minted in special edition (a different background and text color).
              <br />
              <br />
              If you own a higher "tokenId" from a previous eligible Loot project, you can claim your special edition too (for the mathematically inclined: because the number will be % by 2000). E.g. the Traveler Loot Special Edition #500 can be minted only by those who own Loot NFTs with ID #500, #2500, #4500, #6500 etc..
              <br />
              <br />
              <b>You can mint your special edition, if you are fast enough to claim it before they go out of supply</b>

              <br />
              <br />
              First come, first served: when you mint your number, the other Loot owners won't be able to.
              <br />
            </div>
          </div>
        </div>

        <div id="chapter4" className="bg-blue-7 py-20">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around">
              <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
                <span className="uppercase sm:text-xl tracking-widest text-white">Support the Project</span>
                <h1 className="text-center mt-4">Get a Patron Loot</h1>

                <p className="sm:text-2xl text-white">Your ETH address will be the TokenID: rare
                  <br />
                  <br />
                  <br />
                </p>

                <Image src='https://storage.opensea.io/files/e8334ee6001611c4aa49b616de22281b.svg' wrapped ui={false} />

                <p className="sm:text-2xl text-white">
                  <br />
                  Starting cost: 1 ETH
                  <br />
                  Colour: gold
                  <br />
                </p>
                <p className="sm:text-2xl text-white">
                  <br />
                  <br />
                  <b>50% of the Patron sales will go to Gitcoin grants in the Climate Change category. The rest will be used to give value to the Traveler Loot.</b>
                  <br />
                  <br />
                  <br />


                <b>PRICE VARIABILITY</b>
                <br />
                The minting price varies according to the number of ordinary Travel Loot NFTs minted:
                <br />
                <br />
                Every time a Standard NFT (#2223 to #10000) is minted the Patron NFT minting price ⬆️ <b>increases by 1% </b>.
                <br />
                <br />

                Every time one eligible Loot derivate owner mints a Colored Loot (#1 to #2000) the Patron NFT minting price ⬆️ <b>increases by 2% </b>.
                <br />
                <br />
                Every time a Patron NFT is minted, the Patron NFT minting price ⬆️ <b>increases by 5%</b>.
                <br />
                <br />

                <br />Every time one of the Owner Loots (#2001 to #2222) is minted, the the Patron NFT minting price  ⬇️ <b>goes down by 5% </b>.
                <br />
                <br />

                <br />Every time one of the Owner Loots (#2001 to #2222) is minted, the the Patron NFT minting price  ⬇️ <b>goes down by 5% </b>.
                <br />
                <br />

                Every time an owner of an
                <a href="https://opensea.io/collection/lootproject" target="_blank"> original Loot</a>
                mints a Patron with its own address, the Patron NFT minting price ⬇️ goes down by 5%.
                <br />
                <br />
                This privileges expires on the 40th birthday of 🔗
                <a href="https://twitter.com/dhof" target="_blank">Dhof</a>
                on 27/09/2026 23:59:59 (UTC) or when all Colored NFTs (#1 to #2000) are minted and we have a winner.
                <br />
                Use the
                <i>claimForLooters()</i>
                method.
                <br />
                <br />
                Every time a winner (part of the winner Guild/Family) mints with its own address, the Patron NFT minting price  ⬇️
                <b>goes down by 5% </b>.
                <br />
                <br />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div id="chapter5" className="bg-blue-8  py-20 text-white ">
          <div className="container mx-auto mt-8">
            <div className="flex justify-around ">
              <div className="px-20 py-8 rounded text-center">
                <span className="uppercase sm:text-xl tracking-widest text-white">Only For Loot Owners</span>

               <br />
                <h1 className="text-center mt-4">Elements and Rarity</h1>
              </div>
            </div>
            <div className="text-center sm:text-2xl my-4 sm:w-2/3 mx-auto px-4 ">
              <p className="my-4">There are 10 categories:
                <br />
                <br /><i>Character</i>
                <br /><i>Preferred travel environment</i>
                <br /><i>Preferred Means of Transport</i>
                <br /><i>Languages spoken</i>
                <br /><i>Talent</i>
                <br /><i>Preferred place in the world</i>
                <br /><i>Travel experience</i>
                <br /><i>Preferred Accommodation</i>
                <br /><i>In the bag</i>
                <br /><i>Occupation<br /></i>
                <br />

                And hundreds of elements with variable rarity.
                The total possible combinations are over a 100 billion.
              </p>
            </div>

          </div>

        </div>

      </Layout>
    )
  }
}

export default MyDapp;
