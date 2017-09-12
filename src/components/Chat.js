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
import { messagesGet } from '../actions';
import { gameUpdate } from '../actions';
import MessageItem from './MessageItem';
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

class Chat extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newMessage: 'asdf'
		}
	}

  componentWillMount() {
    console.log('HOME.JS componentWillMount.');
    // Get the list of messages from db

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    // nextProps are the next set of props that this component will be rendered with
    // this.props is still the old set of props

    this.createDataSource(nextProps);
    console.log('HITTING COMPONENT WILL RECEIVE PROPS');
  }

  createDataSource({ messages }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    // console.log(this.state.messages);

    this.dataSource = ds.cloneWithRows(messages);
  }

  componentDidMount() {
    console.log('HOME.JS componentDidMount. ');
    this.props.messagesGet(this.props.gameId);
    this.sendMessage('Ref', `Hey people, welcome to Townie Squares! This is a group message area for all teams. We'll send game updates in here too. Remember, this is a game of integrity and honor. It's up to you to match your photos to the given description. Have fun out there!`);
    this.sendMessage('Ref', `${this.props.teamName} joined the game.`);
  }

  sendMessage = (author, insertMessage) => {
    console.log('sendMessage.');
    console.log('gameId: ');
    console.log(this.props.gameId);
    console.log('gameId');
    var newMessageKey = firebase.database().ref(`games/${this.props.gameId}/`).push().key;
    var updates = {};

    const now = new Date();
    const hours =  now.getHours();
    let mins = now.getMinutes();
    // if m is one digit, add a zero in front of it:
    mins = mins < 10 ? "0" + mins : mins;
    const time = `${hours}:${mins}`;
    console.log(time);

    updates[`games/${this.props.gameId}/` + newMessageKey] = 
      {
        text: insertMessage, 
        author: author + ':',
        time: time,
        color: '#f6ceff',
      };

    firebase.database().ref().update(updates);
    this.setState({ newMessage: '' });

  }

  renderRow = (mess) => {
    return (<MessageItem message={mess} />)
  }

	render() {
		return (
			<View style={ styles.container }>
				<Header headerText={'Group Chat'}/>
          <ListView style={styles.listView}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
          <CardSection style={styles.messageInput} >
            <Text onPress={this.uploadSnapshot}>XO!</Text>
            <Input
                placeholder="Enter trash talk here."
                label="Group Message"
                value={this.state.newMessage}
                onChangeText={newMessage => this.setState({ newMessage })}
            />
            <Text onPress={()=>{this.sendMessage(this.props.teamName, this.state.newMessage)}}>SEND</Text>
          </CardSection>
			</View>
		);
	}
}

const mapStateToProps = (state) => {
  const messages = _.map(state.messages, (val, uid) => {
    return { ...val, uid };
  });
  const { teamName, gameId, customSquares } = state.gameForm;
  console.log('Home mapStateToProps');
  console.log(gameId);
  console.log(teamName);
    console.log('Home mapStateToProps');
  return { messages, teamName, gameId, customSquares };
};

export default connect(mapStateToProps, { messagesGet })(Chat);