import { AntDesign } from '@expo/vector-icons';
import { PublicKey } from '@solana/web3.js';
import React, { useContext } from 'react';
import { Text, Pressable, StyleSheet, Image, View, TouchableOpacity } from 'react-native';

import { GlobalContext } from '../GlobalProvider';
import { BOLD, Colors, MEDIUM, REGULAR } from '../constants';

type Props = {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: number;
  isImmutable: boolean;
  onPress: (id: string) => void;
};

const humanReadableDate = (date: number) => {
  const dateObj = new Date(date * 1000);
  const month = dateObj.getUTCMonth() + 1; //months from 1-12
  const day = dateObj.getUTCDate();
  const year = dateObj.getUTCFullYear();

  return year + '/' + month + '/' + day;
};

export function TokenRow({ id, name, imageUrl, createdAt, isImmutable, onPress }: Props) {
  const globalContext = useContext(GlobalContext);
  const [date, setDate] = React.useState(humanReadableDate(createdAt));

  const makeImmutable = async (id: string) => {
    await globalContext.drive?.makeStorageImmutable(new PublicKey(id), 'v2');
  };

  return (
    <Pressable onPress={() => onPress(id)} style={styles.container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <div style={styles.infoContainer}>
          <Text style={styles.name}>{name}</Text>
          <Text style={styles.subInfo}>{date}</Text>
        </div>
        {isImmutable ? (
          <TouchableOpacity style={styles.immutableButton}>
            <Text style={{ fontSize: 12, color: Colors.dark.text, fontFamily: MEDIUM }}>
              Immutable
            </Text>
            <AntDesign name="check" size={16} style={{ paddingLeft: 2 }} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.immutableButton}
            onPress={async () => await makeImmutable(id)}>
            <Text style={{ fontSize: 12, color: Colors.dark.text, fontFamily: MEDIUM }}>
              Make Immutable
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Colors.dark.background,
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 22,
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.dark.text,
    fontFamily: MEDIUM,
  },
  price: {
    fontSize: 18,
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 0.5,
  },
  subInfo: {
    fontSize: 10,
    color: Colors.dark.text,
    fontFamily: REGULAR,
  },
  immutableButton: {
    fontSize: 12,
    color: Colors.dark.text,
    fontFamily: BOLD,
    flexGrow: 0.75,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    textAlign: 'end',
    marginRight: 20,
  },
});
