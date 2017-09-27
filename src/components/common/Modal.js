import React from 'react';
import { Image, Modal, Text, View, } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';
import { 
  COLOR_HEADER_TEXT, 
  COLOR_BACKGROUND, 
  COLOR_PRIMARY, 
  COLOR_PRIMARY_LIGHT, 
  COLOR_PRIMARY_MID,
  COLOR_SECONDARY,
} from '../styles/commonStyles';

const MyModal = ({ buttonColor, children, imageRef, message, visible, option1, option2, onOption1, onOption2 }) => {
  const { buttonContainer, buttonStyle, containerStyle, modalHeaderStyle, imageStyle, modalStyle, textStyle } = styles;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <View style={modalStyle}>
          <View style={modalHeaderStyle}>
            <Text style={textStyle}>
              {message}
            </Text>
          </View>
          <Image
            // style={{width: 200, height: 200}}
            style={imageStyle}
            source={{uri: imageRef}}
          />
          <View style={buttonContainer}>
            <Button onPress={onOption1} buttonColor={buttonColor}>{option1}</Button>
            <Button onPress={onOption2} buttonColor={buttonColor}>{option2}</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalStyle: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLOR_SECONDARY,
    margin: 30,
    backgroundColor: COLOR_BACKGROUND,
  },
  modalHeaderStyle: {
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
    marginTop: 10,
    padding: 5,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative'
  },
  textStyle: {
    flex: 1,
    fontSize: 30,
    textAlign: 'center',
    lineHeight: 40,
    color: COLOR_SECONDARY,
    textDecorationLine: 'underline',
  },
  imageStyle: {
    width: 300,
    height: 300,
    borderColor: COLOR_PRIMARY_MID,
    borderWidth: 1,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    backgroundColor: COLOR_BACKGROUND,
    marginTop: 10,
    padding: 5,
    flexDirection: 'row',
    position: 'relative',
    marginBottom: 10,
  },
  buttonStyle: {
    backgroundColor: 'red',
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
};

export { MyModal };
