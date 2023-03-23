import React from 'react';
import { StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
// @ts-ignore
import { RecentFiles } from '../components/RecentFiles';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';

export const Recent = () => {
  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });
  return (
    <Screen style={styles.container}>
      <Balance />
      <RecentFiles />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
