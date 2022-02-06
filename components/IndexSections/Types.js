import React, {Component} from 'react';
import {Card,Container,Image} from 'semantic-ui-react';

class Types extends Component{
  constructor(){
    super();

  }
render(){

  return (


    <div className="container mx-auto mt-8 " >
      <div className="flex justify-around">
        <div className="px-4 sm:px-20 py-8 rounded-2xl text-center md:w-2/3">
          <span className="uppercase sm:text-xl tracking-widest ">Examples</span>
          <h1 className="text-center mt-4 capitalize">An Incredible Variety of Travelers</h1>
          <p className="sm:text-2xl">Find yours!</p>

          <p className="text-xl sm:text-2xl">
               Hand drawn by an Italian artist, the Little Traveler is the result of seven months of cooperations amongts several people in the Traveler DAO.
               <br />
               The backgorunds are public domain pictures we filtered with the AI to make four versions of Anime filters.
          </p>

        </div>
      </div>
      <Container>
        <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
          <Card>
          <Image src='littletravelers/types/Little-Traveler-1.png' wrapped ui={false} />
              {/* <Card.Content>
                <Card.Header>Traveler Loot for Guilds</Card.Header>
                <Card.Meta>Supply: 900 (#1 to #900)</Card.Meta>
                <Card.Description>
                  Guilds members can claim these slots <a href="#guildsclaim">🔗here</a>, or by calling claimByGuilds(tokenId,contractAddress) function on etherscan.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                Cost: Free + Gas
              </Card.Content> */}
          </Card>

          <Card>
            <Image src='littletravelers/types/Little-Traveler-2.png' wrapped ui={false} />
            {/* <Card.Content>
              <Card.Header>Traveler Loot Standard</Card.Header>
              <Card.Meta >Supply: 9100 (#901 to #10000)</Card.Meta>
              <Card.Description>
                Everybody can claim one (or more) Traveler Loot Standard <a href="#Start">🔗 here</a>.
                <br/>From #901 to #1000 are reserved to Trips Community.
                <br />From #1001 to #10000 are open for everybody to be claimed.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Cost: Free + Gas
            </Card.Content> */}
          </Card>
          <Card>
            <Image src='littletravelers/types/Little-Traveler-3.png' wrapped ui={false} />
            <Card.Content>
              {/* <Card.Header>Traveler Loot for Patrons</Card.Header>
              <Card.Meta >Supply: undefined but limited</Card.Meta>
              <Card.Description>
                Everybody can claim one (and only one) Traveler Loot for Patron, but it's not for free.
                <br />It has a dynamic price, starting from 1 ether.
                <br />It's price is designed to increase as much as the project gains popularity and utility. The supply is leaded by the price unaffordability by design.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Cost: Dynamic Price + Gas */}
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    <br />
  


    <Container>
        <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
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
        </Card.Group>
      </Container>
    <br />

    <Container>
        <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
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
        </Card.Group>
      </Container>
    <br />

    <Container>
        <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
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
    <br />

    <Container>
    <p>
    Traveler Loot Project is a layer built on top of <a href= {this.props.state.OGLOOTWeb}>🔗Loot Project</a> and other whitelisted contracts (we call them <a href="#Guilds">🔗Guilds</a>).
    By holding NFTs of the whitelisted contracts, you have access to the <span className="italic">Traveler Loot for Guilds</span> claims. Project's whitelisting is open <a target="_blank" href={`${this.props.state.etherscan}#writeContract`}>🔗here</a>.
    </p>
    </Container>
    </div>

  )
};
};
export default Types;
