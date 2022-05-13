import type { FullDidDetails, LightDidDetails } from '@kiltprotocol/did';

import { Did, Message } from '@kiltprotocol/sdk-js';
import { LoadingButton } from '@mui/lab';
import { Alert, Portal, Snackbar } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { credentialApi } from '@zkid/service';

interface Props {
  keystore: Did.DemoKeystore;
  message?: Message | null;
  claimerLightDid?: LightDidDetails | null;
  attesterFullDid?: FullDidDetails | null;
  onDone: () => void;
}

const SubmitClaim: React.FC<Props> = ({
  attesterFullDid,
  claimerLightDid,
  keystore,
  message,
  onDone
}) => {
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    if (
      message &&
      claimerLightDid &&
      attesterFullDid &&
      claimerLightDid.encryptionKey &&
      attesterFullDid.encryptionKey
    ) {
      setLoading(true);

      const encryptedPresentationMessage = await message.encrypt(
        claimerLightDid.encryptionKey.id,
        claimerLightDid,
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
        onDone();
      }

      setLoading(false);
    }
  }, [attesterFullDid, claimerLightDid, keystore, message, onDone]);

  return (
    <>
      <Portal>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={null}
          open={loading}
        >
          <Alert
            icon={<></>}
            severity="warning"
            sx={{
              alignItems: 'center',
              padding: '0 16px',
              background: 'linear-gradient(221deg, #E2702A 0%, #EBAD58 100%, #6C59E0 100%)',
              borderRadius: '16px'
            }}
            variant="filled"
          >
            We are checking your documents. The attestation takes 30-60s.
          </Alert>
        </Snackbar>
      </Portal>
      <LoadingButton disabled={!message} loading={loading} onClick={handleClick} variant="rounded">
        Submit
      </LoadingButton>
    </>
  );
};

export default React.memo(SubmitClaim);
