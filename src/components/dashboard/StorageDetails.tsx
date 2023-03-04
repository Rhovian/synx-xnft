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
      setAccountFiles({
        account1: [
          {
            fileType: 'pdf',
            icon: undefined,
            name: 'file1.pdf',
            size: '25 MB',
          },
        ],
        account2: [
          {
            fileType: 'pdf',
            icon: undefined,
            name: 'file1.pdf',
            size: '25 MB',
          },
        ],
        account3: [
          {
            fileType: 'pdf',
            icon: undefined,
            name: 'file1.pdf',
            size: '25 MB',
          },
        ],
        account6: [
          {
            fileType: 'pdf',
            icon: undefined,
            name: 'file1.pdf',
            size: '25 MB',
          },
        ],
        account5: [
          {
            fileType: 'pdf',
            icon: undefined,
            name: 'file1.pdf',
            size: '25 MB',
          },
        ],
        account9: [
          {
            fileType: 'pdf',
            icon: undefined,
            name: 'file1.pdf',
            size: '25 MB',
          },
        ],
      });
    })();
  }, [globalContext.accounts]);

  return (
    <div style={styles.filesContainer}>
      <div style={{ width: '100%', height: 200 }}>hello</div>
      {Object.entries(accountFiles).map(([accountKey, files]) => (
        <FileButtonContainer key={accountKey} files={files} />
      ))}
    </div>
  );
}

const styles = StyleSheet.create({
  filesContainer: {
    width: '100%',
    paddingHorizontal: 16,
  },
});
