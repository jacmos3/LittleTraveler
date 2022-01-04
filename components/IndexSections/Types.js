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
          <span className="uppercase sm:text-xl tracking-widest ">Types</span>
          <h1 className="text-center mt-4 capitalize">Each Traveler has a Type</h1>
          <p className="sm:text-2xl">Find yours</p>
        </div>
      </div>
      <Container>
        <Card.Group itemsPerRow={3} stackable={true} doubling={true}>
          <Card>
          <Image src='loots/guild_loot.svg' wrapped ui={false} />
              <Card.Content>
                <Card.Header>Traveler Loot for Guilds</Card.Header>
                <Card.Meta>Supply: 900 (#1 to #900)</Card.Meta>
                <Card.Description>
                  <a href="#Guilds">Guilds</a> members can claim these slots by calling claimForGuilds() function on etherscan.
                </Card.Description>
              </Card.Content>
              <Card.Content extra>
                Cost: Free + Gas
              </Card.Content>
          </Card>

          <Card>
            <Image src='loots/standard_loot.svg' wrapped ui={false} />
            <Card.Content>
              <Card.Header>Traveler Loot Standard</Card.Header>
              <Card.Meta >Supply: 9100 (#901 to #10000)</Card.Meta>
              <Card.Description>
                Everybody can claim one (or more) Traveler Loot Standard <a href="#Start">🔗 here</a>.
                <br/>From #901 to #1000 are reserved to Trips Community.
                <br />From #1001 to #10000 are open to everybody. No restrictions applied.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Cost: Free + Gas
            </Card.Content>
          </Card>
          <Card>
            <Image src='loots/patron_loot.svg' wrapped ui={false} />
            <Card.Content>
              <Card.Header>Traveler Loot for Patrons</Card.Header>
              <Card.Meta >Supply: undefined</Card.Meta>
              <Card.Description>
                Everybody can claim one (and only one) Traveler Loot for Patron as long as they can afford it. Traveler Loot for Patrons has a starting cost of 1 ether and it's designed to increase as much as the project gains popularity till it becomes unaffordable to everybody.
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              Cost: Free + Gas
            </Card.Content>
          </Card>
        </Card.Group>
      </Container>
    <br />
    <p>
    Traveler Loot Project is a layer built on top of Loot Project and 14 other Loot Derivatives (<a href="#Guilds">🔗Guilds</a>). By holding one of their NFT, you have access to the <span className="italic">Traveler Loot for Guilds</span> mints ranging between #1 and #900, with the Guild Flag attached to them. If you do not own any Guild's NFT, you can choose one project from them and mint one or you can buy in the secondary market. Once done you'll get instant eligibility for <span className="italic">Traveler Loot for Guild</span> NFT. <span className="italic">Traveler Loot Standard</span> ranging between #1001 and #10000 are open and free (+ gas) minting instead. Loot Project and Derivatives Loots are indipendent projects and there are no royalities or referrals related to Traveler Loot Project.
    </p>
    </div>

  )
};
};
export default Types;
