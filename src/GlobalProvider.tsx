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
  currentAccount: StorageAccountResponse | undefined;
  currentAccountInfo: any;
  currentAccountFiles: any[];
  accountFiles: Record<string, any[]>;
  refreshBalances(): Promise<void>;
  refreshAccounts(): Promise<StorageAccountResponse[]>;
  selectAccount(account: PublicKey): Promise<void>;
  refreshCurrentAccountInfo(): Promise<StorageAccountInfo>;
  refreshCurrentAccountData(): Promise<void>;
  refreshCurrentAccountFiles(): Promise<string[]>;
  createAccount(accountName: string, size: string): Promise<CreateStorageResponse>;
  uploadFile(file: any): Promise<void>;
  deleteCurrentAccount(): Promise<ShadowDriveResponse>;
  undeleteCurrentAccount(): Promise<ShadowDriveResponse>;
  resizeCurrentAccount(size: number, unit: string): Promise<ShadowDriveResponse>;
  deleteCurrentAccountFile(fileUrl: string): Promise<ShadowDriveResponse>;
  refreshFiles(): Promise<void>;
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
    refreshAccounts().catch((err) => console.log(err.toString()));
  }, [drive]);

  useEffect(() => {
    if (!currentAccount && accounts?.length) selectAccount(accounts[0].publicKey);
  }, [accounts]);

  useEffect(() => {
    refreshCurrentAccountData();
  }, [currentAccount]);

  async function refreshCurrentAccountData() {
    refreshCurrentAccountInfo().catch((err) => console.log(err.toString()));
  }

  async function refreshBalances() {
    setSolBalance((await connection.getBalance(wallet)) / LAMPORTS_PER_SOL);
    const shdwTokenAccount = await getAssociatedTokenAddress(SHADOW_TOKEN_MINT, wallet, true);
    setShdwTokenAccount(shdwTokenAccount);
    setShdwBalance((await connection.getTokenAccountBalance(shdwTokenAccount)).value.uiAmount!);
  }

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
      setLoading(true);
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
        setLoading(false);
      } catch (err) {
        reject(err);
      }
    });
  }

  async function selectAccount(account: PublicKey) {
    setCurrentAccount(accounts[accounts.map((a) => a.publicKey).indexOf(account)]);
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

  const refreshFiles = async () => {
    if (!drive) return;
    if (currentAccount) {
      const files = await drive.listObjects(new PublicKey(currentAccount.publicKey));
      getAccountFiles(currentAccount, files);
    }
  };

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

  const uploadFile = async (file: File | ShadowFile) => {
    setLoading(true);

    await drive?.uploadFile(currentAccount?.publicKey!, file);

    await refreshFiles();

    setLoading(false);
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
        refreshBalances,
        refreshAccounts,
        currentAccountFiles,
        selectAccount,
        refreshCurrentAccountInfo,
        refreshCurrentAccountFiles,
        refreshCurrentAccountData,
        createAccount,
        uploadFile,
        deleteCurrentAccount,
        undeleteCurrentAccount,
        resizeCurrentAccount,
        refreshFiles,
        deleteCurrentAccountFile,
      }}>
      {props.children}
    </GlobalContext.Provider>
  );
}
