import React, { Component } from 'react';
import { Text, Image, Dimensions,Alert } from 'react-native';
import { Container, Content, Icon, List, ListItem, Left, Right, Footer } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage } from 'react-native';
import * as firebase from "firebase";
import TabFooter from '../Component/TabFooter';
import MainHeader from '../Component/MainHeader';
export default class Settings extends Component {
  constructor(props) {
    super(props);

  }

  
  out() {
    Alert.alert(
      'Logout',
      'Are you sure?',
      [
        {text: 'yes', onPress: () => this.confirmed()},
        {
          text: 'Cancel',
          // onPress: () => Actions.pop(),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }
  confirmed(){
    firebase.auth().signOut().then(function() {
      // Sign-out successful.
    AsyncStorage.clear();
    Actions.Login();
    }).catch(function(error) {
      // An error happened.
    });
  }
  render() {

    return (
      <Container>
        <MainHeader></MainHeader>
        <Content >
          <List>
            <ListItem noIndent style={{ backgroundColor: "#F6F6F6" }}>
              <Left>
                <Text>Account</Text>
              </Left>
            </ListItem>
            <ListItem onPress={()=>{Actions.Editprofile()}}>
              <Left>
                <Text>Edit Profile</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={()=>{Actions.Changepassword()}}>
              <Left>
                <Text>Change Password</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem noIndent style={{ backgroundColor: "#F6F6F6" }}>
              <Left>
                <Text>Other</Text>
              </Left>
            </ListItem>
            <ListItem onPress={()=>{Actions.Privacy()}}>
              <Left>
                <Text>Privacy Policy</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={()=>{Actions.Contactus()}}>
              <Left>
                <Text>Contact Us</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={()=>{Actions.About();}}>
              <Left>
                <Text>About App</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem onPress={() => { this.out() }}>
              <Left>
                <Text>Logout</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          </List>
        </Content>
        <TabFooter></TabFooter>
      </Container>
    );
  }
}


