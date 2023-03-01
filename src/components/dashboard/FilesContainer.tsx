import React from 'react';
import { View, FlatList, StyleSheet, Dimensions } from 'react-native';

import { FileButton } from './FileInfo';

const numColumns = 2;
const width = Dimensions.get('window').width;
const itemWidth = width / numColumns;

// @ts-ignore
export const FileButtonContainer = ({ files }) => {
  return (
    <FlatList
      data={files}
      keyExtractor={(file) => file.name}
      renderItem={({ item }) => (
        <FileButton
          fileInfo={item}
          onPress={() => {
            console.log('hello world');
          }}
        />
      )}
      contentContainerStyle={styles.listContentContainer}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: 8,
    paddingTop: 16,
  },
  item: {
    width: itemWidth,
  },
});

export default FileButtonContainer;
