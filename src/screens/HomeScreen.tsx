import { useNavigation } from '@react-navigation/native';
import { ShadowFile } from '@shadow-drive/sdk';
import * as DocumentPicker from 'expo-document-picker';
import React, { useContext, useRef, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { GlobalContext } from '../GlobalProvider';
import { FabUpload } from '../components/FabUpload';
import { Screen } from '../components/Screen';
import { Balance } from '../components/dashboard/Balance';
import { StorageDetails } from '../components/dashboard/StorageDetails';
import { Colors, BOLD } from '../constants';

export function HomeScreen() {
  const navigation = useNavigation();
  const globalContext = useContext(GlobalContext);
  const [menuDisplay, setMenuDisplay] = useState(false);

  const onOpen = () => {
    setMenuDisplay(true);
  };
  const onClose = () => {
    setMenuDisplay(false);
  };

  return (
    <Screen style={styles.container}>
      <div style={styles.titleBalancesWrap}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: RFValue(21),
            color: Colors['dark'].text,
            fontFamily: BOLD,
            textAlign: 'center',
          }}>
          Dashboard
        </Text>
        <Balance />
      </div>
      <StorageDetails />
      <div style={styles.spacer} />
      <View>
        {menuDisplay ? (
          <View style={{ width: '100vw', backgroundColor: '#322A3D' }}>
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
                <View style={{ height: 50, justifyContent: 'center' }}>
                  <Image style={styles.sheetImage} source={require('../assets/create_vault.png')} />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={async () => {
                onClose();
                // @ts-ignore
                const { type, uri } = await DocumentPicker.getDocumentAsync({
                  copyToCacheDirectory: false,
                  type: '*/*',
                });

                if (type === 'cancel') {
                  return;
                }

                const res = await fetch(uri);

                const file = new File([await res.blob()], 'test');

                console.log(globalContext);
                await globalContext.drive?.uploadFile(globalContext.accounts[0].publicKey, file);
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
          </View>
        ) : (
          <FabUpload openBottomSheet={() => onOpen()} />
        )}
      </View>
    </Screen>
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
    backgroundColor: '#322A3D',
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    // marginVertical:5,
    borderBottomWidth: 1,
    borderBottomColor: '#4B3656',
    // borderRadius:5
  },
  soundtabInner: { height: 50, justifyContent: 'center' },
  soundtab: {
    backgroundColor: '#322A3D',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    // marginVertical:5,
    // borderRadius:5
  },
  soundtabText: {
    color: '#fff',
    fontFamily: BOLD,
    fontSize: 12,
  },
  sheetImage: { width: 24, height: 24 },
  spacer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    width: '100%',
  },
});
