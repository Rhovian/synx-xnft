import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { BOLD, Colors, MEDIUM } from '../constants';

export function FileActionsMenu() {
  const globalContext = useContext(GlobalContext);
  const navigation = useNavigation();

  const handlePress = () => {
    globalContext.setFileMenuOpen(false);
    navigation.setOptions({ tabBarStyle: { display: 'flex', borderTopWidth: 0 } });
  };
  return (
    <View style={styles.container}>
      <View style={styles.actionsHeader}>
        <Text style={styles.actionsTitle}>File Actions</Text>
        <TouchableOpacity onPress={() => handlePress()}>
          <Feather name="x" size={24} color={Colors.dark.text} />
        </TouchableOpacity>
      </View>
      <View style={styles.actions}>
        <View style={styles.actionsInner}>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/pin-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/share-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/copy-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/block-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/offline-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/details-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/rename-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/delete-icon.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '35vh',
    width: '100vw',
    backgroundColor: Colors.dark.inputBackground,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    position: 'absolute',
    bottom: 0,
    padding: 16,
    textAlign: 'right',
  },
  actionsHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  actionsTitle: {
    fontSize: 20,
    color: Colors.dark.text,
    fontFamily: MEDIUM,
    textAlign: 'center',
    paddingLeft: 24,
    width: '100%',
  },
  actions: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionsInner: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
    width: '85%',
    flexWrap: 'wrap',
  },
  actionIcon: {
    width: 60,
    height: 70,
    margin: 4,
  },
});
