import type { LightDidDetails } from '@kiltprotocol/did';

import { Did, Message } from '@kiltprotocol/sdk-js';
import { LoadingButton } from '@mui/lab';
import { Alert, Portal, Snackbar } from '@mui/material';
import React, { useCallback, useState } from 'react';

import { ATTESTER_ASSEMBLE_KEY_ID } from '@zkid/app-config/constants';
import { credentialApi } from '@zkid/service';

interface Props {
  keystore: Did.DemoKeystore;
  message?: Message | null;
  claimerLightDid?: LightDidDetails | null;
  onDone: () => Promise<void>;
}

const SubmitClaim: React.FC<Props> = ({ claimerLightDid, keystore, message, onDone }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = useCallback(async () => {
    if (message && claimerLightDid && claimerLightDid.encryptionKey) {
      setLoading(true);

      const encryptedPresentationMessage = await message.encrypt(
        claimerLightDid.encryptionKey.id,
        claimerLightDid,
        keystore,
        ATTESTER_ASSEMBLE_KEY_ID
      );

      const data = await credentialApi.submitClaim({
        ciphertext: encryptedPresentationMessage.ciphertext,
        nonce: encryptedPresentationMessage.nonce,
        senderKeyId: encryptedPresentationMessage.senderKeyId,
        receiverKeyId: encryptedPresentationMessage.receiverKeyId
      });

      if (data.code === 200) {
        await onDone();
      }

      setLoading(false);
    }
  }, [claimerLightDid, keystore, message, onDone]);

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
