import React from 'react';
import { View, FlatList, StyleSheet, ScrollView } from 'react-native';

import { FileButton } from './FileInfo';
// @ts-ignore
export const FileButtonContainer = ({ files }) => {
  return (
    <ScrollView>
      <FlatList
        data={files}
        keyExtractor={(file) => file.name}
        renderItem={({ item }) => (
          <FileButton
            fileInfo={item}
            onPress={() => {
              console.log('hello world');
            }}
            style={styles.item} // add this line
          />
        )}
        contentContainerStyle={styles.listContentContainer}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listContentContainer: {
    paddingHorizontal: 2,
    paddingTop: 16,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '100%',
  },
});

export default FileButtonContainer;
