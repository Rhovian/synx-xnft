import React from 'react';
import { View, ActivityIndicator } from 'react-native';

import { Colors } from '../constants';

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
