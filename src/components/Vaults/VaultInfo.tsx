import { StorageAccountResponse } from '@shadow-drive/sdk';
import React, { useContext, useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD, REGULAR } from '../../constants';
import { humanFileSize, shortenString } from '../../utils';

// @ts-ignore
export const VaultInfo = ({
  vaultInfo,
  image,
}: {
  vaultInfo: StorageAccountResponse;
  image: any;
}) => {
  const globalContext = useContext(GlobalContext);
  const [activeVault, setActiveVault] = React.useState(false);

  const handlePress = async () => {
    if (activeVault) return;
    await globalContext.changeCurrentAccount(vaultInfo.publicKey);
    
  };

  const getAvailability = () => {
    const used = vaultInfo.account.storageAvailable;
    const total = vaultInfo.account.storage;
    const available = used - total;
    const percentage = Math.floor((available / total) * 100);
    return percentage;
  };

  useEffect(() => {
    if (globalContext.currentAccount) {
      if (globalContext.currentAccount.publicKey.toString() === vaultInfo.publicKey.toString()) {
        setActiveVault(true);
      } else {
        setActiveVault(false);
      }
    }
  }, [globalContext.currentAccount]);

  return (
    <TouchableOpacity style={styles.container}>
      <div style={styles.iconWrapper}>{image}</div>
      <div style={styles.infoContainer}>
        <Text style={styles.name}>
          {vaultInfo.publicKey ? shortenString(vaultInfo.publicKey.toString()) : ''}
        </Text>
        <Text style={styles.subInfo}>
          {humanFileSize(vaultInfo.account.storage)}
          {/* <Text style={styles.availability}>({getAvailability()}% available)</Text>*/}
        </Text>
      </div>
      <TouchableOpacity style={styles.immutableButton} onPress={() => handlePress()}>
        {activeVault ? (
          <Image
            style={styles.vaultIcon}
            resizeMode="contain"
            source={require('../../assets/viewing.png')}
          />
        ) : (
          <Image
            style={styles.vaultIcon}
            resizeMode="contain"
            source={require('../../assets/switch-img.png')}
          />
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    minHeight: 50,
    borderRadius: 6,
  },
  iconWrapper: {
    paddingLeft: 8,
  },
  name: {
    fontSize: 16,
    color: Colors.dark.text,
    fontFamily: BOLD,
    textAlign: 'left',
    opacity: 0.8,
    paddingBottom: 4,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  subInfo: {
    fontSize: 12,
    color: 'grey',
    fontFamily: REGULAR,
  },
  immutableButton: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    paddingRight: 12,
  },
  vaultIcon: {
    width: 45,
    height: 45,
  },
  availability: {
    color: '#10B981',
    paddingLeft: 2,
  },
  viewing: {
    color: Colors.dark.text,
    fontFamily: BOLD,
    fontSize: 14,
    opacity: 0.8,
  },
});
