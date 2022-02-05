import React, {Component} from 'react';
import {Container,Button,Form,Input,Message,Card,Dimmer,Segment,Tab, Loader} from 'semantic-ui-react';
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
    tokenId:'',
    minted:false,
    errorMessage:"",
    all:[]
  }
  constructor(){
    super();

  }


render(){
  const yes = true;
  const panes = [
    yes ? {
      menuItem: 'Tab 1',
      render: () => <ClaimWithTrips state={this.props.state}/>,
    }
    :{},

    {
      menuItem: 'Tab 2',
      render: () => <ClaimWithTravelerLoot />,
    },
    {
      menuItem: 'Tab 3',
      render: () => <ClaimWithEther />,
    },
  ]
  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-around">
        <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3 ">
          <span className="uppercase sm:text-xl tracking-widest ">
            Start Here:
          </span>
          <h1 className="text-center mt-4 capitalize">Get A Little Traveler!</h1>
          <br />
          <Tab menu={{ secondary: true, pointing: true }} panes={panes} />

            <p className="text-xl sm:text-2xl ">
                Text text text text text text text text text
                <br />
                Text text text text text text text text text
                <br />
                Text text text text text text text text text
                <br />
                Text text text text text text text text text
                <br />
                Text text text text text text text text text
                <br />
                Text text text text text text text text text
                <br />
                <br />
              </p>
              <Form  error={!!this.state.errorMessage}>
                {
                  this.props.state.web3Settings.isWeb3Connected
                  ? this.props.state.web3Settings.networkId == this.props.state.web3Settings.deployingNetworkId
                    ?
                    (
                        <div className={styles.home__feature}>
                          <div className="">
                          <Message error header="Oops!" content = {this.state.errorMessage} />
                          <Button  loading = {this.state.loading > 0} secondary onClick = {this.onSubmit}>Claim</Button>
                          <Button  secondary onClick = {this.fetchNFTList}  type="button" basic color='black' >Refresh</Button>
                          <a href="#guildsclaim"><Button  secondary  type="button" basic color='white' >Are you in a guild?</Button></a>
                          <div style={{padding:"15px"}}>
                            <Card.Group itemsPerRow={3} centered items={this.state.all} />
                          </div>
                          {
                            //!this.state.minted ? null : (
                              //<Card.Group itemsPerRow={2} centered items={this.state.all} />
                            //)
                          }
                          </div>
                        </div>

                    )
                    :(
                        <Segment className="h-80">
                          <Dimmer active>
                            <Loader size='massive'>
                            <h1>Wrong Network!</h1>
                            <h2>You are connected to netword {this.props.state.web3Settings.networkId} - {this.props.state.web3Settings.networkName}</h2>
                            <h3>Please connect to network {this.props.state.web3Settings.deployingNetworkId} - {this.props.state.web3Settings.deployingNetworkName}</h3>
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
              </Form>

        </div>
      </div>


    </div>

  )
};
};
export default Claim;
