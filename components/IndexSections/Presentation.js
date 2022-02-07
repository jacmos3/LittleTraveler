import React, {Component} from 'react';
import styles from "../../styles/pages/INDEX.module.scss"; // Styles
import {Image,Button,Message,Reveal,Grid,Container,Card} from 'semantic-ui-react';

class Presentation extends Component{
  constructor(){
    super();
  }
render(){
  return (
    <div className="text-black mx-auto px-2 sm:px-4 text-center py-10 sm:py-20 justify-around flex flex-wrap hero-img ">
      <div className="w-full sm:w-1/2">
        <div className="sm:px-4">
          <div className={styles.home__cta}>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <Card.Group centered>
              <Card>
                 <Card.Content >
                 <h1 className="font-medium shadowBackground">Little Traveler</h1>
                 <h4 className="font-bold">A 10,000 native multi-chain PFP project for the travelers and the travel industry!</h4>


                 </Card.Content>
                 <Card.Content extra>
                   <a href="#Start">
                     <Button className="claimButton" primary color='green'>Claim a Little Traveler</Button>
                   </a>
                </Card.Content>
               </Card>
            </Card.Group>
          </div>

          <br /><br /><br /><br /><br /><br /><br /><br />

        </div>
      </div>
    </div>
  )
};
};
export default Presentation;
