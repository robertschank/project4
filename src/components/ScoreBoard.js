import React, { Component } from 'react';
import { 
		ListView,
		Text,
		StyleSheet,
		View,
	} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';

import TabbedNavigator from '../TabbedNavigator';
import { scoresGet, gameUpdate } from '../actions';
import { Card, CardSection, Confirm, Header, Input } from './common';
import { COLOR_PRIMARY_LIGHT } from './styles/commonStyles.js';

const styles = StyleSheet.create({
		container: {
			flexDirection: 'column', 
			justifyContent: 'space-between',
			flex: 1,
		},
    listView: {
      flexGrow: 1
    },
    messageInput: {
        backgroundColor: COLOR_PRIMARY_LIGHT,
    },
});

class ScoreBoard extends Component {
	constructor(props) {
		super(props);
		this.state = {
      squaresCompleted: 0,
      rowsCompleted: 0,
		}
	}

  componentDidMount() {
    console.log('ScoreBoard.JS componentDidMount. ');
    this.props.scoresGet(this.props.gameId);
    this.updateScore();
  }

  updateScore = () => {
    var updates = {};
    var teamKey = firebase.database().ref(`games/${this.props.gameId}`).push().key;

    this.props.gameUpdate({ prop: 'teamId', value: teamKey });

    updates[`games/${this.props.gameId}/teams/${teamKey}`] = 
      {
        teamName: this.props.teamName,
        squaresCompleted: this.state.squaresCompleted,
        rowsCompleted: this.state.rowsCompleted,
      };
    firebase.database().ref().update(updates);
  }

	render() {

    let teamInfo = this.props.teams.map((team, index)=>{
      return (
        <View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5,}}>

            <Text>
              {team.teamName}
            </Text>
            <Text>
              {team.squaresCompleted}
            </Text>
            <Text>
              {team.rowsCompleted}
            </Text>

          </View>
        </View>
      )
    });

		return (
			<View style={ styles.container }>
				<Header headerText={'Leader Board'}/>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5,}}>

            <Text>
              Team
            </Text>
            <Text>
              Squares
            </Text>
            <Text>
              Rows
            </Text>

          </View>
          {teamInfo}
          <Text>HELLO WORLD</Text>
			</View>
		);
	}
}

const mapStateToProps = (state) => {

  const { teamId, teamName, gameId } = state.gameForm;

  const teams = _.map(state.firebaseDBItems, (val, uid) => {
    return { ...val, uid };
  });

  console.log('ScoreBoard mapStateToProps');
  console.log(gameId);
  console.log(teamName);
  console.log(teamId);
  console.log(teams);  
  console.log('ScoreBoard mapStateToProps');
  return { teams, teamId, teamName, gameId, customSquares };
};

export default connect(mapStateToProps, { gameUpdate, scoresGet })(ScoreBoard);