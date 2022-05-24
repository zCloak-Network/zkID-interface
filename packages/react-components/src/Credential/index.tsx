import { Did, disconnect, ICredential, init, Message } from '@kiltprotocol/sdk-js';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { ATTESTER_ASSEMBLE_KEY_ID } from '@zkid/app-config/constants';
import { KILT_ENDPOINT } from '@zkid/app-config/endpoints';
import { useLightDid, useLocalStorage } from '@zkid/react-hooks';
import { credentialApi } from '@zkid/service';

import { CREDENTIAL, CREDENTIAL_MNEMONIC } from './keys';

interface CredentialState {
  mnemonic?: string;
  ready: boolean;
  keystore: Did.DemoKeystore;
  claimerLightDid?: Did.LightDidDetails;
  credential?: ICredential | null;
  fetchCredential: () => void;
  reset: () => void;
}

export const CredentialContext = createContext<CredentialState>({} as CredentialState);

const CredentialProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [mnemonic, setMnemonic, removeMnemonic] = useLocalStorage<string>(CREDENTIAL_MNEMONIC);
  const [credential, setCredential, removeCredential] = useLocalStorage<ICredential>(CREDENTIAL);
  const [ready, setReady] = useState(false);
  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const claimerLightDid = useLightDid(keystore, mnemonic);

  useEffect(() => {
    if (credential) {
      setReady(true);
    }
  }, [credential]);

  const fetchCredential = useCallback(async () => {
    if (claimerLightDid && claimerLightDid.encryptionKey && !credential) {
      init({ address: KILT_ENDPOINT });

      await credentialApi
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
        .then((message) => {
          message && setCredential(message.body.content as ICredential);
        })
        .finally(() => {
          setReady(true);
          disconnect();
        });
    }
  }, [claimerLightDid, credential, keystore, setCredential]);

  useEffect(() => {
    fetchCredential();
  }, [fetchCredential]);

  useEffect(() => {
    // Migration
    if (!mnemonic) {
      const oldAccount = localStorage.getItem('zCloakGuideAccount');
      let mnemonic: string | null = null;

      if (oldAccount) {
        try {
          mnemonic = JSON.parse(oldAccount)?.mnemonic;
          localStorage.removeItem('zCloakGuideAccount');
        } catch {}
      }

      mnemonic = mnemonic || mnemonicGenerate();

      setMnemonic(mnemonic);
    }
  }, [mnemonic, setMnemonic]);

  const reset = useCallback(() => {
    removeMnemonic();
    removeCredential();
  }, [removeCredential, removeMnemonic]);

  return (
    <CredentialContext.Provider
      value={{
        mnemonic,
        ready,
        keystore,
        claimerLightDid,
        credential,
        fetchCredential,
        reset
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export default React.memo<typeof CredentialProvider>(CredentialProvider);
