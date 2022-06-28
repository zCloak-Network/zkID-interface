import type { DidUri } from '@kiltprotocol/types';

import { FullDidDetails } from '@kiltprotocol/did';
import { Did } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';

export function useFullDid(identifier: DidUri) {
  const [fullDid, setFullDid] = useState<FullDidDetails | null>(null);

  useEffect(() => {
    Did.FullDidDetails.fromChainInfo(identifier).then(setFullDid);
  }, [identifier]);

  return fullDid;
}
