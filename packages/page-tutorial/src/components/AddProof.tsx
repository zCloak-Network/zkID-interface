import type { Proof } from '@zcloak/zkid-core/types';

import { Utils } from '@kiltprotocol/sdk-js';
import { decodeAddress } from '@polkadot/keyring';
import { stringToHex, u8aToHex } from '@polkadot/util';
import { waitReady } from '@polkadot/wasm-crypto';
import React, { useCallback, useContext, useMemo, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { KiltProofs } from '@zcloak/zkid-core';

import { ADMIN_ATTESTER_ADDRESS, CTYPE_HASH } from '@zkid/app-config/constants';
import { KiltProofsAdddress } from '@zkid/app-config/constants/address';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';
import { KILT_SS58 } from '@zkid/app-config/endpoints';
import { ButtonEnable, NotificationContext } from '@zkid/react-components';

import { TutorialContext } from '..';

interface Props {
  proof?: Proof;
}

const AddProof: React.FC<Props> = ({ children, proof }) => {
  const { mnemonic } = useContext(TutorialContext);
  const { notifyError } = useContext(NotificationContext);
  const [loading, setLoading] = useState(false);
  const { account, library } = useWallet();
  const kiltProofs = useMemo(
    () => (library ? new KiltProofs(KiltProofsAdddress, library, account) : null),
    [account, library]
  );

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
          u8aToHex(decodeAddress(localAddress)),
          u8aToHex(decodeAddress(ADMIN_ATTESTER_ADDRESS)),
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
