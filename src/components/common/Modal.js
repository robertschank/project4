import React from 'react';
import { Image, Modal, Text, View, } from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';
import { Card } from './Card';
import { 
  COLOR_HEADER_TEXT, 
  COLOR_BACKGROUND_TRANS, 
  COLOR_PRIMARY, 
  COLOR_PRIMARY_LIGHT, 
  COLOR_PRIMARY_MID,
  COLOR_SECONDARY_LIGHT,
} from '../styles/commonStyles';

const MyModal = ({ buttonColor, children, imageRef, message, visible, option1, option2, onOption1, onOption2, picWidth }) => {
  const { buttonContainer, buttonStyle, containerStyle, modalHeaderStyle, imageContainerStyle, imageStyle, modalStyle, textStyle } = styles;
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={containerStyle}>
        <View style={modalHeaderStyle}>
          <Text style={textStyle}>
            {message}
          </Text>
        </View>
        <View style={{alignSelf: 'center', width: picWidth}}>
          <View style={imageContainerStyle}>
            <Image
              style={{ height: picWidth }}
              source={{uri: imageRef}}
            />
          </View>
          <View style={buttonContainer}>
            <Button onPress={onOption1} buttonColor={buttonColor}>{option1}</Button>
            <View style={{width: 10}} />
            <Button onPress={onOption2} buttonColor={buttonColor}>{option2}</Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalHeaderStyle: {
    marginTop: -60,
    padding: 12,
    flexDirection: 'row',
    position: 'relative'
  },
  textStyle: {
    flex: 1,
    fontSize: 35,
    textAlign: 'center',
    lineHeight: 40,
    color: COLOR_SECONDARY_LIGHT,
  },
  imageContainerStyle: {
    borderWidth: 1,
    borderColor: COLOR_SECONDARY_LIGHT,
  },
  buttonContainer: {
    marginTop: 10,
    flexDirection: 'row',
    marginBottom: 10,
  },
  containerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  }
};

export { MyModal };
