import type { Proof } from '@zcloak/zkid-core/types';

import { Utils } from '@kiltprotocol/sdk-js';
import { waitReady } from '@polkadot/wasm-crypto';
import React, { useCallback, useContext, useState } from 'react';

import { ADMIN_ATTESTER_ADDRESS, CTYPE_HASH } from '@zkid/app-config/constants';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';
import { KILT_SS58 } from '@zkid/app-config/endpoints';
import { ButtonEnable, NotificationContext } from '@zkid/react-components';

import { decodeSs58Address, stringToHex } from '../utils';
import { TutorialContext } from '..';

interface Props {
  proof?: Proof;
}

const AddProof: React.FC<Props> = ({ children, proof }) => {
  const { kiltProofs, mnemonic } = useContext(TutorialContext);
  const { notifyError } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (kiltProofs && mnemonic && proof) {
      setLoading(true);
      await waitReady();
      const localAddress = new Utils.Keyring({
        ss58Format: KILT_SS58,
        type: 'sr25519'
      }).addFromMnemonic(mnemonic).address;

      kiltProofs
        .addProof(
          decodeSs58Address(localAddress),
          decodeSs58Address(ADMIN_ATTESTER_ADDRESS),
          CTYPE_HASH,
          ZK_PROGRAM.filed.split(',').map((it) => stringToHex(it)),
          ZK_PROGRAM.hash,
          proof.proofCid,
          proof.rootHash,
          [proof.expectResult]
        )
        .catch(notifyError)
        .finally(() => setLoading(false));
    }
  }, [kiltProofs, mnemonic, notifyError, proof]);

  return (
    <ButtonEnable loading={loading} onClick={handleClick} variant="rounded">
      {children}
    </ButtonEnable>
  );
};

export default React.memo<typeof AddProof>(AddProof);
