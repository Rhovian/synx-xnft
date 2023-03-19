import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { ActionMenu } from './ActionMenu';
import { Screen } from './Screen';
import { FileInfo } from './dashboard/FileInfo';
import { GlobalContext } from '../GlobalProvider';
import { Colors } from '../constants';
import { RootStackParamList } from '../models';
import { FullScreenLoadingIndicator } from '../utils';

export function Files({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Files'>) {
  const globalContext = useContext(GlobalContext);
  const { id } = route.params;
  const [data, setData] = useState(globalContext.accountFiles[id]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(globalContext.loading);
  }, [globalContext.loading]);

  useEffect(() => {
    setData(globalContext.accountFiles[id]);
  }, [globalContext.accountFiles]);

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
    />
  );

  const handlePressTokenRow = (item: any) => {
    navigation.push('FileViewer', { fileType: item.fileType, body: item.body });
  };

  return (
    <Screen style={{ backgroundColor: Colors.dark.background }}>
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.dark.background, paddingTop: 35 }}
        data={data}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <FileInfo
              fileInfo={item}
              onPress={() => handlePressTokenRow(item)}
              style={styles.item} // add this line
            />
          );
        }}
      />
      <ActionMenu />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleBalancesWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  item: {
    width: '100%',
  },
  videoContainer: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh',
  },
  video: {
    alignSelf: 'center',
  },
});
