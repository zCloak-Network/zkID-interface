import type { ICTypeSchema } from '@kiltprotocol/sdk-js';

import {
  Attestation,
  Claim,
  Credential,
  CType,
  Message,
  RequestForAttestation
} from '@kiltprotocol/sdk-js';
import { LoadingButton } from '@mui/lab';
import React, { useCallback, useContext, useState } from 'react';

import { assert } from '@zcloak/contracts-core/utils';
import { AttestationStatusV2 } from '@zcloak/service/types';

import { ATTESTER_ASSEMBLE_KEY_ID, ATTESTER_DID, CTYPE } from '@zkid/app-config/constants';
import { CredentialContext, NotificationContext, StayAlert } from '@zkid/react-components';
import Recaptcha from '@zkid/react-components/Recaptcha';
import { useInterval } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/react-hooks/api';

type Contents = {
  name?: string;
  birthday?: Date | null;
  class?: number;
  rarity?: [number, number, number];
};
interface Props {
  contents: Contents | null;
  reportError: (error: Error | null) => void;
}

function checkContents(contents?: Contents | null): {
  name: string;
  birthday: Date;
  class: number;
  rarity: [number, number, number];
} {
  assert(contents, 'Contents is empty');
  assert(contents.name, () => new Error('name is empty'));
  assert(contents.birthday, () => new Error('birthday is empty'));
  assert(contents.class, () => new Error('class is empty'));
  assert(contents.rarity, () => new Error('rarity is empty'));

  return {
    name: contents.name,
    birthday: contents.birthday,
    class: contents.class,
    rarity: contents.rarity
  };
}

const SubmitClaim: React.FC<Props> = ({ contents, reportError }) => {
  const { claimerLightDid, keystore, setCredential } = useContext(CredentialContext);
  const { notifyError } = useContext(NotificationContext);
  const [attestationStatus, setAttestationStatus] = useState<AttestationStatusV2>();
  const [loading, setLoading] = useState(false);
  const [rootHash, setRootHash] = useState<string>();
  const [position, setPosition] = useState<number>();
  const [token, setToken] = useState<string>();

  const listenAttestationStatus = useCallback(() => {
    if ((attestationStatus === AttestationStatusV2.submiting || !attestationStatus) && rootHash) {
      credentialApi.getAttestationStatusV2(rootHash).then(({ data: { position, status } }) => {
        if (status === AttestationStatusV2.attestedFailed) {
          notifyError(new Error('Attestation failed, please resubmit.'));
        }

        setAttestationStatus(status);
        setPosition(position);

        return status;
      });
    }
  }, [attestationStatus, notifyError, rootHash]);

  useInterval(listenAttestationStatus, 6000, true);

  const handleClick = useCallback(async () => {
    try {
      assert(claimerLightDid, 'claimerLightDid is null');
      assert(claimerLightDid.encryptionKey, 'claimerLightDid is null');
      const _contents = checkContents(contents);

      reportError(null);

      const claim = Claim.fromCTypeAndClaimContents(
        CType.fromSchema(CTYPE as ICTypeSchema),
        {
          name: _contents.name,
          class: _contents.class,
          age: new Date().getFullYear() - _contents.birthday.getFullYear(),
          helmet_rarity: _contents.rarity[0],
          chest_rarity: _contents.rarity[1],
          weapon_rarity: _contents.rarity[2]
        },
        claimerLightDid.did
      );

      const requestForAttestation = await RequestForAttestation.fromClaim(claim).signWithDidKey(
        keystore,
        claimerLightDid,
        claimerLightDid.authenticationKey.id
      );

      setRootHash(requestForAttestation.rootHash);

      setCredential(
        Credential.fromRequestAndAttestation(
          requestForAttestation,
          Attestation.fromRequestAndDid(requestForAttestation, ATTESTER_DID)
        )
      );

      const message = new Message(
        {
          content: {
            requestForAttestation
          },
          type: Message.BodyType.REQUEST_ATTESTATION
        },
        claimerLightDid.did,
        ATTESTER_DID
      );

      setLoading(true);

      const encryptedPresentationMessage = await message.encrypt(
        claimerLightDid.encryptionKey.id,
        claimerLightDid,
        keystore,
        ATTESTER_ASSEMBLE_KEY_ID
      );

      const data = await credentialApi.submitClaimV2({
        ciphertext: encryptedPresentationMessage.ciphertext,
        nonce: encryptedPresentationMessage.nonce,
        senderKeyId: encryptedPresentationMessage.senderKeyId,
        receiverKeyId: encryptedPresentationMessage.receiverKeyId,
        reCaptchaToken: token
      } as any);

      if (data.code === 200) {
        setAttestationStatus(AttestationStatusV2.submiting);
      } else {
        throw new Error((data as any)?.message || 'Server error');
      }
    } catch (error) {
      reportError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [claimerLightDid, contents, keystore, reportError, setCredential, setRootHash, token]);

  return (
    <>
      <Recaptcha onCallback={setToken} />
      <StayAlert
        message={
          position
            ? `Your request is No.${position} in the attestation queue...`
            : 'Request sent. We are checking your document...'
        }
        open={loading || attestationStatus === AttestationStatusV2.submiting}
        severity="warning"
      />
      <StayAlert
        message="Service is temporarily unavailable due to breaking changes of KILT Network upgrade, hotfixing now..."
        open
        severity="warning"
      />
      <LoadingButton
        // disabled={!token}
        disabled
        loading={loading || attestationStatus === AttestationStatusV2.submiting}
        onClick={handleClick}
        variant="rounded"
      >
        Submit
      </LoadingButton>
    </>
  );
};

export default React.memo(SubmitClaim);
