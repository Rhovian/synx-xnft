import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createStackNavigator, StackCardStyleInterpolator } from '@react-navigation/stack';
import { StorageAccountResponse } from '@shadow-drive/sdk';
import { Video, AVPlaybackStatus, ResizeMode } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  Animated,
  StyleSheet,
  Button,
} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { GlobalContext } from '../GlobalProvider';
import { ActionMenu } from '../components/ActionMenu';
import { Screen } from '../components/Screen';
import { TokenRow } from '../components/TokenRow';
import { AudioFile } from '../components/dashboard/AudioFile';
import { Balance } from '../components/dashboard/Balance';
import { FileButton } from '../components/dashboard/FileInfo';
import { BOLD, Colors } from '../constants';

type RootStackParamList = {
  List: object;
  Detail: { id: string; navigation: any };
  FileViewer: {
    fileType: any;
    body: any;
  };
};

const Stack = createStackNavigator<RootStackParamList>();

function FullScreenLoadingIndicator() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dark.background,
      }}>
      <ActivityIndicator color="#eee" />
    </View>
  );
}

function transformStorageAccounts(accounts: StorageAccountResponse[]) {
  return accounts.map((account) => {
    return {
      id: account.publicKey,
      name: account.account.identifier,
      imageUrl: require('../assets/create_vault.png'),
      createdAt: account.account.creationTime,
      isImmutable: account.account.immutable,
    };
  });
}

function List({ navigation }: NativeStackScreenProps<RootStackParamList, 'List'>) {
  const globalContext = useContext(GlobalContext);
  const [data, setData] = useState(transformStorageAccounts(globalContext.accounts));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setData(transformStorageAccounts(globalContext.accounts));
  }, [globalContext.accounts]);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [data]);

  const handlePressTokenRow = (id: string) => {
    globalContext.selectAccount(id)
    navigation.push('Detail', { id, navigation });
  };

  if (globalContext.loading) {
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
      {loading ? (
        <FullScreenLoadingIndicator />
      ) : (
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
      )}
      <ActionMenu />
    </Screen>
  );
}

function Detail({ route, navigation }: NativeStackScreenProps<RootStackParamList, 'Detail'>) {
  const globalContext = useContext(GlobalContext);
  const { id } = route.params;
  const [data, setData] = useState(globalContext.accountFiles[id]);
  console.log(globalContext.accountFiles[id]);

  useEffect(() => {
    setData(globalContext.accountFiles[id]);
  }, [globalContext.accountFiles]);

  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
    />
  );

  const handlePressTokenRow = (item: any) => {
    navigation.push('FileViewer', { fileType: item.fileType, body: item.body });
  };

  return (
    <Screen style={{ backgroundColor: Colors.dark.background }}>
      <FlatList
        style={{ flex: 1, backgroundColor: Colors.dark.background, paddingTop: 35 }}
        data={data}
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return (
            <FileButton
              fileInfo={item}
              onPress={() => handlePressTokenRow(item)}
              style={styles.item} // add this line
            />
          );
        }}
      />
      <ActionMenu />
    </Screen>
  );
}

function FileViewer({ route }: NativeStackScreenProps<RootStackParamList, 'FileViewer'>) {
  const { fileType, body } = route.params;
  const video = React.useRef<Video>(null);
  // @ts-ignore
  const [status, setStatus] = React.useState<AVPlaybackStatus>({});

  if (fileType === 'image') {
    return (
      <View style={{ flex: 1 }}>
        <Image
          style={{ flex: 1, backgroundColor: Colors.dark.background }}
          source={{ uri: body }}
          resizeMode="contain"
        />
      </View>
    );
  } else if (fileType === 'video') {
    return (
      <View style={{ flex: 1, backgroundColor: Colors.dark.background }}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: ResizeMode.CONTAIN,
            source: {
              uri: body,
            },
          }}
        />
      </View>
    );
  } else if (fileType === 'audio') {
    return <AudioFile uri={body} />;
  } else if (fileType === 'text') {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text>{body}</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, padding: 10 }}>
        <Text>File type not supported</Text>
        <Text>{body}</Text>
      </View>
    );
  }
}

const forSlide: StackCardStyleInterpolator = ({ current, next, inverted, layouts: { screen } }) => {
  const progress = Animated.add(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
    next
      ? next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        })
      : 0
  );

  return {
    cardStyle: {
      transform: [
        {
          translateX: Animated.multiply(
            progress.interpolate({
              inputRange: [0, 1, 2],
              outputRange: [
                screen.width, // Focused, but offscreen in the beginning
                0, // Fully focused
                screen.width * -0.3, // Fully unfocused
              ],
              extrapolate: 'clamp',
            }),
            inverted
          ),
        },
      ],
    },
  };
};

export const TokenListNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        animationEnabled: true,
        cardStyleInterpolator: forSlide,
      }}>
      <Stack.Screen
        name="List"
        component={List}
        options={{
          title: 'Vaults',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTitleStyle: {
            color: Colors.dark.text,
            fontFamily: BOLD,
          },
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Detail"
        component={Detail}
        options={{
          title: 'Vault Files',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTitleStyle: {
            color: Colors.dark.text,
            fontFamily: BOLD,
          },
        }}
      />
      <Stack.Screen
        name="FileViewer"
        component={FileViewer}
        options={{
          title: 'File Viewer',
          headerStyle: {
            backgroundColor: Colors.dark.background,
          },
          headerTitleStyle: {
            color: Colors.dark.text,
            fontFamily: BOLD,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  titleBalancesWrap: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  item: {
    width: '100%',
  },
});
