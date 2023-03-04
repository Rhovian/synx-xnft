import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// @ts-ignore
export function FabUpload({ openBottomSheet, right, bottom, icon }) {
  return (
    <View style={{ position: 'absolute', zIndex: 999999999, right, bottom }}>
      <TouchableOpacity
        onPress={() => {
          openBottomSheet();
        }}
        style={{
          backgroundColor: 'none',
          height: hp('8'),
          width: wp('17'),
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        {icon}
      </TouchableOpacity>
    </View>
  );
}
