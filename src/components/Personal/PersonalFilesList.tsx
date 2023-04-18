import { MaterialIcons, Feather, Entypo } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect, useContext } from 'react';
import { View, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { FlatList } from 'react-native-gesture-handler';

import { PesonalFileInfo } from './PersonalFileInfo';
import { GlobalContext } from '../../GlobalProvider';
import { BOLD, Colors, MEDIUM, REGULAR } from '../../constants';
import { FileInfo } from '../../models';
import { sortFileInfoArray, ItemSeparatorComponent, FullScreenLoadingIndicator } from '../../utils';
import { EmptyFiles } from '../EmptyFiles';
import { CreateVault } from '../Vaults/CreateVault';
import { VaultsView } from '../Vaults/VaultsView';

export const PersonalFilesList = ({ data }: { data: FileInfo[] }) => {
  const [files, setFiles] = useState([
    { label: 'All', value: 'all' },
    { label: 'Image', value: 'image' },
    { label: 'Video', value: 'video' },
    { label: 'Audio', value: 'audio' },
    { label: 'PDF', value: 'pdf' },
    { label: 'PowerPoint', value: 'ppt' },
    { label: 'Text', value: 'text' },
    { label: 'CSV', value: 'csv' },
    { label: 'Zip', value: 'zip' },
    { label: 'Unknown', value: 'unknown' },
  ]);

  const [fileSelected, setFileSelected] = useState(null);
  const [open, setOpen] = useState(false);
  const [showCreateVault, setShowCreateVault] = useState(false);
  const [showVaultsView, setShowVaultsView] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [sortedData, setSortedData] = useState(data);
  const globalProvider = useContext(GlobalContext);
  const [displayClose, setDisplayClose] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showEmptyFiles, setShowEmptyFiles] = useState(false);

  useEffect(() => {
    if (globalProvider.currentAccountFiles) {
      if (data.length === 0) {
        setShowEmptyFiles(true);
      } else {
        setShowEmptyFiles(false);
      }
    }
  }, [data]);

  useEffect(() => {
    // Filter by file type if fileSelected is not null
    let filteredData = data;
    if (fileSelected && fileSelected !== 'all') {
      filteredData = data.filter((item) => item.fileType === fileSelected);
    }

    if (fileSelected === 'all') {
      filteredData = data;
    }

    // Sort by name if searchValue is empty, otherwise sort by relevance
    let sortedData = filteredData;
    if (searchValue === '') {
      sortedData = [...filteredData];
    } else {
      sortedData = sortFileInfoArray(filteredData, searchValue);
    }

    setSortedData(sortedData);
  }, [data, fileSelected, searchValue]);

  useEffect(() => {
    if (globalProvider.accounts.length !== 0) {
      setDisplayClose(true);
    }
  }, [globalProvider.accounts]);

  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);

  const showVaultView = () => {
    setShowVaultsView(true);
  };

  const closeVaultView = () => {
    setShowVaultsView(false);
  };

  useIsFocused();

  return (
    <View style={styles.container}>
      {showVaultsView ? (
        <div style={styles.vaultsViewWrap}>
          <VaultsView />
          {displayClose ? (
            showCreateVault ? (
              <div />
            ) : (
              <TouchableOpacity style={styles.exitVault} onPress={closeVaultView}>
                <Image
                  style={styles.close}
                  resizeMode="contain"
                  source={require('../../assets/close.png')}
                />
              </TouchableOpacity>
            )
          ) : (
            <div />
          )}
        </div>
      ) : (
        <div style={styles.appContainer}>
          {showCreateVault ? (
            <div />
          ) : (
            <View style={styles.sortContainer}>
              <TextInput
                placeholder="Search Files"
                value={searchValue}
                onChangeText={setSearchValue}
                style={styles.inputStyles}
              />
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
                  zIndex={1000}
                  dropDownDirection="BOTTOM"
                  dropDownContainerStyle={styles.dropDownOptions}
                  arrowIconContainerStyle={{
                    marginLeft: 3,
                  }}
                  ArrowDownIconComponent={({ style }) => (
                    <MaterialIcons
                      name="keyboard-arrow-down"
                      size={20}
                      color={Colors.dark.greyText}
                    />
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
              <View style={styles.createVaultIconWrap}>
                <TouchableOpacity style={styles.view} onPress={showVaultView}>
                  <Image
                    style={styles.creatVaultIcon}
                    source={require('../../assets/create-vault-icon.png')}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
          {loading ? (
            <FullScreenLoadingIndicator />
          ) : showEmptyFiles ? (
            showCreateVault ? (
              <CreateVault exitVault={() => setShowCreateVault(false)} />
            ) : (
              <EmptyFiles showCreateVault={() => setShowCreateVault(true)} />
            )
          ) : (
            <FlatList
              style={styles.listContainer}
              data={sortedData}
              overScrollMode="auto"
              keyExtractor={(item) => item.name}
              ItemSeparatorComponent={ItemSeparatorComponent}
              renderItem={({ item }) => {
                return <PesonalFileInfo fileInfo={item} />;
              }}
            />
          )}
        </div>
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
    padding: 12,
    width: '100%',
    height: '100%',
  },
  appContainer: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    marginVertical: 8,
    minHeight: 400,
  },
  sortContainer: {
    display: 'flex',
    position: 'relative',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    height: 70,
    marginVertical: 8,
    zIndex: 100,
  },
  listContainer: {
    width: '97%',
    minWidth: 300,
    maxHeight: 320,
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
    position: 'relative',
  },
  dropDownOptions: {
    width: '50%',
    backgroundColor: Colors.dark.innerBackground,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginVertical: 8,
    position: 'absolute',
    zIndex: 1000,
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
  createVaultIconWrap: {
    display: 'flex',
    position: 'absolute',
    right: 0,
    top: 5,
    zIndex: 100,
  },
  creatVaultIcon: {
    width: 22,
    height: 22,
    marginRight: 4,
  },
  vaultsViewWrap: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  exitVault: {
    position: 'absolute',
    right: 25,
    top: 40,
    fontSize: 18,
    color: Colors.dark.text,
    fontFamily: BOLD,
  },
  close: {
    width: 15,
    height: 15,
    marginTop: 15,
    marginRight: 2,
  },
});
