import { MaterialCommunityIcons } from '@expo/vector-icons';
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
import { Personal } from './screens/Personal';
import { Recent } from './screens/Recent';
import { Upload } from './screens/Upload';
import './App.css';
import { HeaderLeft, HeaderRight } from './utils';

global.Buffer = global.Buffer || Buffer;

const Tab = createBottomTabNavigator();

function TabNavigator() {
  const tabBarIcon = ({ color, size }: { color: string; size: number }) => (
    <MaterialCommunityIcons name="home" color={color} size={size} />
  );

  return (
    <Tab.Navigator
      initialRouteName="Personal"
      screenOptions={{
        tabBarActiveTintColor: '#804694',
        tabBarActiveBackgroundColor: Colors.dark.inputBackground,
        tabBarInactiveBackgroundColor: Colors.dark.inputBackground,
        tabBarStyle: styles.tabBarStyle,
      }}>
      <Tab.Screen
        name="Recent"
        component={Recent}
        options={{
          tabBarIcon,
          headerStyle: styles.headerStyle,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight title="Recent" />,
        }}
      />
      <Tab.Screen
        name="Personal"
        component={Personal}
        options={{
          tabBarIcon,
          headerStyle: styles.headerStyle,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight title="Personal" />,
        }}
      />
      <Tab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon,
          headerStyle: styles.headerStyle,
          headerLeft: () => <HeaderLeft />,
          headerRight: () => <HeaderRight title="Upload" />,
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

const styles = {
  headerStyle: {
    backgroundColor: Colors.dark.inputBackground,
    borderBottomColor: '#303030',
    borderBottomWidth: 1,
    maxHeight: 55,
  },
  tabBarStyle: {
    borderTopColor: Colors.dark.background,
    borderTopWidth: 0,
  },
};

export default registerRootComponent(App);
