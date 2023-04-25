import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { RecentFileInfo } from './RecentFIleInfo';
import { Colors } from '../../constants';

export const RecentFilesList = ({ data }: { data: any }) => {
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
        return <RecentFileInfo fileInfo={item} />;
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
