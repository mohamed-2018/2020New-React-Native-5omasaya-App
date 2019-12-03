 import React, { Component } from 'react';
 import {Text,FlatList,Image} from 'react-native';
 import * as firebase from "firebase";
import { View, Container, Card, CardItem, Left, Right, Body,Button,Icon, Content,Thumbnail } from 'native-base';








export default class getdata extends Component {
    
    constructor(props){ 
        super(props);
        this.state=({

            Session:[],
        })
        
    }

    componentDidMount(){

        firebase.database().ref('Session/').on('value',(childSnapshot)=>{
             var mysec=[];
            childSnapshot.forEach((doc)=>{
                mysec.push({
                    date:doc.toJSON().date,
                    phone:doc.toJSON().phone,
                    key:doc.key,
                    pic:doc.toJSON().picurl,
                    filedName:doc.toJSON().filedName,
                });

                this.setState({Session:mysec})

            });

        });



    }



    renderCard=({item})=>{

        return(
            <View>
                <Card>
                    <CardItem>
                            <Left>
                                <Thumbnail source={require('../Img/15.png')} />
                                    <Body>
                                        <Text>{item.key}</Text>
                                        <Text note>GeekyAnts</Text>
                                    </Body>
                            </Left>
                    </CardItem>

                    <CardItem cardBody>
                            <Image source={{uri:item.pic}} style={{height: 150, width: null, flex: 1}}/>

                    </CardItem>

                    <CardItem>
                            <Left>
                                <Text style={{margin:3,fontSize:16,color:'green'}}>{item.date}</Text>
                            </Left>
                            <Body>
                                 <Button transparent>
                                    <Icon active type="EvilIcons" name="star" />
                                    <Text style={{margin:3,fontSize:16,color:'green'}}>{item.phone}</Text>
                                 </Button>
                            </Body>
                            <Right>
                                  <Icon active type="AntDesign" name="addusergroup" />

                            </Right>
                    </CardItem>

                </Card>
            </View>
            
        );


    }


    renderitem=({item})=>{
        return(
            <View style={{flex:1,flexDirection:'row'}}>
            
                <Image source={{uri:item.pic}} style={{height:100,width:150}}/>
                <View style={{flex:1,justifyContent:'center'}}>
                  
                    <Text style={{margin:5,fontSize:18,color:'green'}}>{item.date}</Text>
                    <Text style={{margin:5,fontSize:18,color:'skyblue'}}>{item.key}</Text>
                    <Text style={{margin:5,fontSize:18,color:'green'}}>{item.phone}</Text>


                </View>

            </View>
        )
    }

    renderSeprator =()=>{

    return(
        <View
        style={{height:1,width:'100%', backgroundColor:'black'}}>
            

        </View>
    )




    }
   
      



  render() {
    return (    <Container style={{backgroundColor:'#20B2AA'}}>
                    <Content>
                <FlatList
                    data={this.state.Session}
                     renderItem={this.renderCard}
                    // ItemSeparatorComponent={this.renderSeprator}           
                /> 
                  </Content>
             </Container>
    );
  }
}




