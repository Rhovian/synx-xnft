import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import {
  ShdwDrive,
  StorageAccountResponse,
  ShadowDriveResponse,
  CreateStorageResponse,
  ShadowBatchUploadResponse,
  StorageAccountInfo,
  ShadowFile,
  ListObjectsResponse,
} from '@shadow-drive/sdk';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js';
import React, { createContext, useEffect, useState } from 'react';

import { SHADOW_TOKEN_MINT } from './constants';
import { usePublicKey, usePublicKeys, useSolanaConnection } from './hooks/xnft-hooks';

export interface GlobalProvider {
  connection: Connection;
  wallet: PublicKey;
  solBalance: number;
  shdwBalance: number;
  loading: boolean;
  shdwTokenAccount: PublicKey | undefined;
  drive: ShdwDrive | undefined;
  accounts: StorageAccountResponse[];
  currentAccount: StorageAccountResponse | undefined;
  currentAccountInfo: any;
  currentAccountFiles: any[];
  accountFiles: Record<string, any[]>;
  refreshBalances(): Promise<void>;
  refreshAccounts(): Promise<StorageAccountResponse[]>;
  selectAccount(arg0: StorageAccountResponse): Promise<void>;
  refreshCurrentAccountFiles(): Promise<string[]>;
  refreshCurrentAccountInfo(): Promise<StorageAccountInfo>;
  refreshCurrentAccountData(): Promise<void>;
  createAccount(accountName: string, size: string): Promise<CreateStorageResponse>;
  uploadFiles(Files: any): Promise<ShadowBatchUploadResponse[]>;
  deleteCurrentAccount(): Promise<ShadowDriveResponse>;
  undeleteCurrentAccount(): Promise<ShadowDriveResponse>;
  resizeCurrentAccount(size: number, unit: string): Promise<ShadowDriveResponse>;
  deleteCurrentAccountFile(fileUrl: string): Promise<ShadowDriveResponse>;
}

export const STORAGE_UNITS = ['KB', 'MB', 'GB'];

// @ts-ignore
export const GlobalContext = createContext<GlobalProvider>({});

