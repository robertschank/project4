// Import libraries for making a component
import React from 'react';
import { Text, View } from 'react-native';
import { COLOR_HEADER_TEXT, COLOR_PRIMARY } from '../styles/commonStyles';

// Make a component
const Header = (props) => {
  const { textStyle, viewStyle } = styles;

  return (
    <View style={viewStyle}>
      <Text style={textStyle}>{props.headerText}</Text>
    </View>
  );
};

const styles = {
  viewStyle: {
    backgroundColor: COLOR_PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    paddingTop: 10,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 27 },
    // shadowOpacity: 0.9,
    elevation: 2,
    position: 'relative'
  },
  textStyle: {
    fontSize: 20,
    color: COLOR_HEADER_TEXT,
  }
};

// Make the component available to other parts of the App
export { Header };
