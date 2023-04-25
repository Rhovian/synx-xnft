import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import { FileUploader } from 'react-drag-drop-files';
import { View, StyleSheet, Image, Text } from 'react-native';
import * as Progress from 'react-native-progress';

import { GlobalContext } from '../GlobalProvider';
import { Colors, BOLD, REGULAR } from '../constants';
import { HeaderRight } from '../utils';

const fileTypes = [
  'EPS',
  'HTML',
  'WAV',
  'XLS',
  'PDF',
  'PNG',
  'DLL',
  'RAR',
  'TXT',
  'PSD',
  'AVI',
  'MOV',
  'JS',
  'MP3',
  'MP4',
  'JPG',
  'ZIP',
  'PHP',
  'CSS',
  'DOC',
  'PPT',
];

export const UploadFile = ({
  onBeginUpload,
  onEndUpload,
}: {
  onBeginUpload: any;
  onEndUpload: any;
}) => {
  const globalProvider = useContext(GlobalContext);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const navigation = useNavigation();

  const handleChange = async (file: any) => {
    onBeginUpload();
    globalProvider.setProgressBar(0.25);
    navigation.setOptions({ headerRight: () => <HeaderRight title="Uploading..." /> });

    setFile(file);

    await globalProvider.uploadFile(file);
    globalProvider.setProgressBar(0.75);

    navigation.setOptions({ headerRight: () => <HeaderRight title="Upload" /> });
    // @ts-ignore
    navigation.navigate('Personal');
    onEndUpload();
    globalProvider.setProgressBar(1);

    setTimeout(() => {
      globalProvider.setProgressBar(0);
    }, 500);
  };

  useEffect(() => {
    if (globalProvider.currentAccount) {
    }
  }, []);

  const boxArea = (
    <View style={styles.dropDown}>
      <Image style={styles.uploadIcon} source={require('../assets/upload-icon.png')} />
      <Text style={styles.uploadTitle}>Drag and drop files, or Browse</Text>
      <Text style={styles.uploadSubtitle}>Synx supports all file types</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.appTitle}>Upload</View>
      <View style={styles.appWrapper}>
        <View style={styles.innerApp}>
          <FileUploader
            handleChange={handleChange}
            name="file"
            types={fileTypes}
            classes="dragAndDrop"
            children={boxArea}
          />
        </View>
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
    padding: 12,
    width: '100%',
  },
  appTitle: {
    fontSize: 20,
    maxHeight: 25,
    color: Colors.dark.text,
    fontFamily: BOLD,
    minWidth: '100%',
    paddingLeft: 8,
  },
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  innerApp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0.8,
    width: '100%',
    height: 350,
    padding: 13,
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
    marginTop: 16,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    fontFamily: REGULAR,
  },
});
