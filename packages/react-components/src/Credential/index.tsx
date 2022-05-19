import { Did, disconnect, ICredential, IMessage, init, Message } from '@kiltprotocol/sdk-js';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { ATTESTER_ASSEMBLE_KEY_ID } from '@zkid/app-config/constants';
import { KILT_ENDPOINT } from '@zkid/app-config/endpoints';
import { useInterval, useLightDid, useLocalStorage } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service';
import { AttestationStatus } from '@zkid/service/types';

import { CREDENTIAL_MNEMONIC } from './keys';

interface CredentialState {
  mnemonic?: string;
  ready: boolean;
  keystore: Did.DemoKeystore;
  claimerLightDid?: Did.LightDidDetails;
  credential?: ICredential | null;
  attestationStatus?: AttestationStatus;
  reset: () => void;
  setAttestationStatus: (status: AttestationStatus) => void;
}

init({ address: KILT_ENDPOINT });

export const CredentialContext = createContext<CredentialState>({} as CredentialState);

const CredentialProvider: React.FC = ({ children }) => {
  const [mnemonic, setMnemonic] = useLocalStorage<string>(CREDENTIAL_MNEMONIC);
  const [originMessage, setOriginMessage] = useState<IMessage | null>(null);
  const [attestationStatus, setAttestationStatus] = useState<AttestationStatus>();
  const [ready, setReady] = useState(false);

  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const claimerLightDid = useLightDid(keystore, mnemonic);

  useEffect(() => {
    if (attestationStatus === AttestationStatus.notAttested) {
      setReady(true);
    }
  }, [attestationStatus]);

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
        .then(({ data: { attestationStatus } }) => setAttestationStatus(attestationStatus));
    }
  }, [attestationStatus, claimerLightDid]);

  useInterval(listenAttestationStatus, 6000, true);

  useEffect(() => {
    if (
      claimerLightDid &&
      claimerLightDid.encryptionKey &&
      attestationStatus === AttestationStatus.attested
    ) {
      credentialApi
        .getAttestation({
          senderKeyId: ATTESTER_ASSEMBLE_KEY_ID,
          receiverKeyId: `${claimerLightDid.did}#${claimerLightDid.encryptionKey.id}`
        })
        .then(({ data }) => {
          if (data.length > 0) {
            return Message.decrypt(data[0], keystore, claimerLightDid);
          } else {
            return null;
          }
        })
        .then((message) => setOriginMessage(message))
        .finally(() => {
          setReady(true);
          disconnect();
        });
    }
  }, [attestationStatus, claimerLightDid, keystore]);

  const credential = useMemo(() => {
    if (originMessage) {
      return originMessage.body.content as ICredential;
    } else {
      return null;
    }
  }, [originMessage]);

  useEffect(() => {
    if (!mnemonic) {
      setMnemonic(mnemonicGenerate());
    }
  }, [mnemonic, setMnemonic]);

  const reset = useCallback(() => {
    setMnemonic(mnemonicGenerate());
  }, [setMnemonic]);

  return (
    <CredentialContext.Provider
      value={{
        mnemonic,
        ready,
        keystore,
        claimerLightDid,
        credential,
        attestationStatus,
        reset,
        setAttestationStatus
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export default React.memo<typeof CredentialProvider>(CredentialProvider);
