import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Colors, BOLD, MEDIUM, REGULAR } from '../../constants';

// @ts-ignore
export const FileInfo = ({ fileInfo }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <div style={styles.iconWrapper}>{fileInfo.icon}</div>
      <div style={styles.infoContainer}>
        <Text style={styles.name}>{fileInfo.name.slice(0, 16)}...</Text>
        <Text style={styles.subInfo}>Last modified: 1/1/2021</Text>
      </div>
      <TouchableOpacity
        style={styles.immutableButton}
        onPress={() => console.log('go to file viewer')}>
        <Text style={{ fontSize: 12, color: Colors.dark.text, fontFamily: MEDIUM }}>
          {fileInfo.size}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Colors.dark.innerBackground,
    minHeight: 50,
    borderRadius: 6,
  },
  iconWrapper: {
    paddingLeft: 8,
  },
  name: {
    fontSize: 14,
    color: Colors.dark.text,
    fontFamily: BOLD,
    textAlign: 'left',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  subInfo: {
    fontSize: 9,
    color: 'grey',
    fontFamily: REGULAR,
  },
  immutableButton: {
    fontSize: 12,
    color: Colors.dark.text,
    fontFamily: BOLD,
    flexGrow: 1,
    display: 'flex',
    textAlign: 'end',
    paddingRight: 8,
  },
});
