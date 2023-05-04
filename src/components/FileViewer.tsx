import { Video, Audio, ResizeMode } from 'expo-av';
import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';

import { Colors } from '../constants';
import { FileInfo } from '../models';

const FileViewer = ({ file }: { file: FileInfo }) => {
  const [fileType, setFileType] = useState('unknown');
  const [sound, setSound] = React.useState();

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync({ uri: file.body });
    // @ts-ignore
    setSound(sound);

    await sound.playAsync();

    // end sound
    // await sound.unloadAsync();
    setTimeout(() => {
      sound.unloadAsync();
    }, 1000);
  }

  useEffect(() => {
    if (file)
      switch (file.fileType) {
        case 'pdf':
          setFileType('pdf');
          break;
        case 'html':
          setFileType('html');
          break;
        case 'ppt':
        case 'pptx':
          setFileType('ppt');
          break;
        case 'txt':
          setFileType('text');
          break;
        case 'js':
          setFileType('javascript');
          break;
        case 'mp3':
        case 'm4a':
          setFileType('audio');
          break;
        case 'mov':
        case 'mp4':
        case 'avi':
          setFileType('video');
          break;
        case 'png':
        case 'jpg':
        case 'jpeg':
        case 'gif':
          setFileType('image');
          break;
        default:
          setFileType('unknown');
      }
  }, [file]);

  if (!fileType || fileType === 'unknown') {
    return (
      <View style={styles.container}>
        <Text>This file type is not supported</Text>
      </View>
    );
  }

  switch (fileType) {
    case 'pdf':
      return (
        <View style={styles.container}>
          <Text>This file type is not supported</Text>
        </View>
      );
    case 'ppt':
      return (
        <View style={styles.container}>
          <Text>This file type is not supported</Text>
        </View>
      );
    case 'text':
      return (
        <View style={styles.container}>
          <Text>{file.body}</Text>
        </View>
      );
    case 'javascript':
      return (
        <View style={styles.container}>
          <Text>{file.body}</Text>
        </View>
      );
    case 'audio':
      return (
        <View style={styles.container}>
          <Text>Audio file</Text>
          <Button title="Play Sound" onPress={playSound} />
        </View>
      );
    case 'video':
      return (
        <View style={styles.container}>
          <Video
            source={{ uri: file.body }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode={ResizeMode.CONTAIN}
            shouldPlay
            useNativeControls
            style={styles.video}
            videoStyle={styles.videoStyles}
          />
        </View>
      );
    case 'image':
      return (
        <View style={styles.container}>
          <Image source={{ uri: file.body }} resizeMode="contain" style={styles.image} />
        </View>
      );
    case 'html':
      return (
        <View style={styles.container}>
          <Text>This file type is not supported</Text>
        </View>
      );
    default:
      return (
        <View style={styles.container}>
          <Text>This file type is not supported</Text>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.inputBackground,
    zIndex: 1,
  },
  video: {
    minWidth: 300,
    minHeight: 300,
    width: '80vw',
    height: '50vh',
  },
  videoStyles: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100vw',
    height: '100vh',
  },
});

export default FileViewer;
