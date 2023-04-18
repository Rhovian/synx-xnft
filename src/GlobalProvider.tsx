import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ShdwDrive,
  StorageAccountResponse,
  ShadowDriveResponse,
  CreateStorageResponse,
  StorageAccountInfo,
  ShadowFile,
  ListObjectsResponse,
} from '@shadow-drive/sdk';
import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Connection, LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js';
import React, { createContext, useEffect, useState } from 'react';

import { SHADOW_TOKEN_MINT } from './constants';
import { usePublicKey, useSolanaConnection } from './hooks/xnft-hooks';
import { FileInfo } from './models';
import { byteSizeUnited, getAccountFileInfo } from './utils';

export interface GlobalProvider {
  connection: Connection;
  wallet: PublicKey;
  solBalance: number;
  shdwBalance: number;
  loading: boolean;
  shdwTokenAccount: PublicKey | undefined;
  drive: ShdwDrive | undefined;
  accounts: StorageAccountResponse[];
  filteredAccounts: StorageAccountResponse[];
  currentAccount: StorageAccountResponse | undefined;
  currentAccountInfo: any;
  currentAccountFiles: any[];
  accountFiles: Record<string, any[]>;
  fileMenuOpen: boolean;
  progressBar: number;
  noAccounts: boolean;
  currentFile: FileInfo | undefined;
  localFiles: FileInfo[] | undefined;
  setLocalFiles(files: FileInfo[]): void;
  refreshBalances(): Promise<void>;
  refreshAccounts(): Promise<StorageAccountResponse[]>;
  selectAccount(account: PublicKey): Promise<void>;
  refreshCurrentAccountInfo(): Promise<StorageAccountInfo>;
  refreshCurrentAccountData(): Promise<void>;
  createAccount(
    accountName: string,
    size: string,
    immutable: boolean
  ): Promise<CreateStorageResponse>;
  uploadFile(file: any): Promise<void>;
  deleteCurrentAccount(): Promise<ShadowDriveResponse>;
  undeleteCurrentAccount(): Promise<ShadowDriveResponse>;
  resizeCurrentAccount(size: number, unit: string): Promise<ShadowDriveResponse>;
  deleteCurrentAccountFile(fileUrl: string): Promise<ShadowDriveResponse>;
  setFileMenu(file: FileInfo): void;
  getAccountInfo(account: PublicKey): Promise<StorageAccountInfo>;
  setFileMenuOpen(open: boolean): void;
  setProgressBar(progress: number): void;
  changeCurrentAccount(account: PublicKey): Promise<ShadowDriveResponse>;
  getCurrentAccountFiles(): Promise<string[]>;
}
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
  const [filteredAccounts, setFilteredAccounts] = useState<StorageAccountResponse[]>([]);
  const [currentAccount, setCurrentAccount] = useState<StorageAccountResponse>();
  const [currentAccountInfo, setCurrentAccountInfo] = useState<StorageAccountInfo>();
  const [currentAccountFiles, setCurrentAccountFiles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [accountFiles, setAccountFiles] = useState<Record<string, any[]>>({});
  const [fileMenuOpen, setFileMenuOpen] = useState(false);
  const [currentFile, setCurrentFile] = useState<FileInfo>();
  const [progressBar, setProgressBar] = useState(0);
  const [noAccounts, setNoAccounts] = useState(false);
  const [localFiles, setLocalFiles] = useState<FileInfo[] | null>([]);

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

      // get local files
      const files = await AsyncStorage.getItem('files');

      if (files) {
        setLocalFiles(JSON.parse(files));
      }
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
    refreshAccounts().catch((err) => console.log(err.toString()));
  }, [drive]);

  useEffect(() => {
    if (!currentAccount && accounts?.length) {
      selectCurrentAccount().catch((err) => console.log(err.toString()));
      if (accounts.length > 1) {
        getAllAccountFiles().catch((err) => console.log(err.toString()));
      }
    }
  }, [accounts]);

  useEffect(() => {
    if (currentAccount) {
      setCurrentAccountFiles(accountFiles[currentAccount.publicKey.toString()]);
      refreshCurrentAccountData().catch((err) => console.log(err.toString()));
    }
  }, [currentAccount]);

  useEffect(() => {
    if (accountFiles && currentAccount) {
      if (currentAccountFiles.length === 0) {
        setCurrentAccountFiles(accountFiles[currentAccount.publicKey.toString()]);
      }

      if (accounts && accounts.length > 0 && accountFiles) {
        setFilteredAccounts(
          accounts.sort(
            // @ts-ignore
            (a, b) => accountFiles[a.publicKey.toString()] - accountFiles[b.publicKey.toString()]
          )
        );
      }
    }
  }, [accountFiles]);

  async function refreshCurrentAccountData() {
    refreshCurrentAccountInfo().catch((err) => console.log(err.toString()));
    /* TODO: should only refresh a the current account */
    getCurrentAccountFiles().catch((err) => console.log(err.toString()));
  }

  async function getAllAccountFiles() {
    if (drive && currentAccount) {
      const newAccountFiles: Record<string, any[]> = {};

      Promise.all(
        accounts
          .filter(
            (account) => account.publicKey.toString() !== currentAccount?.publicKey.toString()
          )
          .map(async (account) => {
            const files = await drive.listObjects(new PublicKey(account.publicKey));
            return getAccountFiles(account, files);
          })
      ).then((res) => {
        res.forEach((files, index) => {
          const account = accounts[index];
          newAccountFiles[account.publicKey.toString()] = files;
        });

        setAccountFiles((prevState) => ({
          ...prevState,
          ...newAccountFiles,
          [currentAccount.publicKey.toString()]: currentAccountFiles,
        }));
      });
    }
  }

  function setFileMenu(file: FileInfo) {
    setFileMenuOpen(true);
    setCurrentFile(file);
  }

  async function refreshBalances() {
    setSolBalance((await connection.getBalance(wallet)) / LAMPORTS_PER_SOL);
    const shdwTokenAccount = await getAssociatedTokenAddress(SHADOW_TOKEN_MINT, wallet, true);
    setShdwTokenAccount(shdwTokenAccount);
    setShdwBalance((await connection.getTokenAccountBalance(shdwTokenAccount)).value.uiAmount!);
  }

  const getAccountFiles = async (account: StorageAccountResponse, files: ListObjectsResponse) => {
    const accountKey = account.publicKey.toString();
    return await Promise.all(
      files.keys.map(async (file) => {
        const res = await fetch(
          `https://shdw-drive.genesysgo.net/` + account.publicKey + '/' + file
        );

        return getAccountFileInfo(res, file, accountKey);
      })
    );
  };

  async function selectCurrentAccount() {
    if (!accounts?.length) return;
    if (!drive) return;

    let account: StorageAccountResponse | undefined;

    for await (const [i, acct] of accounts.entries()) {
      // get files
      const files = await drive.listObjects(new PublicKey(acct.publicKey));
      if (files.keys.length > 0) {
        const accountFiles = await getAccountFiles(acct, files);
        setAccountFiles((prevState) => ({
          ...prevState,
          [acct.publicKey.toString()]: accountFiles,
        }));
        account = acct;
        break; // exit the loop if files have been found
      } else {
        if (i === accounts.length - 1)
          // there is no account with files, set it manually
          account = accounts[0];
      }
    }

    setCurrentAccount(account);
    return account;
  }

  async function getCurrentAccountFiles() {
    if (!drive) return;
    if (!currentAccount) return;

    const files = await drive.listObjects(new PublicKey(currentAccount.publicKey));
    const accountFiles = await getAccountFiles(currentAccount, files);

    setAccountFiles((prevState) => ({
      ...prevState,
      [currentAccount.publicKey.toString()]: accountFiles,
    }));

    setCurrentAccountFiles(accountFiles); // update currentAccountFiles state
  }

  async function refreshAccounts() {
    if (!drive) return;

    const accts: StorageAccountResponse[] = await drive.getStorageAccounts('v2');

    if (accts.length > 0) {
      setAccounts(
        accts.sort((a, b) =>
          a?.account?.identifier?.toLowerCase() > b?.account?.identifier?.toLowerCase() ? 1 : -1
        )
      );
    } else {
      // new to shadow drive
      setNoAccounts(true);
    }

    return accts;
  }

  async function selectAccount(account: PublicKey) {
    setCurrentAccount(accounts[accounts.map((a) => a.publicKey).indexOf(account)]);
  }

  async function getAccountInfo() {
    if (!drive) return;

    return await drive.getStorageAccount(new PublicKey(currentAccount!.publicKey));
  }

  async function changeCurrentAccount(newAccount: PublicKey) {
    if (!drive) return;

    const newCurrentAccount = accounts.find(
      (a) => a.publicKey.toString() === newAccount.toString()
    );

    if (!newCurrentAccount) return;
    // const newCurrentAccountFiles = accountFiles[newCurrentAccount.publicKey.toString()];
    // @ts-ignore
    setCurrentAccount(newCurrentAccount);
  }

  /* 
    TODO: add pubkey param and get the storage information for each account
  */
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

  async function createAccount(accountName: string, size: string, immutable: boolean) {
    return new Promise<CreateStorageResponse>(async (resolve, reject) => {
      if (!accountName?.trim()) {
        reject(new Error('a name must be specified'));
        return;
      }
      if (Number.isNaN(size)) {
        reject(new Error('specified size is not a valid number'));
        return;
      }

      if (!drive) {
        reject(new Error('drive not initialized'));
        return;
      }

      const newAcct = await drive
        .createStorageAccount(accountName, size, 'v2')
        .catch((err) => console.log(err));

      if (!newAcct) return;

      const confirmedTransaction = await connection.confirmTransaction(
        newAcct.transaction_signature,
        'confirmed'
      );

      setProgressBar(0.5);
      try {
        const refreshedAccounts = await refreshAccounts();

        const foundAccount = refreshedAccounts?.find(
          (a) => a.publicKey.toString() === newAcct.shdw_bucket
        );

        if (foundAccount) selectAccount(foundAccount.publicKey);

        if (immutable) {
          await drive.makeStorageImmutable(new PublicKey(newAcct.shdw_bucket), 'v2');
        }
      } catch (e) {
        console.log(e);
      }

      resolve(newAcct);
    });
  }

  const uploadFile = async (file: File | ShadowFile) => {
    if (!drive) return;
    if (!currentAccount) return;

    await drive?.uploadFile(currentAccount?.publicKey!, file);

    await getCurrentAccountFiles();
  };

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
        response = await drive
          .reduceStorage(pubkey, reductionSizeUnited, 'v2')
          .catch((err) => reject(err));
      } else {
        const incrementSize = byteSize - currentAccountInfo.reserved_bytes;
        const incrementSizeUnited = byteSizeUnited(incrementSize);
        response = await drive
          .addStorage(pubkey, incrementSizeUnited, 'v2')
          .catch((err) => reject(err));
      }

      if (!response) return;

      refreshCurrentAccountData();
      resolve(response);
    });
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
        filteredAccounts,
        currentAccount,
        currentAccountInfo,
        fileMenuOpen,
        refreshBalances,
        refreshAccounts,
        currentAccountFiles,
        selectAccount,
        refreshCurrentAccountInfo,
        refreshCurrentAccountData,
        createAccount,
        uploadFile,
        deleteCurrentAccount,
        undeleteCurrentAccount,
        resizeCurrentAccount,
        deleteCurrentAccountFile,
        setFileMenu,
        setFileMenuOpen,
        currentFile,
        changeCurrentAccount,
        getAccountInfo,
        getCurrentAccountFiles,
        progressBar,
        setProgressBar,
        noAccounts,
        localFiles,
        setLocalFiles,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
