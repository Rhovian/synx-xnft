import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import { useNavigation } from '@react-navigation/native';
import { PublicKey } from '@solana/web3.js';
import React, { useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import Toast from 'react-native-toast-message';

import { GlobalContext } from '../GlobalProvider';
import { Colors, MEDIUM } from '../constants';
import { FileInfo } from '../models';

export function FileActionsMenu() {
  const globalContext = useContext(GlobalContext);
  const navigation = useNavigation();
  const [file, setFile] = React.useState<FileInfo | null>(null);

  const handlePress = () => {
    globalContext.setFileMenuOpen(false);
    navigation.setOptions({ tabBarStyle: { display: 'flex', borderTopWidth: 0 } });
  };

  useEffect(() => {
    if (globalContext.currentFile) {
      setFile(globalContext.currentFile);
    }
  }, [globalContext.currentFile]);

  const addToLocalStorage = async () => {
    const data = await AsyncStorage.getItem('files');
    if (data) {
      const files = JSON.parse(data);
      const newFiles = [...files, file];
      try {
        await AsyncStorage.setItem('files', JSON.stringify(newFiles));
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Error saving file',
        });
      }
    } else {
      await AsyncStorage.setItem('files', JSON.stringify([file]));
    }
    Toast.show({
      type: 'success',
      text1: 'File saved to local storage',
    });
  };

  const removeFromLocalStorage = async () => {
    const data = await AsyncStorage.getItem('files');
    if (data && file) {
      const files = JSON.parse(data);
      const newFiles = files.filter((f: FileInfo) => f.name !== file.name);
      await AsyncStorage.setItem('files', JSON.stringify(newFiles));
    }
  };

  const handleCopy = () => {
    if (file) {
      Clipboard.setString(file.body);
      Toast.show({
        type: 'success',
        text1: 'File Copied to Clipboard',
      });
    }
  };

  const handleBlock = async () => {
    if (globalContext.currentAccount?.account.immutable) {
      Toast.show({
        type: 'error',
        text1: 'Storage is already immutable',
      });
      return;
    }
    if (file && globalContext.currentAccount) {
      if (!globalContext.currentAccount.account.immutable) {
        await globalContext.drive?.makeStorageImmutable(new PublicKey(file.vault), 'v2');
      } else {
        console.log('Account is already immutable');
      }
    }
  };

  const handleDelete = async () => {
    if (globalContext.currentAccount?.account.immutable) {
      Toast.show({
        type: 'error',
        text1: 'Cannot Delete File',
        text2: 'Vault is immutable',
      });
      return;
    }
    if (file) {
      try {
        removeFromLocalStorage();
        await globalContext.drive?.deleteFile(new PublicKey(file.vault), file.body, 'v2');
        await globalContext.getCurrentAccountFiles();
      } catch {
        Toast.show({
          type: 'error',
          text1: 'Error deleting file',
        });
      }
      Toast.show({
        type: 'success',
        text1: 'File deleted from vault',
        text2: 'File removed from local storage',
      });
    }
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
          <TouchableOpacity onPress={async () => await addToLocalStorage()}>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/pin-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleCopy()}>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/copy-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleBlock()}>
            <Image
              style={styles.actionIcon}
              resizeMode="contain"
              source={require('../assets/block-icon.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete()}>
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
    height: '25vh',
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
    width: 50,
    height: 60,
    margin: 8,
  },
});
