import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState, useContext } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { Colors, REGULAR } from '../constants';

export function Balance() {
  const globalContext = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Image
            style={{ width: 20, height: 20, resizeMode: 'cover' }}
            source={require('../assets/sol-logo.png')}
          />
        </View>
        <View style={{ paddingLeft: 3 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
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
            source={require('../assets/shdw-logo.png')}
          />
        </View>
        <View style={{ paddingLeft: 3 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            {globalContext.shdwBalance.toFixed(2)} SOL
          </Text>
        </View>
      </View>
      <View style={styles.row}>
        <div>
          <MaterialCommunityIcons name="file-document" size={20} color="grey" />;
        </div>
        <View style={{ paddingLeft: 1 }}>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 13,
              color: Colors['dark'].text,
              textAlign: 'center',
              fontFamily: REGULAR,
            }}>
            {99} %
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
    backgroundColor: Colors['dark'].inputBackground,
    minHeight: 50,
    maxWidth: '100vw',
  },
  row: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
