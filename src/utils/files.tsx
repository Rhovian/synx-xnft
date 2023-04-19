import { StorageAccountResponse } from '@shadow-drive/sdk/dist/types';

import { humanFileSize } from '.';

export const fileTypes = [
  'eps',
  'html',
  'wav',
  'xls',
  'pdf',
  'png',
  'dll',
  'rar',
  'txt',
  'psd',
  'avi',
  'mov',
  'quicktime',
  'javascript',
  'mp3',
  'mp4',
  'jpg',
  'zip',
  'php',
  'css',
  'doc',
  'ppt',
];

const getFileTypeAndIcon = (mimeType: string) => {
  const match = mimeType.match(/^.*\/(.+)$/);
  const subtype = match ? match[1].toLowerCase() : '';

  let fileType = fileTypes.find((type) => subtype.includes(type));

  if (fileType === undefined) {
    fileType = 'unknown';
  }

  if (fileType === 'mp4') {
    fileType = 'mov';
  }

  if (fileType === 'quicktime') {
    fileType = 'mov';
  }

  return fileType;
};

export const getAccountFileInfo = (res: Response, name: string, vault: string) => {
  const mimeType = res.headers.get('Content-Type');
  const size = res.headers.get('Content-Length');
  const fileType = getFileTypeAndIcon(mimeType || '');

  const hrsize = humanFileSize(parseInt(size!, 10));
  const body = res.url;

  return {
    fileType,
    name,
    size: hrsize,
    body,
    vault,
  };
};

export function transformStorageAccounts(accounts: StorageAccountResponse[]) {
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
