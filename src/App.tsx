import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from '@expo-google-fonts/dev';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Buffer } from 'buffer';
import { registerRootComponent } from 'expo';
import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { RecoilRoot } from 'recoil';

import { GlobalProvider } from './GlobalProvider';
import { Colors } from './constants';
import { CreateVault } from './screens/CreateVault';
import { TokenListNavigator } from './screens/TokenNavigator';
import './App.css';

global.Buffer = global.Buffer || Buffer;

const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Vaults"
      screenOptions={{
        tabBarActiveTintColor: '#804694',
        tabBarActiveBackgroundColor: Colors.dark.inputBackground,
        tabBarInactiveBackgroundColor: Colors.dark.inputBackground,
        tabBarStyle: {
          borderTopColor: Colors.dark.background,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        name="Recent"
        component={TokenListNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="All Files"
        component={TokenListNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="folder" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Upload"
        component={TokenListNavigator}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="cloudupload" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    // @ts-ignore
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen name="App" component={TabNavigator} />
      <HomeStack.Screen name="CreateVault" component={CreateVault} />
    </HomeStack.Navigator>
  );
}

function App() {
  const [fontsLoaded] = useFonts({
    'DMSans-Bold': require('./assets/fonts/DMSans-Bold.ttf'),
    'DMSans-Medium': require('./assets/fonts/DMSans-Medium.ttf'),
    'DMSans-Regular': require('./assets/fonts/DMSans-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <RecoilRoot>
      <GlobalProvider>
        <NavigationContainer>
          <HomeStackScreen />
        </NavigationContainer>
      </GlobalProvider>
    </RecoilRoot>
  );
}

export default registerRootComponent(App);
