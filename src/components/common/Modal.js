import React from 'react';
import { Image, Modal, Text, View, } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';
import { COLOR_HEADER_TEXT, COLOR_BACKGROUND, COLOR_PRIMARY, COLOR_PRIMARY_LIGHT, COLOR_PRIMARY_MID } from '../styles/commonStyles';

const MyModal = ({ children, imageRef, message, visible, option1, option2, onOption1, onOption2 }) => {
  const { containerStyle, cardSectionStyle, imageStyle, modalStyle, textStyle } = styles;

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
          // style={{width: 200, height: 200}}
          style={imageStyle}
          source={{uri: imageRef}}
        />
        <CardSection style={{marginBottom: 10, backgroundColor: COLOR_BACKGROUND}} >
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
    borderWidth: 2,
    borderColor: COLOR_PRIMARY_MID,
    margin: 30,
    backgroundColor: COLOR_BACKGROUND,
  },
  cardSectionStyle: {
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
    marginTop: 10,
  },
  textStyle: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 40,
    // color: 'white',
    color: COLOR_PRIMARY_MID
  },
  imageStyle: {
    width: 300,
    height: 300,
    borderRadius: 8,
    alignSelf: 'center',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
};

export { MyModal };
