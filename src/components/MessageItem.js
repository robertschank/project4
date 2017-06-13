import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, CardSection } from './common';

class MessageItem extends Component {

  render() {
    const { text, author, time, color } = this.props.message;

    return (
        <View >
          <CardSection backgroundColor={{color}} style={styles.container}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.time}>{time}</Text>
          </CardSection>
          { if (this.props.snapshot) {<Button> Have a look</Button>}}
        </View>
    );
  }
}

const styles = {
  container: {
    // backgroundColor: 'skyBlue',
    justifyContent: 'space-between',
    flex: 1,
  },
  author: {
    // paddingRight: '5',
  },
  text: {
    fontSize: 18,
    paddingLeft: 5,
    flexGrow: 1,
    width: 60,
  },
  time: {
  },
};

export default MessageItem;
