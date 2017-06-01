import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';
import NewGameForm from './NewGameForm';
import ExistingGameForm from './ExistingGameForm';

class StartGame extends Component {
  constructor() {
    super();
    this.state={}
  }

  renderForm() {
    if(this.state.newGame) {
      return  <NewGameForm 
                onPressSendText={this.props.onPressSendText}
              />
    } else if (this.state.existingGame) {
      return  <ExistingGameForm
                onPressJoinGame={this.props.onPressJoinGame}
              />
    }
  }

  pressedNew() {
    console.log('pressedNew');
    this.setState({ newGame: true, existingGame: false });
    this.props.onPressNewGame();
  }

  pressedJoin() {
    console.log('pressedJoin');
    this.setState({ newGame: false, existingGame: true  });
    this.props.onPressJoinGame();
  }

  render() {
    return (
      <View>
        <Card>
          <CardSection>
            <Button onPress={this.pressedNew.bind(this)}>
              New Game
            </Button>          
            <Button onPress={this.pressedJoin.bind(this)}>
              Join Existing
            </Button>          
          </CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
          </Card>
            {this.renderForm()}
          <Card>
          <CardSection>
            <Button onPress={ () => {this.props.onPressStart() }} >
              Start!
            </Button>
          </CardSection>
        </Card>
      </View>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

export default StartGame;
