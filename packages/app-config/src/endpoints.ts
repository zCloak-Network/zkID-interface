import type { Endpoint } from './types';

export const MOONBASE: Endpoint = {
  chainId: 1287,
  name: 'Moonbase',
  rpc: 'https://rpc.api.moonbase.moonbeam.network',
  rpcs: ['https://rpc.api.moonbase.moonbeam.network'],
  currencySymbol: 'GLMR',
  decimals: 18,
  explorer: 'https://moonbase.moonscan.io/'
};

export const KILT_ENDPOINT = 'wss://peregrine.kilt.io/parachain-public-ws/';
