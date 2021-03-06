import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { gameUpdate } from '../actions';
import { Button, Card, CardSection, Input, Spinner } from './common';

const styles = require('../styles/dist/sass/main.js');

class ExistingGameForm extends Component {
    constructor() {
    super();
    this.state = {};
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

  render() {
    return (
      <View>
        <CardSection>
          <Input
            placeholder="Good Guys"
            label="Team Name"
            value={this.props.teamName}
            onChangeText={value => this.props.gameUpdate({ prop: 'teamName', value })}
          />
        </CardSection>
        <CardSection>
          <Input
            placeholder="paste here"
            label="Enter Game Id"
            value={this.state.gameId}
            onChangeText={gameId => this.setState({ gameId })}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={()=>{ this.props.onPressJoinGame(this.state.gameId, this.state.teamName)} }>
            Join
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={ () => {this.props.onPressStart() }} >
            Start!
          </Button>
        </CardSection>

      </View>
    );
  }
}

  const mapStateToProps = (state) => {
    const { teamName } = state.gameForm;
    console.log(teamName);
    return { teamName };
  };

export default connect(mapStateToProps, { gameUpdate })(ExistingGameForm);