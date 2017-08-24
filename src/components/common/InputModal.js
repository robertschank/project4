import React from 'react';
import { Modal, Text, TextInput, View } from 'react-native';
import { connect } from 'react-redux';

import { CardSection } from './CardSection';
import { Button } from './Button';

const InputModal = ({ handleChangeText, value, visible }) => {
  const { containerStyle, cardSectionStyle, textStyle } = styles;

  return (
    <Modal
      visible = {visible}
      transparent
      animationType="slide"
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <TextInput
            style = {textStyle}
            editable = {{false}}
            autoFocus
            multiline = {false}
            placeholder = "Enter trash talk here."
            label = "Group Message"
            value = {value}
            onChangeText = {handleChangeText}
          /><Text>Send</Text>
        </CardSection>
      </View>
    </Modal>
  );
};

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 5,
  },
  textStyle: {
    flex: 1,
    fontSize: 22,
    textAlign: 'left',
    lineHeight: 26
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center'
  }
};

export { InputModal };
