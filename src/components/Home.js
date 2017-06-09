'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  Button,
  Image,
  KeyboardAvoidingView,
  ListView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import firebase from 'firebase';
import _ from 'lodash';

import { messagesGet } from '../actions';
import { gameUpdate } from '../actions';
import { Square } from './Square';
import { MyCamera } from './MyCamera';
import MessageItem from './MessageItem';
import { Card, CardSection, Input } from './common';
import { containerColor } from '../constants/Colors';

let squaresArray = [];
const teamName = '';
const gameId = '';
// const teamName = this.props.teamName;

function SquareObject(index, description) {
  this.index = index;
  this.description = description;
  this.marked = 'no';
  this.photoPath = '../assets/ic_camera_rear_white.png';
}

class Home extends Component {
  constructor(props) {
    super(props);
    console.log('BEGIN CONSTRUCTOR');

    const gameId = this.props.gameId;
    console.log(this.props.gameId);
    // gameId = this.props.gameId;
    teamName = this.props.teamName;


    // Hard Coded Descriptions
    let descriptionsArray = [
          'Tie Dye',
          'Leather Jacket',
          'Red Shirt',
          'Hands Full',
          'Balloon',
          'Dog',
          'Tattoo',
          'Out of Place',
          'Flatbrim',
          'Eating on the Run',
          'Jersey',
          'Basic',
          'Pizza!',
          'Free Space',
          'Suit',
          'Sweatpants',
    ];

    // Set up some empty squares
    for (let i=0; i < 16; i++) {
      squaresArray.push(new SquareObject(i, descriptionsArray[i]));
    }

    // Construct a dog square and insert into squaresArray
    const y = 5;
    let dogSquare = new SquareObject(y, descriptionsArray[y]);
    dogSquare.photoPath = 'http://thedogwallpaper.com/wp-content/uploads/2013/12/jack-russell-terrier-puppy-picture-165-150x150.jpg';
    dogSquare.marked = 'yes';
    squaresArray[y] = dogSquare;

    // Construct a basic square and insert into squaresArray
    const z = 11;
    let basicSquare = new SquareObject(z, descriptionsArray[z]);
    basicSquare.photoPath = 'http://www.gannett-cdn.com/-mm-/29163e67f8d19f03377ccf0df6dd248c86ac72be/c=61-0-3684-2724&r=x383&c=540x380/local/-/media/USATODAY/None/2014/10/31/635503611903170008-AP-Earns-Starbucks.jpg';
    basicSquare.marked = 'yes';
    squaresArray[z] = basicSquare;

    this.state = {
      squares: squaresArray,
      indexForUrl: -1,
      returnedPhotoPath: 'no photo path',
      rowCount: [0, 1, 1, 0],
      colCount: [0, 1, 0, 1],
    };
  } // End Constructor

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
    console.log(this.state.messages);

