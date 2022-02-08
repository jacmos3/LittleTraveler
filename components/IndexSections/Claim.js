import React, {Component} from 'react';
import {Container,Button,Form,Input,Card,Dimmer,Segment,Tab, Loader,Embed} from 'semantic-ui-react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import LittleTraveler from '../../ethereum/build/LittleTraveler.sol.json';
import ClaimWithTrips from "./ClaimSections/ClaimWithTrips"
import ClaimWithTravelerLoot from "./ClaimSections/ClaimWithTravelerLoot"
import ClaimWithEther from "./ClaimSections/ClaimWithEther"
class Claim extends Component{
  state = {
    loading:0,
    name:'',
    description:'',
    image:'',
    all:[]
  }
  constructor(){
    super();
  }

render(){
  var yes = true;
  var option = this.props.state.web3Settings.chains
    .filter(chain => chain.id === this.props.state.web3Settings.networkId)
    .map(chain => chain.options)[0];

  const panes = [
    option && option.trips? {
      menuItem: 'Mint with TRIPS',
      render: () => <ClaimWithTrips state={this.props.state}/>,
    }
    :{},

    option && option.loot ? {
      menuItem: 'Mint with Traveler Loot',
      render: () => <ClaimWithTravelerLoot state={this.props.state}/>,
    }:{},

    option && option.coin ?
    {
      menuItem: 'Mint With '+option.coin.name,
      render: () => <ClaimWithEther state={this.props.state}/>,
    }:{}
  ]
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-around">
        <div className="px-20 py-8 rounded text-center">
          <span className="uppercase sm:text-xl tracking-widest"></span>
          <h1 className="text-center mt-4 capitalize">Mint your Little Traveler</h1>
          <br />
                {
                  this.props.state.web3Settings.isWeb3Connected
                  ? this.props.state.web3Settings.chains
                    .filter(chain => chain.id === this.props.state.web3Settings.networkId)
                    .map(chain => chain.options.id).length == 1
                    ?
                    (
                      <div>
                          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />
                       </div>
                    )
                    :(
                        <Segment className="h-80">
                          <Dimmer active>
                            <Loader size='massive'>
                            <h1>Wrong Network!</h1>
                            <h2>You are connected to netword {this.props.state.web3Settings.networkId} - {this.props.state.web3Settings.networkName}</h2>
                            <h3>Please connect to networks:<br /> {this.props.state.web3Settings.chains.map(chain => chain.id + " - " + chain.name + "; ")}</h3>
                            </Loader>
                          </Dimmer>
                        </Segment>
                      )

                      :(
                        <div>
                          <Container style={{color:"white"}}>
                            <div style={{padding:"5px"}}>
                            {
                              this.props.state.web3Settings.isWeb3Connected
                              ? (
                                  <Button onClick={this.props.disconnect}>
                                    {this.props.state.web3Settingsaccount}
                                  </Button>
                              )

                              :(
                                <div className="text-center">
                                  <Button className=" hover:text-white  mx-2" secondary onClick={this.props.connect}>Connect Wallet</Button>
                                </div>
                              )
                            }
                            </div>
                          </Container>
                        </div>
                      )
                }

        </div>
      </div>


    </div>

  )
};
};
export default Claim;
