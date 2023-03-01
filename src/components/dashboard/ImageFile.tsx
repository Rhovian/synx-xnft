import React from 'react';
import { View, Image } from 'react-native';

// @ts-ignore
const ImageFile = ({ uri }) => {
  return (
    <View>
      <Image source={{ uri }} />
    </View>
  );
};
