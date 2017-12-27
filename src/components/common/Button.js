import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import {
  COLOR_PRIMARY,
} from '../styles/commonStyles';

const Button = ({ buttonColor, onPress, children }) => {
  const { buttonStyle, textStyle } = styles;
  return (
    <TouchableOpacity onPress={onPress} style={[buttonStyle, {borderColor:buttonColor||COLOR_PRIMARY}]}>
      <Text style={[textStyle, {color:buttonColor||COLOR_PRIMARY},]}>
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
    borderRadius: 0,
    borderWidth: 2,
    borderColor: COLOR_PRIMARY,
    // marginLeft: 5,
    // marginRight: 5,
  }
};

export { Button };
