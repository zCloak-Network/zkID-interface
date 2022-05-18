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
  const [signing, setSigning] = useState<Keypair<VerificationKeyType.Sr25519>>();
  const [encryption, setEncryption] = useState<Keypair<EncryptionKeyType.X25519>>();

  useEffect(() => {
    keystore
      .generateKeypair({
        alg: Did.SigningAlgorithms.Sr25519,
        seed: mnemonic
      })
      .then(({ publicKey }) => {
        setSigning({
          publicKey,
          type: VerificationKeyType.Sr25519
        });
      });

    keystore
      .generateKeypair({
        alg: Did.EncryptionAlgorithms.NaclBox,
        seed: mnemonic
      })
      .then(({ publicKey }) => {
        setEncryption({
          publicKey,
          type: EncryptionKeyType.X25519
        });
      });
  }, [keystore, mnemonic]);

  const creationDetails = useMemo((): LightDidCreationDetails | undefined => {
    return signing
      ? {
          authenticationKey: signing,
          encryptionKey: encryption
        }
      : undefined;
  }, [encryption, signing]);

  return useLightDidFromDetails(creationDetails);
}
