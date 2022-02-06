import React, {Component} from 'react';
import Layout from '../components/Layout.js';
import Presentation from '../components/IndexSections/Presentation.js';
import Claim from '../components/IndexSections/Claim.js';
import Space from '../components/IndexSections/Space.js';
import Types from '../components/IndexSections/Types.js';
import Guilds from '../components/IndexSections/Guilds.js';
import Elements from '../components/IndexSections/Elements.js';
import Elements2 from '../components/IndexSections/Elements2.js';
import Elements3 from '../components/IndexSections/Elements3.js';

import Menu from '../components/IndexSections/Menu.js';

import {Header,Button} from 'semantic-ui-react';
//import web3 from '../ethereum/web3';
import {Router} from '../routes';
import Web3 from "web3";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
//import * as UAuthWeb3Modal from "@uauth/web3modal";
//import UAuthSPA from "@uauth/js";

class MyDapp extends Component{
  state = {
    opensea:"https://www.opensea.io/",
    etherscan:"https://etherscan.io/",
    twitter:"https://twitter.com/tripscommunity",
    website:"https://www.travelerloot.com",
    discord:"https://discord.gg/tripscommunity",
    tripsCommunity:"https://www.tripscommunity.com",
    web3Settings:{
      infura:"8886e44c58d547f5bbbd81e0460296a2",
      isWeb3Connected:false,
      deployingNetworkIdArray : [1,137,4],
      deployingNetworkNameArray : ["Ethereum","Polygon","Rinkeby"],
      tripsAddress : "0x1350Fbe8Ce27762ec19134bf8FC405a427fe9Bf1", //remove
      chains: [
        {name:"Ethereum", id:1, options:{trips:{address:"0x1350Fbe8Ce27762ec19134bf8FC405a427fe9Bf1",amount:"1000000000000000000"},loot:"y",coin:{name:"",amount:""}}},
        {name:"Polygon", id:137, options:{trips:{address:"0x1350Fbe8Ce27762ec19134bf8FC405a427fe9Bf1",amount:"1000000000000000000"},loot:"",coin:{name:"MATIC",amount:""}}},
        {name:"Rinkeby", id:4, options:{trips:{address:"0x8978fa89c4d20305f7d885d71a776174b13a28b5",amount:"1000000000000000000"},loot:"0xaeA3ad95Dc000F603622Ef2FFD915bC3D26573a7",coin:{name:"ETH",amount:"0.01"}}},
      ]
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
  update = async (nextState)=>{
    console.log("nextState: "+JSON.stringify(nextState));
    this.setState(nextState);
  }

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
           name: "Default",
           description: "Connect with the provider in your Browser"
         },
         package:null
       },
       /*'custom-uauth': {
         display: UAuthWeb3Modal.display,
         // The Connector
         connector: UAuthWeb3Modal.connector,
         // The SPA libary
         package: UAuthSPA,
         // The SPA libary options
         options: uauthOptions,
       },*/
       walletconnect: {
          display: {
            name: "Mobile",
            description: "Scan qrcode with your mobile wallet"
          },
          package: WalletConnectProvider,
          options: {
            infuraId: this.state.web3Settings.infura // required
          }
       }
      }

      var web3Modal = new Web3Modal({
        network: "rinkeby", // optional
        cacheProvider: false, // optional
        providerOptions // required
      });

      var provider;
      web3Modal.clearCachedProvider();
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
      //console.log(this.state.web3);
       const networkId =  await this.state.web3.eth.net.getId();
       const accounts = await this.state.web3.eth.getAccounts();
       //console.log("account:"+ accounts[0]);

       const ethBalance = await this.state.web3.eth.getBalance(accounts[0]) / 10 ** 18;
      // console.log(this.state.web3Settings.isWeb3Connected);
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

  truncateAddress(address){
    const begin = address.substring(0, 6).concat("...");
    const end = address.substring(address.length-6);
    return begin+end;
  }

  render(){

    return (

      <Layout  state = {this.state}>

        <div id="myVideo">
          <iframe className="bg-black" frameBorder={"0"} width="100%" height="1000px" allowFullScreen={true}
          srcDoc={"<html><head><style>body{margin: 0;padding: 0;}.bg-video-wrap {position: relative;overflow: hidden;width: 100%;height: 100vh;display: flex;}video {object-fit: cover;min-width: 100%;min-height: 100vh;z-index: 1;}</style></head><body><div class='bg-video-wrap'><video loop muted autoplay><source src='/littletravelers/video.mp4' type='video/mp4'></video></div></body></html>"}>
          </iframe>
        </div>

        <div id="connectWallet">
        {
          this.state.web3Settings.isWeb3Connected
          ? (
              <Button onClick={this.disconnect}>
                {this.truncateAddress(this.state.web3Settings.account)}
              </Button>
          )

          : (
            <a href="#Start">
              <Button onClick={this.connect}>
                Connect wallet
              </Button>
              </a>
          )
        }
        </div>

        <Presentation className="bg-rainbow-2 sm:py-20 py-10 pb-40" state={this.state}/>

        <div className="bg-trips-2 sticky top-0 z-10">
          <Menu />
        </div>

        <div id="Start" className="bg-rainbow-3 sm:py-20 py-10 pb-40 text-black bg-opacity-70">
          <Claim disconnect = {this.disconnect} connect = {this.connect}  state = {this.state} />
        </div>

        <div className="py-40">
          <Space />
        </div>

        <div id="Types" className="bg-rainbow-4 sm:py-20 py-10 pb-40 text-black bg-opacity-70">
          <Types state = {this.state}/>
        </div>
        <div className="py-40">
          <Space />
        </div>
        <div id="Guilds" className="bg-rainbow-5  py-20 text-white ">
          <Guilds disconnect = {this.disconnect} connect = {this.connect}  state = {this.state} />
        </div>
        <div className="py-40">
          <Space />
        </div>
        <div id="Elements" className="bg-rainbow-6  py-20 text-white ">
          <Elements />
        </div>

        <div className="py-40">
          <Space />
        </div>
        <div id="Elements2" className="bg-rainbow-6  py-20 text-white ">
          <Elements2 />
        </div>


        <div className="py-40">
          <Space />
        </div>
        <div id="Elements3" className="bg-rainbow-6  py-20 text-white ">
          <Elements3 />
        </div>



      </Layout>
    )
  }
}

export default MyDapp;
