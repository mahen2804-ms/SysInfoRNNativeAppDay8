import React from 'react';
import {View} from 'react-native';

const Divider = ({style}) => {
  return <View style={[{height: 1, backgroundColor: 'red'}, style]} />;
};

export default Divider;
