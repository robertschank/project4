import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

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
        </View>
    );
  }
}

const styles = {
  container: {
    // backgroundColor: 'skyBlue',
    justifyContent: 'space-between',
  },
  author: {

  },
  text: {
    fontSize: 18,
    paddingLeft: 15,
  },
  time: {
  },
};

export default MessageItem;
