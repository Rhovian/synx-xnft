import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { GlobalContext } from '../../GlobalProvider';
import { Colors, REGULAR } from '../../constants';

export function Balance() {
  const globalContext = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Image
            style={{ width: 20, height: 20, resizeMode: 'cover' }}
            source={require('../../assets/sol-logo.png')}
          />
        </View>
        <View style={{ paddingLeft: 3 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 14,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            {globalContext.solBalance.toFixed(2)} SOL
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <View>
          <Image
            style={{ width: 20, height: 20, resizeMode: 'cover' }}
            source={require('../../assets/shdw-logo.png')}
          />
        </View>
        <View style={{ paddingLeft: 3 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 14,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            {globalContext.shdwBalance.toFixed(2)} SOL
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 15,
  },
  row: {
    width: '50%',
    paddingRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
