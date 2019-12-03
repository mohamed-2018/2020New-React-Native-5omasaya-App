import React, { Component } from 'react'
import {Alert,FlatList} from 'react-native';
import * as firebase from "firebase";
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail,Text } from 'native-base';
import SingleSession from '../Component/SingleSession';
import flatlistData from '../Data/FlatListData';
//import console = require('console');
import TabFooter from '../Component/TabFooter';

 
export default class Sessions extends Component {
  state={
    name:"",
    session:[],
    user:{}
  }

  componentWillMount(){
    
    firebase.database().ref('Session').on('value',(childSnapshot)=>{
      var mysec=[];
      //alert(JSON.stringify(childSnapshot) )
      
     
     childSnapshot.forEach((doc)=>{
        
      var userid=doc.toJSON().userId;
      //var userInfo;
       //alert(JSON.stringify(doc.key) )
        firebase.database().ref("Users/"+userid).once('value').then((snapshot)=>{
          this.setState({
            user:snapshot.toJSON()
          })
        })
        .then(()=>{
          mysec.push({
            counter:doc.toJSON().counter,
            date:doc.toJSON().date,
            description:doc.toJSON().description,
            location:doc.toJSON().location,
            phone:doc.toJSON().phone,
            pic:doc.toJSON().picurl,
            price:doc.toJSON().price,
            time:doc.toJSON().time,
            userId:doc.toJSON().userId,
            userInfo:this.state.user,
            sessionId:doc.key
            
        })}) 
        .then(()=>{
          this.setState({
            session:mysec
          })
        })
        // .then(()=>{
        //   alert(JSON.stringify(this.state.session));
        // })
           
           //alert(JSON.stringify(this.state.session) )

          
     });
     
    });
  }
    
  constructor(props){
    super(props);
   
   
  }
  _renderItem = ({item}) =>(
    <SingleSession listData={item}></SingleSession>
  );
  render() {
    return (
      <Container>
      <Content>
      
        <FlatList
        data={this.state.session}
        extraData={this.state.name}
        //keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}/>
     
      </Content>
      <TabFooter></TabFooter>
      </Container>
    )
  }
}


