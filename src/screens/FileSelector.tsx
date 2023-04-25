import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import FileViewer from '../components/FileViewer';
import { BOLD, Colors } from '../constants';
import { FileInfo } from '../models';
import { FullScreenLoadingIndicator } from '../utils';

const FileSelector = () => {
  const [file, setFile] = useState<FileInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const globalProvider = useContext(GlobalContext);

  const navigateToPersonal = () => {
    globalProvider.setFileMenuOpen(false);
    // @ts-ignore
    navigation.navigate('Personal');
  };

  useEffect(() => {
    if (globalProvider.currentFile) {
      setFile(globalProvider.currentFile);
    }
  }, [globalProvider.currentFile]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.exitVault} onPress={navigateToPersonal}>
        <Image style={styles.close} resizeMode="contain" source={require('../assets/close.png')} />
      </TouchableOpacity>
      {loading ? <FullScreenLoadingIndicator /> : <FileViewer file={file} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.inputBackground,
  },
  exitVault: {
    position: 'absolute',
    right: 15,
    top: 20,
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
    zIndex: 1000,
  },
  close: {
    width: 15,
    height: 15,
    marginTop: 15,
    zIndex: 1000,
  },
});

export default FileSelector;
