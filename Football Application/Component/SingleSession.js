import React, {Component} from 'react';
import {StyleSheet,View,Image,TouchableWithoutFeedback} from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right } from 'native-base';
import { Actions } from 'react-native-router-flux';
export default class SingleSession extends Component {
  constructor(props) {
    super(props);
  
    //alert(JSON.stringify(props.listData) )
    //alert(JSON.stringify(props.listData.userInfo.profile_picture.uri))
   //alert(JSON.stringify(props.listData.pic));
  }
render(){
return(
      <View>
         <TouchableWithoutFeedback onPress={()=>{
           Actions.Details({
             data:this.props.listData
            })}} >
      <Card>
     
            <CardItem >
              <Left>
                {/* <Thumbnail source={require('../Img/15.png')} /> */}
                <Thumbnail source={{uri :this.props.listData.userInfo.profile_picture}} />
                <Body>
                  <Text>{this.props.listData.userInfo.username}</Text>
                  <Text note>{this.props.listData.location}</Text>
                </Body>
              </Left>
            </CardItem>
          
            <CardItem cardBody>
              <Image source={{uri:this.props.listData.pic}} style={{height: 200, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent>
                  <Icon active  style={{color:'green'}} type="AntDesign" name="addusergroup" />
                  <Text style={{color:'green'}}>{this.props.listData.counter}/15</Text>
                </Button>
              </Left>
              <Body>
                
              </Body>
              <Right>
              <Button transparent>
                  <Icon active style={{color:'orange'}} type="EvilIcons" name="star" />
                  <Text style={{color:'orange',fontSize:15}}>4</Text>
                </Button>
              </Right>
            </CardItem>
      </Card>
      </TouchableWithoutFeedback>
     
      </View>
      
    


     
    
   

);
}
}




