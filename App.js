import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeIcon from './assets/Icons/home.svg';
import SettingsIcon from './assets/Icons/settings.svg';
import CollectionsIcons from './assets/Icons/collections.svg';
import { useColorScheme } from 'react-native';
import { CustomDarkTheme, CustomLightTheme } from './theme/theme';

const Stack = createNativeStackNavigator();

const HomeStack = createNativeStackNavigator();

const GalleryStack = createNativeStackNavigator();

const SettingsStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const HomeStackNavigation = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        options={{
          title: 'Home',
        }}
        name="HomePage"
        getComponent={() => require('./screens/Home').default}
      />
      <HomeStack.Screen
        options={{
          title: 'Animation',
        }}
        name="Animation"
        getComponent={() => require('./screens/Animation').default}
      />
    </HomeStack.Navigator>
  );
};

const GalleryStackNavigation = () => {
  return (
    <GalleryStack.Navigator>
      <GalleryStack.Screen
        name="GalleryPage"
        getComponent={() => require('./screens/Gallery').default}
      />
    </GalleryStack.Navigator>
  );
};

const SettingsStackNavigation = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name="SettingsPage"
        getComponent={() => require('./screens/Settings').default}
      />
      <SettingsStack.Screen
        name="ChangePassword"
        getComponent={() => require('./screens/ChangePassword').default}
      />
    </SettingsStack.Navigator>
  );
};

const HomeTabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ color, focused, size }) => {
            switch (route.name) {
              case 'Home':
                return <HomeIcon height={size} width={size} fill={color} />;
              case 'Gallery':
                return (
                  <CollectionsIcons height={size} width={size} fill={color} />
                );
              case 'Settings':
                return <SettingsIcon height={size} width={size} fill={color} />;
              default:
                return null;
            }
          },
          headerShown: false,
        };
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigation} />
      <Tab.Screen name="Gallery" component={GalleryStackNavigation} />
      <Tab.Screen name="Settings" component={SettingsStackNavigation} />
    </Tab.Navigator>
  );
};

const App = () => {
  const navigationRef = useNavigationContainerRef();
  const scheme = useColorScheme();

  const onReady = async () => {
    try {
      const res = await AsyncStorage.getItem('@user_info');
      if (res) {
        const user = JSON.parse(res);
        if (user.accessToken) {
          navigationRef.reset({
            index: 0,
            routes: [{ name: 'Home' }],
          });
        }
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      theme={scheme === 'dark' ? CustomDarkTheme : CustomLightTheme}>
      <Stack.Navigator>
        <Stack.Group
          screenOptions={{
            headerTransparent: true,
            headerShadowVisible: false,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 24,
              color: 'red',
              fontWeight: '700',
            },
          }}>
          <Stack.Screen
            name="Login"
            getComponent={() => require('./screens/Login').default}
          />
          <Stack.Screen
            name="Register"
            getComponent={() => require('./screens/Register').default}
          />
        </Stack.Group>
        <Stack.Group
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeTabNavigation} />
        </Stack.Group>
        <Stack.Screen
          options={{
            title: 'Details',
            headerTransparent: true,
            headerShadowVisible: false,
          }}
          name="DetailsPage"
          getComponent={() => require('./screens/Details').default}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
