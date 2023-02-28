import React from 'react';
import { TouchableOpacity, View, Image } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// @ts-ignore
export function FabUpload({ openBottomSheet }) {
  return (
    <View style={{ position: 'absolute', zIndex: 999999999, right: -125, bottom: 30 }}>
      <TouchableOpacity
        onPress={() => {
          openBottomSheet();
        }}
        style={{
          backgroundColor: '#824597',
          height: hp('8'),
          width: wp('17'),
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Image
          style={{
            alignSelf: 'center',
            width: 25,
            height: 25,
          }}
          source={require('../assets/Plus.png')}
        />
      </TouchableOpacity>
    </View>
  );
}
