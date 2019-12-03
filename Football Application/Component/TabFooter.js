import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { Footer, FooterTab, Button, Text,Badge,Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import Home from '../pages/Home';
export default class TabFooter extends Component {
  constructor(props) {
    super(props);
  
  }
render(){
return(
        <Footer >
          <FooterTab style={{backgroundColor:'white'}}>
            <Button  vertical transparent onPress={()=>{Actions.Sessions()}} >
                <Icon name="futbol-o" type="FontAwesome" />
                <Text>Fields</Text>
            </Button>
            {/* <Button vertical transparent onPress={()=>{Actions.Locations()}}>
              <Icon name="location-pin" type="Entypo" />
            </Button> */}
            <Button vertical transparent onPress={()=>{Actions.Upload()}} >
              <Icon active name="pluscircle" type="AntDesign"/>
              <Text>ADD Field</Text>
            </Button>
            <Button  active  transparent onPress={()=>{Actions.History()}}>
            {/* <Badge ><Text>1</Text></Badge> */}
              <Icon  name="history" type="FontAwesome"  />
              <Text>History</Text>

            </Button>
            <Button vertical transparent onPress={()=>{Actions.Settings()}}>
              <Icon name="ios-settings" type="Ionicons" />
              <Text>Settings</Text>

            </Button>
          </FooterTab>
        </Footer>
   

);
}
}

const styles = StyleSheet.create({
  icons:{
    color:"red"
  }
})

