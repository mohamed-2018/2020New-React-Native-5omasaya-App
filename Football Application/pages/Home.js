import React, { Component } from 'react';
import { Text, Image,Dimensions,TouchableHighlight,TouchableWithoutFeedback,TouchableOpacity,ImageBackground,Animated,Easing } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Icon, View } from 'native-base';
import { Actions } from 'react-native-router-flux';
import TabFooter from '../Component/TabFooter';
export default class Home extends Component {
  constructor(props) {
    super(props);
 this.state={
  spinAnim: new Animated.Value(x=0,y=0,z=0)
 }
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
  render() {
    let screenWidth=Dimensions.get('window').width;
    const spin = this.state.spinAnim.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    return (
     
        
    
    <View>
     
   <ImageBackground style={{width:'100%',height:'99.6%'}} source={require('../Img/s.jpg')}>
     <View style={{alignItems:'center',alignSelf:'center',flexDirection:'row',flex:8,paddingTop:'30%'}}>
   <Animated.Image style={{height:100,width:100,transform: [{rotate: spin}]}} source={require('../Img/5.png')}></Animated.Image>
     </View>
     <View style={{flex:1}}>
     <TabFooter></TabFooter>
     </View>
   </ImageBackground>
 
    </View>
    );
  }
}


