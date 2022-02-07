import React, {Component} from 'react';
import {Card,Container,Image} from 'semantic-ui-react';

class Types extends Component{
  constructor(){
    super();

  }
render(){

  return (

    <div className="flex justify-around">
      <div className="px-4 sm:px-20  rounded-2xl text-center md:w-2/3">
        <h2 className="text-center mt-4 capitalize">An Incredible Variety of Travelers</h2>

      <Container>
        <Card.Group itemsPerRow={6} doubling={true}>
          <Card>
          <Image src='littletravelers/types/Little-Traveler-1.png' wrapped ui={false} />
          </Card>

          <Card>
            <Image src='littletravelers/types/Little-Traveler-2.png' wrapped ui={false} />
          </Card>
          <Card>
            <Image src='littletravelers/types/Little-Traveler-3.png' wrapped ui={false} />
            <Card.Content>
            </Card.Content>
          </Card>
          <Card>
          <Image src='littletravelers/types/Little-Traveler-4.png' wrapped ui={false} />
          </Card>

          <Card>
            <Image src='littletravelers/types/Little-Traveler-5.png' wrapped ui={false} />
          </Card>
          <Card>
            <Image src='littletravelers/types/Little-Traveler-6.png' wrapped ui={false} />
            <Card.Content>
            </Card.Content>
          </Card>
          <Card>
          <Image src='littletravelers/types/Little-Traveler-7.png' wrapped ui={false} />
          </Card>

          <Card>
            <Image src='littletravelers/types/Little-Traveler-8.png' wrapped ui={false} />
          </Card>
          <Card>
            <Image src='littletravelers/types/Little-Traveler-9.png' wrapped ui={false} />
            <Card.Content>
            </Card.Content>
          </Card>
          <Card>
          <Image src='littletravelers/types/Little-Traveler-10.png' wrapped ui={false} />
          </Card>

          <Card>
            <Image src='littletravelers/types/Little-Traveler-11.png' wrapped ui={false} />
          </Card>
          <Card>
            <Image src='littletravelers/types/Little-Traveler-12.png' wrapped ui={false} />
            <Card.Content>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>

      </div>

    </div>

  )
};
};
export default Types;
