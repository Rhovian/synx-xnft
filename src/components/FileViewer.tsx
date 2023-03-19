import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Video, ResizeMode } from 'expo-av';
import React from 'react';
import { View, Image, Text } from 'react-native';

import { AudioFile } from './dashboard/AudioFile';
import { Colors } from '../constants';
import { RootStackParamList } from '../models';

export function FileViewer({ route }: NativeStackScreenProps<RootStackParamList, 'FileViewer'>) {
  const { fileType, body } = route.params;

  if (fileType === 'image') {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1, backgroundColor: Colors.dark.background }}
          source={{ uri: body }}
          resizeMode="contain"
        />
      </View>
    );
  } else if (fileType === 'video') {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Video
            source={{ uri: body }}
            style={{ width: window.innerWidth, height: '100%' }}
            resizeMode={ResizeMode.CONTAIN}
            isMuted={false}
            shouldPlay
            isLooping
            onReadyForDisplay={(videoData) => {
              // @ts-ignore
              videoData.path[0].style.position = 'relative';
            }}
          />
        </View>
      </View>
    );
  } else if (fileType === 'audio') {
    return <AudioFile uri={body} />;
  } else if (fileType === 'text') {
    return <Text>{body}</Text>;
  } else {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text>File type not supported</Text>
        <Text>{body}</Text>
      </View>
    );
  }
}
