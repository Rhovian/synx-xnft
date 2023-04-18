import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Image, Text, FlatList, TouchableOpacity } from 'react-native';

import { VaultInfo } from './VaultInfo';
import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD, REGULAR } from '../../constants';
import { shortenString, FullScreenLoadingIndicator } from '../../utils';
import { CreateVault } from '../Vaults/CreateVault';

export const VaultsView = () => {
  const globalContext = useContext(GlobalContext);
  const [openCreateVault, setOpenCreateVault] = useState(false);
  const [vaults, setVaults] = useState<any>([globalContext.filteredAccounts]);
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (globalContext.accounts.length === 0) {
      setOpenCreateVault(true);
    }
  }, []);

  useEffect(() => {
    if (globalContext.filteredAccounts.length !== 0) {
      setVaults(globalContext.filteredAccounts);
      setOpenCreateVault(false);
      setLoading(false);
    }
  }, [globalContext.filteredAccounts]);

  useEffect(() => {
    if (globalContext.currentAccount?.publicKey) {
      setCurrentAccount(shortenString(globalContext.currentAccount.publicKey.toString()));
    }
  }, [globalContext.currentAccount]);

  const ItemSeparatorComponent = () => <View style={{ marginVertical: 8 }} />;

  return (
    <View style={styles.createVaultContainer}>
      {openCreateVault ? (
        <CreateVault />
      ) : (
        <View style={styles.container}>
          <View style={styles.appWrapper}>
            <View style={styles.innerApp}>
              <View style={styles.vaultHeader}>
                <View style={styles.logo}>
                  {currentAccount ? currentAccount.substring(0, 2) : ''}
                </View>
                <Text style={styles.vaultAddress}>{currentAccount}</Text>
              </View>
              {loading ? (
                <FullScreenLoadingIndicator variantBackground />
              ) : (
                <FlatList
                  style={styles.listContainer}
                  data={vaults}
                  overScrollMode="auto"
                  keyExtractor={(item: any) => item.publicKey.toString()}
                  ItemSeparatorComponent={ItemSeparatorComponent}
                  renderItem={({ item, index }) => {
                    return index % 2 === 0 ? (
                      <VaultInfo
                        vaultInfo={item}
                        image={
                          <Image
                            style={styles.vaultIcon}
                            source={require('../../assets/vault.png')}
                          />
                        }
                      />
                    ) : (
                      <VaultInfo
                        vaultInfo={item}
                        image={
                          <Image
                            style={styles.vaultIcon}
                            source={require('../../assets/pink-vault.png')}
                          />
                        }
                      />
                    );
                  }}
                />
              )}
              <TouchableOpacity
                onPress={() => setOpenCreateVault(!openCreateVault)}
                style={styles.createVault}>
                <Image
                  style={styles.createVaultIcon}
                  source={require('../../assets/white-vault.png')}
                />
                Create another Vault
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 6,
    width: '100%',
  },
  createVaultContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    minHeight: 400,
  },
  appWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    paddingHorizontal: 6,
    paddingVertical: 12,
  },
  innerApp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 0.8,
    width: '100%',
    height: 350,
    padding: 6,
    backgroundColor: Colors.dark.innerBackground,
    borderRadius: 8,
  },
  dropDown: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  uploadIcon: {
    width: 50,
    height: 50,
    marginBottom: 16,
  },
  uploadTitle: {
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
    marginTop: 16,
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#A0A0A0',
    fontFamily: REGULAR,
  },
  vaultHeader: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 100,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.innerBackground,
  },
  listContainer: {
    width: '97%',
    minWidth: 300,
    maxHeight: 320,
    height: '100%',
    zIndex: 99,
    marginVertical: 8,
    marginBottom: 16,
  },
  logo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: '#6C5DD3',
    marginLeft: 16,
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
  },
  vaultAddress: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1,
    fontFamily: BOLD,
    fontSize: 18,
    marginLeft: 16,
    color: Colors.dark.text,
  },
  exitVault: {
    position: 'absolute',
    right: 8,
    top: 4,
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
  },
  createVault: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    fontSize: 14,
    color: Colors.dark.text,
    fontFamily: BOLD,
    backgroundColor: Colors.dark.inputBackground,
    position: 'absolute',
    bottom: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    height: 35,
    zIndex: 999,
  },
  createVaultIcon: {
    width: 20,
    height: 20,
    marginLeft: 16,
    marginRight: 8,
  },
  vaultIcon: {
    width: 30,
    height: 30,
    marginRight: 4,
  },
});