export function GlobalProvider(props: any) {
  const connection = useSolanaConnection();
  const wallet = usePublicKey();
  const [solBalance, setSolBalance] = useState(0);
  const [shdwBalance, setShdwBalance] = useState(0);
  const [shdwTokenAccount, setShdwTokenAccount] = useState<PublicKey>();
  const [drive, setDrive] = useState<ShdwDrive>();
  const [accounts, setAccounts] = useState<StorageAccountResponse[]>([]);
  const [currentAccount, setCurrentAccount] = useState<StorageAccountResponse>();
  const [currentAccountInfo, setCurrentAccountInfo] = useState<StorageAccountInfo>();
  const [currentAccountFiles, setCurrentAccountFiles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [accountFiles, setAccountFiles] = useState<Record<string, any[]>>({});

  useEffect(() => {
    (async () => {
      const shdwDrive = await new ShdwDrive(connection, {
        signTransaction: async (tx: Transaction) => {
          return window.xnft.solana.signTransaction(tx);
        },
        signAllTransactions: async (txs: Transaction[]) => {
          return window.xnft.solana.signAllTransactions(txs);
        },
        signMessage(msg: any) {
          return window.xnft.solana.signMessage(msg);
        },
        publicKey: new PublicKey(wallet),
      }).init();

      setDrive(shdwDrive);
    })();
  }, [wallet]);

  useEffect(() => {
    refreshBalances().catch((err) => console.log(err.toString()));

    const timer = setInterval(() => {
      refreshBalances();
    }, 30000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshAccounts().catch((err) => console.log(err.toString()));
    setLoading(false);
    console.log(loading);
  }, [drive]);

  useEffect(() => {
    if (!currentAccount && accounts?.length) selectAccount(accounts[0].publicKey);
  }, [accounts]);

  useEffect(() => {
    refreshCurrentAccountData();
  }, [currentAccount]);

  async function refreshCurrentAccountData() {
    refreshCurrentAccountInfo().catch((err) => console.log(err.toString()));
    refreshCurrentAccountFiles().catch((err) => console.log(err.toString()));
  }

  async function refreshBalances() {
    setSolBalance((await connection.getBalance(wallet)) / LAMPORTS_PER_SOL);
    const shdwTokenAccount = await getAssociatedTokenAddress(SHADOW_TOKEN_MINT, wallet, true);
    setShdwTokenAccount(shdwTokenAccount);
    setShdwBalance((await connection.getTokenAccountBalance(shdwTokenAccount)).value.uiAmount!);
  }

  function humanFileSize(bytes: number, si = false, dp = 1) {
    const thresh = si ? 1000 : 1024;

    if (Math.abs(bytes) < thresh) {
      return bytes + ' B';
    }

    const units = si
      ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
      : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
    let u = -1;
    const r = 10 ** dp;

    do {
      bytes /= thresh;
      ++u;
    } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);

    return bytes.toFixed(dp) + ' ' + units[u];
  }

  const getAccountFileInfo = (res: Response, name: string) => {
    const mimeType = res.headers.get('Content-Type');
    const size = res.headers.get('Content-Length');

    let fileType;
    let icon;

    if (mimeType?.includes('image')) {
      fileType = 'image';
      icon = <MaterialCommunityIcons name="image" size={38} color="yellow" />;
    } else if (mimeType?.includes('video')) {
      fileType = 'video';
      icon = <MaterialCommunityIcons name="video" size={38} color="green" />;
    } else if (mimeType?.includes('audio')) {
      fileType = 'audio';
      icon = <MaterialCommunityIcons name="cast-audio-variant" size={38} color="white" />;
    } else if (mimeType?.includes('text')) {
      fileType = 'text';
      icon = <MaterialCommunityIcons name="file-document" size={38} color="blue" />;
    } else if (mimeType?.includes('application')) {
      if (mimeType?.includes('octet')) {
        icon = <AntDesign name="questioncircleo" size={38} color="red" />;
        fileType = 'unknown';
      } else {
        fileType = 'application';
        icon = <MaterialCommunityIcons name="application-cog" size={38} color="orange" />;
      }
    } else {
      icon = <AntDesign name="questioncircleo" size={38} color="red" />;
      fileType = 'unknown';
    }

    const hrsize = humanFileSize(parseInt(size!, 10));
    const body = res.url;

    return {
      fileType,
      icon,
      name,
      size: hrsize,
      body,
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

  async function refreshAccounts() {
    return new Promise<StorageAccountResponse[]>(async (resolve, reject) => {
      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      try {
        const accts = await drive.getStorageAccounts('v2').catch((err) => reject(err));

        if (accts) {
          const filteredAccounts: StorageAccountResponse[] = [];
          // check if the account has files
          for await (const acct of accts) {
            // get fliles
            const files = await drive.listObjects(new PublicKey(acct.publicKey));
            if (files.keys.length > 0) {
              filteredAccounts.push(acct);
              getAccountFiles(acct, files);
            }
          }
          setAccounts(
            accts.sort((a, b) =>
              a?.account?.identifier?.toLowerCase() > b?.account?.identifier?.toLowerCase() ? 1 : -1
            )
          );
          resolve(accts);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async function selectAccount(account: PublicKey) {
    setCurrentAccount(accounts[accounts.map((a) => a.publicKey).indexOf(account)]);
  }

  async function refreshCurrentAccountInfo() {
    return new Promise<StorageAccountInfo>(async (resolve, reject) => {
      if (!currentAccount?.publicKey) {
        reject(new Error('current account is not set'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const accountInfo = await drive
        .getStorageAccount(new PublicKey(currentAccount.publicKey))
        .catch((err) => reject(err));

      if (accountInfo) {
        setCurrentAccountInfo(accountInfo);
        resolve(accountInfo);
      }
    });
  }

  async function refreshCurrentAccountFiles() {
    return new Promise<string[]>(async (resolve, reject) => {
      if (!currentAccount?.publicKey) {
        reject(new Error('current account is not set'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const fileGroup = await drive
        .listObjects(new PublicKey(currentAccount.publicKey))
        .catch((err) => reject(err));

      if (fileGroup) {
        const sortedKeys = fileGroup?.keys?.sort();
        setCurrentAccountFiles(sortedKeys);
        resolve(sortedKeys);
      }
    });
  }

  async function createAccount(accountName: string, size: string) {
    return new Promise<CreateStorageResponse>(async (resolve, reject) => {
      if (!accountName?.trim()) {
        reject(new Error('a name must be specified'));
        return;
      }
      if (Number.isNaN(size)) {
        reject(new Error('specified size is not a valid number'));
        return;
      }
      /*
      if (!STORAGE_UNITS.includes(size)) {
        reject(new Error('specified unit size is invalid'));
        return;
      }
      */

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const newAcct = await drive
        .createStorageAccount(accountName, size, 'v2')
        .catch((err) => reject(err));

      if (!newAcct) return;

      try {
        const refreshedAccounts = await refreshAccounts();

        const foundAccount = refreshedAccounts.find(
          (a) => a.publicKey.toString() === newAcct.shdw_bucket
        );
        if (foundAccount) selectAccount(foundAccount.publicKey);
      } catch (e) {
        console.log(e);
      }

      resolve(newAcct);
    });
  }

  async function uploadFiles(files: FileList | ShadowFile[]) {
    return new Promise<ShadowBatchUploadResponse[]>(async (resolve, reject) => {
      console.log(currentAccount, accounts);
      if (!currentAccount?.publicKey) {
        reject(new Error('a storage account must be selected first'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const storageKey = new PublicKey(currentAccount.publicKey);

      const uploads = await drive
        .uploadMultipleFiles(storageKey, files)
        .catch((err) => reject(err.toString()));

      if (!uploads) return;

      const failures = uploads.filter((u) => !u.location).map((f) => `${f.fileName}: ${f.status}`);

      refreshCurrentAccountData();

      if (failures) {
        reject(failures.concat(failures));
        return;
      }

      resolve(uploads);
    });
  }

  async function deleteCurrentAccount() {
    return new Promise<ShadowDriveResponse>(async (resolve, reject) => {
      if (!currentAccount?.publicKey) {
        reject(new Error('you must select an account to delete first.'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const delAcct = await drive
        .deleteStorageAccount(new PublicKey(currentAccount.publicKey), 'v2')
        .catch((err) => reject(err));

      if (!delAcct) return;

      refreshCurrentAccountData();
      // TODO: clear current account
      // resolve(currentAccount);
      // clear current account
    });
  }

  async function undeleteCurrentAccount() {
    return new Promise<ShadowDriveResponse>(async (resolve, reject) => {
      if (!currentAccount?.publicKey) {
        reject(new Error('you must select an account to un-delete first.'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const delAcct = await drive
        .cancelDeleteStorageAccount(new PublicKey(currentAccount.publicKey), 'v2')
        .catch((err) => reject(err));

      if (!delAcct) return;

      refreshCurrentAccountData();
      // TODO: clear current account
      //resolve(delAcct);
    });
  }

  async function resizeCurrentAccount(size: number, unit: string) {
    return new Promise<ShadowDriveResponse>(async (resolve, reject) => {
      if (!currentAccountInfo?.storage_account) {
        reject(new Error('an account to resize must be selected first'));
        return;
      }
      if (Number.isNaN(size)) {
        reject(new Error('specified size is not a valid number'));
        return;
      }
      if (size <= 0) {
        reject(new Error('size must be greater than 0'));
        return;
      }
      if (!STORAGE_UNITS.includes(unit)) {
        reject(new Error('specified unit size is invalid'));
        return;
      }

      let multiplier = 0;
      switch (unit) {
        case 'KB':
          multiplier = 1024;
          break;
        case 'MB':
          multiplier = 1048576;
          break;
        case 'GB':
          multiplier = 1073741824;
          break;
        default:
          reject(new Error('Unknown storage unit size'));
          return;
      }

      const byteSize = size * multiplier;
      if (byteSize <= currentAccountInfo.current_usage) {
        reject(
          new Error(
            `${currentAccountInfo.current_usage} bytes are being used on the drive. You can't reduce the size to smaller than this.`
          )
        );
        return;
      }
      if (byteSize === currentAccountInfo.reserved_bytes) {
        reject(
          new Error(
            `storage size is already ${currentAccountInfo.reserved_bytes} bytes. Nothing to do`
          )
        );
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const pubkey = new PublicKey(currentAccountInfo.storage_account);

      let response;
      if (byteSize < currentAccountInfo.reserved_bytes) {
        const reductionSize = currentAccountInfo.reserved_bytes - byteSize;
        const reductionSizeUnited = byteSizeUnited(reductionSize);
        console.log('ttt reducing drive size by ', reductionSizeUnited);
        response = await drive
          .reduceStorage(pubkey, reductionSizeUnited, 'v2')
          .catch((err) => reject(err));
      } else {
        const incrementSize = byteSize - currentAccountInfo.reserved_bytes;
        const incrementSizeUnited = byteSizeUnited(incrementSize);
        console.log('ttt incrementing drive size by ', incrementSizeUnited);
        response = await drive
          .addStorage(pubkey, incrementSizeUnited, 'v2')
          .catch((err) => reject(err));
      }

      if (!response) return;

      refreshCurrentAccountData();
      resolve(response);
    });
  }

  function byteSizeUnited(n: number) {
    return n < 1024
      ? '1KB'
      : n < 1048576
      ? (n / 1024).toFixed(0) + 'KB'
      : n < 1073741824
      ? (n / 1048576).toFixed(0) + 'MB'
      : (n / 1073741824).toFixed(0) + 'GB';
  }

  async function deleteCurrentAccountFile(fileUrl: string) {
    return new Promise<any>(async (resolve, reject) => {
      if (!currentAccount?.publicKey) {
        reject(new Error('an account must be selected first'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const acctPubKey = new PublicKey(currentAccount.publicKey);

      const delFile = await drive.deleteFile(acctPubKey, fileUrl, 'v2').catch((err) => reject(err));

      refreshCurrentAccountData();

      if (!delFile) return;

      resolve(delFile);
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        connection,
        wallet,
        solBalance,
        shdwBalance,
        shdwTokenAccount,
        drive,
        accountFiles,
        loading,
        accounts,
        currentAccount,
        currentAccountInfo,
        currentAccountFiles,
        refreshBalances,
        refreshAccounts,
        selectAccount,
        refreshCurrentAccountFiles,
        refreshCurrentAccountInfo,
        refreshCurrentAccountData,
        createAccount,
        uploadFiles,
        deleteCurrentAccount,
        undeleteCurrentAccount,
        resizeCurrentAccount,
        deleteCurrentAccountFile,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
