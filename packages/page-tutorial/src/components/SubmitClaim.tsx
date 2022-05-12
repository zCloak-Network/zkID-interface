import type { FullDidDetails, LightDidDetails } from '@kiltprotocol/did';

import { Did, Message } from '@kiltprotocol/sdk-js';
import { LoadingButton } from '@mui/lab';
import { Alert, Snackbar } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { credentialApi } from '@zkid/service';
import { AttestationStatus } from '@zkid/service/types';
import { sleep } from '@zkid/service/utils';

interface Props {
  keystore: Did.DemoKeystore;
  message?: Message | null;
  claimLightDid?: LightDidDetails | null;
  attesterFullDid?: FullDidDetails | null;
}

const SubmitClaim: React.FC<Props> = ({ attesterFullDid, claimLightDid, keystore, message }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    if (
      message &&
      claimLightDid &&
      attesterFullDid &&
      claimLightDid.encryptionKey &&
      attesterFullDid.encryptionKey
    ) {
      setLoading(true);

      const encryptedPresentationMessage = await message.encrypt(
        claimLightDid.encryptionKey.id,
        claimLightDid,
        keystore,
        attesterFullDid.assembleKeyId(attesterFullDid.encryptionKey.id)
      );

      const data = await credentialApi.submitClaim({
        ciphertext: encryptedPresentationMessage.ciphertext,
        nonce: encryptedPresentationMessage.nonce,
        senderKeyId: encryptedPresentationMessage.senderKeyId,
        receiverKeyId: encryptedPresentationMessage.receiverKeyId
      });

      if (data.code === 200) {
        while (true) {
          await sleep(6000);
          const {
            data: { attestationStatus }
          } = await credentialApi.getAttestationStatus({
            senderKeyId: `${claimLightDid.did}#${claimLightDid.encryptionKey.id}`
          });

          if (attestationStatus === AttestationStatus.attested) {
            break;
          }
        }
      }

      setLoading(false);
    }
  }, [attesterFullDid, claimLightDid, keystore, message]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        autoHideDuration={null}
        open={loading}
      >
        <Alert icon={<></>} severity="warning" variant="filled">
          We are checking your documents. The attestation takes 30-60s.
        </Alert>
      </Snackbar>
      <LoadingButton disabled={!message} loading={loading} onClick={handleClick} variant="rounded">
        Submit
      </LoadingButton>
    </>
  );
};

export default React.memo(SubmitClaim);
