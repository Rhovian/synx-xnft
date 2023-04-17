import React, { useEffect } from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { Colors, BOLD, MEDIUM, REGULAR } from '../../constants';
import { FileInfo } from '../../models';

// @ts-ignore
export const RecentFileInfo = ({ fileInfo }: { fileInfo: FileInfo }) => {
  const [fileIcon, setFileIcon] = React.useState<any>(null);

  useEffect(() => {
    if (fileInfo) {
      setFileIcon(require(`../../assets/fileTypeIcons/${fileInfo.fileType}-icon.png`));
    }
  }, [fileInfo]);

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={fileIcon} resizeMode="contain" style={styles.iconWrapper} />
      <div style={styles.infoContainer}>
        <Text style={styles.name}>{fileInfo.name.slice(0, 16)}...</Text>
        <Text style={styles.subInfo}>Last modified: 1/1/2021</Text>
      </div>
      <TouchableOpacity
        style={styles.immutableButton}
        onPress={() => console.log('go to file viewer')}>
        <Text style={{ fontSize: 12, color: Colors.dark.text, fontFamily: MEDIUM }}>
          {fileInfo.size}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: Colors.dark.innerBackground,
    minHeight: 50,
    borderRadius: 6,
  },
  iconWrapper: {
    marginLeft: 8,
    width: 30,
    height: 34,
  },
  name: {
    fontSize: 14,
    color: Colors.dark.text,
    fontFamily: BOLD,
    textAlign: 'left',
  },
  infoContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    paddingLeft: 8,
  },
  subInfo: {
    fontSize: 9,
    color: 'grey',
    fontFamily: REGULAR,
  },
  immutableButton: {
    fontSize: 12,
    color: Colors.dark.text,
    fontFamily: BOLD,
    flexGrow: 1,
    display: 'flex',
    textAlign: 'end',
    paddingRight: 8,
  },
});
