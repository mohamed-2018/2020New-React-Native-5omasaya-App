import React, { Component } from 'react';
// import { AppRegistry, StyleSheet ,View } from 'react-native';
 import { Container, Header, Title, Content, Button, Icon, Left, Body, Text,Right } from 'native-base'; 
import { Actions } from 'react-native-router-flux';
 export default class MainHeader extends Component 
 
 { render()
  { return (
    
    <Header>
      <Left>
        <Button transparent onPress={()=>{Actions.pop()}}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body style={{alignItems:'auto',paddingStart:58}}>
        <Title style={{fontSize: 20,}}>Settings</Title>
      </Body>
      <Right>
        <Button disabled transparent>
        </Button>
      </Right>
    </Header>

  
);
}
}