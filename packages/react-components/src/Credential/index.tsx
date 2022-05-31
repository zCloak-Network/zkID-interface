import { connect, Credential, Did, disconnect, ICredential, init } from '@kiltprotocol/sdk-js';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { KILT_ENDPOINT } from '@zkid/app-config/endpoints';
import { useInterval, useLightDid, useLocalStorage } from '@zkid/react-hooks';

import { CREDENTIAL, CREDENTIAL_MNEMONIC } from './keys';

interface CredentialState {
  mnemonic?: string;
  ready: boolean;
  verified: boolean;
  keystore: Did.DemoKeystore;
  claimerLightDid?: Did.LightDidDetails;
  credential?: ICredential | null;
  setCredential: (credential: ICredential) => void;
  reset: () => void;
}

export const CredentialContext = createContext<CredentialState>({} as CredentialState);

const CredentialProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [mnemonic, setMnemonic, removeMnemonic] = useLocalStorage<string>(CREDENTIAL_MNEMONIC);
  const [credential, setCredential, removeCredential] = useLocalStorage<ICredential>(CREDENTIAL);
  const [ready, setReady] = useState(false);
  const [verified, setVerified] = useState(false);
  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const claimerLightDid = useLightDid(keystore, mnemonic);

  const getVerify = useCallback(() => {
    if (credential && !verified) {
      Credential.verify(credential).then(setVerified);
    }
  }, [credential, verified]);

  useInterval(getVerify, 6000);

  useEffect(() => {
    init({ address: KILT_ENDPOINT })
      .then(connect)
      .then(() => setReady(true));

    return () => {
      disconnect();
    };
  }, []);

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
        verified,
        keystore,
        claimerLightDid,
        credential,
        setCredential,
        reset
      }}
    >
      {children}
    </CredentialContext.Provider>
  );
};

export default React.memo<typeof CredentialProvider>(CredentialProvider);
