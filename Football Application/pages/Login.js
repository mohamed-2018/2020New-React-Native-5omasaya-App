import React, { Component } from 'react';
import { StyleSheet, Text, Alert, Image,Animated, Easing } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Icon, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";
import {ToastAndroid} from 'react-native';

//import {firebaseConfig} from '../Config';
import {AsyncStorage} from 'react-native';
const firebaseConfig = {
  apiKey: "AIzaSyAgK_fMqjcl1S2mmMDwF6WtDYQmRwOsU2c",
  authDomain: "reactapp-8d948.firebaseapp.com",
  databaseURL: "https://reactapp-8d948.firebaseio.com",
  projectId: "reactapp-8d948",
  storageBucket: "reactapp-8d948.appspot.com",
  messagingSenderId: "473003135732",
  appId: "1:473003135732:web:aedbbcb2432c0c82"
};
 firebase.initializeApp(firebaseConfig);

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      password: '',
      spinAnim: new Animated.Value(0)
    };
  }
  componentDidMount(){
    Animated.loop(Animated.timing(
       this.state.spinAnim,
     {
       toValue: 1,
       duration: 4000,
       easing: Easing.linear,
       useNativeDriver: true
     }
   )).start();
    }
  Onlogin() {
    const { Email, password } = this.state;

   // Alert.alert('userData', `${Email} + ${password}`);
    firebase.auth().signInWithEmailAndPassword(Email, password).then((res)=>{
      let  user={
        Demail:Email,
        Dpass:password
      }
      if(res){
        AsyncStorage.setItem('userD', JSON.stringify(user), () => {
         //     Alert.alert(result);
        });
   //     Alert.alert("done");
        Actions.Home();
      }
    })
    .catch(function(error) {
      // Handle Errors here.
      // var errorCode = error.code;
      // var errorMessage = error.message;
      // ...
     
    });
   // Actions.Home();
  }
  toast(){
ToastAndroid.showWithGravity(
  'Will be Available Soon',
  ToastAndroid.SHORT,
  ToastAndroid.CENTER,
);
  }
  render() {
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
      <Container style={{ padding: 5 }}>
        <Content>
          <Form style={{ flex: 1 }}>
            <View style={{justifyContent:"center",alignItems:"center"}}>
            <Animated.Image style={{ width: 150,marginTop:20,height: 150,transform: [{rotate: spin}]}} source={require('../Img/1.png')}></Animated.Image>
            </View>

            <Item stackedLabel style={{marginTop:25}}>
              <Label>Email</Label>
              <Input value={this.state.Email} autoCompleteType={"email"} keyboardType={'email-address'} onChangeText={(Email) => this.setState({ Email })}
                                             placeholder={'Enter Your Email'} />
            </Item>

            <Item stackedLabel last>
              <Label>Password</Label>
              <Input value={this.state.password} maxLength={16}  onChangeText={(password) => this.setState({ password })}
                                                 secureTextEntry={true} placeholder={'Enter Your password'} />
            </Item>
            <Label style={{ textAlign: 'right',marginTop:10 }} onPress={() => { Actions.Forgetpassword() }}>Forget Password?</Label>
            <Button style={{ marginTop: 10, borderRadius: 5, height: 60 }} danger block onPress={() => { this.Onlogin() }}>
              <Text style={{ color: 'white', fontSize: 16,textAlign:'right',fontWeight:'bold' }}>Login</Text></Button>
            <Button style={{ marginTop: 10, borderRadius: 5, height: 60 }} primary block onPress={()=>{this.toast()}}>
              <Text style={{ color: 'white',textAlign:'right',fontWeight:'bold',fontSize:16 }}>Login With Facebook</Text>
                          <Icon name='logo-facebook' /></Button>
            <Label style={{ textAlign: 'center', paddingTop: 20, color: '#707070' }}>You don't have any account?
            <Text style={{ color: '#F58524' }}  onPress={() => { Actions.Register() }} >Register</Text></Label>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
