import React,{Component} from 'react';
import {Image} from 'semantic-ui-react'
import styles from "../styles/components/Layout.module.scss"; // Styles

class Footer extends Component{
  constructor(props) {
     super(props)
  }

  render(){

    return (
      <div className="bg-black">
        <div className={styles.footer}>
        Forked from <a target= "_blank" href={this.props.state.OGLOOTWebsite}>🔗Project Loot</a>
        {" "}
        and built by <a target="_blank" href={this.props.state.tripsCommunity}>🔗Trips Community</a>
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
            <Image className="text-white mx-2" src="https://i.creativecommons.org/p/zero/1.0/88x31.png" />
          </div>


        </div>
      </div>
    );
}
}
export default Footer;
