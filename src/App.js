import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import { Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
//import MyCamera from './components/MyCamera';
import StartGame from './components/StartGame'
import Home from './components/Home';
import reducers from './reducers';
import Router from './Router';

export default class App extends Component {

  componentWillMount() {
  console.log('XXXXXXX APP.JS COMPONENT WILL MOUNT XXXXXXX')
  this.setState({ loggedIn: null });
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
      if (this.state.gameReady) {return (
          <Home />
      );}
      else { return ( <StartGame />); }
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
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));
    return (
      <Provider store={store}>
        <View style={{alignItems: 'stretch',
                      flex: 1,
                      backgroundColor: 'skyblue'}}>
          {this.renderContent()}
        </View>
      </Provider>
      //<Router />
    )
  }
}