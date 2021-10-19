import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, View, FlatList, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { RectButton } from 'react-native-gesture-handler';
import Divider from '../../components/Divider';
import Typography from '../../components/Typography';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import Button from '../../components/Button';

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const translateX = useSharedValue(0);
  const scale = useSharedValue(1);

  const loadData = useCallback(async () => {
    try {
      const res = await axios.get(
        'https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10',
      );
      setData(res.data);
    } catch (error) { }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const renderItem = ({ item }) => {
    return (
      <RectButton
        onPress={() =>
          navigation.navigate('DetailsPage', { headerBackTitle: 'Home' })
        }
        key={item.id}
        style={{
          height: 200,
          aspectRatio: 3 / 2,
          borderRadius: 10,
        }}>
        <FastImage
          source={{
            uri: item.url,
          }}
          style={{
            flex: 1,
            borderRadius: 10,
          }}
          resizeMode="cover"
        />
        <View
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            bottom: 0,
            left: 0,
            flex: 1,
            height: 60,
            backgroundColor: '#3d3d3d',
            opacity: 0.6,
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
          }}>
          <Typography variant="body1" style={{ padding: 8, color: '#fff' }}>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique,
            dolores.
          </Typography>
        </View>
      </RectButton>
    );
  };

  const keyExtractor = item => `${item.id}`;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: withTiming(translateX.value, {
            duration: 1000,
          }),
        },
        {
          scale: withTiming(scale.value, {
            duration: 500,
          }),
        },
      ],
    };
  });

  const moveBall = () => {
    translateX.value = 200;
    scale.value = 1.2;
  };

  return (
    <ScrollView style={{ flex: 1 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        contentContainerStyle={{ padding: 20 }}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={330}
      />
      <Animated.View
        style={[
          {
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: 'red',
          },
          animatedStyle,
        ]}
      />
      <Button title="Move ball" onPress={moveBall} />
      <Button title="Move ball" onPress={() => {
        navigation.navigate('Animation');
      }} />
    </ScrollView>
  );
};

export default Home;
``;
