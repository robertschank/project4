import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Communications from 'react-native-communications';

import { gameUpdate } from '../actions';
import { Button, Card, CardSection, Header, Input, List, Sinput } from './common';

class NewGameForm extends Component {
  constructor() {
    super();
  }

  onSubmit() {
    console.log('onSubmit');
    this.createAndSetGameId();
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


  onAddItem = (text) => {
    console.log('ONADDITEM, text: ' + text)
    const customSquares = this.props.customSquares;
    this.props.gameUpdate({ prop: 'customSquares', value: [text, ...customSquares]});

    // const {items} = this.state

    // this.setState({
    //   items: [text, ...items],
    // })
  }

  onRemoveItem = (index) => {
    const {items} = this.state

    this.setState({
      items: items.filter((todo, i) => i !== index),
    })
  }



  render() {
    const items = this.props.customSquares || [];
    console.log('RENDER, items: ' + items)
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
          <View style={{flex: 1}}>
            <Sinput
              placeholder={'Add your own custom squares here!\n(click to remove)'}
              onSubmitEditing={this.onAddItem}
            />
            <List
              list={items}
              onPressItem={this.onRemoveItem}
            />
          </View>
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

const mapStateToProps = (state) => {
  const { teamName, gameId, customSquares } = state.gameForm;
  console.log("NEWGAMEFORM TEAMNAME");
  console.log(teamName);
  console.log(customSquares);
  console.log(gameId);
  return { teamName, gameId, customSquares };
};

export default connect(mapStateToProps, { gameUpdate })(NewGameForm);