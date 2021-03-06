import type { Endpoint } from './types';

export const MOONBASE: Endpoint = {
  chainId: 1287,
  name: 'Moonbase Alpha',
  rpc: 'https://rpc.api.moonbase.moonbeam.network',
  rpcs: ['https://rpc.api.moonbase.moonbeam.network'],
  currencySymbol: 'GLMR',
  decimals: 18,
  explorer: 'https://moonbase.moonscan.io'
};

export const endpoints: Endpoint[] = [MOONBASE];
export const supportedChinId: number[] = endpoints.map(({ chainId }) => chainId);

export const KILT_ENDPOINT = 'wss://kilt.zkid.app';
export const KILT_SS58 = 38;
