'use strict'
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  AppRegistry,
  Button,
  Image,
  KeyboardAvoidingView,
  ListView,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Camera from 'react-native-camera';
import { takeSnapshot, dirs } from "react-native-view-shot";
import RNFetchBlob from 'react-native-fetch-blob';
import firebase from 'firebase';
import _ from 'lodash';

import { messagesGet } from '../actions';
import { gameUpdate } from '../actions';
import { Square } from './Square';
import { MyCamera } from './MyCamera';
import MessageItem from './MessageItem';
import { Card, CardSection, Confirm, Input } from './common';
import { containerColor } from '../constants/Colors';

const styles = require('../styles/dist/sass/main.js')

let squaresArray = [];

// Snapshot built in directories for phone storage
const { CacheDir, DocumentDir, MainBundleDir, MovieDir, MusicDir, PictureDir } = dirs;

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

    // const gameId = this.props.gameId;
    console.log(this.props.gameId);
    console.log("CUSTOMMMMMMMM");
    console.log(this.props.custom);
    // gameId = this.props.gameId;
    // teamName = this.props.teamName;


    // (Not So) Hard Coded Descriptions
    const customSquares = this.props.customSquares;
    console.log('HOME.JS, CUSTOMSQUARES: ' + customSquares);
    // let descriptionsArray = [
          // 'Tie Dye',
          // 'Leather Jacket',
    //       customSquaresArray[0],
    //       customSquaresArray[1],
    //       'Red Shirt',
    //       'Hands Full',
    //       'Balloon',
    //       'Dog',
    //       'Tattoo',
    //       'Out of Place',
    //       'Flatbrim',
    //       'Eating on the Run',
    //       'Jersey',
    //       'Basic',
    //       'Pizza!',
    //       'Free Space',
    //       'Suit',
    //       'Sweatpants',
    // ];

    let pickFromDescriptions = [
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

    console.log('selectSquareDescriptions');

    //Create blank square indices array from 0 to 15
    let blankSquareIndices = [];
    for (let i = 0; i < 16; i++) {
      blankSquareIndices.push(i);
    }
    console.log(blankSquareIndices);

    // Create a 16 element empty array to fill in with custom descriptions
    // and randomly selected descriptions!
    let descriptionsArray = [];
    for (let i = 0; i < 16; i++) {
      descriptionsArray.push(null);
    }
    console.log(descriptionsArray);

    // assign the custom squares to the randomly selected square indices.
    for (let i = 0; i < customSquares.length; i++) {
      //select a random index from the sortedArray
      let randomFromIndexArray = Math.floor(Math.random()*(blankSquareIndices.length));
      // Grab the number at that point in the array
      let squareIndex = blankSquareIndices[randomFromIndexArray];
      // Assign each custom description to the random index
      descriptionsArray[squareIndex] = customSquares[i];
      // Remove the random index from the index array so there are no repeats
      blankSquareIndices.splice(randomFromIndexArray, 1);
    }
    console.log(descriptionsArray);

    // Now fill in the rest of the empty elements of descriptionsArray:
    // the array blankSquareIndices is keeping track of what squares
    // are still blank

    // For each blank square:
    for (let i = 0; i < (blankSquareIndices.length); i++) {
      //select a random description from pickFromDescriptions:
      let randomDescriptionIndex = Math.floor(Math.random()*(pickFromDescriptions.length));
      // Grab the description at that point in the array
      let randomDescription = pickFromDescriptions[randomDescriptionIndex];
      // Assign the random description to the blank square
      descriptionsArray[blankSquareIndices[i]] = randomDescription;
      // Remove the selected description from the pickFromDescriptions array so there are no repeats
      pickFromDescriptions.splice(randomDescriptionIndex, 1);
    }
    console.log(descriptionsArray);

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
      // snapshotview stuff
      error: null,
      res: null,
      value: {
        format: "png",
        quality: 0.9,
        result: "file",
        snapshotContentContainer: false,
      },
    };
  } // End Constructor

  //   state = {
  //   previewSource: catsSource,
  //   error: null,
  //   res: null,
  //   value: {
  //     format: "png",
  //     quality: 0.9,
  //     result: "file",
  //     snapshotContentContainer: false,
  //   },
  // };

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
        this.props.messagesGet(this.props.gameId);
    this.sendMessage('Ref', `Hey people, welcome to Townie Squares! This is a group message area for all teams. We'll send game updates in here too. Remember, this is a game of integrity and honor. It's up to you to match your photos to the given description. Have fun out there!`);
    this.sendMessage('Ref', `${this.props.teamName} joined the game.`);
  }


  uploadSnapshot = () => {
    console.log('SNAPSHOT');
    takeSnapshot(this.refs["board"], { path: PictureDir+"/foo.png" })
    .then(
      uri => this.uploadImage(uri, "NAMEY"), //console.log("Image saved to", uri), //HERE IS WHERE IM IMPLEMENTING REACT-NATIVE-FETCH-BLOB
      error => console.error("Oops, snapshot failed", error),
    ); // end .then
  }

  uploadImage(uri, imageName, mime = 'image/jpg'){
        const Blob = RNFetchBlob.polyfill.Blob
    const fs = RNFetchBlob.fs
    window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
    window.Blob = Blob
    console.log('uploadImage: RIGHT BEFORE RETURN')
    return new Promise((resolve, reject) => {
      // const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri
        const uploadUri = uri;
        let uploadBlob = null
        const imageRef = firebase.storage().ref('posts').child(imageName)
        fs.readFile(uploadUri, 'base64')
        .then((data) => {
          return Blob.build(data, { type: `${mime};BASE64` })
        })
        .then((blob) => {
          uploadBlob = blob
          return imageRef.put(blob, { contentType: mime })
        })
        .then(() => {
          uploadBlob.close()
          return imageRef.getDownloadURL()
        })
        .then((url) => {
          resolve(url)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  uploadToStorage(x){  // CURRENTLY NOT IN USE (react-native-firebase)
    console.log('uploadToStorage');
    console.log(x);

    // mediaFile = new File(x + "IMG_" + timeStamp + ".jpg");

    var file = x;

    // Create the file metadata
    var metadata = {
      contentType: 'image/jpeg'
    };

    // Firebase Storage Stuff
    // Get a reference to the storage service, which is used to create references in your storage bucket
    const storage = firebase.storage();

    // Create a storage reference from our storage service
    const storageRef = storage.ref();
    const gameStorageRef = storageRef.child(`games/${this.props.gameId}`);

    // Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = gameStorageRef.child('snapshotview/' + file.name).put(file, metadata);

    // Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
      function(snapshot) {
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case firebase.storage.TaskState.PAUSED: // or 'paused'
            console.log('Upload is paused');
            break;
          case firebase.storage.TaskState.RUNNING: // or 'running'
            console.log('Upload is running');
            break;
        }
      }, function(error) {

      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;

        case 'storage/canceled':
          // User canceled the upload
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    }, function() {
      // Upload completed successfully, now we can get the download URL
      var downloadURL = uploadTask.snapshot.downloadURL;
    });

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

  takePhoto = (path) => {
    console.log('takePhoto');

    this.sendMessage("Ref", `Whoa, ${this.props.teamName} completed a square!`)
    const index = this.state.clickedSquareIndex;

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

    // Check For Win:
    const colMarked = index%4;
    console.log('COLMARKED' + colMarked);
    console.log('THIS.STATE.COLCOUNT: ' + this.state.colCount);
    var currentColCount = this.state.colCount;
    console.log('CURRENTCOLCOUNT: ' + currentColCount);
    currentColCount[colMarked]++;
    if (currentColCount[colMarked] >= 4) {
      console.log('YOU WIN!!!');
      this.sendMessage("Ref", `Lookout! ${this.props.teamName} got bingo!!`)

      // Take a snapshot of the board to send to firebase storage
      // console.log('SNAPSHOT')
      // console.log('showCamera: ' + this.state.showCamera)
      // takeSnapshot(this.refs["board"], { path: PictureDir+"/foo2.png" })
      //   .then(
      //     uri => console.log("Image saved to", uri),
      //     error => console.error("Oops, snapshot failed", error)
      //   );
    } // end column win if
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
      this.sendMessage("Ref", `Look Out, ${this.props.teamName} got bingo!!`)
    } // end row win if
    console.log('CURRENTColCount: ' + currentRowCount);


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

  renderModal() {
    return (<Confirm />)
  }

  // TODO
  // renderBoard() {
  //   return <Board 
  //   />
  
  render() {
    console.log('HOME.js this.state.photoUri: ' + this.state.photoUri);
    console.log('showCamera' + this.state.showCamera)
    return (
      <View style={styles.container} behavior="height">
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
          <View ref="board" style={styles.boardView}>
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
          </View>
          <ListView style={styles.ListView}
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
     

         {/*} {this.renderModal()} 
                  <Confirm
          visible={true}
        >
          Are you sure you want to delete this?
        </Confirm>

       */}
        </View>
      } 
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

export default connect(mapStateToProps, { messagesGet, gameUpdate })(Home);
