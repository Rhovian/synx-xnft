import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native-gesture-handler';

import { PesonalFileInfo } from './PersonalFileInfo';
import { Colors, MEDIUM, REGULAR } from '../constants';
import { File } from '../models';

export const Files = () => {
  const data: File[] = [
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
    {
      name: 'file1',
      size: '1.2mb',
      icon: <Image style={{ width: 20, height: 24 }} source={require('../assets/file-icon.png')} />,
    },
  ];

  const [files, setFiles] = useState([
    { label: 'Image', value: 'Image' },
    { label: 'Video', value: 'Video' },
  ]);

  const [fileSelected, setFileSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const [fileTypeValue, setFileTypeValue] = useState('Image');
  const ItemSeparatorComponent = () => (
    <View
      style={{ marginVertical: 8, borderColor: Colors.dark.inputBackground, borderBottomWidth: 1 }}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.sortContainer}>
        <TextInput placeholder="Search Files" style={styles.inputStyles} />
        <View style={styles.dropDownContainer}>
          <DropDownPicker
            open={open}
            setOpen={setOpen}
            style={styles.dropdown}
            textStyle={{ color: '#949494', fontFamily: MEDIUM, fontSize: 14 }}
            value={fileSelected}
            setValue={setFileSelected}
            items={files}
            setItems={setFiles}
            placeholder="Sorted by type"
            arrowIconContainerStyle={{
              marginLeft: 3,
            }}
            ArrowDownIconComponent={({ style }) => (
              <MaterialIcons name="keyboard-arrow-down" size={20} color={Colors.dark.greyText} />
            )}
          />
          <View style={styles.viewContainer}>
            <TouchableOpacity style={styles.view}>
              <Feather name="list" size={22} color={Colors.dark.greyText} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.view}>
              <Entypo name="grid" size={24} color={Colors.dark.greyText} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.listContainer}
        data={data}
        overScrollMode="auto"
        keyExtractor={(item) => item.name}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={({ item }) => {
          return <PesonalFileInfo fileInfo={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    width: '100%',
    height: '100%',
  },
  sortContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 70,
    marginVertical: 8,
  },
  listContainer: {
    width: '97%',
    height: '100%',
    zIndex: 99,
    marginVertical: 8,
  },
  inputStyles: {
    width: '100%',
    height: 32.5,
    backgroundColor: Colors.dark.inputBackground,
    borderRadius: 8,
    color: Colors.dark.greyText,
    fontFamily: REGULAR,
    paddingHorizontal: 12,
  },
  dropdown: {
    backgroundColor: 'transparent',
    fontFamily: REGULAR,
    color: Colors.dark.greyText,
    zIndex: 100,
    minHeight: 30,
    maxWidth: 150,
    border: 'none',
  },
  dropDownContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    maxWidth: 300,
    paddingHorizontal: 14,
    marginTop: 3,
    height: 30,
  },
  viewContainer: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  view: {
    paddingHorizontal: 4,
  },
});
