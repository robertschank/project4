import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Button, CardSection, Modal } from './common';

class MessageItem extends Component {

  renderButton(){
    if (this.props.message.url) {return(<Button > Have a look </Button>)} else return;
  }

  render() {
    const { text, author, time, color, url } = this.props.message;

    return (
        <View >
          <CardSection backgroundColor={{color}} style={styles.container}>
            <Text style={styles.author}>{author}</Text>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.time}>{time}</Text>
          </CardSection>
          { this.renderButton() }
        </View>
    );
  }
}

const styles = {
  container: {
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
