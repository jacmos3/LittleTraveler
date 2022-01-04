import React, {Component} from 'react';
import {Container,Button,Form,Popup,Icon,Input,Message,Card} from 'semantic-ui-react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
class Claim extends Component{
  constructor(){
    super();
  }
render(){

  return (
    <div className="container mx-auto mt-8">
      <div className="flex justify-around">
        <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3 ">
          <span className="uppercase sm:text-xl tracking-widest ">
            A Real World Loot
          </span>
          <h1 className="text-center mt-4 capitalize">Start Here: Get A Traveler Loot</h1>
          <br />
          {
            this.props.state.web3Settings.isWeb3Connected
            ? (<div></div>)
            :(
              <p className="text-xl sm:text-2xl ">
                10,000 loots, discovered by travelers.
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
              this.props.state.web3Settings.isWeb3Connected
              ? this.props.state.web3Settings.networkId == this.props.state.web3Settings.deployingNetworkId
                ?
                (
                    <div className={styles.home__feature}>
                      <div className=" justify-center grid grid-cols-5 gap-4">
                      <div className="col-start-2 col-span-3">
                      <Form onSubmit = {this.props.onSubmit} error={!!this.props.state.errorMessage}>
                        <Form.Field>
                          <p>
                            Insert an available tokenId between 1001 and 10000
                            <Popup content='#1 - #1000 are reserved. Minting is possible on etherscan by eligible guilds'
                              size='tiny'
                              trigger={<Icon name='info' color='question circle' size='medium' circular />}
                            />
                          </p>
                          <br />
                          <Input
                          type='number'
                          max = {10000}
                          min = {1001}
                          value = {this.props.state.tokenId}
                           onChange = {event => this.props.updateParent({tokenId: event.target.value})}/>
                        </Form.Field>
                        <br />

                        <Message error header="Oops!" content = {this.props.state.errorMessage} />
                        {/*<Button disabled={this.props.state.tokenId.length == 0} type="button" basic color='grey' onClick={this.props.onShow} > Preview</Button>*/}
                        <Button disabled={this.props.state.tokenId.length == 0} loading = {this.props.state.loading} secondary>Claim</Button>
                        <Button target="_blank" href={`https://rinkeby.etherscan.io/address/${this.props.state.web3Settings.contractAddress}#code`} type="button" basic color='black' >H4x0r</Button>
                      </Form>
                      {!this.props.state.minted ? null : (
                        <Card centered>
                          <Image src={`${this.props.state.image}`} wrapped ui={false} />
                          <Card.Content>
                            <Card.Header>{this.props.state.name}</Card.Header>
                            <Card.Meta>
                              <span className='date'>Minted on </span>
                            </Card.Meta>
                            <Card.Description>
                              {this.props.state.description}
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
                            <div className="grid grid-cols-10 gap-4">
                              <div
                                className="col-start-5 col-span-2"
                              >
                                <Button className=" hover:text-white  mx-2" secondary onClick={this.props.connect}>Connect Wallet</Button>
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

  )
};
};
export default Claim;
