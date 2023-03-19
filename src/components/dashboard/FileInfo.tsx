import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, BOLD, MEDIUM, REGULAR } from '../../constants';

// @ts-ignore
export const FileInfo = ({ fileInfo, onPress, style }) => {
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        {fileInfo.icon}
        <div style={styles.infoContainer}>
          <Text style={styles.name}>{fileInfo.name.slice(0, 16)}...</Text>
        </div>
        <TouchableOpacity
          style={styles.immutableButton}
          onPress={() => console.log('go to file viewer')}>
          <Text style={{ fontSize: 12, color: Colors.dark.text, fontFamily: MEDIUM }}>
            {fileInfo.size}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 22,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    fontFamily: MEDIUM,
  },
  price: {
    fontSize: 18,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 0.5,
  },
  subInfo: {
    fontSize: 10,
    color: Colors.dark.text,
    fontFamily: REGULAR,
  },
  immutableButton: {
    fontSize: 12,
    color: Colors.dark.text,
    fontFamily: BOLD,
    flexGrow: 0.75,
    display: 'flex',
    textAlign: 'end',
    marginRight: 20,
  },
});
