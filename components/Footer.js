import React,{Component} from 'react';
import {Image} from 'semantic-ui-react'
import styles from "../styles/components/Layout.module.scss"; // Styles

class Footer extends Component{
  constructor(props) {
     super(props)
  }

  render(){

    return (
      <div className="bg-trips-2 text-trips-1 bg-opacity-80">
        <div className={styles.footer}>
        Built by <a target="_blank" href="https://opensea.io/assets/matic/0x2953399124f0cbb46d2cbacd8a89cf0599974963/93380629908989276154329187712159695682604484101294988604591734366325570535524">
        🔗The Traveler DAO</a>, a <a target="_blank" href={this.props.state.tripsCommunity}>🔗TripsCommunity DAO</a>
        <br />
        <br />
          Website and Smart Contract's code are{" "}
          <a
            href="https://github.com/jacmos3/LittleTraveler"
            target="_blank"
            rel="noopener noreferrer"
          >
            🔗open-source
          </a>{" "}
          and licensed under MIT license.
          <br />
          The Little Traveler NFTs are Public Domain.
          <div className="flex py-8 w-full justify-center space-x-6">
            <Image className="mx-2" src="https://i.creativecommons.org/p/zero/1.0/88x31.png" />
          </div>


        </div>
      </div>
    );
}
}
export default Footer;
