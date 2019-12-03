import React, { Component } from 'react';
import { Container, Content, List, ListItem, Left, Body, Right, Thumbnail, Text } from 'native-base';
import TabFooter from '../Component/TabFooter';
import { Actions } from 'react-native-router-flux';
//import NotificationPopup from 'react-native-push-notification-popup';
export default class Locations extends Component {
  
  constructor(props) {
    super(props);
  this.state={
    location:' '
  }
  }
  /*Notification(){
    this.popup.show({
              onPress: function() {console.log('Pressed')},
            appIconSource: require('../Img/2.jpg'),
            appTitle: '5omasya',
            timeText: 'Now',
            title: 'Hello World',
            body: 'This is a sample message.\nTesting emoji 😀',
            slideOutTime: 5000
        });
}*/
  render() {
    return (
      <Container>
      <Content>
        <List>
          <ListItem avatar onPress={()=>{Actions.Sessions()}}>
            <Left>
              <Thumbnail  source={require('../Img/1.png')} />
            </Left>
            <Body>
              <Text note>Mahatet_El-Raml</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem avatar /*onPress={()=>{this.Notification()}}*/>
          {/* <NotificationPopup ref={ref => this.popup = ref} /> */}
            <Left>
              <Thumbnail  source={require('../Img/1.png')} />
            </Left>
            <Body>
              <Text note>Roshdy</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail  source={require('../Img/1.png')} />
            </Left>
            <Body>
              <Text note>Smouha</Text>
            </Body>
            <Right>
              
            </Right>
          </ListItem><ListItem avatar>
            <Left>
              <Thumbnail  source={require('../Img/1.png')} />
            </Left>
            <Body>
         
              <Text note>Sporting</Text>
            </Body>
            <Right>
            </Right>
          </ListItem>
          <ListItem avatar>
            <Left>
              <Thumbnail  source={require('../Img/1.png')} />
            </Left>
            <Body>
            <Text note>Sidy_Gaber</Text>
            
            </Body>
            <Right>
            </Right>
          </ListItem>
        </List>
      </Content>
      <TabFooter></TabFooter>
    </Container>
    );
  }
}


