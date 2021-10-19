import React from 'react';
import {Text} from 'react-native';
import {useTheme} from '@react-navigation/native';
import styles from './styles';

const Typography = ({children, variant, style, ...rest}) => {
  const {colors} = useTheme();
  return (
    <Text
      style={[styles[variant], {color: colors.text}, style]}
      allowFontScaling={false}
      {...rest}>
      {children}
    </Text>
  );
};

export default Typography;
