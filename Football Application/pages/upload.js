import React, { Component } from 'react';
import { View, TouchableOpacity, Image, ActivityIndicator, TextInput,Alert } from 'react-native';
import { Text, Item, Input, Container, Content, Button, Form, Label,Spinner,Picker,Icon   } from 'native-base';
import * as firebase from "firebase";
import RNFetchBlob from 'react-native-fetch-blob';
var ImagePicker = require('react-native-image-picker');
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import TabFooter from '../Component/TabFooter';
import {ToastAndroid} from 'react-native';
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
export default class Upload extends Component {
  // state = {
  // }
  constructor(props) {

    super(props)
    this.state = {

      location: '',
      description: '',
      //capacity: '',
      phone: '',
      time: '',
      //period: '',
      date: '',
      price: '',
      picurl: '',
      players:'',
      counter:0,
      i: 1,
      selected2: 'Mahatet_El-Raml',
      avatarSource: ''
    }
  }
  CheckConfirm() {
    const { location, description, phone, time, date, price,avatarSource } = this.state;
    if((phone=='')||(location=='')||(description=='')||(time=='')||(date=='')||(price=='')||(avatarSource=='')){
      ToastAndroid.showWithGravity(
        'please complete all required fields',
        ToastAndroid.SHORT,
        ToastAndroid.CENTER,
      );
    }
    else{
    Alert.alert(
      'Add Session',
      'Are you sure?',
      [
        {text: 'yes', onPress: () => this.Confirm()},
        {
          text: 'Cancel',
          // onPress: () => Actions.pop(),
          style: 'cancel',
        },
      ],
      {cancelable: false},
    );
  }}
  Confirm() {
    const { location, description, phone, time, date, price,counter } = this.state;
    var picurl = this.state.avatarSource;
    var userId = firebase.auth().currentUser.uid;
    var sessionId=firebase.database().ref('Session/').push().key;
    firebase.database().ref("Session/"+sessionId).set(
      {
        location,
        description,
       // capacity,
        phone,
        time,
        //period,
        date,
        price,
        counter,
        userId,
        picurl,
  
      })
    // .then((data)=>{
    //   firebase.database().ref("Session/"+sessionId+"/players").set({
    //     1:userId
    //   })
    // })
    .then((data) => {
      //success callback
      this.setState({ i: 2 })
      Actions.Home();
      console.log('data ', data)
    }).catch((error) => {
      //error callback
      console.log('error ', error)
    })
  
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
          .then(url => this.setState({ avatarSource: url }))
          .catch(error => console.log(error))
      }
    });
  }
  onValueChange2(value:string) {
    this.setState({
      selected2: value,
      location: value
    });
  }
  render() {
    return (
      <Container>
        <Content>
          <Form style={{ padding: 20 }}>
          <Item  style={{ borderColor: "red" }} picker>
              <Picker 
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your Location"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selected2}
                onValueChange={this.onValueChange2.bind(this)}
              >
                <Picker.Item label="Mahatet_El-Raml" value="Mahatet_El-Raml" />
                <Picker.Item label="Roshdy" value="Roshdy" />
                <Picker.Item label="Smouha" value="Smouha" />
                <Picker.Item label="Sporting" value="Sporting" />
                <Picker.Item label="Sidy_Gaber" value="Sidy_Gaber" />
              </Picker>
            </Item>

            {/* <Item stackedLabel style={{ borderColor: "red" }}><Label>Location</Label>
              <Input onChangeText={(location) => { this.setState({ location: location }); }} />
            </Item> */}
            <Item stackedLabel style={{ borderColor: "red" }}><Label>Description</Label>
              <Input onChangeText={(description) => { this.setState({ description: description }); }} />
            </Item>
            {/* <Item stackedLabel style={{ borderColor: "red" }}><Label>capacity</Label>
              <Input keyboardType={"number-pad"} maxLength={2} onChangeText={(capacity) => { this.setState({ capacity: capacity }); }} />
            </Item> */}
            <Item stackedLabel style={{ borderColor: "red" }}><Label>phone</Label>
              <Input maxLength={11} keyboardType={"number-pad"} onChangeText={(phone) => { this.setState({ phone: phone }); }} />
            </Item>
            <View style={{ marginTop: 30, borderColor: "red", flexDirection: "row" ,justifyContent:"center"}}>
              <DatePicker style={{ width: "40%", borderColor: "red" }} date={this.state.time}
                mode="time" format="HH:mm" confirmBtnText="Confirm"
                cancelBtnText="Cancel" minuteInterval={10}
                placeholder="Please select time"
                onDateChange={(time) => { this.setState({ time: time }); }}
               customStyles={{
                 dateIcon: { display:'none' }}}
              />
              <Icon type='MaterialIcons' name='access-time' style={{padding:5,color:'#D9534F'}}></Icon>
              <DatePicker
                style={{ borderColor: "red", width: "50%" }} date={this.state.date} mode="date"
                placeholder="Please select date" format="YYYY-MM-DD"
                minDate="2019-05-01" maxDate="2039-06-01"
                onDateChange={(date) => { this.setState({ date: date }); }}
                confirmBtnText="Confirm" cancelBtnText="Cancel"
              // customStyles={{
              //   dateIcon: {
              //     position: 'absolute', left: 0, top: 4,
              //     marginLeft: 0, width: 0, height: 0
              //   }, dateInput: {
              //     marginLeft: 0
              //   }
              // }}
              />
            </View>
            {/* <Item stackedLabel style={{ borderColor: "red" }}><Label>period</Label>
              <Input onChangeText={(period) => { this.setState({ period: period }); }} />
            </Item> */}
            <Item stackedLabel style={{ borderColor: "red" }}><Label>price</Label>
              <Input  maxLength={3} keyboardType={"number-pad"} onChangeText={(price) => { this.setState({ price: price }) }} />
            </Item>
            <View style={{ alignContent: "center", alignItems: "center" }}>
              {this.uploadImage()}
              {/* <Text> {this.state.avatarSource} </Text> */}
            </View>
            <View style={{ justifyContent: "space-between", flexDirection: "row", alignItems: "center" }}>
              <Button onPress={()=>{Actions.pop()}} style={{ borderRadius: 20 }} warning><Text> Cancel </Text></Button>
              <TouchableOpacity style={{ alignContent: "center", justifyContent: "center" }} onPress={() => { this.pickImage() }}>
                <Image style={{ width: 50, height: 50, alignItems: "center" }} source={require('../Img/camera.png')}></Image>
              </TouchableOpacity>
              <Button style={{ borderRadius: 20 }} danger onPress={() => { this.CheckConfirm() }}><Text>Confirm</Text></Button>
            </View>
          </Form>
        </Content>
        <TabFooter></TabFooter>
      </Container>
    );
  }

  uploadImage() {

    if (this.state.i == 1) {
      return <Image style={{ height: 100, width: '100%', marginTop: 10, marginBottom: 20 }} source={require('../Img/2.jpg')}></Image>
    }
    else if (this.state.i == 2) {
      return <Image style={{ height: 100, width: '100%', marginTop: 10, marginBottom: 20 }} source={{ uri: this.state.avatarSource }}></Image>
    }
  }
}




