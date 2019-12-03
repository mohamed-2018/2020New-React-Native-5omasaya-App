import React, { Component } from 'react';
import { StyleSheet, Text,TextInput, Alert, Image } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Icon, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";
import {AsyncStorage} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFetchBlob from 'react-native-fetch-blob';
const storage = firebase.storage();
const Blob = RNFetchBlob.polyfill.Blob;
const fs = RNFetchBlob.fs;
window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
window.Blob = Blob;
var options = {
  title: 'Select Avatar',
  // customButtons:[{name:'fb' ,title:'Choose photo from facebook'},],
  storageOptions: { skipbackup: 'True', path: 'images' }
};

// var database = firebase.database();
// var storage = firebase.storage();
const uploadImage = (uri, mime = 'img/jpg') => {

  return new Promise((resolve, reject) => {

    const uploadUri = uri;
    const sessionId = new Date().getTime();
    let uploadBlob = null;
    const imageRef = storage.ref('images').child(`${sessionId}.jpg`);
    fs.readFile(uploadUri, 'base64')
      .then((data) => {
        return Blob.build(data, { type: `${mime};BASE64` });
      })
      .then((blob) => {
        uploadBlob = blob
        return imageRef.put(blob, { contentType: mime })
      })
      .then(() => {
        uploadBlob.close()
        return imageRef.getDownloadURL()
      })
      .then((url) => {
        resolve(url)

      })
      .catch((error) => {
        reject(error)
      })
  })
}
export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: '',
      password: '',
      mobile: '',
      mobileValidate:true,
      name: '',
      avatarSource:require('../Img/15.png'),
      avatarSourceValidate:true,
      nameValidate:true,
      passwordValidate:true,
      EmailValidate:true,
      i: 1
    };

  }
  
  
  errorMsg(text,type)
{
   if(!this.state.nameValidate)
   {
      alert("username doesn't end by space ");

   }
    else if(!this.state.passwordValidate)
   {
    alert("password must consist of \n from 8 to 16 characters ");

   }
   else if(!this.state.EmailValidate)
   {
    alert("Email must be like this: mysite@ourearth.com or like this: mysite@you.me.net");

   }
    else if(!this.state.mobileValidate)
   {
    alert("Your Phone Number must consist of 11 digits");

   }
   
}
 
