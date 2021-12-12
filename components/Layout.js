import React, {Component} from 'react';
import {Container} from 'semantic-ui-react';
import { useRouter } from "next/router"; // Routing
import Link from "next/link"; // Routing
import Head from './Head';
import Header from './Header';
import Footer from './Footer';
import styles from "../styles/components/Layout.module.scss"; // Styles

class Layout extends Component{
  constructor(props){
    super(props);
  }


render(){

  const links = [
    // { name: "FAQ", path: "/faq" },
    // { name: "Resources", path: "/resources" },
  ];

  return (
    <div class="overflow-hidden">
      <Head />
      <Header links = {links} disconnect = {this.props.disconnect} connect = {this.props.connect} state = {this.props.state}/>
      {this.props.children}
      <Footer />
    </div>
  )
};

};
export default Layout;
