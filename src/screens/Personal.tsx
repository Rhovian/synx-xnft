import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { Balance } from '../components/Balance';
// @ts-ignore
import { FileActionsMenu } from '../components/FileActionsMenu';
import { PersonalFiles } from '../components/PersonalFiles';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';

export const Personal = () => {
  const globalContext = useContext(GlobalContext);
  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });
  return (
    <Screen style={styles.container}>
      <Balance />
      <PersonalFiles />
      {globalContext.fileMenuOpen ? <FileActionsMenu /> : <div />}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
