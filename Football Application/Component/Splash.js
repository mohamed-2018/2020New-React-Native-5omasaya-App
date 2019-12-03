import React, { Component } from 'react'
import {AsyncStorage,Text,Image,Dimensions,Alert} from 'react-native';
import { Actions } from 'react-native-router-flux';
import * as firebase from "firebase";
console.disableYellowBox=true;
export default class Splash extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
          Email: '',
          password: '',
        
        };
        setTimeout(()=>{
            AsyncStorage.getItem('userD', (err, result) => {
                if(result!=null)
                {
                //  Alert.alert(result)
                  //var d=JSON.parse(result);
               //   Alert.alert(d.Demail);
                //  Alert.alert(d.Dpass);

                // firebase.auth().signInWithEmailAndPassword(d.Demail, d.Dpass).then((res)=>{
                   Actions.Home();
                // })
                // .catch(function(error) {
                //   // Handle Errors here.
                //   // var errorCode = error.code;
                //   // var errorMessage = error.message;
                //   // ...
                // });
                }
                if(result==null){
                  Actions.Login();
                }
              });
        },1000)
      }
    
    render() {
      let screenWidth=Dimensions.get('window').width;
        return (
            <Image style={{ width:screenWidth ,height:screenWidth*500/1000 ,alignItems: 'center',justifyContent:"center",flex:1}} source={require('../Img/00.png')}></Image>
            
        );
    }
}
