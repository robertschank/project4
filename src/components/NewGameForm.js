import React, { Component } from 'react';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';

import { gameUpdate } from '../actions';
import { Button, Card, CardSection, Input } from './common';

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
            value={this.props.teamName}
            onChangeText={value => this.props.gameUpdate({ prop: 'teamName', value })}
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
          <Button onPress={()=>{ this.props.onPressSubmit( this.state.teamName)} }>
            Submit Name
          </Button>
        </CardSection>

        <CardSection>
          <Text>For multiple team play, as the commissioner (that's you) you need to share this game's id number with the other teams. Click the button below to send an editable text to your opposing teams.  You'll have to select the recipients.</Text>
        </CardSection>
        <CardSection>
          <Button onPress={()=>{ this.props.onPressSendText()} }>
            Open My Text
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

const mapStateToProps = (state) => {
  const { teamName } = state.gameForm;
  return { teamName };
};

export default connect(mapStateToProps, { gameUpdate })(NewGameForm);