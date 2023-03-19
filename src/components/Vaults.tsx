import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';

import { ActionMenu } from './ActionMenu';
import { Screen } from './Screen';
import { TokenRow } from './TokenRow';
import { Balance } from './Balance';
import { GlobalContext } from '../GlobalProvider';
import { BOLD, Colors } from '../constants';
import { RootStackParamList } from '../models';
import { FullScreenLoadingIndicator, transformStorageAccounts } from '../utils';

export function VaultsList({ navigation }: NativeStackScreenProps<RootStackParamList, 'Vaults'>) {
  const globalContext = useContext(GlobalContext);
  const [data, setData] = useState(transformStorageAccounts(globalContext.accounts));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(transformStorageAccounts(globalContext.accounts));
  }, [globalContext.accounts]);

  useEffect(() => {
    setLoading(globalContext.loading);
  }, [globalContext.loading]);

  const handlePressTokenRow = (id: string) => {
    globalContext.selectAccount(id as any);
    navigation.push('Files', { id, navigation });
  };

  if (loading) {
    return <FullScreenLoadingIndicator />;
  }

  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
    />
  );

  return (
    <Screen style={{ backgroundColor: Colors.dark.background, paddingHorizontal: 0 }}>
      <div style={styles.titleBalancesWrap}>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: RFValue(21),
            color: Colors['dark'].text,
            fontFamily: BOLD,
            textAlign: 'center',
          }}>
          Vaults Dashboard
        </Text>
        <Balance />
      </div>
      <FlatList
        style={{
          flex: 1,
          backgroundColor: Colors.dark.background,
          paddingTop: 35,
          paddingHorizontal: 20,
        }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <TokenRow
              id={item.id.toString()}
              name={item.name}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
              isImmutable={item.isImmutable}
              onPress={handlePressTokenRow}
            />
          );
        }}
      />
      <ActionMenu />
    </Screen>
  );
}

const styles = StyleSheet.create({
  titleBalancesWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
});
