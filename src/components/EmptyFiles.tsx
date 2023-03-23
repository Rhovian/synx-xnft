import React from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import { Colors, MEDIUM } from '../constants';

export const EmptyFiles = () => {
  return (
    <View style={styles.container}>
      <View>
        <Image source={require('../assets/empty-state.png')} style={styles.image} />
        <Text style={styles.text}>No files found</Text>
      </View>
      <View style={styles.buttonsWrapper}>
        <TouchableOpacity style={styles.buttonRed}>Create Vault</TouchableOpacity>
        <TouchableOpacity style={styles.buttonBlue}>Upload File</TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0.5,
    width: '100%',
    paddingVertical: 30,
  },
  image: {
    width: 100,
    height: 100,
    cover: 'contain',
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: MEDIUM,
    textAlign: 'center',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    color: Colors.dark.text,
    fontFamily: MEDIUM,
  },
  buttonBlue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.purple,
  },
  buttonRed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.red,
  },
});
