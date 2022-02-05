import React, {Component} from 'react';
import {Tab} from 'semantic-ui-react';

class FetchNFTList extends Component{
  constructor(){
    super();

  }

  fetchNFTList = async () => {
    console.log("hey");
    this.setState({loading:this.state.loading+1, errorMessage:''})
    try{
      const accounts= await this.props.state.web3.eth.getAccounts();
      const instance = new this.props.state.web3.eth.Contract(LittleTraveler.LittleTraveler.abi, this.props.state.web3Settings.contractAddress );
      let lastUserIndex = await instance.methods.balanceOf(accounts[0]).call()
      .then((result) =>{
          return JSON.parse(result);
      })
      .catch((error) =>{
        console.log(error);
      })
      let all = [];
      for (let index = 0; index < lastUserIndex; index++){
        let tokenId = await instance.methods.tokenOfOwnerByIndex(accounts[0],index).call()
        .then((result) =>{
          return result;
        })
        .catch((error)=>{
          console.log(error);
        });

        let uri = await instance.methods.tokenURI(tokenId).call()
        .then((result)=> {
          return JSON.parse(window.atob(result.split(',')[1]));

        })
        .catch((error)=>{
          console.log(error);
        });

        let element = {"header": uri.name,/*"description":uri.description,*/"image":uri.image};
        all.push(element);
        console.log(uri);
        this.setState({all:all});
      }
      this.setState({minted:true});
      //console.log(this.state.all.description);

    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});
  }
  
render(){

  return (
    <Tab.Pane attached={false}>
    hey
    </Tab.Pane>
  )
};
};
export default FetchNFTList;
