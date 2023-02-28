import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';

import { Colors, BOLD } from '../constants';

// @ts-ignore
export default function BackButton({ goBack, title }) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity onPress={goBack} style={{ paddingLeft: 10 }}>
        <Icon name="left" size={18} type="antdesign" color={Colors['dark'].text} />
      </TouchableOpacity>
      <View style={{ paddingRight: 30 }}>
        <Text
          allowFontScaling={false}
          style={{ fontSize: 21, color: Colors['dark'].text, fontFamily: BOLD }}>
          {title}
        </Text>
      </View>

      {title ? (
        <View>
          {/* <Icon
          name='bell'
          type='evilicon'
          size={30}
          color={Colors['dark'].text}
        /> */}
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}
