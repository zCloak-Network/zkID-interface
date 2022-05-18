import { useMemo } from 'react';

import { useWallet } from '@zcloak/react-wallet';

import { endpoints } from '@zkid/app-config/endpoints';

export function useEndpoint() {
  const { chainId } = useWallet();

  const endpoint = useMemo(
    () => endpoints.find(({ chainId: _chainId }) => chainId === _chainId),
    [chainId]
  );

  return endpoint;
}
