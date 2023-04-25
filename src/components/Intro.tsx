import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import { BOLD, Colors, REGULAR } from '../constants';
import { HeaderLeft } from '../utils';

export const Intro = ({ onPress }: { onPress: any }) => {
  const navigation = useNavigation();
  navigation.setOptions({ tabBarStyle: { display: 'none' }, headerShown: false });

  return (
    <View style={styles.container}>
      <HeaderLeft />
      <View style={styles.contentWrap}>
        <Text style={styles.title}>
          What is <Text style={styles.titleAlternate}>Synx?</Text>
        </Text>
        <Text style={styles.subTitle}>
          The storage provider where you own your data, nobody else.
        </Text>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../assets/rectangle.png')}
        />
        <TouchableOpacity onPress={onPress} style={styles.buttonRed}>
          Go to App
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    padding: 12,
    width: '100%',
    height: '100vh',
  },
  contentWrap: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingHorizontal: 24,
    marginTop: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: BOLD,
    color: Colors.dark.text,
    textAlign: 'left',
  },
  titleAlternate: {
    color: Colors.dark.purple,
  },
  subTitle: {
    fontSize: 18,
    fontFamily: REGULAR,
    color: Colors.dark.text,
    opacity: 0.8,
    paddingTop: 12,
  },
  image: {
    width: '100%',
    height: 250,
    marginVertical: 24,
  },
  buttonRed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderRadius: 10,
    backgroundColor: Colors.dark.purple,
    width: '100%',
    color: Colors.dark.text,
    fontFamily: BOLD,
  },
});
