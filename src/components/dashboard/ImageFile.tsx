import React from 'react';
import { View, Image } from 'react-native';

import { Colors } from '../../constants';

// @ts-ignore
export const ImageFile = ({ uri }) => {
  return (
    <View style={{ backgroundColor: Colors.dark.background }}>
      <Image source={{ uri }} />
    </View>
  );
};
