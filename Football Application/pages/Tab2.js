import React, { Component } from 'react';
import {Alert} from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button,View } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class Tab2 extends Component {
  state={
    counter:0,
    i:0,
    key:""
  }
  componentWillMount(){
    this.setState({
      counter:this.props.joinedGames.counter
    })
  }
  cancelGame(){
    
    firebase.database().ref("Session/"+this.props.joinedGames.sessionId+"/players").once('value').then((snapshot)=>{
      snapshot.forEach((doc)=>{
        var player = doc.key
        
        if(player==this.props.joinedGames.currentUser){
          firebase.database().ref("Session/"+this.props.joinedGames.sessionId+"/players/"
          +this.props.joinedGames.currentUser).remove();
          this.setState({
            key:player
          })
        }
      })  
    }).then(()=>{
      
      this.setState({
        counter:this.state.counter-1,
        i:1,
        //refresh: !!this.state.refresh
        //i:1
      })
      //alert(this.state.refresh)
      firebase.database().ref("Session/"+this.props.joinedGames.sessionId).update({
        counter:this.state.counter
      })
    }).then(()=>{Actions.Sessions();})
  }
  out() {
    Alert.alert(
      'Cancel',
      'Are you sure?',
      [
        {text: 'yes', onPress: () => this.cancelGame()},
        {
          text: 'Cancel',
          // onPress: () => Actions.pop(),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }


  render() {
    return (
      
        <View>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri:this.props.joinedGames.pic}} />
              </Left>
              <Body>
                <Text>{this.props.joinedGames.time} / {this.props.joinedGames.date}</Text>
                <Text note numberOfLines={1}>{this.props.joinedGames.location} - {this.props.joinedGames.description}</Text>
              </Body>
              <Right>
                <Button transparent onPress={()=>{this.out()}}>
                  <Text style={{color:'red'}}>Cancel</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
      </View>

      
      
    );
  }
}
