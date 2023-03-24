import React, { useContext, useState } from 'react';
import { View, StyleSheet } from 'react-native';

import { EmptyFiles } from './EmptyFiles';
import { Files } from './PersonalFilesList';
import { GlobalContext } from '../GlobalProvider';
import { Colors, BOLD } from '../constants';

export const PersonalFiles = () => {
  const [personalFiles, setPersonalFiles] = useState(true);
  const globalContext = useContext(GlobalContext);

  return (
    <View style={styles.container}>
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
