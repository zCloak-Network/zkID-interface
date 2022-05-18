import { FullDidDetails } from '@kiltprotocol/did';
import { Did, disconnect, init } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';

import { KILT_ENDPOINT } from '@zkid/app-config/endpoints';

export function useFullDid(identifier: string) {
  const [fullDid, setFullDid] = useState<FullDidDetails | null>(null);

  useEffect(() => {
    init({ address: KILT_ENDPOINT }).then(() =>
      Did.FullDidDetails.fromChainInfo(identifier).then(setFullDid)
    );

    return () => {
      disconnect();
    };
  }, [identifier]);

  return fullDid;
}
