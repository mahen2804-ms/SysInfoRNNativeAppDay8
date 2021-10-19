import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../components/Button';
import ImagePicker from '../../components/ImagePicker';
import {RectButton} from 'react-native-gesture-handler';
import FastImage from 'react-native-fast-image';
import Typography from '../../components/Typography';
import ChevronRightIcon from '../../assets/Icons/chevron_right.svg';

const Settings = ({navigation}) => {
  const imagePickerRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const res = await AsyncStorage.getItem('@user_info');
        const resObj = JSON.parse(res);
        setUserInfo(resObj.user);
      } catch (error) {}
    };
    getUserInfo();
  }, []);

  const logout = async () => {
    try {
      await AsyncStorage.clear();
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    } catch (error) {}
  };

  const onImageSelect = value => {
    console.warn(value);
    setSelectedImage(value);
  };

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1}}>
        <RectButton
          onPress={() => {
            imagePickerRef.current.toggleImagePicker();
          }}
          style={{
            height: 100,
            width: 100,
            borderRadius: 50,
            backgroundColor: '#d3d3d3',
            alignSelf: 'center',
            marginVertical: 24,
          }}>
          {selectedImage && selectedImage?.assets[0]?.uri && (
            <FastImage
              source={{
                uri: selectedImage.assets[0].uri,
              }}
              style={{
                height: 100,
                width: 100,
                borderRadius: 50,
              }}
              resizeMode="cover"
            />
          )}
        </RectButton>
        <ImagePicker ref={imagePickerRef} onImageSelect={onImageSelect} />
        {userInfo && (
          <Typography
            style={{textAlign: 'center'}}
            variant="h2">{`${userInfo.firstName} ${userInfo.lastName}`}</Typography>
        )}
        <RectButton
          onPress={() => navigation.navigate('ChangePassword')}
          style={{
            marginVertical: 20,
            paddingHorizontal: 10,
            paddingVertical: 20,
            backgroundColor: '#F7F7F7',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Typography variant="h3" style={{flex: 1}}>
              Change Password
            </Typography>
            <ChevronRightIcon height={24} width={24} fill="#2D2D2D" />
          </View>
        </RectButton>
      </View>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default Settings;
