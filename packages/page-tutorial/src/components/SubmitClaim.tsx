import type { LightDidDetails } from '@kiltprotocol/did';

import { Did, Message } from '@kiltprotocol/sdk-js';
import { LoadingButton } from '@mui/lab';
import { Alert, Portal, Snackbar } from '@mui/material';
import React, { useCallback, useContext, useState } from 'react';

import { ATTESTER_ASSEMBLE_KEY_ID } from '@zkid/app-config/constants';
import { CredentialContext } from '@zkid/react-components';
import { useInterval } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service';
import { AttestationStatus } from '@zkid/service/types';

interface Props {
  keystore: Did.DemoKeystore;
  message?: Message | null;
  claimerLightDid?: LightDidDetails | null;
}

const SubmitClaim: React.FC<Props> = ({ claimerLightDid, keystore, message }) => {
  const { fetchCredential } = useContext(CredentialContext);
  const [attestationStatus, setAttestationStatus] = useState<AttestationStatus>();
  const [loading, setLoading] = useState(false);

  const listenAttestationStatus = useCallback(() => {
    if (
      claimerLightDid &&
      claimerLightDid.encryptionKey &&
      (attestationStatus === AttestationStatus.attesting || !attestationStatus)
    ) {
      const senderKeyId = `${claimerLightDid.did}#${claimerLightDid.encryptionKey.id}`;

      credentialApi
        .getAttestationStatus({
          senderKeyId
        })
        .then(({ data: { attestationStatus } }) => {
          setAttestationStatus(attestationStatus);

          return attestationStatus;
        })
        .then((attestationStatus) => {
          if (attestationStatus === AttestationStatus.attested) {
            return fetchCredential();
          }
        });
    }
  }, [attestationStatus, claimerLightDid, fetchCredential]);

  useInterval(listenAttestationStatus, 6000, true);

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
        setAttestationStatus(AttestationStatus.attesting);
      }

      setLoading(false);
    }
  }, [claimerLightDid, keystore, message, setAttestationStatus]);

  return (
    <>
      <Portal>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          autoHideDuration={null}
          open={loading || attestationStatus === AttestationStatus.attesting}
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
      <LoadingButton
        disabled={!message}
        loading={loading || attestationStatus === AttestationStatus.attesting}
        onClick={handleClick}
        variant="rounded"
      >
        Submit
      </LoadingButton>
    </>
  );
};

export default React.memo(SubmitClaim);
