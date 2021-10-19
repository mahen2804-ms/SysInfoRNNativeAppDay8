import React from 'react';
import {View} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {useTheme} from '@react-navigation/native';
import Typography from '../Typography';
import styles from './styles';

const Button = ({style, textStyle, title, ...rest}) => {
  const {colors} = useTheme();
  return (
    <RectButton
      style={[styles.btn, {backgroundColor: colors.primary}, style]}
      {...rest}>
      <View accessible accessibilityRole="button" accessibilityLabel="Login">
        <Typography variant="btnText" style={[styles.btnText, textStyle]}>
          {title.toUpperCase()}
        </Typography>
      </View>
    </RectButton>
  );
};

export default Button;
