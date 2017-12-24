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
import { Card, CardSection, Confirm, Button, Header, Input } from './common';
import { COLOR_PRIMARY_LIGHT } from './styles/commonStyles.js';

const styles = StyleSheet.create({
		container: {
			flexDirection: 'column', 
			justifyContent: 'flex-start',
			flex: 1,
		},
    listView: {
      flexGrow: 1
    },
    messageInput: {
        backgroundColor: COLOR_PRIMARY_LIGHT,
    },
    text: {
      fontSize: 20,
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
  }

	render() {

    let teamInfo = this.props.teams.map((team, index)=>{
        console.log('XKSDJFKSJDVKSJBVKSBVKS', team.teamName)
        console.log(team.teamName)
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
            <Button styleonPress={()=>{}}>
              Submit
            </Button>
          </View>
        </View>
      )
    });

		return (
			<View style={ styles.container }>
				<Header headerText={'Leader Board'}/>
          <Card>
            {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5,}}>  </View>*/}
              <CardSection style={{justifyContent: 'space-between'}}>
                <View style={{alignItems: 'center'}}>
                  <Text style={ styles.text }>
                    00
                  </Text>
                </View>
                <View style={{flex:3, alignItems: 'flex-start'}}>
                  <Text style={ styles.text }>
                    Team Red
                  </Text>
                </View>
                <View style={{flex:1, alignItems: 'center' }}>
                  <Text style={ styles.text }>
                    13
                  </Text>
                  <Text style={{fontSize: 14}}>
                    Squares
                  </Text>
                </View>
                <View style={{flex:1, alignItems: 'center' }}>
                  <Text style={ styles.text }>
                    2
                  </Text>
                  <Text style={{fontSize: 14}}>
                    Rows
                  </Text>
                </View>
              </CardSection>

              <CardSection style={{justifyContent: 'space-between'}}>
                <Text style={ styles.text }>
                  Hardy Boys
                </Text>
                <Text style={ styles.text }>
                  {}
                </Text>
                <Text style={ styles.text }>
                  Rows
                </Text>
                <Text style={ styles.text }>
                  team
                </Text>
              </CardSection>
          </Card>
          {teamInfo}
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
  return { teams, teamId, teamName, gameId };
};

export default connect(mapStateToProps, { gameUpdate, scoresGet })(ScoreBoard);