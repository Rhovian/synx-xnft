import { getAssociatedTokenAddress } from '@solana/spl-token';
import { Connection, PublicKey } from '@solana/web3.js';

// get a user's associated token account
export async function getTokenAccount(owner: PublicKey, mint: PublicKey): Promise<PublicKey> {
  return await getAssociatedTokenAddress(mint, owner, true);
}
