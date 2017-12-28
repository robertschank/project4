import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { CardSection } from './common';

class MessageItem extends Component {

  render() {
    const { text, author, time, color } = this.props.message;

    return (
        <View >
          <CardSection backgroundColor={{color}} style={styles.container}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', flex: 1}}>
              <Text style={styles.author}>{author}</Text>
              <Text style={styles.time}>{time}</Text>
            </View>
            <View style={{paddingLeft: 10}}>
              <Text style={styles.text}>{text}</Text>
            </View>
          </CardSection>
        </View>
    );
  }
}

const styles = {
  container: {
    // backgroundColor: 'skyBlue',
    // justifyContent: 'space-between',
    flexDirection: 'column',
    // flex: 1,
  },
  author: {
    // paddingRight: '5',
  },
  text: {
    fontSize: 18,
    paddingLeft: 5,
    flex: 1,
  },
  time: {
  },
};

export default MessageItem;
