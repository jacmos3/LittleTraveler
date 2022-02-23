import React, {Component} from 'react';
import {Card,Container,Image} from 'semantic-ui-react';

class Team extends Component{
  constructor(){
    super();

  }
render(){

  return (

    <div className="container mx-auto mt-8 " >
      <div className="flex justify-around">
        <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
          <span className="uppercase sm:text-xl tracking-widest ">GALLERY</span>
          <h1 className="text-center mt-4 capitalize">THE TEAM</h1>
          <p className="sm:text-2xl">xxxx</p>

          <p className="text-xl sm:text-2xl">
          100% remote builders, who started in the summer and finished just in time for spring.
          </p>

        </div>
      </div>
      <Container>
        <Card.Group itemsPerRow={5} stackable={true} doubling={true}>
          <Card>
          <Image src='littletravelers/team/Little-Traveler-Team-1.png' wrapped ui={false} />
          <Card.Content>
          <p className="text-xl sm:text-2xl text-center" >Marco</p>
          <p className="text-xl sm:text-1xl text-center ">The Designer<br /></p>
          </Card.Content>

          </Card>

          <Card>
            <Image src='littletravelers/team/Little-Traveler-Team-4.png' wrapped ui={false} />

            <Card.Content>
          <p className="text-xl sm:text-2xl text-center" >Jacopo</p>
          <p className="text-xl sm:text-1xl text-center ">The Dev<br /></p>
          </Card.Content>
          </Card>

          <Card>
            <Image src='littletravelers/team/Little-Traveler-Team-5.png' wrapped ui={false} />

            <Card.Content>
            <p className="text-xl sm:text-2xl text-center" >Luca</p>
            <p className="text-xl sm:text-1xl text-center ">The Mind behind it all<br /></p>
            </Card.Content>
          </Card>
          <Card>
          <Image src='littletravelers/team/Little-Traveler-Team-6.png' wrapped ui={false} />
          <Card.Content>
          <p className="text-xl sm:text-2xl text-center" >Carla</p>
          <p className="text-xl sm:text-1xl text-center ">The Organizer<br /></p>
          </Card.Content>

          </Card>

          <Card>
            <Image src='littletravelers/team/Little-Traveler-Team-9.png' wrapped ui={false} />

            <Card.Content>
          <p className="text-xl sm:text-2xl text-center" >Valerio</p>
          <p className="text-xl sm:text-1xl text-center ">The Engineer<br /></p>
          </Card.Content>
          </Card>

          <Card>
            <Image src='littletravelers/team/Little-Traveler-Team-10.png' wrapped ui={false} />

            <Card.Content>
            <p className="text-xl sm:text-2xl text-center" >Guido</p>
          <p className="text-xl sm:text-1xl text-center ">The Background and NFT expert<br /></p>
            </Card.Content>
          </Card>

          <Card>
          <Image src='littletravelers/team/Little-Traveler-Team-6.png' wrapped ui={false} />
          <Card.Content>
          <p className="text-xl sm:text-2xl text-center" >Francesco</p>
          <p className="text-xl sm:text-1xl text-center ">The Great Referrer<br /></p>
          </Card.Content>

          </Card>

          <Card>
            <Image src='littletravelers/team/Little-Traveler-Team-9.png' wrapped ui={false} />

            <Card.Content>
          <p className="text-xl sm:text-2xl text-center" >Alessandro</p>
          <p className="text-xl sm:text-1xl text-center ">The Statistician<br /></p>
          </Card.Content>
          </Card>

          <Card>
            <Image src='littletravelers/team/Little-Traveler-Team-10.png' wrapped ui={false} />

            <Card.Content>
            <p className="text-xl sm:text-2xl text-center" >Giulia</p>
          <p className="text-xl sm:text-1xl text-center ">xxx<br /></p>
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    <br />
    <br />
    <br />
    </div>

  )
};
};
export default Team;
