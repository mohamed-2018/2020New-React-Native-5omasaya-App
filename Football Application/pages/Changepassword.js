import React, { Component } from 'react'
import {Text,Alert} from 'react-native';
import * as firebase from "firebase";
import { Container, Content, Form, Item, Input, Label,Button } from 'native-base';

export default class Changepassword extends Component {  
  constructor(props){
    super(props);
  this.state={
    password:'',
    Newpassword:''
  }
  }
  update(){
    const { password, Newpassword } = this.state;
    if(password===Newpassword)
    {
      var user = firebase.auth().currentUser;
      user.updatePassword(Newpassword).then(function() {
        // Update successful.
        Alert.alert("fireChange");
      }).catch(function(error) {
        // An error happened.
        Alert.alert("fireError"+error);


      });
    }
    else{
      Alert.alert("wrong Password");
    }
  }
  render() {
    return (
      <Container>
      <Content style={{padding:30}}>
        <Form>
          <Item stackedLabel>
            <Label>New Password</Label>
            <Input secureTextEntry={true} onChangeText={(password) => this.setState({ password })} />
          </Item>
          <Item stackedLabel last>
            <Label>Re-Enter Password</Label>
            <Input  secureTextEntry={true} onChangeText={(Newpassword) => this.setState({ Newpassword })}/>
          </Item>
          <Button block danger onPress={()=>{this.update()}}><Text style={{color: 'white', fontSize: 16, textAlign: 'center', fontWeight: 'bold'}}>Update</Text></Button>
        </Form>
      </Content>
    </Container>
    )
  }
}
