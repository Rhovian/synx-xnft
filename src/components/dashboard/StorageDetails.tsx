import { ListObjectsResponse, StorageAccountResponse } from '@shadow-drive/sdk/dist/types';
import { PublicKey } from '@solana/web3.js';
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet } from 'react-native';

import { FileButtonContainer } from './FilesContainer';
import CircularProgress from './PieChart';
import { GlobalContext } from '../../GlobalProvider';

export function StorageDetails() {
  const [accountsLength, setAccountsLength] = useState(0);
  const [accountFiles, setAccountFiles] = useState<Record<string, any[]>>({});

  const globalContext = useContext(GlobalContext);

  const getAccountFileInfo = (res: Response, name: string) => {
    const mimeType = res.headers.get('Content-Type');
    const size = res.headers.get('Content-Length');

    let fileType;
    let icon;

    if (mimeType?.includes('image')) {
      fileType = 'image';
    } else if (mimeType?.includes('video')) {
      fileType = 'video';
    } else if (mimeType?.includes('audio')) {
      fileType = 'audio';
    } else if (mimeType?.includes('text')) {
      fileType = 'text';
    } else if (mimeType?.includes('application')) {
      fileType = 'application';
    } else {
      fileType = 'unknown';
    }
    return {
      fileType,
      icon,
      name,
      size,
    };
  };
  const filterAccountFiles = async (account: StorageAccountResponse) => {
    const files = await globalContext.drive?.listObjects(new PublicKey(account.publicKey));
    if (files?.keys.length) {
      if (files.keys.length > 0) {
        return files;
      }
    }
  };

  const getAccountFiles = async (account: StorageAccountResponse, files: ListObjectsResponse) => {
    const accountKey = account.publicKey.toString();
    const accountFilesArray = await Promise.all(
      files.keys.map(async (file) => {
        const res = await fetch(
          `https://shdw-drive.genesysgo.net/` + account.publicKey + '/' + file
        );

        return getAccountFileInfo(res, file);
      })
    );
    setAccountFiles((prevAccountFiles) => ({
      ...prevAccountFiles,
      [accountKey]: accountFilesArray,
    }));
  };

  useEffect(() => {
    // iterate through all accounts, and generate the dashboard data for all files in each account
    (async () => {
      setAccountsLength(globalContext.accounts.length);
      globalContext.accounts.forEach(async (account) => {
        const files = await filterAccountFiles(account);
        if (files) {
          getAccountFiles(account, files);
        }
      });
    })();
  }, [globalContext.accounts]);

  return (
    <div style={styles.filesContainer}>
      {Object.entries(accountFiles).map(([accountKey, files]) => (
        <FileButtonContainer key={accountKey} files={files} />
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  filesContainer: {
    width: '100%',
  },
});
