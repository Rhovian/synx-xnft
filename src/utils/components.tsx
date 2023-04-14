import React from 'react';
import { View, ActivityIndicator, Text, Image } from 'react-native';

import { BOLD, Colors } from '../constants';

export function FullScreenLoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.background,
      }}>
      <ActivityIndicator color="#eee" />
    </View>
  );
}

/** App header components */

export const HeaderRight = ({ title }) => {
  return (
    <div style={{ width: '100%' }}>
      <Text
        style={{
          color: Colors.dark.text,
          fontSize: 19,
          paddingLeft: 5,
          fontFamily: BOLD,
        }}>
        {title}
      </Text>
    </div>
  );
};

export const HeaderLeft = () => {
  return (
    <div>
      <Image
        style={{ marginLeft: 10, width: 40, height: 40, resizeMode: 'cover' }}
        source={require('../assets/synx-logo.png')}
      />
    </div>
  );
};

export const ItemSeparatorComponent = () => (
  <View
    style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
  />
);
