import { PublicKey } from '@solana/web3.js';
import React, { useState, useEffect, useContext } from 'react';
import { acc } from 'react-native-reanimated';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CircularProgress from './PieChart';
import { GlobalContext } from '../../GlobalProvider';
import { Colors, BOLD } from '../../constants';

export function StorageDetails() {
  const [storageUsed, setStorageUsed] = useState(0);
  const [totalStorage, setTotalStorage] = useState(0);
  const [documentSize, setDocumentSize] = useState('0 B');
  const [mediaSize, setMediaSize] = useState('0 B');
  const [otherSize, setOtherSize] = useState('0 B');
  const [unknownSize, setUnknownSize] = useState('0 B');
  const [percentRange, setPercent] = useState(0);
  const [storagePublicKey, setStoragePublicKey] = useState(null);

  const globalContext = useContext(GlobalContext);

  useEffect(() => {
    // iterate through all accounts, and generate the dashboard data for all files in each account
    (async () => {
      globalContext.accounts.forEach(async (account) => {
        const files = await globalContext.drive?.listObjects(new PublicKey(account.publicKey));
        if (files?.keys.length) {
          if (files.keys.length > 0) {
            console.log(account.publicKey);
            console.log(files.keys[0]);
            const res = fetch(
              `https://shdw-drive.genesysgo.net/` + account.publicKey + '/' + files.keys[0],
              { method: 'POST' }
            );
            console.log((await res).body);
          }
        }
      });
    })();
  }, [globalContext.accounts]);

  return <div />;
}
