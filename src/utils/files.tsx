import { StorageAccountResponse } from '@shadow-drive/sdk/dist/types';

import { humanFileSize } from '.';

const getFileTypeAndIcon = (mimeType: string) => {
  let fileType;

  switch (mimeType) {
    case 'image/jpeg':
    case 'image/png':
    case 'image/gif':
    case 'image/svg+xml':
      fileType = 'image';
      break;
    case 'video/mp4':
    case 'video/quicktime':
    case 'video/x-ms-wmv':
    case 'video/x-msvideo':
    case 'video/x-matroska':
      fileType = 'video';
      break;
    case 'audio/mpeg':
    case 'audio/x-wav':
    case 'audio/x-aiff':
    case 'audio/x-flac':
      fileType = 'audio';
      break;
    case 'application/pdf':
      fileType = 'pdf';
      break;
    case 'application/ppt':
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      fileType = 'ppt';
      break;
    case 'text/plain':
    case 'text/tab-separated-values':
      fileType = 'text';
      break;
    case 'text/csv':
      fileType = 'csv';
      break;
    case 'application/zip':
      fileType = 'zip';
      break;
    default:
      fileType = 'unknown';
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
