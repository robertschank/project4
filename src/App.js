import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';
import firebase from 'firebase';

import MyCamera from './components/MyCamera';
import Home from './components/Home';


export default class App extends Component {
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
  // const firebaseApp = firebase.initializeApp(config);
  }
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="home" component={Home} title="Home" initial={true} hideNavBar={true}/>
          <Scene key="myCamera" component={MyCamera} title="MyCamera" hideNavBar={true}/>
        </Scene>
      </Router>
    )
  }
}
