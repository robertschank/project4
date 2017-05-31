import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class ExistingGameForm extends Component {
    constructor() {
    super();
    this.state={}
  }

  sayHello() {
    console.log('sayHello');
    console.log(this.state.gameId);
    const { currentUser } = firebase.auth();

    newPostKey = firebase.database().ref(`games/${this.state.gameId}/`).push().key;
    var updates = {};

    const now = new Date();
    const hours =  now.getHours();
    let mins = now.getMinutes();
    // if m is one digit, add a zero in front of it:
    mins = mins < 10 ? "0" + mins : mins;
    const time = `${hours}:${mins}`;

    updates[`games/${this.state.gameId}/` + newPostKey] = 
      {
        text: "Come on Troy!", 
        author:"Troy",
        time: time,
        color: '#f6ceff',
      };

    firebase.database().ref().update(updates);
    this.setState({ newMessage: '' });
  }

  renderButton() {
    if (this.state.gameReady) {
      return <Text>Finish the paperwork</Text>;
    }

    return (
      <Button onPress={console.log('Gimme a game here')}>
        Start Game
      </Button>
    );
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            placeholder="Good Guys"
            label="Team Name"
            value={this.state.teamName}
            onChangeText={teamName => this.setState({ teamName })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="Go ahead, paste it"
            label="Enter Game Id"
            value={this.state.gameId}
            onChangeText={gameId => this.setState({ gameId })}
          />
        </CardSection>
        <CardSection>
          <Button onPress={()=> this.sayHello()}>
            Join
          </Button>
        </CardSection>
        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>
        <CardSection>
          {this.renderButton()}
        </CardSection>
      </Card>
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

export default ExistingGameForm;