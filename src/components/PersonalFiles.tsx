import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { EmptyFiles } from './EmptyFiles';
import { FileActionsMenu } from './FileActionsMenu';
import { Files } from './PersonalFilesList';
import { GlobalContext } from '../GlobalProvider';
import { Colors, BOLD } from '../constants';

export const PersonalFiles = () => {
  const [personalFiles, setPersonalFiles] = useState(true);
  const globalContext = useContext(GlobalContext);

  return (
    <View style={styles.container}>
      <View style={styles.appTitle}>Recent</View>
      <View style={styles.appWrapper}>
        <View style={styles.innerApp}>{personalFiles ? <Files /> : <EmptyFiles />}</View>
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
    maxHeight: 350,
    padding: 13,
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
  },
});
