import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { Colors, MEDIUM } from '../constants';

export const EmptyFiles = ({
  showCreateVault,
  goUpload,
}: {
  showCreateVault: any;
  goUpload: any;
}) => {
  const [showUpload, setShowUpload] = React.useState(true);
  const globalContext = useContext(GlobalContext);
  const navigation = useNavigation();
  const route = useRoute();

  useEffect(() => {
    if (!globalContext.accounts || globalContext.accounts.length === 0) {
      setShowUpload(true);
    }
  }, [globalContext.accounts]);

  const goToUpload = () => {
    if (route.name === 'Upload') {
      goUpload();
    } else {
      // @ts-ignore
      navigation.navigate('Upload');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.stateContainer}>
        <Image source={require('../assets/empty-state.png')} style={styles.image} />
        {showUpload ? (
          <Text style={styles.text}>No files found</Text>
        ) : (
          <Text style={styles.text}>No vault or files found</Text>
        )}
      </View>
      <View style={styles.buttonsWrapper}>
        {showUpload ? (
          <View style={styles.buttonsWrapper}>
            <TouchableOpacity onPress={showCreateVault} style={styles.buttonRed}>
              Create Vault
            </TouchableOpacity>
            <TouchableOpacity onPress={goToUpload} style={styles.buttonBlue}>
              Upload File
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity onPress={showCreateVault} style={styles.buttonRedLarge}>
            Create Vault
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    width: '100%',
    paddingVertical: 30,
    marginTop: 30,
    minHeight: 300,
  },
  image: {
    width: 100,
    height: 100,
    cover: 'contain',
  },
  text: {
    color: Colors.dark.text,
    fontSize: 16,
    fontFamily: MEDIUM,
    textAlign: 'center',
  },
  buttonsWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
    flexGrow: 1,
    color: Colors.dark.text,
    fontFamily: MEDIUM,
  },
  buttonBlue: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.purple,
  },
  buttonRed: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.red,
  },
  buttonRedLarge: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: Colors.dark.red,
    width: '100%',
  },
  stateContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
