import { Did, disconnect, IMessage, init, ISubmitCredential, Message } from '@kiltprotocol/sdk-js';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { ATTESTER_ASSEMBLE_KEY_ID } from '@zkid/app-config/constants';
import { KILT_ENDPOINT } from '@zkid/app-config/endpoints';
import { useLightDid, useLocalStorage } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service';
import { AttestationStatus } from '@zkid/service/types';

import { CREDENTIAL_MNEMONIC } from './keys';

interface CredentialState {
  ready: boolean;
  keystore: Did.DemoKeystore;
  claimerLightDid?: Did.LightDidDetails;
  credential?: ISubmitCredential | null;
  reset: () => void;
}

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

  useEffect(() => {
    if (
      claimerLightDid &&
      claimerLightDid.encryptionKey &&
      (attestationStatus === AttestationStatus.attesting || !attestationStatus)
    ) {
      credentialApi
        .getAttestationStatus({
          senderKeyId: `${claimerLightDid.did}#${claimerLightDid.encryptionKey.id}`
        })
        .then(({ data: { attestationStatus } }) => setAttestationStatus(attestationStatus));
    }
  }, [claimerLightDid, attestationStatus]);

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
          init({ address: KILT_ENDPOINT });

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
      return originMessage.body.content as ISubmitCredential;
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
        ready,
        keystore,
        claimerLightDid,
        credential,
        reset
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export default React.memo<typeof CredentialProvider>(CredentialProvider);
