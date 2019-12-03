import React, { Component } from 'react';
import { Text, Image } from 'react-native';
import {  Input, Label, Button, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";

export default class Forgetpassword extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
    };
  }
reset()
{
  const {email} = this.state;
  var auth = firebase.auth();
 var emailAddress = email;

 auth.sendPasswordResetEmail(emailAddress).then(function() {
  
 }).catch(function(error) {
  
 });
}
  render() {
    return (
      <View style={{padding:20}} >
        <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Image style={{ width: 150, height: 150 }} source={require('../Img/16.png')} />
        </View>

        <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 25 }}>Forget Your password?</Text>
        </View>

        <View style={{ alignContent: 'center', alignItems: 'center', marginTop: 30 }}>
          <Text style={{ fontSize: 15 }}>Please enter the email addresss associated</Text>
          <Text style={{ fontSize: 15 }}>with your email. We will email you</Text>
          <Text style={{ fontSize: 15 }}>a link to reset your password</Text>
          </View>

          <View style={{marginTop:60}}>
            <Label>Email</Label>
            <Input autoCompleteType={"email"} keyboardType={'email-address'} placeholder={'Enter Your Email'}  onChangeText={(email) => this.setState({ email })} />
            <View>
              <Button style={{ marginTop: 20, borderRadius: 5, height: 60 }}
                danger block onPress={() => { this.reset() }}>
                <Text style={{ color: 'white', fontSize: 16, textAlign:'right', fontWeight: 'bold' }}>Send</Text>
              </Button>
            </View>
            </View>
      </View>
    );
  }
}


