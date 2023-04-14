import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD, REGULAR } from '../../constants';
import { FileInfo } from '../../models';
// @ts-ignore
export const PesonalFileInfo = ({ fileInfo }: { fileInfo: FileInfo }) => {
  const fileTypeToImage = {
    image: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/image-icon.png')}
      />
    ),
    video: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/video-icon.png')}
      />
    ),
    audio: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/audio-icon.png')}
      />
    ),
    pdf: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/pdf-icon.png')}
      />
    ),
    ppt: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/ppt-icon.png')}
      />
    ),
    text: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/text-icon.png')}
      />
    ),
    csv: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/xls-icon.png')}
      />
    ),
    zip: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/zip-icon.png')}
      />
    ),
    unknown: (
      <Image
        style={styles.image}
        resizeMode="contain"
        source={require('../../assets/html-icon.png')}
      />
    ),
  };

  const globalContext = useContext(GlobalContext);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
    globalContext.setFileMenu(fileInfo);
  };

  return (
    <TouchableOpacity style={styles.container}>
      <div style={styles.iconWrapper}>{fileTypeToImage[fileInfo.fileType]}</div>
      <div style={styles.infoContainer}>
        <Text style={styles.name}>{fileInfo.name.slice(0, 16)}</Text>
        <Text style={styles.subInfo}>Last modified: 1/1/2021</Text>
      </div>
      <TouchableOpacity style={styles.immutableButton} onPress={() => handlePress()}>
        <Entypo name="dots-three-vertical" size={20} color="grey" />
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
    zIndex: 10,
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
    flexGrow: 1,
    display: 'flex',
    textAlign: 'end',
    paddingRight: 12,
  },
  image: {
    width: 30,
    height: 30,
  },
});
