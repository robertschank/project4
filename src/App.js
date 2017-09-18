import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';

import TabbedNavigator from './TabbedNavigator';
import { Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import StartGame from './components/StartGame';
import Game from './components/Game';
import Home from './components/Home';
import reducers from './reducers';

export default class App extends Component {

  componentWillMount() {
    console.log('XXXXXXX APP.JS COMPONENT WILL MOUNT XXXXXXX');
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

  handlePressSubmit(teamName) {
    console.log('handlePressSubmit');

    this.setState({ teamName: teamName });
  }

  handlePressJoinGame(gameKey, teamName) {
    console.log('handlePressJoinGame');
    console.log(teamName);
    this.setState({ gameId: gameKey });
    this.setState({ teamName: teamName});
  }

  handlePressSendText() {
    console.log('onHandleSendText');

    // Communications.textWithoutEncoding(null, "" + this.state.gameId);
    // this.sendInitMessageToDatabase();
  }

  handlePressStart() {
    this.setState({ gameReady: true });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      if (this.state.gameReady) {return (
          <Game/>
      );}
      else { return ( <StartGame 
          onPressStart={this.handlePressStart.bind(this)}
          onPressSendText={this.handlePressSendText.bind(this)}
          onPressJoinGame={this.handlePressJoinGame.bind(this)}
          onPressSubmit={this.handlePressSubmit.bind(this)}
        />); }
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
                      backgroundColor: '#faf9ff'}}>
          {this.renderContent()}
        </View>
      </Provider>
      //<Router />
    )
  }
}
          {/*<Home 
            gameId={this.state.gameId}
            teamName={this.state.teamName}
          />*/}