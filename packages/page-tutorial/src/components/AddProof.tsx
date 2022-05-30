import type { Proof } from '@zcloak/zkid-core/types';

import { Utils } from '@kiltprotocol/sdk-js';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { assert } from '@zcloak/zkid-core/utils';

import { ATTESTER_ADDRESS, CTYPE_HASH } from '@zkid/app-config/constants';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';
import { KILT_SS58 } from '@zkid/app-config/endpoints';
import { ButtonEnable, CredentialContext, NotificationContext } from '@zkid/react-components';
import { zkidApi } from '@zkid/service';

import { JudgeStepContext } from '../JudgeStep';
import { decodeSs58Address, stringToHex } from '../utils';

interface Props {
  proof?: Proof;
  reportError: (error: Error | null) => void;
}

const AddProof: React.FC<React.PropsWithChildren<Props>> = ({ children, proof, reportError }) => {
  const { kiltProofs } = useContext(JudgeStepContext);
  const { mnemonic } = useContext(CredentialContext);
  const { notifyError, notifyTx } = useContext(NotificationContext);
  const { account, chainId } = useWallet();
  const [loading, setLoading] = useState(false);

  const errorsPromise = useMemo(() => {
    if (proof) {
      return [
        zkidApi.rootHashUser(proof.rootHash).then(({ data: { address } }) => {
          if (address && address !== account) {
            throw new Error('rootHash already used');
          }
        })
      ];
    } else {
      return [];
    }
  }, [account, proof]);

  const handleClick = useCallback(async () => {
    try {
      assert(proof, 'Proof should not be empty, please click to generate.');
      assert(mnemonic, "Don't has address");
      assert(kiltProofs, "Can't get KiltProofs contract, please check your network");

      reportError(null);

      setLoading(true);
      const localAddress = new Utils.Keyring({
        ss58Format: KILT_SS58,
        type: 'sr25519'
      }).addFromMnemonic(mnemonic).address;

      await kiltProofs
        .addProof(
          decodeSs58Address(localAddress),
          decodeSs58Address(ATTESTER_ADDRESS),
          CTYPE_HASH,
          ZK_PROGRAM.filed.split(',').map((it) => stringToHex(it)),
          ZK_PROGRAM.hash,
          proof.proofCid,
          proof.rootHash,
          [proof.expectResult]
        )
        .then((tx) => {
          chainId && notifyTx(tx, chainId);

          return tx.wait(1);
        })
        .catch((error) => {
          setLoading(false);
          notifyError(error);
        });
    } catch (error) {
      reportError(error as Error);
    }
  }, [chainId, kiltProofs, mnemonic, notifyError, notifyTx, proof, reportError]);

  return (
    <ButtonEnable
      errorsPromise={errorsPromise}
      loading={loading}
      onClick={handleClick}
      variant="rounded"
    >
      {children}
    </ButtonEnable>
  );
};

export default React.memo<typeof AddProof>(AddProof);
