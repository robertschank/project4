import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import firebase from 'firebase';
import ReduxThunk from 'redux-thunk';
import Communications from 'react-native-communications';

import { Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';
import StartGame from './components/StartGame'
import Home from './components/Home';
import reducers from './reducers';
import Router from './Router';

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

  handlePressNewGame() {
    console.log('handlePressNewGame');

    const { currentUser } = firebase.auth();

    // Create new Game ID:
    let gameKey = firebase.database().ref(`games/`).push().key;
    this.setState({ gameId: gameKey });
    console.log(this.state.gameId);

    var updates = {};

    // Get the current Time:
    const now = new Date();
    const hours =  now.getHours();
    let mins = now.getMinutes();
    // if m is one digit, add a zero in front of it:
    mins = mins < 10 ? "0" + mins : mins;
    const time = `${hours}:${mins}`;

    // Create New Post Key
    reallyNewPostKey = firebase.database().ref(`games/${gameKey}/`).push().key;
    updates[`games/${gameKey}/${reallyNewPostKey}`] = 
      {
        text: `Hey people, welcome to Squares Out There! This is a group message area for all teams. We'll send game updates in here too. Remember, this is a game of integrity and honor. It's up to you to match your photos to the given description. Have fun out there!`, 
        author:"Bing Man:",
        time: time,
        color: '#f6ceff',
      };

    firebase.database().ref().update(updates);
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

    Communications.textWithoutEncoding(null, "" + this.state.gameId);
    // this.sendInitMessageToDatabase();
  }

  handlePressStart() {
    this.setState({ gameReady: true });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
      if (this.state.gameReady) {return (
          <Home 
            gameId={this.state.gameId}
            teamName={this.state.teamName}
          />
      );}
      else { return ( <StartGame 
          onPressStart={this.handlePressStart.bind(this)}
          onPressNewGame={this.handlePressNewGame.bind(this)}
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
                      backgroundColor: 'skyblue'}}>
          {this.renderContent()}
        </View>
      </Provider>
      //<Router />
    )
  }
}