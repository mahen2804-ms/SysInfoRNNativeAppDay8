import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, useWindowDimensions, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RectButton} from 'react-native-gesture-handler';
import Divider from '../../components/Divider';
import Typography from '../../components/Typography';

const Gallery = ({navigation}) => {
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const {width: screenWidth} = useWindowDimensions();

  // Component Did mount
  useEffect(() => {
    loadData(page);
  }, [page]);

  const loadData = async page => {
    try {
      const res = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=10`,
      );
      setData(val => {
        return [...val, ...res.data];
      });
    } catch (error) {}
  };

  const renderItem = ({item}) => {
    return (
      <RectButton
        onPress={() =>
          navigation.navigate('DetailsPage', {headerBackTitle: 'Gallery', item})
        }
        style={{
          alignItems: 'center',
        }}>
        <View style={{maxWidth: 500, width: screenWidth}}>
          <FastImage
            source={{
              uri: `${item.url}.png`,
            }}
            style={{
              height: 240,
              flex: 1,
            }}
            resizeMode="cover"
          />
          <Typography
            variant="h3"
            style={{
              padding: 10,
            }}>
            {item.title}
          </Typography>
        </View>
      </RectButton>
    );
  };

  const keyExtractor = item => `${item.id}`;

  const onEndReached = () => {
    setPage(val => val + 1);
  };

  //   console.warn(data.length);

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => (
        <View style={{alignItems: 'center', marginVertical: 10}}>
          <Divider style={{maxWidth: 500, width: screenWidth}} />
        </View>
      )}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.6}
    />
  );
};

export default Gallery;
