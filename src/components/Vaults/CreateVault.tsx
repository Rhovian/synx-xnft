import React, { useState, useContext } from 'react';
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  Keyboard,
  ActivityIndicator,
  TouchableWithoutFeedback,
  Switch,
} from 'react-native';

import { GlobalContext } from '../../GlobalProvider';
import { BOLD, REGULAR, Colors, MEDIUM } from '../../constants';

const windowHeight = Dimensions.get('window').height;

// @ts-ignore
export function CreateVault({ exitVault }: { exitVault: () => void }) {
  const [vaultName, setVaultName] = useState('');
  const [vaultSize, setVaultSize] = useState('');
  const [loader, setLoader] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [immutable, setImmutable] = useState(false);

  const globalContext = useContext(GlobalContext);

  const changeRate = (size: string) => {};

  const triggerCreateVault = async () => {
    if (vaultName !== '' && vaultSize !== '') {
      setLoader(true);
      /** Create the vault here */
      const newAccount = await globalContext
        .createAccount(vaultName, vaultSize.replaceAll(' ', ''), immutable)
        .catch((err) => {
          console.log(err);
        });

      if (newAccount) {
        globalContext.refreshAccounts();
      }
      setLoader(false);
    }
  };
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
        setDropdown(false);
      }}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.exitVault} onPress={() => exitVault()}>
          <Image
            style={styles.close}
            resizeMode="contain"
            source={require('../../assets/close.png')}
          />
        </TouchableOpacity>
        <View style={{ width: '100%', height: '80%', marginTop: 8 }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '100%' }}>
              <View>
                <View style={{}}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 14, fontFamily: BOLD, color: Colors.dark.text }}>
                    Vault Name
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 5,
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                  }}>
                  <View style={{ width: '100%' }}>
                    <View style={{ width: '95%' }}>
                      <textarea
                        id="createVaultInput"
                        style={{
                          color: Colors.dark.text,
                          fontSize: 12,
                          fontFamily: MEDIUM,
                          height: 35,
                          backgroundColor: 'transparent',
                          resize: 'none',
                          paddingTop: 2,
                          paddingLeft: 10,
                          borderRadius: 10,
                          borderColor: Colors.dark.innerBackground,

                          width: '100%',
                        }}
                        placeholder="Input text"
                        value={vaultName}
                        onChange={(val) => setVaultName(val.target.value as any)}
                      />
                    </View>
                  </View>
                </View>
              </View>
              <View style={{ width: '100%' }}>
                <View style={{ marginTop: 30 }}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontSize: 14,
                      fontFamily: MEDIUM,
                      color: Colors.dark.text,
                      paddingLeft: 2,
                    }}>
                    Vault Size
                  </Text>
                </View>
                {dropdown ? (
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'column',
                      backgroundColor: 'transparent',
                      borderRadius: 10,
                      borderColor: Colors.dark.innerBackground,
                    }}>
                    <TouchableOpacity
                      onPress={() => setDropdown(!dropdown)}
                      style={{
                        flexDirection: 'row',
                        height: 45,
                        borderBottomWidth: 1,
                        borderBottomColor: '#4B3656',
                      }}>
                      <View style={{ width: '80%', justifyContent: 'center' }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#fff',
                            paddingLeft: 10,
                          }}>
                          Choose size of your vault
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '20%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Image
                          style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          source={require('../../assets/create_vault/down.png')}
                        />
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVaultSize('5 GB');
                        setDropdown(false);
                        changeRate('5GB');
                      }}
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: '#4B3656',
                      }}>
                      <View style={{ width: '60%', flexDirection: 'row' }}>
                        <View style={{ height: 50, width: '50%', justifyContent: 'center' }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontSize: 12,
                              fontFamily: REGULAR,
                              color: '#fff',
                              paddingLeft: 10,
                            }}>
                            Starter 5GB
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 50,
                            width: '30%',
                            justifyContent: 'center',
                            paddingLeft: 20,
                          }}>
                          <Image
                            style={{ width: 30, height: 30, resizeMode: 'contain' }}
                            source={require('../../assets/create_vault/starter.png')}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: '40%',
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: 20,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#e7e7e7',
                          }}>
                          1.25 SHDW
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVaultSize('50 GB');
                        setDropdown(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: '#4B3656',
                      }}>
                      <View style={{ width: '60%', flexDirection: 'row' }}>
                        <View style={{ height: 50, width: '50%', justifyContent: 'center' }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontSize: 12,
                              fontFamily: REGULAR,
                              color: '#fff',
                              paddingLeft: 10,
                            }}>
                            Faster 50GB
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 50,
                            width: '30%',
                            justifyContent: 'center',
                            paddingLeft: 20,
                          }}>
                          <Image
                            style={{ width: 25, height: 25, resizeMode: 'contain' }}
                            source={require('../../assets/create_vault/faster.png')}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: '40%',
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: 20,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#e7e7e7',
                          }}>
                          12.5 SHDW
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVaultSize('250 GB');
                        setDropdown(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: '#4B3656',
                      }}>
                      <View style={{ width: '60%', flexDirection: 'row' }}>
                        <View style={{ height: 50, width: '50%', justifyContent: 'center' }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontSize: 12,
                              fontFamily: REGULAR,
                              color: '#fff',
                              paddingLeft: 10,
                            }}>
                            Master 250GB
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 50,
                            width: '30%',
                            justifyContent: 'center',
                            paddingLeft: 20,
                          }}>
                          <Image
                            style={{ width: 30, height: 30, resizeMode: 'contain' }}
                            source={require('../../assets/create_vault/master.png')}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: '40%',
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: 20,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#e7e7e7',
                          }}>
                          62.5 SHDW
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setVaultSize('1000 GB');
                        setDropdown(false);
                      }}
                      style={{
                        flexDirection: 'row',
                        height: 50,
                        borderBottomWidth: 1,
                        borderBottomColor: '#4B3656',
                      }}>
                      <View style={{ width: '60%', flexDirection: 'row' }}>
                        <View style={{ height: 50, width: '50%', justifyContent: 'center' }}>
                          <Text
                            allowFontScaling={false}
                            style={{
                              fontSize: 12,
                              fontFamily: REGULAR,
                              color: '#fff',
                              paddingLeft: 10,
                            }}>
                            Blaster 1TB
                          </Text>
                        </View>
                        <View
                          style={{
                            height: 50,
                            width: '30%',
                            justifyContent: 'center',
                            paddingLeft: 20,
                          }}>
                          <Image
                            style={{ width: 30, height: 30, resizeMode: 'contain' }}
                            source={require('../../assets/create_vault/blaster.png')}
                          />
                        </View>
                      </View>

                      <View
                        style={{
                          width: '40%',
                          height: 50,
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                          paddingRight: 20,
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#e7e7e7',
                          }}>
                          250 SHDW
                        </Text>
                      </View>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View
                    style={{
                      marginTop: 5,
                      width: '100%',
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => setDropdown(!dropdown)}
                      style={{
                        flexDirection: 'row',
                        height: 45,
                        borderColor: Colors.dark.innerBackground,
                        borderWidth: 1,
                        borderRadius: 10,
                      }}>
                      <View style={{ width: '80%', justifyContent: 'center' }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#fff',
                            paddingLeft: 10,
                          }}>
                          Choose size of your vault{vaultSize && <Text> - [{vaultSize}]</Text>}
                        </Text>
                      </View>

                      <View
                        style={{
                          width: '20%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <Image
                          style={{ width: 20, height: 20, resizeMode: 'contain' }}
                          source={require('../../assets/create_vault/down.png')}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
              {!dropdown && (
                <>
                  <View style={{ width: '100%' }}>
                    <View style={{ marginTop: 30 }}>
                      <Text
                        allowFontScaling={false}
                        style={{ fontSize: 14, fontFamily: MEDIUM, color: '#fff', paddingLeft: 2 }}>
                        Immutable Vault
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 5,
                        width: '100%',
                        flexDirection: 'row',
                        borderRadius: 10,
                        height: 40,
                        borderWidth: 1,
                        borderColor: Colors.dark.innerBackground,
                      }}>
                      <View
                        style={{
                          width: '100%',
                          justifyContent: 'flex-start',
                          alignItems: 'center',
                          display: 'flex',
                          flexDirection: 'row',
                        }}>
                        <Text
                          allowFontScaling={false}
                          style={{
                            fontSize: 12,
                            fontFamily: REGULAR,
                            color: '#fff',
                            paddingLeft: 10,
                            opacity: 0.6,
                          }}>
                          Make Vault Immutable
                        </Text>
                        <View
                          style={{
                            flexGrow: 1,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}>
                          <Switch
                            thumbColor={Colors.dark.innerBackground}
                            style={{
                              transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
                              marginRight: 8,
                            }}
                            activeThumbColor="#FFA2C0"
                            trackColor={{ false: '#FFA2C0', true: Colors.dark.innerBackground }}
                            value={immutable}
                            onValueChange={setImmutable}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '100%' }}>
            {loader ? (
              <View
                style={{
                  marginTop: 40,
                  width: '100%',
                  backgroundColor: '#6C5DD3',
                  borderRadius: 7,
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                  minHeight: 40,
                }}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => triggerCreateVault()}
                style={{
                  marginTop: 40,
                  width: '100%',
                  backgroundColor: '#6C5DD3',
                  borderRadius: 7,
                  paddingVertical: 13,
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    fontFamily: BOLD,
                    color: '#fff',
                    textAlign: 'center',
                  }}>
                  Create Vault
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    marginTop: 30,
    width: '100%',
    height: windowHeight,
    backgroundColor: Colors.dark.background,
    zIndex: 100,
  },
  row: {
    marginTop: 4,
    width: '100%',
    alignItems: 'center',
  },
  inputcontainer: {
    width: '100%',
  },
  link: {
    fontWeight: 'bold',
  },
  label: {
    color: Colors['dark'].text,
    marginVertical: 10,
    fontWeight: 'bold',
    fontSize: 2.2,
  },
  label1: {
    color: Colors['dark'].text,
    marginVertical: 0,
    fontWeight: 'bold',
    fontSize: '2.2',
  },
  Input: {
    padding: 10,
    backgroundColor: Colors['dark'].inputBackground,
    width: '100%',
    borderRadius: 5,
  },

  image: {
    width: '55%',
    height: '25%',
    marginBottom: 8,
  },
  text: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
    margin: 0,
  },
  exitVault: {
    position: 'absolute',
    right: 25,
    top: -15,
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
    zIndex: 100,
  },
  close: {
    width: 15,
    height: 15,
    marginTop: 15,
    marginRight: 2,
  },
});
