import React, { Component } from 'react';
import { Text, View } from 'react-native';
import firebase from 'firebase';

import { Button, Card, CardSection, Input, Spinner } from './common';
import NewGameForm from './NewGameForm';
import ExistingGameForm from './ExistingGameForm';

class StartGame extends Component {
  constructor() {
    super();
    this.state={}
  }

  renderForm() {
    if(this.state.newGame) {
      return <NewGameForm />
    } else if (this.state.existingGame) {
      return <ExistingGameForm />
    }
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
          <Text style={styles.errorTextStyle}>
            {this.state.error}
          </Text>

          </Card>
            {this.renderForm()}
          <Card>
          <CardSection>
            <Button onPress={ () => {this.props.onPressStart()}} >
              Start New Game
            </Button>
          </CardSection>
        </Card>
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