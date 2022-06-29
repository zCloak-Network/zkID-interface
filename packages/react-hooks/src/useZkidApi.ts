import { useMemo } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { ZkidApi } from '@zcloak/service';

import { env } from '@zkid/app-config/constants/env';

export function useZkidApi() {
  const { chainId } = useWallet();

  return useMemo(
    () => (chainId ? new ZkidApi(env.ZKID_SERVICE, undefined, chainId) : null),
    [chainId]
  );
}
