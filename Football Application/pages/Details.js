import React, { Component } from 'react';
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import * as firebase from "firebase";
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
import call from 'react-native-phone-call'
export default class Details extends Component {
  state = {
    obj: {},
    counter: 0,
    user: "",
    i: 1,

  }
  componentWillMount() {
    this.isPresent()


  }
  constructor(props) {
    super(props);
    // alert(JSON.stringify( this.props.data.sessionId));

  }
  isPresent() {
    firebase.database().ref("Session/" + this.props.data.sessionId).once('value').then((snap) => {
      var counter = snap.toJSON().counter
      this.setState({
        counter: counter,
        user: firebase.auth().currentUser.uid
      })

    })
      .then(() => {
        firebase.database().ref("Session/" + this.props.data.sessionId + "/players").once('value').then((snapshot) => {

          snapshot.forEach((doc) => {
            var player = doc.key

            if (player == this.state.user) {
              //alert(player+" / "+this.state.user)
              this.setState({
                i: 2
              })

            }
          })

        })

      })


  }
  joinGame() {
    this.setState({
      user: firebase.auth().currentUser.uid
    })
    // var obj={}
    firebase.database().ref("Session/" + this.props.data.sessionId).once('value').then((snapshot) => {
      this.state.counter = snapshot.toJSON().counter;
      this.setState({
        counter: this.state.counter + 1
      })

      // alert(counter)
    })
      .then(() => {
        firebase.database().ref("Session/" + this.props.data.sessionId + "/players")
          .once('value').then((doc) => {
            this.setState({
              obj: doc
            })
          })
      }).then(() => {
        // alert(JSON.stringify(this.state.obj))
        firebase.database().ref("Session/" + this.props.data.sessionId + "/players").update({
          //[this.state.counter]:this.state.user
          [this.state.user]: true
        })
      }).then(() => {
        firebase.database().ref("Session/" + this.props.data.sessionId).update({
          counter: this.state.counter
        })
      }).then(() => {
        
        this.setState({
          i: 2
        })
        Actions.Home();
      })
  }
  cancelGame() {
    firebase.database().ref("Session/" + this.props.data.sessionId + "/players").once('value').then((snapshot) => {
      snapshot.forEach((doc) => {
        var player = doc.key
        //var key = doc.key
        if (player == this.state.user) {
          firebase.database().ref("Session/" + this.props.data.sessionId + "/players/" + player).remove()
        }
      })
    }).then(() => {
      this.setState({
        counter: this.state.counter - 1,
        i: 1
      })
      firebase.database().ref("Session/" + this.props.data.sessionId).update({
        counter: this.state.counter
      }).then(()=>{
        Actions.Home();
      })
    })
  }
  uploadButton() {

    if (this.state.i == 2) {
      return <Button style={{ marginTop: 80, borderRadius: 5, height: 60 }} danger block
        onPress={() => {
          this.cancelGame()
          //Actions.Confirm()
        }}>
        <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>Cancel</Text>
        <Icon name='futbol-o' type="FontAwesome" /></Button>
    }
    else if (this.state.i == 1) {
      return <Button style={{ marginTop: 60, borderRadius: 5, height: 60 }} danger block
        onPress={() => {
          //this.isPresent()
          this.joinGame()
          //Actions.Confirm()
        }}>
        <Text style={{ color: 'white', textAlign: 'right', fontWeight: 'bold', fontSize: 16 }}>JOIN</Text> 
        <Icon name='futbol-o' type="FontAwesome" /></Button>
    }
  }

  call = () => {
    //handler to make a call
    const args = {
      number: this.props.data.phone,
      prompt: false,
    };
    call(args).catch(console.error);
  };


  render() {
    return (
      <View style={{ padding: 10 }}>
        <Card >
          <CardItem>
            <Left>
              <Thumbnail source={{ uri: this.props.data.userInfo.profile_picture }} />
              <Body>
                <Text>{this.props.data.userInfo.username}</Text>
                <Text note>{this.props.data.location}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image source={{ uri: this.props.data.pic }} style={{ height: 200, padding: 5, flex: 1 }} />
          </CardItem>
          <CardItem>
            <Body>
              <TouchableOpacity onPress={this.call} >
                <Icon active style={{ color: 'lightgreen', fontSize: 30 }} type="Ionicons" name="md-phone-portrait" >
                  <Text>  {this.props.data.phone}</Text>
                </Icon>
              </TouchableOpacity>
            </Body>
            <Right>
              <Text style={{ margin: 3, fontSize: 16, color: 'lightgreen' }}>Price: <Text style={{color:'black'}}>  {this.props.data.price} EGP</Text></Text>
            </Right>
          </CardItem>
          <CardItem style={{ borderTop: '1px slid' }} >
            <Text style={{ color: 'lightgreen' }}> Description:</Text>
          </CardItem>
          <CardItem>
            <Text style={{ textAlign: "center" }}>   {this.props.data.description}</Text>
          </CardItem>
        </Card>
        <View>
        {this.uploadButton()}
        </View>
        {/* <Button style={{ marginTop: 80, borderRadius: 5, height: 60 }} danger block
onPress={()=>{
this.isPresent()
//   this.joinGame()
Actions.Confirm()
}}>
<Text style={{ color: 'white',textAlign:'right',fontWeight:'bold',fontSize:16 }}>I want to Play</Text>
<Icon name='futbol-o' type="FontAwesome" /></Button> */}


      </View>


    );
  }
}




