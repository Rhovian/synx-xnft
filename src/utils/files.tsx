import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { StorageAccountResponse } from '@shadow-drive/sdk/dist/types';
import React from 'react';

import { humanFileSize } from '.';

export const getAccountFileInfo = (res: Response, name: string) => {
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
