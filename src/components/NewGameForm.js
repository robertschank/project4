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

  onSubmit() {
    console.log('onSubmit');
    const { teamName, custom1 } = this.props;

    let gameKey = firebase.database().ref(`games/`).push().key;

    this.props.gameUpdate({ prop: gameId, gameKey });
    console.log()
    this.props.gameCreate({ teamName, custom1}); //custom1: custom1 || null }); //custom will probably be an array of custom traits
  }

  createAndSetGameId() {
    let gameKey = firebase.database().ref(`games/`).push().key;
    this.props.gameUpdate({ prop: gameId, gameKey });

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
            value={this.props.custom1}
            onChangeText={value => this.props.gameUpdate({ prop: 'custom1', value })}
          />
        </CardSection>

        <CardSection>
          <Button onPress={this.onSubmit.bind(this)}>
            Submit
          </Button>
        </CardSection>
{/*}
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
            Let's Text
          </Button>
        </CardSection>
      */}
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
  console.log("NEWGAMEFORM TEAMNAME");
  console.log(teamName);
  return { teamName };
};

export default connect(mapStateToProps, { gameUpdate })(NewGameForm);