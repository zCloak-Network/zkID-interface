import { Credential, Did, disconnect, ICredential, init } from '@kiltprotocol/sdk-js';
import { mnemonicGenerate } from '@polkadot/util-crypto';
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

import { KILT_ENDPOINT } from '@zkid/app-config/endpoints';
import { useLightDid, useLocalStorage } from '@zkid/react-hooks';

import { CREDENTIAL, CREDENTIAL_MNEMONIC } from './keys';

interface CredentialState {
  mnemonic?: string;
  verified: boolean;
  keystore: Did.DemoKeystore;
  claimerLightDid?: Did.LightDidDetails;
  credential?: ICredential | null;
  setCredential: (credential: ICredential) => void;
  reset: () => void;
}

export const CredentialContext = createContext<CredentialState>({} as CredentialState);

init({ address: KILT_ENDPOINT });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const CredentialProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [mnemonic, setMnemonic, removeMnemonic] = useLocalStorage<string>(CREDENTIAL_MNEMONIC);
  const [credential, setCredential, removeCredential] = useLocalStorage<ICredential>(CREDENTIAL);
  const [verified, setVerified] = useState(false);
  const keystore = useMemo(() => new Did.DemoKeystore(), []);
  const claimerLightDid = useLightDid(keystore, mnemonic);

  useEffect(() => {
    (async () => {
      if (credential) {
        while (!(await Credential.verify(credential))) {
          await sleep(6000);
        }

        setVerified(true);
        await disconnect();
      }
    })();
  }, [credential]);

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
