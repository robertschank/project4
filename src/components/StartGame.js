import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';
import Communications from 'react-native-communications';

import { Button, Card, CardSection, Input, Spinner } from './common';
import NewGameForm from './NewGameForm';
import ExistingGameForm from './ExistingGameForm';

class StartGame extends Component {
  constructor() {
    super();
    this.state={}
  }
  onButtonPress() {
    this.setState({ gameReady: true });
  }

  renderButton() {
    if (this.state.gameReady) {
      return <Text>Finish the paperwork</Text>;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Start Game
      </Button>
    );
  }

  renderForm() {
    if(this.state.newGame) {
      return <ExistingGameForm />
    } else if (this.state.existingGame) {
      return <NewGameForm />
    }
  }

  sendText() {
    //const { phone, shift } = this.props;
    console.log("SENDTEXT" + this.state.teamName)
    Communications.text('5085421038', "Would you like to play a game with " +  this.state.teamName + "?");
  }

  render() {
    return (
      <View>
      <Card>

        <CardSection>
          <Button onPress={() => {this.setState({ newGame: true, existingGame: false })}}>
            Start New Game
          </Button>          

          <Button onPress={() => {this.setState({ newGame: false, existingGame: true })}}>
            Join Existing
          </Button>          
        </CardSection>


        <CardSection>
          <Button onPress={this.sendText.bind(this)}>
            Open SMS
          </Button>          
        </CardSection>

        <Text style={styles.errorTextStyle}>
          {this.state.error}
        </Text>


      </Card>
        {this.renderForm()}
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
        // <CardSection>
        //   <Input
        //     placeholder="Jorts (optional)"
        //     label="Enter Custom Squares"
        //     value={this.state.custom}
        //     onChangeText={custom => this.setState({ custom })}
        //   />
        // </CardSection>
export default StartGame;