    this.dataSource = ds.cloneWithRows(messages);
  }

  componentDidMount() {
    console.log('HOME.JS componentDidMount. ');
        this.props.messagesGet(gameId);
    // console.log(this.state.gameId);
    this.sendMessage('TSBot', `Hey people, welcome to Townie Squares! This is a group message area for all teams. We'll send game updates in here too. Remember, this is a game of integrity and honor. It's up to you to match your photos to the given description. Have fun out there!`);
    this.sendMessage('TSBot', `${teamName} has joined the game.`);
  }

  sendMessage = (author, insertMessage) => {
    console.log('sendMessage.');

    var newMessageKey = firebase.database().ref(`games/${gameId}/`).push().key;
    var updates = {};

    const now = new Date();
    const hours =  now.getHours();
    let mins = now.getMinutes();
    // if m is one digit, add a zero in front of it:
    mins = mins < 10 ? "0" + mins : mins;
    const time = `${hours}:${mins}`;
    console.log(time);

    updates[`games/${gameId}/` + newMessageKey] = 
      {
        text: insertMessage, 
        author: author + ':',
        time: time,
        color: '#f6ceff',
      };

    firebase.database().ref().update(updates);
    this.setState({ newMessage: '' });

  }

  takePhoto = (path) => {
    console.log('takePhoto');

    this.sendMessage("bing man", `Whoa, ${teamName} completed a square!`)
    const index = this.state.clickedSquareIndex;
    // Check For Win:
    const colMarked = index%4;
    console.log('COLMARKED' + colMarked);
    // const x =  
    console.log('THIS.STATE.COLCOUNT: ' + this.state.colCount);
    var currentColCount = this.state.colCount;
    console.log('CURRENTCOLCOUNT: ' + currentColCount);
    currentColCount[colMarked]++;
    if (currentColCount[colMarked] >= 4) {
      console.log('YOU WIN!!!');
      this.sendMessage("bing man", `Holy moly, ${teamName} got bingo!!`)
    }
    console.log('CURRENTColCount: ' + currentColCount);

    const floorThisThing = index/4;
    const rowMarked = Math.floor(floorThisThing);
    console.log('ROWMARKED' + rowMarked);
    // const x =  
    console.log('THIS.STATE.ROWCOUNT: ' + this.state.rowCount);
    var currentRowCount = this.state.rowCount;
    console.log('CURRENTCOLCOUNT: ' + currentRowCount);
    currentRowCount[rowMarked]++;
    if (currentRowCount[rowMarked] >= 4) {
      console.log('YOU WIN!!!');
      this.sendMessage("bing man", `Look Out, ${teamName} got bingo!!`)
    }
    console.log('CURRENTColCount: ' + currentRowCount);

    // Couldn't get spread operator ... working

    // This where the completed square is added
    let newSquares = this.state.squares.slice();
    let newSquare = newSquares[index];
    let replaceSquare = newSquare;
    replaceSquare.photoPath = path;
    replaceSquare.marked = 'yes';
    newSquares[index] = replaceSquare;
    this.setState({
      showCamera: false,
      returnedPhotoPath: path,
      squares: newSquares,
    });
  }; // End takePhoto()

  launchCamera = (index) => {
    console.log('launchCamera');
    console.log(index);
    this.setState({
      showCamera: true,
      clickedSquareIndex: index,
    });
  };

  renderSquare(i, description, photoPath, marked) {
    return <Square index={i}
      description={description}
      photoUri={photoPath}
      marked={marked}
      onPressSquare={this.launchCamera.bind(this)}
    />
  }

  renderRow = (mess) => {
    return (<MessageItem message={mess} />)
  }

  // TODO
  // renderBoard() {
  //   return <Board 
  //   />
  
  render() {
    console.log('HOME.js this.state.photoUri: ' + this.state.photoUri);

    return (
      <View style={styles.container}>
      {this.state.showCamera &&
        <View style={styles.cameraContainer}>
          <View style={styles.camera}>
              <MyCamera takePhoto={this.takePhoto.bind(this)}/>
          </View>
          <View>
              <Text title="(Teammate photobombs are encouraged)" style={{fontSize: 40}} />
          </View>
        </View>
        ||
        <View style={styles.boardContainer}>
          <View style={styles.headerView}>
            <Text style={styles.header}> Townie Squares </Text><Text onPress={() => firebase.auth().signOut()}>
              Log Out
            </Text>        
          </View>
          <View style={styles.row}>
            {this.renderSquare(this.state.squares[0].index, this.state.squares[0].description, this.state.squares[0].photoPath, this.state.squares[0].marked)} 
            {this.renderSquare(this.state.squares[1].index, this.state.squares[1].description, this.state.squares[1].photoPath, this.state.squares[1].marked)}
            {this.renderSquare(this.state.squares[2].index, this.state.squares[2].description, this.state.squares[2].photoPath, this.state.squares[2].marked)}
            {this.renderSquare(this.state.squares[3].index, this.state.squares[3].description, this.state.squares[3].photoPath, this.state.squares[3].marked)}
          </View>
          <View style={styles.row}>
            {this.renderSquare(this.state.squares[4].index, this.state.squares[4].description, this.state.squares[4].photoPath, this.state.squares[4].marked)}
            {this.renderSquare(this.state.squares[5].index, this.state.squares[5].description, this.state.squares[5].photoPath, this.state.squares[5].marked)}
            {this.renderSquare(this.state.squares[6].index, this.state.squares[6].description, this.state.squares[6].photoPath, this.state.squares[6].marked)}
            {this.renderSquare(this.state.squares[7].index, this.state.squares[7].description, this.state.squares[7].photoPath, this.state.squares[7].marked)}
          </View>
          <View style={styles.row}>
            {this.renderSquare(this.state.squares[8].index, this.state.squares[8].description, this.state.squares[8].photoPath, this.state.squares[8].marked)}
            {this.renderSquare(this.state.squares[9].index, this.state.squares[9].description, this.state.squares[9].photoPath, this.state.squares[9].marked)}
            {this.renderSquare(this.state.squares[10].index, this.state.squares[10].description, this.state.squares[10].photoPath, this.state.squares[10].marked)}
            {this.renderSquare(this.state.squares[11].index, this.state.squares[11].description, this.state.squares[11].photoPath, this.state.squares[11].marked)}
          </View>
          <View style={styles.row}>
            {this.renderSquare(this.state.squares[12].index, this.state.squares[12].description, this.state.squares[12].photoPath, this.state.squares[12].marked)}
            {this.renderSquare(this.state.squares[13].index, this.state.squares[13].description, this.state.squares[13].photoPath, this.state.squares[13].marked)}
            {this.renderSquare(this.state.squares[14].index, this.state.squares[14].description, this.state.squares[14].photoPath, this.state.squares[14].marked)}
            {this.renderSquare(this.state.squares[15].index, this.state.squares[15].description, this.state.squares[15].photoPath, this.state.squares[15].marked)}
          </View>
          <ListView style={styles.ListView}
            enableEmptySections
            dataSource={this.dataSource}
            renderRow={this.renderRow}
          />
          <CardSection style={styles.messageInput} >
            <Input
              placeholder="Enter trash talk here."
              label="Group Message"
              value={this.state.newMessage}
              onChangeText={newMessage => this.setState({ newMessage })}
            />
            <Text onPress={()=>{this.sendMessage(teamName, this.state.newMessage)}}>SEND</Text>
          </CardSection>
        </View>
      } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'stretch',
    flex: 1,
    backgroundColor: 'skyblue',
  },
  camera: {
    flex: 1,
  },
  cameraContainer: {
    alignItems: 'stretch',
    flex: 1,
  },
  boardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
  },
  headerView: {
    backgroundColor: '#51C8FF',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  header: {
    fontSize: 30,
    padding: 4,
    color: 'white'
  },
  row: {
    flexDirection: 'row',
    margin: 0,
    padding: 0,
  },
  ListView: {
    flexGrow:1, // Not sure if this is doing anything
  },  
  messageInput: {
    backgroundColor: 'skyblue',
  },
});

const mapStateToProps = (state) => {
  const messages = _.map(state.messages, (val, uid) => {
    return { ...val, uid };
  });
  const { teamName, gameId, custom } = state.gameForm;
  console.log('Home mapStateToProps');
  console.log(gameId);
  console.log(custom);
    console.log('Home mapStateToProps');
  return { messages, gameId, custom };
};

export default connect(mapStateToProps, { messagesGet, gameUpdate })(Home);
