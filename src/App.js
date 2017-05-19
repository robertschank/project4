import React, { Component } from 'react';
import { Router, Scene } from 'react-native-router-flux';

import MyCamera from './components/MyCamera';
import Home from './components/Home';


export default class App extends Component {
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
