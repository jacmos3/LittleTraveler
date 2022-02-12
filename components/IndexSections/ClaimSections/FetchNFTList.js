import React, {Component} from 'react';
import {Tab,Card,Button,Message,Container} from 'semantic-ui-react';
import LittleTraveler from '../../../ethereum/build/LittleTraveler.sol.json';
import styles from "../../../styles/components/claimSections/FetchNFTList.module.scss";

class FetchNFTList extends Component{
  constructor(props){
    super(props);

  }
  async componentDidMount(){
    var chain = this.props.state.web3Settings.chains
      .filter(chain => chain.id === this.props.state.web3Settings.networkId)[0];
      this.setState({opensea:chain.opensea, baseUrl:chain.baseUrl, openseaCard:chain.openseaCard + this.props.state.web3Settings.contractAddress + "/"});
    await this.fetchNFTList();
  }
  state ={
    all:[],
    loading:0,
    errorMessage:"",
    index: 0,
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
        this.setState({errorMessage: error.message});
        console.log(error);
      })

      if (!!this.state.errorMessage){
        this.setState({loading:this.state.loading-1});
        return;
      }
      //TODO check su errorMessage e saltare tutto se c'è un errore
      var all = [];
  //    for (let index = lastUserIndex -1; index >= 0; index--){
      for (var index = 0; index < lastUserIndex; index++){
        let tokenId = await instance.methods.tokenOfOwnerByIndex(accounts[0],index).call()
        .then((result) =>{
          //console.log(result);
          return result;
        })
        .catch((error)=>{
          this.setState({errorMessage: error.message});
          console.log(error);
        });

        if (!!this.state.errorMessage){
          this.setState({loading:this.state.loading-1});
          return;
        }

        var element = {"key":index, "header": tokenId, "image":this.state.baseUrl + tokenId + '.png'};

        all.push(element);

        this.setState({all:all});
      }
    }catch(err){
      this.setState({errorMessage: err.message});
    }
    this.setState({loading:this.state.loading-1});

    console.log(this.state.all);
  }

render(){

  return (
    <Tab.Pane attached={false} >
      <div style={{padding:"15px"}}>

        {!!this.state.errorMessage ? <Message header="Oops!" content = {this.state.errorMessage} /> : ""}
        {
          //<Button  loading = {this.state.loading > 0} primary onClick = {this.fetchNFTList}  >Refresh</Button>
        }
        <a target ="_blank" href={this.state.opensea}>
          <Button  loading = {this.state.loading > 0} primary >Check on Opensea</Button>
        </a>
        { /*
        <Container>
        <Card.Group className="py-5" doubling={true} itemsPerRow={6} centered items={this.state.all} />
        </Container>
*/
}
        <div className={`${styles.image__container}`}>
            {
                this.state.all.map(el =>(
                    <div className={`${styles.image}`} key={el.key}>
                    {(el.key <= this.state.index)
                      ?(
                        <div>
                          <a target = "_blank" href={this.state.openseaCard + el.header}>
                            <img
                              src = {el.image}
                              loading = "lazy"
                              onLoad ={() => {
                                this.setState({index:el.key+1});
                              }}
                              onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/meta.png";
                                this.setState({index:el.key+1});
                              }}
                            />
                          </a>
                          <h2>#{el.header}</h2>
                        </div>
                      )
                    : null
                    }
                    </div>
                ))
            }
        </div>

      </div>
    </Tab.Pane>
  )
};
};
export default FetchNFTList;
