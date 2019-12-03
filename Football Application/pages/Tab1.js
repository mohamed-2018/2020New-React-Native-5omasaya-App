import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button ,View} from 'native-base';
export default class Tab1 extends Component {
  constructor(props){
    super(props);

    //alert(JSON.stringify(props.myGames))
  }
  
  render() {
    return (
      <View>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri:this.props.myGames.pic}} />
              </Left>
              <Body>
                <Text>{this.props.myGames.time} / {this.props.myGames.date}</Text>
                <Text note numberOfLines={1}>{this.props.myGames.location} - {this.props.myGames.description}</Text>
              </Body>
            </ListItem>
          </List>
          </View>
    );
  }
}
