import styled from '@emotion/styled';
import { Box, Container } from '@mui/material';
import { decodeAddress } from '@polkadot/keyring';
import { u8aToHex } from '@polkadot/util';
import React, { useContext, useEffect, useState } from 'react';

import { useWallet } from '@zcloak/react-wallet';
import { getRequestHash } from '@zcloak/zkid-core/utils';

import { ADMIN_ATTESTER_ADDRESS, CTYPE_HASH } from '@zkid/app-config/constants';
import { ZK_PROGRAM } from '@zkid/app-config/constants/zk';

import ZkGenerator from './components/ZkGenerator';
import { stringToHex } from './utils';
import { TutorialContext } from '.';

export const requestHash = getRequestHash({
  cType: CTYPE_HASH,
  programHash: ZK_PROGRAM.hash,
  fieldNames: ZK_PROGRAM.filed.split(',').map((it) => stringToHex(it)),
  attester: u8aToHex(decodeAddress(ADMIN_ATTESTER_ADDRESS))
});

const Wrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  padding-bottom: 20px;

  color: #fff;
  text-align: center;

  > h2 {
    margin-bottom: 12px;
    font-size: 30px;
  }

  > p {
    opacity: 0.8;
  }
`;

const ProofTrue: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '90%',
        height: '149px',
        margin: '0 auto',
        marginTop: '72px',
        border: '1px solid rgba(255, 255, 255, 0.6)',
        boxShadow: '0px 0px 20px rgba(0, 0, 0, 0.2)',
        borderRadius: '13px',
        '>img': {
          marginTop: '5px',
          marginLeft: '-50px'
        }
      }}
    >
      <img src="/images/pic_true.webp" />
      <span>Your proof is verified true, You can get an NFT</span>
    </Box>
  );
};

const Step5: React.FC = () => {
  const { kiltProofs } = useContext(TutorialContext);
  const { account } = useWallet();
  const [exists, setExists] = useState(false);

  useEffect(() => {
    if (account && kiltProofs) {
      kiltProofs.singleProofExists(account, requestHash).then(setExists);
    }
  }, [account, kiltProofs]);

  return (
    <Wrapper>
      <h2>Generate And Upload Proof</h2>
      <p>
        To claim your POAP, you first need to generate a STARK proof based on your credential in
        your zCloak ID Wallet then upload it.
      </p>
      {exists ? <ProofTrue /> : <ZkGenerator />}
    </Wrapper>
  );
};

export default React.memo(Step5);
