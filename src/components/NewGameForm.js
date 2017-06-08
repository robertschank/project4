import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Communications from 'react-native-communications';

import { gameUpdate } from '../actions';
import { Button, Card, CardSection, Input } from './common';

class NewGameForm extends Component {
  constructor() {
    super();
    this.state={}
  }

  onSubmit() {
    console.log('onSubmit');
    this.createAndSetGameId();
    // const { teamName, custom1 } = this.props;

    // let gameKey = firebase.database().ref(`games/`).push().key;

    // this.props.gameUpdate({ prop: gameId, gameKey });
    console.log()
    // this.props.gameCreate({ teamName, custom}); //custom1: custom1 || null }); //custom will probably be an array of custom traits
  }

  createAndSetGameId() {
    let gameKey = firebase.database().ref(`games/`).push().key;
    console.log('createAndSetGameId gameKey: ' + gameKey);

    this.props.gameUpdate({ prop: 'gameId', value: gameKey });

    console.log('createAndSetGameId gameKey: ' + gameKey);
  }

  onText() {
    console.log('onText')
    // console.log(this.state.gameForm.gameId);
    console.log(this.props.gameId);
    // console.log(state.getState())
    Communications.textWithoutEncoding(null, "" + this.props.gameId);
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
            placeholder="Rockies Jersey"
            label="Custom Square"
            value={this.props.custom}
            onChangeText={value => this.props.gameUpdate({ prop: 'custom', value})}
          />
        </CardSection>

        <CardSection>
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onSubmit.bind(this)}>
            Submit
          </Button>
        </CardSection>

        <CardSection>
          <Text>For multiple team play, as the commissioner (that's you) you need to share this game's id number with the other teams. Click the button below to send an editable text to your opposing teams.  You'll have to select the recipients.</Text>
        </CardSection>

        <CardSection>
          <Button onPress={this.onText.bind(this)}>
            Send Texts
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.props.onPressStart}>
            Start!
          </Button>
        </CardSection>

      </View>
    );
  }
}

/*}
        <CardSection>
          <Button onPress={()=>{ this.props.onPressSubmit( this.state.teamName)} }>
            Submit Name
          </Button>
        </CardSection>

        <CardSection>
          <Text>For multiple team play, as the commissioner (that's you) you need to share this game's id number with the other teams. Click the button below to send an editable text to your opposing teams.  You'll have to select the recipients.</Text>
          <Button onPress={()=>{ this.props.onPressSendText()} }>
            Let's Text
          </Button>
        </CardSection>
      */

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
};

const mapStateToProps = (state) => {
  const { teamName, gameId, custom } = state.gameForm;
  console.log("NEWGAMEFORM TEAMNAME");
  console.log(teamName);
  console.log(custom);
  console.log(gameId);
  return { teamName, gameId, custom };
};

export default connect(mapStateToProps, { gameUpdate })(NewGameForm);