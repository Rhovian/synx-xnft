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
} from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { AlertMessage } from '../components/Alert';
import BackButton from '../components/BackButton';
import CustomStatusBar from '../components/StatusBarComponent';
import { BOLD, REGULAR, Colors } from '../constants';

const windowHeight = Dimensions.get('window').height;

// @ts-ignore
export function CreateVault({ navigation }) {
  const [vaultName, setVaultName] = useState('');
  const [vaultSize, setVaultSize] = useState('');
  const [loader, setLoader] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const globalContext = useContext(GlobalContext);

  const changeRate = (size: string) => {};

  const triggerCreateVault = async () => {
    if (!vaultName) {
      AlertMessage(
        'Vault Name is missing',
        'Please provide Vault Name and try again. Thanks',
        'red'
      );
    } else if (!vaultSize) {
      AlertMessage(
        'Vault Size is missing',
        'Please select Vault Size and try again. Thanks',
        'red'
      );
    } else {
      setLoader(true);
      /** Create the vault here */
      const newAccount = await globalContext
        .createAccount(vaultName, vaultSize.replaceAll(' ', ''))
        .catch((err) => {
          console.log(err);
        });

      if (newAccount) {
        globalContext.refreshAccounts();
        navigation.navigate('Vaults');
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
        <View style={{ width: '100%', height: '80%' }}>
          <CustomStatusBar backgroundColor={Colors['dark'].background} />
          <BackButton goBack={navigation.goBack} title="Create New Vault" />
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '90%' }}>
              <View
                style={{
                  marginTop: 30,
                }}>
                <View style={{}}>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 16, fontFamily: REGULAR, color: '#fff' }}>
                    Vault Name
                  </Text>
                </View>
                <View
                  style={{
                    marginTop: 15,
                    width: '100%',
                    flexDirection: 'row',
                    backgroundColor: '#322A3d',
                    borderRadius: 10,
                  }}>
                  <View style={{ width: '90%' }}>
                    <View style={{ width: '100%', paddingHorizontal: 10 }}>
                      <textarea
                        id="createVaultInput"
                        style={{
                          color: Colors.dark.text,
                          fontSize: 12,
                          fontFamily: REGULAR,
                          height: 35,
                          backgroundColor: 'transparent',
                          border: 'none',
                          resize: 'none',
                          paddingTop: 5,
                        }}
                        placeholder="Name of Vault"
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
                    style={{ fontSize: 16, fontFamily: REGULAR, color: '#fff' }}>
                    Size of Vault
                  </Text>
                </View>
                {dropdown ? (
                  <View
                    style={{
                      marginTop: 15,
                      width: '100%',
                      backgroundColor: '#322A3d',
                      borderRadius: 10,
                      paddingBottom: 15,
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
                          source={require('../assets/create_vault/down.png')}
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
                            source={require('../assets/create_vault/starter.png')}
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
                            source={require('../assets/create_vault/faster.png')}
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
                            source={require('../assets/create_vault/master.png')}
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
                            source={require('../assets/create_vault/blaster.png')}
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
                      marginTop: 15,
                      width: '100%',
                      backgroundColor: '#322A3d',
                      borderRadius: 10,
                    }}>
                    <TouchableOpacity
                      onPress={() => setDropdown(!dropdown)}
                      style={{
                        flexDirection: 'row',
                        height: 45,
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
                          source={require('../assets/create_vault/down.png')}
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
                        style={{ fontSize: 16, fontFamily: REGULAR, color: '#fff' }}>
                        Immutable Vault
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 15,
                        width: '100%',
                        flexDirection: 'row',
                        backgroundColor: '#322A3d',
                        borderRadius: 10,
                        height: 40,
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
                          Make Vault Immutable
                        </Text>
                      </View>

                      {/*<View
                        style={{
                          width: '20%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <SwitchToggle
                          switchOn={isImmutable}
                          onPress={() => setIsImmutable(!isImmutable)}
                          circleColorOff="#322A3D"
                          circleColorOn="#322A3D"
                          backgroundColorOn="#804694"
                          backgroundColorOff="#493750"
                          containerStyle={{
                            // marginTop: 16,
                            width: 40,
                            height: 20,
                            borderRadius: 25,
                            padding: 5,
                          }}
                          circleStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      */}
                    </View>
                  </View>

                  <View style={{ width: '100%' }}>
                    <View style={{ marginTop: 30 }}>
                      <Text
                        allowFontScaling={false}
                        style={{ fontSize: 16, fontFamily: REGULAR, color: '#fff' }}>
                        Token Gated Content
                      </Text>
                    </View>

                    <View
                      style={{
                        marginTop: 15,
                        width: '100%',
                        flexDirection: 'row',
                        backgroundColor: '#322A3d',
                        borderRadius: 10,
                        height: 40,
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
                          Restrict Token Access
                        </Text>
                      </View>

                      {/*<View
                        style={{
                          width: '20%',
                          alignItems: 'center',
                          justifyContent: 'center',
                          alignContent: 'center',
                        }}>
                        <SwitchToggle
                          switchOn={isRestrictToken}
                          onPress={() => setIsRestrictToken(!isRestrictToken)}
                          circleColorOff="#322A3D"
                          circleColorOn="#322A3D"
                          backgroundColorOn="#804694"
                          backgroundColorOff="#493750"
                          containerStyle={{
                            // marginTop: 16,
                            width: 40,
                            height: 20,
                            borderRadius: 25,
                            padding: 5,
                          }}
                          circleStyle={{
                            width: 10,
                            height: 10,
                            borderRadius: 20,
                          }}
                        />
                      </View>
                      */}
                    </View>
                  </View>
                </>
              )}
            </View>
          </View>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <View style={{ width: '90%' }}>
            {loader ? (
              <View
                style={{
                  marginTop: 55,
                  width: '100%',
                  backgroundColor: '#804694',
                  borderRadius: 5,
                  paddingVertical: 13,
                  alignItems: 'center',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <ActivityIndicator size="small" color="#fff" />
              </View>
            ) : (
              <TouchableOpacity
                onPress={() => triggerCreateVault()}
                style={{
                  marginTop: 55,
                  width: '100%',
                  backgroundColor: '#804694',
                  borderRadius: 5,
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
    paddingVertical: 25,
    width: '100%',
    height: windowHeight,
    backgroundColor: Colors['dark'].background,
  },
  sheetImage: { width: 25, height: 25 },

  tabs: {
    backgroundColor: '#322A3D',
    padding: 15,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    marginVertical: 5,
    borderRadius: 5,
  },
  soundtabs: {
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItem: 'center',
    // marginVertical:5,
    // borderRadius:5
  },
  soundtabText: {
    color: '#fff',
  },
  soundtabImage: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
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
});
