import React, { Component } from 'react';
import {
    Image,
		ListView,
		Text,
    TouchableOpacity,
		StyleSheet,
		View,
	} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import _ from 'lodash';

import TabbedNavigator from '../TabbedNavigator';
import { scoresGet, gameUpdate } from '../actions';
import { Card, CardSection, Confirm, Button, Header, Input, Modal } from './common';
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
    this.props.scoresGet(this.props.gameId);
  }

  viewSnapshot() {
    console.log('VIEWSNAPSHOTTTTTTTTTTTT');
  }

	render() {
      // icon = require('../assets/snapshotlogo.png');
    const icon = require('../assets/ic_photo_camera_36pt.png');
    let teamsters = [
      {teamName: 'boring', squaresCompleted: 22, rowsCompleted: 5},
      {teamName: 'Chill bras', squaresCompleted: 2, rowsCompleted: 0},
      {teamName: 'Slowskies', squaresCompleted: 22, rowsCompleted: 5},
      {teamName: 'Turnips', squaresCompleted: 22, rowsCompleted: 5},
      {teamName: 'WWWWWW sdfkd ', squaresCompleted: 22, rowsCompleted: 5},
    ]

    // let teamInfo = this.props.teams.map((team, index)=>{
      let teamInfo = teamsters.map((team, index) => {
        // console.log('XKSDJFKSJDVKSJBVKSBVKS', team.teamName)
        // console.log(team.teamName)
        {/*<View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5,}}>  </View>*/}
      return (
        <View>
          <CardSection style={{justifyContent: 'space-between'}}>
            <View style={{alignItems: 'center'}}>
              <Text style={ styles.text }>
                {index + 1}
              </Text>
            </View>
            <TouchableOpacity 
              style={{alignItems: 'center', padding: 5}}
              onPress={()=>{this.viewSnapshot()}}
            >
              <Image
                style={{width: 50, height: 50}}
                source={{uri: 'https://www.icon.com.mt/wp-content/uploads/2017/04/liferaylogo.png'}}
              />
            </TouchableOpacity>
            <View style={{flex:4, alignItems: 'flex-start'}}>
              <Text style={ styles.text }>
                {team.teamName}
              </Text>
            </View>
            <View style={{flex:1, alignItems: 'center' }}>
              <Text style={ styles.text }>
                {team.squaresCompleted}
              </Text>
              <Text style={{fontSize: 14}}>
                Squares
              </Text>
            </View>
            <View style={{flex:1, alignItems: 'center' }}>
              <Text style={ styles.text }>
                {team.rowsCompleted}
              </Text>
              <Text style={{fontSize: 14}}>
                Rows
              </Text>
            </View>
          </CardSection>
        </View>
      )
    });

		return (
			<View style={ styles.container }>
				<Header headerText={'Leader Board'}/>
        <Card>
          {teamInfo}
        </Card>
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