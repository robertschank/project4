import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';
import NewGameForm from './NewGameForm';
import ExistingGameForm from './ExistingGameForm';

const styles = require('../styles/dist/sass/main.js');

class StartGame extends Component {
  constructor() {
    super();
    this.state={}
  }

  renderForm() {
    if(this.state.newGame) {
      return  <NewGameForm 
                onPressSendText={this.props.onPressSendText}
                onPressSubmit={this.props.onPressSubmit}
                onPressStart={this.props.onPressStart}
              />
    } else if (this.state.existingGame) {
      return  <ExistingGameForm
                onPressJoinGame={this.props.onPressJoinGame}
                onPressStart={this.props.onPressStart}
              />
    }
  }

  pressedNew() {
    console.log('pressedNew');
    this.setState({ newGame: true, existingGame: false });
   // this.props.onPressNewGame();
  }

  pressedJoin() {
    console.log('pressedJoin');
    this.setState({ newGame: false, existingGame: true  });
    this.props.onPressJoinGame();
  }

  render() {
    return (
      <View>
        <View style={styles.headerView}>
          <Text style={styles.header}> Townie Squares </Text><Text onPress={() => firebase.auth().signOut()}>
            Log Out
          </Text>        
        </View>
        <Card>
          <CardSection>
            <Button onPress={this.pressedNew.bind(this)}>
              New Game
            </Button>          
            <Button onPress={this.pressedJoin.bind(this)}>
              Join Existing
            </Button>          
          </CardSection>
            {this.renderForm()}



        </Card>
      </View>
    );
  }
}

export default StartGame;
