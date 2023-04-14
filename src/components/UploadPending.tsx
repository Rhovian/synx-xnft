import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

import { Colors, MEDIUM } from '../constants';
import { HeaderRight } from '../utils';

export const UploadPending = () => {
  const navigation = useNavigation();
  navigation.setOptions({ headerRight: () => <HeaderRight title="Uploading..." /> });
  return (
    <View style={styles.container}>
      <Image source={require('../assets/upload-cloud.png')} style={styles.image} />
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
    width: 275,
    height: 275,
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
