import React, { Component } from 'react';
import { View, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import firebase from 'firebase';

import { Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import MyCamera from './components/MyCamera';
import Home from './components/Home';


export default class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {
    const config = {
      apiKey: "AIzaSyC_HvfGzLg4FDNNT6z8EyYaMFBmZwu8C8w",
      authDomain: "rncamera-11fe0.firebaseapp.com",
      databaseURL: "https://rncamera-11fe0.firebaseio.com",
      projectId: "rncamera-11fe0",
      storageBucket: "rncamera-11fe0.appspot.com",
      messagingSenderId: "234490296356"
    };
  firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({ loggedIn: true });
        } else {
          this.setState({ loggedIn: false });
        }
      });
    }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      return (
        <CardSection>
          <Button onPress={() => firebase.auth().signOut()}>
            Log Out
          </Button>
          <Home />
        </CardSection>
      );
      case false:
        return <LoginForm />;
      default:
        return (
          <View alignSelf='center'>
            <Spinner size="large" />
          </View>);
    }
  }

  render() {
    return (
      // <Router>
      //  <Scene key="root">
      //    <Scene key="home" component={Home} title="Home" initial={true} hideNavBar={true}/>
      //    <Scene key="myCamera" component={MyCamera} title="MyCamera" hideNavBar={true}/>
      //  </Scene>
      //</Router>
      <View>{this.renderContent()}</View>
    )
  }
}