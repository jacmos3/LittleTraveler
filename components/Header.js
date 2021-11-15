import React,{Component} from 'react';
import {Button} from 'semantic-ui-react';
import {Link} from '../routes';
import styles from "../styles/components/Layout.module.scss"; // Styles
import { useRouter } from "next/router"; // Routing
import Web3 from "web3";
import Web3Modal from "web3modal";
import Menu from '../img/menu.svg';
import WalletConnectProvider from "@walletconnect/web3-provider";


class Header extends Component{
  constructor(props) {
     super(props)
  }


render(){
  return (
    <div className={styles.header}>
      {/* Main logo */}
      <div className={styles.header__logo}>
        <Link href="/">
          <a>Traveler Loot</a>
        </Link>
      </div>

      {/* Navigation */}
      <div className={styles.header__links}>
        <ul>
          {this.props.links.map(({ name, path }, i) => {
            // For each link, render link
            return (
              <li key={i}>
                <Link href={path}>
                    {name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
            <div style={{padding:"20px"}}>

            {
              this.props.state.isWeb3Connected
              ? (
                  <Button onClick={this.props.disconnect}>
                    {this.props.state.account}
                  </Button>
              )

              : (
                  <Button onClick={this.props.connect}>
                    Connect wallet
                  </Button>
              )
            }

            </div>
    </div>
  );
}
}
export default Header;
