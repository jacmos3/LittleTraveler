import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import LittleTraveler from '../../ethereum/build/LittleTraveler.sol.json';
import {Container,Card,Image} from 'semantic-ui-react';
class Multichain extends Component{
  constructor(){
    super();

  }
  state = {

  }

render(){

  return (

    <div className="container mx-auto mt-8">
      <div className="flex justify-around">
        <div className="px-20 py-8 rounded text-center">

          <h2 className="text-center mt-4 text-trips-1">Native Multichain</h2>
        </div>
      </div>
      <p className="text-center sm:text-xl my-4 ">
        10,000 Little Travelers
        <br />
        1,000 each chain
        <br />
        10 blockchains
        <br />
        1 address
        <br />
        <br />
      </p>
      <Container>
        <Card.Group className="text-center" itemsPerRow={5} doubling={true} >
          <Card>
          <Image src='img/networks/ethereum.png'/>
          <Card.Content className="text-trips-2">
            Released on Feb 8, 2022
          </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/polygon.png'/>
            <Card.Content className="text-trips-2">
              Releasing on Feb 9, 2022
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png' />
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png' />
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png'  />
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png'/>
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png' />
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png'  />
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png'/>
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>
          <Card>
            <Image src='img/networks/new.png'/>
            <Card.Content className="text-trips-2">
              To be revealed yet
            </Card.Content>
          </Card>

          </Card.Group>

        </Container>

    </div>

  )
};
};
export default Multichain;
