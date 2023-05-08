import React, { useContext, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { Balance } from '../components/Balance';
// @ts-ignore
import { EmptyFiles } from '../components/EmptyFiles';
import { Screen } from '../components/Screen';
import { UploadFile } from '../components/UploadFile';
import { UploadPending } from '../components/UploadPending';
import { CreateVault } from '../components/Vaults/CreateVault';
import { Colors } from '../constants/Colors';
import { FullScreenLoadingIndicator } from '../utils';

export const Upload = () => {
  const [uploading, setUploading] = React.useState(false);
  const [newUser, setNewUser] = React.useState(false);
  const [showCreateVault, setShowCreateVault] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    if (globalContext.accounts.length === 0) {
      setNewUser(true);
      setLoading(false);
    } else {
      setNewUser(false);
    }
  }, [globalContext.accounts]);

  useEffect(() => {
    if (globalContext.currentAccount) {
      setLoading(false);
    }
  }, [globalContext.currentAccount]);

  // const navigation = useNavigation();
  // navigation.setOptions({ tabBarStyle: { display: 'none' } });
  return (
    <Screen style={styles.container}>
      <Balance />
      <View style={styles.uploadUpperContainer}>
        <View style={styles.uploadContainer}>
          {loading ? (
            <FullScreenLoadingIndicator />
          ) : newUser ? (
            showCreateVault ? (
              <View style={styles.createVaultContainer}>
                <CreateVault />
              </View>
            ) : (
              <View style={styles.emptyFilesContainer}>
                <EmptyFiles
                  showCreateVault={() => setShowCreateVault(true)}
                  goUpload={() => setNewUser(false)}
                />
              </View>
            )
          ) : uploading ? (
            <UploadPending />
          ) : (
            <UploadFile
              onBeginUpload={() => setUploading(true)}
              onEndUpload={() => setUploading(false)}
            />
          )}
        </View>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.background,
    width: '100%',
  },
  uploadUpperContainer: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadContainer: {
    width: 375,
    height: 600,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyFilesContainer: {
    marginTop: 20,
    width: '100%',
    height: '100%',
    minHeight: 200,
    maxHeight: 400,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  createVaultContainer: {
    width: '100%',
    height: '100%',
    padding: 20,
    maxHeight: 400,
  },
});
