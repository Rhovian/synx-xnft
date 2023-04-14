import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { Balance } from '../components/Balance';
// @ts-ignore
import { FileActionsMenu } from '../components/FileActionsMenu';
import { Intro } from '../components/Intro';
import { PersonalFiles } from '../components/Personal/PersonalFiles';
import { Screen } from '../components/Screen';
import { Colors } from '../constants/Colors';

export const Personal = () => {
  const navigation = useNavigation();
  const [firstVisit, setFirstVisit] = React.useState(false);
  const globalContext = useContext(GlobalContext);

  const visited = localStorage.getItem('visited');
  if (!visited) {
    if (!visited) {
      setFirstVisit(true);
      localStorage.setItem('visited', 'true');
    }
  }

  const handlePress = () => {
    setFirstVisit(false);
    navigation.setOptions({
      tabBarStyle: { display: 'flex', borderTop: 'none' },
      headerShown: true,
    });
  };
  return (
    <Screen style={styles.container}>
      {firstVisit ? (
        <Intro onPress={handlePress} />
      ) : (
        <View style={styles.appContainer}>
          <Balance />
          <PersonalFiles />
          {globalContext.fileMenuOpen ? <FileActionsMenu /> : <div />}
        </View>
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
  },
  appContainer: {
    width: '100%',
    height: '100%',
  },
});
