import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import Communications from 'react-native-communications';

import { Button, Card, CardSection, Input } from './common';

var newPostKey = 'key not set';

class NewGameForm extends Component {
  constructor() {
    super();
    this.state={}
  }


  createGameId() {
    console.log('createGameId.');
    const { currentUser } = firebase.auth();

    newPostKey = firebase.database().ref(`games/`).push().key;
    var updates = {};

    const now = new Date();
    const hours =  now.getHours();
    let mins = now.getMinutes();
    // if m is one digit, add a zero in front of it:
    mins = mins < 10 ? "0" + mins : mins;
    const time = `${hours}:${mins}`;

    reallyNewPostKey = firebase.database().ref(`games/${newPostKey}/`).push().key;
    reallyNewPostKey = '-' + reallyNewPostKey;
    updates[`games/${newPostKey}/${reallyNewPostKey}`] = 
      {
        text: "Howdy Folks!", 
        author:"Commissioner",
        time: time,
        color: '#f6ceff',
      };

    firebase.database().ref().update(updates);
    this.setState({ newMessage: '' });
  }

  componentWillMount() {
    console.log('NewGameForm componentWillMount');
    this.createGameId();
  }

  sendText() {
    //const { phone, shift } = this.props;
    console.log("SENDTEXT" + this.state.teamName)
    Communications.textWithoutEncoding(null, "Would you like to play Kowabunga Bingo with this guy/gal? If so, you'll need this game id: " +  newPostKey + " . Copy, paste, do what ya do.");
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
            placeholder="Rockies Jersey"
            label="Custom Square"
            value={this.state.custom}
            onChangeText={custom => this.setState({ custom })}
          />
        </CardSection>
        <CardSection>
          <Text>For multiple team play, as the commissioner (that's you) you need to share this game's id number with the other teams. Click the button below to send an editable text to your opposing temas.  You'll have to select the recipients.</Text>
        </CardSection>
        <CardSection>
          <Button onPress={this.sendText.bind(this)}>
            Open My Text Machine
          </Button>          
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

export default NewGameForm;