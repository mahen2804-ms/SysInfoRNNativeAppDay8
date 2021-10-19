import React, {useEffect} from 'react';
import {View, Text, useWindowDimensions, Image, StatusBar} from 'react-native';
import FastImage from 'react-native-fast-image';

const Details = ({route, navigation: {setOptions}}) => {
  const {headerBackTitle, item} = route.params;
  const {width: screenWidth} = useWindowDimensions();
  console.warn(item);
  useEffect(() => {
    setOptions({
      headerBackTitle,
    });
  }, [setOptions, headerBackTitle]);

  console.warn(item.url);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        hidden
        // translucent
        // backgroundColor="transparent"
        // barStyle="light-content"
      />
      <FastImage
        source={{
          uri: `${item.url}.png`,
          priority: FastImage.priority.normal,
          'Content-Type': 'image/png',
        }}
        style={{
          height: 240,
          width: screenWidth,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text>Details Page</Text>
    </View>
  );
};

export default Details;
