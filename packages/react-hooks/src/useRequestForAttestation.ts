import type { LightDidDetails } from '@kiltprotocol/did/lib/cjs/DidDetails/LightDidDetails';

import { Did, IClaim, RequestForAttestation } from '@kiltprotocol/sdk-js';
import { useEffect, useMemo, useState } from 'react';

export function useRequestForAttestation(
  keystore: Did.DemoKeystore,
  claim?: IClaim,
  lightDid?: LightDidDetails
): [RequestForAttestation | undefined, () => void] {
  const [requestForAttestation, setRequestForAttestation] = useState<RequestForAttestation>();
  const [key, setKey] = useState(1);

  useEffect(() => {
    if (claim && lightDid && key) {
      const requestForAttestation = RequestForAttestation.fromClaim(claim);

      requestForAttestation
        .signWithDidKey(keystore, lightDid, lightDid.authenticationKey.id)
        .then(setRequestForAttestation);
    }
  }, [claim, key, keystore, lightDid]);

  return useMemo(
    () => [requestForAttestation, () => setKey((key) => key + 1)],
    [requestForAttestation]
  );
}
