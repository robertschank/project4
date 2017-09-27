import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  COLOR_PRIMARY,
} from '../styles/commonStyles';

const Button = ({ buttonColor, onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, {borderColor:buttonColor}]}>
      <Text style={[textStyle, {color:buttonColor}]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: COLOR_PRIMARY,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0)',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: COLOR_PRIMARY,
    marginLeft: 5,
    marginRight: 5,
  }
};

export { Button };
