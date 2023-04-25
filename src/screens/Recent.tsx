import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { Balance } from '../components/Balance';
// @ts-ignore
import { RecentFiles } from '../components/Recent/RecentFiles';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';

export const Recent = () => {
  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });
  const globalContext = useContext(GlobalContext);
  return (
    <Screen style={styles.container}>
      <Balance />
      <RecentFiles localFiles={globalContext.localFiles} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
