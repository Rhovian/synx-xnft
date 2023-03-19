import { AntDesign } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as DocumentPicker from 'expo-document-picker';
import React, { useContext, useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

import { FabUpload } from './FabUpload';
import { GlobalContext } from '../GlobalProvider';
import { BOLD, Colors } from '../constants';

export function ActionMenu() {
  const navigation = useNavigation();

  const globalContext = useContext(GlobalContext);

  const [menuDisplay, setMenuDisplay] = useState(false);
  const [displayVaults, setDisplayVaults] = useState(false);

  const route = useRoute();

  const onOpen = () => {
    if (route.name === 'Vaults') setDisplayVaults(true);
    else setDisplayVaults(false);
    setMenuDisplay(true);
  };
  const onClose = () => {
    setMenuDisplay(false);
  };

  const uploadFile = async () => {
    onClose();
    // @ts-ignore
    const { type, uri, name, mimeType } = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: false,
      type: '*/*',
    });

    if (type === 'cancel') {
      return;
    }

    const res = await fetch(uri);

    const file = new File([await res.blob()], name, { type: mimeType });

    await globalContext.uploadFile(file);
  };

  return (
    <View style={styles.container}>
      {menuDisplay ? (
        <View
          style={{
            width: '100vw',
            backgroundColor: Colors.dark.inputBackground,
          }}>
          <FabUpload
            icon={<AntDesign name="closecircleo" size={28} color="white" />}
            openBottomSheet={() => onClose()}
            right={40}
            bottom={60}
          />
          {displayVaults ? (
            <TouchableOpacity
              onPress={() => {
                onClose();
                // @ts-ignore
                navigation.navigate('CreateVault');
              }}
              style={styles.soundtab}>
              <View style={styles.soundtabs}>
                <View style={styles.soundtabInner}>
                  <Text allowFontScaling={false} style={styles.soundtabText}>
                    Create New Vault
                  </Text>
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    width: 38,
                    height: 38,
                    borderRadius: 22,
                  }}>
                  <Image style={styles.sheetImage} source={require('../assets/create_vault.png')} />
                </View>
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                (async () => {
                  await uploadFile();
                })();
              }}
              style={styles.soundtab}>
              <View style={styles.soundtabs}>
                <View style={styles.soundtabInner}>
                  <Text allowFontScaling={false} style={styles.soundtabText}>
                    Upload File
                  </Text>
                </View>
                <View style={{ height: 50, justifyContent: 'center' }}>
                  <Image style={styles.sheetImage} source={require('../assets/create_vault.png')} />
                </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <FabUpload
          icon={<AntDesign name="plus" size={28} color="white" />}
          openBottomSheet={() => onOpen()}
          right={40}
          bottom={30}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: Colors.dark.background,
    alignItems: 'center',
  },
  titleBalancesWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 25,
  },
  soundtabs: {
    backgroundColor: Colors.dark.inputBackground,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    // marginVertical:5,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.background,
    // borderRadius:5
  },
  soundtabInner: { height: 30, justifyContent: 'center' },
  soundtab: {
    backgroundColor: '#322A3D',
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItem: 'center',
    // marginVertical:5,
    // borderRadius:5
  },
  soundtabText: {
    color: Colors.dark.text,
    fontFamily: BOLD,
    fontSize: 16,
    textAlign: 'left',
  },
  sheetImage: { width: 24, height: 24 },
  spacer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 0.75,
    width: '100%',
  },
});
