import type { ICTypeSchema } from '@kiltprotocol/sdk-js';

import { Claim, CType, Message, RequestForAttestation } from '@kiltprotocol/sdk-js';
import { LoadingButton } from '@mui/lab';
import React, { useCallback, useContext, useState } from 'react';

import { assert } from '@zcloak/zkid-core/utils';

import { ATTESTER_ASSEMBLE_KEY_ID, ATTESTER_DID, CTYPE } from '@zkid/app-config/constants';
import { CredentialContext, NotificationContext, StayAlert } from '@zkid/react-components';
import { useInterval } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service';
import { AttestationStatus } from '@zkid/service/types';

type Contents = {
  name?: string;
  birthday?: Date | null;
  class?: number;
  rarity?: [number, number, number];
};

export class ContentsError extends Error {
  public position: 0 | 1 | 2 | 3;

  constructor(position: 0 | 1 | 2 | 3, message?: string) {
    super(message);
    this.position = position;
  }
}

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
  assert(contents.name, () => new ContentsError(0, 'name is empty'));
  assert(contents.birthday, () => new ContentsError(1, 'birthday is empty'));
  assert(contents.class, () => new ContentsError(2, 'class is empty'));
  assert(contents.rarity, () => new ContentsError(3, 'rarity is empty'));

  if (!contents.birthday.getTime()) {
    throw new ContentsError(1, 'Invalid birthday date');
  }

  if (contents.birthday.getTime() > Date.now()) {
    throw new ContentsError(1, 'Birthday birthday date');
  }

  if (contents.rarity.length !== 3) {
    throw new ContentsError(3, 'Rarity format error');
  }

  return {
    name: contents.name,
    birthday: contents.birthday,
    class: contents.class,
    rarity: contents.rarity
  };
}

const SubmitClaim: React.FC<Props> = ({ contents, reportError }) => {
  const { claimerLightDid, fetchCredential, keystore } = useContext(CredentialContext);
  const { notifyError } = useContext(NotificationContext);
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
        .then(async ({ data: { attestationStatus } }) => {
          if (attestationStatus === AttestationStatus.attested) {
            await fetchCredential();
          }

          if (attestationStatus === AttestationStatus.attestedFailed) {
            notifyError(new Error('Attestation failed, please resubmit.'));
          }

          setAttestationStatus(attestationStatus);

          return attestationStatus;
        });
    }
  }, [attestationStatus, claimerLightDid, fetchCredential, notifyError]);

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

      const data = await credentialApi.submitClaim({
        ciphertext: encryptedPresentationMessage.ciphertext,
        nonce: encryptedPresentationMessage.nonce,
        senderKeyId: encryptedPresentationMessage.senderKeyId,
        receiverKeyId: encryptedPresentationMessage.receiverKeyId
      });

      if (data.code === 200) {
        setAttestationStatus(AttestationStatus.attesting);
      }
    } catch (error) {
      reportError(error as Error);
    } finally {
      setLoading(false);
    }
  }, [claimerLightDid, contents, keystore, reportError]);

  return (
    <>
      <StayAlert
        message="We are checking your documents. The attestation takes around 30s."
        open={loading || attestationStatus === AttestationStatus.attesting}
        severity="warning"
      />
      <LoadingButton
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
