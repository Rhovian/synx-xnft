import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image, View } from 'react-native';

import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD, REGULAR } from '../../constants';
import { FileInfo } from '../../models';
import { fileTypes } from '../../utils';
// @ts-ignore
export const PesonalFileInfo = ({ fileInfo }: { fileInfo: FileInfo }) => {
  const getFileTypeAndIcon = (fileType: string) => {
    let source;
    if (fileTypes.includes(fileType)) {
      source = require(`../../assets/fileTypeIcons/${fileType.toLowerCase()}-icon.png`);
    } else {
      source = require('../../assets/fileTypeIcons/html-icon.png');
    }

    return <Image style={styles.image} resizeMode="contain" source={source} />;
  };

  const globalContext = useContext(GlobalContext);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.setOptions({ tabBarStyle: { display: 'none' } });
    globalContext.setFileMenu(fileInfo);
  };

  const goToFileViewer = () => {
    globalContext.setFileMenu(fileInfo);
    // @ts-ignore
    navigation.navigate('FileViewer');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => goToFileViewer()}>
      <div style={styles.iconWrapper}>{getFileTypeAndIcon(fileInfo.fileType)}</div>
      <div style={styles.infoContainer}>
        <Text style={styles.name}>
          {fileInfo.name.length > 16 ? `${fileInfo.name.slice(0, 16)}...` : fileInfo.name}
        </Text>
        <Text style={styles.subInfo}>Last modified: 1/1/2021</Text>
      </div>
      <View style={styles.immutableButton}>
        <TouchableOpacity onPress={() => handlePress()} style={{ width: 30, height: '100%' }}>
          <Entypo name="dots-three-vertical" size={20} color="grey" />
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
    backgroundColor: Colors.dark.innerBackground,
    minHeight: 50,
    borderRadius: 6,
    zIndex: 9,
  },
  iconWrapper: {
    paddingLeft: 8,
  },
  name: {
    fontSize: 12,
    color: Colors.dark.text,
    fontFamily: BOLD,
    textAlign: 'left',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 8,
    width: '50%',
  },
  subInfo: {
    fontSize: 9,
    color: 'grey',
    fontFamily: REGULAR,
  },
  immutableButton: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    textAlign: 'end',
    paddingRight: 12,
    zIndex: 10,
    flexGrow: 1,
  },
  image: {
    width: 30,
    height: 30,
  },
});
