import React from 'react';
import { View, StatusBar, StatusBarStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function CustomStatusBar({
  // @ts-ignore
  backgroundColor,
  barStyle = 'light-content',
  //add more props StatusBar
}) {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ height: insets.top, backgroundColor }}>
      <StatusBar animated backgroundColor={backgroundColor} barStyle={barStyle as StatusBarStyle} />
    </View>
  );
}
