import { Audio } from 'expo-av';
import * as React from 'react';
import { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';

import { Colors } from '../../constants';

export function AudioFile({ uri }: any) {
  const [sound, setSound] = useState<Audio.Sound | undefined>();

  async function playSound() {
    console.log('Loading Sound');
    console.log(uri);
    const { sound } = await Audio.Sound.createAsync({ uri });
    setSound(sound);

    console.log('Playing Sound');
    await sound.playAsync();
  }

  React.useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <View style={styles.container}>
      <Button title="Play" color={Colors.dark.inputBackground} onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.dark.background,
    padding: 10,
  },
  button: {
    backgroundColor: Colors.dark.inputBackground,
  },
});
