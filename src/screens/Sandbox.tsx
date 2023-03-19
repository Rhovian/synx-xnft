import React from 'react';
import { StyleSheet } from 'react-native';

import { Balance } from '../components/Balance';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';

export const Sandbox = () => {
  return (
    <Screen style={styles.container}>
      <Balance />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
});
