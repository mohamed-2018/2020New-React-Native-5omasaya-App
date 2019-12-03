/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import {Scene, Router, ActionConst} from 'react-native-router-flux';
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Forgetpassword from './pages/Forgetpassword';
import Settings from './pages/Settings';
import Splash from './Component/Splash';
import About from './pages/About';
import Contactus from './pages/Contactus';
import Privacy from './pages/Privacy';
import Changepassword from './pages/Changepassword';
import Locations from './pages/Locations';
import Editprofile from './pages/Editprofile';
import Sessions from './pages/Sessions';
import SingleSession from './Component/SingleSession';
import MainHeader from './Component/MainHeader';
import Upload from './pages/upload';
import Details from './pages/Details';
import Confirm from './pages/Confirm';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import History from './pages/History';
import OneSignal from 'react-native-onesignal';
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});


export default class App extends Component {
  constructor(props) {
    super(props);
    OneSignal.init("99d70a92-aff5-4bc5-81e6-4cd71478245e");

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
    OneSignal.configure(); 	// triggers the ids event
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
  render() {
    return (
      <Router>
      <Scene key="root" hideNavBar>
      <Scene key="Splash" component={Splash} title="Splash" />
      <Scene key="Login" component={Login} title="Login" />
      <Scene key="Home"  type={ActionConst.RESET} component={Home} title="Home" />
      <Scene key="Register" component={Register} title="Register"/>
      <Scene key="Forgetpassword" component={Forgetpassword} title="Forgetpassword" />
      <Scene key="Settings" component={Settings} title="Settings"  />
      <Scene key="Contactus" component={Contactus} title="Contactus"  />
      <Scene key="Privacy" component={Privacy} title="Privacy"  />
      <Scene key="About" component={About} title="About"  />
      <Scene key="Changepassword" component={Changepassword} title="Changepassword"  />
      <Scene key="History" component={History} title="History"  />
      <Scene key="Locations" component={Locations} title="Locations"  />
      <Scene key="Editprofile" component={Editprofile} title="Editprofile"  />
      <Scene key="Sessions" component={Sessions} title="Sessions"  />
      <Scene key="SingleSession" component={SingleSession} title="SingleSession"  />
      <Scene key="Upload" component={Upload} title="Upload"  />
      <Scene key="Details" component={Details} title="Details"  />
      <Scene key="Confirm" component={Confirm} title="Confirm"  />
      <Scene key="Tab1" component={Tab1} title="Tab1"  />
      <Scene key="Tab2" component={Tab2} title="Tab2"  />
      <Scene key="MainHeader" component={MainHeader} title="MainHeader"  />
      </Scene>
    </Router>
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
