import { MetaMaskWallet, WalletConnectWallet } from '@zcloak/react-wallet';

import { endpoints } from './endpoints';

export const metaMaskWallet = new MetaMaskWallet();
export const walletConnectWallet = new WalletConnectWallet({
  rpc: endpoints.map(({ chainId, rpc }) => ({ [chainId]: rpc })).reduce((l, r) => ({ ...l, ...r }))
});
