import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { PersonalFilesList } from './PersonalFilesList';
import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD } from '../../constants';
import { FullScreenLoadingIndicator } from '../../utils';

//Add this line to tell the function that it's in focuse

export const PersonalFiles = () => {
  const globalProvider = useContext(GlobalContext);
  const [personalFiles, setPersonalFiles] = useState(true);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>([]);
  const [showCreateVault, setShowCreateVault] = useState(false);

  useEffect(() => {
    if (globalProvider.currentAccountFiles && globalProvider.currentAccountFiles.length > 0) {
      console.log('here is a hook for the current account files!');
      setData(globalProvider.currentAccountFiles);
      setLoading(false);
    } else {
      if (data.length > 0) {
        setLoading(false);
        setPersonalFiles(false);
        setData([]);
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
          ) : (
            <PersonalFilesList data={data} />
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
  emptyFilesContainer: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    minHeight: 200,
    maxHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});