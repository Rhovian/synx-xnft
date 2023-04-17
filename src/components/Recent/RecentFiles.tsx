import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { Colors, BOLD } from '../../constants';
import { FullScreenLoadingIndicator } from '../../utils';
import { EmptyFiles } from '../EmptyFiles';
import { RecentFilesList } from '../Recent/RecentFilesList';

export const RecentFiles = () => {
  const [recentFiles, setRecentFiles] = useState(false);
  const [files, setFiles] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('files');
      if (value) {
        // value previously stored
        const parsedFiles = JSON.parse(value);
        if (parsedFiles.length === 0) {
          setLoading(false);
          setRecentFiles(false);
        } else if (parsedFiles.length > 0) {
          setLoading(false);
          setRecentFiles(true);
          setFiles(Array.from(parsedFiles));
        }
      } else {
        setLoading(false);
        setRecentFiles(false);
      }
    } catch (e) {
      console.log(e);
      // error reading value
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.appTitle}>Recent Files</View>
      <View style={styles.appWrapper}>
        <View style={styles.innerApp}>
          {loading ? (
            <View
              style={{
                display: 'flex',
                flexGrow: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: 300,
              }}>
              <FullScreenLoadingIndicator />
            </View>
          ) : recentFiles ? (
            <RecentFilesList data={files} />
          ) : (
            <EmptyFiles />
          )}
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
});