validate(text,type)
{
if(type=='username')
{
    if(alpha.test(text))
    {
        this.setState({
             nameValidate:true,
             name:text,
        })
    }
    else
    {
          this.setState({
            nameValidate:false,
        })
    }
}
else if(type=='password')
{
    if(num.test(text))
    {
        this.setState({
            passwordValidate:true,
            password:text,
        })
    }
    else
    { 
         this.setState({
            passwordValidate:false,
        })
    }
    
}
else if(type=='mobile')
{
    if(phoneno.test(text))
    {
        this.setState({
            mobileValidate:true,
            mobile:text,
        })
    }
    else
    { 
         this.setState({
            mobileValidate:false,
        })
    }
    
}
else if(type=='Email')
{
    if(emailvaild.test(text))
    {
        this.setState({
            EmailValidate:true,
            Email:text,
        })
    }
    else
    { 
         this.setState({
            EmailValidate:false,
        })
    }
    
}

}
  onRegister() {
    if(this.state.i==1){
      alert('you should select an image')
    }
    
    else{
    const { name, Email, password, avatarSource,mobile } = this.state;
    let  user={
      Dname:name,
      Demail:Email,
      Dpass:password,
      DImg:avatarSource
    }
    var promise =new Promise((resolve,reject)=>{
      firebase.auth().createUserWithEmailAndPassword(Email, password).then((res)=>{
        this.setState({ i: 2 })
        var newPostKey = firebase.database().ref().child('Users').push().key;
        var user = firebase.auth().currentUser.uid;
          firebase.database().ref('Users/'+user).set({
            username: name,
            email: Email,
            profile_picture : avatarSource,
            userpassword:password,
            userkey:newPostKey,
            usermobile:mobile
          });
         
        if(res){
          AsyncStorage.setItem('userD', JSON.stringify(user), () => {
          AsyncStorage.getItem('userD', (err, result) => {
                console.log(result);
         //       Alert.alert(result);
            });
          });
        //  Alert.alert("done");
          Actions.Home();
        }
      })
      .catch(function(error) {
        Alert.alert("error"+error);
      });
    })
   
  //  Alert.alert('userData', `${name}+${Email} + ${password} ${confirmPassword}`);
  //  console.log(name);
  }
}
  pickImage() {
    // Alert.alert('clicked');
    ImagePicker.showImagePicker(options, (response) => {
      this.setState({ avatarSource: '' })
      if (response.didCancel) {

      } else if (response.error) {

      } else if (response.customButtons) {
      } else {
        uploadImage(response.uri)
        
            .then(this.setState({i:2}))
          .then(url => this.setState({ avatarSource: url }))
          .catch(error => console.log(error))
      }
      
    });
  }
  render() {
    return (
      <Container style={{ padding: 5 }}>
        <Content>
          <Form style={{ flex: 1 }}>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
            {this.uploadImage()}
            
              <Icon style={{color:'#F58524'}} name='edit' type='AntDesign'onPress={()=>{this.pickImage()}} />
            </View>
            <Item stackedLabel>
              <Label>Name</Label>
              <Input  style={[styles.inputStyle,!this.state.nameValidate? styles.error :null]}
                    onChangeText={(text)=>this.validate(text,'username')}
                    onBlur={(text)=>this.errorMsg(text,'username')}
                        placeholder={'Enter your name'} />
              
            </Item>
            <Item stackedLabel>
              <Label>Email</Label>
             <Input autoCompleteType={"email"} keyboardType={'email-address'} style={[styles.inputStyle,!this.state.EmailValidate? styles.error :null]}
                    onChangeText={(text)=>this.validate(text,'Email')}
                    onBlur={(text)=>this.errorMsg(text,'Email')}
                        placeholder={'Enter Your Email'} />
              
            </Item>
            <Item stackedLabel >
              <Label>Password</Label>
              <Input style={[styles.inputStyle,!this.state.passwordValidate? styles.error :null]}
              maxLength={16}  secureTextEntry={true}
               onChangeText={(text)=>this.validate(text,'password')}
                onBlur={(text)=>this.errorMsg(text,'password')}
                placeholder={'Enter Your password'} />
              
            </Item>
            <Item stackedLabel >
              <Label>Mobile Number</Label>
              <Input style={[styles.inputStyle,!this.state.mobileValidate? styles.error :null]}
                keyboardType={'phone-pad'}
               onChangeText={(text)=>this.validate(text,'mobile')}
                onBlur={(text)=>this.errorMsg(text,'mobile')}
                placeholder={'Enter Your Mobile Number'} />
              
            </Item>
            <Button style={{ marginTop: 20, borderRadius: 5, height: 60 }}   danger block onPress={() => { this.onRegister() }}><Text style={{ color: 'white', fontSize: 16, textAlign: 'right', fontWeight: 'bold' }}>Register</Text></Button>
            <Label style={{ textAlign: 'center', paddingTop: 20, color: '#707070' }}>You alerady have an account?
            <Text style={{ color: '#F58524' }} onPress={() => { Actions.Login() }} >Login</Text></Label>
          </Form>
        </Content>
      </Container>
    );
  } 
  uploadImage() {

    if (this.state.i == 1) {
      return  <Image style={{ width: 100, height: 100, alignItems: 'center',borderRadius:50 }} source={this.state.avatarSource}></Image>
    }
    else if (this.state.i == 2) {
      return   <Image style={{ width: 100, height: 100, alignItems: 'center',borderRadius:50 }} source={{uri:this.state.avatarSource}}></Image>
    }
  }
}

const alpha=/^[a-zA-Z]+(\s+[a-zA-Z]+)?$/;
const num  = /^.{8,16}$/;
 const emailvaild=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
 const phoneno = /^\d{11}$/;

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#26AE90',
    flex:1,
    justifyContent:'center',
    paddingLeft:7,
},
inputStyle:{
    backgroundColor:'#fff',
    marginBottom:15,
    fontSize:20,
    paddingLeft:15,
    width:'100%',
},
btnText:{
    backgroundColor:'#ECEEF1',
    paddingBottom:10,
    paddingTop:10,
    fontSize:18,
    marginTop:25,
    color:'#26AE90',
    textAlign:'center',
   fontWeight: 'bold',
},
btnTextSignUp:{
    fontSize:16,
    color:'#fff',
    marginTop:70,
    fontWeight:'bold',
    textAlign:'center',
},
error:{

    borderWidth: 3,
    borderColor: 'red',
},
});
