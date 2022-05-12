import type { LightDidDetails } from '@kiltprotocol/did/lib/cjs/DidDetails/LightDidDetails';

import { Did, IClaim, RequestForAttestation } from '@kiltprotocol/sdk-js';
import { useEffect, useState } from 'react';

export function useRequestForAttestation(
  keystore: Did.DemoKeystore,
  claim?: IClaim,
  lightDid?: LightDidDetails
) {
  const [requestForAttestation, setRequestForAttestation] = useState<RequestForAttestation>();

  useEffect(() => {
    if (claim && lightDid) {
      const requestForAttestation = RequestForAttestation.fromClaim(claim);

      requestForAttestation
        .signWithDidKey(keystore, lightDid, lightDid.authenticationKey.id)
        .then(setRequestForAttestation);
    }
  }, [claim, keystore, lightDid]);

  return requestForAttestation;
}
