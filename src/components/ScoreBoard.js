import React, { Component } from 'react';
import {
    Dimensions,
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
import { Card, CardSection, Confirm, Button, Header, Input, MyModal } from './common';
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

const teamsters = [
  {teamName: 'boring', squaresCompleted: 22, rowsCompleted: 5, imageRef: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/spouting-whale_1f433.png'},
  {teamName: 'brobras', squaresCompleted: 2, rowsCompleted: 0, imageRef: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/spouting-whale_1f433.png'},
  {teamName: 'Slowskies', squaresCompleted: 22, rowsCompleted: 5, imageRef: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/spouting-whale_1f433.png'},
  {teamName: 'Turnips', squaresCompleted: 22, rowsCompleted: 5, imageRef: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/spouting-whale_1f433.png'},
  {teamName: 'WWWWWW sdfkd ', squaresCompleted: 22, rowsCompleted: 5, imageRef: 'https://emojipedia-us.s3.amazonaws.com/thumbs/120/apple/96/spouting-whale_1f433.png'},
]

class ScoreBoard extends Component {
	constructor(props) {
		super(props);
    this.state = { showModal: false }
	}

  toggleModal(){
    this.setState({showModal: !this.state.showModal });
  }

  componentDidMount() {
    this.props.scoresGet(this.props.gameId);
  }

  onOption1(){
    this.toggleModal();
  }

  onOption2(){
    this.toggleModal();
  }

  viewSnapshot(name, ref) {
    console.log('VIEWSNAPSHOTTTTTTTTTTTT');
    console.log(name);
    console.log(ref);
    // Launch Modal
    this.setState({
      modalMessage: name,
      modalImageRef: ref,
    });
    this.toggleModal();
  }

	render() {
    const {height, width} = Dimensions.get('window'); // TODO use redux here?
    const picWidth = width-5;
    const icon = require('../assets/ic_photo_camera_36pt.png');

    let teamInfo = this.props.teams.map((team, index)=>{
      // let teamInfo = teamsters.map((team, index) => {
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
              onPress={()=>{ this.viewSnapshot(team.teamName, team.snapshotStorageUrl) }}
            >
            <Image
              style={{ width: 50, height: 50, borderRadius: 10 }}
              source={{uri: team.snapshotStorageUrl}}
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
        <MyModal
          picWidth={picWidth}
          visible={this.state.showModal}
          message={this.state.modalMessage}
          imageRef={this.state.modalImageRef}
          option1='Looks Good'
          onOption1={this.onOption1.bind(this)}
          option2='Dispute'
          onOption2={this.onOption2.bind(this)}
          buttonColor = {COLOR_PRIMARY_LIGHT}
        />
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
  console.log('scoreboard teams')
  console.log(teams);
  return { teams, teamId, teamName, gameId };
};

export default connect(mapStateToProps, { gameUpdate, scoresGet })(ScoreBoard);