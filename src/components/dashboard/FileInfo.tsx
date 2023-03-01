import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, BOLD } from '../../constants';

// @ts-ignore
export const FileButton = ({ fileInfo, onPress, style }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.soundtabs}>
        <View style={styles.soundtabInner}>
          <Text allowFontScaling={false} style={styles.soundtabText}>
            Create New Vault
          </Text>
        </View>
        <View style={{ height: 50, justifyContent: 'center' }}>
          <Image style={styles.sheetImage} source={require('../../assets/create_vault.png')} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
  },
  titleBalancesWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  soundtabs: {
    backgroundColor: '#322A3D',
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    // marginVertical:5,
    borderBottomWidth: 1,
    borderBottomColor: '#4B3656',
    borderRadius: 5,
  },
  soundtabInner: { height: 50, justifyContent: 'center' },
  soundtab: {
    backgroundColor: '#322A3D',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    // marginVertical:5,
    // borderRadius:5
  },
  soundtabText: {
    color: '#fff',
    fontFamily: BOLD,
    fontSize: 12,
  },
  sheetImage: { width: 24, height: 24 },
  spacer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
});
