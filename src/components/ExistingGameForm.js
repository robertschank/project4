import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class ExistingGameForm extends Component {
    constructor() {
    super();
    this.state={}
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
            placeholder="KlPGisZQZ3JN0KpeXn4"
            label="Enter Game Id"
            value={this.state.gameId}
            onChangeText={gameId => this.setState({ gameId })}
          />
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