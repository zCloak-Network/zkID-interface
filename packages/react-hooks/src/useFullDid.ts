import { FullDidDetails } from '@kiltprotocol/did';
import { Did } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';

export function useFullDid(identifier: string) {
  const [fullDid, setFullDid] = useState<FullDidDetails | null>(null);

  useEffect(() => {
    Did.FullDidDetails.fromChainInfo(identifier).then(setFullDid);
  }, [identifier]);

  return fullDid;
}
