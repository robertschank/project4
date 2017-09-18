import React from 'react';
import { Image, Modal, Text, View, } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';

const MyModal = ({ children, imageRef, message, visible, option1, option2, onOption1, onOption2 }) => {
  const { containerStyle, cardSectionStyle, modalStyle, textStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <View style={modalStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}>
            {message}
          </Text>
        </CardSection>
                <Image
          style={{width: 200, height: 200}}
          source={{uri: imageRef}}
        />
        <CardSection style={{marginBottom: 10}} >
          <Button onPress={onOption1}>{option1}</Button>
          <Button onPress={onOption2}>{option2}</Button>
        </CardSection>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalStyle: {
    borderRadius: 8,
    margin: 30,
    backgroundColor: 'white',
  },
  cardSectionStyle: {
    justifyContent: 'center',
    marginTop: 10,
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
};

export { MyModal };
