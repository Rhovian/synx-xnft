import { StackCardStyleInterpolator, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Animated } from 'react-native';

// @ts-ignore
import { FileViewer } from '../components/FileViewer';
import { VaultsList } from '../components/Vaults';
import { BOLD, Colors } from '../constants';
import { RootStackParamList } from '../models';

const Stack = createStackNavigator<RootStackParamList>();

const forSlide: StackCardStyleInterpolator = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted
          ),
        },
      ],
    },
  };
};

export const TokenListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}>
      <Stack.Screen
        name="Vaults"
        component={VaultsList}
        options={{
          title: 'Vaults',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTitleStyle: {
            color: Colors.dark.text,
            fontFamily: BOLD,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="FileViewer"
        component={FileViewer}
        options={{
          title: 'File Viewer',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTitleStyle: {
            color: Colors.dark.text,
            fontFamily: BOLD,
          },
        }}
      />
    </Stack.Navigator>
  );
};
