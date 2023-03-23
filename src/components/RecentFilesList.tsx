import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { FileInfo } from './dashboard/FileInfo';
import { Colors } from '../constants';
import { File } from '../models';

export const Files = () => {
  const data: File[] = [
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
  ];
  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
    />
  );

  return (
    <FlatList
      style={styles.container}
      data={data}
      overScrollMode="auto"
      keyExtractor={(item) => item.name}
      ItemSeparatorComponent={ItemSeparatorComponent}
      renderItem={({ item }) => {
        return <FileInfo fileInfo={item} />;
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    width: '95%',
    maxHeight: '100%',
  },
});
