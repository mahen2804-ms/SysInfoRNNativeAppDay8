import {DarkTheme, DefaultTheme} from '@react-navigation/native';

export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#BB86FC',
    background: '#121212',
  },
};

export const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};
