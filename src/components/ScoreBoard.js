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

class ScoreBoard extends Component {
	constructor(props) {
		super(props);
    this.state = { showModal: false }
	}

  componentDidMount() {
    this.props.scoresGet(this.props.gameId);
  }

  //   picWidth={picWidth}
  // visible={this.state.showModal}
  // message={this.state.modal.message}
  // imageRef={this.state.modal.imagePath}
  // option1={this.state.modal.option1}
  // onOption1={this.onOption1.bind(this)}
  // option2={this.state.modal.option2}
  // onOption2={this.onOption2.bind(this)}
  // buttonColor={COLOR_SECONDARY_LIGHT}

  viewSnapshot() {
    console.log('VIEWSNAPSHOTTTTTTTTTTTT');
    // Launch Modal
    // let modal = {
    //     message: this.state.squares[index].description,
    //     option1: 'Looks Good',
    //     option2: 'Dispute A Photo',
    //     imagePath: this.state.squares[index].photoPath,
    //   };
    //   this.setState({
    //     modal: modal,
    //   })
    //   this.toggleModal()
  }

        //   <MyModal
        //   picWidth={picWidth}
        //   visible={this.state.showModal}
        //   message={this.state.modal.message}
        //   imageRef={this.state.modal.imagePath}
        //   option1={this.state.modal.option1}
        //   onOption1={this.onOption1.bind(this)}
        //   option2={this.state.modal.option2}
        //   onOption2={this.onOption2.bind(this)}
        //   buttonColor={COLOR_SECONDARY_LIGHT}
        // />

	render() {
    const {height, width} = Dimensions.get('window'); // TODO use redux here?
    const picWidth = width-5;
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
  return { teams, teamId, teamName, gameId };
};

export default connect(mapStateToProps, { gameUpdate, scoresGet })(ScoreBoard);