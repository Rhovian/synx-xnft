import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { PersonalFilesList } from './PersonalFilesList';
import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD } from '../../constants';
import { tempData } from '../../temp';
import { FullScreenLoadingIndicator } from '../../utils';
import { EmptyFiles } from '../EmptyFiles';

export const PersonalFiles = () => {
  const globalProvider = useContext(GlobalContext);
  const [personalFiles, setPersonalFiles] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    if (globalProvider.currentAccountFiles) {
      console.log('current files in personal files', globalProvider.currentAccountFiles);
      setData(globalProvider.currentAccountFiles);
      setLoading(false);
      if (globalProvider.currentAccountFiles.length === 0) {
      }
    }
  }, [globalProvider.currentAccountFiles]);

  return (
    <View style={styles.container}>
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
          ) : personalFiles ? (
            <PersonalFilesList data={data} />
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
    paddingHorizontal: 6,
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
  },
  innerApp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    maxHeight: 450,
  },
});
