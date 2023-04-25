import { getAssociatedTokenAddress } from '@solana/spl-token';
import { PublicKey } from '@solana/web3.js';

import {
  FullScreenLoadingIndicator,
  HeaderRight,
  HeaderLeft,
  ItemSeparatorComponent,
} from './components';
import { getAccountFileInfo, transformStorageAccounts, fileTypes } from './files';
import { FileInfo } from '../models';

// get a user's associated token account
export async function getTokenAccount(owner: PublicKey, mint: PublicKey): Promise<PublicKey> {
  return await getAssociatedTokenAddress(mint, owner, true);
}

export function humanFileSize(bytes: number, si = false, dp = 1) {
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

export function byteSizeUnited(n: number) {
  return n < 1024
    ? '1KB'
    : n < 1048576
    ? (n / 1024).toFixed(0) + 'KB'
    : n < 1073741824
    ? (n / 1048576).toFixed(0) + 'MB'
    : (n / 1073741824).toFixed(0) + 'GB';
}

export function sortFileInfoArray(files: FileInfo[], input: string) {
  return files.sort((a, b) => {
    const aName = a.name.toLowerCase();
    const bName = b.name.toLowerCase();
    const inputName = input.toLowerCase();

    if (aName.includes(inputName) && !bName.includes(inputName)) {
      return -1; // a comes first
    } else if (!aName.includes(inputName) && bName.includes(inputName)) {
      return 1; // b comes first
    } else {
      return aName.localeCompare(bName); // sort by name alphabetically
    }
  });
}

export function shortenString(key: string) {
  const firstFour = key.substr(0, 4);
  const lastFour = key.substr(-4);
  return `${firstFour}...${lastFour}`;
}

export {
  getAccountFileInfo,
  transformStorageAccounts,
  FullScreenLoadingIndicator,
  HeaderLeft,
  HeaderRight,
  ItemSeparatorComponent,
  fileTypes,
};
