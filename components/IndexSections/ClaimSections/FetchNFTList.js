import React, {Component} from 'react';
import {Tab,Card,Button,Message,Container} from 'semantic-ui-react';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';

class FetchNFTList extends Component{
  constructor(props){
    super(props);

  }
  componentDidMount(){
    //this.fetchNFTList();
  }
  state ={
    all:[],
    loading:0,
    errorMessage:"",
  };

  fetchNFTList = async () => {
    console.log("fetch");
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
      for (let index = 1; index < lastUserIndex; index++){
        let tokenId = await instance.methods.tokenOfOwnerByIndex(accounts[0],index).call()
        .then((result) =>{
          console.log(result);
          return result;
        })
        .catch((error)=>{
          console.log(error);
        });

        let uri = await instance.methods.tokenURI(tokenId).call()
        .then((result)=> {
          console.log(result);
          return JSON.parse(window.atob(result.split(',')[1]));

        })
        .catch((error)=>{
          console.log(error);
        });

        let element = {"header": uri.name,/*"description":uri.description,*/"image":uri.image};
        all.push(element);
        console.log(uri);
        //TODO: after getting the ipfs json it has to be fetched and the image has to be extracted
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
    <Tab.Pane attached={false} >
      <div style={{padding:"15px"}}>

        {!!this.state.errorMessage ? <Message header="Oops!" content = {this.state.errorMessage} /> : ""}
        {
          //<Button  loading = {this.state.loading > 0} primary onClick = {this.fetchNFTList}  >Refresh</Button>
        }
        <a target ="_blank" href="https://www.opensea.io/account"><Button  loading = {this.state.loading > 0} primary >Check on Opensea</Button></a>
        <Container>
        <Card.Group className="py-5" itemsPerRow={6} centered items={this.state.all} />
        </Container>
      </div>
    </Tab.Pane>
  )
};
};
export default FetchNFTList;
