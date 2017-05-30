import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';

class NewGameForm extends Component {
  constructor() {
    super();
    this.state={}
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