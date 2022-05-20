import type { LightDidCreationDetails } from '@kiltprotocol/did/lib/cjs/DidDetails/LightDidDetails.utils';

import { Did, EncryptionKeyType, VerificationKeyType } from '@kiltprotocol/sdk-js';
import { useEffect, useMemo, useState } from 'react';

type Keypair<T extends VerificationKeyType | EncryptionKeyType> = {
  publicKey: Uint8Array;
  type: T;
};

export function useLightDidFromDetails(details?: LightDidCreationDetails) {
  return useMemo(() => {
    return details && Did.LightDidDetails.fromDetails(details);
  }, [details]);
}

export function useLightDidFromAccount(
  account?: string,
  keyType?: VerificationKeyType.Ed25519 | VerificationKeyType.Sr25519
) {
  return useMemo(() => {
    return account && Did.LightDidDetails.fromIdentifier(account, keyType);
  }, [account, keyType]);
}

export function useLightDid(keystore: Did.DemoKeystore, mnemonic?: string) {
  const [creationDetails, setCreationDetails] = useState<{
    authenticationKey: Keypair<VerificationKeyType.Sr25519>;
    encryptionKey: Keypair<EncryptionKeyType.X25519>;
  }>();

  useEffect(() => {
    if (mnemonic) {
      Promise.all([
        keystore.generateKeypair({
          alg: Did.SigningAlgorithms.Sr25519,
          seed: mnemonic
        }),
        keystore.generateKeypair({
          alg: Did.EncryptionAlgorithms.NaclBox,
          seed: mnemonic
        })
      ]).then(([{ publicKey }, { publicKey: publicKeyEncryption }]) => {
        setCreationDetails({
          authenticationKey: {
            publicKey,
            type: VerificationKeyType.Sr25519
          },
          encryptionKey: {
            publicKey: publicKeyEncryption,
            type: EncryptionKeyType.X25519
          }
        });
      });
    }
  }, [keystore, mnemonic]);

  return useLightDidFromDetails(creationDetails);
}
